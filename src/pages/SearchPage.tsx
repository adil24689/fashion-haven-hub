import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal, Grid, List, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/ui/ProductCard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import product1 from "@/assets/products/product-1.jpg";
import product2 from "@/assets/products/product-2.jpg";
import product3 from "@/assets/products/product-3.jpg";
import product4 from "@/assets/products/product-4.jpg";
import product5 from "@/assets/products/product-5.jpg";
import product6 from "@/assets/products/product-6.jpg";
import product7 from "@/assets/products/product-7.jpg";
import product8 from "@/assets/products/product-8.jpg";

const allProducts = [
  { id: "1", name: "Premium Cotton Shirt", price: 2499, originalPrice: 3499, image: product1, category: "Men", badge: "trending" as const, rating: 4.8, colors: ["White", "Blue"], sizes: ["S", "M", "L", "XL"] },
  { id: "2", name: "Elegant Silk Saree", price: 4999, originalPrice: 6999, image: product2, category: "Women", badge: "hot" as const, rating: 4.9, colors: ["Red", "Gold"], sizes: ["Free Size"] },
  { id: "3", name: "Kids Party Dress", price: 1299, originalPrice: 1799, image: product3, category: "Girls", badge: "new" as const, rating: 4.7, colors: ["Pink", "Purple"], sizes: ["4-5Y", "6-7Y", "8-9Y"] },
  { id: "4", name: "Baby Romper Set", price: 899, originalPrice: 1299, image: product4, category: "Baby", rating: 4.6, colors: ["Yellow", "Green"], sizes: ["0-6M", "6-12M", "12-18M"] },
  { id: "5", name: "Designer Kurti", price: 1899, originalPrice: 2599, image: product5, category: "Women", badge: "trending" as const, rating: 4.8, colors: ["Navy", "Maroon"], sizes: ["S", "M", "L"] },
  { id: "6", name: "Boys Casual Shirt", price: 999, originalPrice: 1499, image: product6, category: "Boys", rating: 4.5, colors: ["Blue", "Green"], sizes: ["6-7Y", "8-9Y", "10-11Y"] },
  { id: "7", name: "Formal Blazer", price: 5999, originalPrice: 7999, image: product7, category: "Men", badge: "hot" as const, rating: 4.9, colors: ["Black", "Navy"], sizes: ["M", "L", "XL"] },
  { id: "8", name: "Ethnic Kurta Set", price: 2999, originalPrice: 4499, image: product8, category: "Men", badge: "sale" as const, rating: 4.7, colors: ["White", "Cream"], sizes: ["M", "L", "XL", "XXL"] },
  { id: "9", name: "Cotton Summer Dress", price: 1599, originalPrice: 2199, image: product1, category: "Women", rating: 4.6, colors: ["White", "Yellow"], sizes: ["S", "M", "L"] },
  { id: "10", name: "Boys Denim Jeans", price: 1299, originalPrice: 1799, image: product2, category: "Boys", badge: "new" as const, rating: 4.5, colors: ["Blue", "Black"], sizes: ["6-7Y", "8-9Y", "10-11Y"] },
  { id: "11", name: "Girls School Uniform", price: 899, originalPrice: 1199, image: product3, category: "Girls", rating: 4.4, colors: ["White", "Navy"], sizes: ["4-5Y", "6-7Y", "8-9Y"] },
  { id: "12", name: "Baby Winter Jacket", price: 1499, originalPrice: 2199, image: product4, category: "Baby", badge: "trending" as const, rating: 4.8, colors: ["Pink", "Blue"], sizes: ["0-6M", "6-12M", "12-18M"] },
];

const categories = ["All", "Men", "Women", "Boys", "Girls", "Baby"];
const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest First" },
];

const popularSearches = [
  "Summer Collection",
  "Cotton Shirts",
  "Saree",
  "Kids Wear",
  "Formal Wear",
  "Party Dress",
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, 300);

    if (searchQuery !== debouncedQuery) {
      setIsSearching(true);
    }

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update URL params
  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  // Generate suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      const productSuggestions = allProducts
        .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((p) => p.name)
        .slice(0, 5);
      setSuggestions(productSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      const matchesSearch = debouncedQuery === "" ||
        product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return result;
  }, [debouncedQuery, selectedCategories, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    if (category === "All") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setSortBy("relevance");
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={category === "All" ? selectedCategories.length === 0 : selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category} className="cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000}
            step={100}
            className="mb-3"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>৳{priceRange[0].toLocaleString()}</span>
            <span>৳{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search Header */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-12 pr-12 h-14 text-lg rounded-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              {isSearching && (
                <Loader2 className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin" />
              )}

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-3 transition-colors"
                      >
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Popular Searches */}
            {!debouncedQuery && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-muted-foreground">Popular:</span>
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-4 bg-card rounded-xl border border-border p-6">
              <h2 className="font-display font-semibold text-lg mb-4">Filters</h2>
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                {debouncedQuery && (
                  <p className="text-muted-foreground">
                    {filteredProducts.length} results for "<span className="text-foreground font-medium">{debouncedQuery}</span>"
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2">
                      <SlidersHorizontal className="w-4 h-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"} rounded-l-lg transition-colors`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"} rounded-r-lg transition-colors`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-display font-semibold mb-2">No products found</h2>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </motion.div>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                {filteredProducts.map((product, index) => (
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
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
