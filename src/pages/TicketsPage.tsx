import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { Button, LinkButton } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { upcomingMatches } from '../data/matches';
import { ticketTiers, type TicketTier } from '../data/tickets';
import type { Match } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  Pin,
  Trophy,
} from '../components/Icons';

const formatMWK = (amount: number) => `MWK ${amount.toLocaleString('en-MW')}`;

const formatMatchDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const generateTicketNumber = (match: Match, tier: TicketTier) => {
  const date = match.date.replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MFC-${date}-${tier.id.slice(0, 3).toUpperCase()}-${rand}`;
};

const steps = ['Game', 'Ticket Type', 'Your Details', 'Confirm'] as const;

interface BuyerDetails {
  name: string;
  email: string;
  phone: string;
  quantity: number;
}

export function TicketsPage() {
  useEffect(() => {
    document.title = 'Tickets | Masters FC';
  }, []);

  const upcoming = upcomingMatches();

  const [step, setStep] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(upcoming[0] ?? null);
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [buyer, setBuyer] = useState<BuyerDetails>({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
  });

  const [ticket, setTicket] = useState<{
    number: string;
    qrDataUrl: string;
  } | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const total = useMemo(
    () => (selectedTier ? selectedTier.price * buyer.quantity : 0),
    [selectedTier, buyer.quantity],
  );

  const canAdvance =
    (step === 0 && !!selectedMatch) ||
    (step === 1 && !!selectedTier) ||
    (step === 2 &&
      buyer.name.trim() !== '' &&
      buyer.email.trim() !== '' &&
      buyer.quantity > 0) ||
    step === 3;

  const next = async () => {
    if (!canAdvance) return;
    if (step === 2) {
      // Generate ticket on confirm
      if (!selectedMatch || !selectedTier) return;
      const number = generateTicketNumber(selectedMatch, selectedTier);
      const payload = [
        `TICKET:${number}`,
        `MATCH:Masters FC vs ${selectedMatch.opponent}`,
        `DATE:${selectedMatch.date} ${selectedMatch.time}`,
        `VENUE:${selectedMatch.venue}`,
        `TIER:${selectedTier.name}`,
        `QTY:${buyer.quantity}`,
        `TOTAL:${formatMWK(total)}`,
        `BUYER:${buyer.name}`,
      ].join('\n');
      try {
        const dataUrl = await QRCode.toDataURL(payload, {
          margin: 1,
          width: 320,
          color: { dark: '#072115', light: '#ffffff' },
          errorCorrectionLevel: 'M',
        });
        setTicket({ number, qrDataUrl: dataUrl });
      } catch {
        // fallback: no QR
        setTicket({ number, qrDataUrl: '' });
      }
    }
    setStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  const reset = () => {
    setStep(0);
    setSelectedTier(null);
    setBuyer({ name: '', email: '', phone: '', quantity: 1 });
    setTicket(null);
  };

  const downloadTicket = async () => {
    if (!ticket || !selectedMatch || !selectedTier) return;
    const canvas = document.createElement('canvas');
    const W = 900;
    const H = 420;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#072115';
    ctx.fillRect(0, 0, W, H);
    // Diagonal stripes
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for (let x = -H; x < W; x += 40) {
      ctx.fillRect(x, 0, 20, H);
    }
    // Lime accent band on left
    ctx.fillStyle = '#b4f23c';
    ctx.fillRect(0, 0, 10, H);
    // Right QR area
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(W - 320, 40, 280, H - 80);

    // Text
    ctx.fillStyle = '#b4f23c';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('MASTERS FC MATCH TICKET', 40, 60);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    const matchText = `Masters FC vs ${selectedMatch.opponent}`;
    ctx.fillText(matchText, 40, 110);

    ctx.font = '18px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText(`${formatMatchDate(selectedMatch.date)} · ${selectedMatch.time}`, 40, 150);
    ctx.fillText(selectedMatch.venue, 40, 180);

    ctx.fillStyle = 'rgba(180,242,60,0.9)';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('TICKET TYPE', 40, 230);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(selectedTier.name, 40, 258);

    ctx.fillStyle = 'rgba(180,242,60,0.9)';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('QUANTITY', 220, 230);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(String(buyer.quantity), 220, 258);

    ctx.fillStyle = 'rgba(180,242,60,0.9)';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('TOTAL', 320, 230);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(formatMWK(total), 320, 258);

    ctx.fillStyle = 'rgba(180,242,60,0.9)';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('TICKET NUMBER', 40, 320);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(ticket.number, 40, 348);

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '12px sans-serif';
    ctx.fillText(`Holder: ${buyer.name}`, 40, 378);

    // Draw QR code image
    if (ticket.qrDataUrl) {
      const img = new Image();
      img.src = ticket.qrDataUrl;
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
      ctx.drawImage(img, W - 300, 60, 240, 240);
      ctx.fillStyle = '#072115';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCAN AT GATE', W - 180, 340);
      ctx.textAlign = 'left';
    }

    const outUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = outUrl;
    a.download = `masters-fc-ticket-${ticket.number}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      <PageHero
        eyebrow="Matchday"
        title={<>Buy <span className="text-lime-brand">Tickets</span></>}
        description="Four quick steps and your ticket is ready — complete with a QR code you can scan at the gate."
      />

      {/* Stepper */}
      <section className="bg-white border-b border-pitch-900/10 sticky top-16 md:top-20 z-30">
        <div className="container-fc py-4">
          <ol className="flex items-center gap-2 md:gap-4 text-xs md:text-sm font-semibold overflow-x-auto">
            {steps.map((label, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={label} className="flex items-center gap-2 md:gap-3 shrink-0">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full text-[11px] md:text-sm transition ${
                      done
                        ? 'bg-pitch-700 text-lime-brand'
                        : current
                          ? 'bg-pitch-950 text-white ring-4 ring-lime-brand/40'
                          : 'bg-pitch-50 text-pitch-800/70'
                    }`}
                  >
                    {done ? <CheckCircle width={16} height={16} /> : i + 1}
                  </span>
                  <span
                    className={`whitespace-nowrap ${
                      current ? 'text-pitch-950' : 'text-pitch-800/60'
                    }`}
                  >
                    {label}
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      className={`hidden md:block h-px w-10 ${
                        done ? 'bg-pitch-700' : 'bg-pitch-900/10'
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-pitch-50 min-h-[60vh]">
        <div className="container-fc max-w-4xl">
          {/* STEP 1 */}
          {step === 0 && (
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950">
                Select a Game
              </h2>
              <p className="mt-2 text-sm text-pitch-800/70">
                Pick an upcoming fixture to buy tickets for.
              </p>

              {upcoming.length === 0 ? (
                <div className="mt-8 rounded-3xl bg-white border border-pitch-900/10 p-8 text-center">
                  <p className="text-pitch-800/80">
                    No upcoming fixtures listed yet.{' '}
                    <Link to="/matches" className="font-semibold text-pitch-700 underline">
                      See all matches
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <ul className="mt-8 grid sm:grid-cols-2 gap-4">
                  {upcoming.map((m) => {
                    const active = selectedMatch?.id === m.id;
                    return (
                      <li key={m.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedMatch(m)}
                          className={`w-full text-left rounded-2xl border p-5 transition ${
                            active
                              ? 'border-pitch-700 bg-white shadow-md ring-2 ring-lime-brand/40'
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
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950">
                Choose a Ticket Type
              </h2>
              <p className="mt-2 text-sm text-pitch-800/70">
                Three tiers to match how you want to experience matchday.
              </p>

              <div className="mt-8 grid md:grid-cols-3 gap-5">
                {ticketTiers.map((tier) => {
                  const active = selectedTier?.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`relative text-left flex flex-col rounded-3xl p-6 border transition ${
                        tier.highlight
                          ? 'bg-pitch-950 text-white border-pitch-950'
                          : 'bg-white text-pitch-950 border-pitch-900/10'
                      } ${active ? 'ring-4 ring-lime-brand/50 shadow-xl' : 'shadow-sm hover:shadow-md'}`}
                      aria-pressed={active}
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
                        <span className="font-display font-black text-3xl">
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
                      <ul className="mt-4 space-y-2 text-sm">
                        {tier.perks.map((perk) => (
                          <li key={perk} className="flex items-start gap-2">
                            <span className={tier.highlight ? 'text-lime-brand' : 'text-pitch-700'}>
                              <CheckCircle width={16} height={16} />
                            </span>
                            <span className={tier.highlight ? 'text-pitch-100/90' : 'text-pitch-900/85'}>
                              {perk}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950">
                Your Details
              </h2>
              <p className="mt-2 text-sm text-pitch-800/70">
                We'll link the ticket to your name and send a confirmation to your email.
              </p>

              <div className="mt-8 grid md:grid-cols-2 gap-5 bg-white rounded-3xl border border-pitch-900/10 p-6 md:p-8">
                <Field label="Full name" required>
                  <input
                    type="text"
                    value={buyer.name}
                    onChange={(e) => setBuyer((b) => ({ ...b, name: e.target.value }))}
                    placeholder="e.g. Precious Sambani"
                    className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 placeholder:text-pitch-800/40 focus:border-pitch-700/40 focus:outline-none"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    value={buyer.email}
                    onChange={(e) => setBuyer((b) => ({ ...b, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 placeholder:text-pitch-800/40 focus:border-pitch-700/40 focus:outline-none"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    type="tel"
                    value={buyer.phone}
                    onChange={(e) => setBuyer((b) => ({ ...b, phone: e.target.value }))}
                    placeholder="+265 ..."
                    className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 placeholder:text-pitch-800/40 focus:border-pitch-700/40 focus:outline-none"
                  />
                </Field>
                <Field label="Quantity" required>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={buyer.quantity}
                    onChange={(e) =>
                      setBuyer((b) => ({ ...b, quantity: Math.max(1, Number(e.target.value) || 1) }))
                    }
                    className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 focus:border-pitch-700/40 focus:outline-none"
                  />
                </Field>

                <div className="md:col-span-2 mt-2 flex items-center justify-between gap-4 border-t border-pitch-900/10 pt-5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-pitch-700">Total</p>
                    <p className="mt-1 font-display font-bold text-2xl text-pitch-950">
                      {formatMWK(total)}
                    </p>
                  </div>
                  <div className="text-right text-xs text-pitch-800/60">
                    {selectedTier?.name} × {buyer.quantity}
                    <br />
                    {selectedMatch ? `vs ${selectedMatch.opponent}` : ''}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 3 && ticket && selectedMatch && selectedTier && (
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950">
                Your Ticket is Ready
              </h2>
              <p className="mt-2 text-sm text-pitch-800/70">
                Save or screenshot the ticket below. Scan the QR code at the gate on matchday.
              </p>

              <article className="mt-8 relative overflow-hidden rounded-3xl shadow-xl bg-pitch-950 text-white">
                <div className="absolute inset-0 bg-pitch-stripes opacity-20 pointer-events-none" aria-hidden />
                <div className="absolute inset-y-0 left-0 w-2 md:w-3 bg-lime-brand" aria-hidden />
                <div className="relative grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 p-6 md:p-10">
                  <div>
                    <div className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-lime-brand">
                      Masters FC Match Ticket
                    </div>
                    <h3 className="mt-2 font-display font-black text-2xl md:text-4xl leading-tight">
                      Masters FC <span className="text-lime-brand">vs</span> {selectedMatch.opponent}
                    </h3>
                    <p className="mt-2 text-sm text-pitch-100/80">
                      {formatMatchDate(selectedMatch.date)} · {selectedMatch.time}
                      <br />
                      {selectedMatch.venue}
                    </p>

                    <dl className="mt-6 grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <dt className="text-lime-brand/80 font-bold uppercase tracking-widest">Tier</dt>
                        <dd className="mt-1 font-display font-bold text-lg">{selectedTier.name}</dd>
                      </div>
                      <div>
                        <dt className="text-lime-brand/80 font-bold uppercase tracking-widest">Qty</dt>
                        <dd className="mt-1 font-display font-bold text-lg">{buyer.quantity}</dd>
                      </div>
                      <div>
                        <dt className="text-lime-brand/80 font-bold uppercase tracking-widest">Total</dt>
                        <dd className="mt-1 font-display font-bold text-lg">{formatMWK(total)}</dd>
                      </div>
                    </dl>

                    <div className="mt-6 border-t border-pitch-100/15 pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-lime-brand/80">
                        Ticket Number
                      </p>
                      <p className="mt-1 font-mono text-base md:text-lg tracking-wide">
                        {ticket.number}
                      </p>
                      <p className="mt-3 text-[11px] text-pitch-100/60">
                        Holder: <span className="text-white">{buyer.name}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-4 md:p-5">
                    {ticket.qrDataUrl ? (
                      <img
                        src={ticket.qrDataUrl}
                        alt={`QR code for ticket ${ticket.number}`}
                        className="w-40 h-40 md:w-48 md:h-48"
                      />
                    ) : (
                      <div className="w-40 h-40 md:w-48 md:h-48 flex items-center justify-center text-pitch-800/60 text-xs">
                        QR unavailable
                      </div>
                    )}
                    <p className="mt-2 text-[10px] font-bold tracking-widest uppercase text-pitch-700">
                      Scan at Gate
                    </p>
                  </div>
                </div>
              </article>

              <canvas ref={qrCanvasRef} className="hidden" />

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button variant="lime" size="lg" onClick={downloadTicket}>
                  Download Ticket (PNG)
                </Button>
                <Button variant="ghost" size="lg" onClick={reset}>
                  Book Another
                </Button>
                <LinkButton to="/matches" variant="dark" size="lg" iconRight={<ArrowRight />}>
                  See all matches
                </LinkButton>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer navigation */}
      {step < 3 && (
        <section className="bg-white border-t border-pitch-900/10 sticky bottom-0 z-30">
          <div className="container-fc max-w-4xl py-4 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="md"
              onClick={prev}
              disabled={step === 0}
              icon={<ArrowLeft />}
            >
              Previous
            </Button>

            <div className="text-xs md:text-sm text-pitch-800/60 text-center">
              Step {step + 1} of {steps.length} · {steps[step]}
            </div>

            <Button
              variant="lime"
              size="md"
              onClick={next}
              disabled={!canAdvance}
              iconRight={<ArrowRight />}
            >
              {step === 2 ? 'Generate Ticket' : 'Next'}
            </Button>
          </div>
        </section>
      )}
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-widest text-pitch-950 mb-2">
        {label} {required && <span className="text-pitch-700">*</span>}
      </span>
      {children}
    </label>
  );
}

export default TicketsPage;
