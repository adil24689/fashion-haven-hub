import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Minus, Plus, ShoppingBag, Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
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
  };
}

export const QuickViewModal = ({ isOpen, onClose, product }: QuickViewModalProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="aspect-square bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-4">
            {discount > 0 && (
              <span className="inline-block bg-destructive text-destructive-foreground text-sm font-semibold px-3 py-1 rounded-full">
                {discount}% Off
              </span>
            )}

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
              <h4 className="text-sm font-medium mb-2">Color: {selectedColor?.name}</h4>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 transition-all',
                      selectedColor?.name === color.name ? 'border-foreground scale-110' : 'border-transparent'
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h4 className="text-sm font-medium mb-2">Size</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'w-12 h-10 rounded-md border text-sm font-medium transition-all',
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
            <div className="flex gap-3">
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-secondary transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-secondary transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button className="flex-1 btn-primary" size="lg">
                <ShoppingBag className="mr-2" size={18} />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  size={18}
                  className={isWishlisted ? 'fill-destructive text-destructive' : ''}
                />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
