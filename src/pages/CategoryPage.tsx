import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, LayoutGrid, ChevronRight, Home, GitCompare } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductFilters } from '@/components/product/ProductFilters';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { Pagination } from '@/components/product/Pagination';
import { Badge } from '@/components/ui/badge';

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
  men: { title: 'Men\'s Collection', description: 'Refined elegance for the modern gentleman', image: categoryMen, subcategories: ['Shirts', 'T-Shirts', 'Pants', 'Jackets', 'Ethnic Wear'] },
  women: { title: 'Women\'s Collection', description: 'Timeless beauty meets contemporary style', image: categoryWomen, subcategories: ['Sarees', 'Kurtis', 'Dresses', 'Tops', 'Jeans'] },
  boys: { title: 'Boys\' Collection', description: 'Cool and trendy styles for young gentlemen', image: categoryBoys, subcategories: ['Casual Wear', 'Party Wear', 'School Uniforms'] },
  girls: { title: 'Girls\' Collection', description: 'Pretty and playful fashion for little princesses', image: categoryGirls, subcategories: ['Casual Wear', 'Party Wear', 'Traditional'] },
  baby: { title: 'Baby Collection', description: 'Gentle and soft clothing for your little ones', image: categoryBaby, subcategories: ['Rompers', 'Sets', 'Accessories'] },
};

const allProducts = [
  { id: '1', name: 'Terracotta Wrap Maxi Dress', price: 2850, originalPrice: 3500, image: product1, category: 'Women', badge: 'trending' as const, bulkOffer: 'Buy 2, Get 10% Off' },
  { id: '2', name: 'Premium Navy Cotton Shirt', price: 1450, image: product2, category: 'Men', badge: 'new' as const },
  { id: '3', name: 'Soft Pink Baby Romper Set', price: 850, originalPrice: 1100, image: product3, category: 'Baby', badge: 'sale' as const, bulkOffer: 'Family Pack Available' },
  { id: '4', name: 'Khaki Boys Casual Jacket', price: 1950, image: product4, category: 'Boys', badge: 'hot' as const },
  { id: '5', name: 'Royal Red Banarasi Saree', price: 8500, originalPrice: 10000, image: product5, category: 'Women', badge: 'trending' as const },
  { id: '6', name: 'Purple Princess Party Dress', price: 1650, image: product6, category: 'Girls', badge: 'new' as const, bulkOffer: 'Combo: Dress + Accessories' },
  { id: '7', name: 'Premium Slim Fit Denim Jeans', price: 2200, originalPrice: 2800, image: product7, category: 'Men', badge: 'sale' as const },
  { id: '8', name: 'Turquoise Embroidered Kurti', price: 1850, image: product8, category: 'Women' },
];

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);
  const [compareItems, setCompareItems] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof allProducts[0] | null>(null);
  
  const currentCategory = categoryData[category || 'men'] || categoryData.men;
  const products = category ? allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase()) : allProducts;
  const totalPages = Math.ceil((products.length || allProducts.length) / 12);

  const toggleCompare = (productId: string) => {
    setCompareItems(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : prev.length < 4 ? [...prev, productId] : prev
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <nav className="bg-secondary/50 py-3 border-b border-border">
          <div className="container-custom">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground"><Home size={14} /> Home</Link></li>
              <ChevronRight size={14} className="text-muted-foreground" />
              <li className="text-foreground font-medium">{currentCategory.title}</li>
            </ol>
          </div>
        </nav>

        {/* Category Banner */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img src={currentCategory.image} alt={currentCategory.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-charcoal/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-cream mb-2">{currentCategory.title}</h1>
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
                <Button key={sub} variant="ghost" className="text-muted-foreground hover:text-foreground">{sub}</Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar - Desktop */}
              <div className="hidden lg:block">
                <ProductFilters />
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div className="flex items-center gap-4">
                    <div className="lg:hidden">
                      <ProductFilters isMobile />
                    </div>
                    <span className="text-sm text-muted-foreground">{(products.length > 0 ? products : allProducts).length} products</span>
                    {compareItems.length > 0 && (
                      <Button variant="outline" size="sm">
                        <GitCompare size={14} className="mr-1" /> Compare ({compareItems.length})
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-1">
                      <button onClick={() => setGridCols(3)} className={`p-2 rounded ${gridCols === 3 ? 'bg-secondary' : ''}`}><Grid3X3 size={18} /></button>
                      <button onClick={() => setGridCols(4)} className={`p-2 rounded ${gridCols === 4 ? 'bg-secondary' : ''}`}><LayoutGrid size={18} /></button>
                    </div>
                    <Select defaultValue="featured">
                      <SelectTrigger className="w-40"><SelectValue placeholder="Sort by" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Products */}
                <div className={`grid grid-cols-2 md:grid-cols-3 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 md:gap-6`}>
                  {(products.length > 0 ? products : allProducts).map((product, index) => (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="relative">
                      {product.bulkOffer && (
                        <Badge className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-xs">{product.bulkOffer}</Badge>
                      )}
                      <ProductCard {...product} />
                      <div className="absolute bottom-20 left-4 right-4 flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity">
                        <label className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs cursor-pointer">
                          <Checkbox checked={compareItems.includes(product.id)} onCheckedChange={() => toggleCompare(product.id)} />
                          Compare
                        </label>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  showLoadMore={useInfiniteScroll}
                  onLoadMore={() => setCurrentPage(prev => prev + 1)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {quickViewProduct && (
        <QuickViewModal isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
      )}
    </div>
  );
};

export default CategoryPage;
