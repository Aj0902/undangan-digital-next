import { z } from "zod";

export const MotionPresetSchema = z.object({
  type: z.enum(["fade", "slide", "zoom", "rotate", "bounce", "float", "pulse", "custom"]),
  duration: z.number().default(0.6),
  delay: z.number().default(0),
  easing: z
    .enum(["ease-in", "ease-out", "ease-in-out", "linear"])
    .default("ease-out"),
  staggerChildren: z.number().optional(),
});

export type MotionPreset = z.infer<typeof MotionPresetSchema>;

export const OrnamentSchema = z.object({
  id: z.string(),
  type: z.enum(["icon", "shape", "svg", "image"]),
  name: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  size: z.object({
    width: z.number(),
    height: z.number(),
  }),
  rotation: z.number().default(0),
  opacity: z.number().min(0).max(1).default(1),
  zIndex: z.number().default(0),
  animation: MotionPresetSchema.optional(),
});

export type Ornament = z.infer<typeof OrnamentSchema>;

export const CoverSectionSchema = z.object({
  type: z.literal("cover"),
  id: z.string(),
  title: z.string().optional(),
  background: z
    .object({
      type: z.enum(["image", "video"]).default("image"),
      url: z.string().url(),
      fallbackImage: z.string().url().optional(),
      effect: z.enum(["none", "aurora"]).default("none"),
    })
    .optional(),
  backgroundColor: z.string().default("#ffffff"),
  backgroundOverlay: z
    .object({
      enabled: z.boolean().default(false),
      color: z.string().default("#000000"),
      opacity: z.number().min(0).max(1).default(0.3),
    })
    .optional(),
  layout: z.enum(["center", "top", "bottom"]).default("center"),
  content: z.object({
    mainText: z.string(),
    subText: z.string().optional(),
    ctaButton: z
      .object({
        label: z.string().default("Buka Undangan"),
        action: z.enum(["scroll", "modal", "link"]).default("scroll"),
      })
      .optional(),
  }),
  ornaments: z.array(OrnamentSchema).default([]),
  motion: z
    .object({
      entrance: MotionPresetSchema.optional(),
      background: MotionPresetSchema.optional(),
      elements: MotionPresetSchema.optional(),
    })
    .optional(),
  customCSS: z.string().optional(),
});

export type CoverSection = z.infer<typeof CoverSectionSchema>;

export const MempelaiSectionSchema = z.object({
  type: z.literal("mempelai"),
  id: z.string(),
  title: z.string().optional(),
  backgroundImage: z.string().url().optional(),
  backgroundColor: z.string().default("#ffffff"),
  backgroundOverlay: z
    .object({
      enabled: z.boolean().default(false),
      color: z.string().default("#000000"),
      opacity: z.number().min(0).max(1).default(0.3),
    })
    .optional(),
  layout: z.enum(["center", "top", "bottom"]).default("center"),
  content: z.object({
    title: z.string().default("Mempelai"),
    pria: z.object({
      name: z.string(),
      parents: z.string(),
      photo: z.string().url().optional(),
    }),
    wanita: z.object({
      name: z.string(),
      parents: z.string(),
      photo: z.string().url().optional(),
    }),
    story: z.string().optional(),
  }),
  ornaments: z.array(OrnamentSchema).default([]),
  motion: z
    .object({
      entrance: MotionPresetSchema.optional(),
      background: MotionPresetSchema.optional(),
      elements: MotionPresetSchema.optional(),
    })
    .optional(),
  customCSS: z.string().optional(),
});

export type MempelaiSection = z.infer<typeof MempelaiSectionSchema>;

export const GaleriSectionSchema = z.object({
  type: z.literal("galeri"),
  id: z.string(),
  title: z.string().optional(),
  backgroundImage: z.string().url().optional(),
  backgroundColor: z.string().default("#ffffff"),
  backgroundOverlay: z
    .object({
      enabled: z.boolean().default(false),
      color: z.string().default("#000000"),
      opacity: z.number().min(0).max(1).default(0.3),
    })
    .optional(),
  layout: z.enum(["center", "top", "bottom"]).default("center"),
  content: z.object({
    title: z.string().default("Galeri"),
    images: z
      .array(
        z.object({
          url: z.string().url(),
          caption: z.string().optional(),
        }),
      )
      .default([]),
    description: z.string().optional(),
  }),
  ornaments: z.array(OrnamentSchema).default([]),
  motion: z
    .object({
      entrance: MotionPresetSchema.optional(),
      background: MotionPresetSchema.optional(),
      elements: MotionPresetSchema.optional(),
    })
    .optional(),
  customCSS: z.string().optional(),
});

export type GaleriSection = z.infer<typeof GaleriSectionSchema>;

export const SectionSchema = z.discriminatedUnion("type", [
  CoverSectionSchema,
  MempelaiSectionSchema,
  GaleriSectionSchema,
]);

export type Section = z.infer<typeof SectionSchema>;

export const VidingDocumentSchema = z.object({
  id: z.string().uuid(),
  version: z.literal("3.0"),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  sectionOrder: z.array(z.string()).default(["cover"]),
  sections: z.record(z.string(), SectionSchema),
  globalSettings: z
    .object({
      primaryColor: z.string().default("#1a2e25"),
      accentColor: z.string().default("#d4af37"),
      fontFamily: z.string().default("Cormorant Garamond"),
      breakpoints: z
        .object({
          mobile: z.number().default(640),
          tablet: z.number().default(1024),
          desktop: z.number().default(1280),
        })
        .optional(),
    })
    .optional(),
});

export type VidingDocument = z.infer<typeof VidingDocumentSchema>;

export const BuilderStateSchema = z.object({
  activeDocument: VidingDocumentSchema.optional(),
  selectedSectionId: z.string().optional(),
  selectedElementId: z.string().optional(),
  isDirty: z.boolean().default(false),
  zoom: z.number().default(1),
  mode: z.enum(["edit", "preview", "publish"]).default("edit"),
});

export type BuilderState = z.infer<typeof BuilderStateSchema>;
