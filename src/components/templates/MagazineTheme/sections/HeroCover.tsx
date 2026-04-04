'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function HeroSection({ data }: { data: Client }) {
  const { client_details: d } = data;

  const titleVariants: any = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const nameSplit = (name: string) => name.split('').map((char, i) => (
    <motion.span
      key={i}
      custom={i}
      variants={titleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="inline-block"
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  ));

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-8 py-24">
      {/* Editorial Background Element */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-stone-200" />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-stone-200" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.5em' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5 }}
          className="text-[10px] md:text-xs uppercase font-light text-stone-400 mb-20 tracking-[0.5em]"
        >
          The Wedding Celebration
        </motion.p>

        <div className="flex flex-col items-center mb-20">
          <h1 className="font-heading text-7xl md:text-9xl text-stone-900 tracking-tighter leading-none flex overflow-hidden">
            {nameSplit(d.bride_name.toUpperCase())}
          </h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="my-4"
          >
            <span className="font-heading text-4xl md:text-5xl text-stone-300 italic serif">&amp;</span>
          </motion.div>

          <h1 className="font-heading text-7xl md:text-9xl text-stone-900 tracking-tighter leading-none flex overflow-hidden">
            {nameSplit(d.groom_name.toUpperCase())}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-16 bg-stone-900 mb-8" />
          <p className="font-mono text-xs md:text-sm text-stone-500 tracking-[0.3em] uppercase">
            {d.resepsi_datetime ? new Date(d.resepsi_datetime).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }).replace(/\//g, ' . ') : 'Coming Soon'}
          </p>
        </motion.div>
      </div>

      {/* Decorative Corner Text */}
      <div className="absolute top-12 left-12 hidden md:block">
        <span className="text-[8px] uppercase tracking-[0.3em] text-stone-300 vertical-text font-light">Issue 01 // Spring 2026</span>
      </div>
    </section>
  );
}
