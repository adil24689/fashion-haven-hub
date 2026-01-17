import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutGrid, ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

import categoryMen from '@/assets/category-men.jpg';
import categoryWomen from '@/assets/category-women.jpg';
import categoryBoys from '@/assets/category-boys.jpg';
import categoryGirls from '@/assets/category-girls.jpg';
import categoryBaby from '@/assets/category-baby.jpg';

import product1 from '@/assets/products/product-1.jpg';
import product2 from '@/assets/products/product-2.jpg';
import product3 from '@/assets/products/product-3.jpg';
import product4 from '@/assets/products/product-4.jpg';
import product5 from '@/assets/products/product-5.jpg';
import product6 from '@/assets/products/product-6.jpg';
import product7 from '@/assets/products/product-7.jpg';
import product8 from '@/assets/products/product-8.jpg';

const categoryData: Record<string, { title: string; description: string; image: string; subcategories: string[] }> = {
  men: {
    title: 'Men\'s Collection',
    description: 'Refined elegance for the modern gentleman',
    image: categoryMen,
    subcategories: ['Shirts', 'T-Shirts', 'Pants', 'Jackets', 'Ethnic Wear'],
  },
  women: {
    title: 'Women\'s Collection',
    description: 'Timeless beauty meets contemporary style',
    image: categoryWomen,
    subcategories: ['Sarees', 'Kurtis', 'Dresses', 'Tops', 'Jeans'],
  },
  boys: {
    title: 'Boys\' Collection',
    description: 'Cool and trendy styles for young gentlemen',
    image: categoryBoys,
    subcategories: ['Casual Wear', 'Party Wear', 'School Uniforms'],
  },
  girls: {
    title: 'Girls\' Collection',
    description: 'Pretty and playful fashion for little princesses',
    image: categoryGirls,
    subcategories: ['Casual Wear', 'Party Wear', 'Traditional'],
  },
  baby: {
    title: 'Baby Collection',
    description: 'Gentle and soft clothing for your little ones',
    image: categoryBaby,
    subcategories: ['Rompers', 'Sets', 'Accessories'],
  },
};

const allProducts = [
  { id: '1', name: 'Terracotta Wrap Maxi Dress', price: 2850, originalPrice: 3500, image: product1, category: 'Women', badge: 'trending' as const },
  { id: '2', name: 'Premium Navy Cotton Shirt', price: 1450, image: product2, category: 'Men', badge: 'new' as const },
  { id: '3', name: 'Soft Pink Baby Romper Set', price: 850, originalPrice: 1100, image: product3, category: 'Baby', badge: 'sale' as const },
  { id: '4', name: 'Khaki Boys Casual Jacket', price: 1950, image: product4, category: 'Boys', badge: 'hot' as const },
  { id: '5', name: 'Royal Red Banarasi Saree', price: 8500, originalPrice: 10000, image: product5, category: 'Women', badge: 'trending' as const },
  { id: '6', name: 'Purple Princess Party Dress', price: 1650, image: product6, category: 'Girls', badge: 'new' as const },
  { id: '7', name: 'Premium Slim Fit Denim Jeans', price: 2200, originalPrice: 2800, image: product7, category: 'Men', badge: 'sale' as const },
  { id: '8', name: 'Turquoise Embroidered Kurti', price: 1850, image: product8, category: 'Women' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink'];

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  
  const currentCategory = categoryData[category || 'men'] || categoryData.men;
  
  // Filter products based on category
  const products = category 
    ? allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase())
    : allProducts;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Category Banner */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={currentCategory.image}
            alt={currentCategory.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-charcoal/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-display text-3xl md:text-5xl font-bold text-cream mb-2">
                  {currentCategory.title}
                </h1>
                <p className="text-cream/80 text-lg">{currentCategory.description}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Subcategories */}
        <section className="bg-secondary py-4 border-b border-border">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2 md:gap-4">
              <Button variant="ghost" className="font-medium">All</Button>
              {currentCategory.subcategories.map((sub) => (
                <Button key={sub} variant="ghost" className="text-muted-foreground hover:text-foreground">
                  {sub}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar - Desktop */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <SlidersHorizontal size={18} />
                      Filters
                    </h3>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {['Under ৳1000', '৳1000 - ৳2500', '৳2500 - ৳5000', 'Over ৳5000'].map((range) => (
                        <label key={range} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox />
                          <span className="text-sm">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Size Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Size</h4>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          className="w-10 h-10 border border-border rounded text-sm hover:border-accent hover:text-accent transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Color</h4>
                    <div className="space-y-2">
                      {colors.map((color) => (
                        <label key={color} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox />
                          <span className="text-sm">{color}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden"
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                      <SlidersHorizontal size={16} className="mr-2" />
                      Filters
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {products.length} products
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-1">
                      <button
                        onClick={() => setGridCols(3)}
                        className={`p-2 rounded ${gridCols === 3 ? 'bg-secondary' : ''}`}
                      >
                        <Grid3X3 size={18} />
                      </button>
                      <button
                        onClick={() => setGridCols(4)}
                        className={`p-2 rounded ${gridCols === 4 ? 'bg-secondary' : ''}`}
                      >
                        <LayoutGrid size={18} />
                      </button>
                    </div>

                    <Select defaultValue="featured">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Products */}
                <div className={`grid grid-cols-2 md:grid-cols-3 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 md:gap-6`}>
                  {(products.length > 0 ? products : allProducts).map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg">
                    Load More Products
                    <ChevronDown className="ml-2" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
