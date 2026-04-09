"use client";

import React from "react";
import { motion } from "framer-motion";
import { MempelaiSection, Ornament } from "@/types/viding-v3";
import { getMotionVariants, MOTION_PRESETS } from "@/utils/motion-presets";
import OrnamentRenderer from "@/components/ornaments";

interface MempelaiSectionProps {
  section: MempelaiSection;
  isSelected?: boolean;
  onSelect?: () => void;
  onOrnamentSelect?: (ornamentId: string) => void;
  onOrnamentUpdate?: (ornamentId: string, updates: Partial<Ornament>) => void;
  selectedOrnamentId?: string;
}

export function MempelaiSectionRenderer({
  section,
  isSelected = false,
  onSelect,
  onOrnamentSelect,
  onOrnamentUpdate,
  selectedOrnamentId,
}: MempelaiSectionProps) {
  const entranceVariants = getMotionVariants(
    section.motion?.entrance || MOTION_PRESETS.fadeIn,
  );
  const elementsVariants = getMotionVariants(
    section.motion?.elements || MOTION_PRESETS.slideInUp,
  );

  return (
    <motion.section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      style={{
        backgroundColor: section.backgroundColor,
        fontFamily: section.customCSS ? undefined : "inherit",
      }}
      variants={entranceVariants}
      initial="hidden"
      animate="visible"
      onClick={onSelect}
    >
      {section.backgroundImage && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${section.backgroundImage})` }}
          variants={getMotionVariants(section.motion?.background)}
        />
      )}

      {section.backgroundOverlay?.enabled && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: section.backgroundOverlay.color,
            opacity: section.backgroundOverlay.opacity,
          }}
        />
      )}

      <motion.div
        className="relative z-10 px-6 text-center max-w-4xl"
        variants={elementsVariants}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl"
          variants={elementsVariants}
        >
          {section.content.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mempelai Pria */}
          <motion.div className="text-center" variants={elementsVariants}>
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
              {section.content.pria.photo && (
                <img
                  src={section.content.pria.photo}
                  alt={section.content.pria.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              {section.content.pria.name}
            </h3>
            <p className="text-white/80">
              Putra dari {section.content.pria.parents}
            </p>
          </motion.div>

          {/* Mempelai Wanita */}
          <motion.div className="text-center" variants={elementsVariants}>
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
              {section.content.wanita.photo && (
                <img
                  src={section.content.wanita.photo}
                  alt={section.content.wanita.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              {section.content.wanita.name}
            </h3>
            <p className="text-white/80">
              Putri dari {section.content.wanita.parents}
            </p>
          </motion.div>
        </div>

        {section.content.story && (
          <motion.div
            className="mt-12 max-w-2xl mx-auto"
            variants={elementsVariants}
          >
            <p className="text-lg text-white/90 leading-relaxed">
              {section.content.story}
            </p>
          </motion.div>
        )}
      </motion.div>

      {section.ornaments.map((ornament: Ornament) => (
        <OrnamentRenderer
          key={ornament.id}
          ornament={ornament}
          isSelected={selectedOrnamentId === ornament.id}
          onSelect={onOrnamentSelect}
          onUpdate={
            onOrnamentUpdate
              ? (updates) => onOrnamentUpdate(ornament.id, updates)
              : undefined
          }
        />
      ))}

      {section.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: section.customCSS }} />
      )}
    </motion.section>
  );
}

export default MempelaiSectionRenderer;
