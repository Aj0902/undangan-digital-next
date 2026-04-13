"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import type { Client } from "../../../../types/client";
import { getMedia } from "../../../../types/client";
import { Heart, MailOpen, Leaf } from "lucide-react";

interface OpeningCoverProps {
  data: Client;
  isOpen: boolean;
  onOpen: () => void;
}

const FloatingLeaf = ({
  className,
  delay = 0,
  size = 48,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className={`absolute pointer-events-none opacity-10 ${className}`}
  >
    <Leaf size={size} className="text-[#D4A373]" />
  </motion.div>
);

export default function OpeningCover({
  data,
  isOpen,
  onOpen,
}: OpeningCoverProps) {
  const { client_details: d, client_media: media } = data;
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";
  const coverUrl = getMedia(media, "cover");

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          id="opening-cover"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#F7EFE1] flex flex-col items-center justify-center overflow-hidden h-screen w-full"
        >
          {/* Background Decorative Illustration */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

          <FloatingLeaf className="top-10 left-10" delay={0} size={64} />
          <FloatingLeaf className="bottom-20 right-10" delay={1} size={80} />

          <div className="relative z-10 flex flex-col items-center text-center px-8 w-full max-w-lg">
            {/* Arch Frame with Floral Ornaments */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
              className="w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-96 mb-12 rounded-t-full border border-[#D4A373]/20 p-3 relative group"
            >
              {/* Decorative Floral Ornaments - Refined */}
              <div className="absolute -top-10 -left-10 w-32 h-32 opacity-20 pointer-events-none -rotate-12 transition-transform group-hover:rotate-0 duration-[3s]">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 160C40 160 45 100 100 100C155 100 160 160 160 160C160 160 155 100 100 100C45 100 40 40 40 40C40 40 45 100 100 100C155 100 160 40 160 40C160 40 155 100 100 100C45 100 40 160 40 160Z" fill="#D4A373" />
                </svg>
              </div>

              <div className="w-full h-full rounded-t-full overflow-hidden bg-stone-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[8px] border-white relative">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt="Opening Visual"
                    className="w-full h-full object-cover sepia-[0.1] contrast-[1.05] group-hover:scale-110 transition-transform duration-[4s] ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center italic text-stone-300 font-body">
                    Rustic Portrait
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent opacity-40" />
              </div>

              {/* Heart Badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white text-[#D4A373] p-4 rounded-full shadow-2xl z-20 border border-stone-50"
              >
                <Heart size={20} fill="#D4A373" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="space-y-4"
            >
              <p className="font-accent text-3xl text-[#D4A373] mb-[-0.5rem]">Undangan Pernikahan</p>

              <h1 className="font-heading text-fluid-h1 text-stone-900 leading-[0.9] tracking-tight ">
                {d.bride_name} <span className="font-accent text-4xl align-middle mx-1">&</span> {d.groom_name}
              </h1>

              <div className="py-8 flex flex-col items-center">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4A373]/50 to-transparent mb-8" />

                <p className="text-[10px] uppercase tracking-[0.5em] text-stone-400 mb-4 font-medium italic">
                  Kepada Yth. bapak/ibu/saudara/i
                </p>

                <h2 className="font-heading text-2xl md:text-4xl text-stone-800 tracking-normal mb-8 ">
                  {guestName}
                </h2>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpen}
                  className="group relative px-12 py-5 bg-[#2C2C2C] text-white text-[10px] uppercase font-bold tracking-[0.4em] rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <MailOpen size={16} className="group-hover:rotate-12 transition-transform" /> Buka Undangan
                  </span>
                  <div className="absolute inset-0 bg-[#D4A373] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 opacity-30 text-[9px] tracking-[1.2em] uppercase font-medium text-stone-500">
            Est. MMXXVI
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
