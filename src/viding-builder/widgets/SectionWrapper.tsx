"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section, GlobalSettings } from "@/types/viding-v3";
import { getAnimationProps, renderOrnamentFallback } from "@/viding-builder/lib/animation-utils";

interface SectionWrapperProps {
  section: Section;
  globalSettings?: GlobalSettings;
  children: React.ReactNode;
  isActive?: boolean;
  onSelect?: () => void;
  onOrnamentSelect?: (ornamentId: string) => void;
  selectedOrnamentId?: string;
  mode?: "preview" | "edit";
}

export function SectionWrapper({
  section,
  globalSettings,
  children,
  isActive = false,
  onSelect,
  onOrnamentSelect,
  selectedOrnamentId,
  mode = "preview",
}: SectionWrapperProps) {
  if (!section.isVisible) return null;

  return (
    <section
      id={section.id}
      onClick={(e) => {
        if (mode === "edit" && onSelect) {
          e.stopPropagation();
          onSelect();
        }
      }}
      className={`relative min-h-[85vh] w-full flex flex-col items-center justify-center p-6 transition-all duration-500 overflow-hidden group
        ${mode === "edit" ? "cursor-pointer" : ""}
        ${isActive && mode === "edit" ? "ring-4 ring-inset ring-indigo-500 shadow-[inset_0_0_80px_rgba(99,102,241,0.3)] z-20" : "z-10 hover:ring-2 hover:ring-inset hover:ring-white/30"}`}
      style={{
        fontFamily: globalSettings?.fontFamily,
        color: globalSettings?.primaryColor,
      }}
    >
      {/* Background Effect Level: Aurora/Noise */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         {section.background.effect === "aurora" && (
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               rotate: [0, 45, 0],
               opacity: [0.3, 0.5, 0.3]
             }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -inset-[50%] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-emerald-900 blur-3xl pointer-events-none"
           />
         )}
      </div>

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {section.background.type === "color" && (
          <div
            className="absolute inset-0 transition-colors duration-700"
            style={{
              backgroundColor: section.background.value,
              opacity: section.background.opacity,
            }}
          />
        )}
        {section.background.type === "image" && section.background.fileUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url(${section.background.fileUrl})`,
              opacity: section.background.opacity,
            }}
          />
        )}
        {section.background.type === "video" && section.background.fileUrl && (
          <video
            src={section.background.fileUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: section.background.opacity }}
          />
        )}
      </div>

      {/* ORNAMENTS LAYER */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {section.ornaments.map((orn) => {
          const animationProps = getAnimationProps(orn.animate);
          const isSelected = selectedOrnamentId === orn.id && mode === "edit";

          return (
            <motion.div
              key={orn.id}
              onClick={(e) => {
                if (mode === "edit" && onOrnamentSelect) {
                  e.stopPropagation();
                  onOrnamentSelect(orn.id);
                }
              }}
              className={`absolute group/ornament ${
                mode === "edit" ? "cursor-move pointer-events-auto" : ""
              } ${
                isSelected
                  ? "ring-2 ring-indigo-500 ring-offset-4 ring-offset-transparent rounded-lg"
                  : ""
              }`}
              style={{
                left: `${orn.x}%`,
                top: `${orn.y}%`,
                transform: `translate(-50%, -50%) scale(${orn.scale}) rotate(${orn.rotation}deg)`,
                width: "120px",
                height: "120px",
                opacity: orn.opacity,
                zIndex: orn.zIndex,
              }}
              {...(animationProps as any)}
            >
              <div
                className={`w-full h-full transition-all ${
                  isSelected ? "scale-110" : "group-hover/ornament:scale-105"
                }`}
              >
                {orn.src ? (
                  <img
                    src={orn.src}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    alt="Ornament"
                  />
                ) : (
                  renderOrnamentFallback(orn.type, globalSettings?.accentColor || "#D4AF37")
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center items-center pointer-events-auto">
        {children}
      </div>

    </section>
  );
}
