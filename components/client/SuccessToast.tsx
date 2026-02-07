
import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, XIcon } from '../Icons';

interface SuccessToastProps {
  message: string;
  onClose: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed bottom-5 right-5 w-full max-w-sm bg-green-600 text-white rounded-xl shadow-2xl flex items-start p-4 transform transition-all duration-300 ease-in-out z-50 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-shrink-0">
        <CheckCircleIcon className="h-6 w-6" />
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-semibold">{message}</p>
      </div>
      <button onClick={handleClose} className="ml-2 flex-shrink-0 p-1 rounded-full hover:bg-green-700" aria-label="Fechar notificação">
        <XIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SuccessToast;
