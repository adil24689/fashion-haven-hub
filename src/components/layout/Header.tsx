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
  LogIn,
  Trash2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

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
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, loading } = useAuth();
  const { items, itemCount, subtotal, removeItem } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

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
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 z-50"
                  >
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                      <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        className="w-64 shadow-lg bg-card"
                        autoFocus
                      />
                      <Button type="submit" size="icon" className="shadow-lg shrink-0">
                        <Search size={18} />
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="hidden sm:block relative p-2 hover:bg-secondary rounded-full transition-colors">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* User */}
            {!loading && (
              user ? (
                <Link to="/myaccount" className="p-2 hover:bg-secondary rounded-full transition-colors" title="My Account">
                  <User size={20} />
                </Link>
              ) : (
                <Link to="/login" className="p-2 hover:bg-secondary rounded-full transition-colors" title="Sign In">
                  <LogIn size={20} />
                </Link>
              )
            )}

            {/* Cart with Mini Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-colors block">
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
              
              {/* Mini Cart Dropdown */}
              <AnimatePresence>
                {isCartOpen && items.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-card shadow-xl rounded-lg border border-border z-50 overflow-hidden"
                  >
                    {/* Cart Header */}
                    <div className="px-4 py-3 bg-secondary/50 border-b border-border">
                      <h3 className="font-semibold text-sm">Shopping Cart ({itemCount})</h3>
                    </div>
                    
                    {/* Cart Items */}
                    <div className="max-h-72 overflow-y-auto">
                      {items.slice(0, 4).map((item) => (
                        <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3 p-3 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.size} • {item.color}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-sm font-semibold">৳{item.price.toLocaleString()}</span>
                              <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              removeItem(item.id);
                            }}
                            className="p-1 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      {items.length > 4 && (
                        <div className="px-4 py-2 text-center text-xs text-muted-foreground bg-secondary/30">
                          +{items.length - 4} more items in cart
                        </div>
                      )}
                    </div>
                    
                    {/* Cart Footer */}
                    <div className="p-4 bg-secondary/30 border-t border-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Subtotal:</span>
                        <span className="font-semibold">৳{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link to="/cart">
                          <Button variant="outline" size="sm" className="w-full">
                            View Cart
                          </Button>
                        </Link>
                        <Link to="/checkout">
                          <Button size="sm" className="w-full btn-primary">
                            Checkout
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Empty Cart Dropdown */}
              <AnimatePresence>
                {isCartOpen && items.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-card shadow-xl rounded-lg border border-border z-50 p-6 text-center"
                  >
                    <ShoppingBag size={32} className="mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground mb-3">Your cart is empty</p>
                    <Link to="/category/women">
                      <Button size="sm" variant="outline" className="w-full">
                        Start Shopping
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
