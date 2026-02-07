
import React from 'react';
import Chatbot from '../components/Chatbot';
import { BroomIcon, LeafIcon, PaintBrushIcon, ShieldCheckIcon, StarIcon, WrenchIcon } from '../components/Icons';
import { Page } from '../types';
import { professionals, Professional } from '../data/professionals';

interface HomePageProps {
  setCurrentPage: (page: Page, id?: number) => void;
}

const CategoryCard: React.FC<{ icon: React.ReactNode; title: string; }> = ({ icon, title }) => (
  <div className="group text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
    <div className="inline-block p-4 bg-[#E8F3F1] rounded-full group-hover:bg-[#2A8C82] transition-colors duration-300">
      {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8 text-[#2A8C82] group-hover:text-white transition-colors duration-300" })}
    </div>
    <h3 className="mt-4 font-semibold text-[#333333]">{title}</h3>
  </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; service: string }> = ({ quote, name, service }) => (
  <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
    <div className="flex text-[#FFD700]">
      {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-5 w-5" />)}
    </div>
    <blockquote className="mt-4 text-[#666666] italic">"{quote}"</blockquote>
    <div className="mt-4">
      <p className="font-bold text-[#333333]">{name}</p>
      <p className="text-sm text-[#666666]">{service}</p>
    </div>
  </div>
);

const FeaturedProfessionalCard: React.FC<{ professional: Professional; setCurrentPage: (page: Page, id?: number) => void; }> = ({ professional, setCurrentPage }) => (
  <div className="bg-white rounded-xl border border-gray-200 text-center overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
    <div className="relative h-40">
        <img src={professional.photoUrl} alt={professional.name} className="w-full h-full object-cover" />
    </div>
    <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 truncate">{professional.name}</h3>
        <p className="font-semibold text-sm text-[#2A8C82] mt-1">{professional.category}</p>
        <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="font-bold text-gray-700">{professional.rating.toFixed(1)}</span>
            <span className="ml-1">({professional.reviewCount})</span>
        </div>
        <button 
            onClick={() => setCurrentPage('professional-profile', professional.id)}
            className="mt-4 w-full bg-white border-2 border-[#2A8C82] text-[#2A8C82] px-4 py-2 rounded-lg font-semibold hover:bg-[#2A8C82] hover:text-white transition-colors"
        >
            Ver Perfil
        </button>
    </div>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({setCurrentPage}) => {
  return (
    <>
      {/* Hero Section */}
      <section className="custom-gradient pt-16 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#333333] tracking-tight leading-tight">
                A solução completa para sua casa, <span className="text-[#2A8C82]">conectada a você.</span>
              </h1>
              <p className="mt-6 text-lg text-[#666666] max-w-xl mx-auto lg:mx-0">
                Descreva o que precisa, receba propostas de profissionais qualificados e resolva tudo em um só lugar. Simples, rápido e seguro.
              </p>
            </div>
            <div>
              <Chatbot />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#333333]">Serviços mais procurados</h2>
          <p className="mt-4 text-lg text-[#666666] max-w-2xl mx-auto">Encontre ajuda para qualquer tarefa, grande ou pequena.</p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-8">
            <CategoryCard icon={<WrenchIcon />} title="Reparos Gerais" />
            <CategoryCard icon={<PaintBrushIcon />} title="Pintura" />
            <CategoryCard icon={<BroomIcon />} title="Faxina e Limpeza" />
            <CategoryCard icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 12H3"/><path d="M16 12h-2"/><path d="M6 12v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"/><path d="M18 12v2a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4v-2"/></svg>} title="Encanamento" />
            <CategoryCard icon={<LeafIcon />} title="Serviços Ecológicos" />
          </div>
        </div>
      </section>

      {/* Featured Professionals Section */}
      <section className="py-20 bg-gray-50/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#333333]">Profissionais em Destaque</h2>
          <p className="mt-4 text-lg text-[#666666] max-w-2xl mx-auto">Conheça alguns dos nossos melhores talentos, avaliados pela comunidade.</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {professionals.slice(0, 8).map(prof => (
                <FeaturedProfessionalCard key={prof.id} professional={prof} setCurrentPage={setCurrentPage} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Trust Guarantee Section */}
      <section className="py-20 bg-[#E8F3F1]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
               <ShieldCheckIcon className="h-16 w-16 text-[#2A8C82] mx-auto md:mx-0" />
              <h2 className="text-3xl font-bold text-[#333333] mt-4">Nossa Garantia de Confiança</h2>
              <p className="mt-4 text-lg text-[#666666]">
                Sua tranquilidade é nossa prioridade. Com a Vale Conecta, você tem a segurança que merece.
              </p>
              <ul className="mt-6 space-y-4 text-left">
                <li className="flex items-start">
                  <ShieldCheckIcon className="h-6 w-6 text-[#2A8C82] mr-3 flex-shrink-0 mt-1" />
                  <span><strong>Pagamento Seguro (Escrow):</strong> Liberamos o pagamento ao profissional só depois que você confirma a conclusão do serviço.</span>
                </li>
                <li className="flex items-start">
                   <ShieldCheckIcon className="h-6 w-6 text-[#2A8C82] mr-3 flex-shrink-0 mt-1" />
                  <span><strong>Profissionais Verificados:</strong> Todos os "Conectados" passam por um processo de verificação de documentos e antecedentes.</span>
                </li>
                 <li className="flex items-start">
                   <ShieldCheckIcon className="h-6 w-6 text-[#2A8C82] mr-3 flex-shrink-0 mt-1" />
                  <span><strong>Suporte Dedicado:</strong> Nossa equipe está pronta para ajudar em qualquer etapa do processo.</span>
                </li>
              </ul>
            </div>
            <div>
              <img src="https://i.postimg.cc/QC4fnxmg/background-removed-image-ZXd-JP4VBRQKp-X2WSi-Ru-OA.png" alt="Cliente satisfeito com o serviço" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#333333]">O que nossos clientes dizem</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard name="Mariana S." service="Instalação de Prateleiras" quote="Plataforma incrível! Encontrei um profissional ótimo em menos de uma hora e o serviço foi impecável. O pagamento seguro me deu muita tranquilidade." />
            <TestimonialCard name="João Pedro" service="Pintura de Quarto" quote="O 'Conectado' foi super profissional e ainda me ajudou a escolher a tinta certa pelo marketplace integrado. Economizei tempo e dor de cabeça." />
            <TestimonialCard name="Cláudia R." service="Reparo Elétrico" quote="Tinha medo de contratar alguém online, mas a Vale Conecta superou minhas expectativas. Perfil completo, avaliações reais e tudo muito transparente." />
          </div>
        </div>
      </section>
      
       {/* Plus Banner Section */}
      <section className="bg-white pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#2A8C82] rounded-lg p-10 md:p-16 text-center text-white relative overflow-hidden">
             <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
             <div className="absolute -bottom-16 -right-5 w-48 h-48 bg-white/10 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold">Eleve sua experiência com o Vale Conecta Plus</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Tenha acesso a benefícios exclusivos, taxas reduzidas e um gerente do lar para cuidar de tudo por você.
            </p>
            <button onClick={() => setCurrentPage('plus')} className="mt-8 bg-[#FFD700] text-[#333333] font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
              Conheça o Plano Plus
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;