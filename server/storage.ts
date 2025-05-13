import { 
  users, type User, type InsertUser, 
  orders, type Order, type InsertOrder,
  contactMessages, type ContactMessage, type InsertContactMessage,
  supportTickets, type Ticket, type InsertTicket,
  ticketReplies, type TicketReply, type InsertTicketReply,
  products, type Product, type InsertProduct
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

// CRUD methods for User, Order and ContactMessage
export interface IStorage {
  // Session-Verwaltung
  sessionStore: session.Store;

  // Benutzerverwaltung
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserAuthToken(id: number, authToken: string): Promise<User | undefined>;
  updateUserProfile(id: number, userData: { name?: string; email?: string }): Promise<User | undefined>;
  getUserOrderHistory(userId: number): Promise<Order[]>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  deleteUser(id: number): Promise<void>;
  
  // Bestellungsverwaltung
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByEmail(email: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderPaymentStatus(id: number, status: string, reference?: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  
  // Kontaktanfragenverwaltung
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  getAllContactMessages(archived?: boolean): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;
  archiveContactMessage(id: number): Promise<ContactMessage | undefined>;
  deleteContactMessage(id: number): Promise<void>;
  
  // Ticketverwaltung
  getTicket(id: number): Promise<Ticket | undefined>;
  getTicketsForUser(userId: number): Promise<Ticket[]>;
  getAllTickets(status?: string): Promise<Ticket[]>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  updateTicketStatus(id: number, status: string): Promise<Ticket | undefined>;
  
  // Ticket-Antwortenverwaltung
  getTicketReplies(ticketId: number): Promise<TicketReply[]>;
  createTicketReply(reply: InsertTicketReply): Promise<TicketReply>;
  
  // Produktverwaltung
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByType(productType: string): Promise<Product[]>;
  getAllProducts(activeOnly?: boolean): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, productData: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Session-Verwaltung
  sessionStore: session.Store;

  constructor() {
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({ 
      pool,
      createTableIfMissing: true 
    });
  }

  // Benutzerverwaltung
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserAuthToken(id: number, authToken: string): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({
        authToken,
        authTokenUpdatedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(users.id, id))
      .returning();
    
    return updatedUser;
  }
  
  async updateUserProfile(id: number, userData: { name?: string; email?: string }): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ 
        ...(userData.name !== undefined ? { name: userData.name } : {}),
        ...(userData.email !== undefined ? { email: userData.email } : {}),
        updatedAt: new Date()
      })
      .where(eq(users.id, id))
      .returning();
    
    return updatedUser;
  }

  async getUserOrderHistory(userId: number): Promise<Order[]> {
    const user = await this.getUser(userId);
    if (!user || !user.email) {
      return [];
    }
    
    return await this.getOrdersByEmail(user.email);
  }
  
  // Bestellungsverwaltung
  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }
  
  async getOrdersByEmail(email: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.email, email));
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values({
        ...insertOrder,
        // Daten für Timestamps werden automatisch gesetzt
      })
      .returning();
    return order;
  }
  
  async updateOrderPaymentStatus(id: number, status: string, reference?: string): Promise<Order | undefined> {
    const updateData: any = { 
      paymentStatus: status,
      updatedAt: new Date()
    };
    
    if (reference) {
      updateData.paymentReference = reference;
    }
    
    const [updatedOrder] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning();
      
    return updatedOrder;
  }
  
  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }
  
  // Kontaktanfragenverwaltung
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message;
  }
  
  async getAllContactMessages(archived: boolean = false): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.isArchived, archived))
      .orderBy(desc(contactMessages.createdAt));
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
      
    return newMessage;
  }
  
  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const [updatedMessage] = await db
      .update(contactMessages)
      .set({
        isRead: true,
        updatedAt: new Date()
      })
      .where(eq(contactMessages.id, id))
      .returning();
      
    return updatedMessage;
  }
  
  async archiveContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [archivedMessage] = await db
      .update(contactMessages)
      .set({
        isArchived: true,
        updatedAt: new Date()
      })
      .where(eq(contactMessages.id, id))
      .returning();
      
    return archivedMessage;
  }
  
  async deleteContactMessage(id: number): Promise<void> {
    await db
      .delete(contactMessages)
      .where(eq(contactMessages.id, id));
  }

  // Ticketverwaltung
  async getTicket(id: number): Promise<Ticket | undefined> {
    const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, id));
    return ticket;
  }

  async getTicketsForUser(userId: number): Promise<Ticket[]> {
    return await db
      .select()
      .from(supportTickets)
      .where(eq(supportTickets.userId, userId))
      .orderBy(desc(supportTickets.createdAt));
  }

  async getAllTickets(status?: string): Promise<Ticket[]> {
    let query = db.select().from(supportTickets);
    
    if (status) {
      query = query.where(eq(supportTickets.status, status));
    }
    
    return await query.orderBy(desc(supportTickets.createdAt));
  }

  async createTicket(ticket: InsertTicket): Promise<Ticket> {
    const [newTicket] = await db
      .insert(supportTickets)
      .values(ticket)
      .returning();
      
    return newTicket;
  }

  async updateTicketStatus(id: number, status: string): Promise<Ticket | undefined> {
    const [updatedTicket] = await db
      .update(supportTickets)
      .set({
        status,
        updatedAt: new Date()
      })
      .where(eq(supportTickets.id, id))
      .returning();
      
    return updatedTicket;
  }

  // Ticket-Antwortenverwaltung
  async getTicketReplies(ticketId: number): Promise<TicketReply[]> {
    return await db
      .select()
      .from(ticketReplies)
      .where(eq(ticketReplies.ticketId, ticketId))
      .orderBy(ticketReplies.createdAt);
  }

  async createTicketReply(reply: InsertTicketReply): Promise<TicketReply> {
    const [newReply] = await db
      .insert(ticketReplies)
      .values(reply)
      .returning();
      
    return newReply;
  }

  // Produktverwaltungsmethoden
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return product || undefined;
  }

  async getProductsByType(productType: string): Promise<Product[]> {
    return db
      .select()
      .from(products)
      .where(eq(products.productType, productType))
      .orderBy(products.price);
  }

  async getAllProducts(activeOnly: boolean = false): Promise<Product[]> {
    let query = db.select().from(products);
    
    if (activeOnly) {
      query = query.where(eq(products.isActive, true));
    }
    
    return query.orderBy(products.productType, products.price);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: number, productData: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set({ ...productData, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct || undefined;
  }

  async deleteProduct(id: number): Promise<void> {
    await db
      .delete(products)
      .where(eq(products.id, id));
  }
  
  // Zusätzliche Benutzerverwaltung für Admin-Bereich
  async getAllUsers(): Promise<User[]> {
    return db
      .select()
      .from(users)
      .orderBy(users.username);
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ 
        ...userData, 
        updatedAt: new Date() 
      })
      .where(eq(users.id, id))
      .returning();
    return updatedUser || undefined;
  }
  
  async deleteUser(id: number): Promise<void> {
    await db
      .delete(users)
      .where(eq(users.id, id));
  }
}

export const storage = new DatabaseStorage();
