import type { ClubStatistic } from '../types';

interface StatsSectionProps {
  stats: ClubStatistic[];
  variant?: 'light' | 'dark';
  title?: string;
}

export function StatsSection({ stats, variant = 'dark', title }: StatsSectionProps) {
  const isDark = variant === 'dark';
  return (
    <section
      className={`relative overflow-hidden ${
        isDark ? 'bg-stadium-radial text-white' : 'bg-pitch-50 text-pitch-950'
      }`}
      aria-label="Club statistics"
    >
      {isDark && <div className="absolute inset-0 bg-pitch-stripes opacity-30 pointer-events-none" aria-hidden />}
      <div className="container-fc relative z-10 py-16 md:py-20">
        {title && (
          <h2 className={`font-display text-center text-2xl md:text-3xl font-bold mb-10 ${isDark ? 'text-white' : 'text-pitch-950'}`}>
            {title}
          </h2>
        )}
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <li
              key={s.id}
              className={`relative rounded-2xl p-5 md:p-6 text-center transition-transform hover:-translate-y-1 ${
                isDark
                  ? 'bg-white/5 border border-white/10 backdrop-blur'
                  : 'bg-white border border-pitch-900/10 shadow-sm'
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className={`font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-none ${
                  isDark ? 'text-lime-brand' : 'text-pitch-700'
                }`}
              >
                {s.value}
              </div>
              <p className={`mt-2 text-xs md:text-sm font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-pitch-950'}`}>
                {s.label}
              </p>
              {s.description && (
                <p className={`mt-2 text-[11px] md:text-xs ${isDark ? 'text-pitch-100/70' : 'text-pitch-800/60'}`}>
                  {s.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default StatsSection;
