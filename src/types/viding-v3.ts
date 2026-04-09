import { z } from "zod";

/**
 * SKEMA ANIMASI (Motion)
 */
export const MotionPresetSchema = z.object({
  type: z.enum(["fade", "slide", "zoom", "rotate", "bounce", "float", "pulse", "none", "custom"]),
  duration: z.number().default(0.6),
  delay: z.number().default(0),
  easing: z
    .enum(["ease-in", "ease-out", "ease-in-out", "linear"])
    .default("ease-out"),
  staggerChildren: z.number().optional(),
});

export type MotionPreset = z.infer<typeof MotionPresetSchema>;

/**
 * SKEMA LATAR BELAKANG (Unified)
 */
export const BackgroundSchema = z.object({
  type: z.enum(["color", "image", "video"]),
  value: z.string().optional().default("#ffffff"), // Hex color if type is color
  url: z.string().optional(), // Legacy URL field
  fileUrl: z.string().nullable().optional(), // Builder URL field
  opacity: z.number().min(0).max(1).default(1),
  effect: z.enum(["none", "aurora", "noise"]).default("none"),
});

export type Background = z.infer<typeof BackgroundSchema>;

/**
 * SKEMA ORNAMEN (Unified)
 */
export const OrnamentSchema = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string().optional(),
  src: z.string().nullable().optional(),
  
  // Legacy Position (Nested)
  position: z.object({
    x: z.number(),
    y: z.number(),
  }).optional(),
  
  // Legacy Size (Nested)
  size: z.object({
    width: z.number(),
    height: z.number(),
  }).optional(),
  
  // Builder Position (Flat)
  x: z.number().default(50),
  y: z.number().default(50),
  scale: z.number().default(1),
  rotation: z.number().default(0),
  opacity: z.number().min(0).max(1).default(1),
  zIndex: z.number().default(0),
  
  // Builder Animation
  animate: z.string().default("none"),
  
  // Legacy Animation
  animation: MotionPresetSchema.optional(),
});

export type Ornament = z.infer<typeof OrnamentSchema>;

/**
 * SKEMA SEKSI (Unified)
 */
export const BaseSectionSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string().optional(),
  isVisible: z.boolean().default(true),
  background: BackgroundSchema.default({ type: "color", value: "#1a1f24", opacity: 1 }),
  ornaments: z.array(OrnamentSchema).default([]),
  
  // Fields from legacy schemas
  backgroundColor: z.string().optional(),
  backgroundOverlay: z.object({
    enabled: z.boolean().default(false),
    color: z.string().default("#000000"),
    opacity: z.number().min(0).max(1).default(0.3),
  }).optional(),
  layout: z.enum(["center", "top", "bottom", "custom"]).default("center"),
  content: z.any().optional(), // Content varies by section type
  motion: z.object({
    entrance: MotionPresetSchema.optional(),
    background: MotionPresetSchema.optional(),
    elements: MotionPresetSchema.optional(),
  }).optional(),
  customCSS: z.string().optional(),
});

export type Section = z.infer<typeof BaseSectionSchema>;

/**
 * SKEMA PENGATURAN GLOBAL
 */
export const GlobalSettingsSchema = z.object({
  primaryColor: z.string().default("#1a2e25"),
  accentColor: z.string().default("#d4af37"),
  fontFamily: z.string().default("Cormorant Garamond"),
  breakpoints: z.object({
    mobile: z.number().default(640),
    tablet: z.number().default(1024),
    desktop: z.number().default(1280),
  }).optional(),
});

export type GlobalSettings = z.infer<typeof GlobalSettingsSchema>;

/**
 * SKEMA DOKUMEN VIDING (Master)
 */
export const VidingDocumentSchema = z.object({
  id: z.string(),
  version: z.string().default("3.0"),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  sectionOrder: z.array(z.string()).default([]),
  sections: z.record(z.string(), BaseSectionSchema),
  globalSettings: GlobalSettingsSchema.default({}),
});

export type VidingDocument = z.infer<typeof VidingDocumentSchema>;

/**
 * SKEMA STATE BUILDER
 */
export const BuilderStateSchema = z.object({
  activeDocument: VidingDocumentSchema.optional(),
  selectedSectionId: z.string().optional(),
  selectedElementId: z.string().optional(),
  isPanelOpen: z.boolean().default(false),
  panelTab: z.enum(["widget", "section", "global"]).default("widget"),
  subTab: z.enum(["bg", "ornamen"]).default("bg"),
  isDirty: z.boolean().default(false),
  zoom: z.number().default(1),
  mode: z.enum(["edit", "preview", "publish"]).default("edit"),
});

export type BuilderState = z.infer<typeof BuilderStateSchema>;
