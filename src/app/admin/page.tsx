import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { 
  Users, 
  Search, 
  Filter, 
  ExternalLink, 
  MoreVertical, 
  CheckCircle2, 
  XCircle,
  Calendar,
  Eye
} from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/types/client'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch clients with details
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*, client_details(*)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching clients:', error)
  }

  return (
    <div className="space-y-10 relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[100px] rounded-full point-events-none -z-10" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif text-white tracking-tight uppercase">Dashboard <span className="font-sans italic text-amber-500 text-3xl">Directory</span></h1>
          <p className="text-white/40 mt-2 text-sm font-bold tracking-widest uppercase">Admin / Data Center</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/klien/baru" 
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-extrabold px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transform hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest text-xs"
          >
            <Users className="w-5 h-5" />
            New Client
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Clients', value: clients?.length || 0, icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'shadow-[0_0_30px_rgba(245,158,11,0.1)]' },
          { label: 'Active Pages', value: clients?.filter(c => c.is_active).length || 0, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-[0_0_30px_rgba(52,211,153,0.1)]' },
          { label: 'Themes Applied', value: new Set(clients?.map(c => c.template_id)).size || 0, icon: BarChart3, color: 'text-white/80', bg: 'bg-white/5', glow: 'shadow-[0_0_30px_rgba(255,255,255,0.05)]' }
        ].map((stat, i) => (
          <div key={i} className={`bg-[#111]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 ${stat.glow} transition-all group overflow-hidden relative`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150`}></div>
            <div className="relative">
              <div className={`p-3 inline-block rounded-2xl ${stat.bg} mb-6`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{stat.label}</p>
              <h3 className="text-4xl font-extrabold text-white mt-2 font-serif">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-[#111] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search slug or name..." 
                className="pl-11 pr-6 py-3 bg-black/50 border border-white/10 rounded-2xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none text-white text-sm w-full md:w-80"
              />
            </div>
          </div>
          <p className="text-[10px] font-bold text-amber-500/70 border border-amber-500/20 bg-amber-500/10 px-4 py-2 rounded-xl uppercase tracking-widest">
            {clients?.length || 0} Records Found
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/30">
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] border-b border-white/5">Client</th>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] border-b border-white/5">Theme</th>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] border-b border-white/5">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] border-b border-white/5">Created</th>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] border-b border-white/5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clients?.map((client) => (
                <tr key={client.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all">
                        <span className="font-serif font-bold text-white/60 text-lg group-hover:text-amber-500 transition-colors">
                          {client.client_details?.bride_name?.[0] || '?'}{client.client_details?.groom_name?.[0] || '?'}
                        </span>
                      </div>
                      <div>
                        <p className="font-extrabold text-white text-base leading-none tracking-wide">
                          {client.client_details?.bride_name} & {client.client_details?.groom_name}
                        </p>
                        <Link 
                          href={`/${client.slug}`} 
                          target="_blank" 
                          className="text-xs font-bold text-amber-500/70 hover:text-amber-400 flex items-center gap-1.5 mt-2 transition-colors uppercase tracking-widest"
                        >
                          /{client.slug}
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 uppercase tracking-widest">
                      {client.template_id}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {client.is_active ? (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 uppercase tracking-widest">
                        <XCircle className="w-3.5 h-3.5" />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-white/40">
                      <Calendar className="w-4 h-4 text-white/20" />
                      <span className="text-[11px] font-bold uppercase tracking-widest">{formatDate(client.created_at)}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                       <Link 
                         href={`/admin/klien/${client.id}`} 
                         className="p-3 bg-black/50 border border-white/5 text-white/50 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-500 rounded-xl transition-all duration-300 transform hover:scale-105"
                       >
                         <Eye className="w-5 h-5" />
                       </Link>
                       <button className="p-3 bg-black/50 border border-white/5 text-white/50 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-105">
                         <MoreVertical className="w-5 h-5" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!clients || clients.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center">
                      <div className="p-6 bg-white/5 border border-white/10 rounded-full mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        <Users className="w-10 h-10 text-white/20" />
                      </div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-widest">No Records Found</h3>
                      <p className="text-white/40 mt-2 text-sm font-medium">Add a new client to build your directory.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Stats icon placeholder
function BarChart3(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  )
}
