
import React, { useState } from 'react';
import { Page } from '../../types';
import ClientHeader from './ClientHeader';
import DashboardView from './views/DashboardView';
import TasksView from './views/TasksView';
import PaymentsView from './views/PaymentsView';
import ProfileView from './views/ProfileView';
import SuccessToast from './SuccessToast';

export type ClientView = 'dashboard' | 'tasks' | 'payments' | 'profile';

interface ClientLayoutProps {
  setCurrentPage: (page: Page, id?: number) => void;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ setCurrentPage }) => {
  const [activeView, setActiveView] = useState<ClientView>('dashboard');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleTaskCreated = () => {
    setSuccessMessage('Sua tarefa foi publicada com sucesso! Você será notificado quando as propostas chegarem.');
    setActiveView('tasks');
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView setActiveView={setActiveView} onTaskCreated={handleTaskCreated} />;
      case 'tasks':
        return <TasksView setCurrentPage={setCurrentPage} />;
      case 'payments':
        return <PaymentsView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView setActiveView={setActiveView} onTaskCreated={handleTaskCreated} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/80 font-sans">
      <ClientHeader activeView={activeView} setActiveView={setActiveView} setCurrentPage={setCurrentPage} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderView()}
        </div>
      </main>
      {successMessage && (
        <SuccessToast 
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
        />
      )}
    </div>
  );
};

export default ClientLayout;
