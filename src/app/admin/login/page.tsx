'use client'

import React, { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Mail, Lock, ShieldCheck } from 'lucide-react'
import { login } from './actions'
import { toast, Toaster } from 'sonner'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    setError(null)
    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
        toast.error(result.error)
      }
    })
  }

  return (
    <div className="min-h-screen bg-aurora flex items-center justify-center p-4 relative overflow-hidden">
      {/* Noise for texture */}
      <div className="noise-overlay" />
      
      {/* Dynamic Glows - stronger as requested */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-emerald-500/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
      
      <Toaster richColors position="top-right" theme="dark" />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block p-4 bg-emerald-500/10 rounded-full mb-8 border border-emerald-500/20 aurora-glow"
          >
            <ShieldCheck className="w-10 h-10 text-emerald-400" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-serif text-white tracking-widest uppercase mb-2"
          >
            Viding <span className="italic text-emerald-400">Admin</span>
          </motion.h1>
          <p className="text-white/30 text-[10px] tracking-[0.6em] font-bold uppercase transition-all hover:text-emerald-400/50 cursor-default">
            Arctic Command Center
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="bg-black/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
          
          <div className="mb-10">
            <h2 className="text-lg font-serif text-white tracking-wider mb-1">Sign In</h2>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Authorized personnel only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label htmlFor="email" className="text-[9px] font-bold text-white/40 block uppercase tracking-[0.3em] ml-1">
                Access Identification
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-emerald-400 text-white/20">
                  <Mail size={18} />
                </div>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="ID // EMAIL" 
                  required 
                  className="w-full pl-12 pr-4 py-4.5 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all outline-none text-white text-sm font-sans"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="password" className="text-[9px] font-bold text-white/40 block uppercase tracking-[0.3em] ml-1">
                Security Cipher
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-emerald-400 text-white/20">
                  <Lock size={18} />
                </div>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="w-full pl-12 pr-4 py-4.5 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all outline-none text-white text-sm font-sans"
                />
              </div>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-red-500/5 text-red-400 text-[11px] border border-red-500/20 flex items-center gap-3 backdrop-blur-md"
              >
                <div className="w-1 h-1 bg-red-400 rounded-full animate-ping" />
                <span className="font-bold uppercase tracking-wider">{error}</span>
              </motion.div>
            )}

            <button 
              type="submit" 
              className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-[0.3em] rounded-2xl transition-all duration-500 shadow-lg shadow-emerald-900/40 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0.5 group mt-4 overflow-hidden relative"
              disabled={isPending}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isPending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing
                  </>
                ) : (
                  'Establish Link'
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-white/20 to-emerald-500 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/[0.03] text-center">
            <p className="text-[9px] text-white/10 uppercase tracking-[0.5em] font-bold">
              Secure Cloud <span className="text-emerald-500/40">{"//"}</span> Arctic Region
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
