
import React from 'react';
import KpiCard from '../KpiCard';
import { DollarSignIcon, UsersIcon, ClipboardListIcon, ShieldCheckIcon } from '../../Icons';

const DashboardView = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <KpiCard title="Receita Bruta (GMV)" value="R$ 12.580,00" icon={<DollarSignIcon className="h-6 w-6 text-[#2A8C82]" />} />
                <KpiCard title="Receita Líquida" value="R$ 1.258,00" icon={<DollarSignIcon className="h-6 w-6 text-[#2A8C82]" />} />
                <KpiCard title="Novos Clientes (Mês)" value="124" icon={<UsersIcon className="h-6 w-6 text-[#2A8C82]" />} />
                <KpiCard title="Tarefas Ativas" value="32" icon={<ClipboardListIcon className="h-6 w-6 text-[#2A8C82]" />} />
            </div>

            {/* Action Alerts & Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Action Alerts */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="font-bold text-gray-800">Alertas de Ação</h2>
                    <ul className="mt-4 space-y-3">
                        <li className="flex justify-between items-center p-3 bg-yellow-100 rounded-md">
                            <span className="text-sm font-medium text-yellow-800">Verificações Pendentes</span>
                            <span className="text-sm font-bold text-yellow-800 bg-white px-2 py-0.5 rounded-full">2</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-blue-100 rounded-md">
                            <span className="text-sm font-medium text-blue-800">Saques a Aprovar</span>
                            <span className="text-sm font-bold text-blue-800 bg-white px-2 py-0.5 rounded-full">2</span>
                        </li>
                         <li className="flex justify-between items-center p-3 bg-red-100 rounded-md">
                            <span className="text-sm font-medium text-red-800">Disputas Abertas</span>
                            <span className="text-sm font-bold text-red-800 bg-white px-2 py-0.5 rounded-full">1</span>
                        </li>
                    </ul>
                </div>
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="font-bold text-gray-800">Receita (Últimos 30 dias)</h2>
                    <div className="mt-4 h-64 bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">[Gráfico de Linhas da Receita]</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
