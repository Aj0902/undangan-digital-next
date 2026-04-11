import React from "react";
import { Client } from "@/types/client";
import { Section } from "@/types/viding-v3";

// Cover Variants
import CoverDefault from "./Cover/variants/Default";
import CoverMinimalist from "./Cover/variants/Minimalist";

// Mempelai Variants
import MempelaiDefault from "./Mempelai/variants/Default";

// Galeri Variants
import GaleriDefault from "./Galeri/variants/Default";

// Acara Variants
import AcaraDefault from "./Acara/variants/Default";

// RSVP Variants
import RSVPDefault from "./RSVP/variants/Default";

// DigitalGift Variants (NEW)
import DigitalGiftDefault from "./DigitalGift/variants/Default";

// LoveStory Variants (NEW)
import LoveStoryDefault from "./LoveStory/variants/Default";

// Closing Variants (NEW)
import ClosingDefault from "./Closing/variants/Default";

// Define the signature of what a widget variant should look like
export interface WidgetProps {
  clientData: Client;
  section: Section;
  accentColor?: string;
  primaryColor?: string;
  isSelected?: boolean;
  // Cover-specific props (Opening merger)
  isOpened?: boolean;
  onOpen?: () => void;
}

// Registry maps [type][variant] to a React Component
export const WIDGET_REGISTRY: Record<string, Record<string, React.FC<any>>> = {
  cover: {
    default: CoverDefault,
    minimalist: CoverMinimalist,
  },
  mempelai: {
    default: MempelaiDefault,
  },
  galeri: {
    default: GaleriDefault,
  },
  acara: {
    default: AcaraDefault,
  },
  rsvp: {
    default: RSVPDefault,
  },
  gift: {
    default: DigitalGiftDefault,
  },
  lovestory: {
    default: LoveStoryDefault,
  },
  closing: {
    default: ClosingDefault,
  },
  // 'opening' type is DEPRECATED — Opening is now built into Cover widget.
  // Old presets with 'opening' sections are auto-cleaned in useBuilderStore.initDocument().
};

export function getWidgetComponent(type: string, variant: string = "default"): React.FC<any> | null {
  const typeVariants = WIDGET_REGISTRY[type];
  if (!typeVariants) return null;
  
  // Return requested variant or fallback to 'default', or fallback to the first available if 'default' is missing
  return typeVariants[variant] || typeVariants["default"] || Object.values(typeVariants)[0] || null;
}
