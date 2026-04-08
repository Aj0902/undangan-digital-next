"use client";

import React from "react";
import CanvasViewport from "./Canvas/CanvasViewport";
import Inspector from "./InspectorPanel/Inspector";

interface BuilderLayoutProps {
  className?: string;
}

export function BuilderLayout({ className = "" }: BuilderLayoutProps) {
  return (
    <div className={`h-screen flex bg-gray-50 dark:bg-gray-900 ${className}`}>
      {/* Main Canvas Area */}
      <div className="flex-1 relative">
        <CanvasViewport className="h-full" />
      </div>

      {/* Inspector Panel */}
      <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <Inspector className="h-full" />
      </div>
    </div>
  );
}

export default BuilderLayout;
