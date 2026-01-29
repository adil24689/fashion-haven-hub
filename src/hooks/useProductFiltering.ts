import { useMemo } from 'react';
import { FilterState } from '@/components/product/ProductFilters';

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'name-asc' | 'name-desc';

export interface ProductColor {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: 'new' | 'sale' | 'hot' | 'trending';
  rating?: number;
  bulkOffer?: string;
  colors?: ProductColor[];
  sizes?: string[];
  brand?: string;
  inStock?: boolean;
  createdAt?: Date;
  description?: string;
}

interface UseProductFilteringProps {
  products: Product[];
  filters: FilterState;
  sortBy: SortOption;
  category?: string;
}

export const useProductFiltering = ({ products, filters, sortBy, category }: UseProductFilteringProps) => {
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (category) {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by price range
    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by discount (based on originalPrice)
    if (filters.discount.length > 0) {
      result = result.filter(product => {
        if (!product.originalPrice) return false;
        const discountPercent = ((product.originalPrice - product.price) / product.originalPrice) * 100;
        
        return filters.discount.some(d => {
          const minDiscount = parseInt(d.split('%')[0]);
          return discountPercent >= minDiscount;
        });
      });
    }

    // Filter by colors (if product has colors array)
    if (filters.colors.length > 0) {
      result = result.filter(product => {
        if (!product.colors) return true; // Keep products without color info
        return product.colors.some(c => filters.colors.includes(c.name));
      });
    }

    // Filter by sizes (if product has sizes array)
    if (filters.sizes.length > 0) {
      result = result.filter(product => {
        if (!product.sizes) return true; // Keep products without size info
        return product.sizes.some(s => filters.sizes.includes(s));
      });
    }

    // Filter by brands
    if (filters.brands.length > 0) {
      result = result.filter(product => {
        if (!product.brand) return true; // Keep products without brand info
        return filters.brands.includes(product.brand);
      });
    }

    // Filter by availability
    if (filters.availability.length > 0) {
      result = result.filter(product => {
        const isInStock = product.inStock !== false; // Default to in stock if undefined
        if (filters.availability.includes('In Stock') && isInStock) return true;
        if (filters.availability.includes('Out of Stock') && !isInStock) return true;
        return false;
      });
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        // Sort by badge 'new' first, then by id (assuming higher id = newer)
        result.sort((a, b) => {
          if (a.badge === 'new' && b.badge !== 'new') return -1;
          if (b.badge === 'new' && a.badge !== 'new') return 1;
          return parseInt(b.id) - parseInt(a.id);
        });
        break;
      case 'featured':
      default:
        // Featured: trending and hot first, then by rating
        result.sort((a, b) => {
          const priority = { trending: 4, hot: 3, new: 2, sale: 1 };
          const aPriority = a.badge ? priority[a.badge] || 0 : 0;
          const bPriority = b.badge ? priority[b.badge] || 0 : 0;
          if (aPriority !== bPriority) return bPriority - aPriority;
          return (b.rating || 0) - (a.rating || 0);
        });
        break;
    }

    return result;
  }, [products, filters, sortBy, category]);

  return {
    filteredProducts: filteredAndSortedProducts,
    totalCount: filteredAndSortedProducts.length,
  };
};
