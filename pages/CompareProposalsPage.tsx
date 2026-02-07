
import React, { useState } from 'react';
import { Page } from '../types';
import { proposalsByTaskId, acceptProposal } from '../data/clientMockData';
import { ArrowLeftIcon, ShieldCheckIcon } from '../components/Icons';
import ProposalCard from '../components/client/ProposalCard';
import ClientHeader from '../components/client/ClientHeader';
import AcceptProposalModal from '../components/client/AcceptProposalModal';
import { DetailedProfessional } from '../data/professionalProfileMockData';

interface CompareProposalsPageProps {
  taskId: number;
  setCurrentPage: (page: Page, id?: number) => void;
}

const CompareProposalsPage: React.FC<CompareProposalsPageProps> = ({ taskId, setCurrentPage }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<DetailedProfessional | null>(null);

  const data = proposalsByTaskId[taskId as keyof typeof proposalsByTaskId];

  if (!data) {
    return (
      <div className="text-center py-10">
        <p>Tarefa não encontrada ou sem propostas.</p>
        <button onClick={() => setCurrentPage('client-dashboard')} className="text-blue-600">Voltar ao Painel</button>
      </div>
    );
  }

  const handleAcceptClick = (professional: DetailedProfessional) => {
    setSelectedProfessional(professional);
    setModalOpen(true);
  };
  
  const handleConfirmAcceptance = () => {
    if (!selectedProfessional) return;
    
    // Simula a lógica do backend: aceita a proposta, processa o pagamento, atualiza o status da tarefa.
    acceptProposal(taskId, selectedProfessional.id);
    
    alert(`Proposta aceita! O pagamento foi processado com segurança. O serviço com ${selectedProfessional.name} foi agendado.`);
    
    setModalOpen(false);
    setCurrentPage('client-dashboard');
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      <ClientHeader activeView="tasks" setActiveView={() => {}} setCurrentPage={setCurrentPage} isSubPage />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => setCurrentPage('client-dashboard')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Voltar para Minhas Tarefas
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800">Compare as Propostas</h1>
        <p className="mt-2 text-lg text-gray-600">Para: <span className="font-semibold">{data.taskTitle}</span></p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.proposals.map(prof => (
            <ProposalCard 
              key={prof.id}
              professional={prof}
              onAccept={() => handleAcceptClick(prof)}
              onChat={() => alert(`Iniciando chat com ${prof.name}`)}
              setCurrentPage={setCurrentPage}
            />
          ))}
        </div>

        <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6 flex items-start">
            <ShieldCheckIcon className="h-8 w-8 text-green-600 flex-shrink-0 mr-4" />
            <div>
                <h3 className="font-bold text-green-800">Seu pagamento está seguro.</h3>
                <p className="text-sm text-green-700 mt-1">
                    Lembre-se: seu pagamento fica retido conosco e só é liberado para o profissional 3 dias após você confirmar a conclusão do serviço. Isso é parte da nossa Garantia de Confiança.
                </p>
            </div>
        </div>

      </main>
      
      {selectedProfessional && (
        <AcceptProposalModal 
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirmAcceptance}
            professional={selectedProfessional}
            taskTitle={data.taskTitle}
        />
      )}
    </div>
  );
};

export default CompareProposalsPage;