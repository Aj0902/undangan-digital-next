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
    <section ref={containerRef} className="relative min-h-[80vh] flex flex-col items-center justify-center py-32 px-12 md:px-24 bg-[var(--boho-bg)] border-b border-stone-100 overflow-hidden">
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
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 font-heading text-[20rem] md:text-[30rem] text-stone-200/30 select-none pointer-events-none z-0 rotate-12 ">
        {d.bride_name?.[0]}
      </div>
      <div className="absolute -left-20 top-1/4 font-accent text-[15rem] md:text-[20rem] text-[var(--boho-gold)]/10 select-none pointer-events-none z-0 -rotate-12">
        &
      </div>

      <div className="max-w-3xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
          className="space-y-6 flex flex-col items-center"
        >
          <div className="space-y-2">
            <p className="font-accent text-4xl md:text-5xl text-[var(--boho-terracotta)]">Salam Hangat & Doa Restu</p>
            <br />
            <h2 className="font-heading text-[22px] sm:text-2xl md:text-fluid-h3 text-stone-900 tracking-tight leading-none whitespace-nowrap">
              Assalamu&apos;alaikum Wr. Wb.
            </h2>
          </div>

          <div className="relative py-4">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-12 h-px bg-[var(--boho-gold)]/40" />
            <p className="font-body text-sm md:text-base text-stone-600 leading-relaxed max-w-sm mx-auto italic font-light px-4">
              Tanpa Mengurangi Rasa Hormat, Kami Mengundang Bapak/Ibu/Saudara/i
              Serta Kerabat Sekalian Untuk Menghadiri Acara Pernikahan Kami:
            </p>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-12 h-px bg-[var(--boho-gold)]/40" />
          </div>

          <div className="pt-6 flex flex-col items-center gap-2">
            <span className="font-accent text-4xl md:text-5xl text-[var(--boho-terracotta)]">Pernikahan Kami</span>
            <span className="font-heading text-[9px] tracking-[1em] uppercase text-stone-400 font-bold ml-[1em]">MMXXVI</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
