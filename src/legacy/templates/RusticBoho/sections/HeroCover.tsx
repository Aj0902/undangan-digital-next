"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Client } from "../../../../types/client";
import { getMedia } from "../../../../types/client";
import { ChevronDown } from "lucide-react";

const TextReveal = ({
  text,
  className,
  accentColor = "#D4A373",
}: {
  text: string;
  className?: string;
  accentColor?: string;
}) => {
  const characters = text.split("");
  return (
    <motion.div
      className={`flex flex-wrap justify-center ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.04, delayChildren: 0.2 },
        },
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30, rotate: 10, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              y: 0,
              rotate: 0,
              filter: "blur(0px)",
              transition: { type: "spring", damping: 12, stiffness: 80 },
            },
          }}
          className="inline-block"
          style={{ color: char === "&" ? accentColor : "inherit" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function HeroSection({ data }: { data: Client }) {
  const { client_details: d, client_media: media } = data;
  const coverUrl = getMedia(media, "cover");
  const { scrollYProgress } = useScroll();
  
  const rotateOrn = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const yOrnLeft = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yOrnRight = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center py-12 px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Parallax Ornaments - Accurate Placement */}
      <motion.img 
        src="/assets/rustic-boho/images/Or-kiri.svg"
        style={{ y: yOrnLeft, rotate: -15 }}
        className="absolute -top-10 -left-20 w-80 md:w-[45rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kiri"
      />
      <motion.img 
        src="/assets/rustic-boho/images/Or-kanansvg.svg"
        style={{ y: yOrnRight, rotate: 165 }}
        className="absolute -bottom-20 -right-20 w-80 md:w-[45rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kanan"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] border border-[#D4A373]/10 rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[520px] mb-12 md:mb-16 group"
        >
          <motion.div
            style={{ rotate: rotateOrn }}
            className="absolute -inset-8 border-[3px] border-[var(--boho-gold)]/20 rounded-t-full pointer-events-none z-10"
          />
          <div className="w-full h-full rounded-t-full overflow-hidden border-[12px] border-white shadow-[0_40px_100px_-20px_rgba(140,82,48,0.15)] relative z-20">
            {coverUrl ? (
              <img
                src={coverUrl}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out"
                alt="Hero"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center italic text-stone-400">
                Portrait Image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--boho-terracotta)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
          {/* Dreamy Shadow Overlay */}
          <div className="absolute -inset-4 bg-[var(--boho-gold)]/5 blur-3xl rounded-full -z-10 opacity-30 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>

        <motion.p
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1 }}
           className="font-accent text-4xl md:text-5xl text-[var(--boho-terracotta)] mb-4 drop-shadow-sm"
        >
           Undangan Pernikahan
        </motion.p>

        <div className="mb-12 md:mb-16 text-center w-full px-4">
          <h1 className="text-fluid-h1 font-heading leading-[0.85] text-stone-900 tracking-tighter">
            {d.bride_name}
          </h1>
          <div className="font-accent text-6xl md:text-7xl text-[var(--boho-gold)]/30 my-6 md:my-4">
            &
          </div>
          <h1 className="text-fluid-h1 font-heading leading-[0.85] text-stone-900 tracking-tighter">
            {d.groom_name}
          </h1>
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ delay: 0.8, duration: 1.5 }}
           className="flex flex-col items-center gap-6 mt-4 w-full"
        >
          <div className="h-px w-16 bg-[#D4A373]/40" />
          <p className="font-body text-[11px] md:text-sm tracking-[0.6em] uppercase font-bold text-stone-400 text-center ml-[0.6em]">
            {d.resepsi_datetime
              ? new Date(d.resepsi_datetime).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                timeZone: "Asia/Jakarta",
              })
              : "MMXXVI"}
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#D4A373]/40"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
