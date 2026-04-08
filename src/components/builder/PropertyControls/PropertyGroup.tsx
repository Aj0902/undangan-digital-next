"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface PropertyGroupProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export function PropertyGroup({
  title,
  children,
  defaultExpanded = true,
  className = "",
}: PropertyGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={`border border-gray-200 rounded-lg dark:border-gray-700 ${className}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform text-gray-500 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && <div className="px-4 pb-4 space-y-4">{children}</div>}
    </div>
  );
}

export default PropertyGroup;
