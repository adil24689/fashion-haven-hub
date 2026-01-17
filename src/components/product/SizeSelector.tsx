import { useState, useEffect } from 'react';
import { Ruler, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
  outOfStockSizes?: string[];
  savedSize?: string;
  category?: string;
}

const sizeCharts = {
  women: {
    headers: ['Size', 'Bust (in)', 'Waist (in)', 'Hip (in)'],
    data: [
      ['XS', '31-32', '23-24', '33-34'],
      ['S', '33-34', '25-26', '35-36'],
      ['M', '35-36', '27-28', '37-38'],
      ['L', '37-39', '29-31', '39-41'],
      ['XL', '40-42', '32-34', '42-44'],
    ],
  },
  men: {
    headers: ['Size', 'Chest (in)', 'Waist (in)', 'Shoulder (in)'],
    data: [
      ['S', '36-38', '30-32', '17'],
      ['M', '38-40', '32-34', '18'],
      ['L', '40-42', '34-36', '19'],
      ['XL', '42-44', '36-38', '20'],
      ['XXL', '44-46', '38-40', '21'],
    ],
  },
  kids: {
    headers: ['Size', 'Age', 'Height (in)', 'Chest (in)'],
    data: [
      ['2Y', '2 Years', '33-36', '20-21'],
      ['3Y', '3 Years', '36-39', '21-22'],
      ['4Y', '4 Years', '39-42', '22-23'],
      ['5Y', '5 Years', '42-45', '23-24'],
      ['6Y', '6 Years', '45-48', '24-25'],
    ],
  },
};

export const SizeSelector = ({
  sizes,
  selectedSize,
  onSizeChange,
  outOfStockSizes = [],
  savedSize,
  category = 'women',
}: SizeSelectorProps) => {
  const [showSizeChart, setShowSizeChart] = useState(false);
  
  useEffect(() => {
    // If there's a saved size and it's available, auto-select it
    if (savedSize && sizes.includes(savedSize) && !outOfStockSizes.includes(savedSize) && !selectedSize) {
      onSizeChange(savedSize);
    }
  }, [savedSize, sizes, outOfStockSizes, selectedSize, onSizeChange]);

  const chartKey = category.toLowerCase().includes('boy') || category.toLowerCase().includes('girl') || category.toLowerCase().includes('baby')
    ? 'kids'
    : category.toLowerCase() === 'men' ? 'men' : 'women';
  
  const chart = sizeCharts[chartKey];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium">
          Size
          {selectedSize && <span className="text-muted-foreground ml-2">({selectedSize})</span>}
        </h4>
        <Dialog open={showSizeChart} onOpenChange={setShowSizeChart}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1 text-sm text-accent hover:underline">
              <Ruler size={14} />
              Size Guide
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Size Chart</DialogTitle>
            </DialogHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {chart.headers.map((header) => (
                      <th key={header} className="py-3 px-2 text-left font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chart.data.map((row, index) => (
                    <tr key={index} className="border-b border-border last:border-0">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="py-3 px-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              For the best fit, measure yourself and compare with the size chart above. 
              If you're between sizes, we recommend sizing up for a more comfortable fit.
            </p>
          </DialogContent>
        </Dialog>
      </div>
      
      {savedSize && sizes.includes(savedSize) && !outOfStockSizes.includes(savedSize) && (
        <div className="flex items-center gap-2 text-sm text-accent mb-3">
          <Check size={14} />
          <span>Your saved size: {savedSize}</span>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isOutOfStock = outOfStockSizes.includes(size);
          const isSavedSize = savedSize === size;
          
          return (
            <button
              key={size}
              onClick={() => !isOutOfStock && onSizeChange(size)}
              disabled={isOutOfStock}
              className={cn(
                'relative min-w-[3.5rem] h-12 px-3 rounded-md border font-medium transition-all',
                selectedSize === size
                  ? 'border-accent bg-accent text-accent-foreground'
                  : isOutOfStock
                    ? 'border-border bg-muted text-muted-foreground cursor-not-allowed line-through'
                    : 'border-border hover:border-accent',
                isSavedSize && selectedSize !== size && !isOutOfStock && 'ring-2 ring-accent/30'
              )}
            >
              {size}
              {isSavedSize && selectedSize !== size && !isOutOfStock && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      
      {outOfStockSizes.length > 0 && outOfStockSizes.some(s => sizes.includes(s)) && (
        <p className="flex items-center gap-1 text-xs text-muted-foreground mt-3">
          <AlertCircle size={12} />
          Some sizes are currently out of stock
        </p>
      )}
    </div>
  );
};
