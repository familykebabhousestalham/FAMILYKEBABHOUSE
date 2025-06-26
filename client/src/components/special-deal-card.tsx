import React from 'react';
import AddToBasketButton from '@/components/add-to-basket-button';
import { MenuItemData } from '@/data/menu-data';
import { useAnimationControl } from '@/hooks/use-animation-control';

interface SpecialDealCardProps {
  deal: MenuItemData;
}

function getDealPrice(deal: MenuItemData): number | undefined {
  return deal.singlePrice
    ?? deal.price12inches
    ?? deal.price10inches
    ?? deal.priceLarge
    ?? deal.priceMedium
    ?? deal.priceSmall;
}

function getDealPriceDisplay(deal: MenuItemData): string {
  const price =
    deal.singlePrice ??
    deal.price12inches ??
    deal.price10inches ??
    deal.priceLarge ??
    deal.priceMedium ??
    deal.priceSmall;
  return price ? `£${price.toFixed(2)}` : 'Price varies';
}

function getCardClass(isKebabFeast: boolean, isFamilyDeal: boolean, isChickenCombo: boolean, isLunchOffer: boolean, isVisible: boolean) {
  if (isKebabFeast) {
    return `bg-gradient-to-br from-yellow-400 via-amber-500 via-orange-600 to-red-700 shadow-2xl transform md:scale-110 border-4 md:border-8 border-yellow-300 hover:scale-105 md:hover:scale-115 hover:shadow-3xl${isVisible ? ' animate-pulse-optimized' : ''}`;
  }
  if (isFamilyDeal) {
    return "bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 hover:scale-105 shadow-xl border-2 border-pink-300";
  }
  if (isChickenCombo) {
    return "bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 hover:scale-105 shadow-xl border-2 border-orange-300";
  }
  if (isLunchOffer) {
    return "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 hover:scale-105 shadow-xl border-2 border-blue-300";
  }
  return "bg-gradient-to-br from-accent to-orange-600 hover:scale-105";
}

function getTitleClass(isKebabFeast: boolean, isFamilyDeal: boolean, isChickenCombo: boolean) {
  if (isKebabFeast) return 'text-yellow-100 text-lg sm:text-xl md:text-2xl font-black animate-pulse-optimized';
  if (isFamilyDeal) return 'text-pink-100 text-base sm:text-lg md:text-xl';
  if (isChickenCombo) return 'text-orange-100 text-base sm:text-lg md:text-xl';
  return 'text-white text-sm sm:text-base md:text-lg';
}

function getPriceClass(isKebabFeast: boolean, isFamilyDeal: boolean, isChickenCombo: boolean) {
  if (isKebabFeast) return 'text-2xl sm:text-3xl md:text-4xl text-yellow-200 animate-pulse-optimized font-black';
  if (isFamilyDeal) return 'text-lg sm:text-xl md:text-2xl text-pink-100 group-hover:text-xl group-hover:sm:text-2xl group-hover:md:text-3xl group-hover:text-white group-hover:animate-pulse-optimized';
  if (isChickenCombo) return 'text-lg sm:text-xl md:text-2xl text-orange-100 group-hover:text-xl group-hover:sm:text-2xl group-hover:md:text-3xl group-hover:text-white group-hover:animate-pulse-optimized';
  return 'text-base sm:text-lg md:text-xl text-white';
}

function getButtonClass(isKebabFeast: boolean, isFamilyDeal: boolean, isChickenCombo: boolean) {
  if (isKebabFeast) {
    return "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white hover:from-yellow-300 hover:via-orange-300 hover:to-red-400 font-black text-sm sm:text-base md:text-lg transform hover:scale-110 shadow-2xl animate-pulse-optimized hover:animate-none border-2 sm:border-4 border-white py-2 sm:py-3";
  }
  if (isFamilyDeal) {
    return "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 font-bold transform hover:scale-105 shadow-xl border-2 border-white text-sm sm:text-base py-2 sm:py-3";
  }
  if (isChickenCombo) {
    return "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-400 hover:to-orange-400 font-bold transform hover:scale-105 shadow-xl border-2 border-white text-sm sm:text-base py-2 sm:py-3";
  }
  return "bg-white text-accent hover:bg-gray-100 font-semibold transform hover:scale-105 text-sm sm:text-base py-2 sm:py-3";
}

