import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { insertOrderSchema } from "@shared/schema";
import { ZodError } from "zod";
import { sendNewOrderNotification, sendOrderConfirmation, sendEmailToCustomer } from "./email";
import { adminAuthMiddleware } from "./admin-auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // PayPal integration routes
  app.get("/setup", async (req, res) => {
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

  app.post("/order", async (req, res) => {
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

  app.post("/order/:orderID/capture", async (req, res) => {
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

  const httpServer = createServer(app);

  return httpServer;
}
