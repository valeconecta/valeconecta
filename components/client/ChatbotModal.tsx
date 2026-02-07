
import React from 'react';
import Chatbot from '../Chatbot';
import { XIcon } from '../Icons';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute -top-10 right-0 text-white hover:text-gray-300" 
            aria-label="Fechar"
        >
          <XIcon className="h-8 w-8" />
        </button>
        <Chatbot />
      </div>
    </div>
  );
};

export default ChatbotModal;
