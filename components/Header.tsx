
import React, { useState } from 'react';
import { Page } from '../types';
import { Logo, MenuIcon, XIcon } from './Icons';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page, id?: number) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Início', page: 'home' as Page },
    { name: 'Buscar Profissionais', page: 'search' as Page },
    { name: 'Tarefas', page: 'opportunities' as Page },
    { name: 'Seja um Conectado', page: 'professional' as Page },
    { name: 'Vale Conecta Plus', page: 'plus' as Page },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2">
              <Logo className="h-20 w-auto"/>
            </button>
          </div>
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setCurrentPage(item.page)}
                className={`text-base font-medium transition-colors duration-200 ${
                  currentPage === item.page ? 'text-[#2A8C82]' : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
          <div className="hidden lg:flex items-center space-x-2">
            <button onClick={() => setCurrentPage('client-dashboard')} className="text-[#666666] font-medium hover:text-[#2A8C82] px-3 py-2 rounded-md">Painel do Cliente</button>
            <button onClick={() => setCurrentPage('professional-dashboard')} className="text-[#666666] font-medium hover:text-[#2A8C82] px-3 py-2 rounded-md">Painel Pro</button>
            <button className="bg-[#2A8C82] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
              Cadastrar
            </button>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setCurrentPage(item.page);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.page ? 'bg-[#E8F3F1] text-[#2A8C82]' : 'text-[#333333] hover:bg-gray-50'
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="border-t border-gray-100 my-2"></div>
             <div className="flex flex-col space-y-2 p-3">
                <button onClick={() => { setCurrentPage('client-dashboard'); setIsMenuOpen(false); }} className="w-full text-center text-[#666666] font-medium hover:text-[#2A8C82] border border-gray-300 rounded-md py-2">Painel do Cliente</button>
                 <button onClick={() => { setCurrentPage('professional-dashboard'); setIsMenuOpen(false); }} className="w-full text-center text-[#666666] font-medium hover:text-[#2A8C82] border border-gray-300 rounded-md py-2">Painel Pro</button>
                <button className="w-full bg-[#2A8C82] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                  Cadastrar
                </button>
              </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;