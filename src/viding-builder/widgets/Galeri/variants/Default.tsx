"use client";

import React from "react";
import { motion } from "framer-motion";
import { Client } from "@/types/client";
import { Section } from "@/types/viding-v3";
import { ImageIcon } from "lucide-react";

interface GaleriDefaultProps {
  clientData: Client;
  section: Section;
  accentColor?: string;
}

export default function GaleriDefault({ clientData, accentColor = "#D4AF37" }: GaleriDefaultProps) {
  const media = clientData.client_media || [];
  
  // Pull all gallery images (gallery_*, bride_photo, groom_photo)
  const galleryImages = media
    .filter(m => m.media_key.startsWith("gallery") || m.media_key === 'bride_photo' || m.media_key === 'groom_photo')
    .sort((a, b) => {
      if (a.display_order !== b.display_order) return a.display_order - b.display_order;
      return a.media_key.localeCompare(b.media_key);
    })
    .map(m => ({ url: m.cloudinary_url, alt: m.alt_text || m.media_key }));

  return (
    <div className="space-y-8 w-full text-center relative z-20 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-3"
      >
        <h2 className="text-4xl drop-shadow-lg" style={{ color: accentColor }}>Momen Bahagia</h2>
        <div className="h-px w-16 bg-current opacity-30 mx-auto" />
      </motion.div>

      {/* Gallery Grid — Masonry-like asymmetric */}
      {galleryImages.length > 0 ? (
        <div className="columns-2 gap-3 space-y-3">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 shadow-lg group"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center space-y-4"
        >
          <ImageIcon size={40} className="opacity-10" />
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-20 font-bold">
            Belum ada foto yang diupload
          </p>
          <p className="text-[9px] opacity-15 max-w-xs">
            Upload foto melalui Admin Panel untuk menampilkan galeri yang indah
          </p>
        </motion.div>
      )}
    </div>
  );
}
