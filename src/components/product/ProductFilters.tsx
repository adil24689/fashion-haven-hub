import { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface FilterState {
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  brands: string[];
  discount: string[];
  availability: string[];
}

interface ProductFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  className?: string;
  isMobile?: boolean;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2Y', '3Y', '4Y', '5Y', '6Y'];
const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Navy', value: '#1e3a5f' },
];
const brands = ['FashionHub', 'TrendyWear', 'KidStyle', 'BabyComfort', 'ElegantWear'];
const discountOptions = ['10% or more', '20% or more', '30% or more', '50% or more'];

export const ProductFilters = ({ onFilterChange, className, isMobile = false }: ProductFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 15000],
    sizes: [],
    colors: [],
    brands: [],
    discount: [],
    availability: [],
  });
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    size: true,
    color: true,
    brand: false,
    discount: false,
    availability: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 15000],
      sizes: [],
      colors: [],
      brands: [],
      discount: [],
      availability: [],
    });
  };

  const activeFiltersCount = 
    filters.sizes.length + 
    filters.colors.length + 
    filters.brands.length + 
    filters.discount.length + 
    filters.availability.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 15000 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <SlidersHorizontal size={18} />
          Filters
        </h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full font-medium mb-3"
        >
          <span>Price Range</span>
          {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
              min={0}
              max={15000}
              step={100}
              className="mt-2"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>৳{filters.priceRange[0].toLocaleString()}</span>
              <span>৳{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div>
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full font-medium mb-3"
        >
          <span>Size</span>
          {expandedSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.size && (
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleFilter('sizes', size)}
                className={cn(
                  'min-w-[2.5rem] h-10 px-2 border rounded text-sm transition-colors',
                  filters.sizes.includes(size)
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border hover:border-accent'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div>
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full font-medium mb-3"
        >
          <span>Color</span>
          {expandedSections.color ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.color && (
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleFilter('colors', color.name)}
                className={cn(
                  'w-8 h-8 rounded-full border-2 transition-all',
                  filters.colors.includes(color.name)
                    ? 'border-foreground scale-110 ring-2 ring-accent ring-offset-2'
                    : 'border-border hover:scale-105'
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div>
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full font-medium mb-3"
        >
          <span>Brand</span>
          {expandedSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.brand && (
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => toggleFilter('brands', brand)}
                />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Discount Filter */}
      <div>
        <button
          onClick={() => toggleSection('discount')}
          className="flex items-center justify-between w-full font-medium mb-3"
        >
          <span>Discount</span>
          {expandedSections.discount ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.discount && (
          <div className="space-y-2">
            {discountOptions.map((discount) => (
              <label key={discount} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.discount.includes(discount)}
                  onCheckedChange={() => toggleFilter('discount', discount)}
                />
                <span className="text-sm">{discount}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div>
        <button
          onClick={() => toggleSection('availability')}
          className="flex items-center justify-between w-full font-medium mb-3"
        >
          <span>Availability</span>
          {expandedSections.availability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.availability && (
          <div className="space-y-2">
            {['In Stock', 'Out of Stock', 'Coming Soon'].map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.availability.includes(option)}
                  onCheckedChange={() => toggleFilter('availability', option)}
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <SlidersHorizontal size={16} className="mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filter Products</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className={cn('w-64 flex-shrink-0', className)}>
      <div className="sticky top-24">
        <FilterContent />
      </div>
    </aside>
  );
};
