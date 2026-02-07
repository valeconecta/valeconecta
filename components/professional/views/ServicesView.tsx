
import React, { useState } from 'react';
import { services } from '../../../data/professionalMockData';
import { ListIcon, CalendarDaysIcon } from '../../Icons';
import { Page } from '../../../types';

type ViewMode = 'list' | 'calendar';

interface ServicesViewProps {
    setCurrentPage: (page: Page, id?: number) => void;
}

const statusStyles: { [key: string]: string } = {
    'Agendado': 'bg-blue-100 text-blue-800',
    'Concluído': 'bg-green-100 text-green-800',
};

const ServicesView: React.FC<ServicesViewProps> = ({ setCurrentPage }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const renderListView = () => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Serviço</th>
                        <th className="px-6 py-3">Cliente</th>
                        <th className="px-6 py-3">Data</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                            <td className="px-6 py-4">{service.client}</td>
                            <td className="px-6 py-4">{service.date}</td>
                            <td className="px-6 py-4">
                                <span className={`${statusStyles[service.status]} text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full`}>{service.status}</span>
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => setCurrentPage('task-detail', parseInt(service.id.split('-')[1]))} className="font-medium text-[#2A8C82] hover:underline">Ver Detalhes</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderCalendarView = () => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-96 flex items-center justify-center">
            <p className="text-gray-500">[Visualização de Calendário - Em breve]</p>
        </div>
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Meus Serviços e Agenda</h1>
                    <p className="text-gray-600 mt-1">Gerencie seus trabalhos confirmados.</p>
                </div>
                <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mt-4 md:mt-0">
                    <button onClick={() => setViewMode('list')} className={`flex items-center px-3 py-1.5 text-sm font-semibold rounded-md ${viewMode === 'list' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}>
                        <ListIcon className="h-4 w-4 mr-2" />
                        Lista
                    </button>
                    <button onClick={() => setViewMode('calendar')} className={`flex items-center px-3 py-1.5 text-sm font-semibold rounded-md ${viewMode === 'calendar' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}>
                        <CalendarDaysIcon className="h-4 w-4 mr-2" />
                        Calendário
                    </button>
                </div>
            </div>

            {viewMode === 'list' ? renderListView() : renderCalendarView()}
        </div>
    );
};

export default ServicesView;
