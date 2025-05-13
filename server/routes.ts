import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { insertOrderSchema, insertTicketSchema, insertTicketReplySchema, type User } from "@shared/schema";
import { ZodError } from "zod";
import { sendNewOrderNotification, sendOrderConfirmation, sendEmailToCustomer } from "./email";
import { adminAuthMiddleware } from "./admin-auth";
import { setupAuth, hashPassword } from "./auth";
import { seedProducts } from "./seed-products";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth-System initialisieren
  setupAuth(app);
  
  // Beispiel-Produkte erstellen (falls keine vorhanden sind)
  await seedProducts();
  
  // Produkt-API-Routen
  // Produkte abrufen - öffentlich zugänglich
  app.get("/api/products", async (req, res) => {
    try {
      const activeOnly = req.query.active === 'true';
      const products = await storage.getAllProducts(activeOnly);
      res.status(200).json({ success: true, products });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Fehler beim Abrufen der Produkte"
      });
    }
  });
  
  // Produkte nach Typ abrufen - öffentlich zugänglich
  app.get("/api/products/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const products = await storage.getProductsByType(type);
      res.status(200).json({ success: true, products });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Fehler beim Abrufen der Produkte"
      });
    }
  });
  
  // Einzelnes Produkt abrufen - öffentlich zugänglich
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Ungültige Produkt-ID"
        });
      }
      
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Produkt nicht gefunden"
        });
      }
      
      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Fehler beim Abrufen des Produkts"
      });
    }
  });
  
  // Produkt erstellen - nur für Administratoren
  app.post("/api/products", adminAuthMiddleware, async (req, res) => {
    try {
      const { name, description, productType, variant, price, isActive, stock } = req.body;
      
      // Validierung
      if (!name || !productType || price === undefined) {
        return res.status(400).json({
          success: false,
          message: "Name, Produkttyp und Preis sind erforderlich"
        });
      }
      
      const newProduct = await storage.createProduct({
        name,
        description,
        productType,
        variant,
        price,
        isActive,
        stock
      });
      
      res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Fehler beim Erstellen des Produkts"
      });
    }
  });
  
  // Produkt aktualisieren - nur für Administratoren
  app.patch("/api/products/:id", adminAuthMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Ungültige Produkt-ID"
        });
      }
      
      const updatedProduct = await storage.updateProduct(id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ 
          success: false, 
          message: "Produkt nicht gefunden"
        });
      }
      
      res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Fehler beim Aktualisieren des Produkts"
      });
    }
  });
  
  // Produkt löschen - nur für Administratoren
  app.delete("/api/products/:id", adminAuthMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Ungültige Produkt-ID"
        });
      }
      
      // Prüfen, ob das Produkt existiert
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Produkt nicht gefunden"
        });
      }
      
      await storage.deleteProduct(id);
      res.status(200).json({ success: true, message: "Produkt erfolgreich gelöscht" });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Fehler beim Löschen des Produkts"
      });
    }
  });
  // Kontaktformular-Route - öffentlich zugänglich
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message, subject, phone } = req.body;
      
      // Validierung
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "Name, E-Mail und Nachricht sind erforderlich"
        });
      }
      
      // Kontaktanfrage speichern
      const contactMessage = await storage.createContactMessage({
        name,
        email,
        message,
        subject,
        phone
      });
      
      // Optional: E-Mail-Benachrichtigung an Admin senden
      if (process.env.SENDGRID_API_KEY) {
        try {
          const sgMail = require('@sendgrid/mail');
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          
          await sgMail.send({
            to: 'admin@babixgo.de',
            from: 'noreply@babixgo.de',
            subject: `Neue Kontaktanfrage von ${name}`,
            text: `
Name: ${name}
E-Mail: ${email}
${phone ? `Telefon: ${phone}` : ''}
${subject ? `Betreff: ${subject}` : ''}

Nachricht:
${message}
            `,
            html: `
              <h1>Neue Kontaktanfrage eingegangen</h1>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>E-Mail:</strong> ${email}</p>
              ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
              ${subject ? `<p><strong>Betreff:</strong> ${subject}</p>` : ''}
              <h2>Nachricht:</h2>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `
          });
        } catch (emailError) {
          console.error("Fehler beim Senden der E-Mail-Benachrichtigung:", emailError);
          // Nicht abbrechen, wenn E-Mail fehlschlägt
        }
      }
      
      res.status(201).json({
        success: true,
        message: "Kontaktanfrage erfolgreich gesendet",
        contactId: contactMessage.id
      });
    } catch (error) {
      console.error("Fehler beim Speichern der Kontaktanfrage:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });

  // PayPal integration routes
  app.get("/paypal/setup", async (req, res) => {
    try {
      // Überprüfen, ob PayPal-Anmeldedaten konfiguriert sind
      if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
        console.warn("PayPal nicht konfiguriert - fehlende Anmeldedaten");
        return res.json({
          isConfigured: false,
          error: "PayPal ist nicht konfiguriert. Bitte kontaktieren Sie den Support."
        });
      }
      
      await loadPaypalDefault(req, res);
    } catch (error) {
      console.error("PayPal Setup Error:", error);
      res.status(500).json({
        isConfigured: false,
        error: "PayPal configuration failed: " + (error as Error).message
      });
    }
  });

  app.post("/paypal/order", async (req, res) => {
    try {
      // Request body should contain: { intent, amount, currency }
      await createPaypalOrder(req, res);
    } catch (error) {
      console.error("PayPal Order Creation Error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to create PayPal order: " + (error as Error).message
      });
    }
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    try {
      await capturePaypalOrder(req, res);
      
      // Hole die ID aus dem Request-Body (optional)
      const { orderId } = req.body;
      
      // Wenn wir eine Bestellungs-ID haben, aktualisieren wir den Zahlungsstatus
      if (orderId) {
        await storage.updateOrderPaymentStatus(orderId, "completed", req.params.orderID);
      }
    } catch (error) {
      console.error("PayPal Order Capture Error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to capture PayPal order: " + (error as Error).message
      });
    }
  });

  // API routes (prefix all with /api)
  app.get("/api/products", (req, res) => {
    res.json({
      products: [
        { id: "dice-25000", name: "25.000 Würfel", price: "25.00" },
        { id: "dice-35000", name: "35.000 Würfel", price: "35.00" },
        { id: "dice-45000", name: "45.000 Würfel", price: "45.00" }
      ]
    });
  });
  
  // Admin routes mit Basic Auth Middleware
  app.get("/api/admin/orders", adminAuthMiddleware, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      
      res.json({
        success: true,
        orders
      });
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellungen:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // Admin-Routen für Kontaktanfragen
  app.get("/api/admin/contact-messages", adminAuthMiddleware, async (req, res) => {
    try {
      const archived = req.query.archived === 'true';
      const messages = await storage.getAllContactMessages(archived);
      
      res.json({
        success: true,
        messages
      });
    } catch (error) {
      console.error("Fehler beim Abrufen der Kontaktanfragen:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  app.patch("/api/admin/contact-messages/:id/read", adminAuthMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Nachrichten-ID"
        });
      }
      
      const updatedMessage = await storage.markContactMessageAsRead(id);
      
      if (!updatedMessage) {
        return res.status(404).json({
          success: false,
          message: "Nachricht nicht gefunden"
        });
      }
      
      res.json({
        success: true,
        message: updatedMessage
      });
    } catch (error) {
      console.error("Fehler beim Markieren der Nachricht als gelesen:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  app.patch("/api/admin/contact-messages/:id/archive", adminAuthMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Nachrichten-ID"
        });
      }
      
      const archivedMessage = await storage.archiveContactMessage(id);
      
      if (!archivedMessage) {
        return res.status(404).json({
          success: false,
          message: "Nachricht nicht gefunden"
        });
      }
      
      res.json({
        success: true,
        message: archivedMessage
      });
    } catch (error) {
      console.error("Fehler beim Archivieren der Nachricht:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  app.delete("/api/admin/contact-messages/:id", adminAuthMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Nachrichten-ID"
        });
      }
      
      await storage.deleteContactMessage(id);
      
      res.json({
        success: true,
        message: "Nachricht erfolgreich gelöscht"
      });
    } catch (error) {
      console.error("Fehler beim Löschen der Nachricht:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // E-Mail an Kunden senden
  app.post("/api/orders/:id/email", adminAuthMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Bestellungs-ID"
        });
      }
      
      const { subject, message } = req.body;
      
      if (!subject || !message) {
        return res.status(400).json({
          success: false,
          message: "Betreff und Nachricht sind erforderlich"
        });
      }
      
      const order = await storage.getOrder(id);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Bestellung nicht gefunden"
        });
      }
      
      // Sende E-Mail-Benachrichtigung an den Kunden
      const emailResponse = await sendEmailToCustomer(order, subject, message);
      
      if (!emailResponse) {
        return res.status(500).json({
          success: false,
          message: "Fehler beim Senden der E-Mail"
        });
      }
      
      res.json({
        success: true,
        message: "E-Mail wurde erfolgreich gesendet"
      });
    } catch (error) {
      console.error("Fehler beim Senden der E-Mail:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // Bestellungsstatus aktualisieren
  app.patch("/api/orders/:id/status", adminAuthMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Bestellungs-ID"
        });
      }
      
      const { status, note } = req.body;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Bestellungsstatus ist erforderlich"
        });
      }
      
      // In einer echten Anwendung würden wir einen bestellungsstatus-Wert in der Datenbank haben
      // Für dieses Beispiel aktualisieren wir nur den Zahlungsstatus
      const updatedOrder = await storage.updateOrderPaymentStatus(id, status, note);
      
      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: "Bestellung nicht gefunden"
        });
      }
      
      // Wenn der Status auf "started" oder "completed" gesetzt wird, sende eine Benachrichtigung an den Kunden
      if (status === "started") {
        await sendEmailToCustomer(
          updatedOrder, 
          "Deine Bestellung wurde bearbeitet", 
          `Hallo ${updatedOrder.name},\n\nWir haben mit der Bearbeitung deiner Bestellung #${updatedOrder.id} begonnen. Deine Würfel werden in Kürze auf deinem Monopoly GO-Konto gutgeschrieben.\n\nVielen Dank für dein Vertrauen!\n\nDein babixGO-Team`
        );
      } else if (status === "completed" && note) {
        await sendEmailToCustomer(
          updatedOrder, 
          "Deine Bestellung wurde abgeschlossen", 
          `Hallo ${updatedOrder.name},\n\nDeine Bestellung #${updatedOrder.id} wurde erfolgreich abgeschlossen.\n\nHinweis vom Team: ${note}\n\nVielen Dank für dein Vertrauen!\n\nDein babixGO-Team`
        );
      }
      
      res.json({
        success: true,
        message: "Bestellungsstatus aktualisiert",
        order: updatedOrder
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Bestellungsstatus:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // Bestellungsrouten
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      // Validiere die Daten mit dem Zod-Schema
      const orderData = insertOrderSchema.parse(req.body);
      
      // Speichere die Bestellung in der Datenbank
      const order = await storage.createOrder(orderData);
      
      // Sende E-Mail-Benachrichtigungen
      sendNewOrderNotification(order).catch(err => {
        console.error("Fehler beim Senden der Admin-Benachrichtigung:", err);
      });
      
      sendOrderConfirmation(order).catch(err => {
        console.error("Fehler beim Senden der Kundenbestätigung:", err);
      });
      
      // Sende eine erfolgreiche Antwort zurück
      res.status(201).json({
        success: true,
        message: "Bestellung erfolgreich erstellt",
        order
      });
    } catch (error) {
      console.error("Fehler beim Erstellen der Bestellung:", error);
      
      // Behandle Validierungsfehler
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validierungsfehler",
          errors: error.errors
        });
      }
      
      // Allgemeiner Fehler
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // Hole eine bestimmte Bestellung
  app.get("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Bestellungs-ID"
        });
      }
      
      const order = await storage.getOrder(id);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Bestellung nicht gefunden"
        });
      }
      
      res.json({
        success: true,
        order
      });
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellung:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // Bestellungen nach E-Mail-Adresse abrufen
  app.get("/api/orders/email/:email", async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "E-Mail-Adresse ist erforderlich"
        });
      }
      
      const orders = await storage.getOrdersByEmail(email);
      
      res.json({
        success: true,
        orders
      });
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellungen:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // Zahlungsstatus einer Bestellung aktualisieren (Admin-geschützt)
  app.patch("/api/orders/:id/payment", adminAuthMiddleware, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Bestellungs-ID"
        });
      }
      
      const { status, reference } = req.body;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Zahlungsstatus ist erforderlich"
        });
      }
      
      const updatedOrder = await storage.updateOrderPaymentStatus(id, status, reference);
      
      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: "Bestellung nicht gefunden"
        });
      }
      
      // Bei Statusänderung zu "completed" senden wir eine Bestätigungs-E-Mail an den Kunden
      if (status === 'completed') {
        sendOrderConfirmation(updatedOrder).catch(err => {
          console.error("Fehler beim Senden der Zahlungsbestätigung:", err);
        });
      }
      
      res.json({
        success: true,
        message: "Zahlungsstatus aktualisiert",
        order: updatedOrder
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Zahlungsstatus:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });

  // PayPal-Bestellungs-Callback - verbindet PayPal mit unserem Bestellsystem
  app.post("/api/order-callback", async (req: Request, res: Response) => {
    try {
      // Hier könnten wir Zahlungsdetails von PayPal verarbeiten und mit unseren Bestelldaten verknüpfen
      const { orderID, orderData } = req.body;
      
      if (!orderID || !orderData) {
        return res.status(400).json({
          success: false,
          message: "Fehlende erforderliche Daten"
        });
      }
      
      // Beispielimplementierung: Eine neue Bestellung erstellen und mit der PayPal-Bestellung verknüpfen
      // In einer realen Anwendung würde dies mit mehr Validierung und Fehlerbehandlung implementiert werden
      const newOrder = await storage.createOrder({
        ...orderData,
        paymentMethod: "paypal",
        paymentReference: orderID,
        paymentStatus: "completed"
      });
      
      res.status(201).json({
        success: true,
        message: "Bestellung erfolgreich verarbeitet",
        order: newOrder
      });
    } catch (error) {
      console.error("Fehler bei der Bestellungsverarbeitung:", error);
      
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validierungsfehler",
          errors: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten bei der Verarbeitung der Bestellung"
      });
    }
  });

  // ========== TICKETSYSTEM ROUTEN ==========
  
  // Ticket erstellen (nur für authentifizierte Benutzer)
  app.post("/api/tickets", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Nicht authentifiziert"
      });
    }

    try {
      const ticketData = insertTicketSchema.parse({
        ...req.body,
        userId: req.user.id
      });

      const ticket = await storage.createTicket(ticketData);

      res.status(201).json({
        success: true,
        message: "Support-Ticket erfolgreich erstellt",
        ticket
      });
    } catch (error) {
      console.error("Fehler beim Erstellen des Tickets:", error);
      
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validierungsfehler",
          errors: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });

  // Tickets eines Benutzers abrufen
  app.get("/api/tickets", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Nicht authentifiziert"
      });
    }

    try {
      const tickets = await storage.getTicketsForUser(req.user.id);
      
      res.json({
        success: true,
        tickets
      });
    } catch (error) {
      console.error("Fehler beim Abrufen der Tickets:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });

  // Ein bestimmtes Ticket abrufen
  app.get("/api/tickets/:id", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Nicht authentifiziert"
      });
    }

    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Ticket-ID"
        });
      }
      
      const ticket = await storage.getTicket(id);
      
      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: "Ticket nicht gefunden"
        });
      }
      
      // Prüfen, ob der Benutzer Zugriff auf dieses Ticket hat
      if (ticket.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Keine Berechtigung für dieses Ticket"
        });
      }
      
      // Hole auch die Antworten für dieses Ticket
      const replies = await storage.getTicketReplies(id);
      
      res.json({
        success: true,
        ticket,
        replies
      });
    } catch (error) {
      console.error("Fehler beim Abrufen des Tickets:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });

  // Antwort zu einem Ticket hinzufügen
  app.post("/api/tickets/:id/replies", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Nicht authentifiziert"
      });
    }

    try {
      const ticketId = parseInt(req.params.id);
      
      if (isNaN(ticketId)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Ticket-ID"
        });
      }
      
      const ticket = await storage.getTicket(ticketId);
      
      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: "Ticket nicht gefunden"
        });
      }
      
      // Prüfen, ob der Benutzer Zugriff auf dieses Ticket hat
      if (ticket.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Keine Berechtigung für dieses Ticket"
        });
      }
      
      const replyData = insertTicketReplySchema.parse({
        ...req.body,
        ticketId,
        userId: req.user.id,
        isAdmin: req.user.isAdmin || false
      });
      
      const reply = await storage.createTicketReply(replyData);
      
      // Wenn das Ticket "geschlossen" ist, setzen wir es zurück auf "in Bearbeitung"
      if (ticket.status === "closed") {
        await storage.updateTicketStatus(ticketId, "in_progress");
      }
      
      res.status(201).json({
        success: true,
        message: "Antwort erfolgreich hinzugefügt",
        reply
      });
    } catch (error) {
      console.error("Fehler beim Hinzufügen der Antwort:", error);
      
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validierungsfehler",
          errors: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });

  // Ticket-Status aktualisieren (schließen/öffnen)
  app.patch("/api/tickets/:id/status", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Nicht authentifiziert"
      });
    }

    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Ticket-ID"
        });
      }
      
      const { status } = req.body;
      
      if (!status || !["open", "in_progress", "closed"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Ungültiger Status"
        });
      }
      
      const ticket = await storage.getTicket(id);
      
      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: "Ticket nicht gefunden"
        });
      }
      
      // Prüfen, ob der Benutzer Zugriff auf dieses Ticket hat
      if (ticket.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Keine Berechtigung für dieses Ticket"
        });
      }
      
      const updatedTicket = await storage.updateTicketStatus(id, status);
      
      res.json({
        success: true,
        message: "Ticket-Status aktualisiert",
        ticket: updatedTicket
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Ticket-Status:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // Admin-Route: Alle Tickets abrufen
  app.get("/api/admin/tickets", adminAuthMiddleware, async (req: Request, res: Response) => {
    try {
      const status = req.query.status as string;
      const tickets = await storage.getAllTickets(status);
      
      res.json({
        success: true,
        tickets
      });
    } catch (error) {
      console.error("Fehler beim Abrufen der Tickets:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });

  // ========== BESTELLHISTORIE ENDPUNKTE ==========
  
  // Bestellhistorie eines Benutzers abrufen
  app.get("/api/user/orders", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: "Nicht authentifiziert"
      });
    }

    try {
      const orders = await storage.getUserOrderHistory(req.user.id);
      
      res.json({
        success: true,
        orders
      });
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellhistorie:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // ========== BENUTZERVERWALTUNG IM ADMIN-BEREICH ==========
  
  // Alle Benutzer abrufen (nur für Admins)
  app.get("/api/admin/users", adminAuthMiddleware, async (req: Request, res: Response) => {
    try {
      const users = await storage.getAllUsers();
      
      // Aus Sicherheitsgründen Passwörter aus der Antwort entfernen
      const safeUsers = users.map((user: User) => ({
        ...user,
        password: undefined
      }));
      
      res.json({
        success: true,
        users: safeUsers
      });
    } catch (error) {
      console.error("Fehler beim Abrufen der Benutzer:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // Einzelnen Benutzer abrufen (nur für Admins)
  app.get("/api/admin/users/:id", adminAuthMiddleware, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Benutzer-ID"
        });
      }
      
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Benutzer nicht gefunden"
        });
      }
      
      // Aus Sicherheitsgründen Passwort aus der Antwort entfernen
      const safeUser = {
        ...user,
        password: undefined
      };
      
      res.json({
        success: true,
        user: safeUser
      });
    } catch (error) {
      console.error("Fehler beim Abrufen des Benutzers:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // Benutzer aktualisieren (nur für Admins)
  app.patch("/api/admin/users/:id", adminAuthMiddleware, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Benutzer-ID"
        });
      }
      
      const { username, email, name, isAdmin } = req.body;
      
      // Nur erlaubte Felder aktualisieren
      const userData: Record<string, any> = {};
      if (username !== undefined) userData.username = username;
      if (email !== undefined) userData.email = email;
      if (name !== undefined) userData.name = name;
      if (isAdmin !== undefined) userData.isAdmin = isAdmin;
      
      // Neues Passwort setzen (falls vorhanden)
      if (req.body.password) {
        userData.password = await hashPassword(req.body.password);
      }
      
      const updatedUser = await storage.updateUser(id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Benutzer nicht gefunden"
        });
      }
      
      // Aus Sicherheitsgründen Passwort aus der Antwort entfernen
      const safeUser = {
        ...updatedUser,
        password: undefined
      };
      
      res.json({
        success: true,
        message: "Benutzer erfolgreich aktualisiert",
        user: safeUser
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Benutzers:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });
  
  // Benutzer löschen (nur für Admins)
  app.delete("/api/admin/users/:id", adminAuthMiddleware, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Ungültige Benutzer-ID"
        });
      }
      
      // Prüfen, ob der zu löschende Benutzer existiert
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Benutzer nicht gefunden"
        });
      }
      
      // Verhindern, dass der letzte Admin-Benutzer gelöscht wird
      if (user.isAdmin) {
        const allUsers = await storage.getAllUsers();
        const adminUsers = allUsers.filter((u: User) => u.isAdmin);
        
        if (adminUsers.length <= 1) {
          return res.status(400).json({
            success: false,
            message: "Der letzte Administrator kann nicht gelöscht werden"
          });
        }
      }
      
      await storage.deleteUser(id);
      
      res.json({
        success: true,
        message: "Benutzer erfolgreich gelöscht"
      });
    } catch (error) {
      console.error("Fehler beim Löschen des Benutzers:", error);
      res.status(500).json({
        success: false,
        message: "Ein Serverfehler ist aufgetreten"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
