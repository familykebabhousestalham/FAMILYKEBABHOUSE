import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingBasket, Plus, Share2 } from 'lucide-react';
import { useBasket } from '@/hooks/use-basket';
import { toast } from '@/hooks/use-toast';

interface AddToBasketButtonProps {
  readonly item: {
    readonly id: string | number;
    readonly name: string;
    readonly category: string;
    readonly singlePrice?: number;
    readonly priceSmall?: number;
    readonly priceMedium?: number;
    readonly priceLarge?: number;
    readonly priceXLarge?: number;
    readonly price10inches?: number;
    readonly price12inches?: number;
    readonly description?: string;
  };
  readonly variant?: 'default' | 'small' | 'icon';
  readonly className?: string;
}

interface SizeOption {
  label: string;
  price: number;
  value: string;
}

// Helper functions to reduce complexity
function getPizzaSizes(item: AddToBasketButtonProps['item']): SizeOption[] {
  const sizes: SizeOption[] = [];
  if (item.price10inches && item.price10inches > 0) {
    sizes.push({ label: '10"', price: item.price10inches, value: 'small' });
  }
  if (item.price12inches && item.price12inches > 0) {
    sizes.push({ label: '12"', price: item.price12inches, value: 'large' });
  }
  if (sizes.length === 0) {
    if (item.priceSmall && item.priceSmall > 0) {
      sizes.push({ label: '10"', price: item.priceSmall, value: 'small' });
    }
    if (item.priceLarge && item.priceLarge > 0) {
      sizes.push({ label: '12"', price: item.priceLarge, value: 'large' });
    }
  }
  return sizes;
}

// Helper for kebab size extraction
function addSizeIfValid(sizes: SizeOption[], label: string, price: number | undefined, value: string) {
  if (price && price > 0) {
    sizes.push({ label, price, value });
  }
}

function getKebabSizes(item: AddToBasketButtonProps['item']): SizeOption[] {
  const sizes: SizeOption[] = [];
  const hasMedium = item.priceMedium && item.priceMedium > 0;
  const hasLarge = item.priceLarge && item.priceLarge > 0;
  if (hasMedium && hasLarge) {
    addSizeIfValid(sizes, 'Medium', item.priceMedium, 'medium');
    addSizeIfValid(sizes, 'Large', item.priceLarge, 'large');
    addSizeIfValid(sizes, 'X-Large', item.priceXLarge, 'xlarge');
  } else if (item.singlePrice && item.singlePrice > 0) {
    addSizeIfValid(sizes, 'Regular', item.singlePrice, 'regular');
  }
  return sizes;
}

function getBurgerSizes(item: AddToBasketButtonProps['item']): SizeOption[] {
  const sizes: SizeOption[] = [];
  if (item.priceSmall && item.priceSmall > 0) {
    sizes.push({ label: 'Single', price: item.priceSmall, value: 'single' });
  }
  if (item.priceLarge && item.priceLarge > 0) {
    sizes.push({ label: 'Meal', price: item.priceLarge, value: 'meal' });
  }
  return sizes;
}

function getChickenSizes(item: AddToBasketButtonProps['item']): SizeOption[] {
  const sizes: SizeOption[] = [];
  if (item.singlePrice && item.singlePrice > 0) {
    sizes.push({ label: 'Single', price: item.singlePrice, value: 'single' });
  }
  if (item.priceMedium && item.priceMedium > 0) {
    sizes.push({ label: 'With Chips', price: item.priceMedium, value: 'with-chips' });
  }
  if (item.priceLarge && item.priceLarge > 0) {
    sizes.push({ label: 'Meal', price: item.priceLarge, value: 'meal' });
  }
  return sizes;
}

