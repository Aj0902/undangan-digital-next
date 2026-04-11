import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { VidingDocument, Section, Ornament, Background, GlobalSettings } from "@/types/viding-v3";
import { Client } from "@/types/client";
import { DUMMY_CLIENT_DATA } from "@/viding-builder/lib/dummy-data";

interface BuilderStore {
  activeDocument: VidingDocument | null;
  clientData: Client | null; // Data riil klien (details + media) untuk widget
  selectedSectionId: string | null;
  selectedElementId: string | null;
  isDirty: boolean;
  saveStatus: "idle" | "saving" | "saved" | "error";
  mode: "edit" | "preview";
  canvasZoom: number;
  viewDevice: "desktop" | "mobile";
  slug: string | null;
  contextMode: "client" | "preset";
  presetId: string | null;
  presetInfo: { name: string; category: string } | null;
  
  // UI State
  isOpened: boolean; // State untuk simulasi "Buka Undangan" di builder
  isPanelOpen: boolean;
  panelTab: "widget" | "section" | "global";
  subTab: "bg" | "ornamen";

  // Actions
  setDocument: (doc: VidingDocument) => void;
  initDocument: (slug: string, doc: VidingDocument | null, mode?: "client" | "preset", clientData?: Client | null) => void;
  updateDocument: (updates: Partial<VidingDocument>) => void;
  saveDocument: (extraInfo?: { name?: string; category?: string; thumbnailUrl?: string }) => Promise<void>;
  
  // UI Actions
  setPanelOpen: (isOpen: boolean) => void;
  setPanelTab: (tab: "widget" | "section" | "global") => void;
  setSubTab: (tab: "bg" | "ornamen") => void;
  setViewDevice: (device: "desktop" | "mobile") => void;
  setCanvasZoom: (zoom: number) => void;
  setMode: (mode: "edit" | "preview") => void;
  setOpened: (isOpen: boolean) => void;

  // Section Actions
  selectSection: (id: string | null) => void;
  addSection: (section: Section) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  deleteSection: (id: string) => void;
  reorderSectionsArray: (newOrder: string[]) => void;
  toggleSectionVisibility: (id: string) => void;
  updateSectionBackground: (id: string, updates: Partial<Background>) => void;

  // Ornament Actions
  selectOrnament: (id: string | null) => void;
  addOrnament: (sectionId: string, ornament: Ornament) => void;
  updateOrnament: (sectionId: string, ornamentId: string, updates: Partial<Ornament>) => void;
  deleteOrnament: (sectionId: string, ornamentId: string) => void;
  duplicateOrnament: (sectionId: string, ornamentId: string) => void;

  // Global Settings
  updateGlobalSettings: (updates: Partial<VidingDocument["globalSettings"]>) => void;
}

export const ANIMATION_PRESETS = [
  { id: "none", label: "None" },
  { id: "float", label: "Floating" },
  { id: "pulse", label: "Pulse" },
  { id: "spin", label: "Spin Slow" },
  { id: "bounce", label: "Bounce" },
  { id: "shake", label: "Shake" },
  { id: "aurora", label: "Aurora Glow" },
];

