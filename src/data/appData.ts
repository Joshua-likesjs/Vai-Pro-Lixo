export interface CollectionPoint {
  id: number;
  name: string;
  address: string;
  distance?: string;
}

export const COLLECTION_POINTS: CollectionPoint[] = [
  {
    id: 1,
    name: 'Empório DB',
    address: 'Av. Mário Ypiranga Monteiro',
    distance: '0.3 km',
  },
  {
    id: 2,
    name: 'Supermercados Nova Era',
    address: 'Torquato Tapajós e Novo Aleixo',
    distance: '1.2 km',
  },
  {
    id: 3,
    name: 'Supermercado Assaí',
    address: 'Av. Torquato Tapajós',
    distance: '2.1 km',
  },
  {
    id: 4,
    name: 'Pátio Gourmet',
    address: 'Adrianópolis e Aleixo',
    distance: '3.0 km',
  },
  {
    id: 5,
    name: 'PEV Lagoa do Japiim',
    address: 'Av. Rodrigo Otávio',
    distance: '4.5 km',
  },
];

export interface CollectionDay {
  day: string;
  shortDay: string;
  types: string[];
}

export const COLLECTION_SCHEDULE: CollectionDay[] = [
  { day: 'Segunda-feira', shortDay: 'Segunda', types: ['Plástico', 'Metal'] },
  { day: 'Terça-feira',  shortDay: 'Terça',   types: ['Papel', 'Papelão'] },
  { day: 'Quarta-feira', shortDay: 'Quarta',  types: ['Vidro'] },
  { day: 'Quinta-feira', shortDay: 'Quinta',  types: ['Eletrônicos', 'Pilhas'] },
  { day: 'Sexta-feira',  shortDay: 'Sexta',   types: ['Orgânico', 'Rejeitos'] },
  { day: 'Sábado',       shortDay: 'Sábado',  types: ['Plástico', 'Vidro', 'Metal'] },
];

export interface Tip {
  id: number;
  icon: string;
  text: string;
}

export const TIPS: Tip[] = [
  {
    id: 1,
    icon: '♻️',
    text: 'Recicláveis devem estar limpos e secos para evitar contaminação.',
  },
  {
    id: 2,
    icon: '🍶',
    text: 'Vidro quebrado deve ser embrulhado e identificado para proteger os coletores.',
  },
  {
    id: 3,
    icon: '🗂️',
    text: 'Separar o lixo em recicláveis e não recicláveis já ajuda bastante.',
  },
  {
    id: 4,
    icon: '🔋',
    text: 'Pilhas e baterias nunca devem ser jogadas no lixo comum — leve a um PEV.',
  },
  {
    id: 5,
    icon: '📦',
    text: 'Amasse caixas de papelão para economizar espaço nos coletores.',
  },
  {
    id: 6,
    icon: '🧴',
    text: 'Embalagens de produtos químicos precisam de descarte especial.',
  },
];
