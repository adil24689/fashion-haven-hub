import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Minus, Plus, ShoppingBag, Star, X, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

interface QuickViewProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  sizes?: string[];
  colors?: { name: string; value: string }[];
  description?: string;
}

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: QuickViewProduct | null;
}

export const QuickViewModal = ({ isOpen, onClose, product }: QuickViewModalProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; value: string } | undefined>();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const defaultSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const defaultColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Navy', value: '#1e3a5f' },
  ];

  const sizes = product.sizes || defaultSizes;
  const colors = product.colors || defaultColors;
  const currentColor = selectedColor || colors[0];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: currentColor.name,
      image: product.image,
    });
    
    toast.success(`${product.name} added to cart!`);
    onClose();
  };

  const handleToggleWishlist = () => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
    toast.success(isWishlisted ? `${product.name} removed from wishlist` : `${product.name} added to wishlist!`);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      // Reset state when closing
      setSelectedSize('');
      setSelectedColor(undefined);
      setQuantity(1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden gap-0">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="aspect-square bg-secondary relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm font-semibold px-3 py-1 rounded-full">
                {discount}% Off
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                {product.category}
              </p>
              <h2 className="font-display text-2xl font-bold mb-2">{product.name}</h2>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating || 4.5) ? 'fill-accent text-accent' : 'text-border'}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.rating || 4.5})</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">৳{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-muted-foreground text-sm">
              {product.description || 'Premium quality product with excellent craftsmanship and attention to detail.'}
            </p>

            {/* Color Selection */}
            <div>
              <h4 className="text-sm font-medium mb-2">Color: {currentColor.name}</h4>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 transition-all hover:scale-110',
                      currentColor.name === color.name ? 'border-foreground scale-110' : 'border-border'
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Size</h4>
                {!selectedSize && (
                  <span className="text-xs text-muted-foreground">Please select a size</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'min-w-12 h-10 px-3 rounded-md border text-sm font-medium transition-all',
                      selectedSize === size
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border hover:border-accent'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex gap-3 pt-2">
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-secondary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-secondary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button className="flex-1 btn-primary" size="lg" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2" size={18} />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleWishlist}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  size={18}
                  className={isWishlisted ? 'fill-destructive text-destructive' : ''}
                />
              </Button>
            </div>

            {/* View Full Details Link */}
            <div className="pt-2">
              <Button variant="link" asChild className="p-0 h-auto text-sm">
                <Link to={`/product/${product.id}`} onClick={onClose}>
                  View Full Details
                  <ExternalLink size={14} className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
