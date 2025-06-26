// Comprehensive nutritional database for Family Kebab House menu items
// Based on authentic restaurant portion sizes and ingredients

export interface NutritionalInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sodium: string;
  allergens: string[];
  ingredients?: string[];
}

export const nutritionalDatabase: { [key: string]: NutritionalInfo } = {
  // KEBABS
  "Doner Kebab (Medium)": {
    calories: 580,
    protein: "35g",
    carbs: "45g",
    fat: "28g",
    fiber: "6g",
    sodium: "1200mg",
    allergens: ["Gluten", "Dairy", "Sesame"],
    ingredients: ["Lamb & chicken doner", "Pitta bread", "Fresh salad", "Garlic sauce", "Chili sauce"]
  },
  "Doner Kebab (Large)": {
    calories: 750,
    protein: "45g",
    carbs: "58g",
    fat: "35g",
    fiber: "8g",
    sodium: "1520mg",
    allergens: ["Gluten", "Dairy", "Sesame"],
    ingredients: ["Lamb & chicken doner", "Pitta bread", "Fresh salad", "Garlic sauce", "Chili sauce"]
  },
  "Doner Kebab (X-Large)": {
    calories: 920,
    protein: "55g",
    carbs: "72g",
    fat: "42g",
    fiber: "10g",
    sodium: "1850mg",
    allergens: ["Gluten", "Dairy", "Sesame"],
    ingredients: ["Lamb & chicken doner", "Pitta bread", "Fresh salad", "Garlic sauce", "Chili sauce"]
  },
  "Shish Kebab (Medium)": {
    calories: 520,
    protein: "38g",
    carbs: "42g",
    fat: "22g",
    fiber: "6g",
    sodium: "980mg",
    allergens: ["Gluten", "Sesame"],
    ingredients: ["Marinated lamb cubes", "Pitta bread", "Fresh salad", "Mint yogurt sauce"]
  },
  "Shish Kebab (Large)": {
    calories: 680,
    protein: "48g",
    carbs: "55g",
    fat: "28g",
    fiber: "8g",
    sodium: "1250mg",
    allergens: ["Gluten", "Sesame"],
    ingredients: ["Marinated lamb cubes", "Pitta bread", "Fresh salad", "Mint yogurt sauce"]
  },
  "Chicken Shish (Medium)": {
    calories: 480,
    protein: "42g",
    carbs: "38g",
    fat: "18g",
    fiber: "5g",
    sodium: "890mg",
    allergens: ["Gluten", "Sesame"],
    ingredients: ["Marinated chicken breast", "Pitta bread", "Fresh salad", "Garlic sauce"]
  },
  "Chicken Shish (Large)": {
    calories: 620,
    protein: "52g",
    carbs: "48g",
    fat: "24g",
    fiber: "7g",
    sodium: "1120mg",
    allergens: ["Gluten", "Sesame"],
    ingredients: ["Marinated chicken breast", "Pitta bread", "Fresh salad", "Garlic sauce"]
  },
  "Kofte Kebab (Medium)": {
    calories: 550,
    protein: "32g",
    carbs: "44g",
    fat: "26g",
    fiber: "6g",
    sodium: "1150mg",
    allergens: ["Gluten", "Dairy", "Sesame", "Eggs"],
    ingredients: ["Spiced lamb meatballs", "Pitta bread", "Fresh salad", "Yogurt sauce"]
  },
  "Kofte Kebab (Large)": {
    calories: 720,
    protein: "42g",
    carbs: "56g",
    fat: "34g",
    fiber: "8g",
    sodium: "1480mg",
    allergens: ["Gluten", "Dairy", "Sesame", "Eggs"],
    ingredients: ["Spiced lamb meatballs", "Pitta bread", "Fresh salad", "Yogurt sauce"]
  },
  "Kebab Feast": {
    calories: 1850,
    protein: "95g",
    carbs: "120g",
    fat: "85g",
    fiber: "12g",
    sodium: "3200mg",
    allergens: ["Gluten", "Dairy", "Sesame", "Eggs"],
    ingredients: ["Doner meat", "Shish kebab", "Chicken shish", "Kofte", "3 pitta breads", "Large chips", "Mixed salad", "2 sauces"]
  },

  // BURGERS
  "2 oz Burger": {
    calories: 350,
    protein: "18g",
    carbs: "28g",
    fat: "20g",
    fiber: "3g",
    sodium: "780mg",
    allergens: ["Gluten", "Dairy", "Eggs"],
    ingredients: ["Beef patty", "Burger bun", "Lettuce", "Tomato", "Onion", "Sauce"]
  },
  "¼ Pounder with Cheese": {
    calories: 480,
    protein: "25g",
    carbs: "35g",
    fat: "28g",
    fiber: "4g",
    sodium: "950mg",
    allergens: ["Gluten", "Dairy", "Eggs"],
    ingredients: ["Quarter pound beef patty", "Cheese slice", "Burger bun", "Lettuce", "Tomato", "Onion"]
  },
  "½ Pounder with Double Cheese": {
    calories: 720,
    protein: "38g",
    carbs: "45g",
    fat: "42g",
    fiber: "5g",
    sodium: "1420mg",
    allergens: ["Gluten", "Dairy", "Eggs"],
    ingredients: ["Half pound beef patty", "Double cheese", "Burger bun", "Lettuce", "Tomato", "Onion"]
  },
  "Chicken Burger": {
    calories: 420,
    protein: "32g",
    carbs: "38g",
    fat: "18g",
    fiber: "4g",
    sodium: "820mg",
    allergens: ["Gluten", "Dairy", "Eggs"],
    ingredients: ["Breaded chicken breast", "Burger bun", "Lettuce", "Tomato", "Mayo"]
  },

  // PIZZAS
  "10\" Margherita": {
    calories: 850,
    protein: "32g",
    carbs: "98g",
    fat: "34g",
    fiber: "6g",
    sodium: "1680mg",
    allergens: ["Gluten", "Dairy"],
    ingredients: ["Fresh pizza dough", "Tomato sauce", "Mozzarella cheese", "Fresh basil"]
  },
  "12\" Margherita": {
    calories: 1200,
    protein: "45g",
    carbs: "140g",
    fat: "48g",
    fiber: "8g",
    sodium: "2380mg",
    allergens: ["Gluten", "Dairy"],
    ingredients: ["Fresh pizza dough", "Tomato sauce", "Mozzarella cheese", "Fresh basil"]
  },
  "10\" Pepperoni": {
    calories: 950,
    protein: "38g",
    carbs: "95g",
    fat: "42g",
    fiber: "6g",
    sodium: "1950mg",
    allergens: ["Gluten", "Dairy"],
    ingredients: ["Fresh pizza dough", "Tomato sauce", "Mozzarella cheese", "Pepperoni"]
  },
  "12\" Pepperoni": {
    calories: 1350,
    protein: "52g",
    carbs: "135g",
    fat: "58g",
    fiber: "8g",
    sodium: "2750mg",
    allergens: ["Gluten", "Dairy"],
    ingredients: ["Fresh pizza dough", "Tomato sauce", "Mozzarella cheese", "Pepperoni"]
  },

  // CHICKEN ITEMS
  "1 Piece Fried Chicken": {
    calories: 280,
    protein: "24g",
    carbs: "12g",
    fat: "16g",
    fiber: "1g",
    sodium: "620mg",
    allergens: ["Gluten"],
    ingredients: ["Chicken piece", "Seasoned coating", "Vegetable oil"]
  },
  "2 Pieces Fried Chicken": {
    calories: 560,
    protein: "48g",
    carbs: "24g",
    fat: "32g",
    fiber: "2g",
    sodium: "1240mg",
    allergens: ["Gluten"],
    ingredients: ["Chicken pieces", "Seasoned coating", "Vegetable oil"]
  },
  "3 Pieces Fried Chicken": {
    calories: 840,
    protein: "72g",
    carbs: "36g",
    fat: "48g",
    fiber: "3g",
    sodium: "1860mg",
    allergens: ["Gluten"],
    ingredients: ["Chicken pieces", "Seasoned coating", "Vegetable oil"]
  },
  "4 Pieces Fried Chicken": {
    calories: 1120,
    protein: "96g",
    carbs: "48g",
    fat: "64g",
    fiber: "4g",
    sodium: "2480mg",
    allergens: ["Gluten"],
    ingredients: ["Chicken pieces", "Seasoned coating", "Vegetable oil"]
  },
  "6 Chicken Wings": {
    calories: 480,
    protein: "36g",
    carbs: "8g",
    fat: "34g",
    fiber: "0g",
    sodium: "920mg",
    allergens: ["Gluten"],
    ingredients: ["Chicken wings", "Buffalo sauce", "Seasoning"]
  },
  "10 Chicken Nuggets": {
    calories: 450,
    protein: "28g",
    carbs: "32g",
    fat: "24g",
    fiber: "2g",
    sodium: "980mg",
    allergens: ["Gluten", "Eggs"],
    ingredients: ["Chicken breast pieces", "Breadcrumb coating", "Vegetable oil"]
  },

  // SIDES
  "Chips (Small)": {
    calories: 280,
    protein: "4g",
    carbs: "42g",
    fat: "12g",
    fiber: "4g",
    sodium: "420mg",
    allergens: ["None"],
    ingredients: ["Potatoes", "Vegetable oil", "Salt"]
  },
  "Chips (Regular)": {
    calories: 420,
    protein: "6g",
    carbs: "63g",
    fat: "18g",
    fiber: "6g",
    sodium: "630mg",
    allergens: ["None"],
    ingredients: ["Potatoes", "Vegetable oil", "Salt"]
  },
  "Chips (Large)": {
    calories: 560,
    protein: "8g",
    carbs: "84g",
    fat: "24g",
    fiber: "8g",
    sodium: "840mg",
    allergens: ["None"],
    ingredients: ["Potatoes", "Vegetable oil", "Salt"]
  },

  // WRAPS
  "Doner Wrap": {
    calories: 520,
    protein: "28g",
    carbs: "38g",
    fat: "26g",
    fiber: "4g",
    sodium: "1180mg",
    allergens: ["Gluten", "Dairy"],
    ingredients: ["Tortilla wrap", "Doner meat", "Fresh salad", "Sauce"]
  },
  "Chicken Wrap": {
    calories: 480,
    protein: "32g",
    carbs: "35g",
    fat: "22g",
    fiber: "4g",
    sodium: "980mg",
    allergens: ["Gluten", "Dairy"],
    ingredients: ["Tortilla wrap", "Grilled chicken", "Fresh salad", "Sauce"]
  },

  // DRINKS
  "Can of Coke": {
    calories: 139,
    protein: "0g",
    carbs: "35g",
    fat: "0g",
    fiber: "0g",
    sodium: "40mg",
    allergens: ["None"],
    ingredients: ["Carbonated water", "Sugar", "Caffeine", "Natural flavors"]
  },
  "Bottle of Water": {
    calories: 0,
    protein: "0g",
    carbs: "0g",
    fat: "0g",
    fiber: "0g",
    sodium: "0mg",
    allergens: ["None"],
    ingredients: ["Purified water"]
  },

  // DESSERTS
  "Chocolate Cake": {
    calories: 320,
    protein: "5g",
    carbs: "48g",
    fat: "14g",
    fiber: "3g",
    sodium: "280mg",
    allergens: ["Gluten", "Dairy", "Eggs"],
    ingredients: ["Flour", "Cocoa", "Sugar", "Butter", "Eggs"]
  },
  "Ice Cream": {
    calories: 250,
    protein: "4g",
    carbs: "32g",
    fat: "12g",
    fiber: "0g",
    sodium: "85mg",
    allergens: ["Dairy"],
    ingredients: ["Milk", "Cream", "Sugar", "Natural flavors"]
  }
};

