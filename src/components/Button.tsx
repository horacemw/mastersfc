import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'lime';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const variantMap: Record<Variant, string> = {
  primary:
    'bg-pitch-700 text-white hover:bg-pitch-800 focus-visible:bg-pitch-800 shadow-sm hover:shadow-md',
  secondary:
    'bg-white text-pitch-900 border border-pitch-900/10 hover:border-pitch-900/30 hover:bg-pitch-50',
  ghost:
    'bg-transparent text-pitch-900 hover:bg-pitch-50',
  dark:
    'bg-pitch-950 text-white hover:bg-pitch-900 shadow-sm',
  lime:
    'bg-lime-brand text-pitch-950 hover:bg-lime-bright hover:shadow-lg hover:shadow-lime-brand/30 font-semibold',
};

const sizeMap: Record<Size, string> = {
  sm: 'text-xs px-3.5 py-2 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-sm md:text-base px-6 py-3 md:py-3.5 gap-2',
};

const base =
  'inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-200 btn-shine focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap';

export interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  className = '',
  fullWidth,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variantMap[variant]} ${sizeMap[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="inline-flex">{iconRight}</span>}
    </button>
  );
}

interface LinkButtonProps extends BaseProps {
  to: string;
  external?: boolean;
  ariaLabel?: string;
}

export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  className = '',
  fullWidth,
  external,
  ariaLabel,
}: LinkButtonProps) {
  const classes = `${base} ${variantMap[variant]} ${sizeMap[size]} ${fullWidth ? 'w-full' : ''} ${className}`;
  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={classes} aria-label={ariaLabel}>
        {icon && <span className="inline-flex">{icon}</span>}
        <span>{children}</span>
        {iconRight && <span className="inline-flex">{iconRight}</span>}
      </a>
    );
  }
  return (
    <Link to={to} className={classes} aria-label={ariaLabel}>
      {icon && <span className="inline-flex">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="inline-flex">{iconRight}</span>}
    </Link>
  );
}

export default Button;
