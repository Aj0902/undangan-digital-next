"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Client } from "../../../../types/client";

export default function IntroSection({ data }: { data: Client }) {
  const { client_details: d } = data;

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-[#FDFBF7] py-32 px-12 md:px-24 border-b border-[#D4A373]/5 overflow-hidden">
      {/* Editorial Decorative Graphic - Large Lettering */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 font-heading text-[30rem] text-stone-200/20 select-none pointer-events-none z-0 rotate-12 ">
        {d.bride_name?.[0]}
      </div>
      <div className="absolute -left-20 top-1/4 font-accent text-[20rem] text-[#D4A373]/5 select-none pointer-events-none z-0 -rotate-12">
        &
      </div>

      <div className="max-w-3xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <p className="font-accent text-4xl text-[#D4A373]">Salam Hangat & Doa Restu</p>
            <h2 className="font-heading text-fluid-h3 text-stone-900 tracking-tight leading-none ">
              Assalamu&apos;alaikum Wr. Wb.
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-px bg-[#D4A373]/20" />
            <p className="font-body text-base md:text-lg text-stone-500 leading-relaxed max-w-xl mx-auto italic font-light">
              Tanpa Mengurangi Rasa Hormat, kami mengundang Bapak/Ibu/Saudara/i
              Serta Kerabat Sekalian Untuk Menghadiri Acara Pernikahan Kami:
            </p>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-12 h-px bg-[#D4A373]/20" />
          </div>

          <div className="pt-20">
            <div className="flex flex-col items-center gap-2">
              <span className="font-accent text-5xl text-[#D4A373]/80">Pernikahan Suci Kami</span>
              <span className="font-heading text-[10px] tracking-[0.8em] uppercase text-stone-300 font-bold">MMXXVI</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
