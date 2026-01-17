import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RotateCcw, Clock, Package, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const policies = [
  {
    icon: Clock,
    title: "Return Window",
    description: "Items can be returned within 7 days of delivery for a full refund or exchange.",
  },
  {
    icon: Package,
    title: "Original Condition",
    description: "Products must be unworn, unwashed, with original tags attached.",
  },
  {
    icon: RotateCcw,
    title: "Easy Exchange",
    description: "Exchange for different size or color at no extra cost.",
  },
];

const ReturnPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        {/* Hero */}
        <section className="bg-charcoal text-white py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl font-bold mb-4"
            >
              Return & Refund Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-cream/80 max-w-2xl mx-auto"
            >
              We want you to be completely satisfied with your purchase. Here's everything you need to know about returns and refunds.
            </motion.p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-4xl">
          {/* Quick Overview */}
          <section className="grid sm:grid-cols-3 gap-6 mb-12">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-cream/30 rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <policy.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{policy.title}</h3>
                <p className="text-sm text-muted-foreground">{policy.description}</p>
              </motion.div>
            ))}
          </section>

          {/* Detailed Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            <section className="mb-10">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Eligible for Return
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>Items purchased within the last 7 days</li>
                <li>Products in original, unused condition with tags attached</li>
                <li>Items in original packaging</li>
                <li>Defective or damaged products (report within 24 hours of delivery)</li>
                <li>Wrong item received</li>
                <li>Size or fit issues</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-600" />
                Not Eligible for Return
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                <li>Intimate wear and undergarments</li>
                <li>Swimwear</li>
                <li>Customized or personalized items</li>
                <li>Items with removed tags or signs of wear</li>
                <li>Products with makeup, perfume, or deodorant stains</li>
                <li>Items purchased more than 7 days ago</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                How to Initiate a Return
              </h2>
              <ol className="space-y-4 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Step 1:</strong> Log in to your AlamFashion account and go to "My Orders"
                </li>
                <li>
                  <strong className="text-foreground">Step 2:</strong> Select the order containing the item you wish to return
                </li>
                <li>
                  <strong className="text-foreground">Step 3:</strong> Click "Request Return" and select the reason for return
                </li>
                <li>
                  <strong className="text-foreground">Step 4:</strong> Choose between refund or exchange
                </li>
                <li>
                  <strong className="text-foreground">Step 5:</strong> Schedule a pickup or drop off at our store
                </li>
              </ol>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Refund Process
              </h2>
              <div className="bg-cream/30 rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  Once we receive and inspect your return, we will process your refund within 5-7 business days.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Original Payment Method:</strong> Refund credited within 5-7 business days</li>
                  <li><strong>Store Credit:</strong> Instantly available for use</li>
                  <li><strong>Bank Transfer:</strong> 7-10 business days</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Exchange Policy
              </h2>
              <p className="text-muted-foreground mb-4">
                We offer free exchanges for different sizes or colors of the same product, subject to availability.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>Exchanges are processed within 3-5 business days after receiving the original item</li>
                <li>If the desired size/color is unavailable, you may choose a refund or store credit</li>
                <li>Price differences for exchanges to different products will be charged or refunded accordingly</li>
              </ul>
            </section>

            <section className="mb-10 bg-gold/10 rounded-lg p-6 border border-gold/30">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-gold" />
                Special Conditions for Baby Products
              </h2>
              <p className="text-muted-foreground">
                For the safety and hygiene of our little customers, baby products have special return conditions:
              </p>
              <ul className="space-y-2 text-muted-foreground mt-4">
                <li>Sealed/packaged items only – packaging must be unopened</li>
                <li>Report any defects within 24 hours with photos</li>
                <li>Defective items will be replaced immediately</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground">
                For any questions about returns or refunds, please contact our customer service:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li><strong>Email:</strong> returns@alamfashion.com</li>
                <li><strong>Phone:</strong> +880 1234-567890</li>
                <li><strong>Hours:</strong> Saturday - Thursday, 10AM - 6PM</li>
              </ul>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnPolicyPage;
