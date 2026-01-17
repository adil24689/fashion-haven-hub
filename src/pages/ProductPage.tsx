import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, ShoppingBag, Truck, RefreshCw, Shield, ChevronRight, Home } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageGallery } from '@/components/product/ImageGallery';
import { SizeSelector } from '@/components/product/SizeSelector';
import { NotifyMe } from '@/components/product/NotifyMe';
import { ProductReviews } from '@/components/product/ProductReviews';
import { ProductQA } from '@/components/product/ProductQA';
import { SafetyInfo } from '@/components/product/SafetyInfo';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

import product1 from '@/assets/products/product-1.jpg';
import product2 from '@/assets/products/product-2.jpg';
import product3 from '@/assets/products/product-3.jpg';
import product5 from '@/assets/products/product-5.jpg';
import product8 from '@/assets/products/product-8.jpg';

const product = {
  id: '1',
  name: 'Terracotta Wrap Maxi Dress',
  price: 2850,
  originalPrice: 3500,
  images: [product1, product1, product1, product1],
  category: 'Women',
  rating: 4.8,
  reviewCount: 127,
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  outOfStockSizes: ['XXL'],
  colors: [
    { name: 'Terracotta', value: '#c35831' },
    { name: 'Navy', value: '#1e3a5f' },
    { name: 'Sage', value: '#9caf88' },
  ],
  description: 'Elevate your wardrobe with our stunning Terracotta Wrap Maxi Dress. This elegant piece features a flattering wrap design, flowing maxi length, and a beautiful tiered hem.',
  details: ['Wrap-style bodice with V-neckline', 'Adjustable tie waist', 'Tiered skirt with ruffled hem', 'Lightweight, breathable fabric', 'Perfect for weddings and special occasions'],
  fabric: '100% Premium Viscose',
  care: ['Machine wash cold', 'Tumble dry low', 'Iron on low heat if needed'],
  inStock: true,
};

const relatedProducts = [
  { id: '5', name: 'Royal Red Banarasi Saree', price: 8500, originalPrice: 10000, image: product5, category: 'Women', badge: 'trending' as const },
  { id: '8', name: 'Turquoise Embroidered Kurti', price: 1850, image: product8, category: 'Women' },
  { id: '2', name: 'Premium Navy Cotton Shirt', price: 1450, image: product2, category: 'Men', badge: 'new' as const },
  { id: '3', name: 'Soft Pink Baby Romper Set', price: 850, originalPrice: 1100, image: product3, category: 'Baby', badge: 'sale' as const },
];

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isOutOfStock = selectedSize && product.outOfStockSizes?.includes(selectedSize);

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
      color: selectedColor.name,
      image: product.images[0],
    });
    
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
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
      color: selectedColor.name,
      image: product.images[0],
    });
    
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <nav className="bg-secondary/50 py-3 border-b border-border">
          <div className="container-custom">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
              <li><Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground"><Home size={14} /></Link></li>
              <ChevronRight size={14} className="text-muted-foreground" />
              <li><Link to={`/category/${product.category.toLowerCase()}`} className="text-muted-foreground hover:text-foreground">{product.category}</Link></li>
              <ChevronRight size={14} className="text-muted-foreground" />
              <li className="text-foreground font-medium truncate max-w-[200px]">{product.name}</li>
            </ol>
          </div>
        </nav>

        {/* Product Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery with Zoom */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <ImageGallery images={product.images} productName={product.name} />
              </motion.div>

              {/* Product Info */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                {discount > 0 && <span className="inline-block bg-destructive text-destructive-foreground text-sm font-semibold px-3 py-1 rounded-full">{discount}% Off</span>}
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>
                  <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? 'text-accent' : 'text-border'}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">৳{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && <span className="text-xl text-muted-foreground line-through">৳{product.originalPrice.toLocaleString()}</span>}
                </div>

                <p className="text-muted-foreground">{product.description}</p>

                {/* Color Selection */}
                <div>
                  <h4 className="font-medium mb-3">Color: {selectedColor.name}</h4>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button key={color.name} onClick={() => setSelectedColor(color)} className={cn('w-10 h-10 rounded-full border-2 transition-all', selectedColor.name === color.name ? 'border-foreground scale-110' : 'border-transparent')} style={{ backgroundColor: color.value }} title={color.name} />
                    ))}
                  </div>
                </div>

                {/* Size Selection with Guide */}
                <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSizeChange={setSelectedSize} outOfStockSizes={product.outOfStockSizes} savedSize="M" category={product.category} />

                {/* Quantity & Actions */}
                {product.inStock && !isOutOfStock ? (
                  <>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center border border-border rounded-md">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary transition-colors"><Minus size={18} /></button>
                        <span className="px-6 py-3 min-w-[4rem] text-center font-medium">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary transition-colors"><Plus size={18} /></button>
                      </div>
                      <Button className="flex-1 btn-primary group" size="lg" onClick={handleAddToCart}><ShoppingBag className="mr-2" size={20} />Add to Cart</Button>
                      <Button variant="outline" size="lg" onClick={() => setIsWishlisted(!isWishlisted)}><Heart size={20} className={isWishlisted ? 'fill-destructive text-destructive' : ''} /></Button>
                    </div>
                    <Button className="w-full btn-accent" size="lg" onClick={handleBuyNow}>Buy Now</Button>
                  </>
                ) : (
                  <NotifyMe productName={product.name} selectedSize={selectedSize} selectedColor={selectedColor.name} />
                )}

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="text-center"><Truck className="mx-auto mb-2 text-accent" size={24} /><p className="text-xs text-muted-foreground">Free Shipping Over ৳2000</p></div>
                  <div className="text-center"><RefreshCw className="mx-auto mb-2 text-accent" size={24} /><p className="text-xs text-muted-foreground">7-Day Easy Returns</p></div>
                  <div className="text-center"><Shield className="mx-auto mb-2 text-accent" size={24} /><p className="text-xs text-muted-foreground">Secure Payment</p></div>
                </div>
              </motion.div>
            </div>

            {/* Safety Info for Baby/Kids */}
            {(product.category.toLowerCase().includes('baby') || product.category.toLowerCase().includes('boy') || product.category.toLowerCase().includes('girl')) && (
              <div className="mt-12">
                <SafetyInfo category={product.category} fabric={product.fabric} />
              </div>
            )}

            {/* Product Details Tabs */}
            <div className="mt-16">
              <Tabs defaultValue="details">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 flex-wrap">
                  <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">Details</TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">Reviews ({product.reviewCount})</TabsTrigger>
                  <TabsTrigger value="qa" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">Q&A</TabsTrigger>
                  <TabsTrigger value="care" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">Care Instructions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-4">Product Features</h4>
                      <ul className="space-y-2">{product.details.map((detail, i) => <li key={i} className="flex items-start gap-2 text-muted-foreground"><span className="text-accent">•</span>{detail}</li>)}</ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Fabric & Material</h4>
                      <p className="text-muted-foreground">{product.fabric}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="pt-6">
                  <ProductReviews rating={product.rating} reviewCount={product.reviewCount} />
                </TabsContent>

                <TabsContent value="qa" className="pt-6">
                  <ProductQA productName={product.name} />
                </TabsContent>
                
                <TabsContent value="care" className="pt-6">
                  <ul className="space-y-2">{product.care.map((instruction, i) => <li key={i} className="flex items-start gap-2 text-muted-foreground"><span className="text-accent">•</span>{instruction}</li>)}</ul>
                </TabsContent>
              </Tabs>
            </div>

            {/* Related Products */}
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((prod) => <ProductCard key={prod.id} {...prod} />)}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
