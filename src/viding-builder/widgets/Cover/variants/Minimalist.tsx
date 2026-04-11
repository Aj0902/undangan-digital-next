"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Client, getMedia, formatDate } from "@/types/client";
import { Section } from "@/types/viding-v3";
import { MailOpen } from "lucide-react";

interface CoverMinimalistProps {
  clientData: Client;
  section: Section;
  accentColor?: string;
  primaryColor?: string;
  isOpened?: boolean;
  onOpen?: () => void;
}

export default function CoverMinimalist({ 
  clientData, 
  section,
  accentColor = "#D4AF37", 
  primaryColor = "#000",
  isOpened = true,
  onOpen
}: CoverMinimalistProps) {
  const { bride_name, groom_name, akad_datetime } = clientData.client_details || {};
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const guestName = React.useMemo(() => {
    if (typeof window === "undefined" || !mounted) return "Tamu Undangan";
    try {
      const to = new URLSearchParams(window.location.search).get("to");
      return to ? decodeURIComponent(to.replace(/\+/g, " ")) : "Tamu Undangan";
    } catch (e) {
      return "Tamu Undangan";
    }
  }, [mounted]);

  const coverImg = getMedia(clientData.client_media || [], 'cover');
  const fallbackCover = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop";

  // ═══════════════════════════════════════════════════════
  // MODE 1: OPENING OVERLAY (Minimalist style)
  // ═══════════════════════════════════════════════════════
  if (!isOpened) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -80, filter: "blur(20px)" }}
        transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="relative w-full min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img src={coverImg || fallbackCover} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg space-y-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className="text-[12px] uppercase tracking-[0.5em] font-medium">
            WE ARE GETTING MARRIED
          </motion.p>
          
          <div className="flex flex-col gap-1">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-7xl font-light tracking-tight">
              {groom_name || "Groom"}
            </motion.h1>
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xl italic font-serif" style={{ color: accentColor }}>and</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-7xl font-light tracking-tight">
              {bride_name || "Bride"}
            </motion.h1>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-full">
            <p className="text-[9px] uppercase tracking-widest text-white/40 mb-2 font-bold">Kepada Yth.</p>
            <h2 className="text-xl font-medium tracking-tight">{guestName}</h2>
          </motion.div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onOpen}
            className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.3em] overflow-hidden transition-all shadow-2xl border border-white/20"
            style={{ backgroundColor: accentColor }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <MailOpen size={18} className="relative z-10" />
            <span className="relative z-10">Buka Undangan</span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // ═══════════════════════════════════════════════════════
  // MODE 2: NORMAL COVER (Minimalist style)
  // ═══════════════════════════════════════════════════════
  return (
    <div className="space-y-8 w-full text-center relative z-20" style={{ color: primaryColor }}>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className="text-[12px] uppercase tracking-[0.5em] font-medium">
        WE ARE GETTING MARRIED
      </motion.p>
      
      <div className="flex flex-col gap-2 py-4">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-7xl font-light tracking-tight">
          {groom_name || "Groom"}
        </motion.h1>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="my-2">
          <span className="text-xl italic font-serif" style={{ color: accentColor }}>and</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-7xl font-light tracking-tight">
          {bride_name || "Bride"}
        </motion.h1>
      </div>

      <motion.div initial={{ width: 0 }} animate={{ width: "80px" }} transition={{ delay: 0.5, duration: 1 }} className="h-[1px] bg-current opacity-20 mx-auto" />
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.6 }} className="text-[10px] font-bold tracking-[0.3em] uppercase pt-4">
        {akad_datetime ? formatDate(akad_datetime) : "— Segera —"}
      </motion.p>
    </div>
  );
}
