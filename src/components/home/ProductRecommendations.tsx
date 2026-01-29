import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import product1 from '@/assets/products/product-1.jpg';
import product2 from '@/assets/products/product-2.jpg';
import product3 from '@/assets/products/product-3.jpg';
import product4 from '@/assets/products/product-4.jpg';
import product5 from '@/assets/products/product-5.jpg';
import product6 from '@/assets/products/product-6.jpg';
import product7 from '@/assets/products/product-7.jpg';
import product8 from '@/assets/products/product-8.jpg';

// Popular products based on sales/views
const popularProducts = [
  {
    id: '5',
    name: 'Royal Red Banarasi Saree',
    price: 8500,
    originalPrice: 10000,
    image: product5,
    category: 'Women',
    badge: 'trending' as const,
    rating: 4.9,
  },
  {
    id: '1',
    name: 'Terracotta Wrap Maxi Dress',
    price: 2850,
    originalPrice: 3500,
    image: product1,
    category: 'Women',
    badge: 'hot' as const,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Soft Pink Baby Romper Set',
    price: 850,
    originalPrice: 1100,
    image: product3,
    category: 'Baby',
    badge: 'sale' as const,
    rating: 4.9,
  },
  {
    id: '6',
    name: 'Purple Princess Party Dress',
    price: 1650,
    image: product6,
    category: 'Girls',
    badge: 'trending' as const,
    rating: 4.8,
  },
];

// Trending products
const trendingProducts = [
  {
    id: '2',
    name: 'Premium Navy Cotton Shirt',
    price: 1450,
    image: product2,
    category: 'Men',
    badge: 'new' as const,
    rating: 4.6,
  },
  {
    id: '4',
    name: 'Khaki Boys Casual Jacket',
    price: 1950,
    image: product4,
    category: 'Boys',
    badge: 'hot' as const,
    rating: 4.7,
  },
  {
    id: '8',
    name: 'Turquoise Embroidered Kurti',
    price: 1850,
    image: product8,
    category: 'Women',
    badge: 'trending' as const,
    rating: 4.7,
  },
  {
    id: '7',
    name: 'Premium Slim Fit Denim Jeans',
    price: 2200,
    originalPrice: 2800,
    image: product7,
    category: 'Men',
    badge: 'sale' as const,
    rating: 4.5,
  },
];

// Recently added products
const newArrivals = [
  {
    id: '2',
    name: 'Premium Navy Cotton Shirt',
    price: 1450,
    image: product2,
    category: 'Men',
    badge: 'new' as const,
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Purple Princess Party Dress',
    price: 1650,
    image: product6,
    category: 'Girls',
    badge: 'new' as const,
    rating: 4.8,
  },
  {
    id: '8',
    name: 'Turquoise Embroidered Kurti',
    price: 1850,
    image: product8,
    category: 'Women',
    badge: 'new' as const,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Khaki Boys Casual Jacket',
    price: 1950,
    image: product4,
    category: 'Boys',
    badge: 'new' as const,
    rating: 4.7,
  },
];

const tabData = [
  { value: 'popular', label: 'Most Popular', icon: Sparkles, products: popularProducts },
  { value: 'trending', label: 'Trending Now', icon: TrendingUp, products: trendingProducts },
  { value: 'new', label: 'New Arrivals', icon: Clock, products: newArrivals },
];

export const ProductRecommendations = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Recommended For You
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold mb-3"
          >
            Curated Picks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Discover our handpicked selection of top-rated products loved by customers
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="popular" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-background/80 backdrop-blur-sm p-1 shadow-sm">
                {tabData.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 md:px-6 py-2.5"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{label.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabData.map(({ value, products }) => (
              <TabsContent key={value} value={value} className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={`${value}-${product.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Button asChild size="lg" className="group">
            <Link to="/category/women">
              Explore All Products
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
