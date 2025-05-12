import { users, type User, type InsertUser, orders, type Order, type InsertOrder } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// CRUD methods for User and Order
export interface IStorage {
  // Benutzerverwaltung
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Bestellungsverwaltung
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByEmail(email: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderPaymentStatus(id: number, status: string, reference?: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
}

export class DatabaseStorage implements IStorage {
  // Benutzerverwaltung
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
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
    return await db.select().from(orders);
  }
}

export const storage = new DatabaseStorage();
