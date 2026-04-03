'use client';

import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
  staggerChildren?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = '',
  staggerChildren,
}: FadeInProps) {
  
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
    none: { x: 0, y: 0 }
  };

  const hidden = {
    opacity: 0,
    ...directions[direction]
  };

  const visible: any = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: duration || 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94], // Smooth ease Out
      ...(staggerChildren && { staggerChildren })
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{ hidden, visible }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
