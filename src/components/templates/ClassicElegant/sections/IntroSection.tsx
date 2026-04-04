'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

interface IntroSectionProps {
  data: Client;
}

export default function IntroSection({ data }: IntroSectionProps) {
  const { client_details: d } = data;

  if (!d.prologue_text) return null;

  return (
    <section className="relative py-24 px-8 flex flex-col items-center justify-center bg-cream overflow-hidden">
      {/* Decorative background ornament (subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none">
        <img src="/assets/template-classic/gold-divider.png" alt="" className="w-96 rotate-180" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        {/* Quote Icon / Ornament */}
        <div className="mb-10 flex justify-center">
          <div className="h-12 w-[1px] bg-gold/40 mb-4" />
        </div>

        <h2 className="font-heading text-2xl md:text-3xl text-primary/80 leading-relaxed italic font-light mb-8 px-4 text-balance">
          &ldquo;{d.prologue_text}&rdquo;
        </h2>

        <div className="flex justify-center items-center gap-4">
          <div className="h-[1px] w-8 bg-gold/20" />
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold/60">
            With Love
          </p>
          <div className="h-[1px] w-8 bg-gold/20" />
        </div>
      </motion.div>

      {/* Bottom decorative divider */}
      <div className="mt-20 opacity-30">
        <img src="/assets/template-classic/gold-divider.png" alt="" className="w-32" />
      </div>
    </section>
  );
}
