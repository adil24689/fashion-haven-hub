import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, LayoutGrid, ChevronRight, Home, GitCompare, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductFilters, FilterState, getDefaultFilters } from '@/components/product/ProductFilters';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { Pagination } from '@/components/product/Pagination';
import { Badge } from '@/components/ui/badge';
import { useProductFiltering, SortOption, Product } from '@/hooks/useProductFiltering';

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

const colorMap: Record<string, string> = {
  'Black': '#000000',
  'White': '#FFFFFF',
  'Red': '#EF4444',
  'Blue': '#3B82F6',
  'Green': '#22C55E',
  'Yellow': '#EAB308',
  'Pink': '#EC4899',
  'Navy': '#1e3a5f',
};

const toProductColors = (names: string[]) => names.map(name => ({ name, value: colorMap[name] || '#888888' }));

const allProducts: Product[] = [
  { id: '1', name: 'Terracotta Wrap Maxi Dress', price: 2850, originalPrice: 3500, image: product1, category: 'Women', badge: 'trending', bulkOffer: 'Buy 2, Get 10% Off', rating: 4.8, colors: toProductColors(['Red', 'Pink']), sizes: ['S', 'M', 'L'], brand: 'ElegantWear' },
  { id: '2', name: 'Premium Navy Cotton Shirt', price: 1450, image: product2, category: 'Men', badge: 'new', rating: 4.6, colors: toProductColors(['Navy', 'Blue', 'White']), sizes: ['M', 'L', 'XL'], brand: 'FashionHub' },
  { id: '3', name: 'Soft Pink Baby Romper Set', price: 850, originalPrice: 1100, image: product3, category: 'Baby', badge: 'sale', bulkOffer: 'Family Pack Available', rating: 4.9, colors: toProductColors(['Pink', 'White']), sizes: ['2Y', '3Y'], brand: 'BabyComfort' },
  { id: '4', name: 'Khaki Boys Casual Jacket', price: 1950, image: product4, category: 'Boys', badge: 'hot', rating: 4.7, colors: toProductColors(['Green', 'Blue']), sizes: ['4Y', '5Y', '6Y'], brand: 'KidStyle' },
  { id: '5', name: 'Royal Red Banarasi Saree', price: 8500, originalPrice: 10000, image: product5, category: 'Women', badge: 'trending', rating: 4.9, colors: toProductColors(['Red']), sizes: ['S', 'M', 'L'], brand: 'ElegantWear' },
  { id: '6', name: 'Purple Princess Party Dress', price: 1650, image: product6, category: 'Girls', badge: 'new', bulkOffer: 'Combo: Dress + Accessories', rating: 4.8, colors: toProductColors(['Pink', 'Yellow']), sizes: ['3Y', '4Y', '5Y'], brand: 'KidStyle' },
  { id: '7', name: 'Premium Slim Fit Denim Jeans', price: 2200, originalPrice: 2800, image: product7, category: 'Men', badge: 'sale', rating: 4.5, colors: toProductColors(['Blue', 'Black']), sizes: ['M', 'L', 'XL', 'XXL'], brand: 'TrendyWear' },
  { id: '8', name: 'Turquoise Embroidered Kurti', price: 1850, image: product8, category: 'Women', rating: 4.7, colors: toProductColors(['Blue', 'Green']), sizes: ['S', 'M', 'L', 'XL'], brand: 'TrendyWear' },
];

const ITEMS_PER_PAGE = 12;

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);
  const [compareItems, setCompareItems] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>(getDefaultFilters());
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  
  const currentCategory = categoryData[category || 'men'] || categoryData.men;
  
  const { filteredProducts, totalCount } = useProductFiltering({
    products: allProducts,
    filters,
    sortBy,
    category,
  });

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
    setCurrentPage(1);
  };

  const toggleCompare = (productId: string) => {
    setCompareItems(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : prev.length < 4 ? [...prev, productId] : prev
    );
  };

  // Calculate active filter count for display
  const activeFilterCount = 
    filters.sizes.length + 
    filters.colors.length + 
    filters.brands.length + 
    filters.discount.length + 
    filters.availability.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 15000 ? 1 : 0);

  // Get active filter tags for display
  const activeFilterTags = useMemo(() => {
    const tags: { key: string; label: string; onRemove: () => void }[] = [];
    
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 15000) {
      tags.push({
        key: 'price',
        label: `৳${filters.priceRange[0].toLocaleString()} - ৳${filters.priceRange[1].toLocaleString()}`,
        onRemove: () => handleFilterChange({ ...filters, priceRange: [0, 15000] }),
      });
    }
    
    filters.sizes.forEach(size => {
      tags.push({
        key: `size-${size}`,
        label: `Size: ${size}`,
        onRemove: () => handleFilterChange({ ...filters, sizes: filters.sizes.filter(s => s !== size) }),
      });
    });
    
    filters.colors.forEach(color => {
      tags.push({
        key: `color-${color}`,
        label: color,
        onRemove: () => handleFilterChange({ ...filters, colors: filters.colors.filter(c => c !== color) }),
      });
    });
    
    filters.brands.forEach(brand => {
      tags.push({
        key: `brand-${brand}`,
        label: brand,
        onRemove: () => handleFilterChange({ ...filters, brands: filters.brands.filter(b => b !== brand) }),
      });
    });
    
    filters.discount.forEach(discount => {
      tags.push({
        key: `discount-${discount}`,
        label: discount,
        onRemove: () => handleFilterChange({ ...filters, discount: filters.discount.filter(d => d !== discount) }),
      });
    });
    
    return tags;
  }, [filters]);

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
                <ProductFilters 
                  filters={filters} 
                  onFilterChange={handleFilterChange} 
                />
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div className="flex items-center gap-4">
                    <div className="lg:hidden">
                      <ProductFilters 
                        filters={filters} 
                        onFilterChange={handleFilterChange} 
                        isMobile 
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {totalCount} product{totalCount !== 1 ? 's' : ''}
                      {activeFilterCount > 0 && ` (filtered)`}
                    </span>
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
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Top Rated</SelectItem>
                        <SelectItem value="name-asc">Name: A to Z</SelectItem>
                        <SelectItem value="name-desc">Name: Z to A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filter Tags */}
                <AnimatePresence>
                  {activeFilterTags.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-wrap gap-2 mb-6"
                    >
                      {activeFilterTags.map(tag => (
                        <motion.div
                          key={tag.key}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <Badge 
                            variant="secondary" 
                            className="pl-3 pr-1 py-1.5 gap-1 cursor-pointer hover:bg-secondary/80"
                            onClick={tag.onRemove}
                          >
                            {tag.label}
                            <X size={14} className="ml-1" />
                          </Badge>
                        </motion.div>
                      ))}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => handleFilterChange(getDefaultFilters())}
                      >
                        Clear all
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Products */}
                {paginatedProducts.length > 0 ? (
                  <div className={`grid grid-cols-2 md:grid-cols-3 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 md:gap-6`}>
                    {paginatedProducts.map((product, index) => (
                      <motion.div 
                        key={product.id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: index * 0.05 }} 
                        className="relative"
                      >
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
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                      <Grid3X3 className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button variant="outline" onClick={() => handleFilterChange(getDefaultFilters())}>
                      Clear Filters
                    </Button>
                  </motion.div>
                )}

                {/* Pagination */}
                {paginatedProducts.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    showLoadMore={useInfiniteScroll}
                    onLoadMore={() => setCurrentPage(prev => prev + 1)}
                  />
                )}
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
