import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LinkButton } from '../components/Button';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { getMatchById } from '../data/matches';
import { ArrowLeft, Calendar, Clock, Pin, Trophy } from '../components/Icons';

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export function MatchDetailsPage() {
  const { id } = useParams();
  const match = id ? getMatchById(id) : undefined;
  const momentsRef = useRef<HTMLUListElement | null>(null);
  const [momentsVisible, setMomentsVisible] = useState(false);

  useEffect(() => {
    document.title = match ? `${match.opponent} | Match | Masters FC` : 'Match | Masters FC';
  }, [match]);

  useEffect(() => {
    const node = momentsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setMomentsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [match?.id]);

  if (!match) {
    return (
      <section className="py-32 text-center container-fc">
        <h1 className="font-display font-bold text-4xl text-pitch-950">Match not found</h1>
        <div className="mt-8"><LinkButton to="/matches" variant="primary" icon={<ArrowLeft />}>Back to Fixtures</LinkButton></div>
      </section>
    );
  }

  const home = match.home ? 'Masters FC' : match.opponent;
  const away = match.home ? match.opponent : 'Masters FC';

  return (
    <>
      <section className="relative bg-stadium-radial text-white overflow-hidden">
        <div className="absolute inset-0 bg-pitch-stripes opacity-30" aria-hidden />
        <div className="container-fc relative z-10 py-16 md:py-24">
          <Link to="/matches" className="inline-flex items-center gap-2 text-sm text-lime-brand font-semibold mb-6 hover:underline">
            <ArrowLeft /> Back to Fixtures
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-lime-brand">{match.competition}</p>
          <div className="mt-6 grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-10 max-w-4xl">
            <div className="text-center md:text-right">
              <div className="font-display font-black text-3xl md:text-5xl">{home}</div>
              <div className="mt-1 text-[11px] font-bold tracking-widest text-lime-brand uppercase">
                {match.home ? 'Home' : 'Away'}
              </div>
            </div>
            <div className="text-center">
              {match.status === 'Full Time' && match.score ? (
                <div className="font-display font-black text-6xl md:text-7xl">
                  {match.score.home} <span className="text-pitch-500/70">–</span> {match.score.away}
                </div>
              ) : (
                <div className="font-display font-black text-5xl text-lime-brand">VS</div>
              )}
              <div className="mt-2 text-[11px] font-bold tracking-widest uppercase text-pitch-100/70">
                {match.status === 'Full Time' ? 'Full Time' : match.time}
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="font-display font-black text-3xl md:text-5xl">{away}</div>
              <div className="mt-1 text-[11px] font-bold tracking-widest text-lime-brand uppercase">
                {match.home ? 'Away' : 'Home'}
              </div>
            </div>
          </div>
          <ul className="mt-10 grid sm:grid-cols-3 gap-4 max-w-3xl text-sm">
            <li className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
              <Calendar className="text-lime-brand" />
              <span>{formatDate(match.date)}</span>
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
              <Clock className="text-lime-brand" />
              <span>{match.time}</span>
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
              <Pin className="text-lime-brand" />
              <span>{match.venue}</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-fc grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950">Match Summary</h2>
            <p className="mt-4 text-pitch-800/80 leading-relaxed">
              {match.summary ??
                `A ${match.competition} fixture against ${match.opponent}. Follow Masters FC's live updates on matchday for all the detail.`}
            </p>

            {match.highlights && match.highlights.length > 0 && (
              <>
                <h3 className="mt-10 font-display font-bold text-xl text-pitch-950">Key Moments</h3>
                <ul ref={momentsRef} className="mt-4 space-y-3">
                  {match.highlights.map((h, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-4 rounded-2xl bg-pitch-50 border border-pitch-900/10 p-4 ${
                        momentsVisible ? 'animate-fade-up opacity-100' : 'opacity-0'
                      }`}
                      style={momentsVisible ? { animationDelay: `${i * 120}ms` } : undefined}
                    >
                      <div className="w-12 h-12 shrink-0 rounded-full bg-pitch-700 text-lime-brand flex items-center justify-center font-display font-bold">
                        {h.minute}'
                      </div>
                      <div>
                        <div className="font-display font-bold text-pitch-950">{h.title}</div>
                        {h.player && <div className="text-sm text-pitch-800/70">{h.player}</div>}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <aside className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl bg-pitch-50 border border-pitch-900/10 p-6">
              <h3 className="font-display font-bold text-lg text-pitch-950 flex items-center gap-2">
                <Trophy className="text-pitch-700" /> Competition
              </h3>
              <p className="mt-2 text-sm text-pitch-800/80">{match.competition}</p>
            </div>
            <ImagePlaceholder
              type="hero"
              aspectRatio="4/3"
            />
          </aside>
        </div>
      </section>
    </>
  );
}

export default MatchDetailsPage;
