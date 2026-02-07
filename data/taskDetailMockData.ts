
import { userProfile } from './clientMockData';
import { professionals } from './professionals';
import { opportunities } from './opportunitiesMockData';

export type TaskStatus = 'Agendado' | 'Em Andamento' | 'Concluído' | 'Confirmado Pelo Cliente' | 'Avaliado';

export interface ChatMessage {
    senderId: number;
    text: string;
    timestamp: string;
    attachmentUrl?: string;
}

export interface DetailedTask {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    clientId: number;
    professionalId: number;
    scheduledDateTime: string;
    category: string;
    address: string;
    financials: {
        serviceCost: number;
        materialsCost: number;
        total: number;
    };
    chatHistory: ChatMessage[];
}

const tasksData: DetailedTask[] = [
    {
        id: 2,
        title: 'Pintura completa de apartamento',
        description: 'Preciso de um profissional para pintar completamente meu apartamento de 2 quartos (aproximadamente 60m²). As paredes estão em bom estado, só precisam de uma nova camada de tinta branca. Já tenho as tintas e materiais básicos.',
        status: 'Agendado',
        clientId: userProfile.addresses[0].id,
        professionalId: 2,
        scheduledDateTime: '15 de Nov de 2023, 09:00',
        category: 'Pintura',
        address: 'Av. Principal, 456, São Paulo, SP',
        financials: {
            serviceCost: 1350.00,
            materialsCost: 0.00,
            total: 1350.00,
        },
        chatHistory: [
            { senderId: 2, text: 'Olá Mariana, tudo bem? Confirmando nosso serviço de pintura para amanhã às 9h. Alguma recomendação especial?', timestamp: '14 de Nov, 17:30' },
            { senderId: userProfile.addresses[0].id, text: 'Oi, tudo certo! Sem recomendações, apenas peço cuidado com o piso novo. Obrigada!', timestamp: '14 de Nov, 18:15' }
        ]
    }
];

export const getTaskById = (id: number): DetailedTask | undefined => {
    const existingTask = tasksData.find(task => task.id === id);
    if (existingTask) return existingTask;

    const opportunity = opportunities.find(op => op.id === id);
    if (!opportunity) return undefined;

    // A professional is not assigned at the opportunity stage, so we'll pick one randomly for the mock.
    const randomProfessional = professionals[Math.floor(Math.random() * professionals.length)];

    return {
        id: opportunity.id,
        title: opportunity.title,
        description: opportunity.description,
        status: 'Agendado', // Default status for a new task detail view
        clientId: userProfile.addresses[0].id, // Mock client ID
        professionalId: randomProfessional.id,
        scheduledDateTime: opportunity.date,
        category: opportunity.category,
        address: `${opportunity.location}, São Paulo, SP`,
        financials: {
            serviceCost: opportunity.creditsCost * 20, // Mock financial data
            materialsCost: opportunity.hasMaterials ? 0 : 50,
            total: opportunity.creditsCost * 20 + (opportunity.hasMaterials ? 0 : 50),
        },
        chatHistory: [
             { senderId: randomProfessional.id, text: `Olá! Vi seu anúncio para "${opportunity.title}" e gostaria de confirmar os detalhes.`, timestamp: 'Há 1 hora' },
             { senderId: userProfile.addresses[0].id, text: 'Oi! Isso mesmo. Podemos começar amanhã?', timestamp: 'Há 45 minutos' }
        ]
    };
};

export const getClientById = (id: number) => {
    // Em um app real, buscaria no DB. Aqui, retornamos o mock.
    return {
        id: userProfile.addresses[0].id,
        name: userProfile.name,
        photoUrl: 'https://i.pravatar.cc/150?img=30' // Random photo for client
    };
};

export const getProfessionalById = (id: number) => {
    return professionals.find(p => p.id === id);
};
