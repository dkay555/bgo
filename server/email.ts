import sgMail from '@sendgrid/mail';
import { type Order } from '@shared/schema';

// Initialisierung des SendGrid SDK mit dem API-Key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SendGrid API-Key fehlt. E-Mail-Funktionen sind deaktiviert.');
}

// Email-Absender-Adresse
const FROM_EMAIL = 'noreply@babixgo.com';

// Admin-Email-Adresse für Benachrichtigungen
const ADMIN_EMAIL = 'admin@babixgo.com'; // Dies sollte durch Ihre tatsächliche E-Mail-Adresse ersetzt werden

/**
 * Sendet eine Benachrichtigung über eine neue Bestellung an den Administrator
 */
export async function sendNewOrderNotification(order: Order): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API-Key fehlt. Keine E-Mail gesendet.');
    return false;
  }

  try {
    // Formatieren der Preisangabe
    const formattedPrice = order.price.toString().replace('.', ',');
    
    // Formatieren der Zahlungsmethode für die Anzeige
    const paymentMethodDisplay = order.paymentMethod === 'paypal' ? 'PayPal' : 
                                (order.paymentMethod === 'bank_transfer' ? 'Banküberweisung' : order.paymentMethod);
    
    // Formatieren des Zahlungsstatus für die Anzeige
    const paymentStatusDisplay = order.paymentStatus === 'completed' ? 'Bezahlt' : 
                                (order.paymentStatus === 'pending' ? 'Ausstehend' : 
                                (order.paymentStatus === 'failed' ? 'Fehlgeschlagen' : order.paymentStatus));
    
    // Erstellen der E-Mail
    const message = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `Neue Bestellung (#${order.id}): ${order.package} Würfel`,
      text: `
Neue Bestellung bei babixGO!

Bestellnummer: #${order.id}
Produkt: ${order.package} Würfel
Preis: ${formattedPrice}€

Kundeninformationen:
- Name: ${order.name}
- E-Mail: ${order.email}
${order.whatsapp ? `- WhatsApp: ${order.whatsapp}` : ''}

Monopoly GO! Informationen:
- Ingame-Name: ${order.ingameName}
- Auth-Methode: ${order.authMethod === 'authtoken' ? 'Authtoken' : 'Login'}

Zahlungsinformationen:
- Zahlungsmethode: ${paymentMethodDisplay}
- Status: ${paymentStatusDisplay}
${order.paymentReference ? `- Referenz: ${order.paymentReference}` : ''}

Bestellung jetzt verwalten: https://babixgo.com/admin/bestellungen

--
Diese E-Mail wurde automatisch gesendet.
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #00CFFF; color: white; padding: 15px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
    .section { margin-bottom: 20px; }
    .section-title { color: #0A3A68; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px; }
    .footer { margin-top: 30px; font-size: 12px; color: #777; text-align: center; }
    .button { background-color: #FF4C00; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; }
    .info-row { margin-bottom: 5px; }
    .label { font-weight: bold; }
    .status-completed { color: #28a745; }
    .status-pending { color: #ffc107; }
    .status-failed { color: #dc3545; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Neue Bestellung bei babixGO!</h2>
    </div>
    <div class="content">
      <div class="section">
        <h3 class="section-title">Bestelldetails</h3>
        <div class="info-row"><span class="label">Bestellnummer:</span> #${order.id}</div>
        <div class="info-row"><span class="label">Produkt:</span> ${order.package} Würfel</div>
        <div class="info-row"><span class="label">Preis:</span> ${formattedPrice}€</div>
      </div>
      
      <div class="section">
        <h3 class="section-title">Kundeninformationen</h3>
        <div class="info-row"><span class="label">Name:</span> ${order.name}</div>
        <div class="info-row"><span class="label">E-Mail:</span> ${order.email}</div>
        ${order.whatsapp ? `<div class="info-row"><span class="label">WhatsApp:</span> ${order.whatsapp}</div>` : ''}
      </div>
      
      <div class="section">
        <h3 class="section-title">Monopoly GO! Informationen</h3>
        <div class="info-row"><span class="label">Ingame-Name:</span> ${order.ingameName}</div>
        <div class="info-row"><span class="label">Auth-Methode:</span> ${order.authMethod === 'authtoken' ? 'Authtoken' : 'Login'}</div>
      </div>
      
      <div class="section">
        <h3 class="section-title">Zahlungsinformationen</h3>
        <div class="info-row"><span class="label">Zahlungsmethode:</span> ${paymentMethodDisplay}</div>
        <div class="info-row">
          <span class="label">Status:</span> 
          <span class="status-${order.paymentStatus}">${paymentStatusDisplay}</span>
        </div>
        ${order.paymentReference ? `<div class="info-row"><span class="label">Referenz:</span> ${order.paymentReference}</div>` : ''}
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://babixgo.com/admin/bestellungen" class="button">Bestellung verwalten</a>
      </div>
      
      <div class="footer">
        <p>Diese E-Mail wurde automatisch gesendet.</p>
      </div>
    </div>
  </div>
</body>
</html>
      `
    };

    // Senden der E-Mail
    await sgMail.send(message);
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
    console.warn('SendGrid API-Key fehlt. Keine E-Mail gesendet.');
    return false;
  }

  try {
    // Formatieren der Preisangabe
    const formattedPrice = order.price.toString().replace('.', ',');
    
    // Erstellen der E-Mail
    const message = {
      to: order.email,
      from: FROM_EMAIL,
      subject: `Bestellbestätigung - babixGO #${order.id}`,
      text: `
Vielen Dank für Ihre Bestellung bei babixGO!

Bestellnummer: #${order.id}
Produkt: ${order.package} Würfel
Preis: ${formattedPrice}€

Wir werden Ihren Auftrag so schnell wie möglich bearbeiten.

Bei Fragen können Sie uns jederzeit unter support@babixgo.com kontaktieren.

Mit freundlichen Grüßen,
Ihr babixGO-Team
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #00CFFF; color: white; padding: 15px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
    .section { margin-bottom: 20px; }
    .footer { margin-top: 30px; font-size: 12px; color: #777; text-align: center; }
    .info-row { margin-bottom: 10px; }
    .label { font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Vielen Dank für Ihre Bestellung!</h2>
    </div>
    <div class="content">
      <p>Hallo ${order.name},</p>
      
      <p>Vielen Dank für Ihre Bestellung bei babixGO. Wir werden Ihren Auftrag so schnell wie möglich bearbeiten.</p>
      
      <div class="section">
        <h3 style="color: #0A3A68; border-bottom: 1px solid #eee; padding-bottom: 5px;">Bestelldetails</h3>
        <div class="info-row"><span class="label">Bestellnummer:</span> #${order.id}</div>
        <div class="info-row"><span class="label">Produkt:</span> ${order.package} Würfel</div>
        <div class="info-row"><span class="label">Preis:</span> ${formattedPrice}€</div>
      </div>
      
      <p>Bei Fragen können Sie uns jederzeit unter <a href="mailto:support@babixgo.com">support@babixgo.com</a> kontaktieren.</p>
      
      <p>Mit freundlichen Grüßen,<br>
      Ihr babixGO-Team</p>
      
      <div class="footer">
        <p>&copy; 2025 babixGO. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  </div>
</body>
</html>
      `
    };

    // Senden der E-Mail
    await sgMail.send(message);
    console.log(`Bestellbestätigung für Bestellung #${order.id} gesendet.`);
    return true;
  } catch (error) {
    console.error('Fehler beim Senden der Bestellbestätigung:', error);
    return false;
  }
}