import { db } from './db';
import { menuItems } from '../shared/schema';
import { menuData } from '../client/src/data/menu-data-new';

async function seedMenu() {
  console.log('Starting menu seeding...');
  
  try {
    // Clear existing data
    await db.delete(menuItems);
    console.log('Cleared existing menu items');

    // Insert new menu data
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
      is_special: item.isSpecial ?? false,
      calories: item.calories ?? null,
      protein: item.protein ?? null,
      carbs: item.carbs ?? null,
      fat: item.fat ?? null,
      fiber: item.fiber ?? null,
      sodium: item.sodium ?? null,
      allergens: Array.isArray(item.allergens) ? item.allergens.join(', ') : (item.allergens ?? null),
      ingredients: Array.isArray(item.ingredients) ? item.ingredients.join(', ') : (item.ingredients ?? null),
    }));

    await db.insert(menuItems).values(insertData);
    console.log(`Successfully seeded ${insertData.length} menu items`);

    // Verify seeding
    const count = await db.select().from(menuItems);
    console.log(`Database now contains ${count.length} menu items`);

    // Log categories for verification
    const categories = Array.from(new Set(count.map(item => item.category)));
    console.log('Categories in database:', categories);

  } catch (error) {
    console.error('Error seeding menu:', error);
    throw error;
  }
}

// Run if called directly
seedMenu()
  .then(() => {
    console.log('Menu seeding completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Menu seeding failed:', error);
    process.exit(1);
  });

export { seedMenu };
