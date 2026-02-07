import React, { useState } from 'react';
import { XIcon, SaveIcon } from '../Icons';

interface Address {
    name: string;
    fullAddress: string;
}

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (address: Address) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [fullAddress, setFullAddress] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && fullAddress.trim()) {
            onSave({ name, fullAddress });
            setName('');
            setFullAddress('');
        }
    };

    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
          <form onSubmit={handleSubmit}>
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">Adicionar Novo Endereço</h2>
              <button type="button" onClick={onClose}><XIcon className="h-6 w-6 text-gray-500"/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="addr-name" className="block text-sm font-medium text-gray-700">Apelido do Endereço</label>
                <input type="text" id="addr-name" value={name} onChange={e => setName(e.target.value)} required placeholder="Ex: Casa, Trabalho" className="mt-1 w-full p-2 border border-gray-300 rounded-md"/>
              </div>
              <div>
                <label htmlFor="addr-full" className="block text-sm font-medium text-gray-700">Endereço Completo</label>
                <input type="text" id="addr-full" value={fullAddress} onChange={e => setFullAddress(e.target.value)} required placeholder="Rua, Número, Bairro, Cidade, Estado" className="mt-1 w-full p-2 border border-gray-300 rounded-md"/>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t flex justify-end">
              <button type="submit" className="flex items-center bg-[#2A8C82] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90">
                <SaveIcon className="h-4 w-4 mr-2"/>
                Salvar Endereço
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default AddressModal;
