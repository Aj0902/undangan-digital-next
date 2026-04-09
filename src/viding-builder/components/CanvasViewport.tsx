"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Settings2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

// --- ORNAMENT FALLBACKS ---
const ORNAMENT_LIB: Record<string, (color: string) => React.ReactNode> = {
  'bunga-sudut': (color) => (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
      <path d="M50 0C60 30 80 40 100 50C80 60 60 70 50 100C40 70 20 60 0 50C20 40 40 30 50 0Z" fill={color} opacity="0.9"/>
      <circle cx="50" cy="50" r="8" fill="#fff" opacity="0.6"/>
    </svg>
  ),
  'daun-emas': (color) => (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
      <path d="M10 90C10 50 50 10 90 10C90 50 50 90 10 90Z" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M10 90L90 10" stroke={color} strokeWidth="2" opacity="0.5"/>
    </svg>
  )
};

export function CanvasViewport() {
  const { 
    activeDocument, 
    selectedSectionId, 
    selectedElementId,
    selectSection,
    selectOrnament,
    setPanelOpen,
    setPanelTab,
    setSubTab,
    saveStatus,
    setMode
  } = useBuilderStore();

  if (!activeDocument) return null;

  const sections = activeDocument.sectionOrder.map(id => activeDocument.sections[id]).filter(Boolean);
  const globalSettings = activeDocument.globalSettings;

  // --- KUMPULAN DUMMY TEKS ---
  const renderDummyContent = (type: string) => {
    switch(type) {
      case 'Cover':
        return (
          <div className="space-y-6 w-full text-center relative z-20">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              className="text-[10px] uppercase tracking-[0.4em] font-bold shadow-black drop-shadow-md"
            >
              The Wedding Of
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-7xl drop-shadow-lg"
            >
              Aditya
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              className="flex items-center justify-center gap-4 py-2 overflow-hidden"
            >
              <div className="h-px w-12 bg-current opacity-40"></div>
              <span className="text-3xl italic drop-shadow-md" style={{ color: globalSettings?.accentColor }}>&</span>
              <div className="h-px w-12 bg-current opacity-40"></div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-7xl drop-shadow-lg"
            >
              Anindita
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.6 }}
              className="text-[11px] font-bold tracking-widest uppercase mt-8 drop-shadow-md"
            >
              Minggu, 12 Desember 2026
            </motion.p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 px-8 py-3.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-2xl transition-transform border border-white/20" 
              style={{ backgroundColor: globalSettings?.accentColor, color: '#fff' }}
            >
              Buka Undangan
            </motion.button>
          </div>
        );
      case 'Mempelai':
        return (
          <div className="space-y-6 w-full text-center relative z-20 max-w-xs">
            <h2 className="text-4xl drop-shadow-lg" style={{ color: globalSettings?.accentColor }}>Sang Mempelai</h2>
            <div className="h-px w-16 bg-current opacity-30 mx-auto"></div>
            <p className="text-sm opacity-90 leading-relaxed drop-shadow-md">Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami.</p>
          </div>
        );
      case 'Galeri':
        return (
          <div className="space-y-6 w-full text-center relative z-20">
            <h2 className="text-4xl drop-shadow-lg" style={{ color: globalSettings?.accentColor }}>Momen Bahagia</h2>
            <div className="grid grid-cols-2 gap-3 mt-6 p-4">
               {[1,2,3,4].map(i => (
                 <motion.div 
                   key={i}
                   whileHover={{ scale: 1.02 }}
                   className="aspect-square bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
                 >
                   <img 
                     src={`https://picsum.photos/seed/wedding-${i}/400/400`} 
                     alt="Gallery" 
                     className="w-full h-full object-cover opacity-60"
                     referrerPolicy="no-referrer"
                   />
                 </motion.div>
               ))}
            </div>
          </div>
        );
      case 'Acara':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 w-full text-center relative z-20 bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl mx-4 max-w-sm"
          >
            <h2 className="text-4xl drop-shadow-lg" style={{ color: globalSettings?.accentColor }}>Resepsi</h2>
            <div className="h-px w-16 bg-current opacity-30 mx-auto"></div>
            <p className="text-sm font-bold opacity-100">08:00 WIB - Selesai</p>
            <p className="text-xs opacity-90 leading-relaxed">Pine Hill Cibodas, Maribaya, Bandung Barat</p>
          </motion.div>
        );
      default: return null;
    }
  };

  const getAnimationProps = (animate: string) => {
    switch(animate) {
      case 'float':
        return {
          animate: { y: [0, -15, 0] },
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        };
      case 'pulse':
        return {
          animate: { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        };
      case 'spin':
        return {
          animate: { rotate: [0, 360] },
          transition: { duration: 20, repeat: Infinity, ease: "linear" }
        };
      case 'bounce':
        return {
          animate: { y: [0, -10, 0] },
          transition: { duration: 1.5, repeat: Infinity, ease: "easeOut" }
        };
      case 'shake':
        return {
          animate: { x: [-2, 2, -2, 2, 0] },
          transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
        };
      case 'aurora':
        return {
          animate: { 
            filter: ["hue-rotate(0deg) brightness(1)", "hue-rotate(90deg) brightness(1.2)", "hue-rotate(0deg) brightness(1)"],
            scale: [1, 1.05, 1]
          },
          transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative w-full max-w-[420px] h-full shadow-2xl bg-black overflow-y-auto custom-scrollbar pb-64 scroll-smooth">
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

      {sections.map((seksi) => {
        if (!seksi.isVisible) return null;
        const isActive = selectedSectionId === seksi.id;
        
        return (
          <div 
            key={seksi.id}
            onClick={() => { 
              selectSection(seksi.id); 
              setPanelTab('section'); 
              setPanelOpen(true); 
              setMode('edit');
            }}
            className={`relative min-h-[85vh] w-full flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-500 overflow-hidden group
              ${isActive ? 'ring-4 ring-inset ring-indigo-500 shadow-[inset_0_0_80px_rgba(99,102,241,0.3)] z-20' : 'z-10 hover:ring-2 hover:ring-inset hover:ring-white/30'}`}
            style={{ fontFamily: globalSettings?.fontFamily, color: globalSettings?.primaryColor }}
          >
            {/* Indikator Active Section */}
            {isActive && (
              <div className="absolute top-4 right-4 z-50 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xl animate-in fade-in zoom-in">
                <Settings2 size={14} /> Memilih: {seksi.type}
              </div>
            )}

            {/* AURORA SKELETON (Background Shimmer Effect) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 45, 0],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-[50%] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-emerald-900 blur-3xl"
              />
            </div>

            {/* BACKGROUND LAYER */}
            {seksi.background.type === 'color' && (
              <div className="absolute inset-0 z-0 transition-colors duration-700" style={{ backgroundColor: seksi.background.value, opacity: seksi.background.opacity }} />
            )}
            {seksi.background.type === 'image' && seksi.background.fileUrl && (
              <div className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url(${seksi.background.fileUrl})`, opacity: seksi.background.opacity }} />
            )}
            {seksi.background.type === 'video' && seksi.background.fileUrl && (
              <video 
                src={seksi.background.fileUrl} autoPlay loop muted playsInline 
                className="absolute inset-0 z-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: seksi.background.opacity }}
              />
            )}

            {/* ORNAMENTS LAYER */}
            {seksi.ornaments.map(orn => {
              const animationProps = getAnimationProps(orn.animate);
              const isSelected = selectedElementId === orn.id;
              
              return (
                <motion.div 
                  key={orn.id} 
                  onClick={(e) => {
                    e.stopPropagation();
                    selectSection(seksi.id);
                    selectOrnament(orn.id);
                    setPanelTab('section');
                    setSubTab('ornamen');
                    setPanelOpen(true);
                    setMode('edit');
                  }}
                  className={`absolute z-10 cursor-move group/ornament ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-4 ring-offset-transparent rounded-lg' : ''}`} 
                  style={{ 
                    left: `${orn.x}%`, 
                    top: `${orn.y}%`, 
                    transform: `translate(-50%, -50%) scale(${orn.scale}) rotate(${orn.rotation}deg)`, 
                    width: '120px', 
                    height: '120px',
                    opacity: orn.opacity
                  }} 
                  {...animationProps as any}
                >
                  <div className={`w-full h-full transition-all ${isSelected ? 'scale-110' : 'group-hover/ornament:scale-105'}`}>
                    {orn.src ? (
                      <img src={orn.src} className="w-full h-full object-contain drop-shadow-2xl" alt="Ornament" />
                    ) : (
                      ORNAMENT_LIB[orn.type] ? ORNAMENT_LIB[orn.type](globalSettings?.accentColor || '#D4AF37') : null
                    )}
                  </div>
                  
                  {/* Selection Indicator Label */}
                  {isSelected && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[8px] font-bold px-2 py-1 rounded uppercase tracking-tighter whitespace-nowrap shadow-xl">
                      Ornament Active
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* KONTEN DUMMY LAYER */}
            {renderDummyContent(seksi.type)}
          </div>
        );
      })}
    </div>
  );
}

export default CanvasViewport;
