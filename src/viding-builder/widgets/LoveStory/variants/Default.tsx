"use client";

import React from "react";
import { motion } from "framer-motion";
import { Client } from "@/types/client";
import { Section } from "@/types/viding-v3";
import { Heart } from "lucide-react";

interface LoveStoryDefaultProps {
  clientData: Client;
  section: Section;
  accentColor?: string;
}

interface StoryItem {
  year: string;
  title: string;
  description: string;
}

export default function LoveStoryDefault({ clientData, section, accentColor = "#D4AF37" }: LoveStoryDefaultProps) {
  // Love Story data stored in section.content as JSON array
  // Format: [{ year: "2020", title: "Pertama Bertemu", description: "..." }]
  const stories: StoryItem[] = (section.content as StoryItem[]) || [
    { year: "2020", title: "Pertama Bertemu", description: "Takdir mempertemukan kami di suatu tempat yang tak terduga." },
    { year: "2022", title: "Menjalin Hubungan", description: "Dari pertemanan yang tulus, berkembang menjadi cinta yang mendalam." },
    { year: "2024", title: "Lamaran", description: "Dengan keyakinan dan doa, kami memutuskan untuk melangkah bersama." },
    { year: "2026", title: "Pernikahan", description: "Menyatukan janji suci di hadapan Allah SWT untuk selamanya." },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4 space-y-8 relative z-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-3"
      >
        <h2 className="text-4xl drop-shadow-lg" style={{ color: accentColor }}>Cerita Cinta</h2>
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Perjalanan hubungan kami</p>
        <div className="h-px w-16 bg-current opacity-30 mx-auto" />
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
        
        <div className="space-y-8">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative pl-16"
            >
              {/* Dot on timeline */}
              <div 
                className="absolute left-4 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shadow-lg"
                style={{ borderColor: accentColor, backgroundColor: accentColor + '20' }}
              >
                <Heart size={10} style={{ color: accentColor }} />
              </div>

              {/* Content Card */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
                <span 
                  className="text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-lg inline-block mb-3"
                  style={{ backgroundColor: accentColor + '15', color: accentColor }}
                >
                  {story.year}
                </span>
                <h4 className="text-lg font-medium tracking-tight mb-2">{story.title}</h4>
                <p className="text-xs opacity-60 leading-relaxed">{story.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
