import { Shield, Leaf, Baby, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SafetyInfoProps {
  category: string;
  fabric: string;
  certifications?: string[];
  safetyFeatures?: string[];
}

export const SafetyInfo = ({ 
  category, 
  fabric, 
  certifications = [],
  safetyFeatures = []
}: SafetyInfoProps) => {
  const isBabyProduct = category.toLowerCase().includes('baby');
  const isKidsProduct = category.toLowerCase().includes('boy') || 
                        category.toLowerCase().includes('girl') || 
                        isBabyProduct;

  const defaultCertifications = isBabyProduct 
    ? ['OEKO-TEX® Standard 100', 'GOTS Certified', 'Baby Safe'] 
    : isKidsProduct 
      ? ['OEKO-TEX® Standard 100', 'Child Safe'] 
      : ['OEKO-TEX® Standard 100'];

  const defaultSafetyFeatures = isBabyProduct
    ? [
        'Hypoallergenic fabric',
        'No harsh chemicals or dyes',
        'Breathable material for comfort',
        'Nickel-free snaps and buttons',
        'Tagless labels to prevent irritation',
      ]
    : isKidsProduct
      ? [
          'Non-toxic dyes',
          'Reinforced stitching',
          'Comfortable fit for active play',
          'Easy care fabric',
        ]
      : [
          'Skin-friendly fabric',
          'Quality tested materials',
          'Durable construction',
        ];

  const allCertifications = [...new Set([...certifications, ...defaultCertifications])];
  const allSafetyFeatures = [...new Set([...safetyFeatures, ...defaultSafetyFeatures])];

  return (
    <div className={cn(
      'rounded-lg p-6',
      isBabyProduct 
        ? 'bg-sage/20 border border-sage' 
        : isKidsProduct
          ? 'bg-secondary border border-border'
          : 'bg-secondary/50'
    )}>
      <div className="flex items-center gap-3 mb-4">
        {isBabyProduct ? (
          <Baby className="text-accent" size={24} />
        ) : (
          <Shield className="text-accent" size={24} />
        )}
        <h4 className="font-semibold text-lg">
          {isBabyProduct ? 'Baby Safety Information' : 'Safety & Fabric Details'}
        </h4>
      </div>

      {isBabyProduct && (
        <div className="bg-background/50 rounded-lg p-4 mb-4 flex items-start gap-3">
          <Info className="text-accent flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-muted-foreground">
            This product has been specially designed for babies and meets strict safety standards. 
            All materials used are hypoallergenic and free from harmful substances.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Fabric Details */}
        <div>
          <h5 className="font-medium mb-3 flex items-center gap-2">
            <Leaf size={16} className="text-accent" />
            Fabric Composition
          </h5>
          <p className="text-muted-foreground mb-4">{fabric}</p>
          
          {/* Safety Features */}
          <h5 className="font-medium mb-3 flex items-center gap-2">
            <CheckCircle size={16} className="text-accent" />
            Safety Features
          </h5>
          <ul className="space-y-2">
            {allSafetyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-accent mt-1">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div>
          <h5 className="font-medium mb-3 flex items-center gap-2">
            <Shield size={16} className="text-accent" />
            Certifications
          </h5>
          <div className="space-y-3">
            {allCertifications.map((cert, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 bg-background rounded-lg p-3"
              >
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <CheckCircle size={18} className="text-accent" />
                </div>
                <span className="font-medium text-sm">{cert}</span>
              </div>
            ))}
          </div>

          {/* Warning for Baby Products */}
          {isBabyProduct && (
            <div className="mt-4 bg-destructive/10 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="text-destructive flex-shrink-0 mt-0.5" size={18} />
              <div className="text-sm">
                <p className="font-medium text-destructive mb-1">Safety Reminder</p>
                <p className="text-muted-foreground">
                  Always supervise children during wear. Remove all tags and packaging before use.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
