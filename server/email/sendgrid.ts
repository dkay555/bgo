import { MailService } from '@sendgrid/mail';
import type { MailDataRequired } from '@sendgrid/mail';
import type * as SendGrid from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const mailData: MailDataRequired = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || '',  // Standardwert für text
      html: params.html || '',  // Standardwert für html
    };
    
    await mailService.send(mailData);
    console.log(`E-Mail erfolgreich gesendet an: ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid E-Mail-Fehler:', error);
    return false;
  }
}

export async function sendNewOrderDataNotification(orderData: any): Promise<boolean> {
  // Formatierte Nachricht erstellen
  let messageText = `Neue Bestelldaten eingegangen von: ${orderData.name}\n\n`;
  messageText += `E-Mail: ${orderData.email}\n`;
  messageText += `WhatsApp: ${orderData.whatsapp || 'Nicht angegeben'}\n`;
  messageText += `Ingame Name: ${orderData.ingameName}\n`;
  messageText += `Bestellte Leistung: ${orderData.leistung}\n\n`;
  
  // Je nach Leistungstyp unterschiedliche Daten hinzufügen
  if (orderData.leistung === 'boost') {
    messageText += `FB-Methode: ${orderData.fbMethode}\n`;
    
    if (orderData.fbMethode === 'authtoken') {
      messageText += `FB Authtoken: ${orderData.authtoken}\n`;
    } else if (orderData.fbMethode === 'logindaten') {
      messageText += `FB E-Mail/Telefon: ${orderData.fbemail}\n`;
      messageText += `FB Passwort: ${orderData.fbpass}\n`;
      messageText += `Wiederherstellungscode 1: ${orderData.code1}\n`;
      messageText += `Wiederherstellungscode 2: ${orderData.code2}\n`;
    }
  } else if (orderData.leistung === 'schnupper') {
    messageText += `FB Authtoken: ${orderData.sauthtoken}\n`;
  } else if (orderData.leistung === 'partner') {
    messageText += `Freundschaftslink/-code: ${orderData.freundcode}\n`;
  }
  
  // HTML-Version für bessere Darstellung
  let htmlMessage = messageText.replace(/\n/g, '<br>');
  
  return sendEmail({
    to: 'admin@babixgo.de', // Hier die Administrator-E-Mail-Adresse eintragen
    from: 'noreply@babixgo.de', // Hier die Absender-E-Mail-Adresse eintragen
    subject: `Neue Bestelldaten: ${orderData.leistung}`,
    text: messageText,
    html: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #00CFFF;">Neue Bestelldaten eingegangen</h2>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 15px;">
        ${htmlMessage}
      </div>
      <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
        Diese Nachricht wurde automatisch vom babixGO System generiert.
      </p>
    </div>`
  });
}