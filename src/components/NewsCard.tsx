import { Link } from 'react-router-dom';
import type { NewsArticle } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ArrowRight } from './Icons';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'featured';
}

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <Link
      to={`/news/${article.slug}`}
      className={`group relative block rounded-3xl overflow-hidden bg-white border border-pitch-900/10 hover:border-pitch-700/30 hover:shadow-xl hover:shadow-pitch-900/5 transition-all duration-300 focus-visible:outline-none ${
        isFeatured ? 'lg:grid lg:grid-cols-5 lg:gap-0' : ''
      }`}
    >
      <div className={`${isFeatured ? 'lg:col-span-3' : ''} relative overflow-hidden`}>
        <ImagePlaceholder
          type="news"
          src={article.image}
          alt={article.title}
          aspectRatio={isFeatured ? '16/10' : '16/10'}
          rounded="none"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-lime-brand text-pitch-950 text-[11px] font-bold uppercase tracking-wider">
          {article.category}
        </span>
      </div>
      <div className={`p-6 md:p-7 flex flex-col ${isFeatured ? 'lg:col-span-2 lg:p-8' : ''}`}>
        <time className="text-[11px] font-semibold uppercase tracking-widest text-pitch-700/80">
          {formatDate(article.date)}
        </time>
        <h3
          className={`mt-2 font-display font-bold text-pitch-950 leading-tight text-balance group-hover:text-pitch-700 transition-colors ${
            isFeatured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          }`}
        >
          {article.title}
        </h3>
        <p className="mt-3 text-sm text-pitch-800/70 text-pretty line-clamp-3">
          {article.excerpt}
        </p>
        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pitch-700 group-hover:text-pitch-950 transition-colors">
          Read More
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
