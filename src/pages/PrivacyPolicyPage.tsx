import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Shield, Eye, Lock, Database, UserCheck, Bell } from "lucide-react";

const highlights = [
  { icon: Shield, title: "Data Protection", desc: "Your data is encrypted and secure" },
  { icon: Eye, title: "Transparency", desc: "Clear about what we collect" },
  { icon: Lock, title: "Your Control", desc: "Manage your privacy settings" },
];

const PrivacyPolicyPage = () => {
  const lastUpdated = "January 15, 2026";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl font-bold mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-primary-foreground/80"
            >
              Last Updated: {lastUpdated}
            </motion.p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-4xl">
          {/* Highlights */}
          <section className="grid sm:grid-cols-3 gap-6 mb-12">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-muted rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </section>

          {/* Policy Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-10"
          >
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-accent" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We collect information you provide directly to us, including:</p>
                <div className="bg-muted rounded-lg p-6">
                  <h4 className="font-semibold text-foreground mb-3">Personal Information</h4>
                  <ul className="space-y-2">
                    <li>• Name, email address, and phone number</li>
                    <li>• Billing and shipping addresses</li>
                    <li>• Payment information (processed securely by our payment partners)</li>
                    <li>• Account credentials</li>
                    <li>• Order history and preferences</li>
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-6">
                  <h4 className="font-semibold text-foreground mb-3">Automatically Collected Information</h4>
                  <ul className="space-y-2">
                    <li>• Device information (browser type, operating system)</li>
                    <li>• IP address and location data</li>
                    <li>• Browsing behavior and preferences</li>
                    <li>• Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-accent" />
                How We Use Your Information
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span><strong className="text-foreground">Order Processing:</strong> To process and fulfill your orders, send order confirmations, and provide customer support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span><strong className="text-foreground">Personalization:</strong> To personalize your shopping experience and show relevant products</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span><strong className="text-foreground">Communication:</strong> To send promotional offers, newsletters (with your consent), and important updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span><strong className="text-foreground">Analytics:</strong> To analyze usage patterns and improve our website and services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span><strong className="text-foreground">Security:</strong> To detect and prevent fraud, abuse, and security incidents</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-accent" />
                Data Security
              </h2>
              <div className="bg-secondary rounded-lg p-6 text-muted-foreground">
                <p className="mb-4">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="space-y-2">
                  <li>• SSL/TLS encryption for all data transmission</li>
                  <li>• Secure payment processing through certified providers</li>
                  <li>• Regular security audits and vulnerability assessments</li>
                  <li>• Access controls and authentication protocols</li>
                  <li>• Employee training on data protection best practices</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-accent" />
                Your Rights
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Access", desc: "Request a copy of your personal data" },
                  { title: "Correction", desc: "Update or correct inaccurate information" },
                  { title: "Deletion", desc: "Request deletion of your personal data" },
                  { title: "Opt-out", desc: "Unsubscribe from marketing communications" },
                  { title: "Portability", desc: "Receive your data in a portable format" },
                  { title: "Restrict", desc: "Limit how we process your data" },
                ].map((right) => (
                  <div key={right.title} className="bg-muted rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-1">{right.title}</h4>
                    <p className="text-sm text-muted-foreground">{right.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Cookies Policy
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We use cookies and similar technologies to enhance your browsing experience. These include:
                </p>
                <ul className="space-y-2">
                  <li><strong className="text-foreground">Essential Cookies:</strong> Required for website functionality</li>
                  <li><strong className="text-foreground">Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong className="text-foreground">Marketing Cookies:</strong> Used to show relevant advertisements</li>
                  <li><strong className="text-foreground">Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p>
                  You can manage cookie preferences through your browser settings. Note that disabling certain cookies may affect website functionality.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Third-Party Services
              </h2>
              <p className="text-muted-foreground mb-4">
                We may share your information with trusted third parties for:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Payment processing (bKash, Nagad, Card processors)</li>
                <li>• Shipping and delivery partners</li>
                <li>• Analytics and marketing services</li>
                <li>• Customer support tools</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                All third-party partners are bound by data protection agreements and only receive information necessary for their specific purpose.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Bell className="w-6 h-6 text-accent" />
                Policy Updates
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="bg-accent/10 rounded-lg p-6 border border-accent/30">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Email:</strong> privacy@alamfashion.com</li>
                <li><strong>Phone:</strong> +880 1234-567890</li>
                <li><strong>Address:</strong> 123 Fashion Street, Gulshan-2, Dhaka 1212, Bangladesh</li>
              </ul>
              <Link to="/contact" className="inline-block mt-4 text-accent hover:underline">
                Go to Contact Page →
              </Link>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
