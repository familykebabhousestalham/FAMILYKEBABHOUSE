// server/index.ts
import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";

import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { db } from "./db"; // Ensure db is typed with shared/schema

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ——— Request logging middleware ———
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
  // 1) Wire your typed SQLite db into your routes
  const server = await registerRoutes(app, db);

  // 2) JSON error handler
  app.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status ?? err.statusCode ?? 500;
      res.status(status).json({ message: err.message ?? "Internal Server Error" });
      // rethrow if you need to crash in dev
      throw err;
    }
  );

  // 3) Dev vs Prod: Vite‐middleware or static‐serve
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // 4) Launch
  const port = parseInt(process.env.PORT ?? "5000", 10);
  const host = process.env.HOST ?? "0.0.0.0";
  server.listen(port, host, () => {
    const displayHost = host === "0.0.0.0" ? "localhost" : host;
    log(`🚀 Listening on http://${displayHost}:${port}`);
  });
})();
