import { pgTable, text, serial, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  price_small: real("price_small"),
  price_medium: real("price_medium"),
  price_large: real("price_large"),
  price_x_large: real("price_x_large"),
  price_10_inches: real("price_10_inches"),
  price_12_inches: real("price_12_inches"),
  single_price: real("single_price"),
  is_special: boolean("is_special").default(false),
  is_available: boolean("is_available").default(true),
  // Nutritional information
  calories: real("calories"),
  protein: real("protein"),
  carbs: real("carbs"),
  fat: real("fat"),
  fiber: real("fiber"),
  sodium: real("sodium"),
  allergens: text("allergens"),
  ingredients: text("ingredients"),
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
});

export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type MenuItem = typeof menuItems.$inferSelect;

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
