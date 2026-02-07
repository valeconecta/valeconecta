
import React, { useState } from 'react';
import { Payment } from '@mercadopago/sdk-react';
import { SpinnerIcon } from './Icons';

// A inicialização foi movida para o arquivo principal da aplicação (App.tsx)

interface CheckoutFormProps {
  proposalId: number;
  amount: number;
  onSuccess?: (paymentData: any) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ proposalId, amount, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      // O 'formData' contém os dados do cartão tokenizados, prontos para serem enviados ao seu backend.
      const response = await fetch(`/api/v1/proposals/${proposalId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Ocorreu um erro ao processar seu pagamento.');
      }
      
      // Se a chamada ao backend for bem-sucedida, invoca o callback.
      if (onSuccess) {
        onSuccess(responseData);
      }

    } catch (err: any) {
      setError(err.message || 'Não foi possível completar o pagamento. Verifique seus dados e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout de Pagamento</h2>
      <p className="text-gray-600 mb-6">Preencha os dados para efetuar o pagamento seguro.</p>
      
      {/* O Payment Brick renderiza o formulário completo e o botão de pagamento */}
      <Payment
        initialization={{ amount }}
        // FIX: Added the required 'customization' prop for the Payment Brick.
        customization={{
            paymentMethods: {
                creditCard: 'all',
                debitCard: 'all',
            }
        }}
        onSubmit={handleSubmit}
        onReady={() => console.log('Payment Brick está pronto!')}
        onError={(err) => {
          console.error('Erro no Payment Brick:', err);
          setError('Não foi possível carregar o formulário de pagamento. Por favor, recarregue a página.');
        }}
      />

      {isLoading && (
        <div className="mt-4 flex items-center justify-center text-gray-600">
          <SpinnerIcon className="h-5 w-5 animate-spin mr-2" />
          <span>Processando pagamento...</span>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-600 text-center bg-red-50 p-3 rounded-md">{error}</p>
      )}
    </div>
  );
};

export default CheckoutForm;
