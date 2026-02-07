
import React, { useState } from 'react';
import { platformSettings, serviceCategories, medalhasDeReconhecimento, administrators, creditPackages as initialCreditPackages } from '../../../data/adminMockData';
import { SaveIcon, Trash2Icon, EditIcon, PlusCircleIcon } from '../../Icons';

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button
        onClick={() => onChange(!enabled)}
        className={`${enabled ? 'bg-[#2A8C82]' : 'bg-gray-300'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
    >
        <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
    </button>
);

const SettingsView = () => {
    const [settings, setSettings] = useState(platformSettings);
    const [categories, setCategories] = useState(serviceCategories);
    const [newCategory, setNewCategory] = useState('');
    const [medalhas, setMedalhas] = useState(medalhasDeReconhecimento);
    const [novaMedalha, setNovaMedalha] = useState('');
    const [creditPackages, setCreditPackages] = useState(initialCreditPackages);

    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            setCategories([...categories, newCategory.trim()]);
            setNewCategory('');
        }
    };
    
    const handleRemoveCategory = (categoryToRemove: string) => {
        setCategories(categories.filter(cat => cat !== categoryToRemove));
    };

    const handleAddMedalha = (e: React.FormEvent) => {
        e.preventDefault();
        if (novaMedalha.trim() && !medalhas.includes(novaMedalha.trim())) {
            setMedalhas([...medalhas, novaMedalha.trim()]);
            setNovaMedalha('');
        }
    };

    const handleRemoveMedalha = (medalhaToRemove: string) => {
        setMedalhas(medalhas.filter(medalha => medalha !== medalhaToRemove));
    };

    const handlePackageChange = (id: number, field: string, value: string | number | boolean) => {
        setCreditPackages(prev => prev.map(pkg => pkg.id === id ? { ...pkg, [field]: value } : pkg));
    };

    const handleRemovePackage = (id: number) => {
        setCreditPackages(prev => prev.filter(pkg => pkg.id !== id));
    };

    const handleAddPackage = () => {
        const newId = Math.max(0, ...creditPackages.map(p => p.id)) + 1;
        setCreditPackages(prev => [...prev, { id: newId, credits: 10, price: 15.00, popular: false }]);
    };

    const handleSaveChanges = () => {
        // Em uma aplicação real, aqui seria a chamada para a API
        console.log('Saving changes:', { settings, categories, medalhas, creditPackages });
        alert('Alterações salvas com sucesso! (ver console)');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>
                <button onClick={handleSaveChanges} className="flex items-center bg-[#2A8C82] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90">
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Salvar Alterações
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
                    <h2 className="text-xl font-bold text-gray-800">Geral</h2>
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome da Plataforma</label>
                        <input type="text" id="name" name="name" value={settings.name} onChange={handleSettingsChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                    </div>
                    <div>
                        <label htmlFor="commissionRate" className="text-sm font-medium text-gray-700">Taxa de Comissão (%)</label>
                        <input type="number" id="commissionRate" name="commissionRate" value={settings.commissionRate} onChange={handleSettingsChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                    </div>
                    <div>
                        <label htmlFor="contactUnlockCost" className="text-sm font-medium text-gray-700">Créditos para Desbloquear Contato</label>
                        <input type="number" id="contactUnlockCost" name="contactUnlockCost" value={settings.contactUnlockCost} onChange={handleSettingsChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                        <p className="text-xs text-gray-500 mt-1">Custo base para um profissional gastar para ver os dados de contato de um cliente.</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <div>
                            <p className="text-sm font-medium text-gray-700">Modo Manutenção</p>
                            <p className="text-xs text-gray-500">Desativa o site para visitantes e mostra uma página "em breve".</p>
                        </div>
                        <ToggleSwitch enabled={settings.maintenanceMode} onChange={(val) => setSettings(p => ({...p, maintenanceMode: val}))} />
                    </div>
                </div>

                {/* Admins */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                     <h2 className="text-xl font-bold text-gray-800 mb-4">Controle de Acesso</h2>
                     <div className="space-y-3 mb-4">
                        {administrators.map(admin => (
                             <div key={admin.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                <div>
                                    <p className="font-semibold text-gray-800">{admin.name}</p>
                                    <p className="text-xs text-gray-500">{admin.email} - <span className="font-medium">{admin.role}</span></p>
                                </div>
                                <button className="text-red-600 hover:text-red-800"><Trash2Icon className="h-5 w-5" /></button>
                            </div>
                        ))}
                     </div>
                     <button className="w-full bg-blue-100 text-blue-800 font-semibold py-2 rounded-lg text-sm hover:bg-blue-200">Convidar Novo Administrador</button>
                </div>
            </div>

            {/* Credit Package Management */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Gerenciar Pacotes de Crédito</h2>
                <div className="space-y-4">
                    {creditPackages.map(pkg => (
                        <div key={pkg.id} className="grid grid-cols-12 gap-x-4 items-center p-2 rounded-md hover:bg-gray-50">
                            <div className="col-span-4">
                                <label className="text-xs text-gray-500">Créditos</label>
                                <input type="number" value={pkg.credits} onChange={e => handlePackageChange(pkg.id, 'credits', Number(e.target.value))} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"/>
                            </div>
                            <div className="col-span-4">
                                <label className="text-xs text-gray-500">Preço (R$)</label>
                                <input type="number" step="0.01" value={pkg.price} onChange={e => handlePackageChange(pkg.id, 'price', Number(e.target.value))} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"/>
                            </div>
                            <div className="col-span-3 flex items-center space-x-2 pt-4">
                                <ToggleSwitch enabled={pkg.popular} onChange={val => handlePackageChange(pkg.id, 'popular', val)} />
                                <span className="text-sm text-gray-600">Popular</span>
                            </div>
                            <div className="col-span-1 pt-4 text-right">
                                <button onClick={() => handleRemovePackage(pkg.id)} className="text-gray-500 hover:text-red-600"><Trash2Icon className="h-5 w-5"/></button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 border-t pt-4">
                    <button onClick={handleAddPackage} className="w-full flex items-center justify-center bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg text-sm hover:bg-gray-200">
                        <PlusCircleIcon className="h-5 w-5 mr-2"/>
                        Adicionar Novo Pacote
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Category Management */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Gerenciar Categorias de Serviço</h2>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {categories.map(cat => (
                            <div key={cat} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50">
                                <span className="text-sm text-gray-700">{cat}</span>
                                <div className="flex space-x-3">
                                    <button className="text-gray-500 hover:text-blue-600"><EditIcon className="h-4 w-4"/></button>
                                    <button onClick={() => handleRemoveCategory(cat)} className="text-gray-500 hover:text-red-600"><Trash2Icon className="h-4 w-4"/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleAddCategory} className="mt-4 flex space-x-2 border-t pt-4">
                        <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Nova categoria..." className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm" />
                        <button type="submit" className="bg-[#2A8C82] text-white p-2 rounded-lg hover:bg-opacity-90"><PlusCircleIcon className="h-5 w-5"/></button>
                    </form>
                </div>

                 {/* Medalha Management */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Gerenciar Medalhas de Reconhecimento</h2>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {medalhas.map(medalha => (
                            <div key={medalha} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50">
                                <span className="text-sm text-gray-700">{medalha}</span>
                                <div className="flex space-x-3">
                                    <button className="text-gray-500 hover:text-blue-600"><EditIcon className="h-4 w-4"/></button>
                                    <button onClick={() => handleRemoveMedalha(medalha)} className="text-gray-500 hover:text-red-600"><Trash2Icon className="h-4 w-4"/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleAddMedalha} className="mt-4 flex space-x-2 border-t pt-4">
                        <input type="text" value={novaMedalha} onChange={e => setNovaMedalha(e.target.value)} placeholder="Nova medalha..." className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm" />
                        <button type="submit" className="bg-[#2A8C82] text-white p-2 rounded-lg hover:bg-opacity-90"><PlusCircleIcon className="h-5 w-5"/></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
