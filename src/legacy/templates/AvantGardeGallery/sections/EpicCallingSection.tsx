"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Client } from "@/types/client";
import { getMedia } from "@/types/client";

export default function EpicCallingSection({ data }: { data: Client }) {
  const { client_media: media } = data;
  const portraitUrl = getMedia(media, "image_1");

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-white overflow-hidden border-t border-stone-100 flex flex-col items-center">
      {/* Structural Minimalist Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="h-full w-px bg-stone-900 absolute left-1/4" />
        <div className="h-full w-px bg-stone-900 absolute left-2/4" />
        <div className="h-full w-px bg-stone-900 absolute left-3/4" />
        <div className="w-full h-px bg-stone-900 absolute top-1/4" />
        <div className="w-full h-px bg-stone-900 absolute top-3/4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center max-w-7xl w-full z-10">
        {/* Left Side: The Plaque & Typography */}
        <div className="md:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-stone-50 p-6 md:p-8 border border-stone-200 w-fit mb-12 shadow-sm"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-stone-900 tracking-tighter leading-tight mb-4 lowercase">
              <span className="text-stone-400 italic font-light">
                The Wedding
              </span>{" "}
              <br />
              Exhibition
            </h2>
            <div className="w-8 h-px bg-rose-600 mb-4" />
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-stone-500">
              Medium: Love & Time
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="pl-4 md:pl-8 border-l border-stone-200"
          >
            <p className="font-body text-sm md:text-base leading-relaxed text-stone-600 max-w-sm italic font-light">
              &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia
              menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya
              kamu cenderung dan merasa tenteram kepadanya...&rdquo;
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-900 mt-6 font-bold font-mono">
              Ar-Rum 21
            </p>
          </motion.div>
        </div>

        {/* Right Side: The Artwork */}
        <div className="md:col-span-7 flex justify-end relative">
          {/* Abstract Chaotic Background Splash */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-1/2 left-0 w-3/4 h-32 bg-rose-600 -translate-y-1/2 -rotate-6 origin-left mix-blend-multiply opacity-80 pointer-events-none z-20"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative aspect-[3/4] w-full max-w-[500px] bg-stone-100 p-2 border border-stone-200 shadow-2xl z-10"
          >
            <div className="w-full h-full overflow-hidden bg-stone-300">
              {portraitUrl ? (
                <img
                  src={portraitUrl}
                  alt="Exhibition Piece"
                  className="w-full h-full object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all duration-1000"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-stone-400">
                  Artwork Placeholder
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
