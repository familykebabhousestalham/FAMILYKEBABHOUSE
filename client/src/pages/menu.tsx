// client/src/pages/menu.tsx
import React, { useState, useMemo, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MenuCategory from "@/components/menu-category";
import SpecialDealCard from "@/components/special-deal-card";
import VoiceControlButton from "@/components/voice-control-button";
import AccessibilityHelpModal from "@/components/accessibility-help-modal";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useScreenReaderAnnouncements } from "@/components/screen-reader-announcements";
import { Phone, Keyboard, Eye } from "lucide-react";

import type { MenuItem } from "../../../shared/schema";
import { categories } from "@/data/menu-data";

// Convert raw API nulls + snake_case → camelCase + undefined
function toMenuItemData(item: MenuItem) {
  return {
    id:            String(item.id),
    name:          item.name,
    description:   item.description ?? undefined,
    category:      item.category,
    priceSmall:    item.price_small   ?? undefined,
    priceMedium:   item.price_medium  ?? undefined,
    priceLarge:    item.price_large   ?? undefined,
    priceXLarge:   item.price_x_large ?? undefined,
    price10inches: item.price_10_inches ?? undefined,
    price12inches: item.price_12_inches ?? undefined,
    singlePrice:   item.single_price  ?? undefined,
    isSpecial:     Boolean(item.is_special),
    isAvailable:   Boolean(item.is_available),
    calories:      item.calories  ?? undefined,
    protein:       item.protein   ?? undefined,
    carbs:         item.carbs     ?? undefined,
    fat:           item.fat       ?? undefined,
    fiber:         item.fiber     ?? undefined,
    sodium:        item.sodium    ?? undefined,
    allergens:     item.allergens ?? undefined,
    ingredients:   item.ingredients ?? undefined,
  };
}

const menuImages: Record<string, string> = {
  kebabs: "https://…",
  pizzas: "https://…",
  "garlic-bread-pizza-extras": "https://…",
};
const defaultImage = "https://…";

