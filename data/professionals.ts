
export type MedalhaType = 'Mestre da Montagem' | 'Super Pontual' | 'Excelência em Avaliações' | 'Top Pro';

export interface Professional {
  id: number;
  name: string;
  photoUrl: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  category: string;
  city: string;
  medalhas: MedalhaType[];
}

export const professionals: Professional[] = [
  {
    id: 1,
    name: 'Carlos Silva',
    photoUrl: 'https://i.pravatar.cc/150?img=1',
    rating: 4.9,
    reviewCount: 128,
    pricePerHour: 90,
    category: 'Montagem de Móveis',
    city: 'São Paulo',
    medalhas: ['Mestre da Montagem', 'Excelência em Avaliações', 'Top Pro'],
  },
  {
    id: 2,
    name: 'Mariana Costa',
    photoUrl: 'https://i.pravatar.cc/150?img=2',
    rating: 5.0,
    reviewCount: 92,
    pricePerHour: 110,
    category: 'Pintura',
    city: 'São Paulo',
    medalhas: ['Super Pontual', 'Excelência em Avaliações'],
  },
  {
    id: 3,
    name: 'Ricardo Souza',
    photoUrl: 'https://i.pravatar.cc/150?img=3',
    rating: 4.7,
    reviewCount: 75,
    pricePerHour: 75,
    category: 'Reparos Gerais',
    city: 'Rio de Janeiro',
    medalhas: ['Top Pro'],
  },
  {
    id: 4,
    name: 'Fernanda Lima',
    photoUrl: 'https://i.pravatar.cc/150?img=4',
    rating: 4.8,
    reviewCount: 150,
    pricePerHour: 85,
    category: 'Instalação',
    city: 'Belo Horizonte',
    medalhas: ['Super Pontual', 'Mestre da Montagem'],
  },
   {
    id: 5,
    name: 'Jorge Almeida',
    photoUrl: 'https://i.pravatar.cc/150?img=5',
    rating: 4.9,
    reviewCount: 210,
    pricePerHour: 120,
    category: 'Encanamento',
    city: 'São Paulo',
    medalhas: ['Excelência em Avaliações', 'Top Pro'],
  },
  {
    id: 6,
    name: 'Beatriz Martins',
    photoUrl: 'https://i.pravatar.cc/150?img=6',
    rating: 4.6,
    reviewCount: 55,
    pricePerHour: 60,
    category: 'Montagem de Móveis',
    city: 'Rio de Janeiro',
    medalhas: [],
  },
  {
    id: 7,
    name: 'Ana Pereira',
    photoUrl: 'https://i.pravatar.cc/150?img=7',
    rating: 4.8,
    reviewCount: 190,
    pricePerHour: 70,
    category: 'Faxina e limpeza doméstica',
    city: 'São Paulo',
    medalhas: ['Super Pontual', 'Excelência em Avaliações'],
  },
  {
    id: 8,
    name: 'Roberto Andrade',
    photoUrl: 'https://i.pravatar.cc/150?img=8',
    rating: 4.9,
    reviewCount: 65,
    pricePerHour: 80,
    category: 'Reparos Gerais',
    city: 'Belo Horizonte',
    medalhas: ['Top Pro'],
  },
];

export const categories = [
    'Montagem de Móveis',
    'Instalação',
    'Pintura',
    'Reparos Gerais',
    'Encanamento',
    'Faxina e limpeza doméstica',
    'Serviços Ecológicos',
];

export const medalhas: MedalhaType[] = [
    'Mestre da Montagem',
    'Super Pontual',
    'Excelência em Avaliações',
];