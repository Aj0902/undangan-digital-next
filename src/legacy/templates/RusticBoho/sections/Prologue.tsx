"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Client } from "../../../../types/client";

export default function IntroSection({ data }: { data: Client }) {
  const { client_details: d } = data;

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-[#FDFBF7] py-32 px-12 md:px-24 border-b border-[#D4A373]/10">
      {/* Editorial Decorative Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[20rem] text-[#D4A373]/5 select-none pointer-events-none z-0 rotate-12">
        B
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-light mb-16 italic"
        >
          Salam Hangat Dari Kami
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 2 }}
          className="relative"
        >
          <div className="mb-12 space-y-8 relative">
            <h2 className="font-heading text-2xl md:text-4xl text-stone-900 tracking-wide uppercase">
              Assalamu&apos;alaikum Wr. Wb.
            </h2>
            <p className="font-body text-sm md:text-base text-stone-600 leading-relaxed max-w-lg mx-auto italic font-light">
              Tanpa mengurangi rasa hormat. Kami mengundang Bapak/Ibu/Saudara/i
              serta kerabat sekalian untuk menghadiri acara pernikahan kami:
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 mt-20">
            <div className="w-16 h-px bg-[#D4A373]/30" />
            <span className="font-heading text-3xl text-[#D4A373] tracking-tight">
              the wedding celebration
            </span>
            <div className="w-16 h-px bg-[#D4A373]/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
