
import React from 'react';
import { categories } from '../../../data/professionals';

interface Filters {
    categories: string[];
    distance: number;
    urgency: string;
    lowCompetition: boolean;
    plusClient: boolean;
    materialsProvided: boolean;
}

interface OpportunityFiltersPanelProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const OpportunityFiltersPanel: React.FC<OpportunityFiltersPanelProps> = ({ filters, setFilters }) => {

    const handleCategoryChange = (category: string) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFilters(prev => ({ ...prev, [name]: checked }));
    };

    return (
        <div className="space-y-6">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800">Categorias</h3>
                <div className="mt-4 space-y-2">
                    {categories.map(cat => (
                        <label key={cat} className="flex items-center space-x-2 text-gray-600">
                            <input
                                type="checkbox"
                                checked={filters.categories.includes(cat)}
                                onChange={() => handleCategoryChange(cat)}
                                className="h-4 w-4 rounded border-gray-300 text-[#2A8C82] focus:ring-[#2A8C82]"
                            />
                            <span>{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800">Localização</h3>
                <div className="mt-4">
                    <label className="text-sm font-medium text-gray-600">
                        Distância Máxima: <span className="font-bold text-[#2A8C82]">{filters.distance} km</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={filters.distance}
                        onChange={e => setFilters(prev => ({...prev, distance: Number(e.target.value)}))}
                        className="w-full h-2 mt-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{ accentColor: '#2A8C82' }}
                    />
                </div>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800">Urgência</h3>
                <div className="mt-4 space-y-2">
                     {['any', 'today', 'tomorrow', 'week'].map(urg => (
                         <label key={urg} className="flex items-center space-x-2 text-gray-600">
                            <input
                                type="radio"
                                name="urgency"
                                value={urg}
                                checked={filters.urgency === urg}
                                onChange={e => setFilters(prev => ({...prev, urgency: e.target.value}))}
                                className="h-4 w-4 border-gray-300 text-[#2A8C82] focus:ring-[#2A8C82]"
                            />
                             <span>{ {any: 'Qualquer data', today: 'Para Hoje', tomorrow: 'Para Amanhã', week: 'Esta Semana'}[urg] }</span>
                        </label>
                     ))}
                </div>
            </div>

             <div className="p-5 bg-white border border-gray-200 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800">Filtros Estratégicos</h3>
                <div className="mt-4 space-y-3">
                    <label className="flex items-center space-x-2 text-gray-600">
                        <input
                            type="checkbox"
                            name="lowCompetition"
                            checked={filters.lowCompetition}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 rounded border-gray-300 text-[#2A8C82] focus:ring-[#2A8C82]"
                        />
                        <span>Baixa Concorrência (&lt; 3 propostas)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-gray-600">
                        <input
                            type="checkbox"
                            name="plusClient"
                            checked={filters.plusClient}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 rounded border-gray-300 text-[#2A8C82] focus:ring-[#2A8C82]"
                        />
                        <span>Cliente "Vale Conecta Plus"</span>
                    </label>
                    <label className="flex items-center space-x-2 text-gray-600">
                        <input
                            type="checkbox"
                            name="materialsProvided"
                            checked={filters.hasMaterials}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 rounded border-gray-300 text-[#2A8C82] focus:ring-[#2A8C82]"
                        />
                        <span>Cliente já forneceu materiais</span>
                    </label>
                </div>
            </div>
            <button onClick={() => setFilters({ categories: [], distance: 50, urgency: 'any', lowCompetition: false, plusClient: false, materialsProvided: false })} className="w-full text-sm text-gray-600 font-semibold hover:text-red-600">Limpar Filtros</button>
        </div>
    );
};

export default OpportunityFiltersPanel;