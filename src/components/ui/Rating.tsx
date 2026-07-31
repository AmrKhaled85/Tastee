import React from 'react';
import { Star } from 'lucide-react';
import { formatRating } from '../../utils/formatters';

interface RatingProps {
  rating: number;
  reviewsCount?: number;
  showReviews?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  reviewsCount,
  showReviews = false,
}) => {
  return (
    <div className="inline-flex items-center gap-1 text-amber-500 font-semibold text-sm">
      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
      <span>{formatRating(rating)}</span>
      {showReviews && reviewsCount !== undefined && (
        <span className="text-gray-400 dark:text-gray-500 font-normal text-xs">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};
