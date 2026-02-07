
import React, { useState, useMemo } from 'react';
import { Page } from '../../../types';
import { opportunities as opportunitiesData } from '../../../data/opportunitiesMockData';
import OpportunityFiltersPanel from '../opportunities/OpportunityFiltersPanel';
import OpportunityCard from '../opportunities/OpportunityCard';
import { FilterIcon } from '../../Icons';

interface OpportunitiesViewProps {
    setCurrentPage: (page: Page, id?: number) => void;
}

const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({ setCurrentPage }) => {
    const [filters, setFilters] = useState({
        categories: [] as string[],
        distance: 50,
        urgency: 'any',
        lowCompetition: false,
        plusClient: false,
        materialsProvided: false,
    });
    const [sortBy, setSortBy] = useState('newest');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const filteredAndSortedOpportunities = useMemo(() => {
        let result = opportunitiesData
            .filter(op => filters.categories.length === 0 || filters.categories.includes(op.category))
            .filter(op => op.distance <= filters.distance)
            .filter(op => !filters.lowCompetition || op.proposalsSent < 3)
            .filter(op => !filters.plusClient || op.isPlusClient)
            .filter(op => !filters.materialsProvided || op.hasMaterials);
            
        // Urgency filter is simplified for mock data
        if (filters.urgency === 'today') {
            result = result.filter(op => op.date === 'Para Hoje');
        } else if (filters.urgency === 'tomorrow') {
            result = result.filter(op => op.date === 'Para Amanhã');
        }

        switch (sortBy) {
            case 'distance':
                result.sort((a, b) => a.distance - b.distance);
                break;
            case 'competition':
                result.sort((a, b) => a.proposalsSent - b.proposalsSent);
                break;
            case 'newest':
            default:
                // Assuming IDs are incremental for "newest"
                result.sort((a, b) => b.id - a.id);
                break;
        }

        return result;
    }, [filters, sortBy]);

    const handleCardClick = (opportunityId: number) => {
        setCurrentPage('opportunity-detail', opportunityId);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                 <div>
                    <h1 className="text-3xl font-bold text-gray-800">Encontre Novas Oportunidades</h1>
                    <p className="text-gray-600 mt-1">Filtre e encontre os melhores trabalhos para você.</p>
                </div>
                <button 
                    onClick={() => setIsFiltersOpen(true)}
                    className="lg:hidden mt-4 w-full flex items-center justify-center bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Filtrar e Ordenar
                </button>
            </div>
            
            <div className="flex-1 flex gap-8">
                {/* Desktop Filters */}
                <aside className="hidden lg:block w-80 flex-shrink-0">
                    <div className="sticky top-24">
                        <OpportunityFiltersPanel filters={filters} setFilters={setFilters} />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between mb-6">
                        <p className="text-sm text-gray-600">
                            Exibindo <span className="font-bold text-gray-800">{filteredAndSortedOpportunities.length}</span> oportunidades
                        </p>
                        <div>
                            <label htmlFor="sort" className="sr-only">Ordenar por</label>
                            <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-sm border-gray-300 rounded-md focus:ring-[#2A8C82] focus:border-[#2A8C82]">
                                <option value="newest">Mais Recentes</option>
                                <option value="distance">Menor Distância</option>
                                <option value="competition">Menor Concorrência</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredAndSortedOpportunities.map(op => (
                           <OpportunityCard key={op.id} opportunity={op} onClick={() => handleCardClick(op.id)} />
                        ))}
                    </div>
                </main>
            </div>

            {/* Mobile Filters Modal */}
            {isFiltersOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsFiltersOpen(false)}>
                    <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-gray-50 shadow-lg p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <h2 className="text-xl font-bold">Filtros</h2>
                        <OpportunityFiltersPanel filters={filters} setFilters={setFilters} />
                         <button 
                            onClick={() => setIsFiltersOpen(false)}
                            className="mt-6 w-full bg-[#2A8C82] text-white py-2.5 rounded-lg font-semibold"
                        >
                            Ver Resultados
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OpportunitiesView;