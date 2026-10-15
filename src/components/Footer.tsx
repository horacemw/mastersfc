import { Link } from 'react-router-dom';
import { club } from '../data/club';
import { Logo } from './Logo';
import { Facebook, Mail, Phone, Pin } from './Icons';

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: 'Facebook', href: club.social.facebook, Icon: Facebook },
  ];

  return (
    <footer className="bg-pitch-950 text-pitch-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-pitch-stripes opacity-40 pointer-events-none" aria-hidden />
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[80%] rounded-full bg-pitch-700/50 blur-3xl opacity-60 pointer-events-none"
        aria-hidden
      />

      <div className="container-fc relative z-10 pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Logo variant="light" />
            <p className="text-sm text-pitch-100/70 max-w-xs leading-relaxed">
              {club.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-pitch-100/15 hover:border-lime-brand hover:text-lime-brand transition-colors"
                >
                  <Icon width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-lime-brand mb-5">
              Explore
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 text-sm">
              {club.nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-pitch-100/80 hover:text-white transition">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-lime-brand mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="text-lime-brand mt-0.5 shrink-0" />
                <a href={`mailto:${club.contact.email}`} className="text-pitch-100/80 hover:text-white transition break-all">
                  {club.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-lime-brand mt-0.5 shrink-0" />
                <span className="text-pitch-100/80">{club.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Pin className="text-lime-brand mt-0.5 shrink-0" />
                <span className="text-pitch-100/80">{club.contact.address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-lime-brand mb-5">
              Newsletter
            </h4>
            <p className="text-sm text-pitch-100/70 mb-4">
              Get fixtures, results and club news in your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLFormElement).reset();
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                required
                type="email"
                placeholder="you@example.com"
                className="flex-1 min-w-0 rounded-full bg-pitch-900/60 border border-pitch-100/10 px-4 py-2.5 text-sm text-white placeholder:text-pitch-100/40 focus:border-lime-brand focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-lime-brand text-pitch-950 font-semibold text-sm px-5 py-2.5 hover:bg-lime-bright transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-pitch-100/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-pitch-100/60">
          <p>© {year} Masters Football Club. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <span>{club.motto}</span>
            <span className="text-lime-brand">·</span>
            <span>{club.tagline}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