const SpecialDealCard = React.memo(function SpecialDealCard({ deal }: SpecialDealCardProps) {
  const [ref, isVisible] = useAnimationControl();

  const isKebabFeast = deal.name.includes("Kebab Feast") || deal.id === "kebab-feast";
  const isFamilyDeal = deal.name.includes("Family") && deal.name.includes("Deal");
  const isChickenCombo = deal.name.includes("Chicken Combo") || deal.name.includes("3 pcs + 4 Wings");
  const isLunchOffer = deal.category === "lunch-time-offers";

  // Animation classes for replacing inline styles
  const ring1Class = "animation-spin-gpu-3s";
  const ring2Class = "animation-spin-gpu-2s-reverse";
  const ring3Class = "animation-spin-gpu-4s";
  const sparkle0Class = "animation-bounce-gpu-delay-0";
  const sparkle1Class = "animation-bounce-gpu-delay-05";
  const sparkle2Class = "animation-bounce-gpu-delay-1";
  const sparkle3Class = "animation-bounce-gpu-delay-15";
  const sparkle4Class = "animation-bounce-gpu-delay-2";
  const sparkle5Class = "animation-bounce-gpu-delay-25";
  const chickenFireClass = "animation-bounce-gpu-delay-02";
  const chickenFriesClass = "animation-bounce-gpu-delay-04";
  const lunchSunClass = "animation-bounce-gpu-delay-05";

  return (
    <div
      ref={ref}
      className={`special-deal-card relative rounded-2xl p-6 md:p-8 text-white text-center transition-all duration-500 cursor-pointer group min-h-[300px] md:min-h-[350px] ${getCardClass(isKebabFeast, isFamilyDeal, isChickenCombo, isLunchOffer, isVisible)}`}
    >
      {/* Special Animation for Kebab Feast - Only when visible */}
      {isKebabFeast && isVisible && (
        <>
          {/* Optimized rotating rings with GPU acceleration */}
          <div className={`absolute inset-0 rounded-2xl border-8 border-yellow-300 animate-spin-gpu ${ring1Class}`}></div>
          <div className={`absolute inset-2 rounded-2xl border-4 border-orange-400 animate-spin-gpu ${ring2Class}`}></div>
          <div className={`absolute inset-4 rounded-2xl border-2 border-red-400 animate-spin-gpu ${ring3Class}`}></div>
          {/* Enhanced floating sparkles with optimized animation */}
          <div className={`absolute top-1 right-1 text-yellow-300 animate-bounce-gpu text-2xl ${sparkle0Class}`}>✨</div>
          <div className={`absolute top-3 left-1 text-yellow-300 animate-bounce-gpu text-xl ${sparkle1Class}`}>⭐</div>
          <div className={`absolute bottom-3 right-3 text-yellow-300 animate-bounce-gpu text-2xl ${sparkle2Class}`}>💫</div>
          <div className={`absolute bottom-1 left-3 text-orange-300 animate-bounce-gpu text-xl ${sparkle3Class}`}>🌟</div>
          <div className={`absolute top-1/2 left-1 text-red-300 animate-bounce-gpu text-lg ${sparkle4Class}`}>⚡</div>
          <div className={`absolute top-1/2 right-1 text-yellow-200 animate-bounce-gpu text-lg ${sparkle5Class}`}>🔥</div>
          {/* Optimized glowing effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-red-600/20 animate-pulse-optimized"></div>
          {/* Premium badge enhanced */}
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 px-4 py-2 rounded-full text-sm font-black animate-pulse-optimized border-4 border-white shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
            🏆 ULTIMATE FEAST 🏆
          </div>
          {/* Value highlight */}
          <div className="absolute -top-4 -left-4 bg-gradient-to-r from-green-400 to-emerald-500 text-green-900 px-3 py-1 rounded-full text-xs font-bold animate-bounce-gpu border-2 border-white transform -rotate-12">
            BEST VALUE!
          </div>
          {/* Optimized pulsing glow border */}
          <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl opacity-75 blur-sm animate-pulse-optimized"></div>
        </>
      )}

      {/* Interactive Family Deal Highlights - Only when visible */}
      {isFamilyDeal && isVisible && (
        <>
          {/* Pulsing border on hover */}
          <div className="absolute inset-0 rounded-2xl border-2 border-pink-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-optimized transition-opacity duration-300"></div>
          {/* Family icons */}
          <div className="absolute top-2 left-2 text-pink-200 group-hover:animate-bounce-gpu">👨‍👩‍👧‍👦</div>
          <div className="absolute top-2 right-2 text-pink-200 group-hover:animate-bounce-gpu animation-bounce-gpu-delay-02">🍽️</div>
          {/* Savings badge */}
          <div className="absolute -top-2 -left-2 bg-green-400 text-green-900 px-2 py-1 rounded-full text-xs font-bold transform -rotate-12 group-hover:animate-pulse-optimized">
            FAMILY SAVINGS
          </div>
          {/* Price highlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </>
      )}

      {/* Interactive Chicken Combo Highlights - Only when visible */}
      {isChickenCombo && isVisible && (
        <>
          {/* Pulsing border on hover */}
          <div className="absolute inset-0 rounded-2xl border-2 border-orange-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-optimized transition-opacity duration-300"></div>
          {/* Chicken icons */}
          <div className="absolute top-2 left-2 text-orange-200 group-hover:animate-bounce-gpu">🍗</div>
          <div className={`absolute top-2 right-2 text-orange-200 group-hover:animate-bounce-gpu ${chickenFireClass}`}>🔥</div>
          <div className={`absolute bottom-2 left-2 text-orange-200 group-hover:animate-bounce-gpu ${chickenFriesClass}`}>🍟</div>
          {/* Spicy badge */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold transform rotate-12 group-hover:animate-pulse-optimized">
            SPICY COMBO
          </div>
          {/* Price highlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </>
      )}

      {/* Interactive Lunch Offer Highlights - Only when visible */}
      {isLunchOffer && isVisible && (
        <>
          {/* Clock animation */}
          <div className="absolute top-2 left-2 text-blue-200 animate-bounce-gpu text-xl">⏰</div>
          <div className={`absolute top-2 right-2 text-blue-200 animate-bounce-gpu text-lg ${lunchSunClass}`}>☀️</div>
          {/* Limited time badge */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold transform rotate-12 animate-pulse">
            LIMITED TIME
          </div>
          {/* Lunch special badge */}
          <div className="absolute -top-2 -left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold transform -rotate-12 animate-bounce-gpu">
            LUNCH SPECIAL
          </div>
          {/* Time highlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </>
      )}

      <div className="relative z-10">
        {/* Title with enhanced styling */}
        <h3 className={`font-bold mb-2 sm:mb-3 ${getTitleClass(isKebabFeast, isFamilyDeal, isChickenCombo)}`}>
          {deal.name}
        </h3>
        {/* Description */}
        {deal.description && (
          <p className="text-xs sm:text-sm mb-3 sm:mb-4 opacity-90 leading-tight">
            {deal.description}
          </p>
        )}
        {/* Special lunch offer timing */}
        {isLunchOffer && (
          <div className="text-xs sm:text-sm mb-2 bg-red-600 text-white px-2 py-1 rounded-full font-bold animate-pulse">
            Available 12:00 - 14:30 Daily
          </div>
        )}
        {/* Price with special styling */}
        <div className={`mb-3 sm:mb-4 font-bold ${getPriceClass(isKebabFeast, isFamilyDeal, isChickenCombo)}`}>
          {getDealPriceDisplay(deal)}
        </div>
        {/* Add to Basket Button */}
        <AddToBasketButton
          item={{
            id: deal.id,
            name: deal.name,
            category: deal.category,
            singlePrice: getDealPrice(deal) ?? 0,
            description: deal.description,
            price10inches: deal.price10inches,
            price12inches: deal.price12inches,
            priceMedium: deal.priceMedium,
            priceLarge: deal.priceLarge,
            priceSmall: deal.priceSmall
          }}
          className={getButtonClass(isKebabFeast, isFamilyDeal, isChickenCombo)}
        />
      </div>
    </div>
  );
});

export default SpecialDealCard;

