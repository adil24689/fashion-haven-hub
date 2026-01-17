import { useState } from 'react';
import { Star, ThumbsUp, Camera, CheckCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  images?: string[];
  isVerified: boolean;
  helpful: number;
  size?: string;
  color?: string;
}

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
  reviews?: Review[];
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Fatima K.',
    rating: 5,
    date: '2024-01-15',
    title: 'Absolutely stunning dress!',
    content: 'The fabric quality is amazing and the fit is perfect. I received so many compliments at the wedding I wore it to. The color is exactly as shown in the pictures.',
    images: [],
    isVerified: true,
    helpful: 24,
    size: 'M',
    color: 'Terracotta',
  },
  {
    id: '2',
    author: 'Rashid A.',
    rating: 4,
    date: '2024-01-10',
    title: 'Great quality, runs slightly large',
    content: 'Beautiful dress but I would recommend sizing down. The material is high quality and very comfortable. Delivery was quick and packaging was excellent.',
    isVerified: true,
    helpful: 18,
    size: 'L',
    color: 'Navy',
  },
  {
    id: '3',
    author: 'Nadia S.',
    rating: 5,
    date: '2024-01-05',
    title: 'Perfect for special occasions',
    content: 'This dress exceeded my expectations! The wrap style is very flattering and the tiered hem adds beautiful movement. Will definitely order more colors.',
    images: [],
    isVerified: false,
    helpful: 12,
    size: 'S',
    color: 'Sage',
  },
];

const ratingBreakdown = [
  { stars: 5, percentage: 68 },
  { stars: 4, percentage: 22 },
  { stars: 3, percentage: 7 },
  { stars: 2, percentage: 2 },
  { stars: 1, percentage: 1 },
];

export const ProductReviews = ({ rating, reviewCount, reviews = mockReviews }: ProductReviewsProps) => {
  const [sortBy, setSortBy] = useState('helpful');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showPhotosOnly, setShowPhotosOnly] = useState(false);

  const filteredReviews = reviews.filter(review => {
    if (filterRating && review.rating !== filterRating) return false;
    if (showPhotosOnly && (!review.images || review.images.length === 0)) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <span className="text-5xl font-bold">{rating}</span>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(rating) ? 'fill-accent text-accent' : 'text-border'}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {reviewCount} reviews
              </p>
            </div>
          </div>
          <Button className="btn-accent">Write a Review</Button>
        </div>
        
        <div className="space-y-2">
          {ratingBreakdown.map(({ stars, percentage }) => (
            <button
              key={stars}
              onClick={() => setFilterRating(filterRating === stars ? null : stars)}
              className={cn(
                'flex items-center gap-3 w-full group transition-colors',
                filterRating === stars && 'text-accent'
              )}
            >
              <span className="text-sm w-12">{stars} star</span>
              <Progress value={percentage} className="flex-1 h-2" />
              <span className="text-sm text-muted-foreground w-12 text-right">
                {percentage}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        
        <Button
          variant={showPhotosOnly ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowPhotosOnly(!showPhotosOnly)}
        >
          <Camera size={14} className="mr-1" />
          With Photos
        </Button>
        
        <Button
          variant={filterRating ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterRating(null)}
        >
          All Ratings
        </Button>
        
        <div className="ml-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="helpful">Most Helpful</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{review.author}</span>
                  {review.isVerified && (
                    <span className="flex items-center gap-1 text-xs text-accent">
                      <CheckCircle size={12} />
                      Verified Buyer
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? 'fill-accent text-accent' : 'text-border'}
                      />
                    ))}
                  </div>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
              {(review.size || review.color) && (
                <div className="text-xs text-muted-foreground">
                  {review.size && <span>Size: {review.size}</span>}
                  {review.size && review.color && <span className="mx-1">•</span>}
                  {review.color && <span>Color: {review.color}</span>}
                </div>
              )}
            </div>
            
            <h4 className="font-medium mb-2">{review.title}</h4>
            <p className="text-muted-foreground mb-4">{review.content}</p>
            
            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <button className="w-20 h-20 rounded-md overflow-hidden border border-border hover:border-accent transition-colors">
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl p-0">
                      <img src={image} alt="" className="w-full" />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
            
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ThumbsUp size={14} />
              Helpful ({review.helpful})
            </button>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No reviews match your filters</p>
          <Button variant="link" onClick={() => { setFilterRating(null); setShowPhotosOnly(false); }}>
            Clear filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {filteredReviews.length > 0 && (
        <div className="text-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      )}
    </div>
  );
};