export default function Menu() {
  // — State
  const [activeCategory, setActiveCategory] = useState("kebabs");
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [focusedItemIndex, setFocusedItemIndex] = useState(0);
  const { announce } = useScreenReaderAnnouncements();

  // — Fetch data
  const { data: menuItems = [], isLoading } = useQuery<MenuItem[], Error>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu`);
      if (!res.ok) throw new Error("Failed to fetch menu items");
      return res.json();
    },
  });

  // — Memo & Callbacks (always invoked)
  const getItemsByCategory = useCallback(
    (cat: string) => menuItems.filter(i => i.category === cat),
    [menuItems]
  );

  const getCategoryInfo = useCallback(
    (id: string) => categories.find(c => c.id === id) ?? { id, name: id, icon: "" },
    []
  );

  const getCategoryDescription = useCallback((id: string) => {
    switch (id) {
      case "pizzas": return "🍕 100% DAILY FRESH DOUGH – Made with authentic ingredients";
      case "garlic-bread-pizza-extras": return "🧄 Fresh garlic bread & pizza extras";
      case "lunch-time-offers": return "⏰ Available 12:00–14:30 Daily";
      default: return "";
    }
  }, []);

  const currentCategoryItems = useMemo(
    () => getItemsByCategory(activeCategory),
    [activeCategory, menuItems]
  );

  const specialDeals = useMemo(
    () =>
      menuItems.filter(
        i =>
          i.is_special ||
          ["pizza-offers", "family-deals", "chicken-combo-meals", "kebab-extras"].includes(i.category)
      ),
    [menuItems]
  );

  useKeyboardNavigation({
    onNavigateUp:    () => setFocusedItemIndex(i => Math.max(i - 1, 0)),
    onNavigateDown:  () => setFocusedItemIndex(i => Math.min(i + 1, currentCategoryItems.length - 1)),
    onNavigateLeft:  () => {
      const idx = categories.findIndex(c => c.id === activeCategory);
      if (idx > 0) { setActiveCategory(categories[idx - 1].id); setFocusedItemIndex(0); }
    },
    onNavigateRight: () => {
      const idx = categories.findIndex(c => c.id === activeCategory);
      if (idx < categories.length - 1) { setActiveCategory(categories[idx + 1].id); setFocusedItemIndex(0); }
    },
    onSelect:        () => (window.location.href = "tel:01692 584 100"),
    onHome:          () => setFocusedItemIndex(0),
    onEnd:           () => setFocusedItemIndex(currentCategoryItems.length - 1),
    disabled:        !accessibilityMode,
  });

  const handleReadMenu = useCallback(() => {
    const list = currentCategoryItems.map(i => i.name).join(", ");
    const tts = new SpeechSynthesisUtterance(
      `Items in ${getCategoryInfo(activeCategory).name}: ${list}`
    );
    tts.rate = 0.8;
    speechSynthesis.speak(tts);
  }, [activeCategory, currentCategoryItems, getCategoryInfo]);

  const handleOrderItem = useCallback(
    () => (window.location.href = "tel:01692 584 100"),
    []
  );

  // — Early return after all hooks
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading menu…</p>
      </div>
    );
  }

  // — Render
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Accessibility Toolbar */}
      <div className="bg-charcoal text-white sticky top-0 z-30 py-2 sm:py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              onClick={() => setAccessibilityMode(m => !m)}
              variant="outline" size="sm"
              className={`text-xs sm:text-sm border-white text-white ${accessibilityMode ? "bg-white text-charcoal" : ""}`}
            >
              <Keyboard className="h-4 w-4 mr-1" />
              Keyboard {accessibilityMode ? "ON" : "OFF"}
            </Button>
            <Button
              onClick={handleReadMenu}
              variant="outline" size="sm"
              className="text-xs sm:text-sm border-white text-white"
            >
              <Eye className="h-4 w-4 mr-1" />
              Read Menu
            </Button>
          </div>
          <AccessibilityHelpModal />
        </div>
      </div>

      {/* Header & Specials */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-poppins text-4xl font-bold text-charcoal mb-6">
            Our Delicious Menu
          </h1>
          {specialDeals.length > 0 && (
            <div className="mb-12 md:mb-16">
              <h2 className="text-3xl font-bold text-charcoal mb-8">
                🌟 Special Offers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {specialDeals.map(deal => (
                  <SpecialDealCard
                    key={String(deal.id)}
                    deal={toMenuItemData(deal)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="mb-12 md:mb-16">
        <div className="container mx-auto px-6">
          <div className="bg-white shadow-lg rounded-lg py-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(cat => {
                const count = getItemsByCategory(cat.id).length;
                return (
                  <Button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setFocusedItemIndex(0);
                      announce(`Viewing ${cat.name} (${count} items)`);
                    }}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    className="px-4 py-2 text-sm font-semibold"
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.name}
                    <Badge className="ml-2">{count}</Badge>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section id="menu-content" className="py-8 md:py-16 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <MenuCategory
                  key={activeCategory}
                  title={getCategoryInfo(activeCategory).name}
                  description={getCategoryDescription(activeCategory)}
                  items={currentCategoryItems.map(toMenuItemData)}
                  icon={getCategoryInfo(activeCategory).icon}
                  focusedIndex={focusedItemIndex}
                />
              </AnimatePresence>
            </div>
            <aside className="lg:col-span-1 sticky top-24 space-y-8">
              {/* Category Image */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={menuImages[activeCategory] ?? defaultImage}
                  alt={getCategoryInfo(activeCategory).name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-poppins text-xl font-bold text-charcoal mb-2">
                    {getCategoryInfo(activeCategory).name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {getCategoryDescription(activeCategory)}
                  </p>
                </div>
              </div>
              {/* Quick Order CTA */}
              <div className="bg-primary text-white rounded-lg p-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-poppins text-xl font-bold mb-2">
                  Quick Order
                </h3>
                <p className="text-sm mb-4">
                  Call us directly to place your order
                </p>
                <a
                  href="tel:01692 584 100"
                  className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  01692 584 100
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Voice Control */}
      <VoiceControlButton
        onNavigateToCategory={(c: string) => {
          const map: Record<string, string> = {
            kebabs: "kebabs",
            pizzas: "pizzas",
            burgers: "burgers",
            chicken: "fried-chicken",
            drinks: "drinks",
            lunch: "lunch-time-offers",
          };
          const tgt = map[c] ?? c;
          setActiveCategory(tgt);
          setFocusedItemIndex(0);
        }}
        onReadMenu={handleReadMenu}
        onOrderItem={handleOrderItem}
      />
    </div>
  );
}
