// server/index.ts
import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import cors from "cors";

import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import { db } from "./db";

// AUTO-SEED: import your seeder and table
import { seedMenu } from "./seed-menu";
import { menuItems } from "../shared/schema";

const app = express();

// — Enable CORS
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN ??
      "https://family-kebab-frontend.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// — Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// — Request logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let jsonBody: any = null;
  const origJson = res.json;
  res.json = function (body, ...args) {
    jsonBody = body;
    return origJson.call(this, body, ...args);
  };
  res.on("finish", () => {
    if (path.startsWith("/api")) {
      const ms = Date.now() - start;
      let line = `${req.method} ${path} ${res.statusCode} in ${ms}ms`;
      if (jsonBody) line += ` :: ${JSON.stringify(jsonBody)}`;
      if (line.length > 80) line = line.slice(0, 79) + "…";
      log(line);
    }
  });
  next();
});

(async () => {
  // — AUTO-SEED ON STARTUP
  try {
    const rows = await db.select().from(menuItems);
    if (rows.length === 0) {
      log("🔄 No menu items found, seeding database…");
      await seedMenu();
      log("✅ Auto-seeding complete.");
    } else {
      log(`ℹ️  Found ${rows.length} menu items, skipping auto-seed.`);
    }
  } catch (err: any) {
    log("❌ Error during auto-seed:", err);
  }

  // — Register routes
  const server = await registerRoutes(app, db);

  // — JSON error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status ?? err.statusCode ?? 500;
    res.status(status).json({ message: err.message ?? "Internal Server Error" });
    if (app.get("env") === "development") throw err; // crash in dev for stack
  });

  // — Vite middleware (dev only)
  if (app.get("env") === "development") {
    await setupVite(app, server);
  }

  // — Start server
  const port = parseInt(process.env.PORT ?? "5000", 10);
  const host = process.env.HOST ?? "0.0.0.0";
  server.listen(port, host, () => {
    const displayHost = host === "0.0.0.0" ? "localhost" : host;
    log(`🚀 Listening on http://${displayHost}:${port}`);
  });
})();
