'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Spotlight yang mengikuti kursor */}
      <motion.div
        className="absolute inset-0 opacity-40 transition-opacity duration-300"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.03), transparent 40%)`,
        }}
        transition={{ type: 'tween', duration: 0 }}
      />
      
      {/* Partikel melayang halus (Debu estetik / Film burn) */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-64 h-64 bg-neutral-300/10 rounded-full blur-3xl mix-blend-multiply"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-neutral-300/10 rounded-full blur-3xl mix-blend-multiply"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}
