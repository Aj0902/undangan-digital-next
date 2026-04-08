"use client";

import React, { useEffect } from "react";
import { useBuilderStore } from "@/store/useBuilderStore";
import BuilderLayout from "@/components/builder/BuilderLayout";
import { VidingDocument } from "@/types/viding-v3";

const INITIAL_DOCUMENT: VidingDocument = {
  id: "builder-doc-1",
  version: "3.0",
  name: "New Invitation",
  description: "Custom invitation design",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  sectionOrder: ["cover-1"],
  sections: {
    "cover-1": {
      type: "cover",
      id: "cover-1",
      title: "Cover",
      background: {
        type: "image",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        effect: "none",
      },
      backgroundColor: "#1a1f3d",
      backgroundOverlay: {
        enabled: true,
        color: "#000000",
        opacity: 0.4,
      },
      layout: "center",
      content: {
        mainText: "Your Names Here",
        subText: "Your Special Day",
        ctaButton: {
          label: "View Details",
          action: "scroll",
        },
      },
      ornaments: [
        {
          id: "ornament-1",
          type: "shape",
          name: "#ec4899",
          position: { x: 15, y: 20 },
          size: { width: 60, height: 60 },
          rotation: 0,
          opacity: 0.8,
          zIndex: 1,
          animation: {
            type: "bounce",
            duration: 1.5,
            delay: 0,
            easing: "ease-out",
          },
        },
        {
          id: "ornament-2",
          type: "shape",
          name: "#f59e0b",
          position: { x: 75, y: 75 },
          size: { width: 50, height: 50 },
          rotation: 45,
          opacity: 0.7,
          zIndex: 1,
          animation: {
            type: "bounce",
            duration: 1.8,
            delay: 0.3,
            easing: "ease-out",
          },
        },
      ],
      motion: {
        entrance: {
          type: "fade",
          duration: 1,
          delay: 0,
          easing: "ease-out",
        },
        elements: {
          type: "slide",
          duration: 0.8,
          delay: 0.3,
          easing: "ease-out",
        },
      },
    },
  },
  globalSettings: {
    primaryColor: "#1a2e25",
    accentColor: "#d4af37",
    fontFamily: "Cormorant Garamond",
  },
};

export default function BuilderPage() {
  const { setActiveDocument, activeDocument } = useBuilderStore();

  useEffect(() => {
    if (!activeDocument) {
      setActiveDocument(INITIAL_DOCUMENT);
    }
  }, [activeDocument, setActiveDocument]);

  return <BuilderLayout />;
}
