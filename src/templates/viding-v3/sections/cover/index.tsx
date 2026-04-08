"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CoverSection, Ornament } from "@/types/viding-v3";
import { getMotionVariants, MOTION_PRESETS } from "@/utils/motion-presets";
import OrnamentRenderer from "@/components/ornaments";

interface CoverSectionProps {
  section: CoverSection;
  isSelected?: boolean;
  onSelect?: () => void;
  onOrnamentSelect?: (ornamentId: string) => void;
  onOrnamentUpdate?: (ornamentId: string, updates: Partial<Ornament>) => void;
  selectedOrnamentId?: string;
}

export function CoverSectionRenderer({
  section,
  isSelected = false,
  onSelect,
  onOrnamentSelect,
  onOrnamentUpdate,
  selectedOrnamentId,
}: CoverSectionProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

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
      {section.background && (
        <>
          {section.background.type === "image" && (
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${section.background.url})` }}
              variants={getMotionVariants(section.motion?.background)}
            />
          )}
          {section.background.type === "video" && (
            <>
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={section.background.url}
                autoPlay
                loop
                muted
                playsInline
                onCanPlay={() => setVideoLoaded(true)}
                style={{ display: videoLoaded ? "block" : "none" }}
              />
              {!videoLoaded && section.background.effect === "aurora" && (
                <div className="absolute inset-0 aurora-loader" />
              )}
              {!videoLoaded && section.background.fallbackImage && (
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${section.background.fallbackImage})`,
                  }}
                  variants={getMotionVariants(section.motion?.background)}
                />
              )}
            </>
          )}
        </>
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
        className={`relative z-10 px-6 text-center max-w-4xl ${
          section.layout === "top"
            ? "pt-24"
            : section.layout === "bottom"
              ? "pb-24"
              : ""
        }`}
        variants={elementsVariants}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl"
          variants={elementsVariants}
        >
          {section.content.mainText}
        </motion.h1>

        {section.content.subText && (
          <motion.p
            className="text-lg md:text-2xl text-white/85 mb-8 drop-shadow-lg"
            variants={elementsVariants}
          >
            {section.content.subText}
          </motion.p>
        )}

        {section.content.ctaButton && (
          <motion.button
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/20 px-8 py-4 text-base font-semibold text-white shadow-xl backdrop-blur-md transition hover:bg-white/30"
            variants={elementsVariants}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {section.content.ctaButton.label}
          </motion.button>
        )}
      </motion.div>

      {section.ornaments.map((ornament) => (
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
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .aurora-loader {
            background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ff6b6b);
            background-size: 200% 200%;
            animation: aurora 2s linear infinite;
            filter: blur(50px);
          }
          @keyframes aurora {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          ${section.customCSS}
        `,
          }}
        />
      )}

      {!section.customCSS && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .aurora-loader {
            background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ff6b6b);
            background-size: 200% 200%;
            animation: aurora 2s linear infinite;
            filter: blur(50px);
          }
          @keyframes aurora {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `,
          }}
        />
      )}
    </motion.section>
  );
}

export default CoverSectionRenderer;
