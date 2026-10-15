import { Link } from 'react-router-dom';
import type { Match } from '../types';
import { Calendar, Clock, Pin } from './Icons';

interface MatchCardProps {
  match: Match;
  variant?: 'default' | 'featured';
}

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const statusBadge: Record<Match['status'], string> = {
  Upcoming: 'bg-lime-brand text-pitch-950',
  'Full Time': 'bg-pitch-900 text-lime-brand',
  Postponed: 'bg-amber-200 text-amber-900',
  Live: 'bg-red-500 text-white animate-pulse',
};

function TeamBadge({ name, short, isHome }: { name: string; short?: string; isHome: boolean }) {
  const initials = (short ?? name).slice(0, 3).toUpperCase();
  return (
    <div className="flex flex-col items-center gap-2 w-24 md:w-28 text-center">
      <div
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center font-display font-bold text-sm md:text-base ring-2 ${
          isHome ? 'bg-pitch-700 text-lime-brand ring-lime-brand/60' : 'bg-pitch-100 text-pitch-950 ring-pitch-900/10'
        }`}
      >
        {initials}
      </div>
      <span className="text-xs md:text-sm font-semibold text-pitch-950 line-clamp-1">{name}</span>
    </div>
  );
}

export function MatchCard({ match, variant = 'default' }: MatchCardProps) {
  const isFeatured = variant === 'featured';
  const home = match.home ? 'Masters FC' : match.opponent;
  const away = match.home ? match.opponent : 'Masters FC';
  const homeShort = match.home ? 'MFC' : match.opponentShort;
  const awayShort = match.home ? match.opponentShort : 'MFC';

  const Card = (
    <article
      className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 ${
        isFeatured
          ? 'bg-stadium-radial text-white border-pitch-700/40 shadow-xl shadow-pitch-900/30'
          : 'bg-white border-pitch-900/10 hover:border-pitch-700/30 hover:shadow-lg hover:shadow-pitch-900/5'
      }`}
    >
      {isFeatured && <div className="absolute inset-0 bg-pitch-stripes opacity-40 pointer-events-none" aria-hidden />}
      <div className="relative p-6 md:p-8">
        <div className="flex items-center justify-between gap-3 mb-6">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase ${
              isFeatured ? 'text-lime-brand' : 'text-pitch-700'
            }`}
          >
            <span className={`h-px w-5 ${isFeatured ? 'bg-lime-brand' : 'bg-pitch-700'}`} />
            {match.competition}
          </span>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusBadge[match.status]}`}
          >
            {match.status}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 md:gap-4">
          <TeamBadge name={home} short={homeShort} isHome={match.home} />
          <div className="flex flex-col items-center gap-1">
            {match.status === 'Full Time' && match.score ? (
              <div className={`font-display font-bold text-3xl md:text-4xl tracking-wider ${isFeatured ? 'text-white' : 'text-pitch-950'}`}>
                {match.score.home} <span className="text-pitch-500/60">–</span> {match.score.away}
              </div>
            ) : (
              <div className={`font-display font-bold text-2xl md:text-3xl ${isFeatured ? 'text-lime-brand' : 'text-pitch-700'}`}>
                VS
              </div>
            )}
            <span className={`text-[10px] md:text-xs font-semibold tracking-widest uppercase ${isFeatured ? 'text-lime-brand/80' : 'text-pitch-700/70'}`}>
              {match.time}
            </span>
          </div>
          <TeamBadge name={away} short={awayShort} isHome={!match.home} />
        </div>

        <div className={`mt-6 md:mt-8 pt-4 grid grid-cols-3 gap-3 text-[11px] md:text-xs border-t ${isFeatured ? 'border-pitch-100/15 text-pitch-100/80' : 'border-pitch-900/10 text-pitch-800/70'}`}>
          <div className="flex items-center gap-1.5 min-w-0">
            <Calendar />
            <span className="truncate">{formatDate(match.date)}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-center min-w-0">
            <Clock />
            <span>{match.time}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end min-w-0">
            <Pin />
            <span className="truncate">{match.venue}</span>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <Link to={`/matches/${match.id}`} className="block focus-visible:outline-none" aria-label={`${home} vs ${away} match details`}>
      {Card}
    </Link>
  );
}

export default MatchCard;
