// client/src/components/menu-category.tsx
import React from 'react'
import { motion } from 'framer-motion'
import type { MenuItemData } from "@/data/menu-data-new"
import AddToBasketButton from '@/components/add-to-basket-button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import NutritionalInfoTooltip from '@/components/nutritional-info-tooltip'

interface MenuCategoryProps {
  title: string
  description?: string
  items: MenuItemData[]
  icon?: string
}

// helpers at module scope
const formatPrice = (price: number) => `£${price.toFixed(2)}`

const getItemEmoji = (item: MenuItemData) => {
  const name = item.name.toLowerCase();
  // Array of [emoji, ...keywords]
  const emojiMap: {emoji: string, keywords: string[]}[] = [
    { emoji: '🍔', keywords: ['chicken', 'burger'] },
    { emoji: '🥙', keywords: ['doner'] },
    { emoji: '🍢', keywords: ['shish'] },
    { emoji: '🍗', keywords: ['kebab'] },
    { emoji: '🥩', keywords: ['kofte'] },
    { emoji: '🍕', keywords: ['pizza'] },
    { emoji: '🌯', keywords: ['wrap'] },
    { emoji: '🍿', keywords: ['nuggets'] },
    { emoji: '🔥', keywords: ['wings'] },
    { emoji: '🍤', keywords: ['scampi'] },
    { emoji: '🍔', keywords: ['burger'] },
    { emoji: '🍟', keywords: ['chips'] },
    { emoji: '🥤', keywords: ['drink'] },
    { emoji: '🧄', keywords: ['garlic'] },
    { emoji: '🍞', keywords: ['bread'] },
  ];
  for (const {emoji, keywords} of emojiMap) {
    if (keywords.every(k => name.includes(k))) return emoji;
  }
  return '🍽️';
}

