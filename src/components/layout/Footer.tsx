import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/20">
        <div className="container-custom py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl mb-3">
              Join the AlamFashion Family
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Subscribe to get exclusive offers, style tips, and new arrivals straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 flex-1"
              />
              <Button className="btn-accent whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h2 className="font-display text-2xl font-bold mb-4">
              Alam<span className="text-accent">Fashion</span>
            </h2>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Your trusted destination for premium fashion for the whole family.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/category/men" className="hover:text-accent transition-colors">Men</Link></li>
              <li><Link to="/category/women" className="hover:text-accent transition-colors">Women</Link></li>
              <li><Link to="/category/boys" className="hover:text-accent transition-colors">Boys</Link></li>
              <li><Link to="/category/girls" className="hover:text-accent transition-colors">Girls</Link></li>
              <li><Link to="/category/baby" className="hover:text-accent transition-colors">Baby</Link></li>
              <li><Link to="/flash-sale" className="hover:text-accent transition-colors">Flash Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link to="/track-order" className="hover:text-accent transition-colors">Track Order</Link></li>
              <li><Link to="/returns" className="hover:text-accent transition-colors">Returns & Exchange</Link></li>
              <li><Link to="/size-guide" className="hover:text-accent transition-colors">Size Guide</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Fashion Blog</Link></li>
              <li><Link to="/stores" className="hover:text-accent transition-colors">Store Locator</Link></li>
              <li><Link to="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>123 Fashion Street, Dhaka 1205, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <span>hello@alamfashion.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© 2026 AlamFashion. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link>
              <Link to="/refund-policy" className="hover:text-accent transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
