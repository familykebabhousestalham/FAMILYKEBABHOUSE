// server/db.ts
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema";  // adjust path if needed
// Grab file name “./dev.db” from DATABASE_URL or default

// Pull the file path from DATABASE_URL ("sqlite:./dev.db" → "./dev.db"),
// or fall back to "./dev.db" if it’s unset/empty
const sqliteFile =
  process.env.DATABASE_URL
    ?.replace(/^sqlite:/, "")
    .trim()
  ?? "./dev.db";

// Open (or create) the file, then wrap in Drizzle, passing your schema
const rawDb = new Database(sqliteFile);
export const db = drizzle(rawDb, { schema });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Export your Drizzle-wrapped type for later injections
export type AppDb = typeof db;

