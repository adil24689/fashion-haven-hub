import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';

import product1 from '@/assets/products/product-1.jpg';
import product2 from '@/assets/products/product-2.jpg';
import product3 from '@/assets/products/product-3.jpg';
import product4 from '@/assets/products/product-4.jpg';
import product5 from '@/assets/products/product-5.jpg';
import product6 from '@/assets/products/product-6.jpg';
import product7 from '@/assets/products/product-7.jpg';
import product8 from '@/assets/products/product-8.jpg';

const featuredProducts = [
  {
    id: '1',
    name: 'Terracotta Wrap Maxi Dress',
    price: 2850,
    originalPrice: 3500,
    image: product1,
    category: 'Women',
    badge: 'trending' as const,
    rating: 4.8,
  },
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
    id: '4',
    name: 'Khaki Boys Casual Jacket',
    price: 1950,
    image: product4,
    category: 'Boys',
    badge: 'hot' as const,
    rating: 4.7,
  },
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
    id: '6',
    name: 'Purple Princess Party Dress',
    price: 1650,
    image: product6,
    category: 'Girls',
    badge: 'new' as const,
    rating: 4.8,
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
  {
    id: '8',
    name: 'Turquoise Embroidered Kurti',
    price: 1850,
    image: product8,
    category: 'Women',
    rating: 4.7,
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl font-bold mb-3"
            >
              Featured Collection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Handpicked styles for every occasion and every member of your family
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild variant="link" className="group mt-4 md:mt-0">
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
