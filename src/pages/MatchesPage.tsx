import { useEffect, useState } from 'react';
import { MatchCard } from '../components/MatchCard';
import { PageHero } from '../components/PageHero';
import { upcomingMatches, results } from '../data/matches';

export function MatchesPage() {
  useEffect(() => {
    document.title = 'Matches | Masters FC';
  }, []);

  const [tab, setTab] = useState<'upcoming' | 'results'>('upcoming');
  const upcoming = upcomingMatches();
  const past = results();

  const list = tab === 'upcoming' ? upcoming : past;

  return (
    <>
      <PageHero
        eyebrow="Fixtures & Results"
        title={<>Masters FC <span className="text-lime-brand">Matches</span></>}
        description="Upcoming fixtures, recent results and competitions."
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="container-fc">
          <div className="inline-flex p-1 rounded-full bg-pitch-50 border border-pitch-900/10" role="tablist">
            {(['upcoming', 'results'] as const).map((t) => {
              const isActive = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                    isActive ? 'bg-pitch-950 text-white' : 'text-pitch-800 hover:text-pitch-950'
                  }`}
                >
                  {t === 'upcoming' ? `Upcoming (${upcoming.length})` : `Results (${past.length})`}
                </button>
              );
            })}
          </div>

          <div className="mt-10">
            {list.length === 0 ? (
              <div className="rounded-3xl bg-pitch-50 border border-pitch-900/10 py-20 text-center">
                <p className="font-display text-xl font-bold text-pitch-950">
                  {tab === 'upcoming' ? 'No upcoming matches' : 'No results yet'}
                </p>
                <p className="mt-2 text-sm text-pitch-800/60">
                  {tab === 'upcoming'
                    ? 'The next fixture will be announced shortly.'
                    : 'Match results will appear here once played.'}
                </p>
              </div>
            ) : (
              <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
                {list.map((m) => (
                  <li key={m.id}>
                    <MatchCard match={m} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default MatchesPage;
