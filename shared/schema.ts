import { pgTable, text, serial, integer, boolean, timestamp, varchar, numeric, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session-Tabelle für Express-Session mit connect-pg-simple
export const sessions = pgTable("session", {
  sid: varchar("sid").primaryKey().notNull(),
  sess: json("sess").notNull(),
  expire: timestamp("expire", { mode: "date" }).notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  name: text("name"),
  isAdmin: boolean("is_admin").default(false).notNull(),
  authToken: text("auth_token"),
  authTokenUpdatedAt: timestamp("auth_token_updated_at"),
  fbUsername: text("fb_username"),
  fbPassword: text("fb_password"),
  friendLink: text("friend_link"),
  ingameName: text("ingame_name"),
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
  name: text("name").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp"),
  
  // Bestelldetails
  productType: text("product_type").default("dice"), // "dice", "partnerevent", "tycoonracers", "sticker"
  package: text("package").notNull(), // Produkt-Info (z.B. "25000" für Würfel, "3 Partner" für Partnerevent)
  price: numeric("price").notNull(),   // Preis
  
  // Zusätzliche Produktdaten als JSON (für Partner, Tycoon Racers, etc.)
  accountData: text("account_data"),
  
  // Monopoly-Daten
  authMethod: text("auth_method").notNull(), // "authtoken" oder "login"
  ingameName: text("ingame_name").notNull(),
  
  // Facebook-Login und Daten
  fbLogin: text("fb_login"),
  authToken: text("auth_token"),
  friendshipLink: text("friendship_link"),
  accountName: text("account_name"),
  
  // Ausführungsdetails für Würfelboost
  executionTime: text("execution_time").default("schnellstmöglich"),
  
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
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  subject: text("subject"),
  phone: text("phone"),
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
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("open"), // "open", "in_progress", "closed"
  priority: text("priority").notNull().default("normal"), // "low", "normal", "high"
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
  name: text("name").notNull(),
  description: text("description"),
  productType: text("product_type").notNull(), // 'dice', 'partnerevent', 'tycoonracers', 'sticker'
  variant: text("variant"), // z.B. '25000', 'bronze', '100' usw.
  price: numeric("price").notNull(),
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
  templateKey: text("template_key").notNull().unique(),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
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
