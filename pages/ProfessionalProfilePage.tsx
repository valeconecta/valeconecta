
import React, { useState } from 'react';
import { getProfessionalById, DetailedProfessional } from '../data/professionalProfileMockData';
import { Page } from '../types';
import { AwardIcon, CalendarDaysIcon, CheckCircleIcon, MessageCircleIcon, ShieldCheckIcon, StarIcon, ToolboxIcon } from '../components/Icons';
import ReviewCard from '../components/profile/ReviewCard';
import { MedalhaType } from '../data/professionals';
import RequestProposalModal from '../components/profile/RequestProposalModal';

interface ProfessionalProfilePageProps {
  professionalId: number;
  setCurrentPage: (page: Page) => void;
}

const MedalhaIcon: React.FC<{ medalha: MedalhaType, className?: string }> = ({ medalha, className }) => {
  const medalhaMap: Record<MedalhaType, React.ReactNode> = {
    'Mestre da Montagem': <ToolboxIcon className={className} />,
    'Super Pontual': <CalendarDaysIcon className={className} />,
    'Excelência em Avaliações': <StarIcon className={className} fill="#FFD700" stroke="#FFD700" />,
    'Top Pro': <AwardIcon className={className} />,
  };
  return <div className="group relative flex items-center">{medalhaMap[medalha]}
    <span className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {medalha}
    </span>
  </div>;
};

const ProfessionalProfilePage: React.FC<ProfessionalProfilePageProps> = ({ professionalId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const professional = getProfessionalById(professionalId);

  if (!professional) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h1 className="text-2xl font-bold">Profissional não encontrado</h1>
        <p className="text-gray-600 mt-2">O perfil que você está tentando acessar não existe ou foi removido.</p>
      </div>
    );
  }
  
  const handleConfirmProposal = () => {
    console.log(`Proposal request confirmed for professional ID: ${professionalId}`);
    // Simula o desconto de créditos do profissional e a abertura do chat.
    alert(`Proposta solicitada com sucesso! Uma conversa com ${professional.name} foi iniciada no seu painel.`);
    setIsModalOpen(false);
  };

  const { name, photoUrl, reviewCount, memberSince, responseRate, pricePerHour, rating, medalhas, bio, services, reviews, gallery } = professional;

  const StickyInfoCard = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center">
      <img src={photoUrl} alt={name} className="w-32 h-32 rounded-full mx-auto ring-4 ring-[#2A8C82]/50" />
      <h1 className="text-3xl font-bold text-gray-800 mt-4">{name}</h1>
      <div className="mt-2 flex items-center justify-center space-x-2 text-green-600 font-semibold">
        <ShieldCheckIcon className="h-5 w-5" />
        <span>Identidade Verificada</span>
      </div>
      <ul className="text-left text-gray-600 space-y-3 mt-6">
        <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-[#2A8C82] mr-3" /> {reviewCount} serviços realizados na plataforma</li>
        <li className="flex items-center"><MessageCircleIcon className="h-5 w-5 text-[#2A8C82] mr-3" /> Taxa de resposta: {responseRate}%</li>
        <li className="flex items-center"><CalendarDaysIcon className="h-5 w-5 text-[#2A8C82] mr-3" /> Membro desde: {memberSince}</li>
      </ul>
      <p className="text-3xl font-extrabold text-gray-800 mt-6">
        A partir de {pricePerHour.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}<span className="text-lg font-medium text-gray-500">/h</span>
      </p>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-4 bg-[#2A8C82] text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
      >
        Solicitar Proposta
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Coluna Esquerda (Sticky) */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
               <div className="hidden lg:block">
                 <StickyInfoCard />
               </div>
            </div>
          </aside>

          {/* Coluna Direita (Scrollable) */}
          <main className="lg:col-span-2 mt-8 lg:mt-0">
            {/* Mobile Header Info */}
            <div className="lg:hidden mb-8">
                <StickyInfoCard />
            </div>

            <div className="space-y-8">
              {/* Rating & Medalhas */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                        <h2 className="text-lg font-bold text-gray-800">Avaliação Geral</h2>
                        <div className="flex items-center mt-2">
                           <StarIcon className="h-7 w-7 text-yellow-400" />
                           <span className="text-3xl font-extrabold text-gray-800 ml-2">{rating.toFixed(2)}</span>
                           <span className="text-gray-500 ml-2"> de 5 ({reviewCount} avaliações)</span>
                        </div>
                    </div>
                     <div className="border-t sm:border-t-0 sm:border-l border-gray-200 pl-0 sm:pl-6 pt-4 sm:pt-0">
                        <h2 className="text-lg font-bold text-gray-800 text-center sm:text-left mb-3">Medalhas</h2>
                         <div className="flex items-center justify-center space-x-4">
                             {medalhas.map(medalha => <MedalhaIcon key={medalha} medalha={medalha} className="w-8 h-8 text-[#2A8C82]" />)}
                        </div>
                    </div>
                 </div>
              </div>

              {/* Sobre */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-800">Sobre {name}</h2>
                <p className="mt-4 text-gray-600 whitespace-pre-line leading-relaxed">{bio}</p>
              </div>

              {/* Serviços */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-800">Serviços Oferecidos</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                    {services.map(service => (
                        <span key={service} className="bg-[#E8F3F1] text-[#2A8C82] text-sm font-semibold px-3 py-1.5 rounded-full">{service}</span>
                    ))}
                </div>
              </div>

              {/* Gallery */}
              {gallery.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-gray-800">Galeria de Projetos</h2>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gallery.map((img, i) => (
                      <img key={i} src={img} alt={`Projeto ${i+1}`} className="rounded-lg object-cover aspect-square cursor-pointer hover:opacity-80 transition-opacity" />
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Avaliações de Clientes</h2>
                     <select className="text-sm border-gray-300 rounded-md focus:ring-[#2A8C82] focus:border-[#2A8C82]">
                        <option>Mais Recentes</option>
                        <option>Mais Relevantes</option>
                    </select>
                </div>
                <div className="space-y-6">
                    {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-[#2A8C82] text-white px-6 py-3 rounded-lg font-bold text-lg"
        >
          Solicitar Proposta
        </button>
      </div>

       <RequestProposalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmProposal}
        professionalName={professional.name}
      />
    </div>
  );
};

export default ProfessionalProfilePage;
