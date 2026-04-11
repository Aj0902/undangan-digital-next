"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import VidingTemplate from '@/templates/viding-v3';

export function CanvasViewport() {
  const { 
    activeDocument, 
    clientData,
    selectedSectionId, 
    selectedElementId,
    selectSection,
    selectOrnament,
    setPanelOpen,
    setPanelTab,
    setSubTab,
    saveStatus,
    setMode,
    mode,
    isOpened,
    setOpened
  } = useBuilderStore();

  if (!activeDocument) return null;

  const handleSectionSelect = (sectionId: string) => {
    selectSection(sectionId); 
    setPanelTab('section'); 
    setPanelOpen(true); 
    setMode('edit');
  };

  const handleOrnamentSelect = (ornamentId: string) => {
    const sectionId = activeDocument.sectionOrder.find(id => {
       const sec = activeDocument.sections[id];
       return sec && sec.ornaments.some(o => o.id === ornamentId);
    });
    
    if (sectionId) {
      selectSection(sectionId);
      selectOrnament(ornamentId);
      setPanelTab('section');
      setSubTab('ornamen');
      setPanelOpen(true);
      setMode('edit');
    }
  };

  return (
    <>
      {/* Save Status Floating Indicator */}
      <AnimatePresence>
        {saveStatus !== "idle" && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
          >
            <div className={`px-4 py-2 rounded-full backdrop-blur-md border flex items-center gap-2 shadow-2xl ${
              saveStatus === "saving" ? "bg-amber-500/20 border-amber-500/50 text-amber-500" :
              saveStatus === "saved" ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-500" :
              "bg-red-500/20 border-red-500/50 text-red-500"
            }`}>
              {saveStatus === "saving" ? <Loader2 size={14} className="animate-spin" /> : 
               saveStatus === "saved" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              <span className="text-[10px] font-black uppercase tracking-widest">
                {saveStatus === "saving" ? "Syncing..." : saveStatus === "saved" ? "Cloud Synced" : "Sync Error"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <VidingTemplate 
        document={activeDocument} 
        mode="edit" 
        onSectionSelect={handleSectionSelect}
        onOrnamentSelect={handleOrnamentSelect}
        selectedSectionId={selectedSectionId}
        selectedOrnamentId={selectedElementId}
        clientData={clientData || undefined}
        isOpenedExternal={isOpened}
        onOpenExternal={() => setOpened(true)}
      />
    </>
  );
}

export default CanvasViewport;
