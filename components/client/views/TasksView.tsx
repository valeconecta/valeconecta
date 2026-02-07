
import React, { useState } from 'react';
import { Page } from '../../../types';
import { tasks } from '../../../data/clientMockData';
import { CheckCircleIcon, ChevronRightIcon, ClockIcon } from '../../Icons';

interface TasksViewProps {
  setCurrentPage: (page: Page, id?: number) => void;
}

type TaskTab = 'evaluating' | 'scheduled' | 'history';

const TasksView: React.FC<TasksViewProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState<TaskTab>('evaluating');

  const renderEvaluating = () => (
    <div className="space-y-4">
      {tasks.evaluating.map(task => (
        <button 
          key={task.id}
          onClick={() => setCurrentPage('compare-proposals', task.id)}
          className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-[#2A8C82] flex justify-between items-center text-left"
        >
          <div>
            <h3 className="font-bold text-gray-800">{task.title}</h3>
            <p className="text-sm text-yellow-600 font-semibold mt-1">
              Recebidas: {task.receivedProposals} de {task.totalProposals} propostas
            </p>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
        </button>
      ))}
    </div>
  );
  
  const renderScheduled = () => (
     <div className="space-y-4">
      {tasks.scheduled.map(task => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
                <h3 className="font-bold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">com <span className="font-semibold">{task.professional}</span></p>
                <p className="flex items-center text-sm font-semibold text-blue-600 mt-2">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {task.date}
                </p>
            </div>
            <div className="flex space-x-2 mt-4 sm:mt-0">
                <button onClick={() => setCurrentPage('task-detail', task.id)} className="text-sm font-semibold text-[#2A8C82] px-3 py-1.5 rounded-md hover:bg-gray-100 border border-gray-300">Ver Detalhes</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHistory = () => (
     <div className="space-y-4">
      {tasks.history.map(task => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 opacity-80">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
                <h3 className="font-semibold text-gray-700">{task.title}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${task.status === 'Concluído' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                    {task.status}
                </span>
            </div>
             <div className="mt-4 sm:mt-0">
                {task.evaluationPending ? (
                    <button className="flex items-center bg-yellow-400 text-yellow-900 font-bold text-sm px-4 py-2 rounded-lg hover:bg-yellow-500">
                        Avalie o Profissional
                    </button>
                ) : (
                     <button className="flex items-center text-gray-500 font-semibold text-sm px-4 py-2">
                        <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600"/>
                        Avaliado
                    </button>
                )}
            </div>
          </div>
        </div>
      ))}
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

      {activeTab === 'evaluating' && renderEvaluating()}
      {activeTab === 'scheduled' && renderScheduled()}
      {activeTab === 'history' && renderHistory()}
    </div>
  );
};

export default TasksView;
