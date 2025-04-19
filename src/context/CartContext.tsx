
import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations?: Record<string, string | number | boolean>;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate totals whenever items change
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const price = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex(item => {
        // Check if the item has the same id and customizations
        if (item.id !== newItem.id) return false;
        
        // If no customizations on either item, they're the same
        if (!item.customizations && !newItem.customizations) return true;
        
        // If one has customizations and the other doesn't, they're different
        if (!item.customizations || !newItem.customizations) return false;
        
        // Compare customization objects
        const itemCustomKeys = Object.keys(item.customizations);
        const newItemCustomKeys = Object.keys(newItem.customizations);
        
        // If they have different numbers of customization properties, they're different
        if (itemCustomKeys.length !== newItemCustomKeys.length) return false;
        
        // Check if all customizations match
        return itemCustomKeys.every(key => 
          item.customizations![key] === newItem.customizations![key]
        );
      });
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        return updatedItems;
      }
      
      // Add new item
      return [...prevItems, newItem];
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
    
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
