
import React from 'react';
import { XIcon, ShieldCheckIcon } from '../Icons';
import { DetailedProfessional } from '../../data/professionalProfileMockData';

interface AcceptProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  professional: DetailedProfessional & { price: number };
  taskTitle: string;
}

const AcceptProposalModal: React.FC<AcceptProposalModalProps> = ({ isOpen, onClose, onConfirm, professional, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Fechar">
          <XIcon className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800">Confirmar Contratação</h2>
        <p className="mt-2 text-gray-600">Revise os detalhes antes de prosseguir com o pagamento seguro.</p>

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
            <div>
                <span className="text-xs font-semibold text-gray-500">SERVIÇO</span>
                <p className="font-semibold text-gray-800">{taskTitle}</p>
            </div>
             <div>
                <span className="text-xs font-semibold text-gray-500">PROFISSIONAL</span>
                <p className="font-semibold text-gray-800">{professional.name}</p>
            </div>
             <div>
                <span className="text-xs font-semibold text-gray-500">VALOR TOTAL</span>
                <p className="text-2xl font-bold text-[#2A8C82]">{professional.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
        </div>

        <div className="mt-4 flex items-start text-green-700 bg-green-50 p-3 rounded-md">
            <ShieldCheckIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-xs">
                Seu pagamento fica retido com a Vale Conecta e só é liberado para o profissional 3 dias após você confirmar a conclusão do serviço.
            </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
          <button 
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-3 bg-[#2A8C82] text-white rounded-lg font-bold hover:bg-opacity-90"
          >
            Confirmar e Pagar
          </button>
           <button 
            onClick={onClose} 
            className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptProposalModal;
