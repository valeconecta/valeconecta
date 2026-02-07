
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { getTaskById, getClientById, getProfessionalById, DetailedTask, TaskStatus } from '../data/taskDetailMockData';
import { ArrowLeftIcon, MessageSquareIcon, ClipboardListIcon } from '../components/Icons';
import StatusStepper from '../components/task/StatusStepper';
import ChatWorkspace from '../components/task/ChatWorkspace';
import ReferencePanel from '../components/task/ReferencePanel';
import RatingModal from '../components/task/RatingModal';

interface TaskDetailPageProps {
  taskId: number;
  currentUserRole: 'client' | 'professional';
  setCurrentPage: (page: Page, id?: number) => void;
}

const TaskDetailPage: React.FC<TaskDetailPageProps> = ({ taskId, currentUserRole, setCurrentPage }) => {
  const [task, setTask] = useState<DetailedTask | null>(null);
  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'chat' | 'details'>('chat');

  useEffect(() => {
    const taskData = getTaskById(taskId);
    if (taskData) {
      setTask(taskData);
    }
  }, [taskId]);

  if (!task) {
    return <div className="p-8 text-center">Carregando detalhes da tarefa...</div>;
  }
  
  const client = getClientById(task.clientId);
  const professional = getProfessionalById(task.professionalId);
  if (!client || !professional) return <div className="p-8 text-center">Erro ao carregar dados.</div>;
  
  const handleStatusChange = (newStatus: TaskStatus) => {
      setTask(prevTask => prevTask ? { ...prevTask, status: newStatus } : null);
      if (newStatus === 'Confirmado Pelo Cliente') {
          setTimeout(() => setRatingModalOpen(true), 500);
      }
  };
  
  const handleRatingSubmit = (rating: number, comment: string) => {
      console.log({ rating, comment });
      handleStatusChange('Avaliado');
      setRatingModalOpen(false);
  };
  
  const handleSendMessage = (message: string) => {
    const newMessage = {
        senderId: currentUserRole === 'client' ? client.id : professional.id,
        text: message,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    setTask(prevTask => prevTask ? { ...prevTask, chatHistory: [...prevTask.chatHistory, newMessage] } : null);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800 truncate">
              {task.title}
            </h1>
            <button onClick={() => setCurrentPage(currentUserRole === 'client' ? 'client-dashboard' : 'professional-dashboard')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-800">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Voltar ao Painel
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Tabs */}
        <div className="sm:hidden mb-4">
            <div className="flex border-b border-gray-200">
                <button onClick={() => setMobileView('chat')} className={`flex-1 py-2 text-sm font-semibold flex items-center justify-center gap-2 ${mobileView === 'chat' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500'}`}>
                    <MessageSquareIcon className="h-5 w-5" /> Chat e Status
                </button>
                <button onClick={() => setMobileView('details')} className={`flex-1 py-2 text-sm font-semibold flex items-center justify-center gap-2 ${mobileView === 'details' ? 'border-b-2 border-[#2A8C82] text-[#2A8C82]' : 'text-gray-500'}`}>
                    <ClipboardListIcon className="h-5 w-5" /> Detalhes
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Workspace) */}
          <div className={`lg:col-span-2 ${mobileView === 'details' ? 'hidden' : ''} sm:block`}>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
              <StatusStepper currentStatus={task.status} />
              <ChatWorkspace 
                task={task} 
                client={client}
                professional={professional}
                currentUserRole={currentUserRole}
                onStatusChange={handleStatusChange}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
          {/* Right Column (Reference) */}
          <div className={`lg:col-span-1 ${mobileView === 'chat' ? 'hidden' : ''} sm:block`}>
            <ReferencePanel
                task={task}
                client={client}
                professional={professional}
                currentUserRole={currentUserRole}
            />
          </div>
        </div>
      </main>

      <RatingModal 
        isOpen={isRatingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        onSubmit={handleRatingSubmit}
        professionalName={professional.name}
      />
    </div>
  );
};

export default TaskDetailPage;
