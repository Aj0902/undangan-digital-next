'use client';

import { motion } from 'framer-motion';

export default function HeroCover() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center text-center select-none overflow-hidden bg-cream px-6 py-12">
      
      {/* Background Geometris Tipis & Elegan */}
      <div className="absolute inset-0 bg-batik-pattern opacity-[0.10] pointer-events-none mix-blend-multiply" />
      
      {/* Frame Dalam Artistik (Ilusi Lembaran Undangan Mewah) */}
      <div className="absolute inset-5 sm:inset-6 border-[0.5px] border-gold/40 pointer-events-none z-0 flex items-center justify-center">
        {/* Sudut Frame Tambahan */}
        <div className="absolute -top-[2px] -left-[2px] w-3 h-3 border-t-[1px] border-l-[1px] border-gold" />
        <div className="absolute -top-[2px] -right-[2px] w-3 h-3 border-t-[1px] border-r-[1px] border-gold" />
        <div className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-b-[1px] border-l-[1px] border-gold" />
        <div className="absolute -bottom-[2px] -right-[2px] w-3 h-3 border-b-[1px] border-r-[1px] border-gold" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.8, ease: [0.25, 0.8, 0.25, 1], delay: 0.2 }}
        className="z-10 flex flex-col items-center w-full relative"
      >
        <div className="w-[100px] batik-divider mb-10 opacity-70" />

        <p className="uppercase tracking-[0.25em] text-[0.65rem] sm:text-[0.7rem] mb-12 text-primary/60 font-medium">
          The Wedding Celebration Of
        </p>
        
        {/* Tipografi Editorial Style (Nama Asimetris) */}
        <div className="relative mb-2 w-full max-w-[280px]">
          <h1 className="font-heading text-[5.5rem] sm:text-8xl tracking-wider text-primary text-left leading-none font-light drop-shadow-sm">
            Romeo
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="font-heading text-5xl sm:text-6xl text-gold/70 italic font-light ml-12 mt-4 transform -rotate-6">
                &amp;
             </span>
          </div>
          <h1 className="font-heading text-[5.5rem] sm:text-8xl tracking-wider text-primary text-right leading-none font-light mt-4 drop-shadow-sm">
            Juliet
          </h1>
        </div>
        
        <p className="font-body font-light tracking-[0.4em] text-xs sm:text-sm mt-16 mb-8 text-gold uppercase">
          12 . 12 . 2026
        </p>

        <div className="w-[100px] batik-divider mt-2 mb-10 opacity-70" />

        <p className="max-w-[240px] mx-auto text-[0.8rem] sm:text-[0.85rem] text-balance text-primary/70 leading-[1.8] font-light mb-16">
          Kehadiran Anda adalah hadiah terindah dalam merayakan penyatuan cinta kami.
        </p>

        <motion.button 
          whileHover={{ scale: 1.02, backgroundColor: "rgba(197, 168, 128, 0.05)" }}
          whileTap={{ scale: 0.98 }}
          className="px-10 py-4 border-[0.5px] border-gold text-gold uppercase text-[0.65rem] tracking-[0.3em] transition-all duration-700 hover:tracking-[0.4em]"
        >
          Buka Undangan
        </motion.button>
      </motion.div>
    </section>
  );
}
