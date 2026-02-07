
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { getProposalsByTaskId } from '../supabaseService';
import { supabase } from '../supabaseClient';
import { ArrowLeftIcon, ShieldCheckIcon, SpinnerIcon } from '../components/Icons';
import ProposalCard from '../components/client/ProposalCard';
import ClientHeader from '../components/client/ClientHeader';
import AcceptProposalModal from '../components/client/AcceptProposalModal';
import { DetailedProfessional } from '../types';
import CheckoutForm from '../components/CheckoutForm';

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
  const [isCheckoutActive, setCheckoutActive] = useState(false);


  useEffect(() => {
    const fetchProposals = async () => {
        setLoading(true);
        setError(null);
        try {
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
  
  const handleConfirmAcceptance = () => {
    if (!selectedProposal) return;
    setModalOpen(false);
    setCheckoutActive(true);
  };

  const handlePaymentSuccess = () => {
    alert(`Pagamento bem-sucedido! O serviço com ${selectedProposal?.professionals.name} foi agendado.`);
    setCurrentPage('client-dashboard');
  };


  const renderProposalsList = () => {
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
        
        {isCheckoutActive && selectedProposal ? (
            <div>
                 <button onClick={() => setCheckoutActive(false)} className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-800 mb-6">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Voltar para as Propostas
                </button>
                <CheckoutForm 
                    proposalId={selectedProposal.id}
                    amount={selectedProposal.price}
                    onSuccess={handlePaymentSuccess}
                />
            </div>
        ) : (
            <>
                <button onClick={() => setCurrentPage('client-dashboard')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-800 mb-6">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Voltar para Minhas Tarefas
                </button>
                
                <h1 className="text-3xl font-bold text-gray-800">Compare as Propostas</h1>
                <p className="mt-2 text-lg text-gray-600">Para: <span className="font-semibold">{taskTitle}</span></p>

                {renderProposalsList()}

                <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6 flex items-start">
                    <ShieldCheckIcon className="h-8 w-8 text-green-600 flex-shrink-0 mr-4" />
                    <div>
                        <h3 className="font-bold text-green-800">Seu pagamento está seguro.</h3>
                        <p className="text-sm text-green-700 mt-1">
                            Lembre-se: seu pagamento fica retido conosco e só é liberado para o profissional 3 dias após você confirmar a conclusão do serviço. Isso é parte da nossa Garantia de Confiança.
                        </p>
                    </div>
                </div>
            </>
        )}

      </main>
      
      {selectedProposal && !isCheckoutActive && (
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
