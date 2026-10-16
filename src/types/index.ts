export type Position = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';

export interface Player {
  id: string;
  slug: string;
  name: string;
  position: Position;
  number: number;
  age?: number;
  nationality?: string;
  height?: string;
  foot?: 'Left' | 'Right' | 'Both';
  bio?: string;
  image?: string;
  stats?: {
    appearances: number;
    goals: number;
    assists: number;
    cleanSheets?: number;
    yellowCards?: number;
    redCards?: number;
  };
}

export type MatchStatus = 'Upcoming' | 'Full Time' | 'Postponed' | 'Live';

export interface Match {
  id: string;
  opponent: string;
  opponentShort?: string;
  home: boolean;
  date: string; // ISO date
  time: string; // HH:MM
  venue: string;
  competition: string;
  status: MatchStatus;
  score?: { home: number; away: number };
  summary?: string;
  highlights?: { title: string; minute: number; player?: string }[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  author: string;
  image?: string;
  content: string[]; // paragraphs
  gallery?: string[]; // additional inline images
  featured?: boolean;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Official' | 'Partner' | 'Community' | 'Technical';
  logo?: string;
  url?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: 'Jerseys' | 'T-Shirts' | 'Caps' | 'Tracksuits';
  description: string;
  image?: string;
  sizes: string[];
  isNew?: boolean;
}

export interface GalleryImage {
  id: string;
  caption: string;
  category: 'Matches' | 'Training' | 'Players' | 'Community' | 'Events';
  image?: string;
  aspectRatio?: '1/1' | '4/3' | '3/4' | '16/9' | '9/16';
}

export interface ClubStatistic {
  id: string;
  value: string;
  label: string;
  description?: string;
}
