import type { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  variant?: 'light' | 'dark';
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  variant = 'light',
  action,
  className = '',
}: SectionHeaderProps) {
  const isDark = variant === 'dark';
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start';

  return (
    <div className={`flex flex-col md:flex-row md:items-end gap-4 md:gap-8 ${className}`}>
      <div className={`flex flex-col gap-3 ${alignCls} ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-3xl'}`}>
        {eyebrow && (
          <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase ${isDark ? 'text-lime-brand' : 'text-pitch-700'}`}>
            <span className={`h-px w-6 ${isDark ? 'bg-lime-brand' : 'bg-pitch-700'}`} />
            {eyebrow}
          </div>
        )}
        <h2
          className={`font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-balance ${isDark ? 'text-white' : 'text-pitch-950'}`}
        >
          {title}
        </h2>
        {description && (
          <p className={`text-base md:text-lg text-pretty ${isDark ? 'text-pitch-100/80' : 'text-pitch-800/70'}`}>
            {description}
          </p>
        )}
      </div>
      {action && <div className={`md:ml-auto ${align === 'center' ? 'mx-auto' : ''}`}>{action}</div>}
    </div>
  );
}

export default SectionHeader;
