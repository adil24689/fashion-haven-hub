import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
  itemCount: number;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'wishlist';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load wishlist from database or localStorage
  const loadWishlist = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('wishlist_items')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        const wishlistItems: WishlistItem[] = (data || []).map(item => ({
          id: item.product_id,
          name: item.name,
          price: Number(item.price),
          originalPrice: item.original_price ? Number(item.original_price) : undefined,
          image: item.image,
          category: item.category,
        }));

        setItems(wishlistItems);
        
        // Clear localStorage after syncing to DB
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
      } catch (error) {
        console.error('Error loading wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Load from localStorage for guests
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      setItems(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  // Sync localStorage wishlist to database on login
  const syncLocalWishlistToDb = useCallback(async () => {
    if (!user) return;

    const localWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!localWishlist) return;

    const localItems: WishlistItem[] = JSON.parse(localWishlist);
    if (localItems.length === 0) return;

    try {
      for (const item of localItems) {
        await supabase
          .from('wishlist_items')
          .upsert({
            user_id: user.id,
            product_id: item.id,
            name: item.name,
            price: item.price,
            original_price: item.originalPrice,
            image: item.image,
            category: item.category,
          }, {
            onConflict: 'user_id,product_id'
          });
      }
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    } catch (error) {
      console.error('Error syncing wishlist:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      syncLocalWishlistToDb().then(() => loadWishlist());
    } else {
      loadWishlist();
    }
  }, [user, loadWishlist, syncLocalWishlistToDb]);

  // Persist to localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, user]);

  const addItem = async (newItem: WishlistItem) => {
    const exists = items.some(item => item.id === newItem.id);
    if (exists) return;

    setItems(current => [...current, newItem]);

    if (user) {
      try {
        await supabase
          .from('wishlist_items')
          .insert({
            user_id: user.id,
            product_id: newItem.id,
            name: newItem.name,
            price: newItem.price,
            original_price: newItem.originalPrice,
            image: newItem.image,
            category: newItem.category,
          });
      } catch (error) {
        console.error('Error adding to wishlist:', error);
      }
    }
  };

  const removeItem = async (id: string) => {
    setItems(current => current.filter(item => item.id !== id));

    if (user) {
      try {
        await supabase
          .from('wishlist_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', id);
      } catch (error) {
        console.error('Error removing from wishlist:', error);
      }
    }
  };

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  const toggleItem = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  const clearWishlist = async () => {
    setItems([]);

    if (user) {
      try {
        await supabase
          .from('wishlist_items')
          .delete()
          .eq('user_id', user.id);
      } catch (error) {
        console.error('Error clearing wishlist:', error);
      }
    }
  };

  const itemCount = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        toggleItem,
        clearWishlist,
        itemCount,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
