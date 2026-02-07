
import React, { useState, useEffect, useMemo } from 'react';
import { clients } from '../../../data/adminMockData';
import { professionals } from '../../../data/professionals';
import { UserSubView } from '../../../pages/AdminPage';
import { MoreHorizontalIcon } from '../../Icons';

interface UsersViewProps {
    initialSubView: UserSubView;
}

const statusStyles: { [key: string]: string } = {
    'Ativo': 'bg-green-100 text-green-800',
    'Suspenso': 'bg-yellow-100 text-yellow-800',
    'Banido': 'bg-red-100 text-red-800',
}

const ActionMenu: React.FC<{ onSelect: (action: string) => void }> = ({ onSelect }) => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
        <button onClick={() => onSelect('view')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ver Perfil</button>
        <button onClick={() => onSelect('suspend')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Suspender Conta</button>
        <button onClick={() => onSelect('reset_pw')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Resetar Senha</button>
    </div>
);

const UsersView: React.FC<UsersViewProps> = ({ initialSubView }) => {
    const [activeTab, setActiveTab] = useState<UserSubView>(initialSubView);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    useEffect(() => {
        setActiveTab(initialSubView);
    }, [initialSubView]);
    
    // Client state
    const [clientStatusFilter, setClientStatusFilter] = useState('Todos');
    const [clientSearch, setClientSearch] = useState('');
    const [clientPage, setClientPage] = useState(1);
    const clientsPerPage = 7;

    const filteredClients = useMemo(() => {
        return clients
            .filter(c => clientStatusFilter === 'Todos' || c.status === clientStatusFilter)
            .filter(c => c.name.toLowerCase().includes(clientSearch.toLowerCase()) || c.email.toLowerCase().includes(clientSearch.toLowerCase()));
    }, [clientStatusFilter, clientSearch]);

    const paginatedClients = useMemo(() => {
        const startIndex = (clientPage - 1) * clientsPerPage;
        return filteredClients.slice(startIndex, startIndex + clientsPerPage);
    }, [filteredClients, clientPage]);
    
    const totalClientPages = Math.ceil(filteredClients.length / clientsPerPage);

    const handleAction = (clientId: number, action: string) => {
        console.log(`Action: ${action} on client ID: ${clientId}`);
        setOpenMenuId(null);
    };
    
    const renderClientsTable = () => (
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">Clientes</h2>
                <div className="flex space-x-2">
                    <input type="text" placeholder="Buscar cliente..." value={clientSearch} onChange={e => setClientSearch(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full md:w-auto"/>
                    <select value={clientStatusFilter} onChange={e => setClientStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Todos</option>
                        <option>Ativo</option>
                        <option>Suspenso</option>
                        <option>Banido</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Nome</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Data de Cadastro</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedClients.map(client => (
                            <tr key={client.id} className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-gray-900">{client.name}</td>
                                <td className="px-6 py-4">{client.email}</td>
                                <td className="px-6 py-4">{client.joinDate}</td>
                                <td className="px-6 py-4">
                                    <span className={`${statusStyles[client.status]} text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full`}>
                                        {client.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="relative inline-block">
                                        <button onClick={() => setOpenMenuId(openMenuId === client.id ? null : client.id)} className="p-1 rounded-full hover:bg-gray-200">
                                            <MoreHorizontalIcon className="h-5 w-5 text-gray-600" />
                                        </button>
                                        {openMenuId === client.id && <ActionMenu onSelect={(action) => handleAction(client.id, action)} />}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">Página {clientPage} de {totalClientPages}</span>
                <div className="flex space-x-2">
                    <button onClick={() => setClientPage(p => Math.max(1, p - 1))} disabled={clientPage === 1} className="px-3 py-1 text-sm border rounded-md disabled:opacity-50">Anterior</button>
                    <button onClick={() => setClientPage(p => Math.min(totalClientPages, p + 1))} disabled={clientPage === totalClientPages} className="px-3 py-1 text-sm border rounded-md disabled:opacity-50">Próxima</button>
                </div>
            </div>
        </div>
    );
    
    const renderProfessionalsTable = () => (
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Profissionais (Conectados)</h2>
            <p>Tabela de profissionais será implementada aqui.</p>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestão de Usuários</h1>
            <div className="mb-6 border-b border-gray-200">
                <nav className="flex space-x-4">
                    <button onClick={() => setActiveTab('clients')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'clients' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500'}`}>
                        Clientes
                    </button>
                    <button onClick={() => setActiveTab('professionals')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'professionals' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500'}`}>
                        Profissionais
                    </button>
                </nav>
            </div>

            {activeTab === 'clients' ? renderClientsTable() : renderProfessionalsTable()}
        </div>
    );
};

export default UsersView;
