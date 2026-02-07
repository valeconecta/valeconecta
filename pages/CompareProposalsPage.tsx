
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { getProposalsByTaskId, acceptProposal as acceptProposalService } from '../supabaseService';
import { supabase } from '../supabaseClient';
import { ArrowLeftIcon, ShieldCheckIcon, SpinnerIcon } from '../components/Icons';
import ProposalCard from '../components/client/ProposalCard';
import ClientHeader from '../components/client/ClientHeader';
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
  const [accepting, setAccepting] = useState<number | null>(null);

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

  const handleAcceptClick = async (proposal: ProposalWithProfessional) => {
    if (window.confirm(`Você tem certeza que deseja aceitar a proposta de ${proposal.professionals.name} por ${proposal.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}?`)) {
        setAccepting(proposal.id);
        setError(null);
        try {
            await acceptProposalService(taskId, proposal.id, proposal.professionals.id);
            alert('Proposta aceita com sucesso! O serviço foi agendado. Você pode conversar com o profissional em "Minhas Tarefas".');
            setCurrentPage('client-dashboard');
        } catch (err) {
            console.error("Error accepting proposal:", err);
            setError('Não foi possível aceitar a proposta. Tente novamente.');
            setAccepting(null);
        }
    }
  };

  const renderProposalsList = () => {
    if (loading) {
        return <div className="flex justify-center items-center h-64"><SpinnerIcon className="h-10 w-10 animate-spin text-[#2A8C82]" /></div>;
    }
    if (error && !accepting) {
        return <div className="text-center py-10 text-red-600 bg-red-50 p-4 rounded-md">{error}</div>;
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

        {accepting && (
            <div className="text-center py-4 flex items-center justify-center space-x-2 text-gray-700">
                <SpinnerIcon className="h-6 w-6 animate-spin text-[#2A8C82]" />
                <span>Aceitando proposta...</span>
            </div>
        )}

        {renderProposalsList()}

        <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6 flex items-start">
            <ShieldCheckIcon className="h-8 w-8 text-green-600 flex-shrink-0 mr-4" />
            <div>
                <h3 className="font-bold text-green-800">Contratação Segura.</h3>
                <p className="text-sm text-green-700 mt-1">
                    Lembre-se: Após aceitar a proposta, o serviço será agendado. O pagamento será solicitado e retido conosco, e só é liberado para o profissional 3 dias após você confirmar a conclusão do serviço. Isso é parte da nossa Garantia de Confiança.
                </p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default CompareProposalsPage;
