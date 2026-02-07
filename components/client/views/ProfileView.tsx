import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { EditIcon, PlusCircleIcon, SaveIcon, SpinnerIcon, Trash2Icon, XIcon } from '../../Icons';
import AddressModal from '../AddressModal';
import { useAuth } from '../../../AuthContext';

// Define types for the data from Supabase
interface UserProfile {
    id: string; // O ID do Supabase Auth é uma string (UUID)
    name: string;
    email: string;
}

interface Address {
    id: number;
    name: string;
    full_address: string;
}

const ProfileView: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [isSaving, setIsSaving] = useState(false);

    const [isAddressModalOpen, setAddressModalOpen] = useState(false);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setError("Você precisa estar logado para ver seu perfil.");
            setLoading(false);
            return;
        }

        const fetchProfileData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Busca o perfil do usuário na tabela 'users' usando o ID da sessão
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('id, name, email')
                    .eq('id', user.id) // USA O ID DO USUÁRIO AUTENTICADO
                    .single();

                if (userError) throw userError;
                if (!userData) throw new Error(`Perfil de usuário não encontrado.`);
                
                setProfile({ ...userData, email: user.email || '' });
                setFormData({ name: userData.name, email: user.email || '' });
                
                // Busca os endereços associados
                const { data: addressesData, error: addressesError } = await supabase
                    .from('addresses')
                    .select('id, name, full_address')
                    .eq('user_id', user.id); // USA O ID DO USUÁRIO AUTENTICADO

                if (addressesError) throw addressesError;
                setAddresses(addressesData || []);

            } catch (err: any) {
                console.error("Error fetching profile data:", err);
                setError('Não foi possível carregar seus dados. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [user, authLoading]);

    const handleEditInfo = () => {
        if (profile) {
            setFormData({ name: profile.name, email: profile.email });
            setIsEditingInfo(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditingInfo(false);
    };

    const handleSaveInfo = async () => {
        if (!user) return;
        setIsSaving(true);
        // Atualiza apenas o 'name' na tabela 'users'. O email é gerenciado pelo Supabase Auth.
        const { data, error } = await supabase
            .from('users')
            .update({ name: formData.name })
            .eq('id', user.id)
            .select()
            .single();
        
        if (error) {
            alert('Erro ao salvar as informações.');
            console.error(error);
        } else if (data) {
            setProfile({ ...data, email: user.email || '' });
            setIsEditingInfo(false);
        }
        setIsSaving(false);
    };

    const handleSaveAddress = async (newAddress: { name: string, fullAddress: string }) => {
        if (!user) return;
        const { data, error } = await supabase
            .from('addresses')
            .insert([{ 
                user_id: user.id, // USA O ID DO USUÁRIO AUTENTICADO
                name: newAddress.name, 
                full_address: newAddress.fullAddress 
            }])
            .select()
            .single();

        if (error) {
            alert('Erro ao adicionar endereço.');
            console.error(error);
        } else {
            setAddresses(prev => [...prev, data]);
            setAddressModalOpen(false);
        }
    };

    const handleRemoveAddress = async (addressId: number) => {
        if (window.confirm('Tem certeza que deseja remover este endereço?')) {
            const { error } = await supabase
                .from('addresses')
                .delete()
                .eq('id', addressId);

            if (error) {
                alert('Erro ao remover endereço.');
                console.error(error);
            } else {
                setAddresses(prev => prev.filter(addr => addr.id !== addressId));
            }
        }
    };

    if (loading || authLoading) {
        return <div className="flex justify-center items-center h-64"><SpinnerIcon className="h-10 w-10 animate-spin text-[#2A8C82]"/></div>;
    }

    if (error) {
        return <div className="text-center p-8 bg-red-50 text-red-700 rounded-lg">{error}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Minha Conta</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Informações Pessoais</h2>
                            {!isEditingInfo && (
                                <button onClick={handleEditInfo} className="flex items-center text-sm font-semibold text-[#2A8C82] hover:underline">
                                    <EditIcon className="h-4 w-4 mr-1"/> Editar
                                </button>
                            )}
                        </div>
                        {isEditingInfo ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Nome</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md mt-1"/>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Email</label>
                                    <input type="email" value={formData.email} disabled className="w-full p-2 border border-gray-300 rounded-md mt-1 bg-gray-100 cursor-not-allowed"/>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button onClick={handleCancelEdit} className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold text-sm hover:bg-gray-300">
                                        <XIcon className="h-4 w-4 mr-2" />
                                        Cancelar
                                    </button>
                                    <button onClick={handleSaveInfo} disabled={isSaving} className="flex items-center px-4 py-2 bg-[#2A8C82] text-white rounded-lg font-semibold text-sm hover:bg-opacity-90 disabled:bg-gray-400">
                                        {isSaving ? <SpinnerIcon className="h-4 w-4 mr-2 animate-spin" /> : <SaveIcon className="h-4 w-4 mr-2" />}
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Nome</label>
                                    <p className="w-full p-2 bg-gray-50 rounded-md mt-1">{profile?.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Email</label>
                                    <p className="w-full p-2 bg-gray-50 rounded-md mt-1">{profile?.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Segurança</h2>
                        <button onClick={() => alert('A funcionalidade de alteração de senha estará disponível em breve.')} className="font-semibold text-[#2A8C82] border border-[#2A8C82] px-4 py-2 rounded-lg hover:bg-[#E8F3F1]">
                            Alterar Senha
                        </button>
                    </div>
                </div>

                {/* Addresses */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Meus Endereços</h2>
                    <div className="space-y-4">
                        {addresses.map(addr => (
                            <div key={addr.id} className="group border border-gray-200 rounded-lg p-3 relative">
                                <p className="font-semibold text-gray-700">{addr.name}</p>
                                <p className="text-sm text-gray-600">{addr.full_address}</p>
                                <button onClick={() => handleRemoveAddress(addr.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2Icon className="h-4 w-4"/>
                                </button>
                            </div>
                        ))}
                        {addresses.length === 0 && <p className="text-sm text-gray-500 text-center py-4">Nenhum endereço cadastrado.</p>}
                    </div>
                    <button onClick={() => setAddressModalOpen(true)} className="mt-6 w-full flex items-center justify-center bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-200">
                        <PlusCircleIcon className="h-5 w-5 mr-2"/>
                        Adicionar Novo Endereço
                    </button>
                </div>
            </div>
            
            <AddressModal 
                isOpen={isAddressModalOpen}
                onClose={() => setAddressModalOpen(false)}
                onSave={handleSaveAddress}
            />
        </div>
    );
};

export default ProfileView;