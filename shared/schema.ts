import { pgTable, text, serial, integer, boolean, timestamp, varchar, decimal, json, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session-Tabelle für Express-Session mit connect-pg-simple
// Diese Tabelle wird automatisch vom PostgreSQL-Session-Store erstellt
export const sessions = pgTable("sessions", {
  session_id: varchar("session_id", { length: 128 }).primaryKey().notNull(),
  data: text("data").notNull(),
  expires: integer("expires").notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }),
  isAdmin: boolean("is_admin").default(false).notNull(),
  authToken: varchar("auth_token", { length: 255 }),
  authTokenUpdatedAt: timestamp("auth_token_updated_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users)
  .omit({
    id: true,
    authTokenUpdatedAt: true,
    createdAt: true,
    updatedAt: true
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Tabelle für Würfelbestellungen
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  // Persönliche Daten
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 255 }),
  
  // Bestelldetails
  productType: varchar("product_type", { length: 50 }).default("dice"), // "dice", "partnerevent", "tycoonracers", "sticker"
  package: varchar("package", { length: 255 }).notNull(), // Produkt-Info (z.B. "25000" für Würfel, "3 Partner" für Partnerevent)
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),   // Preis
  
  // Zusätzliche Produktdaten als JSON (für Partner, Tycoon Racers, etc.)
  accountData: text("account_data"),
  
  // Monopoly-Daten
  authMethod: varchar("auth_method", { length: 50 }).notNull(), // "authtoken" oder "login"
  ingameName: varchar("ingame_name", { length: 255 }).notNull(),
  
  // Facebook-Login und Daten
  fbLogin: varchar("fb_login", { length: 255 }),
  authToken: varchar("auth_token", { length: 255 }),
  friendshipLink: varchar("friendship_link", { length: 255 }),
  accountName: varchar("account_name", { length: 255 }),
  
  // Ausführungsdetails für Würfelboost
  executionTime: varchar("execution_time", { length: 50 }).default("schnellstmöglich"),
  
  // Für Authtoken-Methode
  authtoken: varchar("authtoken", { length: 255 }),
  
  // Für Login-Methode
  loginEmail: varchar("login_email", { length: 255 }),
  password: varchar("password", { length: 255 }),
  recoveryCode1: varchar("recovery_code1", { length: 255 }),
  recoveryCode2: varchar("recovery_code2", { length: 255 }),
  
  // Zahlungsdaten
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(), // z.B. "paypal", "bank_transfer"
  paymentStatus: varchar("payment_status", { length: 50 }).notNull().default("pending"), // "pending", "completed", "failed"
  paymentReference: varchar("payment_reference", { length: 255 }), // Zahlungsreferenz oder Transaktions-ID
  
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
  .transform((data) => {
    // Konvertieren des Preises von number zu string, wenn er als Zahl übergeben wird
    const updatedData = {...data};
    if (typeof updatedData.price === 'number') {
      updatedData.price = String(updatedData.price);
    }
    return updatedData;
  })
  .refine(data => {
    // Validieren, dass authMethod und ingameName immer vorhanden sind
    if (!data.authMethod || !data.ingameName) {
      return false;
    }

    try {
      // Wenn accountData vorhanden ist, prüfe auf erforderliche Felder je nach authMethod
      if (data.accountData) {
        const accountInfo = JSON.parse(data.accountData);
        
        // Prüfen, ob die erforderlichen Felder je nach Authentifizierungsmethode vorhanden sind
        if (data.authMethod === 'authtoken' && !accountInfo.authToken) {
          return false;
        }
        
        if (data.authMethod === 'login' && 
            (!accountInfo.fbEmail || !accountInfo.fbPassword || 
             !accountInfo.recoveryCode1 || !accountInfo.recoveryCode2)) {
          return false;
        }
      } else {
        // Wenn keine account-Daten vorhanden sind, ist das ein Fehler
        return false;
      }
    } catch (e) {
      // Bei Fehlern beim Parsen des JSON-Strings ist die Validierung fehlgeschlagen
      return false;
    }
    
    return true;
  }, {
    message: "Ungültige Authentifizierungsdaten für die gewählte Methode"
  });

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Tabelle für Kontaktanfragen
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  subject: varchar("subject", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  isRead: boolean("is_read").default(false).notNull(),
  isArchived: boolean("is_archived").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages)
  .omit({ 
    id: true, 
    isRead: true,
    isArchived: true,
    createdAt: true, 
    updatedAt: true 
  });

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Tabelle für Support-Tickets
export const supportTickets = pgTable("support_tickets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("open"), // "open", "in_progress", "closed"
  priority: varchar("priority", { length: 50 }).notNull().default("normal"), // "low", "normal", "high"
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const ticketReplies = pgTable("ticket_replies", {
  id: serial("id").primaryKey(),
  ticketId: integer("ticket_id").notNull().references(() => supportTickets.id),
  userId: integer("user_id").references(() => users.id),
  isAdmin: boolean("is_admin").default(false).notNull(), // Unterscheidet Admin-Antworten von Benutzerantworten
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTicketSchema = createInsertSchema(supportTickets)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true
  });

export const insertTicketReplySchema = createInsertSchema(ticketReplies)
  .omit({
    id: true,
    createdAt: true
  });

export type InsertTicket = z.infer<typeof insertTicketSchema>;
export type Ticket = typeof supportTickets.$inferSelect;
export type InsertTicketReply = z.infer<typeof insertTicketReplySchema>;
export type TicketReply = typeof ticketReplies.$inferSelect;

// Produkttabelle für den Shop
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  productType: varchar("product_type", { length: 50 }).notNull(), // 'dice', 'partnerevent', 'tycoonracers', 'sticker'
  variant: varchar("variant", { length: 50 }), // z.B. '25000', 'bronze', '100' usw.
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  isActive: boolean("is_active").default(true),
  stock: integer("stock").default(999), // Standardwert für digitale Produkte
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// E-Mail-Vorlagen für Systembenachrichtigungen
export const emailTemplates = pgTable("email_templates", {
  id: serial("id").primaryKey(),
  templateKey: varchar("template_key", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  variables: text("variables").notNull(), // JSON-String mit verfügbaren Variablen und Beschreibungen
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: integer("updated_by").references(() => users.id),
});

export const insertEmailTemplateSchema = createInsertSchema(emailTemplates)
  .omit({
    id: true,
    updatedAt: true
  });

export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type EmailTemplate = typeof emailTemplates.$inferSelect;
