"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { CoverSectionRenderer } from "@/templates/viding-v3/sections/cover";
import { MempelaiSectionRenderer } from "@/templates/viding-v3/sections/mempelai";
import { GaleriSectionRenderer } from "@/templates/viding-v3/sections/galeri";
import { Ornament } from "@/types/viding-v3";

interface CanvasViewportProps {
  className?: string;
}

export function CanvasViewport({ className = "" }: CanvasViewportProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    activeDocument,
    selectedSectionId,
    selectedElementId,
    canvasZoom,
    setInspectorTarget,
    selectSection,
    selectOrnament,
    setCanvasZoom,
    deleteOrnament,
    updateOrnament,
  } = useBuilderStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts when canvas is focused or no input is focused
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (e.key) {
        case "Delete":
        case "Backspace":
          if (selectedElementId && selectedSectionId) {
            e.preventDefault();
            deleteOrnament(selectedSectionId, selectedElementId);
          }
          break;
        case "Escape":
          setInspectorTarget(null);
          selectSection(undefined);
          selectOrnament(undefined);
          break;
        case "+":
        case "=":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setCanvasZoom(Math.min(2, canvasZoom + 0.1));
          }
          break;
        case "-":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setCanvasZoom(Math.max(0.5, canvasZoom - 0.1));
          }
          break;
        case "0":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setCanvasZoom(1);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedElementId,
    selectedSectionId,
    canvasZoom,
    setCanvasZoom,
    deleteOrnament,
    setInspectorTarget,
    selectSection,
    selectOrnament,
  ]);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      // If clicking on canvas background, deselect everything
      if (e.target === canvasRef.current) {
        setInspectorTarget(null);
        selectSection(undefined);
        selectOrnament(undefined);
      }
    },
    [setInspectorTarget, selectSection, selectOrnament],
  );

  const handleSectionClick = useCallback(
    (sectionId: string) => {
      selectSection(sectionId);
      setInspectorTarget({ type: "section", id: sectionId });
      selectOrnament(undefined);
    },
    [selectSection, setInspectorTarget, selectOrnament],
  );

  const handleOrnamentClick = useCallback(
    (ornamentId: string) => {
      selectOrnament(ornamentId);
      setInspectorTarget({ type: "ornament", id: ornamentId });
    },
    [selectOrnament, setInspectorTarget],
  );

  const handleOrnamentUpdate = useCallback(
    (ornamentId: string, updates: Partial<Ornament>) => {
      if (selectedSectionId) {
        updateOrnament(selectedSectionId, ornamentId, updates);
      }
    },
    [selectedSectionId, updateOrnament],
  );

  if (!activeDocument) {
    return (
      <div
        className={`flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800 ${className}`}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Document Loaded
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Create a new document to start building
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-full bg-gray-100 dark:bg-gray-800 ${className}`}
    >
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
        <button
          onClick={() => setCanvasZoom(Math.min(2, canvasZoom + 0.1))}
          className="w-8 h-8 bg-white dark:bg-gray-700 rounded shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300"
          title="Zoom In"
        >
          <span className="text-sm font-bold">+</span>
        </button>
        <button
          onClick={() => setCanvasZoom(Math.max(0.5, canvasZoom - 0.1))}
          className="w-8 h-8 bg-white dark:bg-gray-700 rounded shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300"
          title="Zoom Out"
        >
          <span className="text-sm font-bold">−</span>
        </button>
        <button
          onClick={() => setCanvasZoom(1)}
          className="w-8 h-8 bg-white dark:bg-gray-700 rounded shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs"
          title="Reset Zoom"
        >
          100%
        </button>
      </div>

      {/* Canvas Content */}
      <div
        ref={canvasRef}
        className="relative overflow-auto h-full"
        onClick={handleCanvasClick}
        style={{
          transform: `scale(${canvasZoom})`,
          transformOrigin: "top left",
          transition: "transform 0.2s ease",
        }}
      >
        <div className="min-h-full p-8">
          <div className="max-w-4xl mx-auto">
            {activeDocument.sectionOrder.map((sectionId) => {
              const section = activeDocument.sections[sectionId];
              if (!section) return null;
              if (section.type === "cover") {
                return (
                  <CoverSectionRenderer
                    key={section.id}
                    section={section}
                    isSelected={selectedSectionId === section.id}
                    onSelect={() => handleSectionClick(section.id)}
                    onOrnamentSelect={handleOrnamentClick}
                    onOrnamentUpdate={handleOrnamentUpdate}
                    selectedOrnamentId={selectedElementId}
                  />
                );
              }
              if (section.type === "mempelai") {
                return (
                  <MempelaiSectionRenderer
                    key={section.id}
                    section={section}
                    isSelected={selectedSectionId === section.id}
                    onSelect={() => handleSectionClick(section.id)}
                    onOrnamentSelect={handleOrnamentClick}
                    onOrnamentUpdate={handleOrnamentUpdate}
                    selectedOrnamentId={selectedElementId}
                  />
                );
              }
              if (section.type === "galeri") {
                return (
                  <GaleriSectionRenderer
                    key={section.id}
                    section={section}
                    isSelected={selectedSectionId === section.id}
                    onSelect={() => handleSectionClick(section.id)}
                    onOrnamentSelect={handleOrnamentClick}
                    onOrnamentUpdate={handleOrnamentUpdate}
                    selectedOrnamentId={selectedElementId}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      {/* Canvas overlay for guides */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 w-px h-8 bg-blue-500 transform -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute top-1/2 left-1/2 h-px w-8 bg-blue-500 transform -translate-x-1/2 -translate-y-1/2 opacity-50" />

        {/* Grid overlay (optional) */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  );
}

export default CanvasViewport;
