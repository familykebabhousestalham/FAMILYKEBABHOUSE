import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ShoppingBasket, Plus, Minus, Trash2, Phone, Share2 } from 'lucide-react';
import { useBasket } from '@/hooks/use-basket';

export default function BasketDrawer() {
  const { items, updateQuantity, removeItem, clearBasket, totalItems, totalPrice, isOpen, setIsOpen } = useBasket();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!navigator.share) {
      // Fallback for browsers that don't support Web Share API
      const text = `Check out my order from Family Kebab House! Total: £${totalPrice.toFixed(2)}`;
      navigator.clipboard.writeText(text);
      setIsSharing(true);
      setTimeout(() => setIsSharing(false), 2000);
      return;
    }

    try {
      await navigator.share({
        title: 'My Family Kebab House Order',
        text: `Check out my delicious order! Total: £${totalPrice.toFixed(2)}`,
        url: window.location.href,
      });
    } catch (error) {
      // Handle the exception (e.g., log or show a message)
      console.error('Sharing failed', error);
      setIsSharing(false);
    }
  };

  const handleCheckout = () => {
    // Create order summary for phone call
    const orderSummary = items.map(item => {
      let sizeText = '';
      if (item.size) {
        sizeText = ' (' + item.size + ')';
      }
      return item.quantity + 'x ' + item.name + sizeText;
    }).join(', ');
    
    const message = `Order: ${orderSummary}. Total: £${totalPrice.toFixed(2)}`;
    
    // Copy to clipboard for easy reference during phone call
    navigator.clipboard.writeText(message);
    
    // Open phone dialer
    window.open('tel:01692584100', '_self');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 bg-primary hover:bg-red-700 text-white shadow-2xl rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center"
          size="lg"
        >
          <ShoppingBasket className="h-4 w-4 sm:h-6 sm:w-6" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-accent text-charcoal min-w-5 h-5 sm:min-w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-full sm:max-w-lg p-4 sm:p-6">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBasket className="h-5 w-5" />
            Your Basket
            {totalItems > 0 && (
              <Badge variant="secondary">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 sm:mt-6 flex-1 overflow-y-auto max-h-80 sm:max-h-96">
          {items.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <ShoppingBasket className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-base sm:text-lg">Your basket is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add some delicious items from our menu!</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size ?? 'default'}`} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-charcoal">
                        {item.emoji} {item.name}
                      </h4>
                      {item.size && (
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                      )}
                      {item.customizations && item.customizations.length > 0 && (
                        <p className="text-sm text-gray-600">
                          Extras: {item.customizations.join(', ')}
                        </p>
                      )}
                      <p className="text-primary font-bold mt-1">
                        £{item.price.toFixed(2)} each
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="font-semibold min-w-[2ch] text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 pt-3 border-t">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="font-bold text-primary">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-6 mt-6 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary text-2xl">£{totalPrice.toFixed(2)}</span>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Button 
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3"
                size="lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call to Order: 01692 584 100
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex-1"
                  disabled={isSharing}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  {isSharing ? 'Copied!' : 'Share Order'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={clearBasket}
                  className="flex-1"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Basket
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>🕐 Your order will be ready in 15 minutes</p>
              <p>💰 Cash payment only</p>
              <p>📞 Order summary copied to clipboard for easy phone ordering</p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
