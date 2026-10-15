import { useEffect, useMemo, useState } from 'react';
import { GalleryGrid } from '../components/GalleryGrid';
import { PageHero } from '../components/PageHero';
import { gallery } from '../data/gallery';
import type { GalleryImage } from '../types';

const categories: ('All' | GalleryImage['category'])[] = ['All', 'Matches', 'Training', 'Players', 'Community', 'Events'];

export function GalleryPage() {
  useEffect(() => {
    document.title = 'Gallery | Masters FC';
  }, []);

  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const filtered = useMemo(
    () => (active === 'All' ? gallery : gallery.filter((g) => g.category === active)),
    [active]
  );

  return (
    <>
      <PageHero
        eyebrow="In Pictures"
        title={<>Masters FC <span className="text-lime-brand">Gallery</span></>}
        description="Moments from matchdays, training, community sessions and events."
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="container-fc">
          <div className="flex items-center gap-2 flex-wrap mb-10" role="tablist">
            {categories.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    isActive ? 'bg-pitch-950 text-white' : 'bg-pitch-50 text-pitch-800 hover:bg-pitch-100'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <GalleryGrid images={filtered} />
        </div>
      </section>
    </>
  );
}

export default GalleryPage;
