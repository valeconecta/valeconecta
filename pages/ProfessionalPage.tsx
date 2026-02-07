
import React from 'react';
import { AwardIcon, CheckCircleIcon, DollarSignIcon, MessageSquareIcon, StarIcon } from '../components/Icons';
import EarningsCalculator from '../components/EarningsCalculator';
import { Page } from '../types';

interface ProfessionalPageProps {
  setCurrentPage: (page: Page, id?: number) => void;
}

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
        {icon}
        <h3 className="mt-4 text-xl font-bold text-[#333333]">{title}</h3>
        <p className="mt-2 text-[#666666]">{description}</p>
    </div>
);

const Medalha: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <div className="flex flex-col items-center text-center p-4 bg-[#E8F3F1] rounded-lg">
        {icon}
        <span className="mt-2 font-semibold text-[#2A8C82] text-sm">{label}</span>
    </div>
);

const Step: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-4">
      <div>
        <div className="flex items-center justify-center w-10 h-10 border rounded-full border-[#2A8C82]">
          <span className="text-lg font-bold text-[#2A8C82]">{number}</span>
        </div>
      </div>
      <div className="w-px h-full bg-[#2A8C82]/30"></div>
    </div>
    <div className="pb-8">
      <p className="mb-2 text-xl font-bold text-[#333333]">{title}</p>
      <p className="text-[#666666]">{description}</p>
    </div>
  </div>
);

const ProfessionalPage: React.FC<ProfessionalPageProps> = ({ setCurrentPage }) => {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-[#E8F3F1] pt-16 pb-20 text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333333] tracking-tight">
                        Ganhe dinheiro e <span className="text-[#2A8C82]">otimize seu tempo.</span>
                    </h1>
                    <p className="mt-6 text-lg text-[#666666] max-w-2xl mx-auto">
                        Conecte-se a clientes qualificados, gerencie seus serviços e foque no que você faz de melhor. Nós cuidamos do resto.
                    </p>
                    <button onClick={() => setCurrentPage('professional-dashboard')} className="mt-8 bg-[#2A8C82] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">
                        Acessar meu painel
                    </button>
                </div>
            </section>

            {/* Main Content with Calculator */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-[#333333]">Seja seu próprio chefe com a Vale Conecta</h2>
                            <p className="mt-4 text-lg text-[#666666]">Oferecemos as ferramentas e o suporte que você precisa para ter sucesso. Flexibilidade total para trabalhar quando e onde quiser.</p>
                            <ul className="mt-6 space-y-4">
                                <li className="flex items-center text-lg"><CheckCircleIcon className="h-6 w-6 text-[#2A8C82] mr-3" /> Clientes realmente interessados.</li>
                                <li className="flex items-center text-lg"><CheckCircleIcon className="h-6 w-6 text-[#2A8C82] mr-3" /> Pagamento garantido e rápido.</li>
                                <li className="flex items-center text-lg"><CheckCircleIcon className="h-6 w-6 text-[#2A8C82] mr-3" /> Ferramentas de gestão integradas.</li>
                            </ul>
                        </div>
                        <EarningsCalculator />
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-[#E8F3F1]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#333333]">Vantagens de ser um Conectado</h2>
                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <BenefitCard icon={<DollarSignIcon className="h-12 w-12 mx-auto text-[#2A8C82]" />} title="Filtro de Créditos" description="Invista créditos para enviar propostas apenas para clientes sérios, aumentando sua taxa de conversão." />
                        <BenefitCard icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 mx-auto text-[#2A8C82]"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>} title="Marketplace de Materiais" description="Menos tempo comprando materiais. Adicione tudo ao pedido e receba na casa do cliente ou retire na loja." />
                        <BenefitCard icon={<MessageSquareIcon className="h-12 w-12 mx-auto text-[#2A8C82]" />} title="Comunicação Direta" description="Use nosso chat seguro para alinhar detalhes com o cliente antes de fechar o serviço." />
                    </div>
                </div>
            </section>
            
            {/* Gamification Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#333333]">Conquiste Medalhas e Destaque-se</h2>
                    <p className="mt-4 text-lg text-[#666666] max-w-2xl mx-auto">Seu bom trabalho é recompensado. Ganhe medalhas que aumentam sua visibilidade e confiança na plataforma.</p>
                    <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
                        <Medalha icon={<AwardIcon className="h-10 w-10 text-[#FFD700]" />} label="Top Pro" />
                        <Medalha icon={<CheckCircleIcon className="h-10 w-10 text-[#2A8C82]" />} label="Verificado" />
                        <Medalha icon={<StarIcon className="h-10 w-10 text-[#B0E0E6]" />} label="5 Estrelas" />
                        <Medalha icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-[#2A8C82]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>} label="Seguro" />
                         <Medalha icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-[#2A8C82]"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M3 10h18"/></svg>} label="Pontual" />
                    </div>
                </div>
            </section>

             {/* How to Start Section */}
            <section className="py-20 bg-[#E8F3F1]">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-[#333333] mb-12">Comece em 4 passos simples</h2>
                     <div className="max-w-2xl mx-auto">
                        <Step number="1" title="Crie seu perfil" description="Cadastre-se gratuitamente e preencha suas informações e habilidades. Um perfil completo atrai mais clientes." />
                        <Step number="2" title="Compre Créditos" description="Adquira um pacote de créditos para poder enviar propostas. É o seu investimento para acessar clientes qualificados." />
                        <Step number="3" title="Envie Propostas" description="Navegue pelas tarefas disponíveis na sua área, use seus créditos e envie propostas detalhadas para os serviços que te interessam." />
                        <div className="flex">
                           <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full border-[#2A8C82]">
                                    <span className="text-lg font-bold text-[#2A8C82]">4</span>
                                    </div>
                                </div>
                            </div>
                           <div className="pb-8">
                                <p className="mb-2 text-xl font-bold text-[#333333]">Realize o Serviço e Receba</p>
                                <p className="text-[#666666]">Após o cliente aceitar, realize o trabalho. O pagamento é liberado para você 3 dias após a confirmação de conclusão.</p>
                           </div>
                        </div>
                     </div>
                 </div>
            </section>
        </>
    );
};

export default ProfessionalPage;
