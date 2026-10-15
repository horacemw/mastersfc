import { useState } from 'react';
import type { Sponsor } from '../types';

interface SponsorCardProps {
  sponsor: Sponsor;
}

export function SponsorCard({ sponsor }: SponsorCardProps) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[5/3] rounded-2xl bg-white border border-pitch-900/10 flex flex-col items-center justify-center p-5 overflow-hidden hover:border-pitch-700/30 hover:shadow-md transition">
      {sponsor.logo && !failed ? (
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          className="max-h-14 w-auto object-contain opacity-80 group-hover:opacity-100 transition"
          onError={() => setFailed(true)}
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center text-center">
          <div className="h-9 w-9 rounded-full bg-pitch-50 flex items-center justify-center">
            <span className="text-pitch-700 font-display font-bold text-[11px]">LOGO</span>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-pitch-950 line-clamp-1">{sponsor.name}</p>
        </div>
      )}
      <span className="absolute bottom-2 left-3 text-[9px] uppercase tracking-widest font-bold text-pitch-700/70">
        {sponsor.tier}
      </span>
    </div>
  );
}

export default SponsorCard;
