"use client";

import React, { useRef, useState } from 'react';
import { 
  Settings2, Palette, Layers, Image as ImageIcon, 
  Plus, Trash2, ChevronDown, Check, MousePointerClick, 
  Upload, Eye, EyeOff, GripVertical, Video,
  Save, Loader2, CheckCircle2, AlertCircle, Sparkles,
  Library
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useBuilderStore, ANIMATION_PRESETS } from '@/store/useBuilderStore';
import { Section } from '@/types/viding-v3';
import { LIBRARY_BACKGROUNDS, LIBRARY_ORNAMENTS, LIBRARY_SECTIONS } from '../lib/dummy-library';

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
    isDirty
  } = useBuilderStore();

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
              className="bg-indigo-600 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs hover:bg-indigo-700 uppercase tracking-widest transition-all"
            >
              <Settings2 size={16} /> Buka Alat Editor
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPanelOpen && (
          <motion.div 
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 w-full max-w-[420px] bg-slate-50 rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.5)] flex flex-col z-50 h-[65dvh] pointer-events-auto"
          >
            {/* PANEL HEADER TABS */}
            <div className="flex-none pt-3 pb-0 px-4 flex flex-col items-center bg-white rounded-t-3xl border-b border-slate-200 relative">
              <div onClick={() => setPanelOpen(false)} className="w-12 h-1.5 bg-slate-200 hover:bg-slate-300 rounded-full mb-4 cursor-pointer"></div>
              
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <button
                  onClick={() => saveDocument()}
                  disabled={!isDirty || saveStatus === "saving"}
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest transition-all ${
                    !isDirty 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                      : saveStatus === "saving"
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
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
                  {saveStatus === "saving" ? "Menyimpan" : saveStatus === "saved" ? "Tersimpan" : "Simpan"}
                </button>
              </div>

              <button onClick={() => setPanelOpen(false)} className="absolute right-4 top-4 p-1.5 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                <ChevronDown size={18} />
              </button>

              <div className="flex w-full bg-slate-100 p-1.5 rounded-xl mb-3 gap-1">
                <button onClick={() => setPanelTab('widget')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${panelTab === 'widget' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                  <Layers size={16} /> Susunan Seksi
                </button>
                <button onClick={() => setPanelTab('section')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${panelTab === 'section' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                  <ImageIcon size={16} /> Visual Blok
                </button>
                <button onClick={() => setPanelTab('global')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${panelTab === 'global' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                  <Palette size={16} /> Tema Global
                </button>
              </div>

              {/* Sub-Tabs */}
              {panelTab === 'section' && (
                <div className="flex w-full gap-6 mt-1 pb-3 px-4">
                  <button onClick={() => setSubTab('bg')} className={`flex-1 pb-2 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${subTab === 'bg' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Latar Belakang</button>
                  <button onClick={() => setSubTab('ornamen')} className={`flex-1 pb-2 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${subTab === 'ornamen' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Ornamen Presisi</button>
                </div>
              )}
            </div>

            {/* PANEL CONTENT */}
            <div className="flex-1 overflow-y-auto p-5 pb-12 custom-scrollbar">
              
              {/* TAB 1: WIDGET */}
              {panelTab === 'widget' && (
                <div className="animate-in fade-in slide-in-from-left-4 space-y-4">
                  <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex gap-3 items-start">
                    <MousePointerClick className="text-indigo-500 shrink-0 mt-0.5" size={16} />
                    <p className="text-[10px] text-indigo-700 leading-relaxed font-medium">Tahan dan geser ikon titik untuk mengubah urutan. Klik ikon mata untuk menyembunyikan seksi dari undangan.</p>
                  </div>
                  
                  <Reorder.Group axis="y" values={sections} onReorder={handleReorder} className="space-y-3">
                    {sections.map((sec) => (
                      <Reorder.Item 
                        key={sec.id} 
                        value={sec} 
                        className={`flex items-center gap-3 p-4 bg-white rounded-2xl border shadow-sm touch-none transition-opacity ${!sec.isVisible ? 'opacity-50 border-slate-200' : 'border-slate-100'}`}
                      >
                        <GripVertical className="text-slate-300 cursor-grab active:cursor-grabbing" size={20} />
                        <div className="flex-1 cursor-pointer" onClick={() => { selectSection(sec.id); setPanelTab('section'); }}>
                          <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">{sec.type} Section</span>
                          <span className="text-[9px] text-slate-400 uppercase">{sec.isVisible ? 'Terlihat' : 'Disembunyikan'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => toggleSectionVisibility(sec.id)} 
                            className={`p-2 rounded-full transition-colors ${sec.isVisible ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                            title={sec.isVisible ? 'Sembunyikan' : 'Tampilkan'}
                          >
                            {sec.isVisible ? <Eye size={16}/> : <EyeOff size={16}/>}
                          </button>
                          <button 
                            onClick={() => deleteSection(sec.id)} 
                            className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
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
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-xl shadow-lg font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all mt-4"
                    >
                      <Library size={16} /> Pustaka Seksi
                    </button>
                  ) : (
                    <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                          <Library size={14} /> Pilih Template Seksi
                        </h3>
                        <button onClick={() => setShowSectionLibrary(false)} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider">Tutup</button>
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
                                isVisible: true,
                                background: { type: 'color', value: libSec.bg, opacity: 1 },
                                ornaments: []
                              });
                              setShowSectionLibrary(false);
                            }}
                            className="bg-white border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group"
                          >
                            <div className="w-full h-20 rounded-lg mb-3 border border-slate-100 shadow-inner flex items-center justify-center" style={{ backgroundColor: libSec.bg }}>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-indigo-500 transition-colors">{libSec.type}</span>
                            </div>
                            <p className="text-[10px] font-bold text-slate-700 text-center">{libSec.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SECTION */}
              {panelTab === 'section' && activeSection && (
                <div className="animate-in fade-in zoom-in-95">
                  <div className="mb-4 text-center">
                    <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Mengedit Latar: {activeSection.type}
                    </span>
                  </div>

                  {subTab === 'bg' && (
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-5">
                      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl">
                        <button onClick={() => updateSectionBackground(activeSection.id, { type: 'color' })} className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider ${activeSection.background.type === 'color' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Warna</button>
                        <button onClick={() => updateSectionBackground(activeSection.id, { type: 'image' })} className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider ${activeSection.background.type === 'image' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Gambar</button>
                        <button onClick={() => updateSectionBackground(activeSection.id, { type: 'video' })} className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider ${activeSection.background.type === 'video' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Video</button>
                      </div>

                      {activeSection.background.type === 'color' ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Warna Kustom</span>
                            <input type="color" value={activeSection.background.value} onChange={(e) => updateSectionBackground(activeSection.id, { value: e.target.value })} className="w-10 h-10 rounded-lg border-none cursor-pointer bg-transparent" />
                          </div>
                          
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Pustaka Warna</h4>
                            <div className="grid grid-cols-4 gap-2">
                              {LIBRARY_BACKGROUNDS.filter(bg => bg.type === 'color').map(bg => (
                                <div 
                                  key={bg.id}
                                  onClick={() => updateSectionBackground(activeSection.id, { value: bg.value })}
                                  className="aspect-square rounded-lg border-2 cursor-pointer transition-all hover:scale-105"
                                  style={{ 
                                    backgroundColor: bg.value,
                                    borderColor: activeSection.background.value === bg.value ? '#4f46e5' : '#e2e8f0'
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
                            <button onClick={() => bgInputRef.current?.click()} className="w-full h-24 border-2 border-dashed border-indigo-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-indigo-500 hover:bg-indigo-50 bg-slate-50 transition-all">
                              {activeSection.background.type === 'video' ? <Video size={24} /> : <ImageIcon size={24} />}
                              <div className="text-center">
                                <span className="block text-[10px] font-bold uppercase tracking-widest">Upload {activeSection.background.type}</span>
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
                              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Pustaka Gambar</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {LIBRARY_BACKGROUNDS.filter(bg => bg.type === 'image').map(bg => (
                                  <div 
                                    key={bg.id}
                                    onClick={() => updateSectionBackground(activeSection.id, { fileUrl: bg.fileUrl })}
                                    className={`h-20 rounded-lg border-2 cursor-pointer transition-all hover:opacity-80 bg-cover bg-center ${activeSection.background.fileUrl === bg.fileUrl ? 'border-indigo-500' : 'border-transparent'}`}
                                    style={{ backgroundImage: `url(${bg.fileUrl})` }}
                                    title={bg.label}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                              <span>Tingkat Keterangan (Opacity)</span><span>{Math.round(activeSection.background.opacity * 100)}%</span>
                            </div>
                            <input type="range" min="0" max="1" step="0.1" value={activeSection.background.opacity} onChange={(e) => updateSectionBackground(activeSection.id, { opacity: parseFloat(e.target.value) })} className="w-full accent-indigo-600" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {subTab === 'ornamen' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Library size={14} /> Pustaka Ornamen
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
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
                              className="aspect-square bg-white border border-slate-200 rounded-xl p-2 cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group"
                            >
                              <img src={orn.src} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" alt={orn.label} />
                              <span className="text-[8px] font-bold text-slate-500 text-center leading-tight">{orn.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-slate-50 px-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">Atau</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <input type="file" ref={ornamentInputRef} hidden accept="image/png, image/svg+xml" onChange={handleOrnamentUpload} />
                        <button onClick={() => ornamentInputRef.current?.click()} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 p-3 rounded-xl border border-slate-200 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all">
                          <Upload size={14} /> Upload Ornamen Sendiri
                        </button>

                        {activeSection.ornaments.length === 0 && (
                          <div className="py-12 text-center bg-white border-2 border-dashed border-slate-200 rounded-2xl">
                            <Sparkles size={32} className="mx-auto text-slate-200 mb-3" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Belum ada ornamen di seksi ini</p>
                            <p className="text-[9px] text-slate-300 mt-1">Pilih dari pustaka atau upload</p>
                          </div>
                        )}

                      {activeSection.ornaments.map((orn, i) => (
                        <div key={orn.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              {orn.src ? <img src={orn.src} className="w-10 h-10 object-contain bg-slate-100 rounded-lg p-1" alt="Ornament" /> : <div className="w-10 h-10 bg-indigo-50 text-indigo-500 flex items-center justify-center rounded-lg font-bold text-xs">SVG</div>}
                              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Layer #{i + 1}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => duplicateOrnament(activeSection.id, orn.id)} 
                                className="p-2 text-indigo-500 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors"
                                title="Duplikat"
                              >
                                <Layers size={16}/>
                              </button>
                              <button 
                                onClick={() => deleteOrnament(activeSection.id, orn.id)} 
                                className="p-2 text-red-500 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                                title="Hapus"
                              >
                                <Trash2 size={16}/>
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase"><span>Kiri - Kanan (Sumbu X)</span> <span className="bg-slate-200 px-1.5 rounded">{orn.x}%</span></div>
                              <input type="range" min="-30" max="130" value={orn.x} onChange={(e) => updateOrnament(activeSection.id, orn.id, { x: parseInt(e.target.value) })} className="w-full accent-indigo-500" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase"><span>Atas - Bawah (Sumbu Y)</span> <span className="bg-slate-200 px-1.5 rounded">{orn.y}%</span></div>
                              <input type="range" min="-30" max="130" value={orn.y} onChange={(e) => updateOrnament(activeSection.id, orn.id, { y: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                            </div>
                            <div className="space-y-1 pt-3 border-t border-slate-200">
                              <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase"><span>Skala / Ukuran</span> <span>{orn.scale}x</span></div>
                              <input type="range" min="0.5" max="3" step="0.1" value={orn.scale} onChange={(e) => updateOrnament(activeSection.id, orn.id, { scale: parseFloat(e.target.value) })} className="w-full accent-amber-500" />
                            </div>
                            <div className="space-y-2 pt-3 border-t border-slate-200">
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase">
                                <Sparkles size={12} className="text-indigo-500" />
                                <span>Efek Animasi</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {ANIMATION_PRESETS.map(preset => (
                                  <button
                                    key={preset.id}
                                    onClick={() => updateOrnament(activeSection.id, orn.id, { animate: preset.id })}
                                    className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                      orn.animate === preset.id
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                                        : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600'
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
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tema Warna</label>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="block text-xs font-bold text-slate-700 uppercase tracking-widest">Warna Utama (Teks)</span>
                      <input type="color" value={globalSettings?.primaryColor} onChange={e => updateGlobalSettings({ primaryColor: e.target.value })} className="w-8 h-8 rounded border-none cursor-pointer bg-transparent" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="block text-xs font-bold text-slate-700 uppercase tracking-widest">Aksen (Ornamen & Tombol)</span>
                      <input type="color" value={globalSettings?.accentColor} onChange={e => updateGlobalSettings({ accentColor: e.target.value })} className="w-8 h-8 rounded border-none cursor-pointer bg-transparent" />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jenis Font Utama</label>
                    {[
                      { id: "'Cormorant Garamond', serif", name: 'Elegant Serif' },
                      { id: "'Great Vibes', cursive", name: 'Romantic Cursive' },
                      { id: "'Montserrat', sans-serif", name: 'Modern Sans' },
                    ].map(f => (
                      <button key={f.id} onClick={() => updateGlobalSettings({ fontFamily: f.id })} className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${globalSettings?.fontFamily === f.id ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'}`}>
                        <span style={{ fontFamily: f.id }} className="text-base">{f.name}</span>
                        {globalSettings?.fontFamily === f.id && <Check size={18} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
