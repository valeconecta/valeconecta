
import React, { useState } from 'react';
import { XIcon, StarIcon } from '../Icons';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  professionalName: string;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit, professionalName }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
    } else {
      alert("Por favor, selecione uma avaliação de 1 a 5 estrelas.");
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Avalie {professionalName}</h2>
          <button onClick={onClose}><XIcon className="h-6 w-6 text-gray-500"/></button>
        </div>

        <p className="text-gray-600 mt-2">Sua avaliação é muito importante para a comunidade.</p>
        
        <div className="my-6 flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <StarIcon 
                className={`h-10 w-10 cursor-pointer transition-colors ${
                  (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Deixe um comentário sobre sua experiência (opcional)..."
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        
        <div className="mt-6 flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold">Cancelar</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-[#2A8C82] text-white rounded-lg font-semibold">Enviar Avaliação</button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
