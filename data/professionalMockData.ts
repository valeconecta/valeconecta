
export const dashboardData = {
    kpis: {
        newOpportunities: 5,
        unreadMessages: 2,
        tasksToday: 3,
    },
    financials: {
        availableForWithdrawal: 1250.75,
        monthlyEarnings: 3450.50,
        pendingBalance: 800.00,
    },
    reputation: {
        averageRating: 4.9,
        ultimaMedalha: 'Mestre da Montagem',
    },
    upcomingServices: [
        { id: 1, time: '10:00', title: 'Montagem de Guarda-Roupa', client: 'Beatriz Almeida' },
        { id: 2, time: '14:00', title: 'Instalação de Prateleiras', client: 'Lucas Mendes' },
    ]
};

export const opportunities = {
    newTasks: [
        { id: 1, category: 'Montagem de Móveis', neighborhood: 'Pinheiros', credits: 3 },
        { id: 2, category: 'Pintura', neighborhood: 'Vila Madalena', credits: 5 },
        { id: 3, category: 'Reparos Gerais', neighborhood: 'Moema', credits: 2 },
    ],
    proposalsSent: [
        { id: 4, category: 'Encanamento', neighborhood: 'Jardins', status: 'Aguardando Cliente' },
    ],
    activeConversations: [
        { id: 5, category: 'Instalação', neighborhood: 'Itaim Bibi', client: 'Fernanda Lima', hasNewMessage: true },
    ]
};

export const services = [
    { id: 'SVC-001', title: 'Montagem de Guarda-Roupa', client: 'Beatriz Almeida', date: '2023-11-10', status: 'Agendado' },
    { id: 'SVC-002', title: 'Instalação de Prateleiras', client: 'Lucas Mendes', date: '2023-11-10', status: 'Agendado' },
    { id: 'SVC-003', title: 'Pintura de quarto', client: 'Mariana S.', date: '2023-11-08', status: 'Concluído' },
    { id: 'SVC-004', title: 'Reparo elétrico', client: 'João Pedro', date: '2023-11-05', status: 'Concluído' },
];

export const financialData = {
    summary: {
        totalBalance: 2050.75,
        availableForWithdrawal: 1250.75,
        pendingBalance: 800.00,
    },
    transactions: [
        { id: 'TR-01', date: '2023-11-08', description: 'Pagamento por "Pintura de quarto"', amount: 450.00 },
        { id: 'TR-02', date: '2023-11-08', description: 'Taxa da plataforma (-10%)', amount: -45.00 },
        { id: 'TR-03', date: '2023-11-06', description: 'Saque para conta bancária', amount: -1500.00 },
        { id: 'TR-04', date: '2023-11-05', description: 'Pagamento por "Reparo elétrico"', amount: 200.00 },
        { id: 'TR-05', date: '2023-11-05', description: 'Taxa da plataforma (-10%)', amount: -20.00 },
        { id: 'TR-06', date: '2023-11-04', description: 'Compra de 20 créditos', amount: -30.00 },
    ],
    creditPackages: [
        { credits: 20, price: 30.00, popular: false },
        { credits: 50, price: 65.00, popular: true },
        { credits: 100, price: 120.00, popular: false },
    ]
};

export const publicProfile = {
    name: 'Carlos Silva',
    photoUrl: 'https://i.pravatar.cc/150?img=1',
    bio: 'Profissional com mais de 10 anos de experiência em montagem de móveis e pequenos reparos. Foco na qualidade, pontualidade e satisfação do cliente.',
    categories: ['Montagem de Móveis', 'Reparos Gerais', 'Instalação'],
    baseRate: 90,
    rating: 4.9,
    reviewCount: 128,
    medalhas: ['Mestre da Montagem', 'Excelência em Avaliações', 'Top Pro', 'Super Pontual'],
    totalServices: 153,
    reviews: [
        { client: 'Beatriz A.', rating: 5, comment: 'Carlos foi excepcional! Montou tudo perfeitamente e limpou a área depois. Recomendo!' },
        { client: 'Lucas M.', rating: 5, comment: 'Muito rápido e profissional. As prateleiras ficaram ótimas.' },
    ]
};

export const analyticsData = {
    conversionRate: 25, // %
    revenueByCategory: [
        { name: 'Montagem de Móveis', value: 60 },
        { name: 'Reparos Gerais', value: 30 },
        { name: 'Instalação', value: 10 },
    ],
    ratingOverTime: [
        { month: 'Ago', rating: 4.8 },
        { month: 'Set', rating: 4.9 },
        { month: 'Out', rating: 4.9 },
    ]
};
