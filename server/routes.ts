import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";

export async function registerRoutes(app: Express): Promise<Server> {
  // PayPal integration routes
  app.get("/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/order", async (req, res) => {
    // Request body should contain: { intent, amount, currency }
    await createPaypalOrder(req, res);
  });

  app.post("/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
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

  const httpServer = createServer(app);

  return httpServer;
}
