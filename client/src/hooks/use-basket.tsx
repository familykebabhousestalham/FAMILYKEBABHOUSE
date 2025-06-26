import { useState, useEffect, createContext, useContext, ReactNode, useMemo } from 'react';

export interface BasketItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  size?: string;
  customizations?: string[];
  image?: string;
  emoji?: string;
}

interface BasketContextType {
  items: BasketItem[];
  addItem: (item: Omit<BasketItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBasket: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { readonly children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load basket from localStorage on mount
  useEffect(() => {
    const savedBasket = localStorage.getItem('familyKebabBasket');
    if (savedBasket) {
      try {
        setItems(JSON.parse(savedBasket));
      } catch (error) {
        // Handle localStorage errors - basket will remain empty
        console.error('Failed to parse basket from localStorage:', error);
      }
    }
  }, []);

  // Save basket to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('familyKebabBasket', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<BasketItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.name === newItem.name && item.size === newItem.size
      );

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // New item, add with quantity 1
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearBasket = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const contextValue = useMemo(() => ({
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearBasket,
    totalItems,
    totalPrice,
    isOpen,
    setIsOpen,
  }), [items, totalItems, totalPrice, isOpen]);

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
}
