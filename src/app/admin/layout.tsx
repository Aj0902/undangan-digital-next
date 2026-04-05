import React from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  PlusCircle, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { signOutAction } from './actions'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const navItems = [
    { name: 'Dashboard', icon: BarChart3, href: '/admin' },
    { name: 'Daftar Klien', icon: Users, href: '/admin' },
    { name: 'Tambah Klien', icon: PlusCircle, href: '/admin/klien/baru' },
  ]

  return (
    <div className="flex min-h-screen bg-[#050505] font-sans selection:bg-amber-500/30">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 text-white/70 flex flex-col fixed h-full z-20">
        <div className="p-8 flex items-center gap-3 border-b border-white/5 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-amber-500/5 blur-[30px] z-0"></div>
          
          <div className="p-2.5 bg-amber-500/10 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.2)] border border-amber-500/20 relative z-10">
            <ShieldCheck className="w-6 h-6 text-amber-500" />
          </div>
          <div className="relative z-10">
            <h2 className="text-white font-serif tracking-tight text-lg leading-none uppercase">Admin <span className="text-amber-500 italic font-sans">Vogue</span></h2>
            <p className="text-[9px] uppercase font-bold text-amber-500/70 mt-1 tracking-[0.2em]">SaaS Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 hover:bg-white/5 hover:text-amber-400 group"
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <span className="font-bold text-sm tracking-wide">{item.name}</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 mt-auto bg-[#0a0a0a]">
          {user && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#111] border border-white/10 mb-6">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                <span className="text-amber-500 font-bold text-xs">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{user.email?.split('@')[0]}</p>
                <p className="text-[10px] text-white/40 truncate uppercase tracking-wider">{user.role || 'Admin'}</p>
              </div>
            </div>
          )}
          
          <form action={signOutAction}>
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-950/30 hover:text-red-400 text-white/50 transition-all font-bold text-sm group">
              <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Secure Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Header/Navbar */}
        <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-10 px-8 flex items-center justify-between">
           <div className="bg-[#111] px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
             <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse"></div>
             <span className="text-[10px] font-bold text-amber-500/70 uppercase tracking-widest">Network Secure</span>
           </div>
           
           <div className="flex items-center gap-4">
              <button className="p-2.5 rounded-xl bg-[#111] border border-white/10 text-white/50 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all focus:outline-none">
                <Settings className="w-5 h-5" />
              </button>
           </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto text-white">
          {children}
        </div>
      </main>
    </div>
  )
}
