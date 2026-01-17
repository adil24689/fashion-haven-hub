import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Shield, Truck, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckoutProgress } from '@/components/checkout/CheckoutProgress';
import { ShippingForm, ShippingFormData } from '@/components/checkout/ShippingForm';
import { PaymentForm, PaymentMethod } from '@/components/checkout/PaymentForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation';
import { useCart } from '@/contexts/CartContext';

const steps = [
  { label: 'Shipping', description: 'Delivery address' },
  { label: 'Payment', description: 'Payment method' },
  { label: 'Review', description: 'Confirm order' },
  { label: 'Complete', description: 'Order placed' },
];

const CheckoutPage = () => {
  const { items, subtotal, shipping, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [orderNumber, setOrderNumber] = useState('');

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setCurrentStep(1);
  };

  const handlePaymentSubmit = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setCurrentStep(2);
  };

  const handleOrderConfirm = () => {
    // Generate random order number
    const orderNum = `ORD${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
    clearCart();
    setCurrentStep(3);
  };

  const getEstimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container-custom py-8">
          {currentStep < 3 && (
            <div className="mb-6">
              <Button variant="ghost" asChild>
                <Link to="/cart">
                  <ArrowLeft size={18} className="mr-2" />
                  Back to Cart
                </Link>
              </Button>
            </div>
          )}

          <CheckoutProgress currentStep={currentStep} steps={steps} />

          {currentStep === 3 ? (
            <OrderConfirmation
              orderNumber={orderNumber}
              shippingData={shippingData!}
              estimatedDelivery={getEstimatedDelivery()}
            />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card rounded-lg p-6 shadow-sm"
                >
                  {currentStep === 0 && (
                    <ShippingForm onSubmit={handleShippingSubmit} defaultValues={shippingData || undefined} />
                  )}
                  {currentStep === 1 && shippingData && (
                    <PaymentForm onSubmit={handlePaymentSubmit} onBack={() => setCurrentStep(0)} />
                  )}
                  {currentStep === 2 && shippingData && (
                    <OrderSummary
                      shippingData={shippingData}
                      paymentMethod={paymentMethod}
                      onConfirm={handleOrderConfirm}
                      onBack={() => setCurrentStep(1)}
                    />
                  )}
                </motion.div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg p-6 shadow-sm sticky top-24">
                  <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                    <ShoppingBag size={20} className="text-accent" />
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                        <div className="relative">
                          <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded" />
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.size} / {item.color}</p>
                          <p className="font-medium text-sm mt-1">৳{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>৳{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? 'text-accent' : ''}>
                        {shipping === 0 ? 'Free' : `৳${shipping}`}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>৳{(subtotal + shipping).toLocaleString()}</span>
                  </div>

                  {shipping === 0 && (
                    <p className="text-xs text-accent mt-2 flex items-center gap-1">
                      <Truck size={12} />
                      You qualify for free shipping!
                    </p>
                  )}

                  <Separator className="my-4" />

                  <div className="space-y-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-accent" />
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-accent" />
                      <span>Delivery within 3-5 business days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
