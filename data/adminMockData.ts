
export const clients = [
    { id: 1, name: 'Mariana S.', email: 'mariana@email.com', joinDate: '2023-10-22', status: 'Ativo' },
    { id: 2, name: 'João Pedro', email: 'jp@email.com', joinDate: '2023-10-20', status: 'Ativo' },
    { id: 3, name: 'Cláudia R.', email: 'claudia@email.com', joinDate: '2023-09-15', status: 'Suspenso' },
    { id: 4, name: 'Lucas Mendes', email: 'lucas@email.com', joinDate: '2023-09-12', status: 'Ativo' },
    { id: 5, name: 'Beatriz Almeida', email: 'beatriz@email.com', joinDate: '2023-08-30', status: 'Ativo' },
    { id: 6, name: 'Fernando Costa', email: 'fernando@email.com', joinDate: '2023-08-25', status: 'Banido' },
    { id: 7, name: 'Gabriela Lima', email: 'gabriela@email.com', joinDate: '2023-08-11', status: 'Ativo' },
    { id: 8, name: 'Rafael Oliveira', email: 'rafael@email.com', joinDate: '2023-07-29', status: 'Ativo' },
    { id: 9, name: 'Juliana Pereira', email: 'juliana@email.com', joinDate: '2023-07-15', status: 'Ativo' },
    { id: 10, name: 'Márcio Santos', email: 'marcio@email.com', joinDate: '2023-07-02', status: 'Suspenso' },
];

export const verificationRequests = [
    { id: 1, name: 'Roberto Andrade', date: '2023-10-23', status: 'Pendente', formData: { doc: '123.456.789-00', address: 'Rua das Flores, 123' }, docUrl: 'https://via.placeholder.com/400x250.png?text=Frente+do+Documento' },
    { id: 2, name: 'Lúcia Ferreira', date: '2023-10-22', status: 'Pendente', formData: { doc: '009.876.543-21', address: 'Av. Principal, 456' }, docUrl: 'https://via.placeholder.com/400x250.png?text=Frente+do+Documento' }
];

export const transactions = [
    { id: 'txn_1_abc', user: 'Mariana S.', date: '2023-10-23', type: 'Pagamento Cliente', amount: 90.00, status: 'Concluído' },
    { id: 'txn_2_def', user: 'Plataforma', date: '2023-10-23', type: 'Comissão', amount: -9.00, status: 'Concluído' },
    { id: 'txn_3_ghi', user: 'Carlos Silva', date: '2023-10-23', type: 'Repasse Profissional', amount: -81.00, status: 'Concluído' },
    { id: 'txn_4_jkl', user: 'Carlos Silva', date: '2023-10-22', type: 'Saque', amount: -250.00, status: 'Pendente' },
    { id: 'txn_5_mno', user: 'João Pedro', date: '2023-10-22', type: 'Compra de Créditos', amount: 50.00, status: 'Concluído' },
    { id: 'txn_6_pqr', user: 'Mariana Costa', date: '2023-10-21', type: 'Saque', amount: -150.00, status: 'Concluído' },
    { id: 'txn_7_stu', user: 'Cláudia R.', date: '2023-10-20', type: 'Pagamento Cliente', amount: 120.00, status: 'Falhou' },
    { id: 'txn_8_vwx', user: 'Plataforma', date: '2023-10-19', type: 'Comissão', amount: -15.00, status: 'Concluído' },
    { id: 'txn_9_yza', user: 'Ricardo Souza', date: '2023-10-19', type: 'Repasse Profissional', amount: -135.00, status: 'Concluído' },
    { id: 'txn_10_bcd', user: 'Ricardo Souza', date: '2023-10-18', type: 'Reembolso', amount: 30.00, status: 'Concluído' },
];

export const withdrawalRequests = [
    { id: 1, professional: 'Carlos Silva', amount: 550.00, date: '2023-10-23' },
    { id: 2, professional: 'Mariana Costa', amount: 820.00, date: '2023-10-22' },
];

