
import { professionals, Professional, MedalhaType } from './professionals';

export interface Review {
  id: number;
  clientName: string;
  date: string;
  rating: number;
  comment: string;
  service: string;
  professionalReply?: string;
}

export interface DetailedProfessional extends Professional {
  memberSince: number;
  responseRate: number;
  bio: string;
  services: string[];
  reviews: Review[];
  gallery: string[];
}

const professionalDetails: Omit<DetailedProfessional, keyof Professional>[] = [
  { // Corresponds to Carlos Silva (id: 1)
    memberSince: 2022,
    responseRate: 99,
    bio: "Com mais de 10 anos de experiência, sou especialista em montagem de móveis de todos os tipos, desde os mais simples aos mais complexos. Meu compromisso é com a qualidade, a pontualidade e a limpeza do local após o serviço. Garanto um trabalho bem feito e a sua total satisfação.",
    services: ["Montagem de Móveis", "Instalação de Prateleiras", "Pequenos Reparos", "Fixação de TVs e Quadros"],
    reviews: [
      { id: 1, clientName: "Mariana S.", date: "22 de out de 2023", rating: 5, service: "Para: Montagem de Guarda-Roupa", comment: "Carlos foi excepcional! Montou tudo perfeitamente, foi super cuidadoso para não riscar o piso e limpou toda a área depois. Recomendo de olhos fechados!", professionalReply: "Muito obrigado pela confiança, Mariana! Fico feliz em ajudar." },
      { id: 2, clientName: "João Pedro", date: "15 de set de 2023", rating: 5, service: "Para: Instalação de Prateleiras", comment: "Serviço rápido e impecável. Chegou no horário e fez tudo com muita precisão." },
      { id: 3, clientName: "Cliente do Vale Conecta", date: "01 de ago de 2023", rating: 4, service: "Para: Reparo em Cadeira", comment: "Bom profissional, resolveu o problema da minha cadeira que estava bamba. Apenas demorou um pouco para responder no chat." },
    ],
    gallery: [
      "https://picsum.photos/id/10/400/300",
      "https://picsum.photos/id/11/400/300",
      "https://picsum.photos/id/12/400/300",
      "https://picsum.photos/id/13/400/300",
    ]
  },
  // Add more detailed profiles here matching the IDs from professionals.ts
];

// Function to get a detailed profile by ID
export const getProfessionalById = (id: number): DetailedProfessional | undefined => {
  const baseProfile = professionals.find(p => p.id === id);
  if (!baseProfile) return undefined;

  // For this mock, we only have detailed data for ID 1. For others, we'll generate some defaults.
  const details = professionalDetails[0] || {
    memberSince: 2023,
    responseRate: 95,
    bio: "Profissional dedicado e focado em entregar o melhor resultado para os clientes. Entre em contato para um orçamento!",
    services: [baseProfile.category],
    reviews: [],
    gallery: []
  };

  return {
    ...baseProfile,
    ...details
  };
};
