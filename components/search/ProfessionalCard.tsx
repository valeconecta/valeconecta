
import React from 'react';
import { Professional, MedalhaType } from '../../data/professionals';
import { AwardIcon, ClockIcon, StarIcon, ToolboxIcon } from '../Icons';
import { Page } from '../../types';

interface ProfessionalCardProps {
  professional: Professional;
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

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional, setCurrentPage }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-start space-x-4">
            <img src={professional.photoUrl} alt={professional.name} className="w-16 h-16 rounded-full" />
            <div className="flex-1">
                <h3 className="text-xl font-bold text-[#333333]">{professional.name}</h3>
                <div className="flex items-center mt-1 text-sm text-[#666666]">
                    <StarIcon className="w-5 h-5 text-[#FFD700] mr-1" />
                    <span className="font-bold text-[#333333]">{professional.rating.toFixed(1)}</span>
                    <span className="ml-1">({professional.reviewCount} avaliações)</span>
                </div>
            </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
            {professional.medalhas.slice(0, 3).map(medalha => (
                <MedalhaIcon key={medalha} medalha={medalha} className="w-6 h-6 text-[#2A8C82]" />
            ))}
        </div>

        <div className="mt-4">
          <p className="text-2xl font-extrabold text-[#333333]">
            {professional.pricePerHour.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}<span className="text-base font-medium text-[#666666]">/h</span>
          </p>
        </div>

      </div>
      <div className="bg-gray-50 p-4">
        <button 
            onClick={() => setCurrentPage('professional-profile', professional.id)}
            className="w-full bg-[#2A8C82] text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
            Ver Perfil
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCard;
