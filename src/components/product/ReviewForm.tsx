import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: () => void;
}

export const ReviewForm = ({ productId, onReviewSubmitted }: ReviewFormProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to write a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a review');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('reviews').insert({
        user_id: user.id,
        product_id: productId,
        rating,
        title: title.trim() || null,
        comment: comment.trim(),
      });

      if (error) throw error;

      toast.success('Review submitted successfully!');
      setOpen(false);
      setRating(0);
      setTitle('');
      setComment('');
      onReviewSubmitted();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-accent">Write a Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        
        {!user ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">Please sign in to write a review</p>
            <Button asChild>
              <a href="/auth">Sign In</a>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating */}
            <div>
              <Label className="mb-2 block">Your Rating *</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      className={cn(
                        'transition-colors',
                        star <= displayRating
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground/30'
                      )}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {displayRating > 0 ? `${displayRating} star${displayRating > 1 ? 's' : ''}` : 'Select rating'}
                </span>
              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="review-title">Review Title (optional)</Label>
              <Input
                id="review-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                maxLength={100}
              />
            </div>

            {/* Comment */}
            <div>
              <Label htmlFor="review-comment">Your Review *</Label>
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like or dislike about this product?"
                rows={4}
                maxLength={1000}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                {comment.length}/1000 characters
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
