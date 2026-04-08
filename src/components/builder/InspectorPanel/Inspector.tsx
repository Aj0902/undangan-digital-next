"use client";

import React from "react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { Ornament } from "@/types/viding-v3";
import NumericSlider from "../PropertyControls/NumericSlider";
import ColorPicker from "../PropertyControls/ColorPicker";
import DropdownSelect from "../PropertyControls/DropdownSelect";
import ToggleSwitch from "../PropertyControls/ToggleSwitch";
import PropertyGroup from "../PropertyControls/PropertyGroup";
import { MOTION_PRESETS } from "@/utils/motion-presets";

interface InspectorProps {
  className?: string;
}

export function Inspector({ className = "" }: InspectorProps) {
  const {
    activeDocument,
    selectedSectionId,
    selectedElementId,
    inspectorTarget,
    updateOrnament,
  } = useBuilderStore();

  if (!activeDocument || !inspectorTarget) {
    return (
      <div
        className={`p-6 text-center text-gray-500 dark:text-gray-400 ${className}`}
      >
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎨</span>
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2">Select an Element</h3>
        <p className="text-sm">
          Click on an ornament or section to edit its properties
        </p>
      </div>
    );
  }

  const renderOrnamentInspector = () => {
    if (!selectedSectionId || !selectedElementId) return null;

    const section = activeDocument.sections[selectedSectionId];
    if (!section) return null;

    const ornament = section.ornaments.find((o) => o.id === selectedElementId);
    if (!ornament) return null;

    const handleUpdate = (updates: Partial<Ornament>) => {
      updateOrnament(selectedSectionId, selectedElementId, updates);
    };

    const motionOptions = Object.entries(MOTION_PRESETS).map(
      ([key, preset]) => ({
        value: key,
        label: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()),
      }),
    );

    return (
      <div className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ornament Properties
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {ornament.name} ({ornament.type})
          </p>
        </div>

        <PropertyGroup title="Position" defaultExpanded>
          <NumericSlider
            label="X Position"
            value={ornament.position.x}
            min={0}
            max={100}
            step={0.1}
            unit="%"
            onChange={(value) =>
              handleUpdate({ position: { ...ornament.position, x: value } })
            }
          />
          <NumericSlider
            label="Y Position"
            value={ornament.position.y}
            min={0}
            max={100}
            step={0.1}
            unit="%"
            onChange={(value) =>
              handleUpdate({ position: { ...ornament.position, y: value } })
            }
          />
        </PropertyGroup>

        <PropertyGroup title="Size & Rotation">
          <NumericSlider
            label="Width"
            value={ornament.size.width}
            min={10}
            max={500}
            step={1}
            unit="px"
            onChange={(value) =>
              handleUpdate({ size: { ...ornament.size, width: value } })
            }
          />
          <NumericSlider
            label="Height"
            value={ornament.size.height}
            min={10}
            max={500}
            step={1}
            unit="px"
            onChange={(value) =>
              handleUpdate({ size: { ...ornament.size, height: value } })
            }
          />
          <NumericSlider
            label="Rotation"
            value={ornament.rotation}
            min={0}
            max={360}
            step={1}
            unit="°"
            onChange={(value) => handleUpdate({ rotation: value })}
          />
        </PropertyGroup>

        <PropertyGroup title="Appearance">
          <NumericSlider
            label="Opacity"
            value={ornament.opacity}
            min={0}
            max={1}
            step={0.01}
            unit=""
            onChange={(value) => handleUpdate({ opacity: value })}
          />
          {ornament.type === "shape" && (
            <ColorPicker
              label="Fill Color"
              value={ornament.name}
              onChange={(value) => handleUpdate({ name: value })}
            />
          )}
        </PropertyGroup>

        <PropertyGroup title="Animation">
          <DropdownSelect
            label="Motion Preset"
            value={ornament.animation?.type || "fadeIn"}
            options={motionOptions}
            onChange={(value) => {
              const preset =
                MOTION_PRESETS[value as keyof typeof MOTION_PRESETS];
              handleUpdate({ animation: preset });
            }}
          />
          {ornament.animation && (
            <>
              <NumericSlider
                label="Duration"
                value={ornament.animation.duration}
                min={0.1}
                max={5}
                step={0.1}
                unit="s"
                onChange={(value) =>
                  handleUpdate({
                    animation: { ...ornament.animation!, duration: value },
                  })
                }
              />
              <NumericSlider
                label="Delay"
                value={ornament.animation.delay}
                min={0}
                max={3}
                step={0.1}
                unit="s"
                onChange={(value) =>
                  handleUpdate({
                    animation: { ...ornament.animation!, delay: value },
                  })
                }
              />
            </>
          )}
        </PropertyGroup>
      </div>
    );
  };

  const renderSectionInspector = () => {
    if (!selectedSectionId) return null;

    const section = activeDocument.sections[selectedSectionId];
    if (!section) return null;

    return (
      <div className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Section Properties
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Cover Section
          </p>
        </div>

        <PropertyGroup title="Background">
          <ColorPicker
            label="Background Color"
            value={section.backgroundColor}
            onChange={(value) => {
              // This would need to be implemented in the store
              console.log("Update section background:", value);
            }}
          />
        </PropertyGroup>

        <PropertyGroup title="Content">
          {section.type === "cover" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Main Text
              </label>
              <textarea
                value={section.content.mainText}
                onChange={(e) => {
                  // This would need to be implemented in the store
                  console.log("Update main text:", e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                rows={2}
              />
            </div>
          )}
        </PropertyGroup>
      </div>
    );
  };

  return (
    <div
      className={`h-full overflow-y-auto bg-white dark:bg-gray-900 ${className}`}
    >
      <div className="p-6">
        {inspectorTarget.type === "ornament" && renderOrnamentInspector()}
        {inspectorTarget.type === "section" && renderSectionInspector()}
      </div>
    </div>
  );
}

export default Inspector;
