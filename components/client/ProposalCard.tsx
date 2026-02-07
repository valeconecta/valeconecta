import React from 'react';
import { DetailedProfessional, MedalhaType } from '../../types';
import { AwardIcon, ClockIcon, MessageCircleIcon, StarIcon, ToolboxIcon } from '../Icons';
import { Page } from '../../types';

interface ProposalCardProps {
  professional: DetailedProfessional & { price: number; message: string };
  onAccept: () => void;
  onChat: () => void;
  setCurrentPage: (page: Page, id?: number) => void;
}

const MedalhaIcon: React.FC<{ medalha: MedalhaType, className?: string }> = ({ medalha, className }) => {
  const medalhaMap: Record<MedalhaType, React.ReactNode> = {
    'Mestre da Montagem': <ToolboxIcon className={className} />,
    'Super Pontual': <ClockIcon className={className} />,
    'Excelência em Avaliações': <StarIcon className={className} fill="#FFD700" stroke="#FFD700" />,
    'Top Pro': <AwardIcon className={className} />,
  };
  return <div className="group relative flex items-center">{medalhaMap[medalha]}
    <span className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {medalha}
    </span>
  </div>;
};

const ProposalCard: React.FC<ProposalCardProps> = ({ professional, onAccept, onChat, setCurrentPage }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img src={professional.photoUrl || `https://i.pravatar.cc/150?img=${professional.id}`} alt={professional.name} className="w-16 h-16 rounded-full"/>
          <div>
            <h3 
              onClick={() => setCurrentPage('professional-profile', professional.id)}
              className="text-xl font-bold text-gray-800 cursor-pointer hover:underline"
            >
                {professional.name}
            </h3>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-bold text-gray-800">{(professional.rating || 0).toFixed(1)}</span>
              <span className="ml-1">({professional.reviewCount || 0} avaliações)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          {professional.medalhas && professional.medalhas.slice(0, 4).map(medalha => (
            <MedalhaIcon key={medalha} medalha={medalha} className="w-6 h-6 text-[#2A8C82]" />
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700 italic">"{professional.message}"</p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-3xl font-extrabold text-gray-800">
            {professional.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className="text-sm text-gray-500">Valor total proposto</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 border-t border-gray-200 grid grid-cols-2 gap-3">
        <button onClick={onChat} className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm">
            <MessageCircleIcon className="h-4 w-4 mr-2" />
            Conversar
        </button>
        <button onClick={onAccept} className="w-full bg-[#2A8C82] text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-sm">
          Aceitar e Pagar
        </button>
      </div>
    </div>
  );
};

export default ProposalCard;
