"use client";

import React from "react";
import { CanvasViewport } from "./CanvasViewport";
import { BottomSheetEditor } from "./BottomSheetEditor";
import { useBuilderStore } from "@/store/useBuilderStore";
import { Eye, Edit3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BuilderLayout() {
  const { mode, setMode } = useBuilderStore();

  return (
    <div className="relative h-[100dvh] w-full bg-black overflow-hidden flex justify-center font-sans text-white selection:bg-emerald-500/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-aurora opacity-15 z-0"></div>
      
      {/* Main Canvas Context */}
      <div className="relative z-10 w-full flex justify-center">
        <CanvasViewport />
      </div>
      
      <AnimatePresence>
        {mode === "edit" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-20"
          >
            <BottomSheetEditor />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Toggle Button */}
      <button 
        onClick={() => setMode(mode === "edit" ? "preview" : "edit")}
        className="fixed top-1/2 left-8 -translate-y-1/2 transition-all duration-500 z-[60] bg-black/40 backdrop-blur-3xl border border-white/10 text-white/70 p-4 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 active:scale-95 aurora-glow group"
      >
        {mode === "edit" ? (
          <Eye size={20} className="group-hover:scale-110 transition-transform" />
        ) : (
          <Edit3 size={20} className="group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Noise Overlay */}
      <div className="noise-overlay" />
    </div>
  );
}

export default BuilderLayout;
