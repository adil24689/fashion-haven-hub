import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingBag, CreditCard, Truck, RotateCcw, HelpCircle } from "lucide-react";

const faqCategories = [
  {
    id: "orders",
    icon: ShoppingBag,
    title: "Orders",
    questions: [
      {
        q: "How do I place an order?",
        a: "Simply browse our collection, select the items you love, choose your size and color, and add them to your cart. When you're ready, proceed to checkout, enter your shipping details, and complete the payment. You'll receive an order confirmation via email and SMS.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "You can modify or cancel your order within 1 hour of placing it. After that, the order goes into processing and cannot be changed. Please contact our customer support immediately if you need to make changes.",
      },
      {
        q: "How do I track my order?",
        a: "Once your order is shipped, you'll receive a tracking number via SMS and email. You can also track your order by logging into your account and visiting the 'My Orders' section, or use the 'Track Order' feature on our website.",
      },
      {
        q: "What if I receive a damaged or wrong item?",
        a: "We apologize for any inconvenience! Please report the issue within 24 hours of delivery with photos. We'll arrange a free pickup and send you the correct item or process a full refund.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Yes! We offer premium gift wrapping for ৳50 per item. You can select this option during checkout. We can also include a personalized gift message.",
      },
    ],
  },
  {
    id: "payment",
    icon: CreditCard,
    title: "Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept multiple payment options including: Cash on Delivery (COD), bKash, Nagad, Rocket, Credit/Debit Cards (Visa, Mastercard, American Express), and Bank Transfer.",
      },
      {
        q: "Is it safe to pay online on your website?",
        a: "Absolutely! Our website uses SSL encryption and we partner with trusted payment gateways. We never store your complete card details on our servers. Your payment information is processed securely.",
      },
      {
        q: "Can I pay in installments?",
        a: "Yes, we offer EMI options on orders above ৳5,000 for select bank cards. You can choose 3, 6, or 12-month EMI plans during checkout. EMI charges may apply based on your bank's terms.",
      },
      {
        q: "When will I be charged for my order?",
        a: "For online payments, you'll be charged immediately upon placing the order. For COD orders, you pay when you receive your package.",
      },
      {
        q: "What if my payment fails?",
        a: "If your payment fails, please try again after a few minutes. Ensure your card has sufficient balance and is enabled for online transactions. If the issue persists, try a different payment method or contact your bank.",
      },
    ],
  },
  {
    id: "shipping",
    icon: Truck,
    title: "Shipping",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Delivery times vary by location: Dhaka city (1-2 business days), Other districts (3-5 business days), Remote areas (5-7 business days). Express delivery is available for Dhaka at an additional charge.",
      },
      {
        q: "How much does shipping cost?",
        a: "Shipping is FREE for orders above ৳2,000. For orders below ৳2,000: Dhaka (৳60), Outside Dhaka (৳120). Express delivery within Dhaka costs ৳150.",
      },
      {
        q: "Do you deliver outside Bangladesh?",
        a: "Currently, we only deliver within Bangladesh. We're working on international shipping and will announce when it's available. Subscribe to our newsletter to stay updated!",
      },
      {
        q: "Can I change my delivery address?",
        a: "You can change the delivery address before your order is shipped. Once shipped, address changes aren't possible. Contact customer support immediately if you need to modify your address.",
      },
      {
        q: "What happens if I'm not home during delivery?",
        a: "Our delivery partner will attempt to contact you. If unreachable, they'll try again the next day. After 3 failed attempts, the package will be returned to our warehouse, and we'll contact you for redelivery.",
      },
    ],
  },
  {
    id: "returns",
    icon: RotateCcw,
    title: "Return & Refund",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery. Items must be unworn, unwashed, with original tags attached and in original packaging. Some items like innerwear and customized products are non-returnable.",
      },
      {
        q: "How do I initiate a return?",
        a: "Log into your account, go to 'My Orders', select the order and click 'Request Return'. Choose your reason, select refund or exchange, and schedule a pickup. You can also drop it at our store.",
      },
      {
        q: "How long does the refund process take?",
        a: "Once we receive and inspect your return, refunds are processed within 5-7 business days. The amount will be credited to your original payment method. Bank transfers may take an additional 2-3 days.",
      },
      {
        q: "Can I exchange instead of returning?",
        a: "Yes! We offer free exchanges for different sizes or colors of the same product. If the desired variant is unavailable, you can choose a different product or opt for a refund.",
      },
      {
        q: "Who pays for return shipping?",
        a: "Return shipping is free for defective or wrong items. For other returns (size/fit issues, change of mind), a nominal pickup charge of ৳60 within Dhaka and ৳120 outside Dhaka applies.",
      },
    ],
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        {/* Hero */}
        <section className="bg-charcoal text-white py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <HelpCircle className="w-8 h-8 text-gold" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mb-4"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-cream/80 max-w-2xl mx-auto"
            >
              Find answers to common questions about orders, payments, shipping, and returns.
            </motion.p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-4xl">
          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {faqCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-cream/50 hover:bg-gold/20 rounded-full text-foreground hover:text-gold transition-colors"
              >
                <category.icon className="w-4 h-4" />
                <span className="font-medium">{category.title}</span>
              </a>
            ))}
          </motion.div>

          {/* FAQ Sections */}
          <div className="space-y-12">
            {faqCategories.map((category, catIndex) => (
              <motion.section
                key={category.id}
                id={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {category.title}
                  </h2>
                </div>
                <Accordion type="single" collapsible className="space-y-3">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.id}-${index}`}
                      className="border border-border rounded-lg px-4 bg-background shadow-sm"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground hover:text-gold hover:no-underline py-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.section>
            ))}
          </div>

          {/* Still Need Help */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-charcoal rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-cream/70 mb-6 max-w-xl mx-auto">
              Can't find what you're looking for? Our customer support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-gold text-charcoal font-semibold rounded-lg hover:bg-gold/90 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="tel:+8801234567890"
                className="inline-flex items-center justify-center px-6 py-3 border border-cream/30 text-cream font-semibold rounded-lg hover:bg-cream/10 transition-colors"
              >
                Call: +880 1234-567890
              </a>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
