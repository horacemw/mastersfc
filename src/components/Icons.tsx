import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = { fill: 'none', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const ArrowRight = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
export const Play = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><path d="M6 4l14 8-14 8V4z" fill="currentColor" stroke="none" /></svg>
);
export const Menu = (p: IconProps) => (
  <svg {...base} width={22} height={22} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = (p: IconProps) => (
  <svg {...base} width={22} height={22} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Search = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
);
export const Calendar = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
);
export const Clock = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const Pin = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><path d="M12 22s-7-6-7-12a7 7 0 1 1 14 0c0 6-7 12-7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const Mail = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" /></svg>
);
export const Phone = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><path d="M4 4h4l2 5-2 1a12 12 0 0 0 6 6l1-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z" /></svg>
);
export const Trophy = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z" /><path d="M17 5h3v3a3 3 0 0 1-3 3M7 5H4v3a3 3 0 0 0 3 3" /></svg>
);
export const Shield = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" /></svg>
);
export const Users = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><circle cx="9" cy="9" r="3.5" /><path d="M3 20c1-3.5 3.5-5 6-5s5 1.5 6 5" /><circle cx="17" cy="9" r="2.5" /><path d="M15 20c.5-2.5 2-4 4-4s3 1 3 3" /></svg>
);
export const Star = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><path d="M12 3l2.6 5.5 6 .9-4.3 4.2 1 6-5.3-2.8L6.7 19.6l1-6L3.4 9.4l6-.9L12 3z" /></svg>
);
export const Heart = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><path d="M12 20s-7-4.5-9-10c-1-3 1-6 4-6 2 0 3.5 1.5 5 3 1.5-1.5 3-3 5-3 3 0 5 3 4 6-2 5.5-9 10-9 10z" /></svg>
);
export const Ball = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 3l3 3-1.5 4H10L8.5 6 12 3zM3 12l4-1 2 3-2 4-3-1M21 12l-4-1-2 3 2 4 3-1M9 20l1-4h4l1 4" /></svg>
);
export const Whistle = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><path d="M3 12a6 6 0 0 1 6-6h9a3 3 0 0 1 0 6l-4 1a5 5 0 1 1-11-1z" /><circle cx="8" cy="12" r="1" fill="currentColor" /></svg>
);
export const Compass = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><circle cx="12" cy="12" r="9" /><path d="M15 9l-2 6-6 2 2-6 6-2z" /></svg>
);
export const Instagram = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
);
export const Facebook = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...p}><path d="M22 12a10 10 0 1 0-11.6 9.9V15H8v-3h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 3h-2.2v6.9A10 10 0 0 0 22 12z" /></svg>
);
export const Twitter = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...p}><path d="M18 3h3l-7 8 8 10h-6l-5-6-6 6H2l8-9L2 3h6l4 5 6-5z" /></svg>
);
export const Youtube = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...p}><path d="M23 7s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.3 3.5 12 3.5 12 3.5s-4.3 0-7.7.2c-.5.1-1.5.1-2.4 1C1.2 5.4 1 7 1 7S.8 8.9.8 10.8v1.4C.8 14.1 1 16 1 16s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 8.5.3 8.5.3s4.3 0 7.7-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4C23.2 8.9 23 7 23 7zM9.8 14.6V7.9l6.4 3.4-6.4 3.3z" /></svg>
);
export const CheckCircle = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg>
);
export const CartIcon = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><path d="M3 4h2l2 12h11l2-8H6" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /></svg>
);
export const Plus = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const Minus = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><path d="M5 12h14" /></svg>
);
