import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  title: string | null;
  comment: string;
  helpful_count: number;
  verified_purchase: boolean;
  created_at: string;
  updated_at: string;
  author_name?: string;
}

interface UseProductReviewsProps {
  productId: string;
}

interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: number;
}

export const useProductReviews = ({ productId }: UseProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!productId) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Add author initials for privacy
      const reviewsWithAuthors = (data || []).map((review) => ({
        ...review,
        author_name: `User ${review.user_id.slice(0, 4).toUpperCase()}`,
      }));

      setReviews(reviewsWithAuthors);
    } catch (err: any) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);

  // Calculate rating breakdown
  const ratingBreakdown = useMemo((): RatingBreakdown[] => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        counts[review.rating as keyof typeof counts]++;
      }
    });

    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: counts[stars as keyof typeof counts],
      percentage: reviews.length > 0 
        ? Math.round((counts[stars as keyof typeof counts] / reviews.length) * 100) 
        : 0,
    }));
  }, [reviews]);

  // Mark review as helpful
  const markHelpful = async (reviewId: string) => {
    try {
      const review = reviews.find(r => r.id === reviewId);
      if (!review) return;

      const { error: updateError } = await supabase
        .from('reviews')
        .update({ helpful_count: review.helpful_count + 1 })
        .eq('id', reviewId);

      if (updateError) throw updateError;

      setReviews(prev => 
        prev.map(r => 
          r.id === reviewId 
            ? { ...r, helpful_count: r.helpful_count + 1 } 
            : r
        )
      );
    } catch (err) {
      console.error('Error marking review helpful:', err);
    }
  };

  return {
    reviews,
    isLoading,
    error,
    averageRating,
    reviewCount: reviews.length,
    ratingBreakdown,
    refetch: fetchReviews,
    markHelpful,
  };
};
