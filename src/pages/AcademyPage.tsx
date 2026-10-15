import { useEffect } from 'react';
import { LinkButton } from '../components/Button';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { ArrowRight, Ball, CheckCircle, Shield, Star, Trophy, Users, Whistle } from '../components/Icons';

const programs = [
  { icon: <Ball />, title: 'Youth Development', description: 'Age-group training groups focused on technique, decision-making and enjoyment.' },
  { icon: <Whistle />, title: 'Football Training', description: 'Structured weekly sessions led by qualified Masters FC coaches.' },
  { icon: <Star />, title: 'Talent Identification', description: 'Open trials and talent-ID days with a clear pathway into Masters FC teams.' },
  { icon: <Shield />, title: 'Character Development', description: 'Discipline, teamwork and leadership built into every session.' },
  { icon: <Users />, title: 'Community Football', description: 'Accessible community sessions for young players across the city.' },
  { icon: <Trophy />, title: 'Pathway to First Team', description: 'A proven route from academy to first-team involvement.' },
];

const commitments = [
  'Qualified Masters FC coaching staff',
  'Age-appropriate training structure',
  'Discipline, respect and character on the agenda',
  'Clear pathway to competitive football',
  'Open to young players of all backgrounds',
];

export function AcademyPage() {
  useEffect(() => {
    document.title = 'Academy | Masters FC';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Masters FC Academy"
        title={<>Developing the <span className="text-lime-brand">Next Generation</span></>}
        description="A football home for ambitious young players — built on development, discipline and real opportunity."
        action={
          <LinkButton to="/contact" variant="lime" size="lg" iconRight={<ArrowRight />}>
            Join the Academy
          </LinkButton>
        }
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="container-fc grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-5 bg-pitch-700/10 rounded-[2.25rem] -rotate-2" aria-hidden />
            <ImagePlaceholder
              type="about"
              title="Academy Training"
              helper="Replace with academy training photograph"
              aspectRatio="4/5"
              rounded="3xl"
              className="relative shadow-xl"
            />
          </div>
          <div>
            <SectionHeader
              eyebrow="Why Masters FC Academy"
              title={<>Football with a <span className="text-pitch-700">Purpose</span></>}
              description="Our academy is more than training. It is a long-term development environment focused on building better players and better people."
            />
            <ul className="mt-8 space-y-3">
              {commitments.map((c) => (
                <li key={c} className="flex items-start gap-3 text-pitch-800/85">
                  <CheckCircle className="mt-1 text-pitch-700 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-pitch-50">
        <div className="container-fc">
          <SectionHeader
            align="center"
            eyebrow="Programs"
            title={<>What We <span className="text-pitch-700">Offer</span></>}
            description="A full academy programme designed around every stage of a young player's development."
          />
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {programs.map((p) => (
              <li
                key={p.title}
                className="rounded-3xl bg-white border border-pitch-900/10 p-6 md:p-8 hover:-translate-y-1 hover:border-pitch-700/30 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-pitch-950 text-lime-brand flex items-center justify-center">
                  {p.icon}
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-pitch-950">{p.title}</h3>
                <p className="mt-2 text-sm text-pitch-800/75">{p.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden bg-pitch-950 text-white">
        <div className="absolute inset-0 bg-stadium-radial opacity-80" aria-hidden />
        <div className="container-fc relative z-10 text-center max-w-3xl">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-balance">
            Think you have what it takes? <span className="text-lime-brand">Join Us.</span>
          </h2>
          <p className="mt-5 text-pitch-100/85">
            Register your interest and our coaching team will be in touch with upcoming trial dates.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <LinkButton to="/contact" variant="lime" size="lg" iconRight={<ArrowRight />}>
              Join the Academy
            </LinkButton>
            <LinkButton to="/team" variant="ghost" size="lg" className="!text-white !bg-white/10 hover:!bg-white/15">
              See the Pathway
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

export default AcademyPage;
