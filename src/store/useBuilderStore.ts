import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { VidingDocument, Section, Ornament, Background, GlobalSettings } from "@/types/viding-v3";

interface BuilderStore {
  activeDocument: VidingDocument | null;
  selectedSectionId: string | null;
  selectedElementId: string | null;
  isDirty: boolean;
  saveStatus: "idle" | "saving" | "saved" | "error";
  mode: "edit" | "preview";
  canvasZoom: number;
  viewDevice: "desktop" | "mobile";
  
  // UI State
  isPanelOpen: boolean;
  panelTab: "widget" | "section" | "global";
  subTab: "bg" | "ornamen";

  // Actions
  setDocument: (doc: VidingDocument) => void;
  updateDocument: (updates: Partial<VidingDocument>) => void;
  saveDocument: () => Promise<void>;
  
  // UI Actions
  setPanelOpen: (isOpen: boolean) => void;
  setPanelTab: (tab: "widget" | "section" | "global") => void;
  setSubTab: (tab: "bg" | "ornamen") => void;
  setViewDevice: (device: "desktop" | "mobile") => void;
  setCanvasZoom: (zoom: number) => void;
  setMode: (mode: "edit" | "preview") => void;

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
  },
  sections: {
    'seksi-cover': {
      id: 'seksi-cover',
      type: 'Cover',
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
      type: 'Mempelai',
      isVisible: true,
      background: { type: 'color', value: '#242a30', opacity: 1, effect: 'none' },
      backgroundOverlay: { enabled: false, color: '#000000', opacity: 0.3 },
      layout: 'center',
      ornaments: []
    },
    'seksi-galeri': {
      id: 'seksi-galeri',
      type: 'Galeri',
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
      type: 'Acara',
      isVisible: true,
      background: { type: 'color', value: '#242a30', opacity: 1, effect: 'none' },
      backgroundOverlay: { enabled: false, color: '#000000', opacity: 0.3 },
      layout: 'center',
      ornaments: []
    }
  },
  sectionOrder: ['seksi-cover', 'seksi-mempelai', 'seksi-galeri', 'seksi-acara'],
};

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
    
    isPanelOpen: true,
    panelTab: "widget",
    subTab: "bg",

    setDocument: (doc) => set({ activeDocument: doc, isDirty: false, saveStatus: "saved" }),
    
    updateDocument: (updates) => set((state) => ({
      activeDocument: state.activeDocument ? { ...state.activeDocument, ...updates } : null,
      isDirty: true,
      saveStatus: "idle"
    })),

    saveDocument: async () => {
      const { activeDocument, isDirty } = get();
      if (!activeDocument || !isDirty) return;

      set({ saveStatus: "saving" });
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In real app, you'd call: await api.saveDocument(activeDocument);
        console.log("Document saved to backend:", activeDocument);

        set({ isDirty: false, saveStatus: "saved" });
      } catch (error) {
        console.error("Failed to save document:", error);
        set({ saveStatus: "error" });
      }
    },

    setPanelOpen: (isOpen) => set({ isPanelOpen: isOpen }),
    setPanelTab: (tab) => set({ panelTab: tab }),
    setSubTab: (tab) => set({ subTab: tab }),
    setViewDevice: (device) => set({ viewDevice: device }),
    setCanvasZoom: (zoom) => set({ canvasZoom: zoom }),
    setMode: (mode) => set({ mode }),

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