const DEFAULT_DOCUMENT: Partial<VidingDocument> = {
  version: "4.0",
  name: "Undangan Premium",
  globalSettings: {
    fontFamily: "'Cormorant Garamond', serif",
    primaryColor: "#ffffff",
    accentColor: "#D4AF37",
    audioUrl: "",
    audioAutoPlay: false,
  },
  sections: {
    'seksi-cover': {
      id: 'seksi-cover',
      type: 'cover',
      isVisible: true,
      background: { type: 'color', value: '#1a1f24', opacity: 0.8, effect: 'none' },
      backgroundOverlay: { enabled: false, color: '#000000', opacity: 0.3 },
      layout: 'center',
      ornaments: [
        { id: 'orn-1', type: 'bunga-sudut', src: null, x: 85, y: 10, scale: 1.5, animate: 'float', rotation: 0, opacity: 1, zIndex: 0 },
        { id: 'orn-2', type: 'bunga-sudut', src: null, x: 15, y: 90, scale: 1.5, animate: 'float', rotation: 180, opacity: 1, zIndex: 0 }
      ]
    },
    'seksi-mempelai': {
      id: 'seksi-mempelai',
      type: 'mempelai',
      isVisible: true,
      background: { type: 'color', value: '#242a30', opacity: 1, effect: 'none' },
      backgroundOverlay: { enabled: false, color: '#000000', opacity: 0.3 },
      layout: 'center',
      ornaments: []
    },
    'seksi-galeri': {
      id: 'seksi-galeri',
      type: 'galeri',
      isVisible: true,
      background: { type: 'color', value: '#1a1f24', opacity: 1, effect: 'none' },
      backgroundOverlay: { enabled: false, color: '#000000', opacity: 0.3 },
      layout: 'center',
      ornaments: [
        { id: 'orn-3', type: 'daun-emas', src: null, x: 50, y: 50, scale: 3, animate: 'none', rotation: 0, opacity: 1, zIndex: 0 }
      ]
    },
    'seksi-acara': {
      id: 'seksi-acara',
      type: 'acara',
      isVisible: true,
      background: { type: 'color', value: '#242a30', opacity: 1, effect: 'none' },
      backgroundOverlay: { enabled: false, color: '#000000', opacity: 0.3 },
      layout: 'center',
      ornaments: []
    }
  },
  sectionOrder: ['seksi-cover', 'seksi-mempelai', 'seksi-galeri', 'seksi-acara'],
};

import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

