import { useState } from 'react';

interface LogoProps {
  size?: number;
  variant?: 'light' | 'dark';
  withText?: boolean;
  className?: string;
}

export function Logo({ size = 44, variant = 'dark', withText = true, className = '' }: LogoProps) {
  const [failed, setFailed] = useState(false);
  const textColor = variant === 'light' ? 'text-white' : 'text-pitch-950';
  const subColor = variant === 'light' ? 'text-lime-brand' : 'text-pitch-600';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        className="relative shrink-0 flex items-center justify-center rounded-full bg-pitch-900 ring-2 ring-lime-brand/70 overflow-hidden"
        style={{ width: size, height: size }}
      >
        {!failed ? (
          <img
            src="/masters%20fc%20logo.png"
            alt="Masters FC crest"
            width={size}
            height={size}
            className="h-full w-full object-contain p-1"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="font-display font-bold text-lime-brand text-sm">MFC</span>
        )}
      </div>
      {withText && (
        <div className="flex flex-col leading-none">
          <span className={`font-display font-bold tracking-wide text-base md:text-lg ${textColor}`}>
            MASTERS FC
          </span>
          <span className={`text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase ${subColor}`}>
            Football Club
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
