import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, LinkButton } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { upcomingMatches } from '../data/matches';
import { ticketTiers } from '../data/tickets';
import type { Match } from '../types';
import { ArrowRight, Calendar, CheckCircle, Pin, Trophy } from '../components/Icons';

const formatMWK = (amount: number) => `MWK ${amount.toLocaleString('en-MW')}`;

const formatMatchDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

export function TicketsPage() {
  useEffect(() => {
    document.title = 'Tickets | Masters FC';
  }, []);

  const upcoming = upcomingMatches();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(upcoming[0] ?? null);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);

  const selectedTier = ticketTiers.find((t) => t.id === selectedTierId) ?? null;

  return (
    <>
      <PageHero
        eyebrow="Matchday"
        title={<>Buy <span className="text-lime-brand">Tickets</span></>}
        description="Pick an upcoming game, choose your ticket type and we'll be in touch to confirm your seats."
      />

      {/* Games */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-fc">
          <SectionHeader
            eyebrow="Step 1"
            title={<>Select a <span className="text-pitch-700">Game</span></>}
            description="Only upcoming fixtures are available. Past results can be found on the matches page."
          />

          {upcoming.length === 0 ? (
            <div className="mt-10 rounded-3xl bg-pitch-50 border border-pitch-900/10 p-8 text-center">
              <p className="text-pitch-800/80">
                No upcoming fixtures are listed yet. Check the{' '}
                <Link to="/matches" className="font-semibold text-pitch-700 underline">
                  full schedule
                </Link>{' '}
                for updates.
              </p>
            </div>
          ) : (
            <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map((m) => {
                const active = selectedMatch?.id === m.id;
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedMatch(m)}
                      className={`w-full text-left rounded-2xl border p-5 transition ${
                        active
                          ? 'border-pitch-700 bg-pitch-50 shadow-sm ring-2 ring-lime-brand/40'
                          : 'border-pitch-900/10 bg-white hover:bg-pitch-50/60'
                      }`}
                      aria-pressed={active}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-pitch-700">
                          <Trophy width={14} height={14} /> {m.competition}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                            m.home ? 'bg-pitch-700 text-lime-brand' : 'bg-pitch-100 text-pitch-900'
                          }`}
                        >
                          {m.home ? 'Home' : 'Away'}
                        </span>
                      </div>
                      <div className="mt-3 font-display font-bold text-xl text-pitch-950">
                        vs {m.opponent}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-pitch-800/80">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar width={14} height={14} /> {formatMatchDate(m.date)} · {m.time}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Pin width={14} height={14} /> {m.venue}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* Ticket types */}
      <section className="py-16 md:py-20 bg-pitch-50">
        <div className="container-fc">
          <SectionHeader
            eyebrow="Step 2"
            title={<>Choose a <span className="text-pitch-700">Ticket Type</span></>}
            description="Three tiers to match how you want to experience matchday."
          />

          <div className="mt-10 grid md:grid-cols-3 gap-5 md:gap-6">
            {ticketTiers.map((tier) => {
              const active = selectedTierId === tier.id;
              return (
                <article
                  key={tier.id}
                  className={`relative flex flex-col rounded-3xl p-7 md:p-8 border transition ${
                    tier.highlight
                      ? 'bg-pitch-950 text-white border-pitch-950'
                      : 'bg-white text-pitch-950 border-pitch-900/10'
                  } ${active ? 'ring-4 ring-lime-brand/50 shadow-xl' : 'shadow-sm'}`}
                >
                  {tier.highlight && (
                    <span className="absolute -top-3 right-6 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lime-brand text-pitch-950 text-[10px] font-bold uppercase tracking-widest">
                      Most Popular
                    </span>
                  )}
                  <div
                    className={`text-[11px] font-bold uppercase tracking-[0.25em] ${
                      tier.highlight ? 'text-lime-brand' : 'text-pitch-700'
                    }`}
                  >
                    {tier.name}
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display font-black text-3xl md:text-4xl">
                      {formatMWK(tier.price)}
                    </span>
                    {tier.priceNote && (
                      <span
                        className={`text-xs font-semibold ${
                          tier.highlight ? 'text-pitch-100/80' : 'text-pitch-800/70'
                        }`}
                      >
                        {tier.priceNote}
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      tier.highlight ? 'text-pitch-100/80' : 'text-pitch-800/80'
                    }`}
                  >
                    {tier.description}
                  </p>
                  <ul className="mt-5 space-y-2.5 text-sm">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <span className={tier.highlight ? 'text-lime-brand' : 'text-pitch-700'}>
                          <CheckCircle width={18} height={18} />
                        </span>
                        <span className={tier.highlight ? 'text-pitch-100/90' : 'text-pitch-900/85'}>
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-current/10">
                    <Button
                      variant={tier.highlight ? 'lime' : 'dark'}
                      fullWidth
                      size="md"
                      onClick={() => setSelectedTierId(tier.id)}
                    >
                      {active ? 'Selected' : `Choose ${tier.name}`}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Summary + CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-fc">
          <div className="rounded-3xl bg-pitch-950 text-white p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-pitch-stripes opacity-20 pointer-events-none" aria-hidden />
            <div className="relative z-10 grid md:grid-cols-3 gap-6 md:gap-8 items-center">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-lime-brand">
                  Your Selection
                </div>
                <div className="mt-2 font-display font-bold text-2xl">
                  {selectedMatch ? `vs ${selectedMatch.opponent}` : 'No game selected'}
                </div>
                {selectedMatch && (
                  <div className="mt-1 text-sm text-pitch-100/70">
                    {formatMatchDate(selectedMatch.date)} · {selectedMatch.time} · {selectedMatch.venue}
                  </div>
                )}
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-lime-brand">
                  Ticket Tier
                </div>
                <div className="mt-2 font-display font-bold text-2xl">
                  {selectedTier ? selectedTier.name : 'No tier selected'}
                </div>
                {selectedTier && (
                  <div className="mt-1 text-sm text-pitch-100/70">
                    {formatMWK(selectedTier.price)}
                    {selectedTier.priceNote ? ` ${selectedTier.priceNote}` : ''}
                  </div>
                )}
              </div>
              <div className="md:text-right">
                <LinkButton
                  to="/contact"
                  variant="lime"
                  size="lg"
                  iconRight={<ArrowRight />}
                  className={!selectedMatch || !selectedTier ? 'opacity-70' : ''}
                >
                  {selectedTier?.id === 'corporate' ? 'Request Corporate Package' : 'Request Tickets'}
                </LinkButton>
                <p className="mt-3 text-[11px] text-pitch-100/60">
                  We'll confirm availability and payment details by email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TicketsPage;
