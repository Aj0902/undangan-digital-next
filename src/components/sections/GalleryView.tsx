'use client';
import { motion } from 'framer-motion';

export default function GalleryView() {
  const images = [1, 2, 3, 4, 5, 6];

  return (
    <section className="w-full py-24 px-6 bg-cream border-t-[0.5px] border-primary/5">
      <div className="text-center mb-16">
        <span className="text-[0.6rem] tracking-[0.3em] text-gold mb-4 uppercase block font-medium">Rekam Jejak</span>
        <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-6 italic font-light drop-shadow-sm">Galeri Kasih</h2>
        <div className="w-16 mx-auto batik-divider opacity-50" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {images.map((i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: (i % 2) * 0.2, ease: "easeOut" }}
            className={`
              bg-[#eceae2] flex items-center justify-center relative group overflow-hidden border-[0.5px] border-primary/5
              ${i === 1 || i === 6 ? 'col-span-2 aspect-[2/1] sm:aspect-[2.5/1]' : 'aspect-[4/5]'}
            `}
          >
             {/* Text Placeholder for MVP (Ini nanti diganti img Next.js) */}
             <span className="font-heading text-xl text-primary/20 italic group-hover:scale-110 transition-transform duration-700">Foto {i}</span>
             
             {/* Layer Hover Emas */}
             <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500 z-10" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
