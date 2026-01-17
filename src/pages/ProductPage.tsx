import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Minus, Plus, ShoppingBag, Truck, RefreshCw, Shield, ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  images: [product1, product1, product1],
  category: 'Women',
  rating: 4.8,
  reviewCount: 127,
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    { name: 'Terracotta', value: '#c35831' },
    { name: 'Navy', value: '#1e3a5f' },
    { name: 'Sage', value: '#9caf88' },
  ],
  description: 'Elevate your wardrobe with our stunning Terracotta Wrap Maxi Dress. This elegant piece features a flattering wrap design, flowing maxi length, and a beautiful tiered hem that moves gracefully with every step.',
  details: [
    'Wrap-style bodice with V-neckline',
    'Adjustable tie waist for a customized fit',
    'Tiered skirt with ruffled hem',
    'Lightweight, breathable fabric',
    'Perfect for weddings, parties, and special occasions',
  ],
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
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary/50 py-3">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors">
                {product.category}
              </Link>
              <ChevronRight size={14} />
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-24 rounded-md overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-accent' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Badge */}
                {discount > 0 && (
                  <span className="inline-block bg-destructive text-destructive-foreground text-sm font-semibold px-3 py-1 rounded-full">
                    {discount}% Off
                  </span>
                )}

                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>
                  <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-border'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">৳{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-muted-foreground line-through">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground">{product.description}</p>

                {/* Color Selection */}
                <div>
                  <h4 className="font-medium mb-3">Color: {selectedColor.name}</h4>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor.name === color.name ? 'border-foreground scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Size</h4>
                    <button className="text-sm text-accent hover:underline">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-12 rounded-md border font-medium transition-all ${
                          selectedSize === size
                            ? 'border-accent bg-accent text-accent-foreground'
                            : 'border-border hover:border-accent'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-6 py-3 min-w-[4rem] text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <Button className="flex-1 btn-primary group" size="lg">
                    <ShoppingBag className="mr-2" size={20} />
                    Add to Cart
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart
                      size={20}
                      className={isWishlisted ? 'fill-destructive text-destructive' : ''}
                    />
                  </Button>
                </div>

                <Button className="w-full btn-accent" size="lg">
                  Buy Now
                </Button>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="text-center">
                    <Truck className="mx-auto mb-2 text-accent" size={24} />
                    <p className="text-xs text-muted-foreground">Free Shipping Over ৳2000</p>
                  </div>
                  <div className="text-center">
                    <RefreshCw className="mx-auto mb-2 text-accent" size={24} />
                    <p className="text-xs text-muted-foreground">7-Day Easy Returns</p>
                  </div>
                  <div className="text-center">
                    <Shield className="mx-auto mb-2 text-accent" size={24} />
                    <p className="text-xs text-muted-foreground">Secure Payment</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-16">
              <Tabs defaultValue="details">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                  <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">
                    Reviews ({product.reviewCount})
                  </TabsTrigger>
                  <TabsTrigger value="care" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">
                    Care Instructions
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-4">Product Features</h4>
                      <ul className="space-y-2">
                        {product.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-accent">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Fabric & Material</h4>
                      <p className="text-muted-foreground">{product.fabric}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="pt-6">
                  <p className="text-muted-foreground">Customer reviews will be displayed here.</p>
                </TabsContent>
                
                <TabsContent value="care" className="pt-6">
                  <ul className="space-y-2">
                    {product.care.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-accent">•</span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>

            {/* Related Products */}
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod.id} {...prod} />
                ))}
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
