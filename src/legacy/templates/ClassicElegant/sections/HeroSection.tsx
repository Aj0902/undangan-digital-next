'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

interface HeroSectionProps {
  data: Client;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { client_details: d, client_media: media } = data;
  const coverUrl = getMedia(media, 'cover');

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-cream">
      {/* Background Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: 'url(/assets/template-classic/paper-texture.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Top Decorative Label */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase font-body mb-8 text-primary"
        >
          The Wedding of
        </motion.h1>

        {/* Names Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-heading font-light text-primary leading-none">
            {d.bride_name}
          </h1>
          <div className="flex items-center justify-center -my-2 md:-my-4">
            <div className="h-px w-12 bg-gold/30 mx-4" />
            <span className="text-4xl md:text-5xl font-heading text-gold italic">&amp;</span>
            <div className="h-px w-12 bg-gold/30 mx-4" />
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-light text-primary leading-none">
            {d.groom_name}
          </h1>
        </motion.div>

        {/* Featured Cover Image with Ornaments */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          viewport={{ once: false, amount: 0.2 }}
          className="relative w-64 h-80 md:w-80 md:h-[480px] group shadow-2xl"
        >
          {/* Gold Corners (using mix-blend-multiply to remove white background) */}
          <img 
            src="/assets/template-classic/gold-corner.png" 
            alt="" 
            className="absolute -top-6 -left-6 w-20 md:w-24 z-20 mix-blend-multiply rotate-0"
          />
          <img 
            src="/assets/template-classic/gold-corner.png" 
            alt="" 
            className="absolute -bottom-6 -right-6 w-20 md:w-24 z-20 mix-blend-multiply rotate-180"
          />

          {/* Actual Image */}
          <div className="w-full h-full overflow-hidden border-[12px] border-white relative">
             {coverUrl ? (
               <img 
                src={coverUrl} 
                alt={`Wedding cover for ${d.bride_name} & ${d.groom_name}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
             ) : (
               <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-body italic p-8 text-center border">
                  Upload your cover photo in the admin dashboard
               </div>
             )}
             {/* Subtle Dark Overlay */}
             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
          </div>
        </motion.div>

        {/* Date & Location Brief */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: false, amount: 0.2 }}
          className="mt-12 space-y-2"
        >
          {d.resepsi_datetime && (
            <p className="text-sm md:text-base font-heading tracking-widest text-primary uppercase">
              {new Date(d.resepsi_datetime).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
          <p className="text-xs uppercase tracking-[0.2em] font-body text-primary opacity-60">
             {d.resepsi_venue_name || 'Jakarta, Indonesia'}
          </p>
        </motion.div>
      </div>

      {/* Down Arrow / Scroll Prompt */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold z-10"
      >
        <ChevronDown size={24} className="opacity-40" />
      </motion.div>

      {/* Side Decorative Lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block w-[1px] h-32 bg-gold/20" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block w-[1px] h-32 bg-gold/20" />
    </section>
  );
}
