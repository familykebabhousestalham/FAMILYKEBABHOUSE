import React, { useState } from 'react';
import { MenuItem } from '../../../shared/schema';

interface SizeSelectorProps {
  item: MenuItem;
  onSizeSelect?: (size: string, price: number) => void;
  defaultSize?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ 
  item, 
  onSizeSelect,
  defaultSize 
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(defaultSize ?? null);

  const sizes = [
    { id: 'small', label: 'Small', price: item.price_small, color: 'green' },
    { id: 'medium', label: 'Medium', price: item.price_medium, color: 'blue' },
    { id: 'large', label: 'Large', price: item.price_large, color: 'orange' },
    { id: 'xlarge', label: 'X-Large', price: item.price_x_large, color: 'red' }
  ].filter(size => size.price !== null && size.price !== undefined) as Array<
    { id: string; label: string; price: number; color: string }
  >;

  if (sizes.length <= 1) return null;

  const handleSizeSelect = (size: typeof sizes[0]) => {
    setSelectedSize(size.id);
    onSizeSelect?.(size.id, size.price);
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-700">Select Size:</div>
      <div className="grid grid-cols-2 gap-2">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => handleSizeSelect(size)}
            className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
              selectedSize === size.id
                ? `border-${size.color}-500 bg-${size.color}-50 text-${size.color}-700`
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="text-xs font-medium uppercase tracking-wider">
              {size.label}
            </div>
            <div className={`text-lg font-bold ${
              selectedSize === size.id ? `text-${size.color}-700` : 'text-gray-900'
            }`}>
              £{size.price.toFixed(2)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
