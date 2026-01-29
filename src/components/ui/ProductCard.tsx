import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

type ColorOption = { name: string; value: string } | string;

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: 'trending' | 'hot' | 'new' | 'sale';
  rating?: number;
  sizes?: string[];
  colors?: ColorOption[];
  description?: string;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  badge,
  rating = 4.5,
  sizes,
  colors,
  description,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  
  const isWishlisted = isInWishlist(id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({ id, name, price, originalPrice, image, category });
    toast.success(isWishlisted ? `${name} removed from wishlist` : `${name} added to wishlist!`);
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      name,
      price,
      quantity: 1,
      size: 'One Size',
      color: 'Default',
      image,
    });
    
    setJustAdded(true);
    toast.success(`${name} added to cart!`);
    
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <motion.div
        className="group relative bg-card rounded-lg overflow-hidden card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image Container */}
        <Link to={`/product/${id}`} className="block relative aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badge */}
          {badge && (
            <span className={cn(
              'absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full',
              badge === 'trending' && 'badge-trending',
              badge === 'hot' && 'badge-hot',
              badge === 'new' && 'badge-new',
              badge === 'sale' && 'bg-destructive text-destructive-foreground'
            )}>
              {badge === 'trending' && '🔥 Trending'}
              {badge === 'hot' && '⚡ Hot'}
              {badge === 'new' && '✨ New'}
              {badge === 'sale' && `${discount}% Off`}
            </span>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-charcoal/20 flex items-center justify-center gap-2"
          >
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg hover:scale-110 transition-transform"
              onClick={handleQuickView}
              aria-label="Quick view"
            >
              <Eye size={18} />
            </Button>
            <Button
              size="icon"
              variant={justAdded ? "default" : "secondary"}
              className={cn(
                "rounded-full shadow-lg transition-all hover:scale-110",
                justAdded && "bg-green-500 hover:bg-green-600"
              )}
              onClick={handleQuickAdd}
              aria-label="Add to cart"
            >
              {justAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
            </Button>
          </motion.div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 p-2 bg-card/90 backdrop-blur-sm rounded-full shadow-md hover:bg-card transition-colors"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={18}
              className={cn(
                'transition-colors',
                isWishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground'
              )}
            />
          </button>
        </Link>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {category}
          </p>
          <Link to={`/product/${id}`}>
            <h3 className="font-medium text-foreground hover:text-accent transition-colors line-clamp-1 mb-2">
              {name}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">৳{price.toLocaleString()}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ৳{originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1 text-sm">
              <span className="text-accent">★</span>
              <span className="text-muted-foreground">{rating}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={{
          id,
          name,
          price,
          originalPrice,
          image,
          category,
          rating,
          sizes,
          // Convert string colors to color objects for the modal
          colors: colors?.map(c => 
            typeof c === 'string' 
              ? { name: c, value: c.toLowerCase() === 'white' ? '#FFFFFF' : c.toLowerCase() === 'black' ? '#000000' : '#888888' }
              : c
          ),
          description,
        }}
      />
    </>
  );
};