export const useBuilderStore = create<BuilderStore>()(
  devtools((set, get) => ({
    activeDocument: {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...DEFAULT_DOCUMENT
    } as VidingDocument,
    selectedSectionId: 'seksi-cover',
    selectedElementId: null,
    isDirty: false,
    saveStatus: "idle",
    mode: "edit",
    canvasZoom: 1,
    viewDevice: "mobile",
    clientData: null,
    slug: null,
    contextMode: "client",
    presetId: null,
    presetInfo: null,
    
    isOpened: false,
    isPanelOpen: true,
    panelTab: "widget",
    subTab: "bg",

    setDocument: (doc) => set({ activeDocument: doc, isDirty: false, saveStatus: "saved" }),
    
    initDocument: (idOrSlug, doc, mode = "client", clientDataProp = null) => {
      // Resolve clientData: use provided data for client mode, dummy for preset mode
      const resolvedClientData = mode === "client" && clientDataProp 
        ? clientDataProp 
        : (DUMMY_CLIENT_DATA as Client);

      // Auto-cleanup: strip deprecated 'opening' sections from old presets
      const cleanDoc = (d: VidingDocument): VidingDocument => {
        const openingIds = Object.values(d.sections)
          .filter(s => s.type === 'opening')
          .map(s => s.id);
        if (openingIds.length === 0) return d;
        
        console.log('[BuilderStore] Auto-cleaning deprecated opening sections:', openingIds);
        const newSections = { ...d.sections };
        openingIds.forEach(id => delete newSections[id]);
        return {
          ...d,
          sections: newSections,
          sectionOrder: d.sectionOrder.filter(id => !openingIds.includes(id)),
        };
      };

      if (doc) {
        const cleaned = cleanDoc(doc);
        set({ 
          slug: mode === "client" ? idOrSlug : null,
          presetId: mode === "preset" ? idOrSlug : null,
          contextMode: mode, 
          clientData: resolvedClientData,
          activeDocument: cleaned, 
          isDirty: false, 
          saveStatus: "saved" 
        });
      } else {
        // Fallback ke default jika JSON kosong
        set({ 
          slug: mode === "client" ? idOrSlug : null,
          presetId: mode === "preset" ? idOrSlug : null,
          contextMode: mode,
          clientData: resolvedClientData,
          activeDocument: {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...DEFAULT_DOCUMENT
          } as VidingDocument, 
          isDirty: true, 
          saveStatus: "idle" 
        });
      }
    },

    updateDocument: (updates) => set((state) => ({
      activeDocument: state.activeDocument ? { ...state.activeDocument, ...updates } : null,
      isDirty: true,
      saveStatus: "idle"
    })),

    saveDocument: async (extraInfo) => {
      const { activeDocument, isDirty, slug, presetId, contextMode } = get();
      if (!activeDocument || !isDirty) return;

      set({ saveStatus: "saving" });
      try {
        if (contextMode === 'client') {
          if (!slug) throw new Error("Slug klien tidak ditemukan");
          // Update tabel clients
          const { error } = await supabase
            .from('clients')
            .update({ 
              custom_config: activeDocument,
              template_type: 'dinamis'
            })
            .eq('slug', slug);
          if (error) throw error;
        } else {
          // Update/Insert tabel presets (Pabrik)
          if (presetId && presetId !== 'new') {
            const { error } = await supabase
              .from('presets')
              .update({ 
                json_config: activeDocument,
                ...(extraInfo?.name && { nama_preset: extraInfo.name }),
                ...(extraInfo?.category && { kategori: extraInfo.category }),
                ...(extraInfo?.thumbnailUrl && { thumbnail_url: extraInfo.thumbnailUrl })
              })
              .eq('id', presetId);
            if (error) throw error;
          } else {
            // New Preset
            if (!extraInfo || !extraInfo.name || !extraInfo.category) throw new Error("Informasi preset wajib diisi untuk preset baru");
            const { error } = await supabase
              .from('presets')
              .insert({ 
                nama_preset: extraInfo.name, 
                kategori: extraInfo.category,
                json_config: activeDocument,
                thumbnail_url: extraInfo.thumbnailUrl || null
              });
            if (error) throw error;
          }
        }
        
        set({ isDirty: false, saveStatus: "saved" });
      } catch (error: any) {
        console.error("Failed to save document to Supabase:", error);
        alert(`Gagal menyimpan: ${error?.message || JSON.stringify(error)}`);
        set({ saveStatus: "error" });
      }
    },

    setPanelOpen: (isOpen) => set({ isPanelOpen: isOpen }),
    setPanelTab: (tab) => set({ panelTab: tab }),
    setSubTab: (tab) => set({ subTab: tab }),
    setViewDevice: (device) => set({ viewDevice: device }),
    setCanvasZoom: (zoom) => set({ canvasZoom: zoom }),
    setMode: (mode) => set({ mode }),
    setOpened: (isOpen) => set({ isOpened: isOpen }),

    selectSection: (id) => set({ selectedSectionId: id, selectedElementId: null }),
    
    addSection: (section) => set((state) => {
      if (!state.activeDocument) return state;
      return {
        activeDocument: {
          ...state.activeDocument,
          sections: { ...state.activeDocument.sections, [section.id]: section },
          sectionOrder: [...state.activeDocument.sectionOrder, section.id]
        },
        selectedSectionId: section.id,
        isDirty: true
      };
    }),

    updateSection: (id, updates) => set((state) => {
      if (!state.activeDocument || !state.activeDocument.sections[id]) return state;
      return {
        activeDocument: {
          ...state.activeDocument,
          sections: {
            ...state.activeDocument.sections,
            [id]: { ...state.activeDocument.sections[id], ...updates }
          }
        },
        isDirty: true
      };
    }),

    deleteSection: (id) => set((state) => {
      if (!state.activeDocument) return state;
      const newSections = { ...state.activeDocument.sections };
      delete newSections[id];
      return {
        activeDocument: {
          ...state.activeDocument,
          sections: newSections,
          sectionOrder: state.activeDocument.sectionOrder.filter(sId => sId !== id)
        },
        selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId,
        isDirty: true
      };
    }),

    reorderSectionsArray: (newOrder) => set((state) => {
      if (!state.activeDocument) return state;
      return {
        activeDocument: {
          ...state.activeDocument,
          sectionOrder: newOrder
        },
        isDirty: true
      };
    }),

    toggleSectionVisibility: (id) => set((state) => {
      if (!state.activeDocument || !state.activeDocument.sections[id]) return state;
      return {
        activeDocument: {
          ...state.activeDocument,
          sections: {
            ...state.activeDocument.sections,
            [id]: { 
              ...state.activeDocument.sections[id], 
              isVisible: !state.activeDocument.sections[id].isVisible 
            }
          }
        },
        isDirty: true
      };
    }),

    updateSectionBackground: (id, updates) => set((state) => {
      if (!state.activeDocument || !state.activeDocument.sections[id]) return state;
      return {
        activeDocument: {
          ...state.activeDocument,
          sections: {
            ...state.activeDocument.sections,
            [id]: { 
              ...state.activeDocument.sections[id], 
              background: { ...state.activeDocument.sections[id].background, ...updates }
            }
          }
        },
        isDirty: true
      };
    }),

    selectOrnament: (id) => set({ selectedElementId: id }),

    addOrnament: (sectionId, ornament) => set((state) => {
      if (!state.activeDocument || !state.activeDocument.sections[sectionId]) return state;
      return {
        activeDocument: {
          ...state.activeDocument,
          sections: {
            ...state.activeDocument.sections,
            [sectionId]: {
              ...state.activeDocument.sections[sectionId],
              ornaments: [...state.activeDocument.sections[sectionId].ornaments, ornament]
            }
          }
        },
        selectedElementId: ornament.id,
        isDirty: true
      };
    }),

    updateOrnament: (sectionId, ornamentId, updates) => set((state) => {
      if (!state.activeDocument || !state.activeDocument.sections[sectionId]) return state;
      return {
        activeDocument: {
          ...state.activeDocument,
          sections: {
            ...state.activeDocument.sections,
            [sectionId]: {
              ...state.activeDocument.sections[sectionId],
              ornaments: state.activeDocument.sections[sectionId].ornaments.map(o => 
                o.id === ornamentId ? { ...o, ...updates } : o
              )
            }
          }
        },
        isDirty: true
      };
    }),

    deleteOrnament: (sectionId, ornamentId) => set((state) => {
      if (!state.activeDocument || !state.activeDocument.sections[sectionId]) return state;
      return {
        activeDocument: {
          ...state.activeDocument,
          sections: {
            ...state.activeDocument.sections,
            [sectionId]: {
              ...state.activeDocument.sections[sectionId],
              ornaments: state.activeDocument.sections[sectionId].ornaments.filter(o => o.id !== ornamentId)
            }
          }
        },
        selectedElementId: state.selectedElementId === ornamentId ? null : state.selectedElementId,
        isDirty: true
      };
    }),

    duplicateOrnament: (sectionId, ornamentId) => set((state) => {
      if (!state.activeDocument || !state.activeDocument.sections[sectionId]) return state;
      const ornamentToDuplicate = state.activeDocument.sections[sectionId].ornaments.find(o => o.id === ornamentId);
      if (!ornamentToDuplicate) return state;

      const newOrnament = {
        ...ornamentToDuplicate,
        id: `orn-${crypto.randomUUID().split('-')[0]}`,
        x: ornamentToDuplicate.x + 5,
        y: ornamentToDuplicate.y + 5,
      };

      return {
        activeDocument: {
          ...state.activeDocument,
          sections: {
            ...state.activeDocument.sections,
            [sectionId]: {
              ...state.activeDocument.sections[sectionId],
              ornaments: [...state.activeDocument.sections[sectionId].ornaments, newOrnament]
            }
          }
        },
        selectedElementId: newOrnament.id,
        isDirty: true
      };
    }),

    updateGlobalSettings: (updates) => set((state) => {
      if (!state.activeDocument) return state;
      return {
        activeDocument: {
          ...state.activeDocument,
          globalSettings: { ...state.activeDocument.globalSettings, ...updates }
        },
        isDirty: true
      };
    }),

  }))
);
