import { MotionPreset } from "@/types/viding-v3";

export const MOTION_PRESETS = {
  fadeIn: {
    type: "fade",
    duration: 0.6,
    easing: "ease-out",
  } as MotionPreset,
  slideInUp: {
    type: "slide",
    duration: 0.8,
    easing: "ease-out",
  } as MotionPreset,
  zoomIn: {
    type: "zoom",
    duration: 0.7,
    easing: "ease-out",
  } as MotionPreset,
  bounce: {
    type: "bounce",
    duration: 1,
    easing: "ease-out",
    staggerChildren: 0.1,
  } as MotionPreset,
  parallaxSlow: {
    type: "custom",
    duration: 2,
    easing: "linear",
  } as MotionPreset,
  float: {
    type: "float",
    duration: 3,
    easing: "ease-in-out",
  } as MotionPreset,
  pulse: {
    type: "pulse",
    duration: 2,
    easing: "ease-in-out",
  } as MotionPreset,
} as const;

export const getMotionVariants = (preset: MotionPreset | undefined) => {
  if (!preset) return undefined;

  const baseTiming = {
    duration: preset.duration,
    delay: preset.delay,
    ease: translateEasing(preset.easing),
  };

  switch (preset.type) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: baseTiming },
      };
    case "slide":
      return {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: baseTiming },
      };
    case "zoom":
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: baseTiming },
      };
    case "rotate":
      return {
        hidden: { opacity: 0, rotate: -10 },
        visible: { opacity: 1, rotate: 0, transition: baseTiming },
      };
    case "bounce":
      return {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            ...baseTiming,
            delay: (preset.delay || 0) + (preset.staggerChildren || 0),
          },
        },
      };
    case "float":
      return {
        hidden: { y: 0 },
        visible: {
          y: [-10, 10, -10],
          transition: {
            ...baseTiming,
            repeat: Infinity,
            repeatType: "loop" as const,
          },
        },
      };
    case "pulse":
      return {
        hidden: { scale: 1 },
        visible: {
          scale: [1, 1.1, 1],
          transition: {
            ...baseTiming,
            repeat: Infinity,
            repeatType: "loop" as const,
          },
        },
      };
    default:
      return undefined;
  }
};

function translateEasing(easing: MotionPreset["easing"]) {
  const easingMap = {
    "ease-in": [0.42, 0, 1, 1],
    "ease-out": [0, 0, 0.58, 1],
    "ease-in-out": [0.42, 0, 0.58, 1],
    linear: [0, 0, 1, 1],
  } as const;
  return easingMap[easing];
}