function getStandardSizes(item: AddToBasketButtonProps['item']): SizeOption[] {
  const sizes: SizeOption[] = [];
  if (item.singlePrice && item.singlePrice > 0) {
    sizes.push({ label: 'Regular', price: item.singlePrice, value: 'regular' });
  }
  if (item.priceSmall && item.priceSmall > 0) {
    sizes.push({ label: 'Small', price: item.priceSmall, value: 'small' });
  }
  if (item.priceMedium && item.priceMedium > 0) {
    sizes.push({ label: 'Medium', price: item.priceMedium, value: 'medium' });
  }
  if (item.priceLarge && item.priceLarge > 0) {
    sizes.push({ label: 'Large', price: item.priceLarge, value: 'large' });
  }
  if (item.priceXLarge && item.priceXLarge > 0) {
    sizes.push({ label: 'X-Large', price: item.priceXLarge, value: 'xlarge' });
  }
  return sizes;
}

// Helper for fallback price logic
function getLunchTimeOfferPrice(name: string | undefined): number {
  if (!name) return 8.50;
  if (name.includes('¼ Pounder')) return 7.90;
  if (name.includes('½ Pounder')) return 9.50;
  if (name.includes('Chicken Burger')) return 8.50;
  if (name.includes('Medium Doner')) return 9.00;
  if (name.includes('Large Doner')) return 10.50;
  if (name.includes('10"')) return 11.00;
  if (name.includes('12"')) return 12.50;
  return 8.50;
}

function getExtrasFallbackPrice(name: string | undefined): number {
  if (!name) return 1.50;
  if (name.includes('Sauce')) return 0.50;
  if (name.includes('Chips')) return 2.50;
  if (name.includes('Salad')) return 1.00;
  return 1.50;
}

function getDrinksFallbackPrice(name: string | undefined): number {
  if (!name) return 1.75;
  if (name.includes('Can')) return 1.50;
  if (name.includes('Bottle')) return 2.00;
  return 1.75;
}

function getFallbackPrice(item: AddToBasketButtonProps['item']): number {
  switch (item.category) {
    case 'lunch-time-offers':
      return getLunchTimeOfferPrice(item.name);
    case 'family-deals':
      return 26.90;
    case 'pizza-offers':
      return 15.00;
    case 'kebabs':
      return 12.00;
    case 'pizzas':
      return 9.50;
    case 'burgers':
      return 6.50;
    case 'extras':
      return getExtrasFallbackPrice(item.name);
    case 'drinks':
      return getDrinksFallbackPrice(item.name);
    case 'desserts':
      return 3.50;
    default:
      return 7.50;
  }
}

