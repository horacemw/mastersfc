import { useEffect } from 'react';
import { LinkButton } from '../components/Button';
import { ArrowRight } from '../components/Icons';

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page not found | Masters FC';
  }, []);

  return (
    <section className="relative overflow-hidden bg-stadium-radial text-white">
      <div className="absolute inset-0 bg-pitch-stripes opacity-30" aria-hidden />
      <div className="container-fc relative z-10 py-32 md:py-40 text-center">
        <p className="font-display font-black text-7xl md:text-9xl text-lime-brand leading-none">404</p>
        <h1 className="mt-4 font-display font-bold text-3xl md:text-5xl">Out of bounds</h1>
        <p className="mt-3 text-pitch-100/80 max-w-md mx-auto">
          The page you are looking for cannot be found. Let us get you back to the action.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <LinkButton to="/" variant="lime" size="lg" iconRight={<ArrowRight />}>Back to Home</LinkButton>
          <LinkButton to="/team" variant="ghost" size="lg" className="!text-white !bg-white/10 hover:!bg-white/15">
            Meet the Squad
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
