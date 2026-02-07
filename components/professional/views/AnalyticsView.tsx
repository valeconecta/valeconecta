
import React from 'react';
import { analyticsData } from '../../../data/professionalMockData';

const KpiCard: React.FC<{ title: string; value: string; description: string }> = ({ title, value, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-[#2A8C82] mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-2">{description}</p>
    </div>
);

const AnalyticsView: React.FC = () => {
    const { conversionRate, revenueByCategory } = analyticsData;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Seu Desempenho</h1>
            <p className="text-gray-600 mb-6">Entenda seus resultados para tomar as melhores decisões.</p>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KpiCard title="Taxa de Conversão" value={`${conversionRate}%`} description="Das propostas que você envia, 1 em cada 4 viram serviço." />
                <KpiCard title="Avaliação Média" value="4.9 ★" description="Mantendo a excelência no atendimento." />
                <KpiCard title="Tempo de Resposta" value="~2 horas" description="Clientes apreciam respostas rápidas." />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg text-gray-800">Faturamento por Categoria</h3>
                    <div className="mt-4 h-64 bg-gray-50 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">[Gráfico de Pizza: Faturamento]</p>
                    </div>
                     <div className="mt-4 space-y-2">
                        {revenueByCategory.map(cat => (
                            <div key={cat.name} className="flex justify-between text-sm">
                                <span className="text-gray-600">{cat.name}</span>
                                <span className="font-semibold text-gray-800">{cat.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg text-gray-800">Evolução da Avaliação</h3>
                     <div className="mt-4 h-64 bg-gray-50 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">[Gráfico de Linha: Avaliações]</p>
                    </div>
                     <p className="text-xs text-center text-gray-500 mt-2">Sua avaliação média tem se mantido consistentemente alta nos últimos meses.</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;
