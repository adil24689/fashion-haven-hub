import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RefreshCw, Shield, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over ৳2000',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '7-day return policy',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: '100% secure checkout',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Dedicated customer care',
  },
];

export const PromoBanner = () => {
  return (
    <section>
      {/* Features Strip */}
      <div className="bg-secondary py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-medium text-sm tracking-wider uppercase mb-4 block">
                Limited Time Offer
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Family Fashion Sale
                <br />
                <span className="text-accent">Up to 40% Off</span>
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-md">
                Dress your entire family in style without breaking the bank. Shop our exclusive family combos and save more!
              </p>
              <Button asChild className="btn-accent group">
                <Link to="/flash-sale">
                  Shop the Sale
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center md:justify-end"
            >
              <div className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-sm text-primary-foreground/70 mb-2">Use Code</p>
                  <div className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold text-2xl mb-4">
                    FAMILY40
                  </div>
                  <p className="text-sm text-primary-foreground/70">Valid till 31st January 2026</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
