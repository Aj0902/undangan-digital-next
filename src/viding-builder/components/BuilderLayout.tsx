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
    <div className="relative h-[100dvh] w-full bg-slate-900 overflow-hidden flex justify-center font-sans text-slate-800 selection:bg-indigo-500/30">
      <CanvasViewport />
      
      <AnimatePresence>
        {mode === "edit" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <BottomSheetEditor />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Toggle Button */}
      <button 
        onClick={() => setMode(mode === "edit" ? "preview" : "edit")}
        className="absolute top-6 right-6 z-[60] bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-2xl shadow-xl hover:bg-white/20 transition-all active:scale-95"
      >
        {mode === "edit" ? <Eye size={20} /> : <Edit3 size={20} />}
      </button>

      {/* Noise Overlay */}
      <div className="noise-overlay" />
    </div>
  );
}

export default BuilderLayout;