export const supportTickets = [
    {
        id: 'DISP-001',
        subject: 'Serviço de pintura incompleto',
        client: 'Cláudia R.',
        professional: 'Mariana Costa',
        status: 'Em Análise',
        priority: 'Alta',
        openDate: '2023-10-24',
        relatedTask: {
            id: 'TASK-582',
            title: 'Pintura completa de apartamento',
            value: 1500.00
        },
        messages: [
            { sender: 'client', text: 'A profissional não terminou de pintar a área de serviço como combinado e deixou manchas na parede da sala.', timestamp: '2023-10-24 10:00' },
            { sender: 'professional', text: 'A cliente adicionou a área de serviço depois do orçamento inicial. As manchas na sala foram de um móvel que ela mesma arrastou.', timestamp: '2023-10-24 14:30' },
            { sender: 'admin', text: 'Olá Cláudia e Mariana, estou analisando o caso. Mariana, você pode me enviar fotos do estado final da área de serviço, por favor?', timestamp: '2023-10-25 09:00' },
        ]
    },
    {
        id: 'TKT-002',
        subject: 'Dificuldade para comprar créditos',
        client: 'Lucas Mendes',
        professional: null,
        status: 'Aguardando Resposta',
        priority: 'Média',
        openDate: '2023-10-25',
        relatedTask: null,
        messages: [
            { sender: 'client', text: 'Não estou conseguindo finalizar a compra de créditos, o botão de pagamento não funciona.', timestamp: '2023-10-25 11:20' }
        ]
    },
    {
        id: 'DISP-002',
        subject: 'Atraso na entrega do serviço',
        client: 'Beatriz Almeida',
        professional: 'Carlos Silva',
        status: 'Aguardando Resposta',
        priority: 'Média',
        openDate: '2023-10-25',
        relatedTask: {
            id: 'TASK-591',
            title: 'Montagem de guarda-roupas',
            value: 250.00
        },
        messages: [
            { sender: 'client', text: 'O profissional está atrasado há mais de 3 horas e não atende minhas ligações.', timestamp: '2023-10-25 14:00' }
        ]
    }
];

// Analytics Data
export const analyticsKpis = {
    revenue: 12580.00,
    completedTasks: 89,
    newUsers: 124,
    avgTaskValue: 141.35,
};

export const categoryDistribution = [
    { name: 'Pintura', value: 30 },
    { name: 'Reparos Gerais', value: 25 },
    { name: 'Montagem de Móveis', value: 20 },
    { name: 'Encanamento', value: 15 },
    { name: 'Outros', value: 10 },
];

export const topServices = [
    { id: 1, name: 'Pintura de parede (até 10m²)', completed: 45, revenue: 4500.00 },
    { id: 2, name: 'Instalação de chuveiro elétrico', completed: 32, revenue: 2400.00 },
    { id: 3, name: 'Montagem de guarda-roupa', completed: 28, revenue: 3360.00 },
    { id: 4, name: 'Limpeza pós-obra', completed: 15, revenue: 3000.00 },
];

export const topProfessionals = [
    { id: 1, name: 'Carlos Silva', tasks: 25, revenue: 3200.00 },
    { id: 2, name: 'Mariana Costa', tasks: 22, revenue: 2850.00 },
    { id: 3, name: 'Jorge Almeida', tasks: 18, revenue: 2900.00 },
    { id: 4, name: 'Ana Pereira', tasks: 15, revenue: 1500.00 },
];

// Settings Data
export const platformSettings = {
    name: 'Vale Conecta',
    commissionRate: 10,
    maintenanceMode: false,
    contactUnlockCost: 5,
};

export const serviceCategories = [
    'Pintura',
    'Reparos Gerais',
    'Montagem de Móveis',
    'Encanamento',
    'Faxina e Limpeza',
    'Serviços Ecológicos',
];

export const medalhasDeReconhecimento = [
    'Top Pro',
    'Verificado',
    '5 Estrelas',
    'Seguro',
    'Pontual',
    'Mestre da Montagem'
];

export const administrators = [
    { id: 1, name: 'Admin Principal', email: 'admin@valeconecta.com', role: 'Super Admin' },
    { id: 2, name: 'Juliana B.', email: 'juliana@valeconecta.com', role: 'Suporte' },
];

export const creditPackages = [
    { id: 1, credits: 20, price: 30.00, popular: false },
    { id: 2, credits: 50, price: 65.00, popular: true },
    { id: 3, credits: 100, price: 120.00, popular: false },
];

// Tasks Data
export const tasks = [
    { id: 'TASK-582', service: 'Pintura completa de apartamento', client: 'Cláudia R.', professional: 'Mariana Costa', value: 1500.00, date: '2023-10-24', status: 'Em Disputa' },
    { id: 'TASK-591', service: 'Montagem de guarda-roupas', client: 'Beatriz Almeida', professional: 'Carlos Silva', value: 250.00, date: '2023-10-25', status: 'Em Andamento' },
    { id: 'TASK-577', service: 'Instalação de chuveiro', client: 'João Pedro', professional: 'Ricardo Souza', value: 120.00, date: '2023-10-22', status: 'Concluído' },
    { id: 'TASK-576', service: 'Reparo em vazamento', client: 'Lucas Mendes', professional: 'Ricardo Souza', value: 300.00, date: '2023-10-21', status: 'Concluído' },
    { id: 'TASK-575', service: 'Faxina pós-obra', client: 'Mariana S.', professional: 'Ana Pereira', value: 450.00, date: '2023-10-20', status: 'Cancelado' },
    { id: 'TASK-574', service: 'Instalação de prateleiras', client: 'Gabriela Lima', professional: 'Carlos Silva', value: 90.00, date: '2023-10-19', status: 'Concluído' },
];
