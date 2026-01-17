import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckoutProgressProps {
  currentStep: number;
  steps: { label: string; description: string }[];
}

export const CheckoutProgress = ({ currentStep, steps }: CheckoutProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
                  index < currentStep
                    ? 'bg-accent text-accent-foreground'
                    : index === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                )}
              >
                {index < currentStep ? <Check size={20} /> : index + 1}
              </div>
              <div className="mt-2 text-center">
                <p className={cn(
                  'text-sm font-medium',
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                )}>
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground hidden md:block">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-1 mx-4 rounded',
                  index < currentStep ? 'bg-accent' : 'bg-muted'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
