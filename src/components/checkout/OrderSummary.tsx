import { useState } from 'react';
import { ShoppingBag, Tag, Truck, ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ShippingFormData } from './ShippingForm';
import { PaymentMethod } from './PaymentForm';
import { useCart } from '@/contexts/CartContext';

interface OrderSummaryProps {
  shippingData: ShippingFormData;
  paymentMethod: PaymentMethod;
  onConfirm: () => void;
  onBack: () => void;
}

const paymentMethodNames: Record<PaymentMethod, string> = {
  card: 'Credit/Debit Card',
  bkash: 'bKash',
  nagad: 'Nagad',
  cod: 'Cash on Delivery',
  bank: 'Bank Transfer',
};

export const OrderSummary = ({ shippingData, paymentMethod, onConfirm, onBack }: OrderSummaryProps) => {
  const { items, subtotal, shipping } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const codFee = paymentMethod === 'cod' ? 50 : 0;
  const total = subtotal - discount + shipping + codFee;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'WELCOME10') {
      const discountAmount = Math.round(subtotal * 0.1);
      setDiscount(discountAmount);
      setAppliedCoupon('WELCOME10');
      toast.success(`Coupon applied! You saved ৳${discountAmount.toLocaleString()}`);
    } else if (couponCode.toUpperCase() === 'FREESHIP') {
      setDiscount(shipping);
      setAppliedCoupon('FREESHIP');
      toast.success('Free shipping applied!');
    } else {
      toast.error('Invalid coupon code');
    }
    setCouponCode('');
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onConfirm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="text-accent" size={24} />
        <h2 className="font-display text-xl font-semibold">Review Your Order</h2>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-4 bg-secondary/50 rounded-lg">
            <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded" />
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-muted-foreground">Size: {item.size} | Color: {item.color}</p>
              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">৳{(item.price * item.quantity).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Coupon Code */}
      {!appliedCoupon ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={applyCoupon}>Apply</Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-accent" />
            <span className="font-medium">{appliedCoupon}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { setAppliedCoupon(null); setDiscount(0); }}>
            Remove
          </Button>
        </div>
      )}

      <Separator />

      {/* Shipping Details */}
      <div>
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <Truck size={18} className="text-accent" />
          Shipping To
        </h3>
        <div className="p-4 bg-secondary/50 rounded-lg text-sm">
          <p className="font-medium">{shippingData.firstName} {shippingData.lastName}</p>
          <p className="text-muted-foreground">{shippingData.address}</p>
          {shippingData.apartment && <p className="text-muted-foreground">{shippingData.apartment}</p>}
          <p className="text-muted-foreground">{shippingData.city}, {shippingData.district} {shippingData.postalCode}</p>
          <p className="text-muted-foreground">{shippingData.phone}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="font-medium mb-3">Payment Method</h3>
        <div className="p-4 bg-secondary/50 rounded-lg text-sm">
          <p className="font-medium">{paymentMethodNames[paymentMethod]}</p>
        </div>
      </div>

      <Separator />

      {/* Order Total */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>৳{subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-accent">
            <span>Discount</span>
            <span>-৳{discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `৳${shipping}`}</span>
        </div>
        {codFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">COD Fee</span>
            <span>৳{codFee}</span>
          </div>
        )}
        <Separator />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>৳{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          <ChevronLeft size={18} className="mr-2" />
          Back
        </Button>
        <Button 
          onClick={handleConfirm} 
          className="flex-1 btn-accent"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Processing...
            </>
          ) : (
            'Place Order'
          )}
        </Button>
      </div>
    </div>
  );
};
