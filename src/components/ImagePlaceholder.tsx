import { useState, type ReactElement } from 'react';

type PlaceholderType = 'hero' | 'player' | 'news' | 'gallery' | 'about' | 'sponsor' | 'product' | 'map';

export interface ImagePlaceholderProps {
  type?: PlaceholderType;
  title?: string;
  helper?: string;
  src?: string;
  alt?: string;
  aspectRatio?: string; // e.g. "16/9", "1/1", "4/5"
  className?: string;
  rounded?: 'none' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  overlay?: boolean;
  priority?: boolean;
}

const typeMeta: Record<PlaceholderType, { label: string; helper: string; icon: ReactElement }> = {
  hero: {
    label: 'Hero Image',
    helper: 'Replace with club stadium / match photograph',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M4 36h40M8 36V18l16-8 16 8v18M14 36V22M24 36V18M34 36V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  player: {
    label: 'Player Image',
    helper: 'Replace with player portrait',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="18" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M10 40c2-7 8-11 14-11s12 4 14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  news: {
    label: 'News Image',
    helper: 'Replace with article photograph',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="7" y="10" width="34" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M13 18h22M13 24h22M13 30h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  gallery: {
    label: 'Gallery Image',
    helper: 'Replace with photograph',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="36" height="26" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M6 30l10-9 10 8 6-5 10 9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  about: {
    label: 'About Image',
    helper: 'Replace with club photograph',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
        <path d="M24 6c6 6 6 30 0 36M24 6c-6 6-6 30 0 36M6 24h36" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  sponsor: {
    label: 'Sponsor Logo',
    helper: 'Replace with sponsor artwork',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="6" y="12" width="36" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M16 24h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  product: {
    label: 'Product Image',
    helper: 'Replace with product photograph',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M10 18l14-8 14 8-14 8-14-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 18v16l14 8 14-8V18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  map: {
    label: 'Map',
    helper: 'Replace with embedded map',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 42s-14-11-14-22a14 14 0 1 1 28 0c0 11-14 22-14 22z" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="20" r="5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
};

const roundedMap = {
  none: 'rounded-none',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
};

export function ImagePlaceholder({
  type = 'gallery',
  title,
  helper,
  src,
  alt = '',
  aspectRatio,
  className = '',
  rounded = '2xl',
  overlay = false,
  priority = false,
}: ImagePlaceholderProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const meta = typeMeta[type];
  const showImage = src && !failed;

  return (
    <div
      className={`relative isolate overflow-hidden ${roundedMap[rounded]} ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Placeholder layer (always rendered beneath for graceful fallback) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-pitch-100 bg-stadium-radial bg-pitch-stripes"
        aria-hidden={showImage ? 'true' : undefined}
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-lime-brand/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-pitch-500/25 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-8">
          <div className="w-14 h-14 md:w-16 md:h-16 text-lime-brand mb-3 opacity-90">{meta.icon}</div>
          <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-lime-brand/90">
            {title ?? meta.label}
          </p>
          <p className="mt-1 text-[11px] md:text-xs text-pitch-100/70 max-w-[22ch]">
            {helper ?? meta.helper}
          </p>
        </div>
      </div>

      {showImage && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-pitch-950/85 via-pitch-900/30 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default ImagePlaceholder;
