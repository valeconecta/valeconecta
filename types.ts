export type Page = 'home' | 'professional' | 'plus' | 'search' | 'admin' | 'professional-dashboard' | 'professional-profile' | 'client-dashboard' | 'compare-proposals' | 'task-detail' | 'opportunities' | 'opportunity-detail' | 'login' | 'register';

export type MedalhaType = 'Mestre da Montagem' | 'Super Pontual' | 'Excelência em Avaliações' | 'Top Pro';

export interface Professional {
  id: number;
  name: string;
  photoUrl: string | null;
  rating: number | null;
  reviewCount: number | null;
  pricePerHour: number | null;
  category: string | null;
  city: string | null;
}

export interface Review {
  id: number;
  client_name: string;
  date: string;
  rating: number;
  comment: string;
  service: string;
  professional_reply?: string;
}

export interface DetailedProfessional extends Professional {
  memberSince: number | null;
  responseRate: number | null;
  bio: string | null;
  services: string[] | null;
  reviews: Review[] | [];
  gallery: string[] | null;
  medalhas: MedalhaType[] | [];
}
