
import React, { useState } from 'react';
import { Page } from '../types';
import { getOpportunityById, submitProposal } from '../data/opportunitiesMockData';
import { ArrowLeftIcon, CalendarDaysIcon, PackageIcon, SparklesIcon, UsersIcon } from '../components/Icons';
import SuccessToast from '../components/client/SuccessToast';

interface OpportunityDetailPageProps {
  opportunityId: number;
  setCurrentPage: (page: Page, id?: number) => void;
}

const OpportunityDetailPage: React.FC<OpportunityDetailPageProps> = ({ opportunityId, setCurrentPage }) => {
    const [message, setMessage] = useState('');
    const [price, setPrice] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const opportunity = getOpportunityById(opportunityId);
    
    // Mocked professional ID, in a real app this would come from the logged-in user context
    const professionalId = 1; 

    if (!opportunity) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p>Oportunidade não encontrada.</p>
            </div>
        );
    }
    
    const handleSubmitProposal = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            submitProposal(opportunityId, professionalId, { message, price: parseFloat(price) });
            setSuccessMessage('Proposta enviada com sucesso! O cliente foi notificado.');
            setTimeout(() => {
                setCurrentPage('opportunities');
            }, 3000);
        } catch (error) {
            if (error instanceof Error) {
                 alert(`Erro: ${error.message}`);
            } else {
                 alert('Ocorreu um erro desconhecido.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/80">
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800 truncate">{opportunity.title}</h1>
                     <button onClick={() => setCurrentPage('opportunities')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-800">
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Voltar para Oportunidades
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800">{opportunity.title}</h2>
                            <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-wrap">{opportunity.description}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                             <h2 className="text-xl font-bold text-gray-800 mb-4">Enviar Proposta</h2>
                             <form onSubmit={handleSubmitProposal}>
                                <p className="text-sm text-gray-600 mb-4">Descreva como você pode ajudar e informe o valor total do serviço. Lembre-se, <span className="font-bold">{opportunity.creditsCost} créditos</span> serão deduzidos da sua conta.</p>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Valor Proposto (R$)</label>
                                    <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required placeholder="Ex: 150.00" className="mt-1 w-full p-2 border border-gray-300 rounded-md"/>
                                </div>
                                <div className="mt-4">
                                     <label htmlFor="message" className="block text-sm font-medium text-gray-700">Sua Mensagem para o Cliente</label>
                                     <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required rows={4} placeholder="Ex: Olá! Tenho experiência neste serviço e posso começar amanhã." className="mt-1 w-full p-2 border border-gray-300 rounded-md"></textarea>
                                </div>
                                <button type="submit" className="mt-4 w-full bg-[#2A8C82] text-white font-bold py-3 rounded-lg hover:bg-opacity-90">
                                    Enviar Proposta e Usar {opportunity.creditsCost} Créditos
                                </button>
                             </form>
                        </div>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Detalhes da Tarefa</h3>
                            <ul className="text-sm space-y-3">
                                <li className="flex items-center"><CalendarDaysIcon className="h-5 w-5 mr-3 text-gray-500"/> <div><strong>Prazo:</strong><br/>{opportunity.date}</div></li>
                                {opportunity.hasMaterials && <li className="flex items-center"><PackageIcon className="h-5 w-5 mr-3 text-gray-500"/> <div><strong>Materiais:</strong><br/>Fornecidos pelo cliente</div></li>}
                                {opportunity.isPlusClient && <li className="flex items-center"><SparklesIcon className="h-5 w-5 mr-3 text-gray-500"/> <div><strong>Cliente:</strong><br/>Vale Conecta Plus</div></li>}
                                <li className="flex items-center"><UsersIcon className="h-5 w-5 mr-3 text-gray-500"/> <div><strong>Concorrência:</strong><br/>{opportunity.proposalsSent} propostas enviadas</div></li>
                            </ul>
                         </div>
                    </div>
                </div>
            </main>
            {successMessage && (
                <SuccessToast 
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                />
            )}
        </div>
    );
};

export default OpportunityDetailPage;
