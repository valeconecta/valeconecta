import { professionals } from './professionals';
import { opportunities } from './opportunitiesMockData';
import { DetailedProfessional, getProfessionalById } from './professionalProfileMockData';

export const dashboardData = {
    alerts: [
        { id: 1, text: '3 novas propostas para avaliar', link: 'tasks' },
        { id: 2, text: '2 serviços agendados para esta semana', link: 'tasks' },
        { id: 3, text: '1 mensagem não lida de profissionais', link: 'tasks' },
    ],
    activeTasks: [
        { id: 1, title: 'Instalação de chuveiro elétrico', status: 'Avaliando Propostas' },
        { id: 2, title: 'Pintura completa de apartamento', status: 'Agendado' },
        { id: 3, title: 'Montagem de guarda-roupas', status: 'Agendado' },
    ]
};

export const tasks = {
    evaluating: [
        { id: 1, title: 'Instalação de chuveiro elétrico', receivedProposals: 3, totalProposals: 5, description: "Preciso que alguém instale um chuveiro novo 220v. O antigo já foi removido.", category: "Instalação" },
        { id: 4, title: 'Reparo em vazamento na cozinha', receivedProposals: 1, totalProposals: 5, description: "Há um vazamento embaixo da pia da cozinha que precisa ser consertado urgentemente.", category: "Encanamento" },
    ],
    scheduled: [
        { id: 2, title: 'Pintura completa de apartamento', professional: 'Mariana Costa', date: '2023-11-15 às 09:00', description: "Pintura de um apartamento de 2 quartos, cor branca.", category: "Pintura" },
        { id: 3, title: 'Montagem de guarda-roupas', professional: 'Carlos Silva', date: '2023-11-18 às 14:00', description: "Montagem de um guarda-roupa de 6 portas recém-comprado.", category: "Montagem de Móveis" },
    ],
    history: [
        { id: 5, title: 'Limpeza pós-obra', status: 'Concluído', evaluationPending: true },
        { id: 6, title: 'Instalação de prateleiras', status: 'Concluído', evaluationPending: false },
        { id: 7, title: 'Conserto de portão eletrônico', status: 'Cancelado', evaluationPending: false },
    ]
};

export const addTask = (task: { description: string, category: string }) => {
    const allTaskIds = [
        ...tasks.evaluating.map(t => t.id),
        ...tasks.scheduled.map(t => t.id),
        ...tasks.history.map(t => t.id)
    ];
    const allOppIds = opportunities.map(o => o.id);
    const newId = Math.max(0, ...allTaskIds, ...allOppIds) + 1;
    
    // Add to client's task list
    const newTaskForClient = {
        id: newId,
        title: task.description.length > 50 ? task.description.substring(0, 47) + '...' : task.description,
        description: task.description,
        category: task.category,
        receivedProposals: 0,
        totalProposals: 5,
    };
    tasks.evaluating.unshift(newTaskForClient);
    
    // Add to professional's marketplace
    const newOpportunity = {
        id: newId,
        title: newTaskForClient.title,
        category: task.category,
        location: 'Bela Vista', // Mock location
        distance: Math.floor(Math.random() * 15) + 1,
        date: 'Esta Semana',
        isPlusClient: Math.random() > 0.5,
        hasMaterials: false,
        creditsCost: Math.floor(Math.random() * 5) + 3,
        proposalsSent: 0,
        postedDate: 'há 1 minuto',
        description: task.description,
    };
    opportunities.unshift(newOpportunity);
};

export const acceptProposal = (taskId: number, professionalId: number) => {
    const taskIndex = tasks.evaluating.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const [taskToSchedule] = tasks.evaluating.splice(taskIndex, 1);
    const professional = professionals.find(p => p.id === professionalId);

    if (!taskToSchedule || !professional) return;

    // Remove from opportunities marketplace
    const oppIndex = opportunities.findIndex(o => o.id === taskId);
    if (oppIndex !== -1) {
        opportunities.splice(oppIndex, 1);
    }

    // Add to scheduled list
    tasks.scheduled.unshift({
        ...taskToSchedule,
        professional: professional.name,
        date: 'A combinar via chat'
    });
};

interface ProposalData {
    taskTitle: string;
    proposals: (DetailedProfessional & { price: number; message: string; })[];
}

export const proposalsByTaskId: { [key: number]: ProposalData } = {
    1: {
        taskTitle: 'Instalação de chuveiro elétrico',
        proposals: [
            { ...(getProfessionalById(3) as DetailedProfessional), price: 120.00, message: 'Olá! Tenho experiência com este tipo de instalação, posso começar amanhã.' },
            { ...(getProfessionalById(4) as DetailedProfessional), price: 135.00, message: 'Serviço rápido e com garantia. Verifique minhas avaliações.' },
            { ...(getProfessionalById(5) as DetailedProfessional), price: 110.00, message: 'Preço justo e qualidade. Tenho todas as ferramentas necessárias.' },
        ]
    },
    4: {
        taskTitle: 'Reparo em vazamento na cozinha',
        proposals: [
            { ...(getProfessionalById(5) as DetailedProfessional), price: 250.00, message: 'Especialista em reparos hidráulicos. Posso avaliar o vazamento e consertar no mesmo dia.' }
        ]
    }
};

export const payments = {
    history: [
        { id: 'pay_1', date: '2023-11-10', service: 'Pintura completa...', professional: 'Mariana Costa', amount: 1500.00, status: 'Pago' },
        { id: 'pay_2', date: '2023-10-28', service: 'Limpeza pós-obra', professional: 'Ana Pereira', amount: 450.00, status: 'Pago' },
        { id: 'pay_3', date: '2023-10-15', service: 'Instalação de prateleiras', professional: 'Carlos Silva', amount: 90.00, status: 'Pago' },
    ],
    methods: [
        { id: 1, type: 'credit-card', details: '**** **** **** 4242', brand: 'visa', isDefault: true },
        { id: 2, type: 'credit-card', details: '**** **** **** 5151', brand: 'mastercard', isDefault: false },
    ]
};

export const userProfile = {
    name: 'Mariana S.',
    email: 'mariana@email.com',
    addresses: [
        { id: 1, name: 'Casa', fullAddress: 'Rua das Flores, 123, São Paulo, SP' },
        { id: 2, name: 'Escritório', fullAddress: 'Av. Principal, 456, São Paulo, SP' },
    ]
};
