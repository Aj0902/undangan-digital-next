"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Client, getMedia, formatDate } from "@/types/client";
import { Section } from "@/types/viding-v3";
import { MailOpen } from "lucide-react";

interface CoverDefaultProps {
  clientData: Client;
  section: Section;
  accentColor?: string;
  primaryColor?: string;
  isOpened?: boolean;
  onOpen?: () => void;
}

export default function CoverDefault({ 
  clientData, 
  section,
  accentColor = "#D4AF37", 
  primaryColor = "#fff",
  isOpened = true,
  onOpen 
}: CoverDefaultProps) {
  const { bride_name, groom_name, akad_datetime } = clientData.client_details || {};
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Read guest name from URL ?to= parameter
  const guestName = React.useMemo(() => {
    if (typeof window === "undefined" || !mounted) return "Tamu Undangan";
    try {
      const to = new URLSearchParams(window.location.search).get("to");
      return to ? decodeURIComponent(to.replace(/\+/g, " ")) : "Tamu Undangan";
    } catch (e) {
      return "Tamu Undangan";
    }
  }, [mounted]);

  // Get cover image from client_media
  const coverImg = getMedia(clientData.client_media || [], 'cover');
  const fallbackCover = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop";

  // ═══════════════════════════════════════════════════════
  // MODE 1: OPENING OVERLAY (Full-screen hero, invitation sealed)
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
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={coverImg || fallbackCover} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8"
          >
            Hallo, Kami Mengundang Anda
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-light tracking-tighter mb-2" style={{ fontFamily: "inherit" }}>
              {groom_name || "Groom"} <span className="italic text-3xl font-serif text-white/40">&</span> {bride_name || "Bride"}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] w-full mb-12"
          >
            <p className="text-[9px] uppercase tracking-widest text-white/40 mb-3 font-bold">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <h2 className="text-2xl font-medium tracking-tight mb-1">{guestName}</h2>
            <p className="text-[10px] text-white/30 italic mt-4">Kami memohon maaf apabila ada kesalahan penulisan nama/gelar</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.3em] overflow-hidden transition-all shadow-2xl"
            style={{ backgroundColor: accentColor }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <MailOpen size={18} className="relative z-10" />
            <span className="relative z-10">Buka Undangan</span>
          </motion.button>
        </div>

        {/* Footer Branding */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 text-[9px] tracking-[0.5em] uppercase font-black"
        >
          Created by Viding.co
        </motion.div>
      </motion.div>
    );
  }

  // ═══════════════════════════════════════════════════════
  // MODE 2: NORMAL COVER (Invitation opened, display header)
  // ═══════════════════════════════════════════════════════
  return (
    <div className="space-y-6 w-full text-center relative z-20">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.8, y: 0 }}
        className="text-[10px] uppercase tracking-[0.4em] font-bold shadow-black drop-shadow-md"
      >
        The Wedding Of
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-6xl md:text-7xl drop-shadow-lg"
      >
        {groom_name || "Groom"}
      </motion.h1>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "auto" }}
        className="flex items-center justify-center gap-4 py-2 overflow-hidden"
      >
        <div className="h-px w-12 bg-current opacity-40"></div>
        <span className="text-3xl italic drop-shadow-md" style={{ color: accentColor }}>
          &
        </span>
        <div className="h-px w-12 bg-current opacity-40"></div>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="text-6xl md:text-7xl drop-shadow-lg"
      >
        {bride_name || "Bride"}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 0.6 }}
        className="text-[11px] font-bold tracking-widest uppercase mt-8 drop-shadow-md"
      >
        {akad_datetime ? formatDate(akad_datetime) : "— Segera —"}
      </motion.p>
    </div>
  );
}
