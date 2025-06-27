// server/routes.ts
import type { Express } from "express";
import { createServer, type Server } from "http";
import type { AppDb } from "./db";
import { createStorage } from "./storage";

export async function registerRoutes(
  app: Express,
  db: AppDb
): Promise<Server> {
  const storage = createStorage(db);

  app.get("/api/menu", async (_req, res) => {
    try {
      const items = await storage.getAllMenuItems();
      res.json(items);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu/:category", async (req, res) => {
    try {
      const items = await storage.getMenuItemsByCategory(req.params.category);
      res.json(items);
    } catch (err) {
      console.error("Error fetching menu items by category:", err);
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });

  return createServer(app);
}
