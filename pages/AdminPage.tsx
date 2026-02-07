
import React, { useState } from 'react';
import { Page } from '../types';
import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardView from '../components/admin/views/DashboardView';
import UsersView from '../components/admin/views/UsersView';
import TasksView from '../components/admin/views/TasksView';
import VerificationsView from '../components/admin/views/VerificationsView';
import FinancialView from '../components/admin/views/FinancialView';
import SupportView from '../components/admin/views/SupportView';
import SettingsView from '../components/admin/views/SettingsView';
import AnalyticsView from '../components/admin/views/AnalyticsView';

export type AdminView = 'dashboard' | 'users' | 'tasks' | 'verifications' | 'financial' | 'support' | 'settings' | 'analytics';
export type UserSubView = 'clients' | 'professionals';
export type FinancialSubView = 'transactions' | 'withdrawals';


interface AdminPageProps {
  setCurrentPage: (page: Page) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ setCurrentPage }) => {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [userSubView, setUserSubView] = useState<UserSubView>('clients');
  const [financialSubView, setFinancialSubView] = useState<FinancialSubView>('transactions');


  const handleSetCurrentView = (view: AdminView, subView?: UserSubView | FinancialSubView) => {
    setCurrentView(view);
    if (view === 'users' && (subView === 'clients' || subView === 'professionals')) {
      setUserSubView(subView);
    }
    if (view === 'financial' && (subView === 'transactions' || subView === 'withdrawals')) {
        setFinancialSubView(subView);
    }
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'users': return <UsersView initialSubView={userSubView} />;
      case 'tasks': return <TasksView />;
      case 'verifications': return <VerificationsView />;
      case 'financial': return <FinancialView initialSubView={financialSubView} />;
      case 'support': return <SupportView />;
      case 'settings': return <SettingsView />;
      case 'analytics': return <AnalyticsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <AdminSidebar currentView={currentView} setCurrentView={handleSetCurrentView} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
