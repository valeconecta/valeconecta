
import React from 'react';
import { Page } from '../../types';
import { ProfessionalView } from './ProfessionalLayout';
import { Logo, LayoutDashboardIcon, BriefcaseIcon, CalendarDaysIcon, WalletIcon, UserCircleIcon, TrendingUpIcon, LogOutIcon } from '../Icons';

interface SidebarProps {
  activeView: ProfessionalView;
  setActiveView: (view: ProfessionalView) => void;
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
    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-[#2A8C82] text-white'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon className="h-5 w-5" /> },
    { id: 'opportunities', label: 'Oportunidades', icon: <BriefcaseIcon className="h-5 w-5" /> },
    { id: 'services', label: 'Meus Serviços', icon: <CalendarDaysIcon className="h-5 w-5" /> },
    { id: 'financials', label: 'Financeiro', icon: <WalletIcon className="h-5 w-5" /> },
    { id: 'profile', label: 'Meu Perfil', icon: <UserCircleIcon className="h-5 w-5" /> },
    { id: 'analytics', label: 'Desempenho', icon: <TrendingUpIcon className="h-5 w-5" /> },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-shrink-0 flex-col">
      <div className="h-24 flex items-center justify-center border-b border-gray-200 px-4">
        <Logo className="h-16 w-auto" />
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map(item => (
            <NavLink
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={activeView === item.id}
                onClick={() => setActiveView(item.id as ProfessionalView)}
            />
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-gray-200">
        <button
          onClick={() => setCurrentPage('home')}
          className="w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <LogOutIcon className="h-5 w-5" />
          <span className="ml-3">Sair do Painel</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
