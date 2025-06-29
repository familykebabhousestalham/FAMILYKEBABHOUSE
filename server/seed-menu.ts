// server/seed-menu.ts
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../shared/schema';
import { menuItems } from '../shared/schema';

// ✅ Load downloaded JSON dataset with nutrition
const menuData: Array<Record<string, any>> = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'db', 'menu_items.json'), 'utf8')
);

// 1️⃣ Locate or create the database file
const dbFile =
  process.env.DATABASE_URL?.replace(/^sqlite:/, '').trim() ??
  path.resolve(__dirname, '../dev.db');
if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, '');

const rawDb = new Database(dbFile);
const db = drizzle(rawDb, { schema });

// 2️⃣ Apply DDL from schema.sql
const ddlPath = path.resolve(__dirname, 'db', 'schema.sql');
if (fs.existsSync(ddlPath)) {
  const ddl = fs.readFileSync(ddlPath, 'utf8');
  rawDb.exec(ddl);
  console.log('✅ Schema applied from schema.sql');
} else {
  console.warn(`⚠️ schema.sql not found at ${ddlPath}; skipping DDL apply`);
}

async function seedMenu() {
  console.log('🚀 Starting menu seeding…');
  try {
    await db.delete(menuItems);
    console.log('🧹 Cleared existing menu items');

    const insertData = menuData.map((item) => ({
      name: item.name,
      description: item.description ?? null,
      category: item.category,
      price_small: item.priceSmall ?? null,
      price_medium: item.priceMedium ?? null,
      price_large: item.priceLarge ?? null,
      price_x_large: item.priceXLarge ?? null,
      price_10_inches: item.price10inches ?? null,
      price_12_inches: item.price12inches ?? null,
      single_price: item.singlePrice ?? null,
      is_special: item.isSpecial ? 1 : 0,
      is_available: 1,
      calories: item.calories ?? null,
      protein: item.protein ?? null,
      carbs: item.carbs ?? null,
      fat: item.fat ?? null,
      fiber: item.fiber ?? null,
      sodium: item.sodium ?? null,
      allergens: Array.isArray(item.allergens)
        ? item.allergens.join(', ')
        : item.allergens ?? null,
      ingredients: Array.isArray(item.ingredients)
        ? item.ingredients.join(', ')
        : item.ingredients ?? null,
    }));

    await db.insert(menuItems).values(insertData as any);
    console.log(`✅ Successfully seeded ${insertData.length} menu items`);

    const rows = await db.select().from(menuItems);
    console.log(`📊 Database now contains ${rows.length} menu items`);
  } catch (err) {
    console.error('❌ Error seeding menu:', err);
    throw err;
  } finally {
    rawDb.close();
  }
}

if (require.main === module) {
  seedMenu()
    .then(() => {
      console.log('🎉 Menu seeding completed successfully');
      process.exit(0);
    })
    .catch(() => process.exit(1));
}

export { seedMenu };
