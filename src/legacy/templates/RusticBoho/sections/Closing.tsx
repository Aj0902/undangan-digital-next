'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Client } from '@/types/client';

export default function Closing({ data }: { data: Client }) {
  const { client_details: d } = data;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrnLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const yOrnRight = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative w-full py-40 px-8 md:px-16 overflow-hidden flex flex-col items-center justify-center">
      {/* Background Ornaments - Accurate Position */}
      <motion.img 
        src="/assets/rustic-boho/images/Or-kiri.svg"
        style={{ y: yOrnLeft, rotate: -45 }}
        className="absolute -left-32 -top-20 w-80 md:w-[45rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kiri"
      />
      <motion.img 
        src="/assets/rustic-boho/images/Or-kanansvg.svg"
        style={{ y: yOrnRight, rotate: 180 }}
        className="absolute -right-32 -bottom-20 w-80 md:w-[45rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kanan"
      />
      
      {/* Final Center Ornament */}
      <motion.img 
        src="/assets/rustic-boho/images/or-bawah-tengah.svg"
        style={{ y: yOrnLeft }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 opacity-[0.2] pointer-events-none z-10"
        alt="Ornament Tengah"
      />

      {/* Background Decor Text */}
      <div className="absolute font-accent text-[12rem] md:text-[20rem] text-[#D4A373]/5 select-none pointer-events-none z-0">
        Thank You
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
        className="max-w-3xl w-full relative z-10"
      >
        <p className="font-body text-xs md:text-sm text-stone-500 leading-relaxed italic font-light mb-12 max-w-lg mx-auto">
          &ldquo;Merupakan Suatu Kebahagiaan Bagi Kami Apabila Bapak/Ibu/Saudara/i Berkenan Hadir Dan Memberikan Doa Restu Kepada Kami. Atas Kehadiran Dan Doa Restunya, Kami Ucapkan Terima Kasih.&rdquo;
        </p>

        <p className="font-heading text-lg md:text-2xl text-stone-900 tracking-widest mb-16 uppercase opacity-80">
          Wassalamu&apos;alaikum Wr. Wb.
        </p>

        <div className="flex flex-col items-center gap-8 py-12 relative">
          <div className="h-px w-24 bg-[#D4A373]/30" />
          <h3 className="font-heading text-fluid-h1 text-stone-900 tracking-tighter whitespace-nowrap overflow-hidden">
            {d.bride_name} <span className="font-accent text-5xl md:text-7xl align-middle mx-1 md:mx-4">&</span> {d.groom_name}
          </h3>
          <div className="h-px w-24 bg-[#D4A373]/30" />
          
          {/* Center Ornament Decoration */}
          <img 
            src="/assets/rustic-boho/images/or-bawah-tengah.svg" 
            className="w-48 md:w-64 opacity-[0.2] mt-8"
            alt=""
          />
        </div>

        <div className="mt-20">
          <p className="font-heading text-[10px] uppercase tracking-[1.5em] text-stone-300 font-bold ml-[1.5em]">
            Wedding Invitation
          </p>
        </div>
      </motion.div>
    </section>
  );
}
