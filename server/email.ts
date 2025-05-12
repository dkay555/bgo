import sgMail from '@sendgrid/mail';
import { Order } from '@shared/schema';

// SendGrid-Konfiguration
if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY nicht gesetzt. E-Mail-Benachrichtigungen werden nicht gesendet.');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const ADMIN_EMAIL = 'admin@babixgo.de';
const FROM_EMAIL = 'noreply@babixgo.de';

/**
 * Formatiert eine Bestellung für die E-Mail-Anzeige
 */
function formatOrderDetails(order: Order): string {
  const authInfo = order.authMethod === 'authtoken'
    ? `Auth-Token: ${order.authtoken}`
    : `Login-E-Mail: ${order.loginEmail}\nPasswort: ********`;

  return `
Bestellnummer: #${order.id}
Datum: ${new Date(order.createdAt).toLocaleString('de-DE')}

Kundeninformationen:
-------------------
Name: ${order.name}
E-Mail: ${order.email}
${order.whatsapp ? `WhatsApp: ${order.whatsapp}` : ''}

Bestelldetails:
-------------
Paket: ${order.package} Würfel
Preis: ${order.price} €
Zahlungsmethode: ${order.paymentMethod}
Zahlungsstatus: ${order.paymentStatus}

Monopoly-Kontodaten:
------------------
Spielername: ${order.ingameName}
Auth-Methode: ${order.authMethod}
${authInfo}
`;
}

/**
 * Sendet eine Benachrichtigung über eine neue Bestellung an den Administrator
 */
export async function sendNewOrderNotification(order: Order): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY nicht gesetzt. Neue Bestellungsbenachrichtigung wird nicht gesendet.');
    return false;
  }
  
  try {
    const msg = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `Neue Bestellung #${order.id} - ${order.package} Würfel`,
      text: `Eine neue Bestellung wurde aufgegeben!\n\n${formatOrderDetails(order)}`,
      html: `
        <h1>Neue Bestellung eingegangen!</h1>
        <p>Es wurde eine neue Bestellung aufgegeben.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #0A3A68; margin-top: 0;">Bestellung #${order.id}</h2>
          <p><strong>Datum:</strong> ${new Date(order.createdAt).toLocaleString('de-DE')}</p>
          
          <h3 style="color: #00CFFF;">Kundeninformationen</h3>
          <p><strong>Name:</strong> ${order.name}</p>
          <p><strong>E-Mail:</strong> ${order.email}</p>
          ${order.whatsapp ? `<p><strong>WhatsApp:</strong> ${order.whatsapp}</p>` : ''}
          
          <h3 style="color: #00CFFF;">Bestelldetails</h3>
          <p><strong>Paket:</strong> ${order.package} Würfel</p>
          <p><strong>Preis:</strong> ${order.price} €</p>
          <p><strong>Zahlungsmethode:</strong> ${order.paymentMethod}</p>
          <p><strong>Zahlungsstatus:</strong> <span style="background-color: ${order.paymentStatus === 'completed' ? '#d1fae5' : '#fef3c7'}; padding: 2px 8px; border-radius: 9999px;">${order.paymentStatus}</span></p>
          
          <h3 style="color: #00CFFF;">Monopoly-Kontodaten</h3>
          <p><strong>Spielername:</strong> ${order.ingameName}</p>
          <p><strong>Auth-Methode:</strong> ${order.authMethod}</p>
          ${order.authMethod === 'authtoken' 
            ? `<p><strong>Auth-Token:</strong> ${order.authtoken}</p>` 
            : `<p><strong>Login-E-Mail:</strong> ${order.loginEmail}</p>
               <p><strong>Passwort:</strong> ********</p>`
          }
        </div>
        
        <p>Bitte bearbeiten Sie diese Bestellung im <a href="https://babixgo.de/admin/bestellungen" style="color: #00CFFF;">Admin-Bereich</a>.</p>
      `,
    };
    
    await sgMail.send(msg);
    console.log(`Bestellungsbenachrichtigung für Bestellung #${order.id} gesendet.`);
    return true;
  } catch (error) {
    console.error('Fehler beim Senden der Bestellungsbenachrichtigung:', error);
    return false;
  }
}

/**
 * Sendet eine Bestätigungsmail an den Kunden nach erfolgreicher Bestellung
 */
export async function sendOrderConfirmation(order: Order): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY nicht gesetzt. Bestellbestätigung wird nicht gesendet.');
    return false;
  }
  
  try {
    const msg = {
      to: order.email,
      from: FROM_EMAIL,
      subject: `Deine babixGO Bestellung #${order.id} - Zahlung erhalten`,
      text: `
Hallo ${order.name},

vielen Dank für deine Bestellung bei babixGO!

Wir haben deine Zahlung für ${order.package} Würfel erfolgreich erhalten und werden diese in Kürze deinem Monopoly GO-Konto gutschreiben.

${formatOrderDetails(order)}

Bei Fragen zu deiner Bestellung antworte einfach auf diese E-Mail oder kontaktiere uns über WhatsApp.

Viel Spaß mit deinen neuen Würfeln!

Dein babixGO-Team
`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0A3A68; text-align: center; padding: 20px;">
            <h1 style="color: white; margin: 0;">babixGO</h1>
          </div>
          
          <div style="padding: 20px;">
            <h2>Hallo ${order.name},</h2>
            
            <p>vielen Dank für deine Bestellung bei babixGO!</p>
            
            <p>Wir haben deine Zahlung für <strong>${order.package} Würfel</strong> erfolgreich erhalten und werden diese in Kürze deinem Monopoly GO-Konto gutschreiben.</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #0A3A68; margin-top: 0;">Bestellübersicht #${order.id}</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 40%;"><strong>Paket:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${order.package} Würfel</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Preis:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${order.price} €</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Zahlungsmethode:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${order.paymentMethod}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong>Zahlungsstatus:</strong></td>
                  <td style="padding: 8px 0;"><span style="background-color: #d1fae5; padding: 2px 8px; border-radius: 9999px;">bezahlt</span></td>
                </tr>
              </table>
            </div>
            
            <p>Bei Fragen zu deiner Bestellung antworte einfach auf diese E-Mail oder kontaktiere uns über WhatsApp.</p>
            
            <p>Viel Spaß mit deinen neuen Würfeln!</p>
            
            <p>Dein babixGO-Team</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 14px; color: #666;">
            <p>© ${new Date().getFullYear()} babixGO. Alle Rechte vorbehalten.</p>
            <p>
              <a href="https://babixgo.de/datenschutz" style="color: #00CFFF; text-decoration: none; margin: 0 10px;">Datenschutz</a> | 
              <a href="https://babixgo.de/impressum" style="color: #00CFFF; text-decoration: none; margin: 0 10px;">Impressum</a> | 
              <a href="https://babixgo.de/agb" style="color: #00CFFF; text-decoration: none; margin: 0 10px;">AGB</a>
            </p>
          </div>
        </div>
      `,
    };
    
    await sgMail.send(msg);
    console.log(`Bestellbestätigung für Bestellung #${order.id} gesendet.`);
    return true;
  } catch (error) {
    console.error('Fehler beim Senden der Bestellbestätigung:', error);
    return false;
  }
}