// client/src/components/accessible-menu-item.tsx
import { useState, useRef, useEffect } from 'react'
import { CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, Info } from 'lucide-react'
import { MenuItem } from '../../../shared/schema'
import { PriceBadge } from '@/components/price-badge'
import { SizeSelector } from '@/components/size-selector'
import NutritionalInfoTooltip from '@/components/nutritional-info-tooltip'

interface AccessibleMenuItemProps {
  readonly item: MenuItem
  readonly isFocused: boolean
  readonly onFocus: () => void
  readonly onSelect: () => void
  readonly isKebabFeast?: boolean
}

export default function AccessibleMenuItem({
  item,
  isFocused,
  onFocus,
  onSelect,
  isKebabFeast = false
}: AccessibleMenuItemProps) {
  const [selectedSize, setSelectedSize] = useState<string>('medium')
  const [showNutrition, setShowNutrition] = useState(false)
  const itemRef = useRef<HTMLButtonElement>(null)
  const nutritionButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus()
    }
  }, [isFocused])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        onSelect()
        break
      case 'o':
      case 'O':
        event.preventDefault()
        window.location.href = 'tel:01692584100'
        break
      case 'i':
      case 'I':
        event.preventDefault()
        setShowNutrition((prev) => !prev)
        setTimeout(() => {
          nutritionButtonRef.current?.focus()
        }, 0)
        break
    }
  }

  const getPrice = (): number => {
    if (item.single_price != null) return item.single_price
    if (item.price_medium != null && selectedSize === 'medium') return item.price_medium
    if (item.price_large != null && selectedSize === 'large') return item.price_large
    if (item.price_x_large != null && selectedSize === 'x-large') return item.price_x_large
    if (item.price_small != null && selectedSize === 'small') return item.price_small
    return item.single_price ?? 7.5
  }

  const hasMultipleSizes = Boolean(
    item.price_small ?? item.price_medium ?? item.price_large ?? item.price_x_large
  )

  return (
    <button
      ref={itemRef}
      type="button"
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg border-2 text-left ${
        isFocused
          ? 'border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20'
          : 'border-transparent hover:border-primary/30'
      } ${isKebabFeast ? 'relative overflow-hidden' : ''}`}
      onClick={onSelect}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`${item.name} – ${item.description ?? ''} – Price: £${getPrice().toFixed(
        2
      )}. Press Enter to select, O to order, I for nutrition info`}
      aria-describedby={`item-${item.id}-description`}
    >
      {isKebabFeast && (
        <>
          {/* Rotating Border Animation */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-gold via-primary to-accent-gold animate-spin-slow opacity-75" />
          <div className="absolute inset-1 bg-white rounded-lg" />

          {/* Floating Sparkles */}
          <div className="absolute top-2 right-2 animate-bounce">✨</div>
          <div className="absolute top-4 left-2 animate-pulse delay-150">🌟</div>
          <div className="absolute bottom-2 right-4 animate-bounce delay-300">⭐</div>
        </>
      )}

      <CardContent className={`p-6 ${isKebabFeast ? 'relative z-10' : ''}`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3
              className={`font-poppins text-lg font-bold text-charcoal mb-2 group-hover:text-primary transition-colors ${
                isKebabFeast
                  ? 'text-2xl bg-gradient-to-r from-primary to-accent-gold bg-clip-text text-transparent'
                  : ''
              }`}
            >
              {item.name}
              {isKebabFeast && (
                <Badge className="ml-2 bg-gradient-to-r from-accent-gold to-yellow-500 text-charcoal font-bold animate-pulse">
                  PREMIUM FEAST
                </Badge>
              )}
            </h3>

            {item.description && (
              <p
                id={`item-${item.id}-description`}
                className="text-gray-600 text-sm mb-3 leading-relaxed"
              >
                {item.description}
              </p>
            )}

            {hasMultipleSizes && (
              <SizeSelector
                item={item}
                onSizeSelect={(size) => setSelectedSize(size)}
                defaultSize={selectedSize}
              />
            )}
          </div>

          <div className="flex flex-col items-end space-y-2">
            <PriceBadge
              price={getPrice()}
              isSpecial={!!item.is_special}
            />

            <NutritionalInfoTooltip
              itemName={item.name}
              nutritionalData={{
                calories: item.calories ?? undefined,
                protein: item.protein ?? undefined,
                carbs: item.carbs ?? undefined,
                fat: item.fat ?? undefined,
                fiber: item.fiber ?? undefined,
                sodium: item.sodium ?? undefined,
                allergens: item.allergens ?? undefined,
                ingredients: item.ingredients ?? undefined
              }}
            />
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex space-x-2 mt-4">
          <Button
            size="sm"
            className="flex-1 bg-primary hover:bg-red-700 text-white"
            onClick={(e) => {
              e.stopPropagation()
              window.location.href = 'tel:01692584100'
            }}
            aria-label={`Order ${item.name} now by phone`}
          >
            <Phone className="h-4 w-4 mr-2" />
            Order Now
          </Button>

          <Button
            ref={nutritionButtonRef}
            size="sm"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              setShowNutrition((prev) => !prev)
            }}
            aria-label={`View nutritional information for ${item.name}`}
            aria-pressed={showNutrition}
          >
            <Info className="h-4 w-4" />
            Info
          </Button>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-2 text-xs text-gray-500">
          <span className="sr-only">
            Keyboard shortcuts: Enter to select, O to order, I for nutrition info
          </span>
          <span aria-hidden="true" className="opacity-70">
            Press: Enter (select) • O (order) • I (info)
          </span>
        </div>
      </CardContent>
    </button>
  )
}

