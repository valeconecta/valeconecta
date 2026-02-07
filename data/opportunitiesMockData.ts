import { professionals } from './professionals';
import { proposalsByTaskId } from './clientMockData';
import { financialData } from './professionalMockData';
// FIX: Import getProfessionalById to retrieve full professional details.
import { getProfessionalById } from './professionalProfileMockData';

export interface Opportunity {
  id: number;
  title: string;
  category: string;
  location: string;
  distance: number; // in km
  date: string; // e.g., "Para Amanhã", "15 de Nov"
  isPlusClient: boolean;
  hasMaterials: boolean;
  creditsCost: number;
  proposalsSent: number;
  postedDate: string; // e.g., "há 20 minutos"
  description: string;
}

export const opportunities: Opportunity[] = [
  {
    id: 1,
    title: 'Instalação de TV 65" e Reparo em Tomada',
    category: 'Instalação',
    location: 'Vila Madalena',
    distance: 5,
    date: 'Para Amanhã',
    isPlusClient: true,
    hasMaterials: false,
    creditsCost: 5,
    proposalsSent: 3,
    postedDate: 'há 20 minutos',
    description: 'Preciso de ajuda para instalar uma TV nova na parede da sala e consertar uma tomada que não está funcionando no mesmo cômodo.'
  },
  {
    id: 2,
    title: 'Pintura de um quarto de casal (paredes e teto)',
    category: 'Pintura',
    location: 'Moema',
    distance: 12,
    date: 'Esta Semana',
    isPlusClient: false,
    hasMaterials: true,
    creditsCost: 8,
    proposalsSent: 4,
    postedDate: 'há 2 horas',
    description: 'Quarto de aproximadamente 12m². Tinta e materiais de proteção já comprados. Preciso de um profissional caprichoso.'
  },
  {
    id: 3,
    title: 'Montagem de guarda-roupa 6 portas',
    category: 'Montagem de Móveis',
    location: 'Pinheiros',
    distance: 3,
    date: 'Para Hoje',
    isPlusClient: false,
    hasMaterials: false,
    creditsCost: 6,
    proposalsSent: 0,
    postedDate: 'há 45 minutos',
    description: 'Comprei um guarda-roupa da marca X e preciso de um montador experiente. Manual e todas as peças estão na caixa.'
  },
  {
    id: 4,
    title: 'Limpeza geral pós-obra em apartamento',
    category: 'Faxina e limpeza doméstica',
    location: 'Jardins',
    distance: 8,
    date: 'Sábado, 18 de Nov',
    isPlusClient: true,
    hasMaterials: false,
    creditsCost: 10,
    proposalsSent: 2,
    postedDate: 'há 5 horas',
    description: 'Apartamento de 70m² recém-reformado. Precisa de uma limpeza pesada para remover poeira de gesso e resíduos de tinta.'
  },
   {
    id: 5,
    title: 'Troca de sifão da pia da cozinha',
    category: 'Encanamento',
    location: 'Tatuapé',
    distance: 18,
    date: 'Urgente - Para Hoje',
    isPlusClient: false,
    hasMaterials: false,
    creditsCost: 4,
    proposalsSent: 7,
    postedDate: 'há 1 dia',
    description: 'O sifão da minha pia está vazando muito. Preciso de um reparo urgente. Já tenho o sifão novo para a troca.'
  },
   {
    id: 6,
    title: 'Instalar 3 prateleiras na parede de drywall',
    category: 'Instalação',
    location: 'Pinheiros',
    distance: 4,
    date: 'Esta Semana',
    isPlusClient: false,
    hasMaterials: true,
    creditsCost: 3,
    proposalsSent: 1,
    postedDate: 'há 6 horas',
    description: 'Tenho as prateleiras e as buchas específicas para drywall. Preciso apenas da furação e instalação correta.'
  }
];

export const getOpportunityById = (id: number): Opportunity | undefined => {
  return opportunities.find(op => op.id === id);
};

export const submitProposal = (opportunityId: number, professionalId: number, proposal: { message: string, price: number }) => {
    const opportunity = opportunities.find(op => op.id === opportunityId);
    // FIX: Use getProfessionalById to get the full detailed profile.
    const professional = getProfessionalById(professionalId);

    if (!opportunity) throw new Error("Oportunidade não encontrada.");
    if (!professional) throw new Error("Profissional não encontrado.");

    // Simula verificação e dedução de créditos
    const currentCredits = financialData.creditPackages.reduce((sum, pkg) => sum + (pkg.credits * 0), 20); // Mock starting credits
    if (currentCredits < opportunity.creditsCost) {
        throw new Error("Créditos insuficientes para enviar esta proposta.");
    }
    // Lógica para deduzir créditos iria aqui...

    // Incrementa o número de propostas enviadas na oportunidade
    opportunity.proposalsSent += 1;

    // Adiciona a proposta à lista de propostas da tarefa correspondente
    const newProposal = {
        ...professional,
        price: proposal.price,
        message: proposal.message,
    };
    
    // FIX: Removed unsafe type casting and use numeric key directly.
    if (proposalsByTaskId[opportunityId]) {
        proposalsByTaskId[opportunityId].proposals.push(newProposal);
    } else {
        // Se a tarefa não estiver na lista, crie uma entrada para ela
        proposalsByTaskId[opportunityId] = {
            taskTitle: opportunity.title,
            proposals: [newProposal]
        };
    }
};
