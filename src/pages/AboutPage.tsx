import { useEffect } from 'react';
import { LinkButton } from '../components/Button';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatsSection } from '../components/StatsSection';
import { club } from '../data/club';
import { stats } from '../data/stats';
import { ArrowRight } from '../components/Icons';

const milestones = [
  { year: '2015', title: 'Masters FC Founded', description: 'A new football club is born in the community, built on development and discipline.' },
  { year: '2018', title: 'Academy Launched', description: 'The Masters FC Academy opens its doors to young talent across the region.' },
  { year: '2021', title: 'First Silverware', description: 'The senior team lifts its first competitive trophy in only its sixth season.' },
  { year: '2024', title: 'Community Expansion', description: 'Weekly community sessions begin, reaching hundreds of young players.' },
];

export function AboutPage() {
  useEffect(() => {
    document.title = 'About | Masters FC';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About the Club"
        title={
          <>
            A Club Rooted in <span className="text-lime-brand">Community</span>
          </>
        }
        description={club.description}
        action={
          <>
            <LinkButton to="/team" variant="lime" size="lg" iconRight={<ArrowRight />}>
              Meet the Squad
            </LinkButton>
            <LinkButton to="/academy" variant="ghost" size="lg" className="!text-white !bg-white/10 hover:!bg-white/15">
              The Academy
            </LinkButton>
          </>
        }
      />

      {/* Story */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-fc grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionHeader
              eyebrow="Our Story"
              title={<>Built on <span className="text-pitch-700">Discipline</span> & <span className="text-pitch-700">Unity</span></>}
            />
            <div className="mt-6 space-y-4 text-pitch-800/80 text-base md:text-lg leading-relaxed">
              <p>
                Masters FC was founded in {club.founded} with one guiding idea — that football could be a serious pathway for young people to grow, lead and succeed, on and off the pitch.
              </p>
              <p>
                Today, the club is home to a competitive first team and a growing academy. Every player, coach and staff member works to the same standards: discipline, respect, teamwork and relentless hard work.
              </p>
              <p>
                We are proudly rooted in the community that raised us — and committed to giving back through accessible football programmes for the next generation.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-5 bg-pitch-700/10 rounded-[2.25rem] rotate-2" aria-hidden />
            <ImagePlaceholder
              type="about"
              title="Club Story Image"
              helper="Replace with team / club photograph"
              aspectRatio="4/5"
              rounded="3xl"
              className="relative shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 md:py-28 bg-pitch-50">
        <div className="container-fc">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="rounded-3xl bg-white border border-pitch-900/10 p-8 md:p-10">
              <p className="text-xs font-bold tracking-[0.25em] uppercase text-pitch-700">Mission</p>
              <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl text-pitch-950">What we are here to do</h3>
              <p className="mt-4 text-pitch-800/80 leading-relaxed">{club.mission}</p>
            </div>
            <div className="rounded-3xl bg-pitch-950 text-white p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-pitch-stripes opacity-30" aria-hidden />
              <div className="relative">
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-lime-brand">Vision</p>
                <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl">Where we are going</h3>
                <p className="mt-4 text-pitch-100/85 leading-relaxed">{club.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-fc">
          <SectionHeader
            align="center"
            eyebrow="Our Values"
            title={<>The <span className="text-pitch-700">Masters FC</span> Way</>}
            description="Six values that shape every training session, every matchday and every community programme."
          />
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {club.values.map((v, i) => (
              <li
                key={v.title}
                className="group rounded-3xl bg-pitch-50 border border-pitch-900/10 p-6 md:p-8 hover:-translate-y-1 hover:border-pitch-700/30 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-5xl text-pitch-200 group-hover:text-lime-brand transition-colors">
                    0{i + 1}
                  </span>
                  <span className="h-2 w-10 rounded-full bg-lime-brand" />
                </div>
                <h3 className="mt-4 font-display font-bold text-xl md:text-2xl text-pitch-950">{v.title}</h3>
                <p className="mt-2 text-sm text-pitch-800/70">{v.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-pitch-50">
        <div className="container-fc">
          <SectionHeader
            eyebrow="Our Journey"
            title={<>Key <span className="text-pitch-700">Moments</span></>}
            description="A short history of a club built step by step."
          />
          <ol className="mt-10 relative border-l-2 border-pitch-700/20 ml-3 md:ml-0 md:border-l-0 md:grid md:grid-cols-4 md:gap-6">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative pl-6 md:pl-0 pb-10 md:pb-0 md:text-center">
                <span className="absolute -left-[9px] md:static md:mx-auto md:mb-4 top-1 flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-pitch-700 ring-4 ring-lime-brand/40">
                  <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-lime-brand" />
                </span>
                <div className={`font-display font-black text-3xl md:text-4xl ${i === milestones.length - 1 ? 'text-pitch-700' : 'text-pitch-900'}`}>
                  {m.year}
                </div>
                <h4 className="mt-1 font-display font-bold text-lg text-pitch-950">{m.title}</h4>
                <p className="mt-2 text-sm text-pitch-800/70">{m.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <StatsSection stats={stats} variant="dark" title="Masters FC by the Numbers" />
    </>
  );
}

export default AboutPage;
