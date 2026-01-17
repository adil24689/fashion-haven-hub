import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import product1 from "@/assets/products/product-1.jpg";
import product2 from "@/assets/products/product-2.jpg";
import product3 from "@/assets/products/product-3.jpg";
import product4 from "@/assets/products/product-4.jpg";

const initialWishlistItems = [
  {
    id: 1,
    name: "Premium Cotton Shirt",
    price: 2499,
    originalPrice: 3499,
    image: product1,
    category: "Men",
    size: "M",
    inStock: true,
  },
  {
    id: 2,
    name: "Elegant Silk Saree",
    price: 4999,
    originalPrice: 6999,
    image: product2,
    category: "Women",
    size: "Free Size",
    inStock: true,
  },
  {
    id: 3,
    name: "Kids Party Dress",
    price: 1299,
    originalPrice: 1799,
    image: product3,
    category: "Girls",
    size: "5-6 Years",
    inStock: false,
  },
  {
    id: 4,
    name: "Baby Romper Set",
    price: 899,
    originalPrice: 1299,
    image: product4,
    category: "Baby",
    size: "6-12 Months",
    inStock: true,
  },
];

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const { toast } = useToast();

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const addToCart = (item: typeof initialWishlistItems[0]) => {
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const moveAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock);
    if (inStockItems.length > 0) {
      toast({
        title: "Items Added to Cart",
        description: `${inStockItems.length} items have been added to your cart.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <h1 className="text-3xl md:text-4xl font-display font-bold">My Wishlist</h1>
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {wishlistItems.length} Items
            </span>
          </div>
          {wishlistItems.length > 0 && (
            <Button onClick={moveAllToCart} className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Move All to Cart
            </Button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-display font-semibold mb-3">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Save your favorite items here to buy them later or share with friends.
            </p>
            <Link to="/">
              <Button size="lg" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full text-sm font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="absolute top-3 left-3">
                      <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-primary">৳{item.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        ৳{item.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                    <Button
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                      className="w-full mt-4 gap-2"
                      variant={item.inStock ? "default" : "secondary"}
                    >
                      {item.inStock ? (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </>
                      ) : (
                        <>
                          <Package className="w-4 h-4" />
                          Notify Me
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;
