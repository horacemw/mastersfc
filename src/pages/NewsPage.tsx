import { useEffect, useMemo, useState } from 'react';
import { NewsCard } from '../components/NewsCard';
import { PageHero } from '../components/PageHero';
import { featuredArticle, latestNews } from '../data/news';
import { ArrowLeft, ArrowRight, Search } from '../components/Icons';

const PAGE_SIZE = 6;

export function NewsPage() {
  useEffect(() => {
    document.title = 'News | Masters FC';
  }, []);

  const feature = featuredArticle();
  const all = latestNews();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(all.map((a) => a.category)))],
    [all]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((a) => {
      const matchQ = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
      const matchC = category === 'All' || a.category === category;
      const notFeature = a.id !== feature.id;
      return matchQ && matchC && notFeature;
    });
  }, [all, query, category, feature.id]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <>
      <PageHero
        eyebrow="Club Journal"
        title={<>Masters FC <span className="text-lime-brand">News</span></>}
        description="Match reports, academy updates, interviews and community stories."
      />

      {/* Featured */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-fc">
          <NewsCard article={feature} variant="featured" />
        </div>
      </section>

      {/* Filters + listing */}
      <section className="pb-20 md:pb-28 bg-white">
        <div className="container-fc">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pitch-700" />
              <input
                type="search"
                aria-label="Search news articles"
                placeholder="Search news..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-pitch-50 border border-pitch-900/10 text-sm text-pitch-950 placeholder:text-pitch-700/50 focus:border-pitch-700/40 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((c) => {
                const isActive = category === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCategory(c);
                      setPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                      isActive ? 'bg-pitch-950 text-white' : 'bg-pitch-50 text-pitch-800 hover:bg-pitch-100'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="rounded-3xl bg-pitch-50 border border-pitch-900/10 py-20 text-center">
              <p className="font-display font-bold text-xl text-pitch-950">No articles found</p>
              <p className="mt-2 text-sm text-pitch-800/60">Try a different search term or category.</p>
            </div>
          ) : (
            <>
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {paged.map((n) => (
                  <li key={n.id}><NewsCard article={n} /></li>
                ))}
              </ul>

              {totalPages > 1 && (
                <nav
                  className="mt-10 flex items-center justify-center flex-wrap gap-2"
                  aria-label="Pagination"
                >
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                    aria-label="Previous page"
                    className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold bg-pitch-50 text-pitch-800 hover:bg-pitch-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-pitch-50 transition"
                  >
                    <ArrowLeft width={16} height={16} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    const active = p === safePage;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        aria-current={active ? 'page' : undefined}
                        className={`w-10 h-10 rounded-full text-sm font-semibold transition ${
                          active ? 'bg-pitch-950 text-white' : 'bg-pitch-50 text-pitch-800 hover:bg-pitch-100'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage === totalPages}
                    aria-label="Next page"
                    className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold bg-pitch-50 text-pitch-800 hover:bg-pitch-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-pitch-50 transition"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ArrowRight width={16} height={16} />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default NewsPage;
