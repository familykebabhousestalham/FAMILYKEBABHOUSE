var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";
import "dotenv/config";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  insertMenuItemSchema: () => insertMenuItemSchema,
  insertUserSchema: () => insertUserSchema,
  menuItems: () => menuItems,
  users: () => users
});
import { pgTable, text, serial, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var menuItems = pgTable("menu_items", {
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
  ingredients: text("ingredients")
});
var insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true
});
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});

// server/storage.ts
import { eq } from "drizzle-orm";
function createStorage(db2) {
  return {
    async getUser(id) {
      const [u] = await db2.select().from(users).where(eq(users.id, id));
      return u;
    },
    async getUserByUsername(username) {
      const [u] = await db2.select().from(users).where(eq(users.username, username));
      return u;
    },
    async createUser(insertUser) {
      const [u] = await db2.insert(users).values(insertUser).returning();
      return u;
    },
    async getAllMenuItems() {
      const rows = await db2.select().from(menuItems);
      return rows.map((r) => ({
        ...r,
        priceSmall: r.price_small,
        priceMedium: r.price_medium,
        priceLarge: r.price_large,
        priceXLarge: r.price_x_large,
        price10inches: r.price_10_inches,
        price12inches: r.price_12_inches,
        singlePrice: r.single_price,
        isSpecial: r.is_special,
        isAvailable: r.is_available
      }));
    },
    async getMenuItemsByCategory(category) {
      const rows = await db2.select().from(menuItems).where(eq(menuItems.category, category));
      return rows.map((r) => ({
        ...r,
        priceSmall: r.price_small,
        priceMedium: r.price_medium,
        priceLarge: r.price_large,
        priceXLarge: r.price_x_large,
        price10inches: r.price_10_inches,
        price12inches: r.price_12_inches,
        singlePrice: r.single_price,
        isSpecial: r.is_special,
        isAvailable: r.is_available
      }));
    },
    async createMenuItem(item) {
      const [m] = await db2.insert(menuItems).values(item).returning();
      return m;
    },
    async updateMenuItem(id, item) {
      const [m] = await db2.update(menuItems).set(item).where(eq(menuItems.id, id)).returning();
      return m;
    },
    async deleteMenuItem(id) {
      const result = await db2.delete(menuItems).where(eq(menuItems.id, id));
      return (result.changes ?? 0) > 0;
    }
  };
}

// server/routes.ts
async function registerRoutes(app2, db2) {
  const storage = createStorage(db2);
  app2.get("/api/menu", async (_req, res) => {
    try {
      const items = await storage.getAllMenuItems();
      res.json(items);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });
  app2.get("/api/menu/:category", async (req, res) => {
    try {
      const items = await storage.getMenuItemsByCategory(req.params.category);
      res.json(items);
    } catch (err) {
      console.error("Error fetching menu items by category:", err);
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });
  return createServer(app2);
}

// server/vite.ts
import { fileURLToPath as fileURLToPath2 } from "url";
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  plugins: [react()],
  root: "client",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared")
    }
  },
  build: {
    outDir: "../dist/public"
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename = fileURLToPath2(import.meta.url);
var __dirname2 = path2.dirname(__filename);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: ["all"]
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: {
      ...serverOptions,
      allowedHosts: true
      // explicitly set to true
    },
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(__dirname2, "..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`);
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/db.ts
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
var sqliteFile = process.env.DATABASE_URL?.replace(/^sqlite:/, "").trim() ?? "./dev.db";
var rawDb = new Database(sqliteFile);
var db = drizzle(rawDb, { schema: schema_exports });
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let jsonBody = null;
  const origJson = res.json;
  res.json = function(body, ...args) {
    jsonBody = body;
    return origJson.call(this, body, ...args);
  };
  res.on("finish", () => {
    if (path3.startsWith("/api")) {
      const ms = Date.now() - start;
      let line = `${req.method} ${path3} ${res.statusCode} in ${ms}ms`;
      if (jsonBody) line += ` :: ${JSON.stringify(jsonBody)}`;
      if (line.length > 80) line = line.slice(0, 79) + "\u2026";
      log(line);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app, db);
  app.use(
    (err, _req, res, _next) => {
      const status = err.status ?? err.statusCode ?? 500;
      res.status(status).json({ message: err.message ?? "Internal Server Error" });
      throw err;
    }
  );
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT ?? "5000", 10);
  const host = process.env.HOST ?? "0.0.0.0";
  server.listen(port, host, () => {
    const displayHost = host === "0.0.0.0" ? "localhost" : host;
    log(`\u{1F680} Listening on http://${displayHost}:${port}`);
  });
})();
