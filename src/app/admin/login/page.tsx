'use client'

import React, { useState, useTransition } from 'react'
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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Neon Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 blur-[120px] mix-blend-screen rounded-full pointer-events-none" />
      
      <Toaster richColors position="top-right" theme="dark" />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="p-4 bg-amber-500/10 rounded-2xl mb-6 shadow-[0_0_30px_rgba(245,158,11,0.15)] border border-amber-500/20">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-4xl font-serif text-white tracking-tight uppercase">Admin <span className="text-amber-500 font-sans italic">Vogue</span></h1>
          <p className="text-white/40 mt-3 text-sm tracking-widest uppercase font-bold">Authorized Access Only</p>
        </div>

        <div className="bg-[#111]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
          
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white">Sign In</h2>
            <p className="text-white/40 text-xs mt-2">Enter your secure credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="email" className="text-[10px] font-bold text-white/60 block uppercase tracking-widest pl-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-amber-500 text-white/30">
                  <Mail className="h-5 w-5" />
                </div>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="admin@example.com" 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none text-white text-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between pl-1">
                <label htmlFor="password" className="text-[10px] font-bold text-white/60 block uppercase tracking-widest">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-amber-500 text-white/30">
                  <Lock className="h-5 w-5" />
                </div>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none text-white text-sm"
                />
              </div>
            </div>
            
            {error && (
              <div className="p-4 rounded-xl bg-red-950/50 text-red-400 text-sm border border-red-900/50 flex items-center shadow-sm">
                <div className="w-1 h-4 bg-red-500 rounded-full mr-3 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-extrabold uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 mt-8"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">
              Luxury Midnight Theme
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
