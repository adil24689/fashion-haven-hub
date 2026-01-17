import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import categoryMen from '@/assets/category-men.jpg';
import categoryWomen from '@/assets/category-women.jpg';
import categoryBoys from '@/assets/category-boys.jpg';
import categoryGirls from '@/assets/category-girls.jpg';
import categoryBaby from '@/assets/category-baby.jpg';

const categories = [
  { name: 'Men', href: '/category/men', image: categoryMen, description: 'Refined Elegance' },
  { name: 'Women', href: '/category/women', image: categoryWomen, description: 'Timeless Beauty' },
  { name: 'Boys', href: '/category/boys', image: categoryBoys, description: 'Cool & Trendy' },
  { name: 'Girls', href: '/category/girls', image: categoryGirls, description: 'Pretty & Playful' },
  { name: 'Baby', href: '/category/baby', image: categoryBaby, description: 'Gentle & Soft' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const CategoryGrid = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold mb-4"
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            Fashion for every member of your family, crafted with care and style.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <Link
                to={category.href}
                className="group block relative overflow-hidden rounded-lg aspect-[3/4] card-hover"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="text-cream/80 text-xs md:text-sm mb-1">{category.description}</p>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-cream flex items-center gap-2">
                    {category.name}
                    <ArrowRight 
                      size={18} 
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" 
                    />
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
