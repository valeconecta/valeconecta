
import React, { useState, useMemo } from 'react';
import { tasks } from '../../../data/adminMockData';
import { MoreHorizontalIcon } from '../../Icons';

const statusStyles: { [key: string]: string } = {
    'Em Andamento': 'bg-blue-100 text-blue-800',
    'Concluído': 'bg-green-100 text-green-800',
    'Cancelado': 'bg-gray-100 text-gray-800',
    'Em Disputa': 'bg-red-100 text-red-800',
};

const ActionMenu: React.FC<{ onSelect: (action: string) => void }> = ({ onSelect }) => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
        <button onClick={() => onSelect('view')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ver Detalhes</button>
        <button onClick={() => onSelect('dispute')} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Intervir na Disputa</button>
    </div>
);

const TasksView = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [page, setPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const itemsPerPage = 5;

    const filteredTasks = useMemo(() => {
        return tasks
            .filter(t => statusFilter === 'Todos' || t.status === statusFilter)
            .filter(t => 
                t.id.toLowerCase().includes(search.toLowerCase()) || 
                t.client.toLowerCase().includes(search.toLowerCase()) || 
                t.professional.toLowerCase().includes(search.toLowerCase())
            );
    }, [statusFilter, search]);

    const paginatedTasks = useMemo(() => {
        const startIndex = (page - 1) * itemsPerPage;
        return filteredTasks.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredTasks, page]);
    
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

    const handleAction = (taskId: string, action: string) => {
        console.log(`Action: ${action} on task ID: ${taskId}`);
        setOpenMenuId(null);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestão de Tarefas e Serviços</h1>
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">Todas as Tarefas</h2>
                    <div className="flex space-x-2 w-full md:w-auto">
                        <input type="text" placeholder="Buscar por ID, cliente, prof..." value={search} onChange={e => setSearch(e.target.value)} className="flex-grow px-3 py-2 border border-gray-300 rounded-md text-sm"/>
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                            <option>Todos</option>
                            <option>Em Andamento</option>
                            <option>Concluído</option>
                            <option>Cancelado</option>
                            <option>Em Disputa</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">ID da Tarefa</th>
                                <th className="px-6 py-3">Serviço</th>
                                <th className="px-6 py-3">Cliente</th>
                                <th className="px-6 py-3">Profissional</th>
                                <th className="px-6 py-3">Valor</th>
                                <th className="px-6 py-3">Data</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTasks.map(task => (
                                <tr key={task.id} className="bg-white border-b">
                                    <td className="px-6 py-4 font-mono text-xs">{task.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{task.service}</td>
                                    <td className="px-6 py-4">{task.client}</td>
                                    <td className="px-6 py-4">{task.professional}</td>
                                    <td className="px-6 py-4 font-bold text-gray-800">{task.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td className="px-6 py-4">{task.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`${statusStyles[task.status]} text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="relative inline-block">
                                            <button onClick={() => setOpenMenuId(openMenuId === task.id ? null : task.id)} className="p-1 rounded-full hover:bg-gray-200">
                                                <MoreHorizontalIcon className="h-5 w-5 text-gray-600" />
                                            </button>
                                            {openMenuId === task.id && <ActionMenu onSelect={(action) => handleAction(task.id, action)} />}
                                        </div>
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
        </div>
    );
};

export default TasksView;
