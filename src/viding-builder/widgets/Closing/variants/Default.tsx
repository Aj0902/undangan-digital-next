"use client";

import React from "react";
import { motion } from "framer-motion";
import { Client } from "@/types/client";
import { Section } from "@/types/viding-v3";
import { Heart } from "lucide-react";

interface ClosingDefaultProps {
  clientData: Client;
  section: Section;
  accentColor?: string;
  primaryColor?: string;
}

export default function ClosingDefault({ 
  clientData, 
  accentColor = "#D4AF37",
  primaryColor = "#fff" 
}: ClosingDefaultProps) {
  const { bride_name, groom_name } = clientData.client_details || {};

  return (
    <div className="w-full max-w-md mx-auto px-4 text-center space-y-12 relative z-20 py-20">
      {/* Decorative Icon */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart size={32} style={{ color: accentColor }} />
          </motion.div>
          {/* Floating dots */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-emerald-500/20 rounded-full blur-sm" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-500/20 rounded-full blur-sm" />
        </div>
      </motion.div>

      {/* Thank You Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-4xl font-serif italic" style={{ color: accentColor }}>
          Terima Kasih
        </h2>
        <div className="h-px w-16 bg-current opacity-20 mx-auto" />
        <p className="text-sm leading-relaxed opacity-70 italic max-w-xs mx-auto">
          "Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai."
        </p>
      </motion.div>

      {/* Final Names */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
          Kami yang berbahagia
        </p>
        <h3 className="text-3xl font-light tracking-tighter">
          {groom_name || "Groom"} <span className="text-xl italic font-serif" style={{ color: accentColor }}>&</span> {bride_name || "Bride"}
        </h3>
        <p className="text-[9px] uppercase tracking-[0.2em] opacity-30 font-bold pt-4">
          Beserta Keluarga Besar
        </p>
      </motion.div>

      {/* Viding Branded Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true }}
        className="pt-20"
      >
        <p className="text-[8px] tracking-[0.6em] uppercase font-black">
          Created by Viding.co
        </p>
      </motion.div>
    </div>
  );
}
