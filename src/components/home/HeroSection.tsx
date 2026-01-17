import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBanner from '@/assets/hero-banner.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="AlamFashion Collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-accent font-medium mb-4 tracking-wider uppercase text-sm"
          >
            New Collection 2026
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Elevate Your Style,
            <br />
            <span className="text-accent">Define Your Story</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg mb-8 max-w-md"
          >
            Discover premium fashion for the whole family. Quality craftsmanship meets contemporary design.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="btn-primary group">
              <Link to="/category/women">
                Shop Women
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-outline-primary">
              <Link to="/category/men">
                Shop Men
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden lg:block"
      >
        <div className="bg-card/90 backdrop-blur-sm p-6 rounded-lg shadow-xl max-w-xs">
          <p className="text-sm text-muted-foreground mb-2">Limited Time Offer</p>
          <p className="font-display text-2xl font-bold mb-2">Get 20% Off</p>
          <p className="text-sm">Use code: <span className="font-semibold text-accent">ALAM20</span></p>
        </div>
      </motion.div>
    </section>
  );
};
