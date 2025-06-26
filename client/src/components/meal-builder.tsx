// client/src/components/meal-builder.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Minus, ShoppingBasket, Utensils } from 'lucide-react';
import { useBasket } from '@/hooks/use-basket';
import { toast } from '@/hooks/use-toast';

interface MealComponent {
  id: string;
  name: string;
  category: 'main' | 'side' | 'drink' | 'extra';
  price: number;
  emoji: string;
  description?: string;
}

interface CustomMeal {
  main: MealComponent | null;
  sides: MealComponent[];
  drink: MealComponent | null;
  extras: MealComponent[];
}

export default function MealBuilder() {
  const [customMeal, setCustomMeal] = useState<CustomMeal>({
    main: null,
    sides: [],
    drink: null,
    extras: []
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const { addItem } = useBasket();

  // 1) All possible meal parts - Authentic Family Kebab House Menu with exact pricing
  const mealComponents: MealComponent[] = [
    // -- Main Courses --
    // Kebabs - Exact pricing from menu-data-new.ts
    { id: 'doner-kebab-med',     name: '🥙 Doner Kebab (Medium)',     category: 'main', price: 8.50, emoji: '🥙', description: 'Fresh lamb, specially seasoned and grilled' },
    { id: 'doner-kebab-large',   name: '🥙 Doner Kebab (Large)',      category: 'main', price: 10.50, emoji: '🥙', description: 'Large portion doner with salad' },
    { id: 'doner-kebab-xlarge',  name: '🥙 Doner Kebab (X-Large)',    category: 'main', price: 12.50, emoji: '🥙', description: 'Extra large doner portion' },
    { id: 'chicken-kebab-med',   name: '🍗 Chicken Kebab (Medium)',   category: 'main', price: 9.00, emoji: '🍗', description: 'Breast of chicken, marinated & barbecued' },
    { id: 'chicken-kebab-large', name: '🍗 Chicken Kebab (Large)',    category: 'main', price: 12.50, emoji: '🍗', description: 'Large grilled chicken with salad' },
    { id: 'chicken-kebab-xlarge', name: '🍗 Chicken Kebab (X-Large)', category: 'main', price: 16.50, emoji: '🍗', description: 'Extra large chicken portion' },
    { id: 'shish-kebab-med',     name: '🍢 Shish Kebab (Medium)',     category: 'main', price: 9.50, emoji: '🍢', description: 'Fresh fillet of diced lamb, marinated' },
    { id: 'shish-kebab-large',   name: '🍢 Shish Kebab (Large)',      category: 'main', price: 13.50, emoji: '🍢', description: 'Large lamb shish with herbs' },
    { id: 'shish-kebab-xlarge',  name: '🍢 Shish Kebab (X-Large)',    category: 'main', price: 17.50, emoji: '🍢', description: 'Extra large shish portion' },
    { id: 'kofte-kebab-med',     name: '🥩 Kofte Kebab (Medium)',     category: 'main', price: 9.00, emoji: '🥩', description: 'Minced fresh lamb with parsley & herbs' },
    { id: 'kofte-kebab-large',   name: '🥩 Kofte Kebab (Large)',      category: 'main', price: 12.50, emoji: '🥩', description: 'Large kofte with oriental herbs' },
    { id: 'kofte-kebab-xlarge',  name: '🥩 Kofte Kebab (X-Large)',    category: 'main', price: 16.50, emoji: '🥩', description: 'Extra large kofte portion' },
    { id: 'mixed-kebab-xlarge',  name: '🥙 Mixed Kebab (X-Large)',    category: 'main', price: 16.50, emoji: '🥙', description: 'Doner, shish & kofte combination' },
    { id: 'arda-mix',            name: '🔥 Arda Mix',                 category: 'main', price: 19.00, emoji: '🔥', description: 'Chicken, lamb shish, doner & kofte' },
    
    // Burgers - Exact pricing from menu
    { id: 'quarter-pounder',     name: '🍔 ¼ Pounder with Cheese',   category: 'main', price: 5.50, emoji: '🍔', description: 'Beef burger with cheese' },
    { id: 'half-pounder',        name: '🍔 ½ Pounder Double Cheese', category: 'main', price: 7.40, emoji: '🍔', description: 'Half pound beef with double cheese' },
    { id: 'chicken-fillet',      name: '🍗 Chicken Fillet Burger',   category: 'main', price: 6.00, emoji: '🍗', description: 'Grilled chicken fillet burger' },
    { id: 'vegetable-burger',    name: '🥬 Vegetable Burger',         category: 'main', price: 5.50, emoji: '🥬', description: 'Fresh vegetable patty burger' },
    
    // Fried Chicken - Exact pricing
    { id: 'fried-chicken-1pc',   name: '🍗 1pc Fried Chicken',       category: 'main', price: 2.20, emoji: '🍗', description: 'Single piece fried chicken' },
    { id: 'fried-chicken-2pc',   name: '🍗 2pc Fried Chicken',       category: 'main', price: 4.20, emoji: '🍗', description: 'Two pieces fried chicken' },
    { id: 'fried-chicken-3pc',   name: '🍗 3pc Fried Chicken',       category: 'main', price: 6.00, emoji: '🍗', description: 'Three pieces fried chicken' },
    { id: 'fried-chicken-4pc',   name: '🍗 4pc Fried Chicken',       category: 'main', price: 7.70, emoji: '🍗', description: 'Four pieces fried chicken' },
    
    // Chicken Wings & Strips
    { id: 'chicken-wings-6pc',   name: '🔥 6pc Chicken Wings',       category: 'main', price: 4.70, emoji: '🔥', description: 'Spicy chicken wings' },
    { id: 'chicken-strips-3pc',  name: '🍗 3pc Chicken Strips',      category: 'main', price: 5.40, emoji: '🍗', description: 'Crispy chicken strips' },
    
    // Nuggets - Exact pricing
    { id: 'nuggets-6pc',         name: '🍿 6pc Nuggets',             category: 'main', price: 4.00, emoji: '🍿', description: 'Crispy chicken nuggets' },
    { id: 'nuggets-9pc',         name: '🍿 9pc Nuggets',             category: 'main', price: 5.20, emoji: '🍿', description: 'Nine piece nuggets' },
    
    // Scampi - Exact pricing
    { id: 'scampi-6pc',          name: '🍤 6pc Scampi',              category: 'main', price: 4.00, emoji: '🍤', description: 'Breaded scampi pieces' },
    { id: 'scampi-9pc',          name: '🍤 9pc Scampi',              category: 'main', price: 5.20, emoji: '🍤', description: 'Nine piece scampi' },
    
    // Pizzas - 10" options
    { id: 'pizza-margherita-10', name: '🍕 10" Margherita Pizza',    category: 'main', price: 7.70, emoji: '🍕', description: 'Classic pizza with fresh basil' },
    { id: 'pizza-pepperoni-10',  name: '🍕 10" Pepperoni Pizza',     category: 'main', price: 8.80, emoji: '🍕', description: 'Pepperoni pizza' },
    { id: 'pizza-hawaiian-10',   name: '🍕 10" Hawaiian Pizza',      category: 'main', price: 9.90, emoji: '🍕', description: 'Ham and pineapple pizza' },
    
    // Pizzas - 12" options  
    { id: 'pizza-margherita-12', name: '🍕 12" Margherita Pizza',    category: 'main', price: 10.20, emoji: '🍕', description: 'Large margherita pizza' },
    { id: 'pizza-pepperoni-12',  name: '🍕 12" Pepperoni Pizza',     category: 'main', price: 11.70, emoji: '🍕', description: 'Large pepperoni pizza' },
    { id: 'pizza-hawaiian-12',   name: '🍕 12" Hawaiian Pizza',      category: 'main', price: 13.20, emoji: '🍕', description: 'Large Hawaiian pizza' },
    
    // Wraps - Exact pricing
    { id: 'doner-wrap-med',      name: '🌯 Lamb Doner Wrap (Med)',   category: 'main', price: 8.50, emoji: '🌯', description: 'Lamb doner meat wrap' },
    { id: 'doner-wrap-large',    name: '🌯 Lamb Doner Wrap (Large)', category: 'main', price: 10.50, emoji: '🌯', description: 'Large doner wrap with salad' },
    { id: 'chicken-wrap-med',    name: '🌯 Chicken Wrap (Medium)',   category: 'main', price: 9.00, emoji: '🌯', description: 'Grilled chicken wrap' },
    { id: 'chicken-wrap-large',  name: '🌯 Chicken Wrap (Large)',    category: 'main', price: 12.50, emoji: '🌯', description: 'Large chicken wrap with salad' },
    
    // -- Sides -- Exact pricing from extras
    { id: 'chips-small',         name: '🍟 Chips (Small)',           category: 'side', price: 3.00, emoji: '🍟', description: 'Golden crispy chips' },
    { id: 'chips-large',         name: '🍟 Chips (Large)',           category: 'side', price: 4.00, emoji: '🍟', description: 'Large portion of chips' },
    { id: 'chips-cheese-small',  name: '🧀 Chips & Cheese (Small)',  category: 'side', price: 4.50, emoji: '🧀', description: 'Chips with melted cheese' },
    { id: 'chips-cheese-large',  name: '🧀 Chips & Cheese (Large)',  category: 'side', price: 5.50, emoji: '🧀', description: 'Large chips with cheese' },
    { id: 'onion-rings-8pc',     name: '🧅 8pc Onion Rings',         category: 'side', price: 3.50, emoji: '🧅', description: 'Crispy battered onion rings' },
    { id: 'mozzarella-sticks',   name: '🧀 6pc Mozzarella Sticks',   category: 'side', price: 5.20, emoji: '🧀', description: 'Breaded mozzarella sticks' },
    { id: 'coleslaw',            name: '🥗 Coleslaw',                category: 'side', price: 2.50, emoji: '🥗', description: 'Fresh homemade coleslaw' },
    { id: 'pitta-bread',         name: '🫓 Pitta Bread',             category: 'side', price: 1.00, emoji: '🫓', description: 'Fresh pitta bread' },
    { id: 'garlic-bread-10',     name: '🍞 10" Garlic Bread',        category: 'side', price: 5.00, emoji: '🍞', description: 'Warm garlic bread' },
    { id: 'potato-wedges',       name: '🥔 Potato Wedges',           category: 'side', price: 3.50, emoji: '🥔', description: 'Seasoned potato wedges' },
    
    // -- Drinks -- Exact pricing
    { id: 'cans',                name: '🥤 Soft Drinks (Can)',       category: 'drink', price: 1.40, emoji: '🥤', description: 'Coke, Pepsi, Sprite, Fanta' },
    { id: 'bottle-drinks',       name: '🍾 Bottle of Drink',         category: 'drink', price: 3.50, emoji: '🍾', description: 'Large bottle soft drinks' },
    { id: 'water',               name: '💧 Water',                   category: 'drink', price: 1.00, emoji: '💧', description: 'Fresh bottled water' },
    
    // -- Extras -- Exact pricing
    { id: 'sauce-small',         name: '🥫 Small Pot of Sauce',      category: 'extra', price: 0.70, emoji: '🥫', description: 'Chilli, Garlic, Ketchup, BBQ, Mayo' },
    { id: 'sauce-large',         name: '🥫 Large Pot of Sauce',      category: 'extra', price: 1.50, emoji: '🥫', description: 'Large sauce pot - choice of sauce' },
    { id: 'extra-topping-10',    name: '🍕 Extra Topping (10")',     category: 'extra', price: 1.40, emoji: '🍕', description: 'Additional pizza topping' },
    { id: 'extra-topping-12',    name: '🍕 Extra Topping (12")',     category: 'extra', price: 1.80, emoji: '🍕', description: 'Additional pizza topping (large)' },
    { id: 'box-salad-small',     name: '🥗 Box Salad (Small)',       category: 'extra', price: 3.50, emoji: '🥗', description: 'Fresh mixed salad' },
    { id: 'box-salad-large',     name: '🥗 Box Salad (Large)',       category: 'extra', price: 4.50, emoji: '🥗', description: 'Large fresh mixed salad' },
    { id: 'garlic-mushroom',     name: '🍄 Garlic Mushroom',         category: 'extra', price: 4.50, emoji: '🍄', description: 'Fresh grilled mushrooms with garlic' }
  ];

  // 2) Recalculate total when selection changes
  useEffect(() => {
    let total = 0;
    if (customMeal.main)   total += customMeal.main.price;
    if (customMeal.drink)  total += customMeal.drink.price;
    customMeal.sides.forEach(side => total += side.price);
    customMeal.extras.forEach(xtra => total += xtra.price);
    setTotalPrice(total);
  }, [customMeal]);

  // 3) Add or replace a component
  const addComponent = (component: MealComponent) => {
    setCustomMeal(prev => {
      switch (component.category) {
        case 'main':  return { ...prev, main: component };
        case 'drink': return { ...prev, drink: component };
        case 'side':
          return prev.sides.length < 3
            ? { ...prev, sides: [...prev.sides, component] }
            : prev;
        case 'extra':
          return prev.extras.length < 5
            ? { ...prev, extras: [...prev.extras, component] }
            : prev;
      }
    });
  };

  // 4) Remove a selected component
  const removeComponent = (category: keyof CustomMeal | MealComponent['category'], id?: string) => {
    setCustomMeal(prev => {
      if (category === 'main')  return { ...prev, main: null };
      if (category === 'drink') return { ...prev, drink: null };
      if (category === 'side' || category === 'sides')  return { ...prev, sides: prev.sides.filter(s => s.id !== id) };
      if (category === 'extra' || category === 'extras') return { ...prev, extras: prev.extras.filter(x => x.id !== id) };
      return prev;
    });
  };

  // 5) Helpers for rendering
  const getComponentsByCategory = (cat: MealComponent['category']) =>
    mealComponents.filter(c => c.category === cat);

  // 6) Finalize meal into the basket
  const addToBasket = () => {
    if (!customMeal.main) {
      toast({
        title: "Please select a main item",
        description: "Your custom meal needs at least one main item.",
        variant: "destructive"
      });
      return;
    }
    const basketItem = {
      id: `custom-meal-${Date.now()}`,
      name: '🍽️ Custom Meal',
      price: totalPrice,
      category: 'custom-meal',
      customizations: [
        customMeal.main.name,
        ...customMeal.sides.map(s => s.name),
        ...(customMeal.drink ? [customMeal.drink.name] : []),
        ...customMeal.extras.map(x => x.name)
      ],
      emoji: '🍽️'
    };
    addItem(basketItem);
    toast({
      title: "Custom meal added to basket!",
      description: `Your custom meal has been added for £${totalPrice.toFixed(2)}.`
    });
    // Reset
    setCustomMeal({ main: null, sides: [], drink: null, extras: [] });
  };

  const clearMeal = () =>
    setCustomMeal({ main: null, sides: [], drink: null, extras: [] });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary" />
          Build Your Perfect Meal
        </CardTitle>
        <p className="text-gray-600">
          Create your custom meal by selecting from our fresh ingredients and dishes.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* -- Main Course -- */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            🍽️ Main Course
            <Badge variant="destructive" className="text-xs">Required</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getComponentsByCategory('main').map(comp => (
              <Button
                key={comp.id}
                variant={customMeal.main?.id === comp.id ? 'default' : 'outline'}
                className="flex flex-col items-start p-3 h-auto min-h-[80px] justify-start text-left whitespace-normal"
                onClick={() => addComponent(comp)}
              >
                <div className="font-medium text-sm mb-1 leading-tight">{comp.name}</div>
                <div className="text-xs text-gray-600 mb-1 leading-tight">{comp.description}</div>
                <div className="font-bold text-primary text-sm">£{comp.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.main && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg flex items-center justify-between">
              <span className="font-medium">Selected: {customMeal.main.name}</span>
              <Button variant="ghost" size="sm" onClick={() => removeComponent('main')}>
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* -- Sides -- */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            🍟 Sides
            <Badge variant="secondary" className="text-xs">Max 3</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getComponentsByCategory('side').map(comp => (
              <Button
                key={comp.id}
                variant="outline"
                className="flex flex-col items-start p-3 h-auto min-h-[80px] justify-start text-left whitespace-normal"
                onClick={() => addComponent(comp)}
                disabled={customMeal.sides.length >= 3 && !customMeal.sides.some(s => s.id === comp.id)}
              >
                <div className="font-medium text-sm mb-1 leading-tight">{comp.name}</div>
                <div className="text-xs text-gray-600 mb-1 leading-tight">{comp.description}</div>
                <div className="font-bold text-primary text-sm">£{comp.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.sides.length > 0 && (
            <div className="mt-3 space-y-2">
              {customMeal.sides.map(side => (
                <div key={side.id} className="p-2 bg-blue-50 rounded-lg flex items-center justify-between">
                  <span className="font-medium">{side.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeComponent('sides', side.id)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* -- Drinks -- */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            🥤 Drink
            <Badge variant="secondary" className="text-xs">Optional</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getComponentsByCategory('drink').map(comp => (
              <Button
                key={comp.id}
                variant={customMeal.drink?.id === comp.id ? 'default' : 'outline'}
                className="flex flex-col items-start p-3 h-auto min-h-[80px] justify-start text-left whitespace-normal"
                onClick={() => addComponent(comp)}
              >
                <div className="font-medium text-sm mb-1 leading-tight">{comp.name}</div>
                <div className="text-xs text-gray-600 mb-1 leading-tight">{comp.description}</div>
                <div className="font-bold text-primary text-sm">£{comp.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.drink && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <span className="font-medium">Selected: {customMeal.drink.name}</span>
              <Button variant="ghost" size="sm" onClick={() => removeComponent('drink')}>
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* -- Extras -- */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            ➕ Extras
            <Badge variant="secondary" className="text-xs">Max 5</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getComponentsByCategory('extra').map(comp => (
              <Button
                key={comp.id}
                variant="outline"
                className="flex flex-col items-start p-3 h-auto min-h-[80px] justify-start text-left whitespace-normal"
                onClick={() => addComponent(comp)}
                disabled={customMeal.extras.length >= 5 && !customMeal.extras.some(x => x.id === comp.id)}
              >
                <div className="font-medium text-sm mb-1 leading-tight">{comp.name}</div>
                <div className="text-xs text-gray-600 mb-1 leading-tight">{comp.description}</div>
                <div className="font-bold text-primary text-sm">£{comp.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.extras.length > 0 && (
            <div className="mt-3 space-y-2">
              {customMeal.extras.map(extra => (
                <div key={extra.id} className="p-2 bg-orange-50 rounded-lg flex items-center justify-between">
                  <span className="font-medium">{extra.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeComponent('extras', extra.id)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* -- Summary & Actions -- */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Your Custom Meal</h3>
            <div className="text-2xl font-bold text-primary">£{totalPrice.toFixed(2)}</div>
          </div>
          
          <div className="space-y-2 mb-4">
            {customMeal.main && (
              <div className="flex justify-between">
                <span>{customMeal.main.name}</span>
                <span>£{customMeal.main.price.toFixed(2)}</span>
              </div>
            )}
            {customMeal.sides.map(side => (
              <div key={side.id} className="flex justify-between">
                <span>{side.name}</span>
                <span>£{side.price.toFixed(2)}</span>
              </div>
            ))}
            {customMeal.drink && (
              <div className="flex justify-between">
                <span>{customMeal.drink.name}</span>
                <span>£{customMeal.drink.price.toFixed(2)}</span>
              </div>
            )}
            {customMeal.extras.map(extra => (
              <div key={extra.id} className="flex justify-between">
                <span>{extra.name}</span>
                <span>£{extra.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={addToBasket}
              className="flex-1"
              disabled={!customMeal.main}
            >
              <ShoppingBasket className="h-4 w-4 mr-2" />
              Add to Basket
            </Button>
            <Button variant="outline" onClick={clearMeal}>
              Clear Meal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}