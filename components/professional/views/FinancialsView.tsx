
import React, { useState } from 'react';
import { financialData } from '../../../data/professionalMockData';

type FinancialTab = 'overview' | 'statement' | 'withdraw' | 'credits';

const FinancialsView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<FinancialTab>('overview');
    const { summary, transactions, creditPackages } = financialData;

    const renderOverview = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg text-gray-800">Faturamento (Últimos 30 dias)</h3>
                <div className="mt-4 h-64 bg-gray-50 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">[Gráfico de Faturamento]</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">Saldo Total</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{summary.totalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">Disponível para Saque</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{summary.availableForWithdrawal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">Saldo Pendente</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{summary.pendingBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
        </div>
    );
    
    const renderStatement = () => (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Extrato Detalhado</h3>
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Data</th>
                        <th className="px-6 py-3">Descrição</th>
                        <th className="px-6 py-3 text-right">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(t => (
                        <tr key={t.id} className="border-b">
                            <td className="px-6 py-4">{t.date}</td>
                            <td className="px-6 py-4">{t.description}</td>
                            <td className={`px-6 py-4 text-right font-semibold ${t.amount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderWithdraw = () => (
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-lg mx-auto">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Solicitar Saque</h3>
            <p className="text-sm text-gray-600 mb-4">O valor será transferido para sua conta bancária cadastrada em até 2 dias úteis.</p>
            <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center">
                 <p className="text-sm text-green-700">Valor disponível</p>
                 <p className="text-3xl font-bold text-green-800">{summary.availableForWithdrawal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <button className="mt-6 w-full bg-[#2A8C82] text-white font-bold py-3 rounded-lg hover:bg-opacity-90">Solicitar Saque Total</button>
        </div>
    );
    
    const renderCredits = () => (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Comprar Créditos</h3>
            <p className="text-sm text-gray-600 mb-6">Use créditos para enviar propostas para novas oportunidades.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {creditPackages.map(pkg => (
                    <div key={pkg.credits} className={`p-6 rounded-lg border-2 text-center ${pkg.popular ? 'border-[#2A8C82]' : 'border-gray-200'}`}>
                        <h4 className="text-2xl font-bold text-gray-800">{pkg.credits} créditos</h4>
                        <p className="text-3xl font-extrabold text-[#2A8C82] my-4">{pkg.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <button className={`w-full font-bold py-2 rounded-lg ${pkg.popular ? 'bg-[#2A8C82] text-white' : 'bg-gray-200 text-gray-800'}`}>Comprar</button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Minha Carteira</h1>
            <div className="mb-6 border-b border-gray-200">
                <nav className="flex space-x-2 sm:space-x-4 -mb-px">
                    <button onClick={() => setActiveTab('overview')} className={`py-2 px-2 sm:px-4 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500'}`}>Visão Geral</button>
                    <button onClick={() => setActiveTab('statement')} className={`py-2 px-2 sm:px-4 text-sm font-medium ${activeTab === 'statement' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500'}`}>Extrato</button>
                    <button onClick={() => setActiveTab('withdraw')} className={`py-2 px-2 sm:px-4 text-sm font-medium ${activeTab === 'withdraw' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500'}`}>Saque</button>
                    <button onClick={() => setActiveTab('credits')} className={`py-2 px-2 sm:px-4 text-sm font-medium ${activeTab === 'credits' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500'}`}>Créditos</button>
                </nav>
            </div>
            
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'statement' && renderStatement()}
            {activeTab === 'withdraw' && renderWithdraw()}
            {activeTab === 'credits' && renderCredits()}
        </div>
    );
};

export default FinancialsView;
