import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin } from 'lucide-react';

const shippingSchema = z.object({
  firstName: z.string().trim().min(2, 'First name is required').max(50),
  lastName: z.string().trim().min(2, 'Last name is required').max(50),
  email: z.string().trim().email('Invalid email address').max(100),
  phone: z.string().trim().min(10, 'Valid phone number required').max(15),
  address: z.string().trim().min(5, 'Address is required').max(200),
  apartment: z.string().trim().max(50).optional(),
  city: z.string().trim().min(2, 'City is required').max(50),
  district: z.string().trim().min(2, 'District is required'),
  postalCode: z.string().trim().min(4, 'Postal code is required').max(10),
  saveAddress: z.boolean().optional(),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
  defaultValues?: Partial<ShippingFormData>;
}

const districts = [
  'Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh',
  'Comilla', 'Gazipur', 'Narayanganj', 'Bogra', 'Cox\'s Bazar', 'Jessore', 'Dinajpur'
];

export const ShippingForm = ({ onSubmit, defaultValues }: ShippingFormProps) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      saveAddress: true,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="text-accent" size={24} />
        <h2 className="font-display text-xl font-semibold">Shipping Address</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" {...register('firstName')} placeholder="Enter first name" />
          {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" {...register('lastName')} placeholder="Enter last name" />
          {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" type="email" {...register('email')} placeholder="you@example.com" />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" {...register('phone')} placeholder="+880 1XXX-XXXXXX" />
          {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="address">Street Address *</Label>
        <Input id="address" {...register('address')} placeholder="House/Road/Block" />
        {errors.address && <p className="text-destructive text-sm mt-1">{errors.address.message}</p>}
      </div>

      <div>
        <Label htmlFor="apartment">Apartment, Suite, etc. (optional)</Label>
        <Input id="apartment" {...register('apartment')} placeholder="Apartment, suite, unit, building, floor, etc." />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input id="city" {...register('city')} placeholder="City" />
          {errors.city && <p className="text-destructive text-sm mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <Label htmlFor="district">District *</Label>
          <Select onValueChange={(value) => setValue('district', value)} defaultValue={defaultValues?.district}>
            <SelectTrigger>
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>{district}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.district && <p className="text-destructive text-sm mt-1">{errors.district.message}</p>}
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input id="postalCode" {...register('postalCode')} placeholder="1234" />
          {errors.postalCode && <p className="text-destructive text-sm mt-1">{errors.postalCode.message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox 
          id="saveAddress" 
          checked={watch('saveAddress')}
          onCheckedChange={(checked) => setValue('saveAddress', checked as boolean)} 
        />
        <Label htmlFor="saveAddress" className="cursor-pointer">Save this address for future orders</Label>
      </div>

      <Button type="submit" className="w-full btn-accent" size="lg">
        Continue to Payment
      </Button>
    </form>
  );
};
