import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  VidingDocument,
  Section,
  Ornament,
  BuilderState,
} from "@/types/viding-v3";

interface BuilderStore {
  // State properties
  activeDocument: VidingDocument | undefined;
  selectedSectionId: string | undefined;
  selectedElementId: string | undefined;
  isDirty: boolean;
  zoom: number;
  mode: BuilderState["mode"];
  inspectorTarget: { type: "ornament" | "section"; id: string } | null;
  livePreview: boolean;
  canvasZoom: number;

  // Document operations
  setActiveDocument: (doc: VidingDocument) => void;
  updateDocument: (updates: Partial<VidingDocument>) => void;
  newDocument: (template?: Partial<VidingDocument>) => void;

  // Section operations
  addSection: (section: Section, index?: number) => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  selectSection: (sectionId: string | undefined) => void;

  // Ornament operations
  addOrnament: (sectionId: string, ornament: Ornament, index?: number) => void;
  updateOrnament: (
    sectionId: string,
    ornamentId: string,
    updates: Partial<Ornament>,
  ) => void;
  deleteOrnament: (sectionId: string, ornamentId: string) => void;
  selectOrnament: (ornamentId: string | undefined) => void;
  duplicateOrnament: (sectionId: string, ornamentId: string) => void;
  setOrnamentProperty: (
    sectionId: string,
    ornamentId: string,
    property: keyof Ornament,
    value: any,
  ) => void;

  // Multi-select
  getSelectedOrnaments: () => Ornament[];
  selectMultiple: (ornamentIds: string[]) => void;
  updateMultiple: (updates: Partial<Ornament>) => void;

  // Inspector state
  setInspectorTarget: (
    target: { type: "ornament" | "section"; id: string } | null,
  ) => void;
  setLivePreview: (enabled: boolean) => void;
  setCanvasZoom: (zoom: number) => void;

  // Element operations
  selectElement: (elementId: string | undefined) => void;

  // UI state
  setZoom: (zoom: number) => void;
  setMode: (mode: BuilderState["mode"]) => void;
  setDirty: (isDirty: boolean) => void;
}

const DEFAULT_DOCUMENT: Partial<VidingDocument> = {
  version: "3.0",
  name: "Untitled Document",
  sections: {},
  sectionOrder: [],
  globalSettings: {
    fontFamily: "Inter",
    primaryColor: "#1a2e25",
    accentColor: "#d4af37",
    breakpoints: {
      mobile: 640,
      tablet: 1024,
      desktop: 1280
    }
  },
};

