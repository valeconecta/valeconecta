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
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import { AuthProvider, useAuth } from './AuthContext';
import { SpinnerIcon } from './components/Icons';
import { Role } from './auth/enums/role.enum';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<number | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const { session, loading, profile } = useAuth();
  
  // Handle page changes after login/logout
  React.useEffect(() => {
    if (!loading && !session && (currentPage.includes('dashboard') || currentPage.includes('compare') || currentPage.includes('detail') || currentPage === 'admin')) {
        setCurrentPage('login');
    }
    if (!loading && session && (currentPage === 'login' || currentPage === 'register')) {
        if (profile?.role === Role.CLIENT) {
            setCurrentPage('client-dashboard');
        } else if (profile?.role === Role.PROFESSIONAL) {
            setCurrentPage('professional-dashboard');
        } else if (profile?.role === Role.ADMIN) {
            setCurrentPage('admin');
        } else {
            setCurrentPage('home');
        }
    }
  }, [session, loading, profile, currentPage]);


  const handleSetPage = (page: Page, id?: number) => {
    setCurrentPage(page);
    if (page === 'professional-profile' && id !== undefined) {
      setSelectedProfessionalId(id);
    }
    if ((page === 'compare-proposals' || page === 'task-detail' || page === 'opportunity-detail') && id !== undefined) {
      setSelectedTaskId(id);
    }
    window.scrollTo(0, 0);
  };
  
  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <SpinnerIcon className="h-12 w-12 animate-spin text-[#2A8C82]" />
        </div>
    );
  }
  
  const publicPages: Page[] = ['home', 'professional', 'plus', 'search', 'login', 'register', 'professional-profile', 'privacy', 'terms'];
  const isProtectedPage = !publicPages.includes(currentPage);
  
  if (!session && isProtectedPage) {
      // Redirect to login but keep the page logic simple
      if (currentPage !== 'login') {
          setCurrentPage('login');
      }
      return <LoginPage setCurrentPage={handleSetPage} />;
  }

  // Define pages that don't need the standard Header/Footer layout
  const fullScreenPages: Page[] = ['admin', 'professional-dashboard', 'client-dashboard', 'task-detail', 'opportunity-detail', 'login', 'register'];
  if (fullScreenPages.includes(currentPage)) {
    switch (currentPage) {
      case 'admin': return <AdminPage setCurrentPage={handleSetPage} />;
      case 'professional-dashboard': return <ProfessionalDashboardPage setCurrentPage={handleSetPage} />;
      case 'client-dashboard': return <ClientDashboardPage setCurrentPage={handleSetPage} />;
      case 'task-detail':
        if(selectedTaskId && profile) return <TaskDetailPage taskId={selectedTaskId} currentUserRole={profile.role === Role.CLIENT ? 'client' : 'professional'} setCurrentPage={handleSetPage} />;
        return <HomePage setCurrentPage={handleSetPage} />; // Fallback
      case 'opportunity-detail':
        if(selectedTaskId) return <OpportunityDetailPage opportunityId={selectedTaskId} setCurrentPage={handleSetPage} />;
        return <OpportunitiesPage setCurrentPage={handleSetPage} />; // Fallback
      case 'login': return <LoginPage setCurrentPage={handleSetPage} />;
      case 'register': return <RegisterPage setCurrentPage={handleSetPage} />;
      default: return <HomePage setCurrentPage={handleSetPage} />;
    }
  }


  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={handleSetPage} />;
      case 'professional': return <ProfessionalPage setCurrentPage={handleSetPage} />;
      case 'plus': return <PlusPage />;
      case 'search': return <SearchPage setCurrentPage={handleSetPage} />;
      case 'opportunities': return <OpportunitiesPage setCurrentPage={handleSetPage} />;
      case 'professional-profile':
        if (selectedProfessionalId) return <ProfessionalProfilePage professionalId={selectedProfessionalId} setCurrentPage={handleSetPage} />;
        return <SearchPage setCurrentPage={handleSetPage} />;
      case 'compare-proposals':
        if(selectedTaskId) return <CompareProposalsPage taskId={selectedTaskId} setCurrentPage={handleSetPage} />;
        return <ClientDashboardPage setCurrentPage={handleSetPage} />; // Fallback
      case 'privacy': return <PrivacyPolicyPage />;
      case 'terms': return <TermsOfServicePage />;
      default:
        // If logged in, go to dashboard, else home
        if (session) {
            if (profile?.role === Role.CLIENT) { setCurrentPage('client-dashboard'); return null; }
            if (profile?.role === Role.PROFESSIONAL) { setCurrentPage('professional-dashboard'); return null; }
            if (profile?.role === Role.ADMIN) { setCurrentPage('admin'); return null; }
        }
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


const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
