import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { insertOrderSchema } from "@shared/schema";
import { ZodError } from "zod";

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
  
  // Bestellungsrouten
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      // Validiere die Daten mit dem Zod-Schema
      const orderData = insertOrderSchema.parse(req.body);
      
      // Speichere die Bestellung in der Datenbank
      const order = await storage.createOrder(orderData);
      
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
  
  // Zahlungsstatus einer Bestellung aktualisieren
  app.patch("/api/orders/:id/payment", async (req: Request, res: Response) => {
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