export const useBuilderStore = create<BuilderStore>()(
  devtools(
    (set, get) => ({
      activeDocument: undefined,
      selectedSectionId: undefined,
      selectedElementId: undefined,
      isDirty: false,
      zoom: 1,
      mode: "edit",

      // New inspector state
      inspectorTarget: null,
      livePreview: true,
      canvasZoom: 1,

      setActiveDocument: (doc: VidingDocument) => {
        set({ activeDocument: doc, isDirty: false });
      },

      updateDocument: (updates: Partial<VidingDocument>) => {
        set((state) => ({
          activeDocument: state.activeDocument
            ? {
                ...state.activeDocument,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : undefined,
          isDirty: true,
        }));
      },

      newDocument: (template?: Partial<VidingDocument>) => {
        const newDoc: VidingDocument = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...DEFAULT_DOCUMENT,
          ...template,
        } as VidingDocument;
        set({ activeDocument: newDoc, isDirty: false });
      },

      addSection: (section: Section, index?: number) => {
        set((state) => {
          if (!state.activeDocument) return state;
          const sectionId = section.id;
          const sections = {
            ...state.activeDocument.sections,
            [sectionId]: section,
          };
          const sectionOrder = [...state.activeDocument.sectionOrder];
          if (index !== undefined) sectionOrder.splice(index, 0, sectionId);
          else sectionOrder.push(sectionId);

          return {
            activeDocument: {
              ...state.activeDocument,
              sections,
              sectionOrder,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
          };
        });
      },

      updateSection: (sectionId, updates) => {
        set((state) => {
          if (!state.activeDocument) return state;
          const section = state.activeDocument.sections[sectionId];
          if (!section) return state;
          const sections = {
            ...state.activeDocument.sections,
            [sectionId]: { ...section, ...updates } as Section,
          };
          return {
            activeDocument: {
              ...state.activeDocument,
              sections,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
          };
        });
      },

      deleteSection: (sectionId) => {
        set((state) => {
          if (!state.activeDocument) return state;
          const { [sectionId]: deletedSection, ...remainingSections } =
            state.activeDocument.sections;
          const sectionOrder = state.activeDocument.sectionOrder.filter(
            (id) => id !== sectionId,
          );
          return {
            activeDocument: {
              ...state.activeDocument,
              sections: remainingSections,
              sectionOrder,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
            selectedSectionId:
              state.selectedSectionId === sectionId
                ? undefined
                : state.selectedSectionId,
          };
        });
      },

      selectSection: (sectionId) => {
        set({ selectedSectionId: sectionId });
      },

      selectElement: (elementId) => {
        set({ selectedElementId: elementId });
      },

      setZoom: (zoom) => {
        set({ zoom: Math.max(0.5, Math.min(2, zoom)) });
      },

      setMode: (mode) => {
        set({ mode });
      },

      setDirty: (isDirty) => {
        set({ isDirty });
      },

      // Ornament operations
      addOrnament: (sectionId, ornament, index) => {
        set((state) => {
          if (!state.activeDocument) return state;
          const section = state.activeDocument.sections[sectionId];
          if (!section || section.type !== "cover") return state;

          const ornaments = [...section.ornaments];
          if (index !== undefined) ornaments.splice(index, 0, ornament);
          else ornaments.push(ornament);

          const sections = {
            ...state.activeDocument.sections,
            [sectionId]: { ...section, ornaments },
          };

          return {
            activeDocument: {
              ...state.activeDocument,
              sections,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
          };
        });
      },

      updateOrnament: (sectionId, ornamentId, updates) => {
        set((state) => {
          if (!state.activeDocument) return state;
          const section = state.activeDocument.sections[sectionId];
          if (!section || section.type !== "cover") return state;

          const ornaments = section.ornaments.map((ornament) =>
            ornament.id === ornamentId ? { ...ornament, ...updates } : ornament,
          );

          const sections = {
            ...state.activeDocument.sections,
            [sectionId]: { ...section, ornaments },
          };

          return {
            activeDocument: {
              ...state.activeDocument,
              sections,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
          };
        });
      },

      deleteOrnament: (sectionId, ornamentId) => {
        set((state) => {
          if (!state.activeDocument) return state;
          const section = state.activeDocument.sections[sectionId];
          if (!section || section.type !== "cover") return state;

          const ornaments = section.ornaments.filter(
            (ornament) => ornament.id !== ornamentId,
          );

          const sections = {
            ...state.activeDocument.sections,
            [sectionId]: { ...section, ornaments },
          };

          return {
            activeDocument: {
              ...state.activeDocument,
              sections,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
            selectedElementId:
              state.selectedElementId === ornamentId
                ? undefined
                : state.selectedElementId,
          };
        });
      },

      selectOrnament: (ornamentId) => {
        set({ selectedElementId: ornamentId });
      },

      duplicateOrnament: (sectionId, ornamentId) => {
        set((state) => {
          if (!state.activeDocument) return state;
          const section = state.activeDocument.sections[sectionId];
          if (!section || section.type !== "cover") return state;

          const ornament = section.ornaments.find((o) => o.id === ornamentId);
          if (!ornament) return state;

          const newOrnament = {
            ...ornament,
            id: crypto.randomUUID(),
            position: {
              ...ornament.position,
              x: ornament.position.x + 5,
              y: ornament.position.y + 5,
            },
          };

          const sections = {
            ...state.activeDocument.sections,
            [sectionId]: {
              ...section,
              ornaments: [...section.ornaments, newOrnament],
            },
          };

          return {
            activeDocument: {
              ...state.activeDocument,
              sections,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
          };
        });
      },

      setOrnamentProperty: (sectionId, ornamentId, property, value) => {
        get().updateOrnament(sectionId, ornamentId, { [property]: value });
      },

      // Multi-select
      getSelectedOrnaments: () => {
        const state = get();
        if (!state.activeDocument || !state.selectedSectionId) return [];
        const section = state.activeDocument.sections[state.selectedSectionId];
        if (!section || section.type !== "cover") return [];
        return section.ornaments.filter(
          (ornament) => state.selectedElementId === ornament.id,
        );
      },

      selectMultiple: (ornamentIds) => {
        // For now, just select the first one
        set({ selectedElementId: ornamentIds[0] });
      },

      updateMultiple: (updates) => {
        // Implement batch update for selected ornaments
        const state = get();
        if (
          !state.activeDocument ||
          !state.selectedSectionId ||
          !state.selectedElementId
        )
          return;
        get().updateOrnament(
          state.selectedSectionId,
          state.selectedElementId,
          updates,
        );
      },

      // Inspector state
      setInspectorTarget: (target) => {
        set({ inspectorTarget: target });
      },

      setLivePreview: (enabled) => {
        set({ livePreview: enabled });
      },

      setCanvasZoom: (zoom) => {
        set({ canvasZoom: zoom });
      },
    }),
    { name: "builder-store" },
  ),
);