// Helper function to get nutritional info with fuzzy matching
export function getNutritionalInfo(itemName: string, category: string): NutritionalInfo {
  const cleanName = itemName.toLowerCase().trim();
  
  // Direct match first
  const directMatch = Object.keys(nutritionalDatabase).find(key => 
    key.toLowerCase() === cleanName
  );
  
  if (directMatch) {
    return nutritionalDatabase[directMatch];
  }
  
  // Fuzzy matching for variations
  const fuzzyMatch = Object.keys(nutritionalDatabase).find(key => {
    const keyLower = key.toLowerCase();
    return cleanName.includes(keyLower.split(' ')[0]) || keyLower.includes(cleanName.split(' ')[0]);
  });
  
  if (fuzzyMatch) {
    return nutritionalDatabase[fuzzyMatch];
  }
  
  // Category-based estimation for items not in database
  return estimateNutritionByCategory(itemName, category);
}

function kebabEstimate(isLarge: boolean): NutritionalInfo {
  return {
    calories: isLarge ? 720 : 550,
    protein: isLarge ? "42g" : "32g",
    carbs: isLarge ? "56g" : "44g",
    fat: isLarge ? "32g" : "25g",
    fiber: isLarge ? "7g" : "6g",
    sodium: isLarge ? "1380mg" : "1050mg",
    allergens: ["Gluten", "Dairy", "Sesame"],
    ingredients: ["Meat", "Pitta bread", "Fresh salad", "Sauce"]
  };
}

