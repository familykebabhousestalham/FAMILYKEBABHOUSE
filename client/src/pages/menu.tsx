// client/src/pages/menu.tsx
import React, { useState, useMemo, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MenuCategory from "@/components/menu-category";
import SpecialDealCard from "@/components/special-deal-card";
import VoiceControlButton from "@/components/voice-control-button";
import AccessibilityHelpModal from "@/components/accessibility-help-modal";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useScreenReaderAnnouncements } from "@/components/screen-reader-announcements";
import { Phone, Keyboard, Eye } from "lucide-react";

import { categories } from "@/data/menu-data";
import { menuData } from "@/data/menu-data-new";
// Map category → header image
const menuImages: Record<string, string> = {
  kebabs: "https://images.unsplash.com/photo-1529042410759-befb1204b468?...",
  pizzas: "https://images.unsplash.com/photo-1513104890138-7c749659a591?...",
  "garlic-bread-pizza-extras": "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=1200&h=800",
  // Add URLs for other categories as needed
};
const defaultImage = "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?...";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("kebabs");
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0);
  const menuRef = useRef<HTMLElement>(null);
  const { announce } = useScreenReaderAnnouncements();



  // Grab items by category
  const getItemsByCategory = useCallback(
    (cat: string) => menuData.filter((i) => i.category === cat),
    []
  );

  // Meta for labels & descriptions
  const getCategoryInfo = useCallback(
    (id: string) => categories.find((c) => c.id === id) || { id, name: id, icon: "" },
    []
  );
  const getCategoryDescription = useCallback((id: string) => {
    switch (id) {
      case "pizzas":
        return "🍕 100% DAILY FRESH DOUGH – Made with authentic ingredients";
      case "garlic-bread-pizza-extras":
        return "🧄 Fresh garlic bread & pizza extras";
      case "lunch-time-offers":
        return "⏰ Available 12:00–14:30 Daily";
      // …your other custom descriptions…
      default:
        return "";
    }
  }, []);

  // List of items & specials
  const currentCategoryItems = useMemo(() => getItemsByCategory(activeCategory), [activeCategory]);
  const specialDeals = useMemo(
    () => menuData.filter((i) =>
      i.isSpecial ||
      i.category === "pizza-offers" ||
      i.category === "family-deals" ||
      i.category === "chicken-combo-meals" ||
      i.category === "kebab-extras"
    ),
    []
  );

  // Keyboard nav
  useKeyboardNavigation({
    onNavigateUp: () => setFocusedItemIndex((i: number) => Math.max((i ?? 0) - 1, 0)),
    onNavigateDown: () => setFocusedItemIndex((i: number) => Math.min((i ?? 0) + 1, currentCategoryItems.length - 1)),
    onNavigateLeft: () => {
      const idx = categories.findIndex((c) => c.id === activeCategory);
      if (idx > 0) {
        setActiveCategory(categories[idx - 1].id);
        setFocusedItemIndex(0);
      }
    },
    onNavigateRight: () => {
      const idx = categories.findIndex((c) => c.id === activeCategory);
      if (idx < categories.length - 1) {
        setActiveCategory(categories[idx + 1].id);
        setFocusedItemIndex(0);
      }
    },
    onSelect: () => (window.location.href = "tel:01692584100"),
    onHome: () => setFocusedItemIndex(0),
    onEnd: () => setFocusedItemIndex(currentCategoryItems.length - 1),
    disabled: !accessibilityMode,
  });

  // Voice control
  const handleReadMenu = () => {
    const list = currentCategoryItems.map((i) => i.name).join(", ");
    const utter = new SpeechSynthesisUtterance(`Items in ${getCategoryInfo(activeCategory).name}: ${list}`);
    utter.rate = 0.8;
    speechSynthesis.speak(utter);
  };
  const handleOrderItem = () => (window.location.href = "tel:01692584100");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Accessibility Bar */}
      <div className="bg-charcoal text-white sticky top-0 z-30 py-2 sm:py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              onClick={() => setAccessibilityMode((m) => !m)}
              variant="outline"
              size="sm"
              className={`text-xs sm:text-sm border-white text-white ${accessibilityMode ? "bg-white text-charcoal" : ""}`}
            >
              <Keyboard className="h-4 w-4 mr-1" />
              Keyboard {accessibilityMode ? "ON" : "OFF"}
            </Button>
            <Button onClick={handleReadMenu} variant="outline" size="sm" className="text-xs sm:text-sm border-white text-white">
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
              <h2 className="text-3xl font-bold text-charcoal mb-8">🌟 Special Offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {specialDeals.map((deal) => (
                  <SpecialDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Nav */}
      <section className="mb-12 md:mb-16">
        <div className="container mx-auto px-6">
          <div className="bg-white shadow-lg rounded-lg py-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => {
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
      <section id="menu-content" ref={menuRef} className="py-8 md:py-16 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <MenuCategory
                key={activeCategory}
                title={getCategoryInfo(activeCategory).name}
                description={getCategoryDescription(activeCategory)}
                items={currentCategoryItems}
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
              {/* Quick Order */}
              <div className="bg-primary text-white rounded-lg p-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-poppins text-xl font-bold mb-2">Quick Order</h3>
                <p className="text-sm mb-4">Call us directly to place your order</p>
                <a href="tel:01692584100" className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  01692 584 100
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
  {/* Voice Control */}
  <VoiceControlButton
    onNavigateToCategory={c => {
      const map: Record<string, string> = {
        kebabs: "kebabs",
        pizzas: "pizzas",
        burgers: "burgers",
        chicken: "fried-chicken",
        drinks: "drinks",
        lunch: "lunch-time-offers",
      };
      const tgt = map[c] || c;
      setActiveCategory(tgt);
      setFocusedItemIndex(0);
    }}
    onReadMenu={handleReadMenu}
    onOrderItem={handleOrderItem}
  />
</div>
  );
}
