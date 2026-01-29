import { useState } from 'react';
import { Star, ThumbsUp, Camera, CheckCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ReviewForm } from '@/components/product/ReviewForm';
import { useProductReviews, Review } from '@/hooks/useProductReviews';
import { cn } from '@/lib/utils';

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const {
    reviews,
    isLoading,
    averageRating,
    reviewCount,
    ratingBreakdown,
    refetch,
    markHelpful,
  } = useProductReviews({ productId });

  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => !filterRating || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'helpful':
          return b.helpful_count - a.helpful_count;
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'recent':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <span className="text-5xl font-bold">{averageRating || '—'}</span>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(averageRating) ? 'fill-accent text-accent' : 'text-border'}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
              </p>
            </div>
          </div>
          <ReviewForm productId={productId} onReviewSubmitted={refetch} />
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
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} review={review} onMarkHelpful={markHelpful} />
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          {reviewCount === 0 ? (
            <div>
              <p className="text-muted-foreground mb-4">No reviews yet. Be the first to review this product!</p>
              <ReviewForm productId={productId} onReviewSubmitted={refetch} />
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground">No reviews match your filters</p>
              <Button variant="link" onClick={() => setFilterRating(null)}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Separate ReviewCard component for cleaner code
const ReviewCard = ({ 
  review, 
  onMarkHelpful 
}: { 
  review: Review; 
  onMarkHelpful: (id: string) => void;
}) => {
  const [hasMarkedHelpful, setHasMarkedHelpful] = useState(false);

  const handleHelpful = () => {
    if (hasMarkedHelpful) return;
    onMarkHelpful(review.id);
    setHasMarkedHelpful(true);
  };

  return (
    <div className="border-b border-border pb-6 last:border-0">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{review.author_name}</span>
            {review.verified_purchase && (
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
            <span>{new Date(review.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      {review.title && <h4 className="font-medium mb-2">{review.title}</h4>}
      <p className="text-muted-foreground mb-4">{review.comment}</p>
      
      <button 
        onClick={handleHelpful}
        disabled={hasMarkedHelpful}
        className={cn(
          "flex items-center gap-2 text-sm transition-colors",
          hasMarkedHelpful 
            ? "text-accent cursor-default" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <ThumbsUp size={14} className={hasMarkedHelpful ? 'fill-current' : ''} />
        Helpful ({review.helpful_count})
      </button>
    </div>
  );
};
