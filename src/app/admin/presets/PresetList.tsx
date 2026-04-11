"use client";

import React, { useTransition } from 'react';
import { 
  MoreVertical, 
  Copy, 
  Trash2, 
  Edit3,
  ExternalLink,
  Sparkles,
  Loader2,
  Palette
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast, Toaster } from 'sonner';
import { duplicatePresetAction, deletePresetAction } from '../preset-actions';
import { motion, AnimatePresence } from 'framer-motion';

interface PresetListProps {
  initialPresets: any[];
}

export function PresetList({ initialPresets }: PresetListProps) {
  const [isPending, startTransition] = useTransition();

  const handleDuplicate = (id: string) => {
    startTransition(async () => {
      const result = await duplicatePresetAction(id);
      if (result.error) toast.error(result.error);
      else toast.success('Blueprint duplicated successfully');
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this blueprint?')) return;
    startTransition(async () => {
      const result = await deletePresetAction(id);
      if (result.error) toast.error(result.error);
      else toast.success('Blueprint deleted');
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Toaster richColors theme="dark" />
      
      {initialPresets.length === 0 ? (
        <div className="col-span-full py-40 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
           <Palette className="w-16 h-16 text-white/5 mb-6" />
           <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">No Blueprints Detected in Registry</p>
           <Button asChild variant="link" className="mt-4 text-amber-500/50 hover:text-amber-400 uppercase tracking-widest text-[9px] font-bold">
             <Link href="/admin/preset-builder/new">Create Your First Piece →</Link>
           </Button>
        </div>
      ) : (
        initialPresets.map((preset, index) => (
          <motion.div 
            key={preset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative"
          >
            <div className="bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden group-hover:border-amber-500/30 transition-all duration-500 shadow-xl flex flex-col h-full">
              {/* Thumbnail Area - Converted to Typography Card */}
              <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black group-hover:shadow-[inset_0_0_100px_rgba(16,185,129,0.1)] transition-all duration-700">
                {/* Abstract Background Elements */}
                <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-aurora opacity-10 blur-[50px] group-hover:opacity-20 group-hover:scale-110 transition-all duration-1000 ease-out pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                
                {/* Typography Centerpiece */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <Sparkles className="w-8 h-8 text-white/40 group-hover:text-emerald-400 transition-colors duration-500" />
                  </div>
                  <h3 className="text-3xl font-serif text-white/90 font-medium tracking-wide drop-shadow-xl opacity-80 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 line-clamp-3">
                    {preset.nama_preset}
                  </h3>
                  {preset.kategori && (
                    <p className="mt-4 text-[10px] font-bold text-emerald-500/70 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 delay-100">
                      {preset.kategori}
                    </p>
                  )}
                </div>
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                  <Button asChild variant="outline" className="bg-white/10 border-white/20 hover:bg-white hover:text-black rounded-xl h-12 w-12 p-0">
                    <Link href={`/admin/preset-builder/${preset.id}`}>
                      <Edit3 className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDuplicate(preset.id)}
                    className="bg-white/10 border-white/20 hover:bg-amber-500 hover:text-black rounded-xl h-12 w-12 p-0"
                  >
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>

                <div className="absolute top-6 right-6">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 w-10 p-0 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 text-white/50 hover:text-white">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 rounded-2xl p-2 min-w-[160px] shadow-2xl">
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/10 cursor-pointer py-3">
                        <Link href={`/admin/preset-builder/${preset.id}`} className="flex items-center gap-3">
                          <Edit3 className="w-4 h-4 text-white/50" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Edit Blueprint</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDuplicate(preset.id)}
                        className="rounded-xl focus:bg-white/10 cursor-pointer py-3 flex items-center gap-3"
                      >
                        <Copy className="w-4 h-4 text-white/50" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Duplicate</span>
                      </DropdownMenuItem>
                      <div className="h-px bg-white/5 my-2 mx-2" />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(preset.id)}
                        className="rounded-xl focus:bg-red-500/20 cursor-pointer py-3 flex items-center gap-3 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Delete Record</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {preset.kategori && (
                  <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full">
                    <span className="text-[8px] font-bold text-amber-500/70 uppercase tracking-[0.2em]">{preset.kategori}</span>
                  </div>
                )}
              </div>

              {/* Info Area */}
              <div className="p-8 space-y-2">
                <h3 className="text-xl font-serif text-white group-hover:text-amber-400 transition-colors truncate">
                  {preset.nama_preset}
                </h3>
                <p className="text-[9px] text-white/20 uppercase tracking-widest font-sans font-bold">
                  Blueprint #ID_{preset.id.slice(0, 8)}
                </p>
              </div>
            </div>
            
            {/* Loading Overlay */}
            <AnimatePresence>
              {isPending && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-50 rounded-[2.5rem] flex items-center justify-center"
                >
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))
      )}
    </div>
  );
}
