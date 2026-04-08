"use client";

import React from "react";
import { VidingDocument, Section } from "@/types/viding-v3";
import CoverSectionRenderer from "./sections/cover";
import MempelaiSectionRenderer from "./sections/mempelai";
import GaleriSectionRenderer from "./sections/galeri";

interface VidingTemplateProps {
  document: VidingDocument;
  mode?: "preview" | "edit";
  onSectionSelect?: (sectionId: string) => void;
  onOrnamentSelect?: (ornamentId: string) => void;
  selectedSectionId?: string;
  selectedOrnamentId?: string;
}

export function VidingTemplate({
  document,
  mode = "preview",
  onSectionSelect,
  onOrnamentSelect,
  selectedSectionId,
  selectedOrnamentId,
}: VidingTemplateProps) {
  const renderSection = (section: Section | undefined) => {
    if (!section) return null;
    const isSelected = selectedSectionId === section.id;

    switch (section.type) {
      case "cover":
        return (
          <CoverSectionRenderer
            key={section.id}
            section={section}
            isSelected={isSelected && mode === "edit"}
            onSelect={() => onSectionSelect?.(section.id)}
            onOrnamentSelect={onOrnamentSelect}
            selectedOrnamentId={selectedOrnamentId}
          />
        );
      case "mempelai":
        return (
          <MempelaiSectionRenderer
            key={section.id}
            section={section}
            isSelected={isSelected && mode === "edit"}
            onSelect={() => onSectionSelect?.(section.id)}
            onOrnamentSelect={onOrnamentSelect}
            selectedOrnamentId={selectedOrnamentId}
          />
        );
      case "galeri":
        return (
          <GaleriSectionRenderer
            key={section.id}
            section={section}
            isSelected={isSelected && mode === "edit"}
            onSelect={() => onSectionSelect?.(section.id)}
            onOrnamentSelect={onOrnamentSelect}
            selectedOrnamentId={selectedOrnamentId}
          />
        );
      default:
        return (
          <section
            key={(section as any).id}
            className="min-h-screen flex items-center justify-center"
          >
            <div className="text-center px-6">
              <h2 className="text-2xl font-bold">
                Section Type {(section as any).type} not implemented
              </h2>
            </div>
          </section>
        );
    }
  };

  return (
    <div>
      {document.sectionOrder
        .map((sectionId) => renderSection(document.sections[sectionId]))
        .filter(Boolean)}
    </div>
  );
}

export default VidingTemplate;
