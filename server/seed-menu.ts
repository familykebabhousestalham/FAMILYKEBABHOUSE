// server/seed-menu.ts
import fs from "fs";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../shared/schema";
import { menuItems } from "../shared/schema";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ESM‐safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// Paths relative to this file
const menuJsonPath = resolve(__dirname, "db", "menu_items.json");
const ddlPath      = resolve(__dirname, "db", "schema.sql");
const dbFile       =
  process.env.DATABASE_URL?.replace(/^sqlite:/, "").trim() ||
  resolve(__dirname, "../dev.db");

// Load JSON dataset
const menuData: Record<string, any>[] = JSON.parse(
  fs.readFileSync(menuJsonPath, "utf8")
);

// Ensure the SQLite file exists
if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, "");

// Open & wrap with Drizzle
const rawDb = new Database(dbFile);
const db    = drizzle(rawDb, { schema });

// Apply DDL if present
if (fs.existsSync(ddlPath)) {
  rawDb.exec(fs.readFileSync(ddlPath, "utf8"));
  console.log("✅ Schema applied from schema.sql");
} else {
  console.warn(`⚠ schema.sql not found at ${ddlPath}, skipping DDL`);
}

// Seeder function
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

// CLI runner: seeds when invoked via `tsx seed-menu.ts`
if (import.meta.url.endsWith("/seed-menu.ts")) {
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
