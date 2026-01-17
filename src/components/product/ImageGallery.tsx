import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  videoUrl?: string;
  productName: string;
}

export const ImageGallery = ({ images, videoUrl, productName }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showLightbox, setShowLightbox] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const allMedia = videoUrl ? [...images, 'video'] : images;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
  };

  const isVideo = allMedia[selectedIndex] === 'video';

  return (
    <>
      <div className="space-y-4">
        {/* Main Image/Video */}
        <div
          ref={imageRef}
          className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary cursor-zoom-in group"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setShowLightbox(true)}
        >
          {isVideo ? (
            <div className="relative w-full h-full bg-charcoal flex items-center justify-center">
              <video
                src={videoUrl}
                className="w-full h-full object-cover"
                controls
                poster={images[0]}
              />
            </div>
          ) : (
            <>
              <img
                src={images[selectedIndex]}
                alt={`${productName} - Image ${selectedIndex + 1}`}
                className={cn(
                  'w-full h-full object-cover transition-transform duration-300',
                  isZoomed && 'scale-150'
                )}
                style={isZoomed ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                } : undefined}
              />
              
              {/* Zoom indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-background/80 backdrop-blur-sm p-2 rounded-full">
                  <ZoomIn size={20} />
                </div>
              </div>
            </>
          )}

          {/* Navigation arrows */}
          {allMedia.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allMedia.map((media, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative w-20 h-24 rounded-md overflow-hidden border-2 transition-all flex-shrink-0',
                selectedIndex === index ? 'border-accent' : 'border-transparent hover:border-border'
              )}
            >
              {media === 'video' ? (
                <div className="w-full h-full bg-charcoal flex items-center justify-center">
                  <Play size={20} className="text-cream" />
                </div>
              ) : (
                <img src={media} alt="" className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <DialogContent className="max-w-5xl p-0 bg-charcoal border-none">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute right-4 top-4 z-10 p-2 bg-background/20 backdrop-blur-sm rounded-full hover:bg-background/40 transition-colors text-cream"
          >
            <X size={24} />
          </button>
          
          <div className="relative aspect-[4/3] flex items-center justify-center">
            {isVideo ? (
              <video
                src={videoUrl}
                className="max-w-full max-h-full"
                controls
                autoPlay
              />
            ) : (
              <img
                src={images[selectedIndex]}
                alt={`${productName} - Image ${selectedIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            )}
            
            {allMedia.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 p-3 bg-background/20 backdrop-blur-sm rounded-full hover:bg-background/40 transition-colors text-cream"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 bg-background/20 backdrop-blur-sm rounded-full hover:bg-background/40 transition-colors text-cream"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail strip in lightbox */}
          <div className="flex gap-2 justify-center p-4 bg-charcoal/50">
            {allMedia.map((media, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'w-16 h-16 rounded overflow-hidden border-2 transition-all',
                  selectedIndex === index ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
                )}
              >
                {media === 'video' ? (
                  <div className="w-full h-full bg-charcoal flex items-center justify-center">
                    <Play size={16} className="text-cream" />
                  </div>
                ) : (
                  <img src={media} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
