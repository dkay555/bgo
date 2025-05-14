import { storage } from "./storage";
import { db } from "./db";
import { emailTemplates } from "@shared/schema";
import { eq } from "drizzle-orm";

/**
 * Standard-E-Mail-Vorlagen für die Anwendung
 */
const DEFAULT_EMAIL_TEMPLATES = [
  {
    templateKey: "order_confirmation",
    name: "Bestellbestätigung",
    subject: "Deine Bestellung bei babixGO - Bestellnummer: {{orderNumber}}",
    content: `Hallo {{customerName}},

vielen Dank für deine Bestellung bei babixGO!

Wir haben deine Bestellung #{{orderNumber}} erhalten und werden sie so schnell wie möglich bearbeiten.

**Bestellübersicht:**
{{orderDetails}}

**Gesamtbetrag:** {{totalAmount}} €

Die Bestellung wird ausgeführt, sobald die Zahlung bei uns eingegangen ist. Wir werden dich über den Fortschritt deiner Bestellung auf dem Laufenden halten.

Bei Fragen zu deiner Bestellung kannst du gerne auf diese E-Mail antworten oder uns über unser Kontaktformular kontaktieren.

Viele Grüße,
Dein babixGO-Team`,
    variables: JSON.stringify({
      orderNumber: "Bestellnummer",
      customerName: "Name des Kunden",
      orderDetails: "Details der Bestellung (Produkte, Mengen, Preise)",
      totalAmount: "Gesamtbetrag der Bestellung"
    })
  },
  {
    templateKey: "payment_received",
    name: "Zahlungsbestätigung",
    subject: "Zahlung erhalten für deine Bestellung #{{orderNumber}}",
    content: `Hallo {{customerName}},

wir haben deine Zahlung für die Bestellung #{{orderNumber}} erhalten. Vielen Dank!

Wir beginnen jetzt mit der Bearbeitung deiner Bestellung und werden dir mitteilen, sobald diese abgeschlossen ist.

**Zahlungsdetails:**
- Betrag: {{totalAmount}} €
- Zahlungsmethode: {{paymentMethod}}
- Zahlungsdatum: {{paymentDate}}

Bei Fragen kannst du gerne auf diese E-Mail antworten oder uns über unser Kontaktformular kontaktieren.

Viele Grüße,
Dein babixGO-Team`,
    variables: JSON.stringify({
      orderNumber: "Bestellnummer",
      customerName: "Name des Kunden",
      totalAmount: "Bezahlter Betrag",
      paymentMethod: "Zahlungsmethode (PayPal, Überweisung, etc.)",
      paymentDate: "Datum der Zahlung"
    })
  },
  {
    templateKey: "order_completed",
    name: "Bestellung abgeschlossen",
    subject: "Deine Bestellung #{{orderNumber}} wurde abgeschlossen",
    content: `Hallo {{customerName}},

gute Nachrichten! Deine Bestellung #{{orderNumber}} wurde erfolgreich abgeschlossen.

**Details:**
{{orderDetails}}

{{deliveryInstructions}}

Wir hoffen, dass du mit unserem Service zufrieden bist. Falls du Fragen hast oder Hilfe benötigst, stehen wir dir gerne zur Verfügung.

Viele Grüße,
Dein babixGO-Team`,
    variables: JSON.stringify({
      orderNumber: "Bestellnummer",
      customerName: "Name des Kunden",
      orderDetails: "Details der Bestellung (Produkte, Mengen)",
      deliveryInstructions: "Spezifische Anweisungen für die Lieferung des digitalen Inhalts"
    })
  },
  {
    templateKey: "contact_confirmation",
    name: "Kontaktanfrage-Bestätigung",
    subject: "Deine Anfrage bei babixGO wurde empfangen",
    content: `Hallo {{customerName}},

vielen Dank für deine Kontaktanfrage. Wir haben deine Nachricht erhalten und werden uns so schnell wie möglich mit dir in Verbindung setzen.

**Deine Anfrage:**
Betreff: {{subject}}
Nachricht: {{message}}

Unser Team bemüht sich, alle Anfragen innerhalb von 24 Stunden zu beantworten. Während der Stoßzeiten kann es jedoch etwas länger dauern.

Viele Grüße,
Dein babixGO-Team`,
    variables: JSON.stringify({
      customerName: "Name des Kunden",
      subject: "Betreff der Kontaktanfrage",
      message: "Nachricht des Kunden"
    })
  },
  {
    templateKey: "support_ticket_opened",
    name: "Support-Ticket eröffnet",
    subject: "Dein Support-Ticket #{{ticketNumber}} wurde eröffnet",
    content: `Hallo {{customerName}},

dein Support-Ticket #{{ticketNumber}} mit dem Betreff "{{ticketSubject}}" wurde erfolgreich eröffnet.

Unser Support-Team wird sich so schnell wie möglich mit einer Antwort bei dir melden. Du kannst den Status deines Tickets jederzeit in deinem Konto einsehen.

**Ticket-Details:**
Ticket-ID: {{ticketNumber}}
Betreff: {{ticketSubject}}
Status: Offen
Erstellt am: {{createdDate}}

Du erhältst automatisch eine Benachrichtigung, wenn wir auf dein Ticket antworten.

Viele Grüße,
Dein babixGO-Support-Team`,
    variables: JSON.stringify({
      ticketNumber: "Ticketnummer",
      customerName: "Name des Kunden",
      ticketSubject: "Betreff des Support-Tickets",
      createdDate: "Erstellungsdatum des Tickets"
    })
  },
  {
    templateKey: "support_ticket_reply",
    name: "Antwort auf Support-Ticket",
    subject: "Neue Antwort auf dein Support-Ticket #{{ticketNumber}}",
    content: `Hallo {{customerName}},

es gibt eine neue Antwort auf dein Support-Ticket #{{ticketNumber}} mit dem Betreff "{{ticketSubject}}".

**Antwort von {{respondentName}}:**
{{replyMessage}}

Du kannst auf diese Nachricht antworten, indem du direkt auf diese E-Mail antwortest oder dich in deinem Konto anmeldest.

Viele Grüße,
Dein babixGO-Support-Team`,
    variables: JSON.stringify({
      ticketNumber: "Ticketnummer",
      customerName: "Name des Kunden",
      ticketSubject: "Betreff des Support-Tickets",
      respondentName: "Name des Mitarbeiters, der geantwortet hat",
      replyMessage: "Inhalt der Antwort"
    })
  },
  {
    templateKey: "password_reset",
    name: "Passwort zurücksetzen",
    subject: "Anweisungen zum Zurücksetzen deines babixGO-Passworts",
    content: `Hallo {{customerName}},

wir haben eine Anfrage erhalten, das Passwort für dein babixGO-Konto zurückzusetzen. Wenn du diese Anfrage gestellt hast, klicke bitte auf den folgenden Link, um ein neues Passwort zu erstellen:

{{resetLink}}

Dieser Link ist 24 Stunden gültig und kann nur einmal verwendet werden.

Wenn du diese Anfrage nicht gestellt hast, kannst du diese E-Mail ignorieren. Dein Passwort wird nicht geändert.

Aus Sicherheitsgründen sollte dein neues Passwort:
- Mindestens 8 Zeichen lang sein
- Groß- und Kleinbuchstaben enthalten
- Mindestens eine Zahl enthalten

Viele Grüße,
Dein babixGO-Team`,
    variables: JSON.stringify({
      customerName: "Name des Kunden",
      resetLink: "Link zum Zurücksetzen des Passworts"
    })
  }
];

/**
 * Erstellt Standard-E-Mail-Vorlagen, wenn noch keine in der Datenbank vorhanden sind
 */
export async function seedEmailTemplates() {
  try {
    // Prüfen, ob bereits E-Mail-Vorlagen vorhanden sind
    const existingTemplates = await db.select().from(emailTemplates);
    
    if (existingTemplates.length === 0) {
      console.log("Erstelle Standard-E-Mail-Vorlagen...");
      
      for (const template of DEFAULT_EMAIL_TEMPLATES) {
        await storage.createEmailTemplate(template);
      }
      
      console.log(`${DEFAULT_EMAIL_TEMPLATES.length} E-Mail-Vorlagen wurden erstellt.`);
    } else {
      console.log(`Es existieren bereits ${existingTemplates.length} E-Mail-Vorlagen in der Datenbank.`);
    }
  } catch (error) {
    console.error("Fehler beim Erstellen der E-Mail-Vorlagen:", error);
  }
}