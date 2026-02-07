
import React, { useState } from 'react';
import { supportTickets } from '../../../data/adminMockData';
import { ArrowLeftIcon, ClipboardListIcon, UsersIcon } from '../../Icons';

type Message = {
    sender: 'client' | 'professional' | 'admin';
    text: string;
    timestamp: string;
};

type Ticket = {
    id: string;
    subject: string;
    client: string;
    professional: string | null;
    status: 'Em Análise' | 'Aguardando Resposta' | 'Resolvido';
    priority: 'Alta' | 'Média' | 'Baixa';
    openDate: string;
    relatedTask: {
        id: string;
        title: string;
        value: number;
    } | null;
    messages: Message[];
};

const statusStyles: { [key: string]: string } = {
    'Em Análise': 'bg-blue-100 text-blue-800',
    'Aguardando Resposta': 'bg-yellow-100 text-yellow-800',
    'Resolvido': 'bg-green-100 text-green-800',
};

const priorityStyles: { [key: string]: string } = {
    'Alta': 'text-red-600',
    'Média': 'text-yellow-600',
    'Baixa': 'text-gray-500',
};

const SupportView = () => {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    const renderTicketList = () => (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Fila de Atendimento</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Ticket</th>
                            <th className="px-6 py-3">Assunto</th>
                            <th className="px-6 py-3">Envolvidos</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Prioridade</th>
                            <th className="px-6 py-3">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supportTickets.map(ticket => (
                            <tr key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="bg-white border-b hover:bg-gray-50 cursor-pointer">
                                <td className="px-6 py-4 font-mono text-xs">{ticket.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{ticket.subject}</td>
                                <td className="px-6 py-4">{ticket.professional ? `${ticket.client} vs ${ticket.professional}` : ticket.client}</td>
                                <td className="px-6 py-4">
                                    <span className={`${statusStyles[ticket.status]} text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full`}>{ticket.status}</span>
                                </td>
                                <td className={`px-6 py-4 font-bold ${priorityStyles[ticket.priority]}`}>{ticket.priority}</td>
                                <td className="px-6 py-4">{ticket.openDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderTicketDetail = (ticket: Ticket) => (
        <div>
            <button onClick={() => setSelectedTicket(null)} className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-800 mb-4">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Voltar para a lista
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main conversation */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
                    <div className="p-4 border-b">
                        <h3 className="font-bold text-lg text-gray-800">{ticket.subject}</h3>
                        <p className="text-sm text-gray-500">Ticket <span className="font-mono">{ticket.id}</span></p>
                    </div>
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 h-96">
                        {ticket.messages.map((msg, index) => (
                             <div key={index} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-lg px-4 py-2 rounded-xl ${
                                    msg.sender === 'admin' ? 'bg-[#2A8C82] text-white' : 
                                    msg.sender === 'client' ? 'bg-blue-100 text-blue-900' : 'bg-gray-200 text-gray-800'}`}>
                                    <p className="text-sm font-bold capitalize">{msg.sender}</p>
                                    <p className="text-sm">{msg.text}</p>
                                    <p className="text-xs opacity-70 text-right mt-1">{msg.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-white border-t">
                        <textarea placeholder="Digite sua resposta..." className="w-full p-2 border rounded-md text-sm" rows={3}></textarea>
                        <button className="mt-2 bg-[#2A8C82] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90">Enviar Resposta</button>
                    </div>
                </div>

                {/* Context Sidebar */}
                <div className="space-y-6">
                     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-3">Gerenciar Ticket</h4>
                        <div className="space-y-2">
                             <div>
                                <label className="text-xs font-medium">Status</label>
                                <select className="w-full p-2 border rounded-md text-sm">
                                    <option>Em Análise</option>
                                    <option>Aguardando Resposta</option>
                                    <option>Resolvido</option>
                                </select>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">Atualizar</button>
                        </div>
                    </div>
                    {ticket.relatedTask && (
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h4 className="font-bold text-gray-800 flex items-center mb-2"><ClipboardListIcon className="h-5 w-5 mr-2" /> Detalhes da Tarefa</h4>
                            <p className="text-sm text-gray-600"><strong>ID:</strong> <span className="font-mono">{ticket.relatedTask.id}</span></p>
                            <p className="text-sm text-gray-600"><strong>Serviço:</strong> {ticket.relatedTask.title}</p>
                            <p className="text-sm text-gray-600"><strong>Valor:</strong> {ticket.relatedTask.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    )}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                         <h4 className="font-bold text-gray-800 flex items-center mb-2"><UsersIcon className="h-5 w-5 mr-2" /> Usuários Envolvidos</h4>
                        <p className="text-sm text-gray-600"><strong>Cliente:</strong> <a href="#" className="text-blue-600 hover:underline">{ticket.client}</a></p>
                        {ticket.professional && <p className="text-sm text-gray-600"><strong>Profissional:</strong> <a href="#" className="text-blue-600 hover:underline">{ticket.professional}</a></p>}
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Suporte e Disputas</h1>
            {selectedTicket ? renderTicketDetail(selectedTicket) : renderTicketList()}
        </div>
    );
};

export default SupportView;
