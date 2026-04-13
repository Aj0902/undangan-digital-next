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
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center py-12 px-8 overflow-hidden bg-[#FDFBF7]">
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Decorative Ornaments */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-10 pointer-events-none rotate-[-15deg]">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 0C50 0 45 20 25 20C5 20 0 0 0 0C0 0 5 20 25 20C45 20 50 40 50 40C50 40 55 20 75 20C95 20 100 0 100 0C100 0 95 20 75 20C55 20 50 0 50 0Z"
            fill="#D4A373"
          />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 w-32 h-32 opacity-10 pointer-events-none rotate-[165deg]">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 0C50 0 45 20 25 20C5 20 0 0 0 0C0 0 5 20 25 20C45 20 50 40 50 40C50 40 55 20 75 20C95 20 100 0 100 0C100 0 95 20 75 20C55 20 50 0 50 0Z"
            fill="#D4A373"
          />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] border border-[#D4A373]/10 rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-[520px] mb-12 md:mb-16 group"
        >
          <motion.div
            style={{ rotate }}
            className="absolute -inset-6 border-2 border-[#D4A373]/10 rounded-t-full pointer-events-none"
          />
          <div className="w-full h-full rounded-t-full overflow-hidden border-[12px] border-white shadow-2xl relative">
            {coverUrl ? (
              <img
                src={coverUrl}
                className="w-full h-full object-cover sepia-[0.1] group-hover:scale-110 transition-transform duration-[3s]"
                alt="Hero"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center italic text-stone-400">
                Portrait Image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.6em" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5 }}
          className="text-[10px] md:text-xs tracking-[0.6em] text-[#D4A373] mb-10 font-bold uppercase"
        >
          The Wedding Celebration Of
        </motion.p>

        <div className="mb-8 md:mb-12">
          <TextReveal
            text={d.bride_name}
            className="text-4xl sm:text-5xl md:text-7xl font-heading leading-none text-stone-900"
          />
          <div className="text-4xl md:text-5xl text-[#D4A373]/30 italic my-2 md:my-4">
            &amp;
          </div>
          <TextReveal
            text={d.groom_name}
            className="text-4xl sm:text-5xl md:text-7xl font-heading leading-none text-stone-900"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="h-px w-20 bg-[#D4A373]/30" />
          <p className="text-sm md:text-base tracking-[0.4em] uppercase font-medium text-stone-500">
            {d.resepsi_datetime
              ? new Date(d.resepsi_datetime).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
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
