
import React, { useState } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfessionalPage from './pages/ProfessionalPage';
import PlusPage from './pages/PlusPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
import ProfessionalDashboardPage from './pages/ProfessionalDashboardPage';
import ProfessionalProfilePage from './pages/ProfessionalProfilePage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import CompareProposalsPage from './pages/CompareProposalsPage';
import TaskDetailPage from './pages/TaskDetailPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import OpportunityDetailPage from './pages/OpportunityDetailPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<number | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<'client' | 'professional'>('client');


  const handleSetPage = (page: Page, id?: number) => {
    setCurrentPage(page);
    if (page === 'professional-profile' && id !== undefined) {
      setSelectedProfessionalId(id);
    }
    if ((page === 'compare-proposals' || page === 'task-detail' || page === 'opportunity-detail') && id !== undefined) {
      setSelectedTaskId(id);
    }
    if (page === 'client-dashboard') {
      setCurrentUserRole('client');
    }
    if (page === 'professional-dashboard' || page === 'opportunities') {
      setCurrentUserRole('professional');
    }
    window.scrollTo(0, 0);
  };

  // Render AdminPage with its own layout
  if (currentPage === 'admin') {
    return <AdminPage setCurrentPage={handleSetPage} />;
  }

  // Render ProfessionalDashboardPage with its own layout
  if (currentPage === 'professional-dashboard') {
    return <ProfessionalDashboardPage setCurrentPage={handleSetPage} />;
  }
  
  // Render ClientDashboardPage with its own layout
  if (currentPage === 'client-dashboard') {
      return <ClientDashboardPage setCurrentPage={handleSetPage} />;
  }

  // Render TaskDetailPage with its own layout
  if (currentPage === 'task-detail' && selectedTaskId) {
    return <TaskDetailPage taskId={selectedTaskId} currentUserRole={currentUserRole} setCurrentPage={handleSetPage} />;
  }

  // Render OpportunityDetailPage with its own layout
  if (currentPage === 'opportunity-detail' && selectedTaskId) {
    return <OpportunityDetailPage opportunityId={selectedTaskId} setCurrentPage={handleSetPage} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={handleSetPage} />;
      case 'professional':
        return <ProfessionalPage setCurrentPage={handleSetPage} />;
      case 'plus':
        return <PlusPage />;
      case 'search':
        return <SearchPage setCurrentPage={handleSetPage} />;
      case 'opportunities':
        return <OpportunitiesPage setCurrentPage={handleSetPage} />;
      case 'professional-profile':
        if (selectedProfessionalId) {
          return <ProfessionalProfilePage professionalId={selectedProfessionalId} setCurrentPage={handleSetPage} />;
        }
        return <SearchPage setCurrentPage={handleSetPage} />;
      case 'compare-proposals':
        if(selectedTaskId) {
            return <CompareProposalsPage taskId={selectedTaskId} setCurrentPage={handleSetPage} />;
        }
        // Fallback if no task id is provided
        return <ClientDashboardPage setCurrentPage={handleSetPage} />;
      default:
        return <HomePage setCurrentPage={handleSetPage} />;
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={handleSetPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setCurrentPage={handleSetPage} />
    </div>
  );
};

export default App;