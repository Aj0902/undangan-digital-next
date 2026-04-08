"use client";

import React, { useState, useCallback } from "react";
import { Ornament } from "@/types/viding-v3";
import { motion } from "framer-motion";
import { getMotionVariants } from "@/utils/motion-presets";

interface OrnamentProps {
  ornament: Ornament;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onUpdate?: (updates: Partial<Ornament>) => void;
}

export function OrnamentRenderer({
  ornament,
  isSelected = false,
  onSelect,
  onUpdate,
}: OrnamentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const motionVariants = getMotionVariants(ornament.animation);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isSelected || !onUpdate) return;

      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      onSelect?.(ornament.id);
    },
    [isSelected, onUpdate, onSelect, ornament.id],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !onUpdate) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      // Convert pixel movement to percentage (assuming container is ~800px wide)
      const containerWidth = 800;
      const containerHeight = 600;
      const percentX = (deltaX / containerWidth) * 100;
      const percentY = (deltaY / containerHeight) * 100;

      const newX = Math.max(-50, Math.min(150, ornament.position.x + percentX));
      const newY = Math.max(-50, Math.min(150, ornament.position.y + percentY));

      onUpdate({
        position: { x: newX, y: newY },
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [isDragging, dragStart, onUpdate, ornament.position],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse event listeners when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove as any);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove as any);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const baseStyle = {
    position: "absolute" as const,
    left: `${ornament.position.x}%`,
    top: `${ornament.position.y}%`,
    width: `${ornament.size.width}px`,
    height: `${ornament.size.height}px`,
    rotate: ornament.rotation,
    opacity: ornament.opacity,
    zIndex: ornament.zIndex,
    transform: "translate(-50%, -50%)",
    cursor: onSelect ? "pointer" : "default",
  };

  const selectionStyle = isSelected
    ? {
        boxShadow: "0 0 0 2px #3B82F6, 0 0 0 6px rgba(59, 130, 246, 0.2)",
        borderRadius: "8px",
      }
    : {};

  const renderResizeHandles = () => {
    if (!isSelected) return null;

    const handles = [
      { position: "top-left", cursor: "nw-resize" },
      { position: "top-right", cursor: "ne-resize" },
      { position: "bottom-left", cursor: "sw-resize" },
      { position: "bottom-right", cursor: "se-resize" },
    ];

    return (
      <>
        {handles.map((handle) => (
          <div
            key={handle.position}
            className={`absolute w-3 h-3 bg-blue-500 border-2 border-white rounded-full ${handle.cursor}`}
            style={{
              ...getHandlePosition(handle.position),
              zIndex: 1000,
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ))}
      </>
    );
  };

  const getHandlePosition = (position: string) => {
    const offset = -6; // Half of handle size + border
    switch (position) {
      case "top-left":
        return { top: offset, left: offset };
      case "top-right":
        return { top: offset, right: offset };
      case "bottom-left":
        return { bottom: offset, left: offset };
      case "bottom-right":
        return { bottom: offset, right: offset };
      default:
        return {};
    }
  };

  const renderContent = () => {
    switch (ornament.type) {
      case "icon":
        return (
          <div className="w-full h-full flex items-center justify-center text-white text-2xl">
            🌸
          </div>
        );
      case "shape":
        return (
          <div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: ornament.name || "#F472B6" }}
          />
        );
      case "svg":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="40" />
          </svg>
        );
      case "image":
        return (
          <img
            src={ornament.name}
            alt="Ornament"
            className="w-full h-full object-cover rounded"
          />
        );
      default:
        return <div className="w-full h-full bg-white" />;
    }
  };

  return (
    <motion.div
      style={{ ...baseStyle, ...selectionStyle }}
      variants={motionVariants}
      initial="hidden"
      animate="visible"
      onClick={() => onSelect?.(ornament.id)}
      onMouseDown={handleMouseDown}
      whileHover={{ scale: isDragging ? 1 : 1.05 }}
      whileTap={{ scale: 0.96 }}
    >
      {renderContent()}
      {renderResizeHandles()}
    </motion.div>
  );
}

export default OrnamentRenderer;
