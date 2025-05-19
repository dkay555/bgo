import { storage } from "./storage";
import { InsertProduct } from "@shared/schema";

// Definiere die Beispiel-Produkte
const sampleProducts: InsertProduct[] = [
  // Würfel-Produkte
  {
    name: "Würfelboost 25.000",
    description: "25.000 Würfel für Monopoly GO",
    productType: "dice",
    variant: "25000",
    price: "25",
    isActive: true,
  },
  {
    name: "Würfelboost 35.000",
    description: "35.000 Würfel für Monopoly GO",
    productType: "dice",
    variant: "35000",
    price: "35",
    isActive: true,
  },
  {
    name: "Würfelboost 45.000",
    description: "45.000 Würfel für Monopoly GO",
    productType: "dice",
    variant: "45000",
    price: "45",
    isActive: true,
  },
  {
    name: "Würfelboost SPECIAL",
    description: "60.000 Würfel für Monopoly GO zum Sonderpreis",
    productType: "dice",
    variant: "special",
    price: "55",
    isActive: true,
  },

  // Partnerevent-Produkte
  {
    name: "Partnerevent 1 Partner",
    description: "Partnerevent mit 1 Partner",
    productType: "partnerevent",
    variant: "1",
    price: "10",
    isActive: true,
  },
  {
    name: "Partnerevent 2 Partner",
    description: "Partnerevent mit 2 Partnern",
    productType: "partnerevent",
    variant: "2",
    price: "15",
    isActive: true,
  },
  {
    name: "Partnerevent 3 Partner",
    description: "Partnerevent mit 3 Partnern",
    productType: "partnerevent",
    variant: "3",
    price: "20",
    isActive: true,
  },
  {
    name: "Partnerevent 4 Partner",
    description: "Partnerevent mit 4 Partnern",
    productType: "partnerevent",
    variant: "4",
    price: "25",
    isActive: true,
  },

  // Tycoon Racers Produkte
  {
    name: "Tycoon Racers Bronze",
    description: "Tycoon Racers Event - Bronze-Paket",
    productType: "tycoonracers",
    variant: "bronze",
    price: "15",
    isActive: true,
  },
  {
    name: "Tycoon Racers Silber",
    description: "Tycoon Racers Event - Silber-Paket",
    productType: "tycoonracers",
    variant: "silber",
    price: "25",
    isActive: true,
  },
  {
    name: "Tycoon Racers Gold",
    description: "Tycoon Racers Event - Gold-Paket",
    productType: "tycoonracers",
    variant: "gold",
    price: "35",
    isActive: true,
  },

  // Sticker-Produkte
  {
    name: "Goldener Sticker",
    description: "Ein goldener Sticker für Ihre Sammlung",
    productType: "sticker",
    variant: "gold",
    price: "5",
    isActive: true,
  },
  {
    name: "Sticker-Set Normal",
    description: "5 zufällige normale Sticker für Ihre Sammlung",
    productType: "sticker",
    variant: "normal-5",
    price: "10",
    isActive: true,
  },
  {
    name: "Sticker-Set Premium",
    description: "10 zufällige Sticker (inkl. mindestens 1 goldener) für Ihre Sammlung",
    productType: "sticker",
    variant: "premium-10",
    price: "20",
    isActive: true,
  }
];

/**
 * Erstellt Beispiel-Produkte, wenn noch keine in der Datenbank vorhanden sind
 */
export async function seedProducts() {
  try {
    // Prüfen, ob bereits Produkte vorhanden sind
    const existingProducts = await storage.getAllProducts();

    if (existingProducts.length === 0) {
      console.log("Erstelle Beispiel-Produkte...");

      // Produkte anlegen
      for (const product of sampleProducts) {
        await storage.createProduct(product);
      }

      console.log(`${sampleProducts.length} Beispiel-Produkte wurden erfolgreich erstellt.`);
    } else {
      console.log(`Es existieren bereits ${existingProducts.length} Produkte in der Datenbank.`);
    }
  } catch (error) {
    console.error("Fehler beim Erstellen der Beispiel-Produkte:", error);
  }
}