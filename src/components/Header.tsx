import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { club } from '../data/club';
import { preloadRoute } from '../routes';
import { LinkButton } from './Button';
import { Logo } from './Logo';
import { Close, Facebook, Menu } from './Icons';

const prefetchHandlers = (path: string) => ({
  onMouseEnter: () => preloadRoute(path),
  onFocus: () => preloadRoute(path),
  onTouchStart: () => preloadRoute(path),
});

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const socials = [
    { label: 'Facebook', href: club.social.facebook, Icon: Facebook },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur shadow-[0_4px_20px_-10px_rgba(15,53,33,0.25)] border-b border-pitch-900/5'
          : 'bg-white border-b border-transparent'
      }`}
    >
      {/* Top strip */}
      <div className="hidden lg:block bg-pitch-950 text-pitch-100/80 text-xs">
        <div className="container-fc flex items-center justify-between py-2">
          <span className="tracking-[0.2em] uppercase text-lime-brand font-semibold">
            {club.motto}
          </span>
          <div className="flex items-center gap-5">
            <a href={`mailto:${club.contact.email}`} className="hover:text-white transition">
              {club.contact.email}
            </a>
            <span className="h-3 w-px bg-pitch-100/20" />
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-pitch-100/70 hover:text-lime-brand transition"
                >
                  <Icon width={14} height={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-fc">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" aria-label="Masters FC home">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {club.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                {...prefetchHandlers(item.to)}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-pitch-950'
                      : 'text-pitch-900/70 hover:text-pitch-950'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 rounded-full transition-all ${
                        isActive ? 'bg-lime-brand opacity-100' : 'opacity-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <LinkButton to="/contact" variant="dark" size="sm">
              Join Our Team
            </LinkButton>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-full border border-pitch-900/10 w-11 h-11 text-pitch-950 hover:bg-pitch-50"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-150 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!open}
      >
        <button
          className="absolute inset-0 bg-pitch-950/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-label="Close menu overlay"
          tabIndex={-1}
        />
        <aside
          className={`absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-200 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ willChange: 'transform' }}
          role="dialog"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between p-5 border-b border-pitch-900/10">
            <Logo />
            <button
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-pitch-900/10 text-pitch-950"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <Close />
            </button>
          </div>
          <nav className="flex-1 overflow-auto p-4" aria-label="Mobile primary">
            <ul className="flex flex-col">
              {club.nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    {...prefetchHandlers(item.to)}
                    className={({ isActive }) =>
                      `block px-4 py-4 rounded-xl text-base font-semibold ${
                        isActive
                          ? 'bg-pitch-50 text-pitch-950'
                          : 'text-pitch-900/80 hover:bg-pitch-50/80 hover:text-pitch-950'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-5 border-t border-pitch-900/10 space-y-4">
            <LinkButton to="/contact" variant="dark" size="md" fullWidth>
              Join Our Team
            </LinkButton>
            <div className="flex items-center justify-center gap-5 pt-1">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-pitch-900/70 hover:text-pitch-950"
                >
                  <Icon width={20} height={20} />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}

export default Header;