export default function AddToBasketButton({ item, variant = 'default', className = '' }: Readonly<AddToBasketButtonProps>) {
  const { addItem, setIsOpen } = useBasket();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Get available sizes for the item
  const getSizeOptions = (): SizeOption[] => {
    let sizes: SizeOption[] = [];
    switch (item.category) {
      case 'pizzas':
        sizes = getPizzaSizes(item);
        break;
      case 'kebabs':
        sizes = getKebabSizes(item);
        break;
      case 'burgers':
        sizes = getBurgerSizes(item);
        break;
      case 'chicken-wings-strips':
      case 'chicken-nuggets':
        sizes = getChickenSizes(item);
        break;
      default:
        sizes = getStandardSizes(item);
    }
    if (sizes.length === 0) {
      sizes.push({ label: 'Regular', price: getFallbackPrice(item), value: 'regular' });
    }
    return sizes;
  };

  // Get available extras based on category
  const getExtrasOptions = () => {
    const commonExtras = [
      { label: 'Extra Sauce', price: 0.50 },
      { label: 'Extra Salad', price: 1.00 },
    ];

    const categoryExtras = {
      'pizzas': [
        { label: 'Extra Cheese', price: 1.50 },
        { label: 'Stuffed Crust', price: 2.00 },
        { label: 'Extra Topping', price: 1.40 },
      ],
      'kebabs': [
        { label: 'Extra Meat', price: 2.50 },
        { label: 'Extra Pitta', price: 1.00 },
        { label: 'Chili Sauce', price: 0.30 },
      ],
      'burgers': [
        { label: 'Extra Cheese', price: 1.00 },
        { label: 'Bacon', price: 1.50 },
        { label: 'Large Chips', price: 1.50 },
      ],
    };

    return [...commonExtras, ...(categoryExtras[item.category as keyof typeof categoryExtras] || [])];
  };

  const sizeOptions = getSizeOptions();
  const extrasOptions = getExtrasOptions();
  const hasMultipleSizes = sizeOptions.length > 1;

  const getSelectedPrice = () => {
    const selectedSizeOption = sizeOptions.find(size => size.value === selectedSize);
    const basePrice = selectedSizeOption?.price ?? sizeOptions[0]?.price ?? 0;
    const extrasPrice = selectedExtras.reduce((sum, extraLabel) => {
      const extra = extrasOptions.find(e => e.label === extraLabel);
      return sum + (extra?.price ?? 0);
    }, 0);
    return basePrice + extrasPrice;
  };

  const getEmoji = (name: string) => {
    const regex = /^[^\w\s]*/;
    const match = regex.exec(name);
    return match?.[0] ?? '🍽️';
  };

  const handleAddToBasket = () => {
    const selectedSizeOption = sizeOptions.find(size => size.value === selectedSize) ?? sizeOptions[0];
    if (!selectedSizeOption) {
      toast({
        title: "Error",
        description: "Unable to determine price for this item.",
        variant: "destructive",
      });
      return;
    }
    const basketItem = {
      id: `${item.id}-${selectedSizeOption.value}-${selectedExtras.join('-')}`,
      name: item.name,
      price: getSelectedPrice(),
      category: item.category,
      size: hasMultipleSizes ? selectedSizeOption.label : undefined,
      customizations: selectedExtras.length > 0 ? selectedExtras : undefined,
      emoji: getEmoji(item.name),
    };
    addItem(basketItem);
    setIsOpen(true);
    toast({
      title: "Added to basket!",
      description: `${item.name} has been added to your basket.`,
    });
    setIsDialogOpen(false);
    setSelectedSize('');
    setSelectedExtras([]);
  };

  const handleShareDish = async () => {
    const dishText = `Check out this delicious ${item.name} from Family Kebab House! ${item.description ?? ''}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.name} - Family Kebab House`,
          text: dishText,
          url: window.location.href,
        });
      } catch (error) {
        // Handle the exception by showing a toast
        toast({ title: "Share failed", description: String(error), variant: "destructive" });
      }
    } else {
      navigator.clipboard.writeText(dishText);
      setIsSharing(true);
      setTimeout(() => setIsSharing(false), 2000);
      toast({
        title: "Copied to clipboard!",
        description: "Dish details copied for sharing.",
      });
    }
  };

  // Helper for quick add fallback price
  function getQuickAddCategoryPrice(item: AddToBasketButtonProps['item']): number {
    switch (item.category) {
      case 'lunch-time-offers':
        return 8.50;
      case 'family-deals':
        return 26.90;
      case 'pizza-offers':
        return 15.00;
      case 'kebabs':
        return 12.00;
      case 'pizzas':
        return 9.50;
      case 'burgers':
        return 6.50;
      case 'fried-chicken':
        return 5.50;
      case 'extras':
        return getExtrasFallbackPrice(item.name);
      case 'drinks':
        return getDrinksFallbackPrice(item.name);
      case 'desserts':
        return 3.50;
      case 'kids-meals':
        return 6.50;
      case 'chicken-wings-strips':
        return 4.50;
      case 'chicken-nuggets':
        return 4.00;
      case 'scampi':
        return 5.50;
      default:
        return 7.50;
    }
  }

  function getQuickAddPrice(item: AddToBasketButtonProps['item'], sizeOptions: SizeOption[]): number {
    let price = sizeOptions[0]?.price ?? item.singlePrice ?? 0;
    if (price > 0) return price;
    return getQuickAddCategoryPrice(item);
  }

  const handleQuickAdd = () => {
    const price = getQuickAddPrice(item, sizeOptions);
    const basketItem = {
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      price,
      category: item.category,
      emoji: getEmoji(item.name),
    };
    addItem(basketItem);
    setIsOpen(true);
    toast({
      title: "Added to basket!",
      description: `${item.name} has been added to your basket.`,
    });
  };

  if (variant === 'icon') {
    return (
      <div className="flex gap-1">
        <Button
          size="sm"
          onClick={handleQuickAdd}
          className={`bg-primary hover:bg-red-700 text-white ${className}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleShareDish}
          disabled={isSharing}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (variant === 'small') {
    return (
      <div className="flex gap-2">
        {sizeOptions.length > 1 ? (
          <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className={`bg-primary hover:bg-red-700 text-white ${className}`}
                onClick={() => setIsDialogOpen(true)}
              >
                <ShoppingBasket className="mr-1 h-3 w-3" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="size-select-small">Choose Size:</label>
                  <div className="grid gap-2" id="size-select-small">
                    {sizeOptions.map((size) => (
                      <Button
                        key={size.value}
                        variant={selectedSize === size.value ? "default" : "outline"}
                        onClick={() => setSelectedSize(size.value)}
                        className="justify-between"
                        aria-pressed={selectedSize === size.value}
                      >
                        <span>{size.label}</span>
                        <span className="font-bold">£{size.price.toFixed(2)}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-lg font-bold">
                    Total: £{(sizeOptions.find(s => s.value === selectedSize)?.price ?? sizeOptions[0]?.price ?? 0).toFixed(2)}
                  </div>
                  <Button 
                    onClick={handleAddToBasket}
                    className="bg-primary hover:bg-red-700"
                    disabled={!selectedSize}
                  >
                    <ShoppingBasket className="w-4 h-4 mr-2" />
                    Add to Basket
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Button
            size="sm"
            onClick={handleQuickAdd}
            className={`bg-primary hover:bg-red-700 text-white ${className}`}
          >
            <ShoppingBasket className="mr-1 h-3 w-3" />
            Add
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          onClick={handleShareDish}
          disabled={isSharing}
        >
          <Share2 className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 add-to-basket-root`}>
      {sizeOptions.length > 1 ? (
        <Dialog open={isDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className={`bg-primary hover:bg-red-700 text-white flex-1 ${className} relative z-20`}
              onClick={() => setIsDialogOpen(true)}
            >
              <ShoppingBasket className="mr-2 h-4 w-4" />
              Choose Size
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="size-select-main">Choose Size:</label>
                <div className="grid gap-2" id="size-select-main">
                  {sizeOptions.map((size) => (
                    <Button
                      key={size.value}
                      variant={selectedSize === size.value ? "default" : "outline"}
                      onClick={() => setSelectedSize(size.value)}
                      className="justify-between"
                      aria-pressed={selectedSize === size.value}
                    >
                      <span>{size.label}</span>
                      <span className="font-bold">£{size.price.toFixed(2)}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="text-lg font-bold">
                  Total: £{(sizeOptions.find(s => s.value === selectedSize)?.price ?? sizeOptions[0]?.price ?? 0).toFixed(2)}
                </div>
                <Button 
                  onClick={handleAddToBasket}
                  className="bg-primary hover:bg-red-700"
                  disabled={!selectedSize}
                >
                  <ShoppingBasket className="w-4 h-4 mr-2" />
                  Add to Basket
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          onClick={handleQuickAdd}
          className={`bg-primary hover:bg-red-700 text-white flex-1 ${className} relative z-20`}
        >
          <ShoppingBasket className="mr-2 h-4 w-4" />
          Add to Basket
        </Button>
      )}

      <Button
        variant="outline"
        onClick={handleShareDish}
        disabled={isSharing}
      >
        <Share2 className="h-4 w-4" />
        {isSharing ? 'Copied!' : ''}
      </Button>
    </div>
  );
}
