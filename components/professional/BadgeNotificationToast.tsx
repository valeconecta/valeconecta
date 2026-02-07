
import React, { useState, useEffect } from 'react';
import { XIcon } from '../Icons';

export interface MedalhaInfo {
  nome: string;
  descricao: string;
  icone: React.ReactNode;
}

interface BadgeNotificationToastProps {
  medalha: MedalhaInfo;
  onClose: () => void;
}

const BadgeNotificationToast: React.FC<BadgeNotificationToastProps> = ({ medalha, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animação de entrada
    setIsVisible(true);

    // Auto-fechamento após 10 segundos
    const timer = setTimeout(() => {
      handleClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Espera a animação de saída terminar para chamar o onClose
    setTimeout(onClose, 300); 
  };

  return (
    <div 
      className={`fixed bottom-5 right-5 w-full max-w-sm bg-gray-800 text-white rounded-xl shadow-2xl flex items-start p-4 transform transition-all duration-300 ease-in-out z-50
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
        {medalha.icone}
      </div>
      <div className="ml-4 flex-1">
        <p className="font-bold">Nova Medalha Conquistada!</p>
        <p className="text-sm font-semibold mt-1">{medalha.nome}</p>
        <p className="text-xs text-gray-300 mt-1">{medalha.descricao}</p>
      </div>
      <button onClick={handleClose} className="ml-2 flex-shrink-0 p-1 rounded-full hover:bg-gray-700" aria-label="Fechar notificação">
        <XIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default BadgeNotificationToast;
