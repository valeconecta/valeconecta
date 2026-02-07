import React, { useState, useEffect } from 'react';
import { Page } from '../../../types';
import { supabase } from '../../../supabaseClient';
import { CheckCircleIcon, ChevronRightIcon, ClockIcon, SpinnerIcon } from '../../Icons';
import { useAuth } from '../../../AuthContext';

interface TasksViewProps {
  setCurrentPage: (page: Page, id?: number) => void;
}

type TaskTab = 'evaluating' | 'scheduled' | 'history';

// Definindo um tipo para os dados que vêm do Supabase
interface SupabaseTask {
    id: number;
    title: string;
    status: 'AWAITING_PROPOSALS' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    description: string;
    scheduled_date: string;
    evaluation_pending: boolean;
    // O Supabase retorna o profissional aninhado se a relação estiver correta
    professionals: {
        name: string;
    } | null;
}

const TasksView: React.FC<TasksViewProps> = ({ setCurrentPage }) => {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<TaskTab>('evaluating');
  const [tasks, setTasks] = useState<SupabaseTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return; // Aguarda a autenticação terminar
    if (!user) {
      setError("Você precisa estar logado para ver suas tarefas.");
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
            .from('tasks')
            .select(`
                id,
                title,
                status,
                description,
                scheduled_date,
                evaluation_pending,
                professionals ( name )
            `)
            .eq('client_id', user.id); // USA O ID DO USUÁRIO AUTENTICADO
        
        if (error) {
            console.error('Error fetching tasks:', error);
            setError('Não foi possível carregar suas tarefas. Tente novamente mais tarde.');
        } else {
            setTasks(data || []);
        }
        setLoading(false);
    };
    
    fetchTasks();
  }, [user, authLoading]);

  const evaluatingTasks = tasks.filter(t => t.status === 'AWAITING_PROPOSALS');
  const scheduledTasks = tasks.filter(t => t.status === 'SCHEDULED' || t.status === 'IN_PROGRESS');
  const historyTasks = tasks.filter(t => t.status === 'COMPLETED' || t.status === 'CANCELLED');

  const renderContent = () => {
    if (loading || authLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <SpinnerIcon className="h-8 w-8 animate-spin text-[#2A8C82]" />
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="text-center h-48 flex flex-col justify-center items-center bg-red-50 rounded-lg p-4">
                <p className="text-red-600 font-semibold">Ocorreu um erro</p>
                <p className="text-gray-600 mt-2">{error}</p>
            </div>
        );
    }

    switch (activeTab) {
        case 'evaluating': return renderEvaluating();
        case 'scheduled': return renderScheduled();
        case 'history': return renderHistory();
        default: return null;
    }
  }


  const renderEvaluating = () => (
    <div className="space-y-4">
      {evaluatingTasks.length > 0 ? evaluatingTasks.map(task => (
        <button 
          key={task.id}
          onClick={() => setCurrentPage('compare-proposals', task.id)}
          className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-[#2A8C82] flex justify-between items-center text-left"
        >
          <div>
            <h3 className="font-bold text-gray-800">{task.title}</h3>
            <p className="text-sm text-yellow-600 font-semibold mt-1">
              Aguardando propostas...
            </p>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
        </button>
      )) : <p className="text-center text-gray-500 py-8">Nenhuma tarefa aguardando propostas.</p>}
    </div>
  );
  
  const renderScheduled = () => (
     <div className="space-y-4">
      {scheduledTasks.length > 0 ? scheduledTasks.map(task => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
                <h3 className="font-bold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">com <span className="font-semibold">{task.professionals?.name || 'Profissional'}</span></p>
                <p className="flex items-center text-sm font-semibold text-blue-600 mt-2">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {task.scheduled_date ? new Date(task.scheduled_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'A combinar'}
                </p>
            </div>
            <div className="flex space-x-2 mt-4 sm:mt-0">
                <button onClick={() => setCurrentPage('task-detail', task.id)} className="text-sm font-semibold text-[#2A8C82] px-3 py-1.5 rounded-md hover:bg-gray-100 border border-gray-300">Ver Detalhes</button>
            </div>
          </div>
        </div>
      )) : <p className="text-center text-gray-500 py-8">Nenhuma tarefa agendada.</p>}
    </div>
  );

  const renderHistory = () => (
     <div className="space-y-4">
      {historyTasks.length > 0 ? historyTasks.map(task => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 opacity-80">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
                <h3 className="font-semibold text-gray-700">{task.title}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                    {task.status === 'COMPLETED' ? 'Concluído' : 'Cancelado'}
                </span>
            </div>
             <div className="mt-4 sm:mt-0">
                {task.evaluation_pending ? (
                    <button className="flex items-center bg-yellow-400 text-yellow-900 font-bold text-sm px-4 py-2 rounded-lg hover:bg-yellow-500">
                        Avalie o Profissional
                    </button>
                ) : (
                     <button className="flex items-center text-gray-500 font-semibold text-sm px-4 py-2" disabled>
                        <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600"/>
                        Avaliado
                    </button>
                )}
            </div>
          </div>
        </div>
      )) : <p className="text-center text-gray-500 py-8">Nenhuma tarefa no seu histórico.</p>}
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Minhas Tarefas</h1>
      
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-2 sm:space-x-4 -mb-px">
          <button onClick={() => setActiveTab('evaluating')} className={`py-3 px-2 sm:px-4 text-sm font-semibold ${activeTab === 'evaluating' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500 hover:text-gray-800'}`}>
            Avaliando Propostas
          </button>
          <button onClick={() => setActiveTab('scheduled')} className={`py-3 px-2 sm:px-4 text-sm font-semibold ${activeTab === 'scheduled' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500 hover:text-gray-800'}`}>
            Agendadas
          </button>
          <button onClick={() => setActiveTab('history')} className={`py-3 px-2 sm:px-4 text-sm font-semibold ${activeTab === 'history' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500 hover:text-gray-800'}`}>
            Histórico
          </button>
        </nav>
      </div>

      {renderContent()}
    </div>
  );
};

export default TasksView;