import { Link } from 'react-router-dom';
import type { Player } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ArrowRight } from './Icons';

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Link
      to={`/team/${player.slug}`}
      className="group relative block overflow-hidden rounded-3xl bg-pitch-950 ring-1 ring-pitch-900/10 focus-visible:outline-none"
    >
      <div className="relative aspect-[3/4]">
        <ImagePlaceholder
          type="player"
          src={player.image}
          alt={`${player.name} — ${player.position}`}
          rounded="none"
          className="absolute inset-0 h-full w-full"
          overlay
        />
        {/* number */}
        <div className="absolute top-5 right-5 flex items-center justify-center h-12 w-12 rounded-full bg-lime-brand text-pitch-950 font-display font-bold text-xl shadow-lg ring-4 ring-pitch-950/10">
          {player.number}
        </div>
        {/* position pill */}
        <div className="absolute top-5 left-5">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-pitch-950/70 backdrop-blur text-lime-brand text-[11px] font-bold tracking-wider uppercase">
            {player.position}
          </span>
        </div>

        {/* bottom name block */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
          <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight text-shadow-hero">
            {player.name.split(' ')[0]}
            <br />
            <span className="text-lime-brand">{player.name.split(' ').slice(1).join(' ')}</span>
          </h3>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-lime-brand transition-colors">
            View Profile
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* hover tint */}
        <div className="absolute inset-0 bg-pitch-900/0 group-hover:bg-pitch-900/10 transition-colors pointer-events-none" aria-hidden />
      </div>
    </Link>
  );
}

export default PlayerCard;
