import { useState } from 'react';
import { Bell, Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface NotifyMeProps {
  productName: string;
  selectedSize?: string;
  selectedColor?: string;
}

export const NotifyMe = ({ productName, selectedSize, selectedColor }: NotifyMeProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Simulate API call
    setIsSubmitted(true);
    toast.success('You will be notified when this item is back in stock!');
    
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setEmail('');
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" size="lg">
          <Bell size={18} className="mr-2" />
          Notify Me When Available
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="text-accent" size={20} />
            Get Notified
          </DialogTitle>
        </DialogHeader>
        
        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-accent" size={32} />
            </div>
            <h3 className="font-semibold text-lg mb-2">You're on the list!</h3>
            <p className="text-muted-foreground text-sm">
              We'll email you at <span className="font-medium">{email}</span> as soon as this item is back in stock.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm font-medium mb-1">{productName}</p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                {selectedSize && <span>Size: {selectedSize}</span>}
                {selectedColor && <span>Color: {selectedColor}</span>}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Enter your email and we'll notify you when this product becomes available again.
            </p>
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            
            <Button type="submit" className="w-full btn-accent">
              Notify Me
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              We'll only use your email to notify you about this product. No spam, promise!
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
