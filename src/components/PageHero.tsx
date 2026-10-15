import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  compact?: boolean;
}

export function PageHero({ eyebrow, title, description, action, compact }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-stadium-radial text-white">
      <div className="absolute inset-0 bg-pitch-stripes opacity-30 pointer-events-none" aria-hidden />
      <div
        className="absolute -top-24 right-10 w-72 h-72 rounded-full bg-lime-brand/15 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div className={`container-fc relative z-10 ${compact ? 'py-16 md:py-20' : 'py-20 md:py-28 lg:py-32'}`}>
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-lime-brand mb-5">
              <span className="h-px w-6 bg-lime-brand" />
              {eyebrow}
            </div>
          )}
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-balance text-shadow-hero">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-base md:text-lg lg:text-xl text-pitch-100/85 max-w-2xl text-pretty">
              {description}
            </p>
          )}
          {action && <div className="mt-8 flex flex-wrap gap-3">{action}</div>}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
