import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { LinkButton } from '../components/Button';
import { players, getPlayerBySlug } from '../data/players';
import { ArrowLeft, ArrowRight } from '../components/Icons';

export function PlayerProfilePage() {
  const { slug } = useParams();
  const player = slug ? getPlayerBySlug(slug) : undefined;

  useEffect(() => {
    document.title = player ? `${player.name} | Masters FC` : 'Player | Masters FC';
  }, [player]);

  if (!player) {
    return (
      <section className="py-32 text-center container-fc">
        <h1 className="font-display font-bold text-4xl text-pitch-950">Player not found</h1>
        <p className="mt-3 text-pitch-800/70">We could not find a player at this address.</p>
        <div className="mt-8">
          <LinkButton to="/team" variant="primary" icon={<ArrowLeft />}>Back to the Squad</LinkButton>
        </div>
      </section>
    );
  }

  const siblings = players.filter((p) => p.position === player.position && p.slug !== player.slug).slice(0, 3);
  const stats = player.stats;

  return (
    <>
      <section className="relative bg-stadium-radial text-white overflow-hidden">
        <div className="absolute inset-0 bg-pitch-stripes opacity-30" aria-hidden />
        <div className="container-fc relative z-10 py-16 md:py-24 grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3 order-last lg:order-first">
            <Link to="/team" className="inline-flex items-center gap-2 text-sm text-lime-brand font-semibold mb-5 hover:underline">
              <ArrowLeft /> Back to Squad
            </Link>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-lime-brand mb-3">
              {player.position} · #{player.number}
            </p>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-[0.95] text-shadow-hero">
              {player.name}
            </h1>
            {player.bio && (
              <p className="mt-5 text-base md:text-lg text-pitch-100/85 max-w-xl text-pretty">{player.bio}</p>
            )}
            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {player.age && (
                <div>
                  <dt className="text-[11px] uppercase tracking-widest text-lime-brand font-bold">Age</dt>
                  <dd className="mt-1 font-display font-bold text-2xl">{player.age}</dd>
                </div>
              )}
              {player.height && (
                <div>
                  <dt className="text-[11px] uppercase tracking-widest text-lime-brand font-bold">Height</dt>
                  <dd className="mt-1 font-display font-bold text-2xl">{player.height}</dd>
                </div>
              )}
              {player.foot && (
                <div>
                  <dt className="text-[11px] uppercase tracking-widest text-lime-brand font-bold">Foot</dt>
                  <dd className="mt-1 font-display font-bold text-2xl">{player.foot}</dd>
                </div>
              )}
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-lime-brand font-bold">Shirt</dt>
                <dd className="mt-1 font-display font-bold text-2xl">#{player.number}</dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-2 relative">
            <div className="absolute -inset-5 bg-lime-brand/15 blur-2xl rounded-3xl" aria-hidden />
            <ImagePlaceholder
              type="player"
              src={player.image}
              alt={player.name}
              aspectRatio="3/4"
              rounded="3xl"
              className="relative shadow-2xl ring-1 ring-white/10"
              priority
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      {stats && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container-fc">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950">
              Season <span className="text-pitch-700">Statistics</span>
            </h2>
            <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatTile label="Appearances" value={stats.appearances} />
              <StatTile label="Goals" value={stats.goals} />
              <StatTile label="Assists" value={stats.assists} />
              {typeof stats.cleanSheets === 'number' && <StatTile label="Clean Sheets" value={stats.cleanSheets} />}
              {typeof stats.yellowCards === 'number' && <StatTile label="Yellow Cards" value={stats.yellowCards} />}
              {typeof stats.redCards === 'number' && <StatTile label="Red Cards" value={stats.redCards} />}
            </ul>
          </div>
        </section>
      )}

      {/* Siblings */}
      {siblings.length > 0 && (
        <section className="py-16 md:py-20 bg-pitch-50">
          <div className="container-fc">
            <div className="flex items-end justify-between gap-6 mb-8">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950">
                Other <span className="text-pitch-700">{player.position}s</span>
              </h2>
              <LinkButton to="/team" variant="secondary" size="sm" iconRight={<ArrowRight />}>
                Full Squad
              </LinkButton>
            </div>
            <ul className="grid sm:grid-cols-3 gap-5">
              {siblings.map((p) => (
                <li key={p.id} className="rounded-2xl bg-white border border-pitch-900/10 p-5 flex items-center gap-4 hover:border-pitch-700/30 transition">
                  <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden">
                    <ImagePlaceholder type="player" src={p.image} alt={p.name} rounded="none" className="h-full w-full" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-pitch-700">#{p.number} · {p.position}</div>
                    <Link to={`/team/${p.slug}`} className="font-display font-bold text-pitch-950 hover:text-pitch-700 transition truncate block">
                      {p.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <li className="rounded-2xl bg-pitch-50 border border-pitch-900/10 p-5 text-center">
      <div className="font-display font-bold text-4xl text-pitch-700">{value}</div>
      <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-pitch-950">{label}</div>
    </li>
  );
}

export default PlayerProfilePage;
