import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Button, LinkButton } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { membershipTiers, type MembershipTier } from '../data/membership';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Heart,
  Shield,
  Star,
} from '../components/Icons';

const formatMWK = (amount: number) => `MWK ${amount.toLocaleString('en-MW')}`;

const steps = ['Choose Plan', 'Your Details', 'Confirm', 'Member Card'] as const;

interface Applicant {
  name: string;
  email: string;
  phone: string;
  dob: string;
  city: string;
  howFound: string;
  agree: boolean;
}

const emptyApplicant: Applicant = {
  name: '',
  email: '',
  phone: '',
  dob: '',
  city: '',
  howFound: '',
  agree: false,
};

const generateMemberNumber = (tier: MembershipTier) => {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MFC-M-${year}-${tier.id.slice(0, 3).toUpperCase()}-${rand}`;
};

export function MembershipPage() {
  useEffect(() => {
    document.title = 'Membership | Masters FC';
  }, []);

  const [step, setStep] = useState(0);
  const [tier, setTier] = useState<MembershipTier | null>(null);
  const [applicant, setApplicant] = useState<Applicant>(emptyApplicant);
  const [card, setCard] = useState<{ number: string; qrDataUrl: string } | null>(null);

  const canAdvance =
    (step === 0 && !!tier) ||
    (step === 1 &&
      applicant.name.trim() !== '' &&
      applicant.email.trim() !== '' &&
      applicant.phone.trim() !== '' &&
      applicant.agree) ||
    (step === 2 && !!tier) ||
    step === 3;

  const next = async () => {
    if (!canAdvance) return;
    if (step === 2 && tier) {
      const number = generateMemberNumber(tier);
      const payload = [
        `MEMBER:${number}`,
        `NAME:${applicant.name}`,
        `TIER:${tier.name}`,
        `EMAIL:${applicant.email}`,
        `JOINED:${new Date().toISOString().slice(0, 10)}`,
      ].join('\n');
      try {
        const dataUrl = await QRCode.toDataURL(payload, {
          margin: 1,
          width: 320,
          color: { dark: '#072115', light: '#ffffff' },
          errorCorrectionLevel: 'M',
        });
        setCard({ number, qrDataUrl: dataUrl });
      } catch {
        setCard({ number, qrDataUrl: '' });
      }
    }
    setStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  const reset = () => {
    setStep(0);
    setTier(null);
    setApplicant(emptyApplicant);
    setCard(null);
  };

  const downloadCard = async () => {
    if (!card || !tier) return;
    const canvas = document.createElement('canvas');
    const W = 900;
    const H = 500;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#072115');
    grad.addColorStop(0.6, '#0f3521');
    grad.addColorStop(1, '#164a2d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for (let x = -H; x < W; x += 44) {
      ctx.fillRect(x, 0, 22, H);
    }

    ctx.fillStyle = '#b4f23c';
    ctx.fillRect(0, 0, 10, H);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(W - 320, 60, 280, H - 120);

    ctx.fillStyle = '#b4f23c';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('MASTERS FC OFFICIAL MEMBERSHIP', 40, 70);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText(applicant.name || 'Member', 40, 130);

    ctx.fillStyle = 'rgba(180,242,60,0.9)';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('TIER', 40, 180);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(tier.name, 40, 212);

    ctx.fillStyle = 'rgba(180,242,60,0.9)';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('ANNUAL CONTRIBUTION', 240, 180);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(formatMWK(tier.price), 240, 212);

    ctx.fillStyle = 'rgba(180,242,60,0.9)';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('MEMBER NUMBER', 40, 280);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px monospace';
    ctx.fillText(card.number, 40, 312);

    ctx.fillStyle = 'rgba(180,242,60,0.9)';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('EMAIL', 40, 360);
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px sans-serif';
    ctx.fillText(applicant.email, 40, 388);

    ctx.fillStyle = 'rgba(180,242,60,0.9)';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('VALID THROUGH', 40, 420);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    ctx.fillText(nextYear.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }), 40, 448);

    if (card.qrDataUrl) {
      const img = new Image();
      img.src = card.qrDataUrl;
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
      ctx.drawImage(img, W - 300, 80, 240, 240);
      ctx.fillStyle = '#072115';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCAN TO VERIFY', W - 180, 360);
      ctx.font = '11px sans-serif';
      ctx.fillText(card.number, W - 180, 380);
      ctx.textAlign = 'left';
    }

    const outUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = outUrl;
    a.download = `masters-fc-member-${card.number}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      <PageHero
        eyebrow="Join the Club"
        title={<>Become a <span className="text-lime-brand">Member</span></>}
        description="Register as an official Masters FC member and get your digital membership card with a verifiable QR code — valid for one year."
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
        <div className="container-fc max-w-5xl">
          {/* STEP 1 — tier picker */}
          {step === 0 && (
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950">
                Choose a Membership Plan
              </h2>
              <p className="mt-2 text-sm text-pitch-800/70">
                All plans are valid for one year from the day of registration.
              </p>

              <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
                {membershipTiers.map((t) => {
                  const active = tier?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTier(t)}
                      className={`relative text-left flex flex-col rounded-3xl p-6 border transition ${
                        t.highlight
                          ? 'bg-pitch-950 text-white border-pitch-950'
                          : 'bg-white text-pitch-950 border-pitch-900/10'
                      } ${active ? 'ring-4 ring-lime-brand/50 shadow-xl' : 'shadow-sm hover:shadow-md'}`}
                      aria-pressed={active}
                    >
                      {t.highlight && (
                        <span className="absolute -top-3 right-6 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lime-brand text-pitch-950 text-[10px] font-bold uppercase tracking-widest">
                          Most Popular
                        </span>
                      )}
                      <div
                        className={`text-[11px] font-bold uppercase tracking-[0.25em] ${
                          t.highlight ? 'text-lime-brand' : 'text-pitch-700'
                        }`}
                      >
                        {t.name}
                      </div>
                      <p
                        className={`mt-1 text-sm italic ${
                          t.highlight ? 'text-pitch-100/70' : 'text-pitch-800/70'
                        }`}
                      >
                        {t.tagline}
                      </p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="font-display font-black text-3xl">{formatMWK(t.price)}</span>
                      </div>
                      {t.priceNote && (
                        <span
                          className={`text-[11px] font-semibold ${
                            t.highlight ? 'text-pitch-100/70' : 'text-pitch-800/70'
                          }`}
                        >
                          {t.priceNote}
                        </span>
                      )}
                      <ul className="mt-4 space-y-2 text-sm">
                        {t.perks.map((perk) => (
                          <li key={perk} className="flex items-start gap-2">
                            <span className={t.highlight ? 'text-lime-brand' : 'text-pitch-700'}>
                              <CheckCircle width={16} height={16} />
                            </span>
                            <span className={t.highlight ? 'text-pitch-100/90' : 'text-pitch-900/85'}>
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

          {/* STEP 2 — applicant details */}
          {step === 1 && (
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950">
                Your Details
              </h2>
              <p className="mt-2 text-sm text-pitch-800/70">
                Your membership card will be issued in this name. Fields marked * are required.
              </p>

              <div className="mt-8 grid md:grid-cols-2 gap-5 bg-white rounded-3xl border border-pitch-900/10 p-6 md:p-8">
                <Field label="Full name" required>
                  <input
                    type="text"
                    value={applicant.name}
                    onChange={(e) => setApplicant((a) => ({ ...a, name: e.target.value }))}
                    placeholder="e.g. Chisomo Phiri"
                    className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 placeholder:text-pitch-800/40 focus:border-pitch-700/40 focus:outline-none"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    value={applicant.email}
                    onChange={(e) => setApplicant((a) => ({ ...a, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 placeholder:text-pitch-800/40 focus:border-pitch-700/40 focus:outline-none"
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    type="tel"
                    value={applicant.phone}
                    onChange={(e) => setApplicant((a) => ({ ...a, phone: e.target.value }))}
                    placeholder="+265 ..."
                    className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 placeholder:text-pitch-800/40 focus:border-pitch-700/40 focus:outline-none"
                  />
                </Field>
                <Field label="Date of birth">
                  <input
                    type="date"
                    value={applicant.dob}
                    onChange={(e) => setApplicant((a) => ({ ...a, dob: e.target.value }))}
                    className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 focus:border-pitch-700/40 focus:outline-none"
                  />
                </Field>
                <Field label="City">
                  <input
                    type="text"
                    value={applicant.city}
                    onChange={(e) => setApplicant((a) => ({ ...a, city: e.target.value }))}
                    placeholder="e.g. Lilongwe"
                    className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 placeholder:text-pitch-800/40 focus:border-pitch-700/40 focus:outline-none"
                  />
                </Field>
                <Field label="How did you hear about us?">
                  <select
                    value={applicant.howFound}
                    onChange={(e) => setApplicant((a) => ({ ...a, howFound: e.target.value }))}
                    className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 focus:border-pitch-700/40 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="social">Social media</option>
                    <option value="friend">Friend or family</option>
                    <option value="match">Match day</option>
                    <option value="website">Website / Google</option>
                    <option value="other">Other</option>
                  </select>
                </Field>

                <label className="md:col-span-2 flex items-start gap-3 bg-pitch-50 border border-pitch-900/10 rounded-2xl p-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applicant.agree}
                    onChange={(e) => setApplicant((a) => ({ ...a, agree: e.target.checked }))}
                    className="mt-1 h-5 w-5 rounded border-pitch-900/20 text-pitch-700 focus:ring-pitch-700"
                  />
                  <span className="text-sm text-pitch-900/85">
                    I confirm the details above are accurate and I agree to the Masters FC member
                    code of conduct. <span className="text-pitch-700">*</span>
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3 — review */}
          {step === 2 && tier && (
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950">
                Review Your Registration
              </h2>
              <p className="mt-2 text-sm text-pitch-800/70">
                Check everything looks right. Click <strong>Issue Member Card</strong> to finalise.
              </p>

              <div className="mt-8 grid md:grid-cols-[1fr_1fr] gap-5">
                <div className="rounded-3xl bg-white border border-pitch-900/10 p-6">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-pitch-700 flex items-center gap-2">
                    <Shield width={16} height={16} /> Membership
                  </div>
                  <h3 className="mt-2 font-display font-bold text-2xl text-pitch-950">{tier.name}</h3>
                  <p className="mt-1 text-sm text-pitch-800/70">{tier.tagline}</p>
                  <p className="mt-4 font-display font-bold text-2xl text-pitch-950">
                    {formatMWK(tier.price)}
                    <span className="ml-2 text-xs font-semibold text-pitch-800/70">
                      {tier.priceNote}
                    </span>
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-pitch-900/10 p-6">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-pitch-700 flex items-center gap-2">
                    <Heart width={16} height={16} /> Member
                  </div>
                  <dl className="mt-3 space-y-2 text-sm">
                    <ReviewRow label="Name" value={applicant.name} />
                    <ReviewRow label="Email" value={applicant.email} />
                    <ReviewRow label="Phone" value={applicant.phone} />
                    {applicant.dob && <ReviewRow label="Date of birth" value={applicant.dob} />}
                    {applicant.city && <ReviewRow label="City" value={applicant.city} />}
                  </dl>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 — card */}
          {step === 3 && card && tier && (
            <div>
              <div className="flex items-center gap-2 text-lime-brand font-bold text-xs uppercase tracking-[0.3em]">
                <Star width={16} height={16} /> Welcome to Masters FC
              </div>
              <h2 className="mt-2 font-display font-bold text-2xl md:text-3xl text-pitch-950">
                Your Membership is Active
              </h2>
              <p className="mt-2 text-sm text-pitch-800/70">
                Save or screenshot your member card. Scan the QR at the club gate to verify.
              </p>

              <article className="mt-8 relative overflow-hidden rounded-3xl shadow-xl bg-pitch-950 text-white">
                <div className="absolute inset-0 bg-pitch-stripes opacity-20 pointer-events-none" aria-hidden />
                <div className="absolute inset-y-0 left-0 w-2 md:w-3 bg-lime-brand" aria-hidden />
                <div className="relative grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 p-6 md:p-10">
                  <div>
                    <div className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-lime-brand">
                      Masters FC Official Member
                    </div>
                    <h3 className="mt-2 font-display font-black text-2xl md:text-4xl leading-tight">
                      {applicant.name || 'Member'}
                    </h3>

                    <dl className="mt-6 grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <dt className="text-lime-brand/80 font-bold uppercase tracking-widest">Tier</dt>
                        <dd className="mt-1 font-display font-bold text-lg">{tier.name}</dd>
                      </div>
                      <div>
                        <dt className="text-lime-brand/80 font-bold uppercase tracking-widest">
                          Contribution
                        </dt>
                        <dd className="mt-1 font-display font-bold text-lg">
                          {formatMWK(tier.price)}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-6 border-t border-pitch-100/15 pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-lime-brand/80">
                        Member Number
                      </p>
                      <p className="mt-1 font-mono text-base md:text-lg tracking-wide">{card.number}</p>
                      <p className="mt-3 text-[11px] text-pitch-100/60">
                        Valid for 1 year · {applicant.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-4 md:p-5">
                    {card.qrDataUrl ? (
                      <img
                        src={card.qrDataUrl}
                        alt={`QR code for member ${card.number}`}
                        className="w-40 h-40 md:w-48 md:h-48"
                      />
                    ) : (
                      <div className="w-40 h-40 md:w-48 md:h-48 flex items-center justify-center text-pitch-800/60 text-xs">
                        QR unavailable
                      </div>
                    )}
                    <p className="mt-2 text-[10px] font-bold tracking-widest uppercase text-pitch-700">
                      Scan to Verify
                    </p>
                  </div>
                </div>
              </article>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button variant="lime" size="lg" onClick={downloadCard}>
                  Download Member Card (PNG)
                </Button>
                <Button variant="ghost" size="lg" onClick={reset}>
                  Register Another
                </Button>
                <LinkButton to="/store" variant="dark" size="lg" iconRight={<ArrowRight />}>
                  Shop Member Discounts
                </LinkButton>
              </div>

              <p className="mt-6 text-xs text-pitch-800/60">
                You'll receive a confirmation email at <strong>{applicant.email}</strong> with payment
                instructions. Your membership becomes fully active once payment is confirmed.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer navigation */}
      {step < 3 && (
        <section className="bg-white border-t border-pitch-900/10 sticky bottom-0 z-30">
          <div className="container-fc max-w-5xl py-4 flex items-center justify-between gap-3">
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
              {step === 2 ? 'Issue Member Card' : 'Next'}
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

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-pitch-800/60 shrink-0">{label}</dt>
      <dd className="font-semibold text-pitch-950 text-right break-all">{value}</dd>
    </div>
  );
}

export default MembershipPage;
