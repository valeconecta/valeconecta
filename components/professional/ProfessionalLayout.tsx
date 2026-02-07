
import React, { useState, useEffect } from 'react';
import { Page } from '../../types';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

import DashboardView from './views/DashboardView';
import OpportunitiesView from './views/OpportunitiesView';
import ServicesView from './views/ServicesView';
import FinancialsView from './views/FinancialsView';
import ProfileView from './views/ProfileView';
import AnalyticsView from './views/AnalyticsView';
import BadgeNotificationToast, { MedalhaInfo } from './BadgeNotificationToast';

export type ProfessionalView = 'dashboard' | 'opportunities' | 'services' | 'financials' | 'profile' | 'analytics';

interface ProfessionalLayoutProps {
  setCurrentPage: (page: Page, id?: number) => void;
}

const ProfessionalLayout: React.FC<ProfessionalLayoutProps> = ({ setCurrentPage }) => {
  const [activeView, setActiveView] = useState<ProfessionalView>('dashboard');
  const [notification, setNotification] = useState<MedalhaInfo | null>(null);

  // Simula o recebimento de uma notificação via WebSocket
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({
        nome: 'Excelência em Avaliações',
        descricao: 'Você recebeu 50 avaliações 5 estrelas!',
        icone: <StarIcon className="h-8 w-8 text-white" />
      });
    }, 5000); // Mostra a notificação 5 segundos após carregar o painel

    return () => clearTimeout(timer);
  }, []);


  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView setActiveView={setActiveView} />;
      case 'opportunities':
        return <OpportunitiesView setCurrentPage={setCurrentPage} />;
      case 'services':
        return <ServicesView setCurrentPage={setCurrentPage} />;
      case 'financials':
        return <FinancialsView />;
      case 'profile':
        return <ProfileView />;
      case 'analytics':
        return <AnalyticsView />;
      default:
        return <DashboardView setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50/50 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 py-8">
            {renderView()}
          </div>
        </main>
      </div>
      <BottomNav activeView={activeView} setActiveView={setActiveView} />

      {notification && (
        <BadgeNotificationToast
          medalha={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

// Adicionado para o ícone de estrela na notificação
const StarIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);


export default ProfessionalLayout;
