
import React from 'react';
import { ProfessionalView } from './ProfessionalLayout';
import { LayoutDashboardIcon, BriefcaseIcon, CalendarDaysIcon, WalletIcon, UserCircleIcon } from '../Icons';

interface BottomNavProps {
  activeView: ProfessionalView;
  setActiveView: (view: ProfessionalView) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
      isActive ? 'text-[#2A8C82]' : 'text-gray-500 hover:text-[#2A8C82]'
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
    const navItems = [
        { id: 'dashboard', label: 'Início', icon: <LayoutDashboardIcon className="h-6 w-6" /> },
        { id: 'opportunities', label: 'Oportunidades', icon: <BriefcaseIcon className="h-6 w-6" /> },
        { id: 'services', label: 'Serviços', icon: <CalendarDaysIcon className="h-6 w-6" /> },
        { id: 'financials', label: 'Carteira', icon: <WalletIcon className="h-6 w-6" /> },
        { id: 'profile', label: 'Perfil', icon: <UserCircleIcon className="h-6 w-6" /> },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="flex justify-around items-center h-full">
                {navItems.map(item => (
                    <NavItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        isActive={activeView === item.id}
                        onClick={() => setActiveView(item.id as ProfessionalView)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
