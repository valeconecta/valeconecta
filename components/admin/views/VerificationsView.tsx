
import React from 'react';
import { verificationRequests } from '../../../data/adminMockData';

const VerificationsView = () => {
    const request = verificationRequests[0]; // Pegando a primeira requisição para o exemplo

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Verificações e Onboarding</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Fila de Verificação ({verificationRequests.length} pendentes)</h2>
                
                {/* Interface de Verificação Lado a Lado */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-lg">{request.name} - <span className="text-gray-500 font-medium">Enviado em {request.date}</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {/* Lado Esquerdo: Documentos */}
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Documento Enviado</h4>
                            <div className="bg-gray-100 rounded-md flex items-center justify-center h-64">
                                <img src={request.docUrl} alt="Documento do profissional" className="max-h-full max-w-full rounded-md" />
                            </div>
                        </div>
                        {/* Lado Direito: Dados do Formulário */}
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Dados do Formulário</h4>
                            <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                                <div>
                                    <label className="text-xs font-medium text-gray-500">Documento</label>
                                    <p className="font-mono text-sm text-gray-800">{request.formData.doc}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500">Endereço</label>
                                    <p className="text-sm text-gray-800">{request.formData.address}</p>
                                </div>
                            </div>
                            {/* Ações */}
                            <div className="flex space-x-4 mt-6">
                                <button className="flex-1 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700">Rejeitar</button>
                                <button className="flex-1 bg-[#2A8C82] text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90">Aprovar Verificação</button>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Lista de Próximos na Fila */}
                 <div className="mt-6">
                     <h3 className="font-semibold text-gray-700">Próximo na fila:</h3>
                     <p className="text-sm text-gray-600">{verificationRequests[1].name}</p>
                 </div>
            </div>
        </div>
    );
};

export default VerificationsView;
