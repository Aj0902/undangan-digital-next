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

          <div className="relative z-10 flex flex-col items-center text-center px-8">
            {/* Arch Frame with Floral Ornaments */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 mb-8 md:mb-12 rounded-t-full border-2 border-[#D4A373]/20 p-2 md:p-3 relative"
            >
              {/* Decorative Floral Ornaments */}
              <div className="absolute -top-6 -left-6 w-20 h-20 opacity-40 pointer-events-none rotate-[-15deg]">
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
              <div className="absolute -bottom-6 -right-6 w-20 h-20 opacity-40 pointer-events-none rotate-[165deg]">
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

              <div className="w-full h-full rounded-t-full overflow-hidden bg-stone-100 shadow-2xl border-4 border-white">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt="Opening Visual"
                    className="w-full h-full object-cover sepia-[0.2] hover:scale-110 transition-transform duration-[3s]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center italic text-stone-400">
                    Rustic Portrait
                  </div>
                )}
              </div>
              {/* Micro Icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#D4A373] text-white p-3 rounded-full shadow-xl z-20"
              >
                <Heart size={18} fill="white" />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-[#D4A373] mb-6 font-bold"
            >
              The Wedding Celebration of
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-stone-900 tracking-tighter leading-none mb-4 md:mb-6 lowercase italic"
            >
              {d.bride_name}{" "}
              <span className="font-light text-[#D4A373]">&amp;</span>{" "}
              {d.groom_name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mb-8 md:mb-12"
            >
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-3 md:mb-4 italic font-medium">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight mb-3 md:mb-4 lowercase">
                {guestName}
              </h2>
              <div className="h-px w-12 md:w-16 bg-[#D4A373]/40 mx-auto" />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(212, 163, 115, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 1.5 }}
              onClick={onOpen}
              className="group relative px-14 py-6 bg-[#D4A373] text-white text-[10px] uppercase font-bold tracking-[0.5em] rounded-full shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <MailOpen size={16} /> Buka Undangan
              </span>
              <div className="absolute inset-0 bg-[#BC8A5F] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </div>

          <div className="absolute bottom-8 opacity-20 text-[8px] tracking-[1em] uppercase">
            Wedding Invitation
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
