export interface MembershipTier {
  id: 'supporter' | 'standard' | 'family' | 'vip';
  name: string;
  tagline: string;
  price: number; // MWK per year
  priceNote?: string;
  highlight?: boolean;
  perks: string[];
}

export const membershipTiers: MembershipTier[] = [
  {
    id: 'supporter',
    name: 'Supporter',
    tagline: 'Join the Masters family',
    price: 10000,
    priceNote: 'per year',
    perks: [
      'Digital membership card',
      'Members-only newsletter',
      '10% discount on store merchandise',
      'Priority invites to open training sessions',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'More benefits, same passion',
    price: 25000,
    priceNote: 'per year',
    highlight: true,
    perks: [
      'All Supporter benefits',
      'Priority access to home match tickets',
      '15% discount on merchandise',
      'Exclusive members-only club events',
      'Masters FC welcome pack',
    ],
  },
  {
    id: 'family',
    name: 'Family',
    tagline: 'Bring the whole crew',
    price: 55000,
    priceNote: 'per year · up to 4 members',
    perks: [
      'All Standard benefits for up to 4 family members',
      '2 free home-match tickets per season',
      'Family-day invites at the club',
      'Birthday shout-outs on club socials',
    ],
  },
  {
    id: 'vip',
    name: 'VIP Patron',
    tagline: 'Behind-the-scenes access',
    price: 150000,
    priceNote: 'per year',
    perks: [
      'All Standard benefits',
      '4 complimentary VIP tickets per season',
      'Pre-match hospitality on nominated games',
      'Signed matchday jersey',
      'Annual meet-and-greet with first-team squad',
    ],
  },
];
