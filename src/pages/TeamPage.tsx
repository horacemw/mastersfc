import { useEffect, useMemo, useState } from 'react';
import { PageHero } from '../components/PageHero';
import { PlayerCard } from '../components/PlayerCard';
import { players } from '../data/players';
import type { Position } from '../types';

const filters: ({ label: string; value: 'All' | Position })[] = [
  { label: 'All Players', value: 'All' },
  { label: 'Goalkeepers', value: 'Goalkeeper' },
  { label: 'Defenders', value: 'Defender' },
  { label: 'Midfielders', value: 'Midfielder' },
  { label: 'Forwards', value: 'Forward' },
];

export function TeamPage() {
  useEffect(() => {
    document.title = 'Our Team | Masters FC';
  }, []);

  const [active, setActive] = useState<'All' | Position>('All');

  const filtered = useMemo(
    () => (active === 'All' ? players : players.filter((p) => p.position === active)).sort((a, b) => a.number - b.number),
    [active]
  );

  return (
    <>
      <PageHero
        eyebrow="Our Squad"
        title={<>Our <span className="text-lime-brand">Team</span></>}
        description="Meet the players representing Masters FC."
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="container-fc">
          {/* Filters */}
          <div
            className="flex items-center gap-2 flex-wrap sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur py-3 -mx-5 px-5 md:mx-0 md:px-0 md:py-4 border-b border-pitch-900/5 mb-10"
            role="tablist"
            aria-label="Filter squad by position"
          >
            {filters.map((f) => {
              const isActive = active === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    isActive
                      ? 'bg-pitch-950 text-white'
                      : 'bg-pitch-50 text-pitch-800 hover:bg-pitch-100'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-pitch-50 border border-pitch-900/10 py-20 text-center">
              <p className="font-display text-xl text-pitch-950 font-bold">No players found</p>
              <p className="mt-1 text-sm text-pitch-800/60">
                Try selecting a different position filter.
              </p>
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 animate-fade-in">
              {filtered.map((p) => (
                <li key={p.id}>
                  <PlayerCard player={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

export default TeamPage;
