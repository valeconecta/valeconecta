
import React from 'react';
import FiltersPanel from '../components/search/FiltersPanel';
import ProfessionalCard from '../components/search/ProfessionalCard';
import { professionals } from '../data/professionals';
import { MenuIcon } from '../components/Icons';
import { Page } from '../types';

interface SearchPageProps {
    setCurrentPage: (page: Page, id?: number) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ setCurrentPage }) => {
    // Em uma aplicação real, aqui estaria a lógica de estado para filtros e os resultados filtrados.
    const filteredProfessionals = professionals;
    const totalProfessionals = 180; // Exemplo de total

    return (
        <div className="bg-[#E8F3F1]/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="lg:flex lg:space-x-8">
                    {/* Botão de Filtro para Mobile */}
                    <div className="lg:hidden mb-4">
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <MenuIcon className="h-5 w-5 mr-2" />
                            Filtrar
                        </button>
                    </div>

                    {/* Filtros (escondido em mobile) */}
                    <div className="hidden lg:block">
                        <FiltersPanel />
                    </div>

                    {/* Resultados */}
                    <main className="flex-1">
                        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between mb-6">
                            <p className="text-sm text-[#666666]">
                                Exibindo <span className="font-bold text-[#333333]">{filteredProfessionals.length}</span> de <span className="font-bold text-[#333333]">{totalProfessionals}</span> profissionais encontrados
                            </p>
                            <div>
                                <label htmlFor="sort" className="sr-only">Ordenar por</label>
                                <select id="sort" className="text-sm border-gray-300 rounded-md focus:ring-[#2A8C82] focus:border-[#2A8C82]">
                                    <option>Relevância</option>
                                    <option>Preço (Menor ao Maior)</option>
                                    <option>Preço (Maior ao Menor)</option>
                                    <option>Melhores Avaliações</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProfessionals.map(prof => (
                                <ProfessionalCard key={prof.id} professional={prof} setCurrentPage={setCurrentPage} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
