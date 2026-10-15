import { useState } from 'react';

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

const roundedMap = {
  none: 'rounded-none',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
};

export function ImagePlaceholder({
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
  const showImage = src && !failed;

  return (
    <div
      className={`relative isolate overflow-hidden ${roundedMap[rounded]} ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Styled fallback background (shown when the image hasn't loaded) */}
      <div
        className="absolute inset-0 bg-stadium-radial bg-pitch-stripes"
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-lime-brand/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-pitch-500/25 blur-3xl" />
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
