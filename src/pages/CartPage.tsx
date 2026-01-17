import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import product1 from '@/assets/products/product-1.jpg';
import product2 from '@/assets/products/product-2.jpg';
import product3 from '@/assets/products/product-3.jpg';

const initialCartItems = [
  { id: '1', name: 'Terracotta Wrap Maxi Dress', price: 2850, size: 'M', color: 'Terracotta', quantity: 1, image: product1 },
  { id: '2', name: 'Premium Navy Cotton Shirt', price: 1450, size: 'L', color: 'Navy', quantity: 2, image: product2 },
  { id: '3', name: 'Soft Pink Baby Romper Set', price: 850, size: '6-12M', color: 'Pink', quantity: 1, image: product3 },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 2000 ? 0 : 100;
  const discount = 0; // Could be applied via coupon
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl font-bold mb-8"
          >
            Shopping Cart
          </motion.h1>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <ShoppingBag className="mx-auto mb-4 text-muted-foreground" size={64} />
              <h2 className="font-display text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-lg p-4 md:p-6 shadow-sm border border-border flex gap-4"
                  >
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-32 md:w-32 md:h-40 object-cover rounded-md"
                      />
                    </Link>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <Link to={`/product/${item.id}`}>
                              <h3 className="font-medium hover:text-accent transition-colors">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">
                              Size: {item.size} | Color: {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        <div className="flex items-center border border-border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <p className="font-semibold text-lg">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-lg p-6 shadow-sm border border-border sticky top-24"
                >
                  <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>

                  {/* Coupon Code */}
                  <div className="flex gap-2 mb-6">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline">Apply</Button>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 text-sm border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>৳{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? 'text-green-600' : ''}>
                        {shipping === 0 ? 'Free' : `৳${shipping}`}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-৳{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-lg pt-3 border-t border-border">
                      <span>Total</span>
                      <span>৳{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Free Shipping Notice */}
                  {shipping > 0 && (
                    <div className="mt-4 p-3 bg-secondary rounded-md flex items-center gap-2 text-sm">
                      <Truck size={18} className="text-accent" />
                      <span>Add ৳{(2000 - subtotal).toLocaleString()} more for free shipping!</span>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <Button asChild className="w-full mt-6 btn-primary group" size="lg">
                    <Link to="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Link>
                  </Button>

                  <Button asChild variant="ghost" className="w-full mt-2" size="sm">
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
