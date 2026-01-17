import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import product1 from "@/assets/products/product-1.jpg";
import product2 from "@/assets/products/product-2.jpg";
import product3 from "@/assets/products/product-3.jpg";
import product4 from "@/assets/products/product-4.jpg";
import product5 from "@/assets/products/product-5.jpg";
import product6 from "@/assets/products/product-6.jpg";

const blogPosts = [
  {
    id: 1,
    title: "10 Must-Have Summer Fashion Trends for 2024",
    excerpt: "Discover the hottest summer trends that will elevate your wardrobe. From bold prints to sustainable fabrics, here's what you need to know.",
    image: product1,
    category: "Trends",
    author: "Fatima Rahman",
    date: "January 15, 2024",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "How to Style Traditional Sarees for Modern Events",
    excerpt: "Learn the art of styling traditional sarees with contemporary accessories for a perfect blend of classic and modern aesthetics.",
    image: product2,
    category: "Style Tips",
    author: "Anika Chowdhury",
    date: "January 12, 2024",
    readTime: "7 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Kids Fashion: Comfortable Yet Stylish Outfits",
    excerpt: "Dressing your little ones in style doesn't mean compromising on comfort. Here are our top picks for kids' fashion this season.",
    image: product3,
    category: "Kids Fashion",
    author: "Nadia Islam",
    date: "January 10, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 4,
    title: "The Ultimate Guide to Men's Formal Wear",
    excerpt: "From business meetings to wedding ceremonies, master the art of formal dressing with our comprehensive guide.",
    image: product4,
    category: "Men's Fashion",
    author: "Rafiq Ahmed",
    date: "January 8, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Sustainable Fashion: Making Eco-Friendly Choices",
    excerpt: "Explore how you can build a sustainable wardrobe without sacrificing style. Tips for conscious shopping and fabric selection.",
    image: product5,
    category: "Sustainability",
    author: "Mariam Khan",
    date: "January 5, 2024",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Baby Fashion Essentials: A New Parent's Guide",
    excerpt: "Everything you need to know about dressing your newborn. From fabric choices to seasonal considerations.",
    image: product6,
    category: "Baby Care",
    author: "Sabrina Akter",
    date: "January 3, 2024",
    readTime: "5 min read",
    featured: false,
  },
];

const categories = ["All", "Trends", "Style Tips", "Kids Fashion", "Men's Fashion", "Sustainability", "Baby Care"];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Fashion <span className="text-primary">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover the latest trends, style tips, and fashion inspiration from our experts.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && searchQuery === "" && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
                >
                  <div className="md:flex">
                    <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-center">
                      <Badge variant="secondary" className="w-fit mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                <Tag className="w-3 h-3 mr-1" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
            {selectedCategory === "All" ? "All Articles" : selectedCategory}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <p className="font-medium text-foreground">{post.author}</p>
                        <p className="text-muted-foreground text-xs">{post.date}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1 group-hover:text-primary">
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Stay Updated with Fashion Trends
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Subscribe to our newsletter and never miss the latest style tips and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
