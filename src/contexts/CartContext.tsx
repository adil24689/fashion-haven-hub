import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopping-cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from database or localStorage
  const loadCart = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        const cartItems: CartItem[] = (data || []).map(item => ({
          id: item.product_id,
          name: item.name,
          price: Number(item.price),
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image,
        }));

        setItems(cartItems);
        
        // Clear localStorage after syncing to DB
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Load from localStorage for guests
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      setItems(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  // Sync localStorage cart to database on login
  const syncLocalCartToDb = useCallback(async () => {
    if (!user) return;

    const localCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!localCart) return;

    const localItems: CartItem[] = JSON.parse(localCart);
    if (localItems.length === 0) return;

    try {
      for (const item of localItems) {
        await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            product_id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.image,
          }, {
            onConflict: 'user_id,product_id,size,color'
          });
      }
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      syncLocalCartToDb().then(() => loadCart());
    } else {
      loadCart();
    }
  }, [user, loadCart, syncLocalCartToDb]);

  // Persist to localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, user]);

  const addItem = async (newItem: CartItem) => {
    const existingIndex = items.findIndex(
      item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
    );

    let updatedItems: CartItem[];

    if (existingIndex >= 0) {
      updatedItems = items.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      );
    } else {
      updatedItems = [...items, newItem];
    }

    setItems(updatedItems);

    if (user) {
      try {
        const existingItem = existingIndex >= 0 ? items[existingIndex] : null;
        
        await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            product_id: newItem.id,
            name: newItem.name,
            price: newItem.price,
            quantity: existingItem ? existingItem.quantity + newItem.quantity : newItem.quantity,
            size: newItem.size,
            color: newItem.color,
            image: newItem.image,
          }, {
            onConflict: 'user_id,product_id,size,color'
          });
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const removeItem = async (id: string) => {
    setItems(current => current.filter(item => item.id !== id));

    if (user) {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', id);
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }

    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );

    if (user) {
      try {
        await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', id);
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  const clearCart = async () => {
    setItems([]);

    if (user) {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 2000 ? 0 : 100;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shipping,
        total,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
