import React from 'react';

interface PriceBadgeProps {
  price: number;
  originalPrice?: number;
  isSpecial?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'discount' | 'premium';
}

export const PriceBadge: React.FC<PriceBadgeProps> = ({ 
  price, 
  originalPrice, 
  isSpecial = false, 
  size = 'md',
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const variantClasses = {
    default: 'text-primary',
    discount: 'text-green-600',
    premium: 'text-amber-600'
  };

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className="flex items-center gap-2">
      <span className={`font-bold ${sizeClasses[size]} ${variantClasses[variant]} group-hover:scale-110 transition-transform duration-300`}>
        £{price.toFixed(2)}
      </span>
      
      {hasDiscount && (
        <span className="text-sm text-gray-400 line-through">
          £{originalPrice.toFixed(2)}
        </span>
      )}
      
      {isSpecial && (
        <span className="bg-accent text-white text-xs px-2 py-1 rounded-full animate-pulse">
          SPECIAL
        </span>
      )}
      
      {hasDiscount && (
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          SAVE £{(originalPrice - price).toFixed(2)}
        </span>
      )}
    </div>
  );
};