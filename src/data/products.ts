import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'pr01',
    slug: 'home-replica-jersey',
    name: 'Home Replica Jersey',
    price: 85000,
    category: 'Jerseys',
    description: 'The official Masters FC home replica jersey — deep pitch green with lime trim and the club crest.',
    image: '/assets/products/jersey2.jfif',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
  },
  {
    id: 'pr02',
    slug: 'away-replica-jersey',
    name: 'Away Replica Jersey',
    price: 85000,
    category: 'Jerseys',
    description: 'The official Masters FC away replica jersey with modern Masters FC detailing.',
    image: '/assets/products/jersey1.jfif',
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
