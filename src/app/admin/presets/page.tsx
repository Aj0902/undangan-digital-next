import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { 
  Plus, 
  Palette, 
  Search, 
  MoreVertical, 
  Copy, 
  Trash2, 
  Edit3,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PresetList } from './PresetList'

export default async function PresetsGalleryPage() {
  const supabase = await createClient()

  // Fetch all presets
  const { data: presets } = await supabase
    .from('presets')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-12 pb-20 relative min-h-screen">
      {/* Background Aurora */}
      <div className="fixed inset-0 bg-aurora -z-20 opacity-30" />
      
      {/* Arctic Lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none -z-10" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6">
        <div>
          <h1 className="text-5xl font-serif text-white tracking-widest uppercase flex flex-col md:flex-row md:items-baseline gap-4">
            Preset <span className="italic text-amber-500 text-3xl font-sans uppercase tracking-[0.2em]">Factory</span>
          </h1>
          <p className="text-white/30 mt-4 text-[10px] font-bold tracking-[0.6em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-white/10"></span>
            Design Library & Blueprints
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild className="bg-amber-500 hover:bg-amber-400 text-black font-bold h-auto py-5 px-10 rounded-2xl shadow-xl shadow-amber-900/20 uppercase tracking-[0.2em] text-[10px] transition-all transform hover:-translate-y-1">
            <Link href="/admin/preset-builder/new">
              <Plus className="w-4 h-4 mr-3" />
              Craft New Blueprint
            </Link>
          </Button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-black/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <Input 
            type="text" 
            placeholder="FILTER BY PRESET NAME..." 
            className="pl-14 bg-white/[0.03] border-white/5 rounded-2xl h-14 text-[10px] font-bold tracking-[0.2em] focus:ring-amber-500/50"
          />
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-bold text-amber-500/50 uppercase tracking-[0.4em]">
            {presets?.length || 0} MASTER BLUEPRINTS
          </span>
        </div>
      </div>

      {/* Preset Grid (Client Component for Interactions) */}
      <PresetList initialPresets={presets || []} />
    </div>
  )
}
