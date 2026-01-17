import { useState } from 'react';
import { CreditCard, Wallet, Banknote, Building2, ChevronLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

export type PaymentMethod = 'card' | 'bkash' | 'nagad' | 'cod' | 'bank';

interface PaymentFormProps {
  onSubmit: (method: PaymentMethod, details?: Record<string, string>) => void;
  onBack: () => void;
}

const paymentMethods = [
  { id: 'card' as const, name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, AMEX' },
  { id: 'bkash' as const, name: 'bKash', icon: Wallet, description: 'Pay with bKash mobile wallet' },
  { id: 'nagad' as const, name: 'Nagad', icon: Wallet, description: 'Pay with Nagad mobile wallet' },
  { id: 'bank' as const, name: 'Bank Transfer', icon: Building2, description: 'Direct bank transfer' },
  { id: 'cod' as const, name: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' },
];

export const PaymentForm = ({ onSubmit, onBack }: PaymentFormProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod === 'card') {
      onSubmit(selectedMethod, cardDetails);
    } else if (selectedMethod === 'bkash' || selectedMethod === 'nagad') {
      onSubmit(selectedMethod, { mobileNumber });
    } else {
      onSubmit(selectedMethod);
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ').substr(0, 19) : '';
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="text-accent" size={24} />
        <h2 className="font-display text-xl font-semibold">Payment Method</h2>
      </div>

      <RadioGroup value={selectedMethod} onValueChange={(v) => setSelectedMethod(v as PaymentMethod)}>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={cn(
                'flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all',
                selectedMethod === method.id
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-accent/50'
              )}
            >
              <RadioGroupItem value={method.id} id={method.id} />
              <method.icon size={24} className={selectedMethod === method.id ? 'text-accent' : 'text-muted-foreground'} />
              <div className="flex-1">
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            </label>
          ))}
        </div>
      </RadioGroup>

      {/* Card Details */}
      {selectedMethod === 'card' && (
        <div className="space-y-4 p-4 bg-secondary/50 rounded-lg">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
              maxLength={19}
            />
          </div>
          <div>
            <Label htmlFor="cardName">Name on Card</Label>
            <Input
              id="cardName"
              placeholder="JOHN DOE"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                maxLength={5}
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                placeholder="•••"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                maxLength={4}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Wallet */}
      {(selectedMethod === 'bkash' || selectedMethod === 'nagad') && (
        <div className="space-y-4 p-4 bg-secondary/50 rounded-lg">
          <div>
            <Label htmlFor="mobileNumber">{selectedMethod === 'bkash' ? 'bKash' : 'Nagad'} Number</Label>
            <Input
              id="mobileNumber"
              placeholder="01XXXXXXXXX"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            You will receive a payment request on your {selectedMethod === 'bkash' ? 'bKash' : 'Nagad'} app.
          </p>
        </div>
      )}

      {/* COD Notice */}
      {selectedMethod === 'cod' && (
        <div className="p-4 bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            A ৳50 COD fee will be added to your order. Please keep exact change ready during delivery.
          </p>
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Shield size={16} className="text-accent" />
        <span>Your payment information is encrypted and secure</span>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          <ChevronLeft size={18} className="mr-2" />
          Back
        </Button>
        <Button type="submit" className="flex-1 btn-accent">
          Review Order
        </Button>
      </div>
    </form>
  );
};
