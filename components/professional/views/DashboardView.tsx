
import React from 'react';
import { ProfessionalView } from '../ProfessionalLayout';
import { dashboardData } from '../../../data/professionalMockData';
import { BellIcon, MessageCircleIcon, CalendarDaysIcon, StarIcon, AwardIcon } from '../../Icons';

interface DashboardViewProps {
  setActiveView: (view: ProfessionalView) => void;
}

const ActionCard: React.FC<{ icon: React.ReactNode, title: string, onClick: () => void }> = ({ icon, title, onClick }) => (
    <button onClick={onClick} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-[#2A8C82] hover:shadow-md transition-all flex items-center space-x-3">
        {icon}
        <span className="font-medium text-gray-700">{title}</span>
    </button>
);

const FinancialKpi: React.FC<{ title: string, value: number, currency?: boolean }> = ({ title, value, currency = true }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">
            {currency ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : value}
        </p>
    </div>
);

const DashboardView: React.FC<DashboardViewProps> = ({ setActiveView }) => {
    const { kpis, financials, reputation, upcomingServices } = dashboardData;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Seu Escritório Digital</h1>
            <p className="mt-1 text-gray-600">Bem-vindo, Carlos! Aqui está um resumo do seu negócio hoje.</p>
            
            {/* Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <ActionCard 
                    icon={<BellIcon className="h-6 w-6 text-yellow-500"/>}
                    title={`${kpis.newOpportunities} novas oportunidades`}
                    onClick={() => setActiveView('opportunities')}
                />
                <ActionCard 
                    icon={<MessageCircleIcon className="h-6 w-6 text-blue-500"/>}
                    title={`${kpis.unreadMessages} mensagens não lidas`}
                    onClick={() => setActiveView('opportunities')}
                />
                 <ActionCard 
                    icon={<CalendarDaysIcon className="h-6 w-6 text-green-500"/>}
                    title={`${kpis.tasksToday} tarefas para hoje`}
                    onClick={() => setActiveView('services')}
                />
            </div>

            {/* Financials & Reputation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FinancialKpi title="Disponível para Saque" value={financials.availableForWithdrawal} />
                    <FinancialKpi title="Ganhos no Mês" value={financials.monthlyEarnings} />
                    <FinancialKpi title="Saldo Pendente" value={financials.pendingBalance} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-center">
                    <p className="text-sm text-gray-500">Sua Reputação</p>
                    <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center">
                            <StarIcon className="h-6 w-6 text-yellow-400" />
                            <span className="text-xl font-bold ml-1">{reputation.averageRating}</span>
                        </div>
                         <div className="flex items-center">
                            <AwardIcon className="h-6 w-6 text-yellow-600" />
                            <span className="text-sm font-medium ml-1">{reputation.ultimaMedalha}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Services */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">Próximos Serviços</h2>
                <ul className="mt-4 divide-y divide-gray-200">
                    {upcomingServices.map(service => (
                        <li key={service.id} className="py-3 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-800">{service.title}</p>
                                <p className="text-sm text-gray-500">{service.client}</p>
                            </div>
                            <span className="font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm">{service.time}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardView;
