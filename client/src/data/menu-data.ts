// client/src/data/menu-data.ts

// 1) Your full 76-item list
export * from "./menu-data-new";

// 2) The nav categories (now including pizzas & garlic bread)
export const categories = [
  { id: "lunch-time-offers",           name: "Lunch Time Offers (12:00-14:30)", icon: "⏰" },
  { id: "burgers",                     name: "Burgers",                       icon: "🍔" },
  { id: "fried-chicken",               name: "Fried Chicken",                 icon: "🍗" },
  { id: "chicken-bargain-meals",       name: "Chicken Bargain Meals",         icon: "🍱" },
  { id: "chicken-wings-strips",        name: "Chicken Wings & Strips",        icon: "🔥" },
  { id: "chicken-nuggets",             name: "Chicken Nuggets",               icon: "🍿" },
  { id: "scampi",                      name: "Scampi",                        icon: "🍤" },
  { id: "desserts",                    name: "Desserts",                      icon: "🍰" },
  { id: "extras",                      name: "Sides & Add-Ons",               icon: "🍟" },
  { id: "drinks",                      name: "Drinks",                        icon: "🥤" },
  { id: "kids-meals",                  name: "Kids Meals",                    icon: "👶" },
  { id: "pizzas",                      name: "Pizzas",                        icon: "🍕" },
  { id: "garlic-bread-pizza-extras",   name: "Garlic Bread & Pizza Extras",   icon: "🧄" },
  { id: "pizza-offers",                name: "Pizza Offers",                  icon: "🎯" },
  { id: "family-deals",                name: "Family Deals",                  icon: "👨‍👩‍👧‍👦" },
  { id: "chicken-combo-meals",         name: "Chicken Combo Meals",           icon: "🍱" },
  { id: "kebabs",                      name: "Kebabs",                        icon: "🥙" },
  { id: "wraps",                       name: "Wraps",                         icon: "🌯" },
  { id: "combination-kebabs",          name: "Combination Kebabs",            icon: "🥩" },
  { id: "kebab-extras",                name: "Kebab Extras",                 icon: "🍢" }
];
