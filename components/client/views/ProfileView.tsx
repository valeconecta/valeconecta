
import React from 'react';
import { userProfile } from '../../../data/clientMockData';
import { EditIcon, PlusCircleIcon, SaveIcon } from '../../Icons';

const ProfileView: React.FC = () => {
  const { name, email, addresses } = userProfile;
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Minha Conta</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Informações Pessoais</h2>
              <button className="flex items-center text-sm font-semibold text-[#2A8C82] hover:underline">
                <EditIcon className="h-4 w-4 mr-1"/> Editar
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Nome</label>
                <input type="text" value={name} readOnly className="w-full p-2 border border-gray-200 bg-gray-50 rounded-md mt-1"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <input type="email" value={email} readOnly className="w-full p-2 border border-gray-200 bg-gray-50 rounded-md mt-1"/>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Segurança</h2>
            <button className="font-semibold text-[#2A8C82] border border-[#2A8C82] px-4 py-2 rounded-lg hover:bg-[#E8F3F1]">
              Alterar Senha
            </button>
          </div>
        </div>

        {/* Addresses */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Meus Endereços</h2>
          <div className="space-y-4">
            {addresses.map(addr => (
              <div key={addr.id} className="border border-gray-200 rounded-lg p-3">
                  <p className="font-semibold text-gray-700">{addr.name}</p>
                  <p className="text-sm text-gray-600">{addr.fullAddress}</p>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full flex items-center justify-center bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-200">
            <PlusCircleIcon className="h-5 w-5 mr-2"/>
            Adicionar Novo Endereço
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
