
import React, { useState } from 'react';
import { Page } from '../../types';
import { AdminView, UserSubView, FinancialSubView } from '../../pages/AdminPage';
import { Logo, LayoutDashboardIcon, UsersIcon, ClipboardListIcon, ShieldCheckIcon, LandmarkIcon, LifeBuoyIcon, SettingsIcon, BarChart3Icon, LogOutIcon, ChevronRightIcon } from '../Icons';

interface AdminSidebarProps {
  currentView: AdminView;
  setCurrentView: (view: AdminView, subView?: UserSubView | FinancialSubView) => void;
  setCurrentPage: (page: Page) => void;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-[#2A8C82] text-white'
        : 'text-gray-600 hover:bg-gray-200'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentView, setCurrentView, setCurrentPage }) => {
    const [isUsersOpen, setUsersOpen] = useState(currentView === 'users');
    const [isFinancialOpen, setFinancialOpen] = useState(currentView === 'financial');

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
      <div className="h-28 flex items-center justify-center border-b border-gray-200">
        <Logo className="h-20 w-auto" />
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink icon={<LayoutDashboardIcon className="h-5 w-5"/>} label="Dashboard" isActive={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
        
        <div>
            <button onClick={() => setUsersOpen(!isUsersOpen)} className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-200 ${currentView === 'users' ? 'bg-gray-200' : ''}`}>
                <div className="flex items-center">
                    <UsersIcon className="h-5 w-5"/>
                    <span className="ml-3">Gestão de Usuários</span>
                </div>
                <ChevronRightIcon className={`h-4 w-4 transition-transform ${isUsersOpen ? 'rotate-90' : ''}`} />
            </button>
            {isUsersOpen && <div className="pl-8 pt-2 space-y-2">
                <button onClick={() => setCurrentView('users', 'clients')} className="block text-sm text-gray-500 hover:text-gray-800">Clientes</button>
                <button onClick={() => setCurrentView('users', 'professionals')} className="block text-sm text-gray-500 hover:text-gray-800">Profissionais</button>
            </div>}
        </div>

        <NavLink icon={<ClipboardListIcon className="h-5 w-5"/>} label="Tarefas e Serviços" isActive={currentView === 'tasks'} onClick={() => setCurrentView('tasks')} />
        <NavLink icon={<ShieldCheckIcon className="h-5 w-5"/>} label="Verificações" isActive={currentView === 'verifications'} onClick={() => setCurrentView('verifications')} />
        
        <div>
            <button onClick={() => setFinancialOpen(!isFinancialOpen)} className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-200 ${currentView === 'financial' ? 'bg-gray-200' : ''}`}>
                <div className="flex items-center">
                    <LandmarkIcon className="h-5 w-5"/>
                    <span className="ml-3">Financeiro</span>
                </div>
                <ChevronRightIcon className={`h-4 w-4 transition-transform ${isFinancialOpen ? 'rotate-90' : ''}`} />
            </button>
            {isFinancialOpen && <div className="pl-8 pt-2 space-y-2">
                <button onClick={() => setCurrentView('financial', 'transactions')} className="block text-sm text-gray-500 hover:text-gray-800">Transações</button>
                <button onClick={() => setCurrentView('financial', 'withdrawals')} className="block text-sm text-gray-500 hover:text-gray-800">Saques</button>
            </div>}
        </div>
        
        <NavLink icon={<LifeBuoyIcon className="h-5 w-5"/>} label="Suporte e Disputas" isActive={currentView === 'support'} onClick={() => setCurrentView('support')} />
        <NavLink icon={<BarChart3Icon className="h-5 w-5"/>} label="Analytics" isActive={currentView === 'analytics'} onClick={() => setCurrentView('analytics')} />
        <NavLink icon={<SettingsIcon className="h-5 w-5"/>} label="Configurações" isActive={currentView === 'settings'} onClick={() => setCurrentView('settings')} />
      </nav>
      <div className="px-4 py-4 border-t border-gray-200">
        <button
          onClick={() => setCurrentPage('home')}
          className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-200"
        >
          <LogOutIcon className="h-5 w-5" />
          <span className="ml-3">Voltar ao site</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
