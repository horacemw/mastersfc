import { useEffect, useState } from 'react';
import type { GalleryImage } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { Close } from './Icons';

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activeIndex, images.length]);

  if (images.length === 0) {
    return (
      <div className="rounded-3xl bg-pitch-50 border border-pitch-900/10 py-16 text-center">
        <p className="font-semibold text-pitch-950">No gallery images yet</p>
        <p className="mt-1 text-sm text-pitch-800/60">Check back soon for photos from matches, training and community events.</p>
      </div>
    );
  }

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative mb-5 block w-full overflow-hidden rounded-2xl break-inside-avoid focus-visible:outline-none"
            aria-label={`View image: ${img.caption}`}
          >
            <ImagePlaceholder
              type="gallery"
              src={img.image}
              alt={img.caption}
              aspectRatio={img.aspectRatio ?? '4/3'}
              rounded="none"
              className="transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-pitch-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between gap-3">
                <span className="text-white text-sm font-semibold line-clamp-1">{img.caption}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-lime-brand">
                  {img.category}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[80] bg-pitch-950/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
        >
          <button
            type="button"
            className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActiveIndex(null)}
            aria-label="Close image"
          >
            <Close />
          </button>
          <div className="relative w-full max-w-5xl">
            <ImagePlaceholder
              type="gallery"
              src={active.image}
              alt={active.caption}
              aspectRatio="16/10"
              rounded="2xl"
            />
            <div className="mt-4 flex items-center justify-between text-white">
              <p className="font-semibold">{active.caption}</p>
              <span className="text-[11px] font-bold uppercase tracking-widest text-lime-brand">{active.category}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryGrid;
