import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { 
  Plus,
  Users, 
  Search, 
  Filter, 
  ExternalLink, 
  MoreVertical, 
  CheckCircle2, 
  XCircle,
  Calendar,
  Eye,
  BarChart3,
  Paintbrush,
  Palette
} from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/types/client'


// shadcn/ui components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch clients with details
  const { data: clients } = await supabase
    .from('clients')
    .select('*, client_details(*)')
    .order('created_at', { ascending: false })

  // Fetch presets for stats
  const { data: presets } = await supabase
    .from('presets')
    .select('id')

  return (
    <div className="space-y-12 pb-20 relative min-h-screen">
      {/* Background Aurora for Dashboard */}
      <div className="fixed inset-0 bg-aurora -z-20" />
      <div className="noise-overlay" />
      
      {/* Arctic Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full point-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full point-events-none -z-10" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6">
        <div>
          <h1 className="text-6xl font-serif text-white tracking-widest uppercase flex flex-col md:flex-row md:items-baseline gap-4">
            Arctic <span className="italic text-emerald-400 text-4xl">Terminal</span>
          </h1>
          <p className="text-white/30 mt-4 text-[10px] font-bold tracking-[0.6em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-white/10"></span>
            Central Command Center
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-auto py-5 px-10 rounded-2xl shadow-xl shadow-emerald-900/40 uppercase tracking-[0.2em] text-[10px] transition-all transform hover:-translate-y-1">
            <Link href="/admin/klien/baru">
              <Plus className="w-4 h-4 mr-3" />
              Initialize New Client
            </Link>
          </Button>
        </div>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Registry', value: clients?.length || 0, icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/5' },
          { label: 'Cloud Live', value: clients?.filter(c => c.is_active).length || 0, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/5' },
          { label: 'Design Presets', value: presets?.length || 0, icon: Palette, color: 'text-amber-400', bg: 'bg-amber-500/5' },
          { label: 'Active Themes', value: new Set(clients?.map(c => c.template_id)).size || 0, icon: BarChart3, color: 'text-white/60', bg: 'bg-white/5' }
        ].map((stat, i) => (
          <div key={i} className="bg-black/40 backdrop-blur-3xl border border-white/5 p-8 relative rounded-[2.5rem] overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl">
            <div className={`absolute -right-4 -bottom-4 w-32 h-32 ${stat.bg} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="relative">
              <div className={`p-4 inline-block rounded-2xl ${stat.bg} mb-8 border border-white/5`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">{stat.label}</p>
              <h3 className="text-5xl font-bold text-white mt-3 font-serif tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Collection - Table (Desktop) / Cards (Mobile) */}
      <div className="bg-black/40 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden">
        <div className="p-8 md:p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <Input 
              type="text" 
              placeholder="SEARCH CLIENT IDENTIFIER..." 
              className="pl-12 bg-white/[0.03] border-white/5 rounded-2xl h-14 text-[10px] font-bold tracking-[0.2em] focus:ring-emerald-500/50"
            />
          </div>
          <div className="flex items-center justify-between md:justify-end gap-6">
            <span className="text-[10px] font-bold text-emerald-400/50 uppercase tracking-[0.4em]">
              {clients?.length || 0} SECURE RECORDS
            </span>
          </div>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden p-6 space-y-4">
          {clients?.map((client) => (
            <div key={client.id} className="bg-white/[0.03] p-6 rounded-[2rem] border border-white/5 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center font-serif text-xl font-bold text-emerald-400 aurora-glow">
                  {client.client_details?.bride_name?.[0]}{client.client_details?.groom_name?.[0]}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-white text-base truncate tracking-wide">
                    {client.client_details?.bride_name} & {client.client_details?.groom_name}
                  </h4>
                  <Link href={`/${client.slug}`} target="_blank" className="text-[10px] text-emerald-500/60 font-medium uppercase tracking-widest mt-1 block truncate">
                    /{client.slug}
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/50 p-3 rounded-xl border border-white/5">
                  <p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Theme</p>
                  <p className="text-[10px] font-bold text-white/60 truncate">{client.template_id}</p>
                </div>
                <div className="bg-black/50 p-3 rounded-xl border border-white/5">
                  <p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${client.is_active ? 'bg-emerald-400' : 'bg-red-500'} animate-pulse`} />
                    <p className={`text-[10px] font-bold ${client.is_active ? 'text-emerald-400' : 'text-red-400'} uppercase tracking-widest`}>
                      {client.is_active ? 'Live' : 'Draft'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button asChild className="flex-1 bg-white/[0.05] hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl h-12">
                  <Link href={`/admin/klien/${client.id}`}>Edit Details</Link>
                </Button>
                {client.template_type === 'dinamis' && (
                  <Button asChild className="w-12 h-12 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black rounded-xl border border-emerald-500/20">
                    <Link href={`/builder/${client.slug}`}>
                      <Paintbrush className="w-5 h-5" />
                    </Link>
                  </Button>
                )}
                <Button className="w-12 h-12 bg-white/[0.05] hover:bg-emerald-500/20 hover:text-emerald-400 rounded-xl">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-b border-white/5 hover:bg-transparent">
                <TableHead className="px-10 py-6 text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] h-auto">Client Identity</TableHead>
                <TableHead className="px-10 py-6 text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] h-auto">Architecture</TableHead>
                <TableHead className="px-10 py-6 text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] h-auto text-center">Cloud Status</TableHead>
                <TableHead className="px-10 py-6 text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] h-auto text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients?.map((client) => (
                <TableRow key={client.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <TableCell className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-black border border-white/5 flex items-center justify-center group-hover:border-emerald-500/40 transition-all aurora-glow">
                        <span className="font-serif font-bold text-white/40 text-xl group-hover:text-emerald-400">
                          {client.client_details?.bride_name?.[0]}{client.client_details?.groom_name?.[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg tracking-wide group-hover:translate-x-1 transition-transform">
                          {client.client_details?.bride_name} <span className="text-emerald-500/30">+</span> {client.client_details?.groom_name}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Slug //</span>
                          <Link href={`/${client.slug}`} target="_blank" className="text-[9px] font-bold text-emerald-500/60 hover:text-emerald-300 transition-colors uppercase tracking-widest">
                            {client.slug}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-10 py-8">
                    <div className="bg-white/5 inline-flex flex-col items-center px-5 py-2.5 rounded-2xl border border-white/5">
                      <span className="text-[8px] text-white/20 font-bold uppercase tracking-widest mb-1">Template</span>
                      <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">{client.template_id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-10 py-8">
                    <div className="flex justify-center">
                      <div className={`px-5 py-2.5 rounded-2xl flex items-center gap-3 border ${client.is_active ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-red-500/5 border-red-500/20 text-red-400'} shadow-lg`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${client.is_active ? 'bg-emerald-400' : 'bg-red-400'} ${client.is_active ? 'animate-pulse' : ''}`} />
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] font-sans">
                          {client.is_active ? 'Online' : 'Restricted'}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button asChild variant="outline" size="icon" className="bg-white/5 border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500 hover:text-emerald-400 rounded-xl h-12 w-12">
                        <Link href={`/admin/klien/${client.id}`}>
                          <Eye className="w-5 h-5" />
                        </Link>
                      </Button>
                      {client.template_type === 'dinamis' && (
                        <Button asChild variant="outline" size="icon" className="bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500 hover:text-black rounded-xl h-12 w-12">
                          <Link href={`/builder/${client.slug}`}>
                            <Paintbrush className="w-5 h-5" />
                          </Link>
                        </Button>
                      )}
                      <Button variant="outline" size="icon" className="bg-white/5 border-white/10 hover:bg-red-500/20 hover:border-red-500 hover:text-red-400 rounded-xl h-12 w-12">
                        <XCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