function pizzaEstimate(is12Inch: boolean): NutritionalInfo {
  return {
    calories: is12Inch ? 1200 : 850,
    protein: is12Inch ? "45g" : "32g",
    carbs: is12Inch ? "140g" : "98g",
    fat: is12Inch ? "48g" : "34g",
    fiber: is12Inch ? "8g" : "6g",
    sodium: is12Inch ? "2200mg" : "1550mg",
    allergens: ["Gluten", "Dairy"],
    ingredients: ["Fresh pizza dough", "Tomato sauce", "Cheese", "Toppings"]
  };
}

function burgerEstimate(): NutritionalInfo {
  return {
    calories: 480,
    protein: "25g",
    carbs: "35g",
    fat: "28g",
    fiber: "4g",
    sodium: "950mg",
    allergens: ["Gluten", "Dairy", "Eggs"],
    ingredients: ["Meat patty", "Burger bun", "Fresh vegetables", "Sauce"]
  };
}

function chickenEstimate(): NutritionalInfo {
  return {
    calories: 380,
    protein: "32g",
    carbs: "15g",
    fat: "24g",
    fiber: "1g",
    sodium: "820mg",
    allergens: ["Gluten"],
    ingredients: ["Chicken", "Seasoning", "Coating"]
  };
}

function defaultEstimate(): NutritionalInfo {
  return {
    calories: 420,
    protein: "22g",
    carbs: "35g",
    fat: "25g",
    fiber: "4g",
    sodium: "850mg",
    allergens: ["Check with staff"],
    ingredients: ["Various ingredients - ask staff for details"]
  };
}

function estimateNutritionByCategory(itemName: string, category: string): NutritionalInfo {
  const lowerName = itemName.toLowerCase();
  const lowerCat = category.toLowerCase();

  if (lowerCat.includes('kebab') || lowerName.includes('kebab')) {
    const isLarge = lowerName.includes('large') || lowerName.includes('xl');
    return kebabEstimate(isLarge);
  }
  if (lowerCat.includes('pizza') || lowerName.includes('pizza')) {
    const is12Inch = lowerName.includes('12"') || lowerName.includes('12 inch');
    return pizzaEstimate(is12Inch);
  }
  if (lowerCat.includes('burger') || lowerName.includes('burger')) {
    return burgerEstimate();
  }
  if (lowerCat.includes('chicken') || lowerName.includes('chicken')) {
    return chickenEstimate();
  }
  return defaultEstimate();
}
