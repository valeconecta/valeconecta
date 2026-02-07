
import React, { useState } from 'react';
import { CheckCircleIcon } from '../components/Icons';

const Checkmark: React.FC<{ available: boolean }> = ({ available }) => {
    if (available) {
        return <CheckCircleIcon className="h-6 w-6 text-[#2A8C82]" />;
    }
    return <span className="text-gray-400 font-bold">-</span>;
};

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <span className="text-lg font-medium text-[#333333]">{question}</span>
                <svg className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && <div className="mt-4 text-[#666666]">{children}</div>}
        </div>
    );
}

const PlusPage: React.FC = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-[#2A8C82] text-white pt-16 pb-20 text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-[#2A8C82] bg-[#FFD700] rounded-full">
                        PREMIUM
                    </span>
                    <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Vale Conecta Plus
                    </h1>
                    <p className="mt-6 text-xl text-white/90 max-w-3xl mx-auto">
                        A experiência definitiva para cuidar do seu lar com máxima conveniência, economia e um toque pessoal.
                    </p>
                </div>
            </section>

            {/* Benefits Table Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-[#333333] mb-12">Compare os Planos</h2>
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-[#E8F3F1]">
                                <tr>
                                    <th className="p-6 text-lg font-semibold text-[#333333]">Benefício</th>
                                    <th className="p-6 text-lg font-semibold text-center text-[#333333]">Básico</th>
                                    <th className="p-6 text-lg font-semibold text-center text-[#2A8C82] bg-[#B0E0E6]/50">Plus</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="p-6 font-medium">Acesso à plataforma e profissionais</td>
                                    <td className="p-6 text-center"><Checkmark available={true} /></td>
                                    <td className="p-6 text-center"><Checkmark available={true} /></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="p-6 font-medium">Garantia de Confiança e Pagamento Seguro</td>
                                    <td className="p-6 text-center"><Checkmark available={true} /></td>
                                    <td className="p-6 text-center"><Checkmark available={true} /></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="p-6 font-medium">Comissão de Serviço</td>
                                    <td className="p-6 text-center font-semibold text-[#666666]">Padrão</td>
                                    <td className="p-6 text-center font-semibold text-[#2A8C82]">Reduzida em 50%</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="p-6 font-medium">Prioridade no Agendamento</td>
                                    <td className="p-6 text-center"><Checkmark available={false} /></td>
                                    <td className="p-6 text-center"><Checkmark available={true} /></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="p-6 font-medium">Gerente do Lar Dedicado</td>
                                    <td className="p-6 text-center"><Checkmark available={false} /></td>
                                    <td className="p-6 text-center"><Checkmark available={true} /></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="p-6 font-medium">Suporte Exclusivo via WhatsApp</td>
                                    <td className="p-6 text-center"><Checkmark available={false} /></td>
                                    <td className="p-6 text-center"><Checkmark available={true} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-[#E8F3F1]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="max-w-md mx-auto text-center bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-[#333333]">Assine o Plus</h3>
                        <p className="mt-2 text-[#666666]">Todos os benefícios por um preço acessível.</p>
                        <div className="my-8">
                            <span className="text-5xl font-extrabold text-[#2A8C82]">R$29,90</span>
                            <span className="text-lg text-[#666666]">/mês</span>
                        </div>
                        <button className="w-full bg-[#2A8C82] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">
                            Quero ser Plus
                        </button>
                        <p className="mt-4 text-sm text-[#666666]">Cancele quando quiser.</p>
                    </div>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-[#333333]">Perguntas Frequentes</h2>
                    <div className="max-w-3xl mx-auto mt-8">
                        <FaqItem question="O que é o Gerente do Lar?">
                            <p>O Gerente do Lar é um especialista da nossa equipe dedicado a você. Ele te ajuda a encontrar os melhores profissionais, agendar serviços recorrentes, e garante que tudo corra perfeitamente, como um concierge pessoal para sua casa.</p>
                        </FaqItem>
                         <FaqItem question="Como funciona a taxa de serviço reduzida?">
                            <p>Assinantes Plus pagam uma comissão 50% menor sobre o valor de cada serviço contratado. Se a taxa padrão é de 10%, por exemplo, você pagará apenas 5%. Uma economia significativa, especialmente em serviços maiores.</p>
                        </FaqItem>
                         <FaqItem question="Posso cancelar minha assinatura a qualquer momento?">
                            <p>Sim! A assinatura do Vale Conecta Plus não tem fidelidade. Você pode cancelar quando quiser, sem burocracia, diretamente pelo seu perfil na plataforma.</p>
                        </FaqItem>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PlusPage;
