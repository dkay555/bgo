import { pgTable, text, serial, integer, boolean, timestamp, varchar, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Tabelle für Würfelbestellungen
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  // Persönliche Daten
  name: text("name").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp"),
  
  // Bestelldetails
  package: text("package").notNull(), // Packungsgröße (z.B. "25000", "35000", usw.)
  price: numeric("price").notNull(),   // Preis
  
  // Monopoly-Daten
  authMethod: text("auth_method").notNull(), // "authtoken" oder "login"
  ingameName: text("ingame_name").notNull(),
  
  // Für Authtoken-Methode
  authtoken: text("authtoken"),
  
  // Für Login-Methode
  loginEmail: text("login_email"),
  password: text("password"),
  recoveryCode1: text("recovery_code1"),
  recoveryCode2: text("recovery_code2"),
  
  // Zahlungsdaten
  paymentMethod: text("payment_method").notNull(), // z.B. "paypal", "bank_transfer"
  paymentStatus: text("payment_status").notNull().default("pending"), // "pending", "completed", "failed"
  paymentReference: text("payment_reference"), // Zahlungsreferenz oder Transaktions-ID
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  
  // Zustimmungen
  agreedToTerms: boolean("agreed_to_terms").notNull(),
  agreedToWithdrawalNotice: boolean("agreed_to_withdrawal_notice").notNull(),
});

export const insertOrderSchema = createInsertSchema(orders)
  .omit({ 
    id: true, 
    createdAt: true, 
    updatedAt: true 
  })
  .refine(data => {
    // Authtoken benötigt, wenn authMethod "authtoken" ist
    if (data.authMethod === 'authtoken' && !data.authtoken) {
      return false;
    }
    
    // Login-Daten benötigt, wenn authMethod "login" ist
    if (data.authMethod === 'login' && 
        (!data.loginEmail || !data.password || !data.recoveryCode1 || !data.recoveryCode2)) {
      return false;
    }
    
    return true;
  }, {
    message: "Ungültige Authentifizierungsdaten für die gewählte Methode"
  });

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
