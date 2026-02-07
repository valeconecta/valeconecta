
import React from 'react';
import { Page } from '../../types';
import { ClientView } from './ClientLayout';
import { Logo, LogOutIcon } from '../Icons';

interface ClientHeaderProps {
  activeView: ClientView;
  setActiveView: (view: ClientView) => void;
  setCurrentPage: (page: Page) => void;
  isSubPage?: boolean;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ activeView, setActiveView, setCurrentPage, isSubPage = false }) => {
    
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tasks', label: 'Minhas Tarefas' },
    { id: 'payments', label: 'Pagamentos' },
    { id: 'profile', label: 'Conta' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-8">
                <button onClick={() => setCurrentPage('home')}>
                    <Logo className="h-16 w-auto" />
                </button>
                {!isSubPage && (
                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveView(item.id as ClientView)}
                                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                                activeView === item.id 
                                    ? 'bg-[#E8F3F1] text-[#2A8C82]' 
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                )}
            </div>

            <div className="flex items-center">
                 <button onClick={() => setCurrentPage('home')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-800">
                    <LogOutIcon className="h-5 w-5 mr-2" />
                    Sair do Painel
                </button>
            </div>
        </div>
      </div>
       {!isSubPage && (
        <div className="md:hidden border-t border-gray-200">
             <nav className="flex justify-around p-1">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id as ClientView)}
                        className={`flex-1 py-2 text-xs font-semibold text-center ${
                        activeView === item.id 
                            ? 'text-[#2A8C82] border-b-2 border-[#2A8C82]' 
                            : 'text-gray-600'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </div>
      )}
    </header>
  );
};

export default ClientHeader;
