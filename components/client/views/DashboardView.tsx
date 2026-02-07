
import React, { useState } from 'react';
import { ClientView } from '../ClientLayout';
import { dashboardData } from '../../../data/clientMockData';
import { BellIcon, CalendarDaysIcon, MessageCircleIcon, PlusCircleIcon } from '../../Icons';
import CreateTaskModal from '../CreateTaskModal';

interface DashboardViewProps {
  setActiveView: (view: ClientView) => void;
  onTaskCreated: () => void;
}

const AlertCard: React.FC<{ icon: React.ReactNode; text: string; onClick: () => void }> = ({ icon, text, onClick }) => (
    <button onClick={onClick} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-[#2A8C82] hover:shadow-md transition-all flex items-center space-x-3 w-full">
        {icon}
        <span className="font-medium text-gray-700 text-sm sm:text-base">{text}</span>
    </button>
);

const statusStyles: { [key: string]: string } = {
    'Avaliando Propostas': 'bg-yellow-100 text-yellow-800',
    'Agendado': 'bg-blue-100 text-blue-800',
};

const DashboardView: React.FC<DashboardViewProps> = ({ setActiveView, onTaskCreated }) => {
    const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
    const { alerts, activeTasks } = dashboardData;

    const getAlertIcon = (text: string) => {
        if (text.includes('propostas')) return <BellIcon className="h-6 w-6 text-yellow-500" />;
        if (text.includes('agendados')) return <CalendarDaysIcon className="h-6 w-6 text-green-500" />;
        if (text.includes('mensagens')) return <MessageCircleIcon className="h-6 w-6 text-blue-500" />;
        return <BellIcon className="h-6 w-6 text-gray-500" />;
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Olá, Mariana!</h1>
                    <p className="mt-1 text-gray-600">Bem-vinda de volta. Vamos cuidar da sua casa?</p>
                </div>
                <button 
                    onClick={() => setCreateTaskModalOpen(true)}
                    className="w-full md:w-auto mt-4 md:mt-0 flex items-center justify-center bg-[#2A8C82] text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
                >
                    <PlusCircleIcon className="h-6 w-6 mr-2" />
                    Criar Nova Tarefa
                </button>
            </div>
            
            {/* Action Alerts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {alerts.map(alert => (
                    <AlertCard 
                        key={alert.id}
                        icon={getAlertIcon(alert.text)}
                        text={alert.text}
                        onClick={() => setActiveView('tasks')}
                    />
                ))}
            </div>

            {/* Active Tasks */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center">
                     <h2 className="text-xl font-bold text-gray-800">Tarefas Ativas</h2>
                     <button onClick={() => setActiveView('tasks')} className="text-sm font-semibold text-[#2A8C82] hover:underline">
                         Ver todas
                     </button>
                </div>
                <ul className="mt-4 divide-y divide-gray-200">
                    {activeTasks.map(task => (
                        <li key={task.id} className="py-3 flex justify-between items-center">
                            <p className="font-semibold text-gray-800">{task.title}</p>
                            <span className={`${statusStyles[task.status]} text-xs font-bold px-3 py-1 rounded-full`}>
                                {task.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <CreateTaskModal 
                isOpen={isCreateTaskModalOpen}
                onClose={() => setCreateTaskModalOpen(false)}
                onTaskCreated={() => {
                    setCreateTaskModalOpen(false);
                    onTaskCreated();
                }}
            />
        </div>
    );
};

export default DashboardView;
