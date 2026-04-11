"use client";

import React, { useRef, useState } from 'react';
import { 
  Settings2, Palette, Layers, Image as ImageIcon, 
  Plus, Trash2, ChevronDown, ChevronRight, Check, MousePointerClick, 
  Upload, Eye, EyeOff, GripVertical, Video,
  Save, Loader2, CheckCircle2, AlertCircle, Sparkles,
  Library
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useBuilderStore, ANIMATION_PRESETS } from '@/store/useBuilderStore';
import { Section } from '@/types/viding-v3';
import { LIBRARY_BACKGROUNDS, LIBRARY_ORNAMENTS, LIBRARY_SECTIONS } from '../lib/dummy-library';
import { domToBlob } from 'modern-screenshot';
import { uploadPresetThumbnailAction } from '@/app/admin/preset-actions';
import { WIDGET_REGISTRY } from '../widgets/registry';

export function BottomSheetEditor() {
  const [showSectionLibrary, setShowSectionLibrary] = useState(false);
  const { 
    activeDocument, 
    isPanelOpen, 
    setPanelOpen,
    panelTab,
    setPanelTab,
    subTab,
    setSubTab,
    selectedSectionId,
    selectSection,
    addSection,
    updateSection,
    deleteSection,
    reorderSectionsArray,
    toggleSectionVisibility,
    updateSectionBackground,
    addOrnament,
    updateOrnament,
    deleteOrnament,
    duplicateOrnament,
    updateGlobalSettings,
    saveDocument,
    saveStatus,
    isDirty,
    contextMode
  } = useBuilderStore();

  const [presetSaveModal, setPresetSaveModal] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [presetCategory, setPresetCategory] = useState("Modern");

  const bgInputRef = useRef<HTMLInputElement>(null);
  const ornamentInputRef = useRef<HTMLInputElement>(null);

  if (!activeDocument) return null;

  const sections = activeDocument.sectionOrder.map(id => activeDocument.sections[id]).filter(Boolean) as Section[];
  const activeSection = selectedSectionId ? activeDocument.sections[selectedSectionId] : null;
  const globalSettings = activeDocument.globalSettings;

  const handleReorder = (newSections: Section[]) => {
    reorderSectionsArray(newSections.map(s => s.id));
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedSectionId) {
      const url = URL.createObjectURL(file);
      const isVideo = file.type.startsWith('video/');
      updateSectionBackground(selectedSectionId, { 
        type: isVideo ? 'video' : 'image',
        fileUrl: url 
      });
    }
  };

  const handleOrnamentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedSectionId) {
      const url = URL.createObjectURL(file);
      addOrnament(selectedSectionId, {
        id: `orn-${Date.now()}`,
        type: 'custom',
        src: url,
        x: 50,
        y: 50,
        scale: 1,
        rotation: 0,
        opacity: 1,
        zIndex: 0,
        animate: 'none'
      });
      setSubTab('ornamen');
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isPanelOpen && (
          <div className="absolute bottom-6 flex gap-3 z-50 pointer-events-auto">
            <motion.button 
              initial={{ y: 100, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 100, opacity: 0 }}
              onClick={() => setPanelOpen(true)}
              className="bg-emerald-500 text-black px-6 py-3.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2 font-bold text-xs hover:bg-emerald-400 uppercase tracking-widest transition-all aurora-glow"
            >
              <Settings2 size={16} /> Buka Alat Editor
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPanelOpen && (
          <motion.div 
            initial={{ y: "100%", x: 0 }} 
            animate={{ y: 0, x: 0 }} 
            exit={{ y: "100%", x: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 w-full md:top-0 md:bottom-auto md:right-0 md:max-w-[400px] bg-black/60 backdrop-blur-3xl rounded-t-3xl md:rounded-t-none md:rounded-l-[2.5rem] shadow-[-20px_0_60px_rgba(0,0,0,0.8)] border-t md:border-t-0 md:border-l border-white/10 flex flex-col z-50 h-[65dvh] md:h-full pointer-events-auto"
          >
            {/* Desktop Toggle Button */}
            <button 
              onClick={() => setPanelOpen(false)}
              className="absolute -left-5 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-20 bg-black/60 backdrop-blur-3xl border border-white/10 border-r-0 rounded-l-2xl text-emerald-400/50 hover:text-emerald-400 group transition-all"
            >
              <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* PANEL HEADER TABS */}
            <div className="flex-none pt-3 pb-0 px-4 flex flex-col items-center bg-white/[0.03] rounded-t-3xl md:rounded-t-none md:rounded-tl-[2.5rem] border-b border-white/5 relative">
              <div onClick={() => setPanelOpen(false)} className="w-12 h-1.5 bg-white/20 hover:bg-emerald-500/50 rounded-full mb-4 cursor-pointer transition-colors md:hidden"></div>
              
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <button
                  onClick={() => {
                    if (contextMode === 'preset') {
                      setPresetSaveModal(true);
                    } else {
                      saveDocument();
                    }
                  }}
                  disabled={!isDirty || saveStatus === "saving"}
                  className={`px-3 py-2 rounded-xl flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest transition-all border ${
                    !isDirty 
                      ? 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed' 
                      : saveStatus === "saving"
                        ? 'bg-amber-500/20 text-amber-500 border-amber-500/30 aurora-glow'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30 aurora-glow'
                  }`}
                >
                  {saveStatus === "saving" ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : saveStatus === "saved" ? (
                    <CheckCircle2 size={12} />
                  ) : saveStatus === "error" ? (
                    <AlertCircle size={12} />
                  ) : (
                    <Save size={12} />
                  )}
                  {saveStatus === "saving" ? "Menyimpan" : saveStatus === "saved" ? "Tersimpan" : contextMode === 'preset' ? "Publish Preset" : "Simpan"}
                </button>
              </div>

              <button onClick={() => setPanelOpen(false)} className="absolute right-4 top-4 p-2 bg-white/[0.03] border border-white/5 rounded-xl text-white/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all md:hidden">
                <ChevronDown size={18} />
              </button>

              <div className="flex w-full bg-white/[0.02] p-1.5 rounded-2xl mb-3 gap-1 border border-white/5">
                <button onClick={() => setPanelTab('widget')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${panelTab === 'widget' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 aurora-glow' : 'text-white/40 hover:text-emerald-400 hover:bg-white/5'}`}>
                  <Layers size={16} /> Susunan Seksi
                </button>
                <button onClick={() => setPanelTab('section')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${panelTab === 'section' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 aurora-glow' : 'text-white/40 hover:text-emerald-400 hover:bg-white/5'}`}>
                  <ImageIcon size={16} /> Visual Blok
                </button>
                <button onClick={() => setPanelTab('global')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${panelTab === 'global' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 aurora-glow' : 'text-white/40 hover:text-emerald-400 hover:bg-white/5'}`}>
                  <Palette size={16} /> Tema Global
                </button>
              </div>

              {/* Sub-Tabs */}
              {panelTab === 'section' && (
                <div className="flex w-full gap-6 mt-1 pb-3 px-4">
                  <button onClick={() => setSubTab('bg')} className={`flex-1 pb-2 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${subTab === 'bg' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-white/30 hover:text-emerald-400'}`}>Latar Belakang</button>
                  <button onClick={() => setSubTab('ornamen')} className={`flex-1 pb-2 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${subTab === 'ornamen' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-white/30 hover:text-emerald-400'}`}>Ornamen Presisi</button>
                </div>
              )}
            </div>

            {/* PANEL CONTENT */}
            <div className="flex-1 overflow-y-auto p-5 pb-12 custom-scrollbar">
              
              {/* TAB 1: WIDGET */}
              {panelTab === 'widget' && (
                <div className="animate-in fade-in slide-in-from-left-4 space-y-4">
                  <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl flex gap-4 items-start relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 blur-[20px] transition-colors group-hover:bg-emerald-500/10"></div>
                    <MousePointerClick className="text-emerald-400 shrink-0 mt-0.5 relative z-10" size={16} />
                    <p className="text-[10px] text-emerald-400/80 leading-relaxed font-bold tracking-wider uppercase relative z-10">Tahan dan geser ikon titik untuk mengubah urutan. Klik ikon mata untuk menyembunyikan seksi dari undangan.</p>
                  </div>
                  
                  <Reorder.Group axis="y" values={sections} onReorder={handleReorder} className="space-y-3">
                    {sections.map((sec) => (
                      <Reorder.Item 
                        key={sec.id} 
                        value={sec} 
                        className={`flex items-center gap-3 p-4 bg-white/[0.02] rounded-2xl border transition-opacity ${!sec.isVisible ? 'opacity-40 border-white/5' : 'border-white/10 hover:border-emerald-500/30'}`}
                      >
                        <GripVertical className="text-white/20 cursor-grab active:cursor-grabbing hover:text-emerald-400 transition-colors" size={20} />
                        <div className="flex-1 cursor-pointer" onClick={() => { selectSection(sec.id); setPanelTab('section'); }}>
                          <span className="block text-xs font-bold text-white uppercase tracking-wider">{sec.type} Section</span>
                          <span className="text-[9px] text-emerald-400/60 uppercase tracking-widest">{sec.isVisible ? 'Terlihat' : 'Disembunyikan'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => toggleSectionVisibility(sec.id)} 
                            className={`p-2.5 rounded-xl transition-all border ${sec.isVisible ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 aurora-glow' : 'bg-white/5 text-white/30 border-white/5 hover:text-white/80'}`}
                            title={sec.isVisible ? 'Sembunyikan' : 'Tampilkan'}
                          >
                            {sec.isVisible ? <Eye size={16}/> : <EyeOff size={16}/>}
                          </button>
                          <button 
                            onClick={() => deleteSection(sec.id)} 
                            className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-all aurora-glow"
                            title="Hapus Seksi"
                          >
                            <Trash2 size={16}/>
                          </button>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>

                  {!showSectionLibrary ? (
                    <button 
                      onClick={() => setShowSectionLibrary(true)} 
                      className="w-full bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 p-4 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.1)] font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all mt-4 aurora-glow"
                    >
                      <Library size={16} /> Pustaka Seksi
                    </button>
                  ) : (
                    <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                          <Library size={14} className="text-emerald-400" /> Pilih Template Seksi
                        </h3>
                        <button onClick={() => setShowSectionLibrary(false)} className="text-[10px] font-bold text-white/40 hover:text-emerald-400 uppercase tracking-wider transition-colors">Tutup</button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {LIBRARY_SECTIONS.map((libSec) => (
                          <div 
                            key={libSec.id} 
                            onClick={() => {
                              const newId = `seksi-${crypto.randomUUID().split('-')[0]}`;
                              addSection({
                                id: newId,
                                type: libSec.type as any,
                                variant: libSec.variant,
                                isVisible: true,
                                background: { type: 'color', value: libSec.bg, opacity: 1, effect: 'none' },
                                backgroundOverlay: { enabled: false, color: '#000000', opacity: 0.3 },
                                layout: 'center',
                                ornaments: []
                              });
                              setShowSectionLibrary(false);
                            }}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group aurora-glow"
                          >
                            <div className="w-full h-20 rounded-lg mb-3 border border-white/5 shadow-inner flex items-center justify-center opacity-80 group-hover:opacity-100" style={{ backgroundColor: libSec.bg }}>
                              <span className="text-[10px] font-bold text-black/50 uppercase tracking-widest transition-colors">{libSec.type}</span>
                            </div>
                            <p className="text-[10px] font-bold text-white group-hover:text-emerald-400 transition-colors text-center">{libSec.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SECTION */}
              {panelTab === 'section' && activeSection && (
                <div className="animate-in fade-in zoom-in-95 space-y-6">
                  <div className="text-center space-y-3">
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] aurora-glow">
                      Mengedit Latar: {activeSection.type}
                    </span>

                    {/* Variasi Desain Selection */}
                    {WIDGET_REGISTRY[activeSection.type] && Object.keys(WIDGET_REGISTRY[activeSection.type]).length > 1 && (
                      <div className="pt-2 px-2">
                        <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-3 font-bold">Ganti Variasi Desain</p>
                        <div className="flex gap-2 justify-center flex-wrap">
                          {Object.keys(WIDGET_REGISTRY[activeSection.type]).map((variantKey) => (
                            <button
                              key={variantKey}
                              onClick={() => updateSection(activeSection.id, { variant: variantKey })}
                              className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all border ${
                                activeSection.variant === variantKey
                                  ? 'bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)] aurora-glow'
                                  : 'bg-white/5 border-white/10 text-white/40 hover:border-emerald-500/30 hover:text-emerald-400'
                              }`}
                            >
                              {variantKey}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {subTab === 'bg' && (
                    <div className="bg-white/[0.02] p-5 rounded-3xl border border-white/5 space-y-6">
                      <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5">
                        <button onClick={() => updateSectionBackground(activeSection.id, { type: 'color' })} className={`flex-1 py-2.5 text-[10px] font-bold rounded-xl transition-all uppercase tracking-wider ${activeSection.background.type === 'color' ? 'bg-emerald-500/20 shadow-sm text-emerald-400 border border-emerald-500/30' : 'text-white/40 hover:text-white/80'}`}>Warna</button>
                        <button onClick={() => updateSectionBackground(activeSection.id, { type: 'image' })} className={`flex-1 py-2.5 text-[10px] font-bold rounded-xl transition-all uppercase tracking-wider ${activeSection.background.type === 'image' ? 'bg-emerald-500/20 shadow-sm text-emerald-400 border border-emerald-500/30' : 'text-white/40 hover:text-white/80'}`}>Gambar</button>
                        <button onClick={() => updateSectionBackground(activeSection.id, { type: 'video' })} className={`flex-1 py-2.5 text-[10px] font-bold rounded-xl transition-all uppercase tracking-wider ${activeSection.background.type === 'video' ? 'bg-emerald-500/20 shadow-sm text-emerald-400 border border-emerald-500/30' : 'text-white/40 hover:text-white/80'}`}>Video</button>
                      </div>

                      {activeSection.background.type === 'color' ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/10 group focus-within:border-emerald-500/30 transition-all">
                            <span className="text-xs font-bold text-white/70 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Warna Kustom</span>
                            <div className="relative">
                              <input 
                                type="color" 
                                value={activeSection.background.value} 
                                onChange={(e) => updateSectionBackground(activeSection.id, { value: e.target.value })} 
                                className="w-12 h-12 rounded-xl border-2 border-white/10 cursor-pointer bg-transparent hover:border-emerald-500/50 transition-all" 
                              />
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-[0.2em] mb-4">Pustaka Warna</h4>
                            <div className="grid grid-cols-4 gap-3">
                              {LIBRARY_BACKGROUNDS.filter(bg => bg.type === 'color').map(bg => (
                                <div 
                                  key={bg.id}
                                  onClick={() => updateSectionBackground(activeSection.id, { value: bg.value })}
                                  className="aspect-square rounded-xl border-2 cursor-pointer transition-all hover:scale-105 shadow-inner"
                                  style={{ 
                                    backgroundColor: bg.value,
                                    borderColor: activeSection.background.value === bg.value ? '#10b981' : '#ffffff1a'
                                  }}
                                  title={bg.label}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <input type="file" ref={bgInputRef} hidden accept="image/*,video/mp4,video/quicktime" onChange={handleBgUpload} />
                          {!activeSection.background.fileUrl ? (
                            <button onClick={() => bgInputRef.current?.click()} className="w-full h-24 border-2 border-dashed border-emerald-500/30 rounded-2xl flex flex-col items-center justify-center gap-2 text-emerald-400/70 hover:text-emerald-400 hover:bg-emerald-500/10 bg-white/[0.02] transition-all aurora-glow">
                              {activeSection.background.type === 'video' ? <Video size={24} /> : <ImageIcon size={24} />}
                              <div className="text-center">
                                <span className="block text-[10px] font-bold uppercase tracking-widest">Unggah {activeSection.background.type}</span>
                              </div>
                            </button>
                          ) : (
                            <div className="relative rounded-2xl overflow-hidden border border-slate-200 group h-36 bg-slate-800">
                              {activeSection.background.type === 'video' ? (
                                <video src={activeSection.background.fileUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
                              ) : (
                                <img src={activeSection.background.fileUrl} className="w-full h-full object-cover opacity-80" alt="BG" />
                              )}
                              <button onClick={() => bgInputRef.current?.click()} className="absolute inset-0 bg-black/60 text-white flex flex-col items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <Upload size={20}/> Ganti Berkas
                              </button>
                            </div>
                          )}
                          
                          {activeSection.background.type === 'image' && (
                            <div>
                              <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Pustaka Gambar</h4>
                              <div className="grid grid-cols-2 gap-3">
                                {LIBRARY_BACKGROUNDS.filter(bg => bg.type === 'image').map(bg => (
                                  <div 
                                    key={bg.id}
                                    onClick={() => updateSectionBackground(activeSection.id, { fileUrl: bg.fileUrl })}
                                    className={`h-20 rounded-xl border-2 cursor-pointer transition-all hover:opacity-100 opacity-80 bg-cover bg-center ${activeSection.background.fileUrl === bg.fileUrl ? 'border-emerald-500 opacity-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-white/5 hover:border-white/20'}`}
                                    style={{ backgroundImage: `url(${bg.fileUrl})` }}
                                    title={bg.label}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 space-y-4 shadow-inner">
                            <div className="flex justify-between items-center text-[10px] font-bold text-emerald-400/60 uppercase tracking-[0.2em]">
                              <span>Tingkat Keterangan</span>
                              <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-500/20 font-mono text-[11px] aurora-glow">{Math.round(activeSection.background.opacity * 100)}%</span>
                            </div>
                            <input type="range" min="0" max="1" step="0.1" value={activeSection.background.opacity} onChange={(e) => updateSectionBackground(activeSection.id, { opacity: parseFloat(e.target.value) })} className="w-full accent-emerald-500 cursor-pointer" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {subTab === 'ornamen' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <Library size={14} className="text-emerald-400/60" /> Pustaka Ornamen
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {LIBRARY_ORNAMENTS.map(orn => (
                            <div 
                              key={orn.id}
                              onClick={() => {
                                const newId = `orn-${crypto.randomUUID().split('-')[0]}`;
                                addOrnament(activeSection.id, {
                                  id: newId,
                                  type: orn.type as any,
                                  src: orn.src,
                                  x: 50,
                                  y: 50,
                                  scale: 1,
                                  rotation: 0,
                                  opacity: 1,
                                  zIndex: 0,
                                  animate: 'none'
                                });
                              }}
                              className="aspect-square bg-white/5 border border-white/5 rounded-2xl p-2 cursor-pointer hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all flex flex-col items-center justify-center gap-2 group aurora-glow"
                            >
                              <img src={orn.src} className="w-10 h-10 object-contain group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all" alt={orn.label} />
                              <span className="text-[8px] font-bold text-white/50 group-hover:text-emerald-400 text-center leading-tight transition-colors">{orn.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-transparent px-2 text-[10px] text-white/30 uppercase tracking-widest font-bold">Atau</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <input type="file" ref={ornamentInputRef} hidden accept="image/png, image/svg+xml" onChange={handleOrnamentUpload} />
                        <button onClick={() => ornamentInputRef.current?.click()} className="w-full bg-white/5 hover:bg-emerald-500/10 text-white/50 hover:text-emerald-400 p-3 rounded-2xl border border-white/5 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all aurora-glow">
                          <Upload size={14} /> Unggah Ornamen Sendiri
                        </button>

                        {activeSection.ornaments.length === 0 && (
                          <div className="py-12 text-center bg-white/[0.02] border-2 border-dashed border-white/10 rounded-3xl">
                            <Sparkles size={32} className="mx-auto text-white/10 mb-3" />
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Belum ada ornamen di seksi ini</p>
                            <p className="text-[9px] text-white/20 mt-1">Pilih dari pustaka atau unggah</p>
                          </div>
                        )}

                      {activeSection.ornaments.map((orn, i) => (
                        <div key={orn.id} className="bg-white/[0.02] p-5 rounded-3xl border border-white/5 space-y-5">
                          <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div className="flex items-center gap-4">
                              {orn.src ? <img src={orn.src} className="w-12 h-12 object-contain bg-white/5 rounded-xl p-1" alt="Ornament" /> : <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 flex items-center justify-center rounded-xl font-bold text-xs aurora-glow">SVG</div>}
                              <span className="text-[11px] font-bold uppercase text-emerald-400 tracking-widest">Layer #{i + 1}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => duplicateOrnament(activeSection.id, orn.id)} 
                                className="p-2.5 text-emerald-400 bg-emerald-500/10 rounded-xl hover:bg-emerald-500/20 transition-all aurora-glow"
                                title="Duplikat"
                              >
                                <Layers size={16}/>
                              </button>
                              <button 
                                onClick={() => deleteOrnament(activeSection.id, orn.id)} 
                                className="p-2.5 text-red-500 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-all aurora-glow"
                                title="Hapus"
                              >
                                <Trash2 size={16}/>
                              </button>
                            </div>
                          </div>

                          <div className="space-y-6 bg-white/[0.03] p-6 rounded-3xl border border-white/10 shadow-inner">
                            <div className="space-y-3">
                              <div className="flex justify-between text-[10px] font-bold text-emerald-400/60 uppercase tracking-[0.2em]"><span>Posisi X (Horizontal)</span> <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20 font-mono">{orn.x}%</span></div>
                              <input type="range" min="-30" max="130" value={orn.x} onChange={(e) => updateOrnament(activeSection.id, orn.id, { x: parseInt(e.target.value) })} className="w-full accent-emerald-500 cursor-pointer" />
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between text-[10px] font-bold text-emerald-400/60 uppercase tracking-[0.2em]"><span>Posisi Y (Vertikal)</span> <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20 font-mono">{orn.y}%</span></div>
                              <input type="range" min="-30" max="130" value={orn.y} onChange={(e) => updateOrnament(activeSection.id, orn.id, { y: parseInt(e.target.value) })} className="w-full accent-emerald-500 cursor-pointer" />
                            </div>
                            <div className="space-y-3 pt-6 border-t border-white/5">
                              <div className="flex justify-between text-[10px] font-bold text-emerald-400/60 uppercase tracking-[0.2em]"><span>Skala / Ukuran</span> <span className="text-emerald-400 font-mono">{orn.scale}x</span></div>
                              <input type="range" min="0.5" max="3" step="0.1" value={orn.scale} onChange={(e) => updateOrnament(activeSection.id, orn.id, { scale: parseFloat(e.target.value) })} className="w-full accent-emerald-500 cursor-pointer" />
                            </div>
                            <div className="space-y-3 pt-4 border-t border-white/5">
                              <div className="flex items-center gap-2 text-[10px] font-bold text-white/50 uppercase tracking-widest">
                                <Sparkles size={14} className="text-emerald-400" />
                                <span>Efek Animasi Dinamis</span>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                {ANIMATION_PRESETS.map(preset => (
                                  <button
                                    key={preset.id}
                                    onClick={() => updateOrnament(activeSection.id, orn.id, { animate: preset.id })}
                                    className={`px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                                      orn.animate === preset.id
                                        ? 'bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)] aurora-glow'
                                        : 'bg-transparent border-white/10 text-white/30 hover:border-emerald-500/50 hover:text-emerald-400'
                                    }`}
                                  >
                                    {preset.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: GLOBAL */}
              {panelTab === 'global' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 space-y-6">
                    <label className="text-[10px] font-bold text-emerald-400/50 uppercase tracking-[0.2em]">Tema Warna Global</label>
                    <div className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/10 group focus-within:border-emerald-500/30 transition-all">
                      <span className="block text-[11px] font-bold text-white/70 uppercase tracking-widest group-hover:text-emerald-400">Warna Utama (Teks)</span>
                      <input type="color" value={globalSettings?.primaryColor} onChange={e => updateGlobalSettings({ primaryColor: e.target.value })} className="w-10 h-10 rounded-xl border-2 border-white/10 cursor-pointer bg-transparent hover:border-emerald-500/50 transition-all" />
                    </div>
                    <div className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/10 group focus-within:border-emerald-500/30 transition-all">
                      <span className="block text-[11px] font-bold text-white/70 uppercase tracking-widest group-hover:text-emerald-400">Aksen (Tombol & Ornamen)</span>
                      <input type="color" value={globalSettings?.accentColor} onChange={e => updateGlobalSettings({ accentColor: e.target.value })} className="w-10 h-10 rounded-xl border-2 border-white/10 cursor-pointer bg-transparent hover:border-emerald-500/50 transition-all" />
                    </div>
                  </div>

                  <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 space-y-5">
                    <label className="text-[10px] font-bold text-emerald-400/50 uppercase tracking-[0.2em]">Jenis Font Utama</label>
                    {[
                      { id: "'Cormorant Garamond', serif", name: 'Elegant Serif' },
                      { id: "'Great Vibes', cursive", name: 'Romantic Cursive' },
                      { id: "'Montserrat', sans-serif", name: 'Modern Sans' },
                    ].map(f => (
                      <button 
                        key={f.id} 
                        onClick={() => updateGlobalSettings({ fontFamily: f.id })} 
                        className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                          globalSettings?.fontFamily === f.id 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                            : 'bg-white/[0.03] border-white/5 text-white/40 hover:bg-white/5 hover:text-white/80'
                        }`}
                      >
                        <span style={{ fontFamily: f.id }} className="text-base tracking-wide">{f.name}</span>
                        {globalSettings?.fontFamily === f.id && <Check size={18} className="aurora-glow" />}
                      </button>
                    ))}
                  </div>
                  
                  <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 space-y-4">
                    <label className="text-[10px] font-bold text-emerald-400/50 uppercase tracking-[0.2em] flex items-center gap-2">
                       <Video size={14} className="text-emerald-400" />
                       Musik Latar Undangan
                    </label>
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Paste URL Musik (mp3)"
                        value={globalSettings?.audioUrl || ""}
                        onChange={e => updateGlobalSettings({ audioUrl: e.target.value })}
                        className="w-full p-4 bg-white/[0.03] border border-white/10 rounded-2xl text-xs font-medium text-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all placeholder:text-white/10 outline-none"
                      />
                      <p className="text-[8px] text-white/20 italic px-2 leading-relaxed">Gunakan link langsung file .mp3 atau .m4a. Autoplay hanya aktif setelah user klik 'Buka Undangan'.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* PRESET SAVE MODAL */}
      <AnimatePresence>
        {presetSaveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md pointer-events-auto">
            <motion.div 
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="w-full max-w-sm bg-[#111] rounded-[2rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(16,185,129,0.15)] p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-aurora opacity-10 pointer-events-none"></div>

              <h3 className="text-base font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
                <Sparkles className="text-emerald-400" size={20} /> Simpan ke Pabrik
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-400/50 uppercase tracking-[0.2em] mb-1 block">Nama Preset</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Rustic Elegance v1"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    className="w-full p-4 bg-white/[0.03] border border-white/10 rounded-2xl text-sm font-medium text-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all placeholder:text-white/10 outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-400/50 uppercase tracking-[0.2em] mb-1 block">Kategori</label>
                  <select 
                    value={presetCategory}
                    onChange={(e) => setPresetCategory(e.target.value)}
                    className="w-full p-4 bg-white/[0.03] border border-white/10 rounded-2xl text-sm font-bold uppercase tracking-widest text-emerald-400 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all appearance-none outline-none"
                  >
                    <option value="Modern" className="bg-black">Modern</option>
                    <option value="Rustic" className="bg-black">Rustic</option>
                    <option value="Classic" className="bg-black">Classic</option>
                    <option value="Islamic" className="bg-black">Islamic</option>
                  </select>
                </div>
                
                <div className="pt-6 flex gap-3">
                  <button 
                    onClick={() => setPresetSaveModal(false)}
                    className="flex-1 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/5 hover:text-white rounded-2xl transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={async () => {
                      if (!presetName) return alert("Isi nama preset dulu, Bos!");
                      
                      try {
                        // Simpan ke database secara instan
                        console.log("Saving preset instantly without generating thumbnail...");
                        await saveDocument({ 
                          name: presetName, 
                          category: presetCategory,
                          thumbnailUrl: '' // No longer generating screenshots, leave empty
                        });
                        
                        setPresetSaveModal(false);
                      } catch (err: any) {
                        console.error("Gagal proses save:", err);
                        alert("Gagal memproses desain: " + err.message);
                      }
                    }}
                    disabled={saveStatus === "saving"}
                    className="flex-[2] py-4 bg-emerald-500 text-black rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 aurora-glow"
                  >
                    {saveStatus === "saving" ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Terminal Simpan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

