'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  PlusCircle, 
  ShieldCheck,
  ChevronRight,
  Palette,
  Menu,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { signOutAction } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'

interface NavItem {
  name: string
  icon: any
  href: string
}

interface SidebarContentProps {
  navItems: NavItem[]
  isCollapsed: boolean
  user: any
  onCloseMobile: () => void
}

const SidebarContent = ({ navItems, isCollapsed, user, onCloseMobile }: SidebarContentProps) => (
  <>
    <div className="p-10 flex items-center gap-4 border-b border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 blur-[40px] z-0 group-hover:bg-emerald-500/10 transition-colors"></div>
      <div className="p-3 bg-emerald-500/10 rounded-2xl shadow-lg shadow-emerald-900/20 border border-emerald-500/20 relative z-10 aurora-glow">
        <ShieldCheck className="w-6 h-6 text-emerald-400" />
      </div>
      <div className="relative z-10">
        <h2 className="text-white font-serif tracking-widest text-xl leading-none uppercase">Viding <span className="text-emerald-400 italic font-sans block text-xs mt-1 tracking-[0.3em]">Arctic</span></h2>
      </div>
      <button 
        onClick={onCloseMobile}
        className="lg:hidden ml-auto p-2 text-white/20 hover:text-white"
      >
        <X size={20} />
      </button>
    </div>

    <nav className="flex-1 px-6 py-10 space-y-3 overflow-y-auto custom-scrollbar">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onCloseMobile}
          className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 hover:bg-emerald-500/10 hover:text-emerald-400 group relative overflow-hidden ${isCollapsed ? 'justify-center lg:px-0' : ''}`}
          title={isCollapsed ? item.name : ''}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
          <item.icon className={`w-5 h-5 relative z-10 transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] ${isCollapsed ? 'w-6 h-6' : ''}`} />
          {!isCollapsed && <span className="font-bold text-[13px] tracking-widest uppercase relative z-10 whitespace-nowrap">{item.name}</span>}
          {!isCollapsed && <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 relative z-10" />}
        </Link>
      ))}
    </nav>

    <div className="p-8 border-t border-white/5 mt-auto">
      {user && (
        <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/[0.03] border border-white/5 mb-8 hover:bg-white/[0.05] transition-colors cursor-default group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 aurora-glow group-hover:border-emerald-500/40 transition-colors text-emerald-400 uppercase font-bold text-sm">
            {user.email?.[0] || 'V'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-white truncate tracking-wider uppercase">{user.email?.split('@')[0]}</p>
            <p className="text-[9px] text-white/20 truncate uppercase tracking-[0.2em] mt-1">Authorized Access</p>
          </div>
        </div>
      )}
      
      <form action={signOutAction}>
        <button className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl hover:bg-red-500/10 hover:text-red-400 text-white/30 transition-all font-bold text-[11px] uppercase tracking-[0.3em] group">
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Terminate Session
        </button>
      </form>
    </div>
  </>
)

interface AdminShellProps {
  children: React.ReactNode
  user: any
}

export default function AdminShell({ children, user }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { name: 'Dashboard', icon: BarChart3, href: '/admin' },
    { name: 'Daftar Klien', icon: Users, href: '/admin' },
    { name: 'Pabrik Preset', icon: Palette, href: '/admin/presets' },
    { name: 'Tambah Klien', icon: PlusCircle, href: '/admin/klien/baru' },
  ]

  return (
    <div className="flex min-h-screen bg-black font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <div className="fixed inset-0 bg-aurora -z-10 opacity-40"></div>
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop & Mobile */}
      <aside className={`
        ${isCollapsed ? 'lg:w-24' : 'w-72'} bg-black/80 backdrop-blur-3xl border-r border-white/5 text-white/50 flex flex-col fixed h-full z-50 
        transition-all duration-500 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {isCollapsed ? (
           <div className="flex flex-col items-center py-10 h-full">
              <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-10 aurora-glow">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <nav className="flex-1 space-y-6">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} title={item.name} className="p-4 rounded-2xl text-white/30 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all block group relative">
                     <item.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                     <div className="absolute left-full ml-4 px-3 py-1 bg-emerald-500 text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity uppercase tracking-widest whitespace-nowrap z-[60]">
                        {item.name}
                     </div>
                  </Link>
                ))}
              </nav>
              <form action={signOutAction} className="mt-auto p-6">
                <button title="Sign Out" className="p-4 rounded-2xl text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <LogOut className="w-6 h-6" />
                </button>
              </form>
           </div>
        ) : (
          <SidebarContent 
            navItems={navItems} 
            isCollapsed={isCollapsed} 
            user={user} 
            onCloseMobile={() => setIsSidebarOpen(false)} 
          />
        )}
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 ${isCollapsed ? 'lg:ml-24' : 'lg:ml-72'} flex flex-col min-h-screen w-full overflow-x-hidden transition-all duration-500 ease-in-out`}>
        {/* Header/Navbar */}
        <header className="h-20 lg:h-24 bg-black/40 backdrop-blur-3xl border-b border-white/5 sticky top-0 z-30 px-6 lg:px-12 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-white/40 hover:text-emerald-400 lg:hidden"
             >
               <Menu size={20} />
             </button>
             
             {/* Desktop Toggle Sidebar */}
             <button 
               onClick={() => setIsCollapsed(!isCollapsed)}
               className="hidden lg:flex p-3 rounded-xl bg-white/[0.03] border border-white/5 text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 transition-all aurora-glow group"
             >
               <Menu size={20} className={`transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`} />
             </button>

             <div className="hidden sm:flex bg-emerald-500/5 px-5 py-2.5 rounded-full border border-emerald-500/10 items-center gap-3 aurora-glow">
               <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
               <span className="text-[9px] font-bold text-emerald-400/70 uppercase tracking-[0.4em]">Satellite Link Active</span>
             </div>
           </div>
           
           <div className="flex items-center gap-4 lg:gap-6">
              <button className="p-3 lg:p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-white/20 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all focus:outline-none aurora-glow">
                <Settings className="w-5 h-5" />
              </button>
           </div>
        </header>

        <div className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
