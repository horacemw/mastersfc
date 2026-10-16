import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'pr01',
    slug: 'home-jersey',
    name: 'Masters FC Home Jersey',
    price: 120000,
    category: 'Jerseys',
    description: 'High-End Masters FC home jersey — vibrant lime with Masters Finance Ltd branding and the club crest.',
    image: '/assets/products/home-jersey.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
  },
  {
    id: 'pr02',
    slug: 'away-jersey',
    name: 'Masters FC Away Jersey',
    price: 120000,
    category: 'Jerseys',
    description: 'High-End Masters FC away jersey in crisp white with lime detailing and official sponsors.',
    image: '/assets/products/away-jersey.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
  },
  {
    id: 'pr03',
    slug: 'club-t-shirt',
    name: 'Masters FC T-Shirt',
    price: 25000,
    category: 'T-Shirts',
    description: 'Everyday club T-shirt in soft cotton with embroidered Masters FC crest.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'pr04',
    slug: 'club-cap',
    name: 'Masters FC Cap',
    price: 15000,
    category: 'Caps',
    description: 'Classic six-panel cap in club colours with embroidered crest.',
    sizes: ['One Size'],
  },
  {
    id: 'pr05',
    slug: 'club-tracksuit',
    name: 'Masters FC Tracksuit',
    price: 120000,
    category: 'Tracksuits',
    description: 'Full training tracksuit — matching top and bottoms used by the first team.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
