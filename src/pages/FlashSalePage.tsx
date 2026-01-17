import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Zap, Clock, Flame } from "lucide-react";

import product1 from "@/assets/products/product-1.jpg";
import product2 from "@/assets/products/product-2.jpg";
import product3 from "@/assets/products/product-3.jpg";
import product4 from "@/assets/products/product-4.jpg";
import product5 from "@/assets/products/product-5.jpg";
import product6 from "@/assets/products/product-6.jpg";
import product7 from "@/assets/products/product-7.jpg";
import product8 from "@/assets/products/product-8.jpg";

const flashSaleProducts = [
  {
    id: "flash-1",
    name: "Premium Silk Saree",
    price: 2499,
    originalPrice: 4999,
    image: product1,
    category: "Women",
    badge: "sale" as const,
    stock: 5,
  },
  {
    id: "flash-2",
    name: "Designer Sherwani",
    price: 3999,
    originalPrice: 7999,
    image: product2,
    category: "Men",
    badge: "sale" as const,
    stock: 3,
  },
  {
    id: "flash-3",
    name: "Kids Party Dress",
    price: 999,
    originalPrice: 1999,
    image: product3,
    category: "Girls",
    badge: "sale" as const,
    stock: 8,
  },
  {
    id: "flash-4",
    name: "Cotton Kurta Set",
    price: 1299,
    originalPrice: 2599,
    image: product4,
    category: "Men",
    badge: "sale" as const,
    stock: 12,
  },
  {
    id: "flash-5",
    name: "Baby Romper Set",
    price: 599,
    originalPrice: 1199,
    image: product5,
    category: "Baby",
    badge: "sale" as const,
    stock: 15,
  },
  {
    id: "flash-6",
    name: "Embroidered Kurti",
    price: 899,
    originalPrice: 1799,
    image: product6,
    category: "Women",
    badge: "sale" as const,
    stock: 7,
  },
  {
    id: "flash-7",
    name: "Boys Formal Suit",
    price: 1499,
    originalPrice: 2999,
    image: product7,
    category: "Boys",
    badge: "sale" as const,
    stock: 4,
  },
  {
    id: "flash-8",
    name: "Designer Lehenga",
    price: 4499,
    originalPrice: 8999,
    image: product8,
    category: "Women",
    badge: "sale" as const,
    stock: 2,
  },
];

const FlashSalePage = () => {
  // Set sale end time to 24 hours from now (resets on page load for demo)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds =
          prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        
        if (totalSeconds <= 0) {
          return { hours: 23, minutes: 59, seconds: 59 }; // Reset for demo
        }

        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-12 md:py-20 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              >
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Limited Time Offer</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              >
                FLASH SALE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl mb-8 text-white/90"
              >
                Up to <span className="font-bold text-yellow-300">50% OFF</span> on Selected Items!
              </motion.p>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center gap-2 md:gap-4"
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-medium">Ends In:</span>
                </div>
                
                <div className="flex gap-2 md:gap-4">
                  {[
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Mins" },
                    { value: timeLeft.seconds, label: "Secs" },
                  ].map((item, index) => (
                    <div key={item.label} className="text-center">
                      <motion.div
                        key={`${item.label}-${item.value}`}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="bg-charcoal text-white w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center shadow-lg"
                      >
                        <span className="font-display text-2xl md:text-4xl font-bold">
                          {formatTime(item.value)}
                        </span>
                      </motion.div>
                      <span className="text-xs md:text-sm mt-1 block text-white/80">
                        {item.label}
                      </span>
                      {index < 2 && (
                        <span className="absolute -right-1 top-1/2 -translate-y-1/2 text-2xl font-bold hidden md:block">
                          :
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative flames */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"
          />
        </section>

        {/* Flash Sale Banner */}
        <section className="bg-charcoal py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 text-white">
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              <span className="text-sm md:text-base font-medium">
                🔥 Hurry! Limited Stock Available - Grab Your Favorites Before They're Gone! 🔥
              </span>
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Today's Hot Deals
              </h2>
              <p className="text-muted-foreground">
                Premium quality at unbeatable prices
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {flashSaleProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <ProductCard {...product} />
                  {/* Stock indicator */}
                  <div className="absolute top-2 left-2 z-10">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        product.stock <= 3
                          ? "bg-red-500 text-white"
                          : product.stock <= 10
                          ? "bg-orange-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {product.stock <= 3
                        ? `Only ${product.stock} left!`
                        : `${product.stock} in stock`}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-cream/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: "🚚", title: "Free Shipping", desc: "On orders ৳2000+" },
                { icon: "🔄", title: "Easy Returns", desc: "7-day return policy" },
                { icon: "💳", title: "Secure Payment", desc: "100% protected" },
                { icon: "🎁", title: "Gift Wrap", desc: "Available on request" },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4"
                >
                  <div className="text-3xl mb-2">{benefit.icon}</div>
                  <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-gold/20 to-gold/10 rounded-2xl p-8 md:p-12 text-center border border-gold/30"
            >
              <Zap className="w-12 h-12 text-gold mx-auto mb-4" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Don't Miss Future Flash Sales!
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Subscribe to our newsletter and be the first to know about exclusive deals and discounts.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <button className="px-6 py-3 bg-gold text-charcoal font-semibold rounded-lg hover:bg-gold/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FlashSalePage;
