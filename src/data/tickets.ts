export interface TicketTier {
  id: 'standard' | 'vip' | 'corporate';
  name: string;
  price: number; // MWK
  priceNote?: string;
  highlight?: boolean;
  perks: string[];
  description: string;
}

export const ticketTiers: TicketTier[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: 2500,
    perks: [
      'General stand seating',
      'Access to all public areas',
      'Match-day programme',
    ],
    description: 'The core matchday experience. Join the Masters FC faithful in the main stands and get behind the team.',
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 10000,
    highlight: true,
    perks: [
      'Reserved VIP seating',
      'Welcome drink and refreshments',
      'Dedicated VIP entrance',
      'Match-day programme',
    ],
    description: 'Elevated matchday hospitality — premium seats, refreshments, and a dedicated entrance.',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    price: 50000,
    priceNote: 'from, per box',
    perks: [
      'Private corporate box (seats up to 10)',
      'Catered food and drinks package',
      'Branding on the box signage',
      'Hosted by Masters FC commercial team',
    ],
    description: 'Host clients, partners and your team in a private box with full hospitality and visible brand presence.',
  },
];
