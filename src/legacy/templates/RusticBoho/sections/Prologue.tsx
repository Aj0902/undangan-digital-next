"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Client } from "../../../../types/client";

export default function IntroSection({ data }: { data: Client }) {
  const { client_details: d } = data;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrnLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const yOrnRight = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex flex-col items-center justify-center py-32 px-12 md:px-24 border-b border-[#D4A373]/5 overflow-hidden">
      {/* Background Ornaments with Parallax - Accurate Position */}
      <motion.img 
        src="/assets/rustic-boho/images/Or-kiri.svg"
        style={{ y: yOrnLeft, rotate: -5 }}
        className="absolute -left-32 -top-24 w-80 md:w-[40rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kiri"
      />
      <motion.img 
        src="/assets/rustic-boho/images/Or-kanansvg.svg"
        style={{ y: yOrnRight, rotate: 10 }}
        className="absolute -right-32 -bottom-24 w-80 md:w-[40rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kanan"
      />

      {/* Editorial Decorative Graphic - Large Lettering */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 font-heading text-[20rem] md:text-[30rem] text-stone-200/20 select-none pointer-events-none z-0 rotate-12 ">
        {d.bride_name?.[0]}
      </div>
      <div className="absolute -left-20 top-1/4 font-accent text-[15rem] md:text-[20rem] text-[#D4A373]/5 select-none pointer-events-none z-0 -rotate-12">
        &
      </div>

      <div className="max-w-3xl w-full text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
           className="space-y-10"
        >
           <div className="space-y-3">
             <p className="font-accent text-3xl text-[#D4A373]">Salam Hangat & Doa Restu</p>
             <h2 className="font-heading text-fluid-h3 text-stone-900 tracking-tight leading-none ">
               Assalamu&apos;alaikum Wr. Wb.
             </h2>
           </div>

           <div className="relative">
             <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-px bg-[#D4A373]/20" />
             <p className="font-body text-xs md:text-sm text-stone-500 leading-relaxed max-w-lg mx-auto italic font-light">
               Tanpa Mengurangi Rasa Hormat, Kami Mengundang Bapak/Ibu/Saudara/i
               Serta Kerabat Sekalian Untuk Menghadiri Acara Pernikahan Kami:
             </p>
             <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-12 h-px bg-[#D4A373]/20" />
           </div>

           <div className="pt-16">
             <div className="flex flex-col items-center gap-1">
                <span className="font-accent text-5xl text-[#D4A373]/80">Pernikahan Suci Kami</span>
                <span className="font-heading text-[10px] tracking-[0.8em] uppercase text-stone-300 font-bold">MMXXVI</span>
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
