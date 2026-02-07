
import React from 'react';
import { DetailedTask } from '../../data/taskDetailMockData';
import { StarIcon, LifeBuoyIcon } from '../Icons';

interface ReferencePanelProps {
    task: DetailedTask;
    client: { id: number, name: string, photoUrl: string };
    professional: { id: number, name: string, photoUrl: string, rating: number };
    currentUserRole: 'client' | 'professional';
}

const ReferencePanel: React.FC<ReferencePanelProps> = ({ task, client, professional, currentUserRole }) => {
    
    const ParticipantCard = () => {
        if (currentUserRole === 'client') {
            return (
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Profissional</h3>
                    <div className="flex items-center space-x-3">
                        <img src={professional.photoUrl} alt={professional.name} className="w-14 h-14 rounded-full" />
                        <div>
                            <p className="font-semibold text-gray-800">{professional.name}</p>
                            <div className="flex items-center text-sm">
                                <StarIcon className="w-4 h-4 text-yellow-400 mr-1"/>
                                {professional.rating}
                            </div>
                        </div>
                    </div>
                 </div>
            );
        }
        return (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Cliente</h3>
                <div className="flex items-center space-x-3">
                    <img src={client.photoUrl} alt={client.name} className="w-14 h-14 rounded-full" />
                    <div>
                        <p className="font-semibold text-gray-800">{client.name}</p>
                        <p className="text-sm text-gray-600">{task.address}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <ParticipantCard />
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Resumo Financeiro</h3>
                <ul className="text-sm space-y-2">
                    <li className="flex justify-between"><span>Custo do Serviço</span><span className="font-semibold">{task.financials.serviceCost.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span></li>
                    <li className="flex justify-between"><span>Custo dos Materiais</span><span className="font-semibold">{task.financials.materialsCost.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span></li>
                    <li className="flex justify-between text-base font-bold pt-2 border-t"><span>Valor Total Pago</span><span>{task.financials.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span></li>
                </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                 <h3 className="text-lg font-bold text-gray-800 mb-3">Detalhes da Tarefa</h3>
                 <div className="text-sm space-y-2">
                    <p><strong>Agendado para:</strong> {task.scheduledDateTime}</p>
                    <p><strong>Categoria:</strong> {task.category}</p>
                    <p><strong>Endereço:</strong> {task.address}</p>
                    <div className="pt-2 border-t mt-2">
                        <p className="font-semibold">Descrição Original:</p>
                        <p className="text-gray-600 whitespace-pre-wrap">{task.description}</p>
                    </div>
                 </div>
            </div>
            
            <button className="w-full flex items-center justify-center bg-red-50 border border-red-200 text-red-700 font-bold py-3 rounded-lg hover:bg-red-100">
                <LifeBuoyIcon className="h-5 w-5 mr-2" />
                Contatar Suporte
            </button>
        </div>
    );
};

export default ReferencePanel;
