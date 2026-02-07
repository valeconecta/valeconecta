
import React, { useState, useMemo, useEffect } from 'react';
import { transactions, withdrawalRequests } from '../../../data/adminMockData';
import { FinancialSubView } from '../../../pages/AdminPage';

const transactionStatusStyles: { [key: string]: string } = {
    'Concluído': 'bg-green-100 text-green-800',
    'Pendente': 'bg-yellow-100 text-yellow-800',
    'Falhou': 'bg-red-100 text-red-800',
};

interface FinancialViewProps {
    initialSubView: FinancialSubView;
}

const FinancialView: React.FC<FinancialViewProps> = ({ initialSubView }) => {
    const [activeTab, setActiveTab] = useState<FinancialSubView>(initialSubView);

    useEffect(() => {
        setActiveTab(initialSubView);
    }, [initialSubView]);

    // State for transactions filters and pagination
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('Todos');
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [page, setPage] = useState(1);
    const itemsPerPage = 7;

    const filteredTransactions = useMemo(() => {
        return transactions
            .filter(t => typeFilter === 'Todos' || t.type === typeFilter)
            .filter(t => statusFilter === 'Todos' || t.status === statusFilter)
            .filter(t => t.id.toLowerCase().includes(search.toLowerCase()) || t.user.toLowerCase().includes(search.toLowerCase()));
    }, [typeFilter, statusFilter, search]);

    const paginatedTransactions = useMemo(() => {
        const startIndex = (page - 1) * itemsPerPage;
        return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredTransactions, page]);
    
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);


    const renderTransactionsTable = () => (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Extrato Mestre de Transações</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input type="text" placeholder="Buscar por ID ou usuário..." value={search} onChange={e => setSearch(e.target.value)} className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-md text-sm"/>
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>Todos os Tipos</option>
                    <option>Pagamento Cliente</option>
                    <option>Comissão</option>
                    <option>Repasse Profissional</option>
                    <option>Saque</option>
                    <option>Reembolso</option>
                </select>
                 <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>Todos os Status</option>
                    <option>Concluído</option>
                    <option>Pendente</option>
                    <option>Falhou</option>
                </select>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">ID da Transação</th>
                            <th className="px-6 py-3">Data</th>
                            <th className="px-6 py-3">Tipo</th>
                            <th className="px-6 py-3">Usuário</th>
                            <th className="px-6 py-3">Valor</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedTransactions.map(t => (
                            <tr key={t.id} className="bg-white border-b">
                                <td className="px-6 py-4 font-mono text-xs">{t.id}</td>
                                <td className="px-6 py-4">{t.date}</td>
                                <td className="px-6 py-4 font-medium text-gray-800">{t.type}</td>
                                <td className="px-6 py-4">{t.user}</td>
                                <td className={`px-6 py-4 font-bold ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`${transactionStatusStyles[t.status]} text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full`}>
                                        {t.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">Página {page} de {totalPages}</span>
                <div className="flex space-x-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 text-sm border rounded-md disabled:opacity-50">Anterior</button>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 text-sm border rounded-md disabled:opacity-50">Próxima</button>
                </div>
            </div>
        </div>
    );

    const renderWithdrawalsTable = () => (
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Solicitações de Saque</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Profissional</th>
                            <th className="px-6 py-3">Valor</th>
                            <th className="px-6 py-3">Data</th>
                            <th className="px-6 py-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawalRequests.map(req => (
                            <tr key={req.id} className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-gray-900">{req.professional}</td>
                                <td className="px-6 py-4">{req.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td className="px-6 py-4">{req.date}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button className="text-xs font-bold text-red-600">NEGAR</button>
                                    <button className="text-xs font-bold text-white bg-green-600 px-3 py-1 rounded-md">APROVAR</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );


    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Financeiro</h1>

            <div className="mb-6 border-b border-gray-200">
                <nav className="flex space-x-4">
                    <button onClick={() => setActiveTab('transactions')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'transactions' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500'}`}>
                        Transações
                    </button>
                    <button onClick={() => setActiveTab('withdrawals')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'withdrawals' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500'}`}>
                        Solicitações de Saque
                    </button>
                </nav>
            </div>

            {activeTab === 'transactions' ? renderTransactionsTable() : renderWithdrawalsTable()}
        </div>
    );
};

export default FinancialView;
