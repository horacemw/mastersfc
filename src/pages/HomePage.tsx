import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinkButton } from '../components/Button';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { MatchCard } from '../components/MatchCard';
import { NewsCard } from '../components/NewsCard';
import { PlayerCard } from '../components/PlayerCard';
import { SectionHeader } from '../components/SectionHeader';
import { SponsorCard } from '../components/SponsorCard';
import { StatsSection } from '../components/StatsSection';
import { players } from '../data/players';
import { nextMatch } from '../data/matches';
import { latestNews } from '../data/news';
import { sponsors } from '../data/sponsors';
import { stats } from '../data/stats';
import { club } from '../data/club';
import {
  ArrowRight,
  CheckCircle,
  Heart,
  Play,
  Shield,
  Star,
  Trophy,
  Whistle,
} from '../components/Icons';

const heroValues = [
  { icon: <Trophy />, label: 'Talent Development' },
  { icon: <Heart />, label: 'Community Impact' },
  { icon: <Shield />, label: 'Discipline & Excellence' },
];

const featuredPlayers = ['leonard-jector', 'taona-banda', 'muhammad-ali'];

export function HomePage() {
  useEffect(() => {
    document.title = 'Masters FC | Masters Football Club';
  }, []);

  const match = nextMatch();
  const squadPreview = featuredPlayers
    .map((slug) => players.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const headlines = latestNews(3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-pitch-950 text-white">
        {/* Full-bleed hero image background */}
        <div className="absolute inset-0">
          <ImagePlaceholder
            type="hero"
            src="/mastersfcheroimage.jfif"
            alt="Masters FC"
            rounded="none"
            className="h-full w-full"
            priority
          />
        </div>
        {/* Gradient overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-pitch-950 via-pitch-950/75 to-pitch-950/20" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-950/85 via-transparent to-pitch-950/30" aria-hidden />
        <div className="absolute inset-0 bg-pitch-stripes opacity-10 pointer-events-none" aria-hidden />

        <div className="container-fc relative z-10 py-20 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-lime-brand mb-6 animate-fade-up">
              <span className="h-px w-6 bg-lime-brand" />
              Masters Football Club
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight text-shadow-hero animate-fade-up delay-100">
              MORE
              <br />
              <span className="text-lime-brand">THAN</span>
              <br />
              FOOTBALL
            </h1>
            <p className="mt-6 md:mt-8 max-w-xl text-base md:text-lg text-pitch-100/85 text-pretty animate-fade-up delay-200">
              Developing talent, building character and creating opportunities through football.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up delay-300">
              <LinkButton to="/team" variant="lime" size="lg" iconRight={<ArrowRight />}>
                Our Team
              </LinkButton>
              <LinkButton to="/gallery" variant="ghost" size="lg" className="!text-white !bg-white/10 hover:!bg-white/15" icon={<Play />}>
                Watch Highlights
              </LinkButton>
            </div>

            <ul className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-xl animate-fade-up delay-400">
              {heroValues.map((v) => (
                <li
                  key={v.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur"
                >
                  <span className="text-lime-brand">{v.icon}</span>
                  <span className="text-xs md:text-sm font-semibold text-white">{v.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ticker */}
        <div className="relative z-10 border-t border-white/10 bg-pitch-950/80 backdrop-blur">
          <div className="container-fc py-3 flex items-center gap-3 text-[11px] md:text-xs text-pitch-100/70">
            <span className="shrink-0 inline-flex items-center gap-2 font-bold tracking-[0.25em] uppercase text-lime-brand">
              <span className="h-2 w-2 rounded-full bg-lime-brand animate-pulse" /> Latest
            </span>
            <div className="marquee flex-1">
              <div className="marquee-track">
                <TickerItems opponent={match?.opponent} motto={club.motto} />
              </div>
              <div className="marquee-track" aria-hidden="true">
                <TickerItems opponent={match?.opponent} motto={club.motto} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEXT MATCH */}
      {match && (
        <section className="relative py-16 md:py-24 bg-white">
          <div className="container-fc">
            <SectionHeader
              eyebrow="Fixtures"
              title={<>Next <span className="text-pitch-700">Match</span></>}
              description="Join us at the ground or follow along online."
              action={
                <LinkButton to="/matches" variant="secondary" size="md" iconRight={<ArrowRight />}>
                  View Fixtures
                </LinkButton>
              }
            />
            <div className="mt-10 grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
              <div className="lg:col-span-3">
                <MatchCard match={match} variant="featured" />
              </div>
              <div className="lg:col-span-2 rounded-3xl p-6 md:p-8 bg-pitch-50 border border-pitch-900/10 flex flex-col">
                <h3 className="font-display text-xl md:text-2xl font-bold text-pitch-950">Matchday Info</h3>
                <ul className="mt-4 space-y-3 text-sm text-pitch-800/80">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-pitch-700 mt-0.5" />
                    <span>Gates open 60 minutes before kick-off</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-pitch-700 mt-0.5" />
                    <span>Family and youth sections available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-pitch-700 mt-0.5" />
                    <span>Follow live updates on club socials</span>
                  </li>
                </ul>
                <div className="mt-auto pt-6">
                  <LinkButton to={`/matches/${match.id}`} variant="primary" size="md" fullWidth iconRight={<ArrowRight />}>
                    Match Details
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ABOUT */}
      <section className="relative py-20 md:py-28 bg-pitch-50 overflow-hidden">
        <div className="container-fc grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative order-last lg:order-first">
            <div className="absolute -inset-5 bg-pitch-700/10 rounded-[2.25rem] -rotate-2" aria-hidden />
            <ImagePlaceholder
              type="about"
              title="About Image"
              helper="Replace with team / community photograph"
              aspectRatio="4/5"
              rounded="3xl"
              className="relative shadow-xl"
            />
            <div className="absolute -right-4 -bottom-6 hidden md:flex items-center gap-3 bg-pitch-950 text-white rounded-2xl px-4 py-3 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-lime-brand text-pitch-950 flex items-center justify-center">
                <Whistle />
              </div>
              <div>
                <div className="font-display font-bold text-xl leading-none">Since {club.founded}</div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-lime-brand">Building the game</div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="About Masters FC"
              title={<>More Than <span className="text-pitch-700">Football</span></>}
              description={club.description}
            />
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 border border-pitch-900/10">
                <div className="flex items-center gap-2 text-pitch-700 font-bold text-xs uppercase tracking-widest">
                  <Compass /> Mission
                </div>
                <p className="mt-2 text-sm text-pitch-800/80">{club.mission}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-pitch-900/10">
                <div className="flex items-center gap-2 text-pitch-700 font-bold text-xs uppercase tracking-widest">
                  <Star /> Vision
                </div>
                <p className="mt-2 text-sm text-pitch-800/80">{club.vision}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-pitch-700 mb-3">Our Values</p>
              <ul className="flex flex-wrap gap-2">
                {club.values.map((v) => (
                  <li
                    key={v.title}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-pitch-900/10 text-sm font-semibold text-pitch-950"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-brand" />
                    {v.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <LinkButton to="/about" variant="primary" iconRight={<ArrowRight />}>
                Learn More
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-fc">
          <SectionHeader
            eyebrow="Meet the Team"
            title={<>Players of <span className="text-pitch-700">Masters FC</span></>}
            description="A squad built on talent, discipline and shared ambition. Get to know the players representing the badge."
            action={
              <LinkButton to="/team" variant="secondary" iconRight={<ArrowRight />}>
                View Full Squad
              </LinkButton>
            }
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {squadPreview.map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <StatsSection stats={stats} title="Masters FC by the Numbers" />

      {/* NEWS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-fc">
          <SectionHeader
            eyebrow="Latest News"
            title={<>From the <span className="text-pitch-700">Club</span></>}
            description="Match reports, academy updates, interviews and community stories."
            action={
              <LinkButton to="/news" variant="secondary" iconRight={<ArrowRight />}>
                All News
              </LinkButton>
            }
          />
          <div className="mt-10 grid md:grid-cols-3 gap-5 md:gap-6">
            {headlines.map((n) => (
              <NewsCard key={n.id} article={n} />
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-pitch-950" aria-hidden />
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <ImagePlaceholder
            type="hero"
            src="/mastersfcheroimage.jfif"
            alt=""
            rounded="none"
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-950 via-pitch-950/85 to-pitch-950/60" aria-hidden />
        <div className="container-fc relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-lime-brand mb-5">
            <span className="h-px w-6 bg-lime-brand" />
            Join the Journey
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight text-balance">
            Be Part of the <span className="text-lime-brand">Journey</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-pitch-100/80 text-pretty">
            Support Masters FC as we develop talent, inspire young people and build a stronger football community.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <LinkButton to="/contact" variant="lime" size="lg" iconRight={<ArrowRight />}>
              Join / Support Us
            </LinkButton>
            <LinkButton to="/contact" variant="ghost" size="lg" className="!text-white !bg-white/10 hover:!bg-white/15">
              Contact the Club
            </LinkButton>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-fc">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-pitch-700">Our Partners</p>
            <h3 className="mt-2 font-display font-bold text-2xl md:text-3xl text-pitch-950">
              Proudly supported by
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {sponsors.map((s) => (
              <SponsorCard key={s.id} sponsor={s} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-pitch-800/60">
            Interested in partnering with Masters FC?{' '}
            <Link to="/contact" className="font-semibold text-pitch-700 underline-offset-4 hover:underline">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

function TickerItems({ opponent, motto }: { opponent?: string; motto: string }) {
  return (
    <>
      <span>Next match: Masters FC vs {opponent}</span>
      <span className="text-lime-brand">·</span>
      <span>New academy intake announced</span>
      <span className="text-lime-brand">·</span>
      <span>Jector named Player of the Month</span>
      <span className="text-lime-brand">·</span>
      <span>{motto}</span>
    </>
  );
}

// Local tiny icon
function Compass() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 6-6 2 2-6 6-2z" />
    </svg>
  );
}

export default HomePage;
