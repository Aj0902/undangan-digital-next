'use client';

import FadeIn from '@/components/ui/FadeIn';

import { motion, Variants } from 'framer-motion';

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, duration: 0 }
  }
};

function KineticText({ text }: { text: string }) {
  return (
    <motion.h1 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="font-heading text-[6rem] sm:text-8xl md:text-9xl tracking-tighter text-primary leading-none font-light flex overflow-hidden"
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function HeroCover() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center text-center select-none overflow-hidden bg-transparent px-6 py-12">
      
      {/* Teks Pengantar Tipis */}
      <FadeIn className="w-full relative flex flex-col items-center justify-center h-full max-w-lg mx-auto px-6">
        
        <p className="uppercase tracking-[0.4em] text-[0.6rem] sm:text-xs text-neutral-500 font-medium mb-16">
          The Wedding Celebration Of
        </p>
        
        {/* Tipografi Editorial Style Raksasa (Kinetic) */}
        <div className="flex flex-col items-center justify-center w-full mb-16">
          <KineticText text="SITI" />
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-5xl text-neutral-400 italic font-light my-2 z-10"
          >
             &amp;
          </motion.span>
          <KineticText text="ZAED" />
        </div>
        
        {/* Garis Horizontal Tipis */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="w-full max-w-xs border-t border-neutral-300 my-12 origin-center" 
        />

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          viewport={{ once: true }}
          className="font-body tracking-[0.3em] text-xs sm:text-sm text-neutral-500 uppercase"
        >
          23 . 05 . 2026
        </motion.p>

      </FadeIn>
    </section>
  );
}
