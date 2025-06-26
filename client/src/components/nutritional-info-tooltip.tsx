// client/src/components/nutritional-info-tooltip.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { InfoIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from './ui/dialog';
import './nutritional-info-tooltip.css';

interface NutritionalInfoTooltipProps {
  itemName: string;
  nutritionalData?: {
    calories?: number;
    protein?: string | number;
    carbs?: string | number;
    fat?: string | number;
    fiber?: string | number;
    sodium?: string | number;
    allergens?: string | string[];
    ingredients?: string | string[];
  };
}

const getNutrientString = (
  val: string | number | undefined,
  unit: string,
  fallback: string
) =>
  typeof val === 'number'
    ? `${val}${unit}`
    : val?.toString() ?? fallback;

const parseStringOrArray = (input?: string | string[]): string[] => {
  if (Array.isArray(input)) return input;
  if (typeof input === 'string') return input.split(',').map(a => a.trim());
  return [];
};

const NutritionalInfoTooltip: React.FC<NutritionalInfoTooltipProps> = ({
  itemName,
  nutritionalData
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setIsOpen(false);
    const onClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('touchstart', onClickOutside);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('touchstart', onClickOutside);
    };
  }, [isOpen]);

  type Info = {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    sodium: string;
    allergens: string[];
    ingredients?: string[];
  };

  const nutritionalInfo: Info = useMemo(() => {
    if (nutritionalData?.calories != null) {
      return {
        calories: nutritionalData.calories,
        protein: getNutrientString(nutritionalData.protein, 'g', '0g'),
        carbs: getNutrientString(nutritionalData.carbs, 'g', '0g'),
        fat: getNutrientString(nutritionalData.fat, 'g', '0g'),
        fiber: getNutrientString(nutritionalData.fiber, 'g', '0g'),
        sodium: getNutrientString(nutritionalData.sodium, 'mg', '0mg'),
        allergens: parseStringOrArray(nutritionalData.allergens),
        ingredients: parseStringOrArray(nutritionalData.ingredients)
      };
    }
    // fallback
    const lower = itemName.toLowerCase();
    const is12 = lower.includes('12"') || lower.includes('12 inch');
    return {
      calories: is12 ? 1200 : 850,
      protein: is12 ? '45g' : '32g',
      carbs: is12 ? '140g' : '98g',
      fat: is12 ? '48g' : '34g',
      fiber: is12 ? '8g' : '6g',
      sodium: is12 ? '2200mg' : '1550mg',
      allergens: ['Gluten', 'Dairy'],
      ingredients: ['Fresh pizza dough', 'Tomato sauce', 'Cheese', 'Toppings']
    };
  }, [itemName, nutritionalData]);

  return (
    <div className="relative inline-block">
      {/* Toggle button with literal aria-expanded via spread */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(o => !o)}
        aria-haspopup="dialog"
        aria-label="View nutritional information"
        // ⚡ spread only the one literal string value in/out
        {...(isOpen
          ? { 'aria-expanded': 'true' }
          : { 'aria-expanded': 'false' })}
        className="p-2 rounded-full bg-white/90 backdrop-blur-sm border-2 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
        type="button"
      >
        <InfoIcon size={16} />
      </button>

      <Dialog open={isOpen}>
        {isOpen && (
          <>
            {/* Backdrop button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') setIsOpen(false);
              }}
              aria-label="Close nutritional info"
              className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 p-0 border-0"
            />

            <DialogContent className="relative bg-white border-2 border-primary/20 rounded-2xl shadow-2xl p-6 w-full max-w-md z-50">
              <DialogTitle className="sr-only">
                Nutritional Information for {itemName}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Detailed nutritional facts, allergens, and ingredients for {itemName}
              </DialogDescription>

              {/* Header & close */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-bold text-charcoal text-xl mb-1">
                    Nutritional Information
                  </h4>
                  <p className="text-primary font-semibold text-base">
                    {itemName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  className="p-3 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Nutritional grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: '🔥 Calories', value: nutritionalInfo.calories, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', valColor: 'text-blue-900' },
                  { label: '💪 Protein', value: nutritionalInfo.protein, bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', valColor: 'text-green-900' },
                  { label: '🌾 Carbs', value: nutritionalInfo.carbs, bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', valColor: 'text-yellow-900' },
                  { label: '🧈 Fat', value: nutritionalInfo.fat, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', valColor: 'text-red-900' },
                  { label: '🌿 Fiber', value: nutritionalInfo.fiber, bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', valColor: 'text-purple-900' },
                  { label: '🧂 Sodium', value: nutritionalInfo.sodium, bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', valColor: 'text-orange-900' }
                ].map(cell => (
                  <div key={cell.label} className={`${cell.bg} p-4 rounded-xl ${cell.border} border`}>
                    <div className={`${cell.text} font-semibold text-sm`}>{cell.label}</div>
                    <div className={`${cell.valColor} font-bold text-xl`}>{cell.value}</div>
                  </div>
                ))}
              </div>

              {/* Allergens */}
              <div className="mt-3 pt-2 border-t text-gray-600 text-xs">
                <strong>Allergens:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {nutritionalInfo.allergens.map(allergen => (
                    <span
                      key={allergen}
                      className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              {nutritionalInfo.ingredients && (
                <div className="mt-3 pt-2 border-t text-gray-600 text-xs">
                  <strong>Main Ingredients:</strong>
                  <div className="mt-1 text-gray-500">
                    {nutritionalInfo.ingredients.join(', ')}
                  </div>
                </div>
              )}

              <div className="mt-2 text-xs text-gray-500 italic">
                *Nutritional values based on standard portions. Please inform staff of allergies.
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default NutritionalInfoTooltip;
