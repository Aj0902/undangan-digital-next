"use client";

import React from "react";
import { motion } from "framer-motion";
import { GaleriSection, Ornament } from "@/types/viding-v3";
import { getMotionVariants, MOTION_PRESETS } from "@/utils/motion-presets";
import OrnamentRenderer from "@/components/ornaments";

interface GaleriSectionProps {
  section: GaleriSection;
  isSelected?: boolean;
  onSelect?: () => void;
  onOrnamentSelect?: (ornamentId: string) => void;
  onOrnamentUpdate?: (ornamentId: string, updates: Partial<Ornament>) => void;
  selectedOrnamentId?: string;
}

export function GaleriSectionRenderer({
  section,
  isSelected = false,
  onSelect,
  onOrnamentSelect,
  onOrnamentUpdate,
  selectedOrnamentId,
}: GaleriSectionProps) {
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
        className="relative z-10 px-6 text-center max-w-6xl"
        variants={elementsVariants}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-12 drop-shadow-2xl"
          variants={elementsVariants}
        >
          {section.content.title}
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={elementsVariants}
        >
          {section.content.images.map((image: { url: string; caption?: string }, index: number) => (
            <motion.div
              key={index}
              className="aspect-square overflow-hidden rounded-lg shadow-lg"
              variants={elementsVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={image.url}
                alt={image.caption || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {section.content.description && (
          <motion.p
            className="mt-12 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
            variants={elementsVariants}
          >
            {section.content.description}
          </motion.p>
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

export default GaleriSectionRenderer;
