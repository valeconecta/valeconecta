
import React from 'react';
import { XIcon } from '../Icons';

interface RequestProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  professionalName: string;
}

const RequestProposalModal: React.FC<RequestProposalModalProps> = ({ isOpen, onClose, onConfirm, professionalName }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Fechar">
          <XIcon className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800">Iniciar Conversa com {professionalName}</h2>
        <p className="mt-4 text-gray-600">
          Ao confirmar, você solicitará uma proposta. {professionalName} será notificado e poderá entrar em contato com você através do nosso chat seguro.
        </p>
        <p className="mt-2 text-sm text-gray-500">
            Lembre-se: O custo em créditos para desbloquear seu contato será descontado do profissional, garantindo que apenas os mais interessados respondam.
        </p>

        <div className="mt-6 flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-[#2A8C82] text-white rounded-lg font-semibold hover:bg-opacity-90"
          >
            Confirmar e Iniciar Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestProposalModal;
