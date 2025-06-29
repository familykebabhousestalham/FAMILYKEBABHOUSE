// server/seed-menu.ts
import fs from "fs";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../shared/schema";
import { menuItems } from "../shared/schema";
import { resolve } from "path";

// ─── ESM‐safe __dirname + CLI runner detection ─────────────────────────────────
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// ─── Resolve all file paths from the server folder ────────────────────────────
// Note: projectRoot is the '/server' folder when you run `npm --prefix server run seed`
const projectRoot  = process.cwd();
const menuJsonPath = resolve(projectRoot, "db", "menu_items.json");
const ddlPath      = resolve(projectRoot, "db", "schema.sql");
const dbFile       =
  process.env.DATABASE_URL?.replace(/^sqlite:/, "").trim() ||
  resolve(projectRoot, "dev.db");

// ─── Load JSON dataset ────────────────────────────────────────────────────────
const menuData: Record<string, any>[] = JSON.parse(
  fs.readFileSync(menuJsonPath, "utf8")
);

// ─── Ensure the SQLite file exists ────────────────────────────────────────────
if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, "");

// ─── Open & wrap with Drizzle ────────────────────────────────────────────────
const rawDb = new Database(dbFile);
const db    = drizzle(rawDb, { schema });

// ─── Apply DDL if present ────────────────────────────────────────────────────
if (fs.existsSync(ddlPath)) {
  rawDb.exec(fs.readFileSync(ddlPath, "utf8"));
  console.log("✅ Schema applied from schema.sql");
} else {
  console.warn(`⚠ schema.sql not found at ${ddlPath}, skipping DDL`);
}

// ─── The seeder function ─────────────────────────────────────────────────────
export async function seedMenu() {
  console.log("🚀 Starting menu seeding…");
  try {
    await db.delete(menuItems);
    console.log("🧹 Cleared existing menu items");

    const insertData = menuData.map((item) => ({
      name:            item.name,
      description:     item.description ?? null,
      category:        item.category,
      price_small:     item.priceSmall  ?? null,
      price_medium:    item.priceMedium ?? null,
      price_large:     item.priceLarge  ?? null,
      price_x_large:   item.priceXLarge ?? null,
      price_10_inches: item.price10inches ?? null,
      price_12_inches: item.price12inches ?? null,
      single_price:    item.singlePrice ?? null,
      is_special:      item.isSpecial   ? 1 : 0,
      is_available:    1,
      calories:        item.calories  ?? null,
      protein:         item.protein   ?? null,
      carbs:           item.carbs     ?? null,
      fat:             item.fat       ?? null,
      fiber:           item.fiber     ?? null,
      sodium:          item.sodium    ?? null,
      allergens:       Array.isArray(item.allergens)
                          ? item.allergens.join(", ")
                          : item.allergens ?? null,
      ingredients:     Array.isArray(item.ingredients)
                          ? item.ingredients.join(", ")
                          : item.ingredients ?? null,
    }));

    await db.insert(menuItems).values(insertData as any);
    console.log(`✅ Seeded ${insertData.length} menu items`);

    const rows = await db.select().from(menuItems);
    console.log(`📊 Database now contains ${rows.length} items`);
  } catch (err: any) {
    console.error("❌ Error seeding menu:", err);
    throw err;
  } finally {
    rawDb.close();
  }
}

// ─── CLI runner — seeds when this file is invoked directly ───────────────────
if (import.meta.url === `file://${__filename}`) {
  seedMenu()
    .then(() => {
      console.log("🎉 Menu seeding completed successfully");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
