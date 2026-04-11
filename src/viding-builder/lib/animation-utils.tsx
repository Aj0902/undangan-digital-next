import React from "react";

export const getAnimationProps = (animate: string) => {
  switch (animate) {
    case "float":
      return {
        animate: { y: [0, -15, 0] },
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      };
    case "pulse":
      return {
        animate: { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      };
    case "spin":
      return {
        animate: { rotate: [0, 360] },
        transition: { duration: 20, repeat: Infinity, ease: "linear" },
      };
    case "bounce":
      return {
        animate: { y: [0, -10, 0] },
        transition: { duration: 1.5, repeat: Infinity, ease: "easeOut" },
      };
    case "shake":
      return {
        animate: { x: [-2, 2, -2, 2, 0] },
        transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
      };
    case "aurora":
      return {
        animate: {
          filter: [
            "hue-rotate(0deg) brightness(1)",
            "hue-rotate(90deg) brightness(1.2)",
            "hue-rotate(0deg) brightness(1)",
          ],
          scale: [1, 1.05, 1],
        },
        transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
      };
    default:
      return {};
  }
};

const ORNAMENT_LIB: Record<string, (color: string) => React.ReactNode> = {
  "bunga-sudut": (color) => (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
      <path
        d="M50 0C60 30 80 40 100 50C80 60 60 70 50 100C40 70 20 60 0 50C20 40 40 30 50 0Z"
        fill={color}
        opacity="0.9"
      />
      <circle cx="50" cy="50" r="8" fill="#fff" opacity="0.6" />
    </svg>
  ),
  "daun-emas": (color) => (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
      <path
        d="M10 90C10 50 50 10 90 10C90 50 50 90 10 90Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M10 90L90 10" stroke={color} strokeWidth="2" opacity="0.5" />
    </svg>
  ),
};

export const renderOrnamentFallback = (type: string, color: string) => {
  return ORNAMENT_LIB[type] ? ORNAMENT_LIB[type](color) : null;
};
