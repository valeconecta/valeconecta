import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { getProposalsByTaskId, acceptProposal as acceptProposalService } from '../supabaseService';
import { supabase } from '../supabaseClient';
import { ArrowLeftIcon, ShieldCheckIcon, SpinnerIcon } from '../components/Icons';
import ProposalCard from '../components/client/ProposalCard';
import ClientHeader from '../components/client/ClientHeader';
import AcceptProposalModal from '../components/client/AcceptProposalModal';
import { DetailedProfessional } from '../types';

interface CompareProposalsPageProps {
  taskId: number;
  setCurrentPage: (page: Page, id?: number) => void;
}

// Interface para a proposta combinada com dados do profissional
interface ProposalWithProfessional {
    id: number;
    price: number;
    message: string;
    professionals: DetailedProfessional;
}

const CompareProposalsPage: React.FC<CompareProposalsPageProps> = ({ taskId, setCurrentPage }) => {
  const [proposals, setProposals] = useState<ProposalWithProfessional[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<ProposalWithProfessional | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
        setLoading(true);
        setError(null);
        try {
            // Aqui, precisamos também do título da tarefa.
            // Em um app real, poderíamos buscar a tarefa e as propostas juntas.
            const taskData = await supabase.from('tasks').select('title').eq('id', taskId).single();
            if (taskData.error) throw taskData.error;
            setTaskTitle(taskData.data.title);

            const proposalsData = await getProposalsByTaskId(taskId);
            setProposals(proposalsData as any);
        } catch (err) {
            console.error(err);
            setError("Não foi possível carregar as propostas.");
        } finally {
            setLoading(false);
        }
    };
    fetchProposals();
  }, [taskId]);


  const handleAcceptClick = (proposal: ProposalWithProfessional) => {
    setSelectedProposal(proposal);
    setModalOpen(true);
  };
  
  const handleConfirmAcceptance = async () => {
    if (!selectedProposal) return;
    
    try {
        await acceptProposalService(taskId, selectedProposal.id, selectedProposal.professionals.id);
        alert(`Proposta aceita! O pagamento foi processado com segurança. O serviço com ${selectedProposal.professionals.name} foi agendado.`);
        setModalOpen(false);
        setCurrentPage('client-dashboard');
    } catch (err) {
        alert("Ocorreu um erro ao aceitar a proposta. Tente novamente.");
        console.error(err);
    }
  };


  const renderContent = () => {
    if (loading) {
        return <div className="flex justify-center items-center h-64"><SpinnerIcon className="h-10 w-10 animate-spin text-[#2A8C82]" /></div>;
    }
    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }
    if (proposals.length === 0) {
        return <div className="text-center py-10 text-gray-600">Ainda não há propostas para esta tarefa.</div>;
    }
    return (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {proposals.map(prop => (
            <ProposalCard 
              key={prop.id}
              professional={{ ...prop.professionals, price: prop.price, message: prop.message }}
              onAccept={() => handleAcceptClick(prop)}
              onChat={() => alert(`Iniciando chat com ${prop.professionals.name}`)}
              setCurrentPage={setCurrentPage}
            />
          ))}
        </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ClientHeader activeView="tasks" setActiveView={() => {}} setCurrentPage={setCurrentPage} isSubPage />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => setCurrentPage('client-dashboard')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Voltar para Minhas Tarefas
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800">Compare as Propostas</h1>
        <p className="mt-2 text-lg text-gray-600">Para: <span className="font-semibold">{taskTitle}</span></p>

        {renderContent()}

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
      
      {selectedProposal && (
        <AcceptProposalModal 
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirmAcceptance}
            professional={{...selectedProposal.professionals, price: selectedProposal.price}}
            taskTitle={taskTitle}
        />
      )}
    </div>
  );
};

export default CompareProposalsPage;
