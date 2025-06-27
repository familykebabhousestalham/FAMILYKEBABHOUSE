// server/storage.ts
import type { AppDb } from "./db";
import {
  users,
  menuItems,
  type User,
  type InsertUser,
  type MenuItem,
  type InsertMenuItem,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(
    id: number,
    item: Partial<InsertMenuItem>
  ): Promise<MenuItem | undefined>;
  deleteMenuItem(id: number): Promise<boolean>;
}

export function createStorage(db: AppDb): IStorage {
  return {
    async getUser(id) {
      const [u] = await db.select().from(users).where(eq(users.id, id));
      return u;
    },

    async getUserByUsername(username) {
      const [u] = await db
        .select()
        .from(users)
        .where(eq(users.username, username));
      return u;
    },

    async createUser(insertUser) {
      const [u] = await db.insert(users).values(insertUser).returning();
      return u;
    },

    async getAllMenuItems() {
      const rows = await db.select().from(menuItems);
      return rows.map((r: any) => ({
        ...r,
        priceSmall: r.price_small,
        priceMedium: r.price_medium,
        priceLarge: r.price_large,
        priceXLarge: r.price_x_large,
        price10inches: r.price_10_inches,
        price12inches: r.price_12_inches,
        singlePrice: r.single_price,
        isSpecial: r.is_special,
        isAvailable: r.is_available,
      }));
    },

    async getMenuItemsByCategory(category) {
      const rows = await db
        .select()
        .from(menuItems)
        .where(eq(menuItems.category, category));
      return rows.map((r: any) => ({
        ...r,
        priceSmall: r.price_small,
        priceMedium: r.price_medium,
        priceLarge: r.price_large,
        priceXLarge: r.price_x_large,
        price10inches: r.price_10_inches,
        price12inches: r.price_12_inches,
        singlePrice: r.single_price,
        isSpecial: r.is_special,
        isAvailable: r.is_available,
      }));
    },

    async createMenuItem(item) {
      const [m] = await db.insert(menuItems).values(item).returning();
      return m;
    },

    async updateMenuItem(id, item) {
      const [m] = await db
        .update(menuItems)
        .set(item)
        .where(eq(menuItems.id, id))
        .returning();
      return m;
    },

    async deleteMenuItem(id) {
      const result = await db.delete(menuItems).where(eq(menuItems.id, id));
      // better-sqlite3’s RunResult uses `changes` for number of rows deleted
      return (result.changes ?? 0) > 0;
    },
  };
}
