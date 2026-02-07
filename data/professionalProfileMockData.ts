
import { DetailedProfessional, MedalhaType, Review } from '../types';
import { professionals } from './professionals';

// Mock reviews to make profiles more realistic
const mockReviews: Review[] = [
    { id: 1, client_name: 'Mariana S.', date: '2023-10-22', rating: 5, comment: 'Serviço impecável, muito profissional!', service: 'Montagem de Móveis' },
    { id: 2, client_name: 'João Pedro', date: '2023-10-20', rating: 4, comment: 'Bom trabalho, mas atrasou um pouco.', service: 'Pintura' },
    { id: 3, client_name: 'Cláudia R.', date: '2023-09-15', rating: 5, comment: 'Excelente! Recomendo!', service: 'Reparos Gerais', professional_reply: 'Obrigado pela confiança!' },
];

const detailedProfessionals: DetailedProfessional[] = professionals.map((p, index) => ({
    ...p,
    memberSince: 2023,
    responseRate: 95 + index,
    bio: `Especialista em ${p.category}, com mais de 5 anos de experiência. Comprometido com a qualidade e satisfação do cliente. Sempre buscando entregar o melhor resultado no menor tempo possível.`,
    services: p.category ? [p.category, 'Pequenos Reparos'] : ['Serviços Gerais'],
    reviews: mockReviews.slice(0, 1 + (index % 3)),
    gallery: [
        `https://i.postimg.cc/pX7g0K1B/eletricista.jpg`,
        `https://i.postimg.cc/k4zZk3M3/pintor.jpg`,
        `https://i.postimg.cc/8cRk85s0/marceneiro.jpg`,
        `https://i.postimg.cc/L6Rk1tFG/encanador.jpg`
    ],
    medalhas: ['Top Pro', 'Excelência em Avaliações'].slice(0, 1 + (index % 2)) as MedalhaType[],
}));

export const getProfessionalById = (id: number): DetailedProfessional | undefined => {
    return detailedProfessionals.find(p => p.id === id);
};

export type { Review, DetailedProfessional };
