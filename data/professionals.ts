
import { Professional, MedalhaType } from '../types';

// FIX: Re-export MedalhaType so it can be imported by other modules.
export type { MedalhaType };

export const categories = [
    'Montagem de Móveis',
    'Pintura',
    'Reparos Gerais',
    'Encanamento',
    'Instalação',
    'Faxina e limpeza doméstica',
    'Serviços Ecológicos',
];

export const medalhas: MedalhaType[] = [
    'Mestre da Montagem',
    'Super Pontual',
    'Excelência em Avaliações',
    'Top Pro'
];

export const professionals: Professional[] = [
    {
        id: 1,
        name: 'Carlos Silva',
        photoUrl: 'https://i.pravatar.cc/150?img=1',
        rating: 4.9,
        reviewCount: 128,
        pricePerHour: 90,
        category: 'Montagem de Móveis',
        city: 'São Paulo'
    },
    {
        id: 2,
        name: 'Mariana Costa',
        photoUrl: 'https://i.pravatar.cc/150?img=2',
        rating: 4.8,
        reviewCount: 95,
        pricePerHour: 110,
        category: 'Pintura',
        city: 'São Paulo'
    },
    {
        id: 3,
        name: 'Jorge Almeida',
        photoUrl: 'https://i.pravatar.cc/150?img=3',
        rating: 4.7,
        reviewCount: 76,
        pricePerHour: 85,
        category: 'Reparos Gerais',
        city: 'São Paulo'
    },
    {
        id: 4,
        name: 'Ana Pereira',
        photoUrl: 'https://i.pravatar.cc/150?img=4',
        rating: 5.0,
        reviewCount: 54,
        pricePerHour: 100,
        category: 'Faxina e limpeza doméstica',
        city: 'São Paulo'
    },
    {
        id: 5,
        name: 'Ricardo Souza',
        photoUrl: 'https://i.pravatar.cc/150?img=5',
        rating: 4.8,
        reviewCount: 88,
        pricePerHour: 120,
        category: 'Encanamento',
        city: 'São Paulo'
    },
];
