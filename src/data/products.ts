import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'pr01',
    slug: 'home-jersey-2026',
    name: 'Masters FC Home Jersey 2026',
    price: 85000,
    category: 'Jerseys',
    description: 'The official Masters FC home jersey — deep pitch green with lime trim and the club crest.',
    image: '/assets/products/jersey2.jfif',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
  },
  {
    id: 'pr02',
    slug: 'away-jersey-2026',
    name: 'Masters FC Away Jersey 2026',
    price: 85000,
    category: 'Jerseys',
    description: 'Clean white away jersey with modern Masters FC detailing.',
    image: '/assets/products/jersey1.jfif',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
