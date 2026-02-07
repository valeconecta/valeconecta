import React, { useState, useEffect } from 'react';
import FiltersPanel from '../components/search/FiltersPanel';
import ProfessionalCard from '../components/search/ProfessionalCard';
import { MenuIcon, SpinnerIcon } from '../components/Icons';
import { Page, Professional } from '../types';
import { getProfessionals } from '../supabaseService';

interface SearchPageProps {
    setCurrentPage: (page: Page, id?: number) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ setCurrentPage }) => {
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfessionalsData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getProfessionals();
                setProfessionals(data || []);
            } catch (err) {
                 console.error('Error fetching professionals:', err);
                setError('Não foi possível carregar os profissionais. Tente novamente mais tarde.');
            }
            setLoading(false);
        };

        fetchProfessionalsData();
    }, []);

    const totalProfessionals = professionals.length;

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <SpinnerIcon className="h-10 w-10 animate-spin text-[#2A8C82]" />
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center h-64 flex flex-col justify-center items-center bg-red-50 rounded-lg p-4">
                    <p className="text-red-600 font-semibold">Ocorreu um erro</p>
                    <p className="text-gray-600 mt-2">{error}</p>
                </div>
            );
        }

        if (professionals.length === 0) {
            return (
                <div className="text-center h-64 flex flex-col justify-center items-center bg-gray-100 rounded-lg p-4">
                     <p className="text-gray-800 font-semibold">Nenhum profissional encontrado</p>
                     <p className="text-gray-600 mt-2">Tente ajustar seus filtros ou verifique se há profissionais cadastrados.</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {professionals.map(prof => (
                    <ProfessionalCard key={prof.id} professional={prof} setCurrentPage={setCurrentPage} />
                ))}
            </div>
        );
    };

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
                                Exibindo <span className="font-bold text-[#333333]">{professionals.length}</span> de <span className="font-bold text-[#333333]">{totalProfessionals}</span> profissionais encontrados
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

                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
