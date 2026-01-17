import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, MapPin, Mail, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShippingFormData } from './ShippingForm';

import product1 from '@/assets/products/product-1.jpg';
import product3 from '@/assets/products/product-3.jpg';

interface OrderConfirmationProps {
  orderNumber: string;
  shippingData: ShippingFormData;
  estimatedDelivery: string;
}

const cartItems = [
  { id: '1', name: 'Terracotta Wrap Maxi Dress', price: 2850, quantity: 1, size: 'M', color: 'Terracotta', image: product1 },
  { id: '3', name: 'Soft Pink Baby Romper Set', price: 850, quantity: 2, size: '6M', color: 'Pink', image: product3 },
];

export const OrderConfirmation = ({ orderNumber, shippingData, estimatedDelivery }: OrderConfirmationProps) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="text-accent" size={48} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Thank You!</h1>
        <p className="text-lg text-muted-foreground mb-6">Your order has been placed successfully</p>

        <div className="bg-secondary/50 rounded-lg p-6 mb-8 text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-semibold text-lg">#{orderNumber}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download size={14} className="mr-1" />
                Invoice
              </Button>
              <Button variant="outline" size="sm">
                <Share2 size={14} className="mr-1" />
                Share
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to <span className="font-medium text-foreground">{shippingData.email}</span>
          </p>
        </div>

        {/* Order Timeline */}
        <div className="bg-card rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-6 text-left">Order Status</h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="text-accent-foreground" size={24} />
              </div>
              <p className="text-sm font-medium">Confirmed</p>
              <p className="text-xs text-muted-foreground">Just now</p>
            </div>
            <div className="flex-1 h-1 bg-muted mx-2" />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                <Package className="text-muted-foreground" size={24} />
              </div>
              <p className="text-sm font-medium">Processing</p>
              <p className="text-xs text-muted-foreground">In progress</p>
            </div>
            <div className="flex-1 h-1 bg-muted mx-2" />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                <Truck className="text-muted-foreground" size={24} />
              </div>
              <p className="text-sm font-medium">Shipped</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div className="flex-1 h-1 bg-muted mx-2" />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                <MapPin className="text-muted-foreground" size={24} />
              </div>
              <p className="text-sm font-medium">Delivered</p>
              <p className="text-xs text-muted-foreground">{estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold mb-4">Order Items</h3>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">Size: {item.size} | Color: {item.color}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">৳{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>৳{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-card rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-accent" />
            Shipping Address
          </h3>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{shippingData.firstName} {shippingData.lastName}</p>
            <p>{shippingData.address}</p>
            {shippingData.apartment && <p>{shippingData.apartment}</p>}
            <p>{shippingData.city}, {shippingData.district} {shippingData.postalCode}</p>
            <p>{shippingData.phone}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="/orders">View All Orders</Link>
          </Button>
          <Button className="flex-1 btn-accent" asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Questions about your order? <Link to="/contact" className="text-accent hover:underline">Contact us</Link>
        </p>
      </motion.div>
    </div>
  );
};
