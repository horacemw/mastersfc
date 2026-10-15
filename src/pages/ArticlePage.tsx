import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { LinkButton } from '../components/Button';
import { NewsCard } from '../components/NewsCard';
import { getNewsBySlug, news } from '../data/news';
import { ArrowLeft, Calendar, Users } from '../components/Icons';

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export function ArticlePage() {
  const { slug } = useParams();
  const article = slug ? getNewsBySlug(slug) : undefined;

  useEffect(() => {
    document.title = article ? `${article.title} | Masters FC` : 'Article | Masters FC';
  }, [article]);

  if (!article) {
    return (
      <section className="py-32 text-center container-fc">
        <h1 className="font-display font-bold text-4xl text-pitch-950">Article not found</h1>
        <div className="mt-8"><LinkButton to="/news" variant="primary" icon={<ArrowLeft />}>Back to News</LinkButton></div>
      </section>
    );
  }

  const related = news.filter((n) => n.id !== article.id && n.category === article.category).slice(0, 3);

  return (
    <>
      <section className="relative bg-stadium-radial text-white">
        <div className="absolute inset-0 bg-pitch-stripes opacity-30" aria-hidden />
        <div className="container-fc relative z-10 py-16 md:py-24 max-w-4xl">
          <Link to="/news" className="inline-flex items-center gap-2 text-sm text-lime-brand font-semibold mb-6 hover:underline">
            <ArrowLeft /> Back to News
          </Link>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-lime-brand text-pitch-950 text-[11px] font-bold uppercase tracking-widest">
            {article.category}
          </span>
          <h1 className="mt-5 font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
            {article.title}
          </h1>
          <div className="mt-6 flex items-center gap-6 text-sm text-pitch-100/80">
            <span className="inline-flex items-center gap-2"><Calendar className="text-lime-brand" /> {formatDate(article.date)}</span>
            <span className="inline-flex items-center gap-2"><Users className="text-lime-brand" /> {article.author}</span>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="container-fc max-w-4xl">
          <ImagePlaceholder
            type="news"
            src={article.image}
            alt={article.title}
            aspectRatio="16/9"
            rounded="3xl"
            className="shadow-lg"
          />
          <div className="prose-fc mt-10 space-y-6 text-pitch-900/85 text-base md:text-lg leading-relaxed">
            <p className="text-xl md:text-2xl font-medium text-pitch-950 text-balance">{article.excerpt}</p>
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {article.gallery && article.gallery.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {article.gallery.map((src, i) => (
                <ImagePlaceholder
                  key={i}
                  type="news"
                  src={src}
                  alt={`${article.title} — image ${i + 2}`}
                  aspectRatio="4/3"
                  rounded="2xl"
                  className="shadow"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 md:py-20 bg-pitch-50">
          <div className="container-fc">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950 mb-8">
              Related <span className="text-pitch-700">News</span>
            </h2>
            <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
              {related.map((n) => (
                <li key={n.id}><NewsCard article={n} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

export default ArticlePage;
