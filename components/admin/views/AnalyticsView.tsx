
import React, { useState } from 'react';
import KpiCard from '../KpiCard';
import { DollarSignIcon, UsersIcon, ClipboardListIcon, DownloadIcon } from '../../Icons';
import { analyticsKpis, categoryDistribution, topServices, topProfessionals } from '../../../data/adminMockData';

type Period = 'today' | '7d' | '30d' | 'custom';

const AnalyticsView = () => {
    const [activePeriod, setActivePeriod] = useState<Period>('30d');

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Analytics e Relatórios</h1>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
                        <button onClick={() => setActivePeriod('today')} className={`px-3 py-1 text-sm font-semibold rounded-md ${activePeriod === 'today' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}>Hoje</button>
                        <button onClick={() => setActivePeriod('7d')} className={`px-3 py-1 text-sm font-semibold rounded-md ${activePeriod === '7d' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}>7 dias</button>
                        <button onClick={() => setActivePeriod('30d')} className={`px-3 py-1 text-sm font-semibold rounded-md ${activePeriod === '30d' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}>30 dias</button>
                    </div>
                     <button className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Exportar
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Receita Bruta (GMV)" value={analyticsKpis.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={<DollarSignIcon className="h-6 w-6 text-[#2A8C82]" />} />
                <KpiCard title="Tarefas Concluídas" value={analyticsKpis.completedTasks.toString()} icon={<ClipboardListIcon className="h-6 w-6 text-[#2A8C82]" />} />
                <KpiCard title="Novos Usuários" value={analyticsKpis.newUsers.toString()} icon={<UsersIcon className="h-6 w-6 text-[#2A8C82]" />} />
                <KpiCard title="Valor Médio por Tarefa" value={analyticsKpis.avgTaskValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={<DollarSignIcon className="h-6 w-6 text-[#2A8C82]" />} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="font-bold text-gray-800">Receita vs. Período</h2>
                    <div className="mt-4 h-80 bg-gray-50 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">[Gráfico de Barras da Receita]</p>
                    </div>
                </div>
                {/* Category Distribution */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                     <h2 className="font-bold text-gray-800">Distribuição por Categoria</h2>
                     <div className="mt-4 h-80 bg-gray-50 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">[Gráfico de Pizza]</p>
                    </div>
                </div>
            </div>

            {/* Data Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Top Services */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="font-bold text-gray-800 mb-4">Serviços Mais Populares</h2>
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-2">Serviço</th>
                                <th className="px-4 py-2 text-center">Concluídos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topServices.map(service => (
                                <tr key={service.id} className="border-b">
                                    <td className="px-4 py-2 font-medium text-gray-800">{service.name}</td>
                                    <td className="px-4 py-2 text-center">{service.completed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {/* Top Professionals */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="font-bold text-gray-800 mb-4">Top Profissionais</h2>
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-2">Profissional</th>
                                <th className="px-4 py-2 text-center">Tarefas</th>
                                <th className="px-4 py-2 text-right">Faturamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topProfessionals.map(pro => (
                                <tr key={pro.id} className="border-b">
                                    <td className="px-4 py-2 font-medium text-gray-800">{pro.name}</td>
                                    <td className="px-4 py-2 text-center">{pro.tasks}</td>
                                    <td className="px-4 py-2 text-right">{pro.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;
