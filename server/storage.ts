import { users, menuItems, type User, type InsertUser, type MenuItem, type InsertMenuItem } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem | undefined>;
  deleteMenuItem(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllMenuItems(): Promise<any[]> {
    const items = await db.select().from(menuItems);
    return items.map(item => ({
      ...item,
      priceSmall: item.price_small,
      priceMedium: item.price_medium,
      priceLarge: item.price_large,
      priceXLarge: item.price_x_large,
      price10inches: item.price_10_inches,
      price12inches: item.price_12_inches,
      singlePrice: item.single_price,
      isSpecial: item.is_special,
      isAvailable: item.is_available
    }));
  }

  async getMenuItemsByCategory(category: string): Promise<any[]> {
    const items = await db.select().from(menuItems).where(eq(menuItems.category, category));
    return items.map(item => ({
      ...item,
      priceSmall: item.price_small,
      priceMedium: item.price_medium,
      priceLarge: item.price_large,
      priceXLarge: item.price_x_large,
      price10inches: item.price_10_inches,
      price12inches: item.price_12_inches,
      singlePrice: item.single_price,
      isSpecial: item.is_special,
      isAvailable: item.is_available
    }));
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [menuItem] = await db
      .insert(menuItems)
      .values(item)
      .returning();
    return menuItem;
  }

  async updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem | undefined> {
    const [menuItem] = await db
      .update(menuItems)
      .set(item)
      .where(eq(menuItems.id, id))
      .returning();
    return menuItem || undefined;
  }

  async deleteMenuItem(id: number): Promise<boolean> {
    const result = await db
      .delete(menuItems)
      .where(eq(menuItems.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();
