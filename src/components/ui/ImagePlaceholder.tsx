'use client';

import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ImagePlaceholderProps {
  className?: string;
  iconSize?: number;
  text?: string;
}

export default function ImagePlaceholder({ 
  className,
  iconSize = 32,
  text
}: ImagePlaceholderProps) {
  return (
    <div className={cn(
      "w-full h-full min-h-[200px] aurora-placeholder flex flex-col items-center justify-center relative overflow-hidden group",
      className
    )}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col items-center z-10"
      >
        <ImageIcon size={iconSize} className="text-gold/60 mb-3 ml-2 group-hover:scale-110 transition-transform duration-700" strokeWidth={1} />
        {text && (
          <span className="uppercase tracking-[0.2em] text-[0.6rem] font-medium text-gold/70">{text}</span>
        )}
      </motion.div>
      
      {/* Efek Garis X Tipis untuk Kesan Abstrak Premium */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
