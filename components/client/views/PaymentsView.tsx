
import React from 'react';
import { payments } from '../../../data/clientMockData';
import { PlusCircleIcon } from '../../Icons';

const PaymentsView: React.FC = () => {
  const { history, methods } = payments;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pagamentos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction History */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Histórico de Transações</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3">Serviço</th>
                  <th className="px-6 py-3">Profissional</th>
                  <th className="px-6 py-3 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {history.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{item.service}</td>
                    <td className="px-6 py-4">{item.professional}</td>
                    <td className="px-6 py-4 text-right font-semibold">{item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Meus Cartões</h2>
          <div className="space-y-4">
            {methods.map(method => (
              <div key={method.id} className="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <img src={`https://www.flaticon.com/svg/static/icons/svg/196/${method.brand === 'visa' ? '196578' : '196561'}.svg`} alt={method.brand} className="h-6 w-6 mr-3"/>
                  <div>
                    <p className="font-semibold text-gray-700">{method.details}</p>
                    {method.isDefault && <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Padrão</span>}
                  </div>
                </div>
                <button className="text-xs font-semibold text-red-600 hover:underline">Remover</button>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full flex items-center justify-center bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-200">
            <PlusCircleIcon className="h-5 w-5 mr-2"/>
            Adicionar Novo Cartão
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsView;
