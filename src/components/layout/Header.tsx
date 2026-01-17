import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Heart, 
  Menu, 
  X,
  ChevronDown,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const categories = [
  { 
    name: 'Men', 
    href: '/category/men',
    subcategories: ['Shirts', 'T-Shirts', 'Pants', 'Jackets', 'Ethnic Wear']
  },
  { 
    name: 'Women', 
    href: '/category/women',
    subcategories: ['Sarees', 'Kurtis', 'Dresses', 'Tops', 'Jeans']
  },
  { 
    name: 'Boys', 
    href: '/category/boys',
    subcategories: ['Casual Wear', 'Party Wear', 'School Uniforms']
  },
  { 
    name: 'Girls', 
    href: '/category/girls',
    subcategories: ['Casual Wear', 'Party Wear', 'Traditional']
  },
  { 
    name: 'Baby', 
    href: '/category/baby',
    subcategories: ['Rompers', 'Sets', 'Accessories']
  },
];

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container-custom text-center text-sm">
          Free Shipping on Orders Over ৳2000 | Use Code: ALAM20 for 20% Off
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
              Alam<span className="text-accent">Fashion</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  to={category.href}
                  className="flex items-center gap-1 py-6 text-sm font-medium link-underline"
                >
                  {category.name}
                  <ChevronDown size={14} className={`transition-transform ${activeCategory === category.name ? 'rotate-180' : ''}`} />
                </Link>
                
                <AnimatePresence>
                  {activeCategory === category.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-48 bg-card shadow-lg rounded-md py-2 border border-border"
                    >
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          to={`${category.href}/${sub.toLowerCase().replace(' ', '-')}`}
                          className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                        >
                          {sub}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link to="/flash-sale" className="py-6 text-sm font-medium text-destructive">
              🔥 Flash Sale
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search */}
            <div className="relative">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <Search size={20} />
              </button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="absolute right-0 top-full mt-2 overflow-hidden"
                  >
                    <Input
                      placeholder="Search products..."
                      className="w-64 shadow-lg"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="hidden sm:block p-2 hover:bg-secondary rounded-full transition-colors">
              <Heart size={20} />
            </Link>

            {/* User */}
            {!loading && (
              user ? (
                <Link to="/profile" className="p-2 hover:bg-secondary rounded-full transition-colors" title="My Account">
                  <User size={20} />
                </Link>
              ) : (
                <Link to="/auth" className="p-2 hover:bg-secondary rounded-full transition-colors" title="Sign In">
                  <LogIn size={20} />
                </Link>
              )
            )}

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="container-custom py-4 space-y-2">
              {categories.map((category) => (
                <div key={category.name}>
                  <Link
                    to={category.href}
                    className="block py-2 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <div className="pl-4 space-y-1">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`${category.href}/${sub.toLowerCase().replace(' ', '-')}`}
                        className="block py-1 text-sm text-muted-foreground"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                to="/flash-sale"
                className="block py-2 font-medium text-destructive"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🔥 Flash Sale
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
