"use client";

import React from "react";
import { motion } from "framer-motion";
import { Client, getMedia } from "@/types/client";
import { Section } from "@/types/viding-v3";

interface MempelaiDefaultProps {
  clientData: Client;
  section: Section;
  accentColor?: string;
  primaryColor?: string;
}

export default function MempelaiDefault({ clientData, accentColor = "#D4AF37" }: MempelaiDefaultProps) {
  const details = clientData.client_details || {};
  const media = clientData.client_media || [];
  
  const bridePhoto = getMedia(media, 'bride_photo');
  const groomPhoto = getMedia(media, 'groom_photo');

  return (
    <div className="space-y-10 w-full text-center relative z-20 max-w-md mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-3"
      >
        <h2 className="text-4xl drop-shadow-lg" style={{ color: accentColor }}>
          Sang Mempelai
        </h2>
        <div className="h-px w-16 bg-current opacity-30 mx-auto" />
      </motion.div>

      {/* Prologue */}
      {details.prologue_text && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm leading-relaxed drop-shadow-md whitespace-pre-wrap italic opacity-80 max-w-xs mx-auto"
        >
          {details.prologue_text}
        </motion.p>
      )}

      {/* Couple Cards */}
      <div className="space-y-12">
        {/* Groom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 shadow-2xl" style={{ borderColor: accentColor + '40' }}>
            {groomPhoto ? (
              <img src={groomPhoto} alt={details.groom_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-white/5 flex items-center justify-center text-5xl opacity-20">♂</div>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-light tracking-tight">{details.groom_full_name || details.groom_name || "Mempelai Pria"}</h3>
            {details.groom_parents && (
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold">
                Putra dari {details.groom_parents}
              </p>
            )}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center"
        >
          <span className="text-4xl italic font-serif" style={{ color: accentColor }}>&</span>
        </motion.div>

        {/* Bride */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 shadow-2xl" style={{ borderColor: accentColor + '40' }}>
            {bridePhoto ? (
              <img src={bridePhoto} alt={details.bride_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-white/5 flex items-center justify-center text-5xl opacity-20">♀</div>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-light tracking-tight">{details.bride_full_name || details.bride_name || "Mempelai Wanita"}</h3>
            {details.bride_parents && (
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold">
                Putri dari {details.bride_parents}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
