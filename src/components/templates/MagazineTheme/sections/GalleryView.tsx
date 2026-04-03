'use client';
import FadeIn from '../ui/FadeIn';

export default function GalleryView() {
  const images = [
    { id: 1, spanClass: 'col-span-2 row-span-2 aspect-square', delay: 0 },
    { id: 2, spanClass: 'col-span-1 row-span-1 aspect-square', delay: 0.1 },
    { id: 3, spanClass: 'col-span-1 row-span-1 aspect-square', delay: 0.2 },
    { id: 4, spanClass: 'col-span-2 row-span-1 aspect-[2/1]', delay: 0 },
    { id: 5, spanClass: 'col-span-1 row-span-2 aspect-[1/2]', delay: 0 },
    { id: 6, spanClass: 'col-span-1 row-span-1 aspect-square', delay: 0.1 },
    { id: 7, spanClass: 'col-span-1 row-span-1 aspect-square', delay: 0.2 },
  ];

  return (
    <section className="w-full py-24 px-6 bg-cream border-t-[0.5px] border-primary/5">
      <FadeIn className="text-center w-full mb-16 px-4">
        <span className="text-[0.65rem] tracking-[0.3em] text-neutral-500 mb-4 uppercase block font-medium">Rekam Jejak</span>
        <h2 className="font-heading text-4xl sm:text-5xl text-primary font-light">Visual Journal</h2>
      </FadeIn>

      <div className="grid grid-cols-2 gap-4">
        {images.map((img) => (
          <FadeIn 
            key={img.id}
            delay={img.delay}
            direction="up"
            className={`${img.spanClass} group bg-neutral-200 overflow-hidden relative`}
          >
             {/* Actual image goes here, currently using placeholder background */}
             <div className="absolute inset-0 bg-neutral-200 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000 ease-out" />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