const renderPriceDisplay = (item: MenuItemData) => {
  // 1) If it's a pizza with 10"/12" pricing
  if (item.price10inches != null && item.price12inches != null) {
    const inches = [
      { label: '10"', price: item.price10inches },
      { label: '12"', price: item.price12inches }
    ];

    return (
      <div className="text-right space-y-3">
        {/* size labels */}
        <div className="grid grid-cols-2 gap-3 text-sm md:text-base text-gray-500">
          {inches.map(i => <span key={i.label} className="text-center font-medium">{i.label}</span>)}
        </div>
        {/* prices */}
        <div className="grid grid-cols-2 gap-3 font-bold text-primary text-lg md:text-xl">
          {inches.map(i => <span key={i.label} className="text-center">{formatPrice(i.price)}</span>)}
        </div>
        {/* Add to Basket buttons */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {inches.map(i => (
            <AddToBasketButton
              key={i.label}
              item={{
                id:          `${item.id}-${i.label}`,
                name:        `${item.name} (${i.label})`,
                category:    item.category,
                singlePrice: i.price,
                description: item.description
              }}
              variant="small"
              className="w-full text-sm md:text-base py-2 px-3 min-h-[44px]"
            />
          ))}
        </div>
      </div>
    );
  }

  // 2) Meal vs Single pricing (e.g., "£3.50 Single / £5.50 Meal")
  if (item.withChips != null && item.mealPrice != null) {
    return (
      <div className="text-right space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm md:text-base text-gray-500">
          <span className="text-center font-medium">Single</span>
          <span className="text-center font-medium">Meal</span>
        </div>
        <div className="grid grid-cols-2 gap-3 font-bold text-primary text-lg md:text-xl">
          <span className="text-center">{formatPrice(item.withChips)}</span>
          <span className="text-center">{formatPrice(item.mealPrice)}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <AddToBasketButton
            item={{
              id:          `${item.id}-single`,
              name:        `${item.name} (Single)`,
              category:    item.category,
              singlePrice: item.withChips,
              description: item.description
            }}
            variant="small"
            className="w-full text-sm md:text-base py-2 px-3 min-h-[44px]"
          />
          <AddToBasketButton
            item={{
              id:          `${item.id}-meal`,
              name:        `${item.name} (Meal)`,
              category:    item.category,
              singlePrice: item.mealPrice,
              description: item.description
            }}
            variant="small"
            className="w-full text-sm md:text-base py-2 px-3 min-h-[44px]"
          />
        </div>
      </div>
    );
  }

  // 3) Just singlePrice
  if (item.singlePrice != null) {
    return (
      <div className="text-right space-y-3">
        <div className="text-xl md:text-2xl font-bold text-primary">
          {formatPrice(item.singlePrice)}
        </div>
        <AddToBasketButton
          item={{
            id:          item.id,
            name:        item.name,
            category:    item.category,
            singlePrice: item.singlePrice,
            description: item.description
          }}
          variant="default"
          className="w-full text-base md:text-lg py-3 px-4 min-h-[48px]"
        />
      </div>
    );
  }

  // 4) Fallback small/med/lg/xl
  const prices: { label: string; price: number }[] = [];
  if (item.priceSmall  != null) prices.push({ label: 'Sml', price: item.priceSmall });
  if (item.priceMedium != null) prices.push({ label: 'Med', price: item.priceMedium });
  if (item.priceLarge  != null) prices.push({ label: 'Lrg', price: item.priceLarge });
  if (item.priceXLarge != null) prices.push({ label: 'XLrg', price: item.priceXLarge });

  if (prices.length === 0) return null;

  return (
    <div className="text-right space-y-2">
      <div className={`grid grid-cols-${prices.length} gap-2 text-sm text-gray-500`}>
        {prices.map(p => <span key={p.label}>{p.label}</span>)}
      </div>
      <div className={`grid grid-cols-${prices.length} gap-2 font-bold text-primary`}>
        {prices.map(p => <span key={p.label}>{formatPrice(p.price)}</span>)}
      </div>
      <div className="flex gap-2 mt-2">
        {prices.map(p => (
          <AddToBasketButton
            key={p.label}
            item={{
              id:          `${item.id}-${p.label}`,
              name:        `${item.name} (${p.label})`,
              category:    item.category,
              singlePrice: p.price,
              description: item.description
            }}
            variant="small"
          />
        ))}
      </div>
    </div>
  );
}

const MenuCategory = React.memo(function MenuCategory({
  title,
  description,
  items,
  icon
}: Readonly<MenuCategoryProps>) {
  return (
    <motion.div 
      key={title}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut"
      }}
      className="space-y-4 sm:space-y-6"
    >
      {/* header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="text-center mb-4 sm:mb-6 md:mb-8"
      >
        <h2 className="font-poppins text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-charcoal mb-2 flex items-center justify-center gap-2 sm:gap-3">
          {icon && <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{icon}</span>}
          {title}
        </h2>
        {description && <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4">{description}</p>}
      </motion.div>

      {/* items grid */}
      <motion.div 
        className="grid gap-4 md:gap-6"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.2
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              show: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut"
                }
              }
            }}
          >
            <Card
              className={`group hover:shadow-lg transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] cursor-pointer relative ${
                item.isSpecial
                  ? 'border-accent border-2 bg-gradient-to-r from-accent/5 to-orange-50 shadow-md'
                  : 'hover:border-accent/30'
              }`}
            >
              <CardContent className="p-4 md:p-6 relative">
                {/* hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* content row */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-6 relative z-10">
                  <div className="flex-1 min-w-0">
                    {/* title + tooltip + special badge */}
                    <div className="flex items-start gap-2 mb-3 flex-wrap">
                      <h3 className="font-semibold text-charcoal text-base md:text-lg lg:text-xl flex items-center gap-2 group-hover:text-primary transition-colors leading-tight flex-1 min-w-0">
                        <span className="group-hover:scale-125 transition-transform duration-300 text-lg md:text-xl">
                          {getItemEmoji(item)}
                        </span>
                        <span className="line-clamp-2">{item.name}</span>
                      </h3>
                      <div className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <NutritionalInfoTooltip 
                          itemName={item.name}
                          nutritionalData={{
                            calories: item.calories,
                            protein: item.protein,
                            carbs: item.carbs,
                            fat: item.fat,
                            fiber: item.fiber,
                            sodium: item.sodium,
                            allergens: Array.isArray(item.allergens) ? item.allergens : item.allergens?.split(',') || [],
                            ingredients: Array.isArray(item.ingredients) ? item.ingredients : item.ingredients?.split(',') || []
                          }}
                        />
                      </div>
                      {item.isSpecial && (
                        <Badge variant="secondary" className="bg-accent text-white animate-pulse text-sm flex-shrink-0">
                          🌟 Special
                        </Badge>
                      )}
                    </div>

                    {/* description */}
                    {item.description && (
                      <p className="text-gray-600 text-sm md:text-base group-hover:text-gray-700 transition-colors mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* prices & Add buttons */}
                  <div className="relative z-20 w-full lg:w-auto lg:min-w-[240px] xl:min-w-[280px] flex-shrink-0">
                    {renderPriceDisplay(item)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Combination Kebabs Extras Section */}
      {title === "Combination Kebabs" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="mt-8 border-2 border-accent bg-gradient-to-r from-accent/5 to-orange-50">
            <CardContent className="p-6">
              <h3 className="font-poppins text-2xl font-bold text-charcoal mb-4 flex items-center gap-2">
                <span className="text-xl mr-2">➕</span>
                Extras Available
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-charcoal">🍢 Add 1 Skewer Extra</h4>
                      <p className="text-sm text-gray-600">Extra meat portion</p>
                    </div>
                    <div className="text-lg font-bold text-primary">£6.00</div>
                  </div>
                  <AddToBasketButton
                    item={{
                      id: "combo-extra-skewer",
                      name: "🍢 Add 1 Skewer Extra",
                      category: "extras",
                      singlePrice: 6.00,
                      description: "Extra meat portion"
                    }}
                    variant="small"
                    className="w-full mt-3"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-charcoal">🍟 Add Chips</h4>
                      <p className="text-sm text-gray-600">Crispy golden chips</p>
                    </div>
                    <div className="text-lg font-bold text-primary">£3.00</div>
                  </div>
                  <AddToBasketButton
                    item={{
                      id: "combo-extra-chips",
                      name: "🍟 Add Chips",
                      category: "extras",
                      singlePrice: 3.00,
                      description: "Crispy golden chips"
                    }}
                    variant="small"
                    className="w-full mt-3"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-charcoal">🥤 Add Drink</h4>
                      <p className="text-sm text-gray-600">Refreshing beverage</p>
                    </div>
                    <div className="text-lg font-bold text-primary">£1.50</div>
                  </div>
                  <AddToBasketButton
                    item={{
                      id: "combo-extra-drink",
                      name: "🥤 Add Drink",
                      category: "extras",
                      singlePrice: 1.50,
                      description: "Refreshing beverage"
                    }}
                    variant="small"
                    className="w-full mt-3"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Pizza Fresh Dough Message */}
      {(title === "Pizzas" || title === "Garlic Bread & Pizza Extras") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="text-center p-4 bg-orange-100 border border-orange-300 rounded-lg">
            <h4 className="font-poppins text-xl font-bold text-charcoal mb-2">🍞 100% DAILY FRESH DOUGH</h4>
            <p className="text-sm text-gray-700">All our pizzas and garlic bread are made with freshly prepared dough every single day!</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});

export default MenuCategory;

