
import React from 'react';
import { Review } from '../../data/professionalProfileMockData';
import { StarIcon } from '../Icons';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-800">{review.clientName}</p>
          <p className="text-xs text-gray-500">{review.date}</p>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm font-semibold text-gray-600">{review.service}</p>
      <p className="mt-2 text-gray-700 italic">"{review.comment}"</p>
      {review.professionalReply && (
        <div className="mt-4 ml-4 pl-4 border-l-2 border-[#2A8C82]/50 bg-gray-50 p-3 rounded-r-lg">
            <p className="text-sm font-bold text-gray-800">Resposta do Profissional:</p>
            <p className="text-sm text-gray-600 mt-1 italic">"{review.professionalReply}"</p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
