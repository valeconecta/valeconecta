
import React from 'react';
import { Opportunity } from '../../../data/opportunitiesMockData';
import { SparklesIcon, PackageIcon, UsersIcon } from '../../Icons';

interface OpportunityCardProps {
    opportunity: Opportunity;
    onClick: () => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onClick }) => {
    const { title, location, distance, category, date, isPlusClient, hasMaterials, creditsCost, proposalsSent, postedDate, description } = opportunity;

    return (
        <div 
            onClick={onClick}
            className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-[#2A8C82] hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
            <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#2A8C82] transition-colors">{title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{location} - a ~{distance} km de você</p>
                </div>
                <div className="mt-2 sm:mt-0 text-xs text-gray-500">{postedDate}</div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{category}</span>
                <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{date}</span>
                {isPlusClient && <span className="flex items-center text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"><SparklesIcon className="h-3 w-3 mr-1"/> Cliente Plus</span>}
                {hasMaterials && <span className="flex items-center text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full"><PackageIcon className="h-3 w-3 mr-1"/> Materiais Inclusos</span>}
            </div>
            
            <div className="mt-4 pt-4 border-t border-dashed flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-baseline space-x-4">
                    <div>
                        <p className="text-xs text-gray-500">CUSTO</p>
                        <p className="font-bold text-gray-800">{creditsCost} Créditos</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-500">CONCORRÊNCIA</p>
                        <p className={`font-bold ${proposalsSent < 3 ? 'text-green-600' : 'text-yellow-600'}`}>{proposalsSent} Propostas</p>
                    </div>
                </div>
                <button className="w-full sm:w-auto bg-[#2A8C82] text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90">
                    Ver Detalhes
                </button>
            </div>
            
            <div className="hidden group-hover:block mt-4 text-sm text-gray-600 transition-all">
                <p className="line-clamp-2">{description}</p>
            </div>
        </div>
    );
};

export default OpportunityCard;
