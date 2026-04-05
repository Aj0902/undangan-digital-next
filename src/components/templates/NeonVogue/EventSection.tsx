import React from 'react'
import type { Client, BankAccount } from '@/types/client'
import { Calendar, MapPin } from 'lucide-react'

// Fungsi helper untuk formatting tanggal di React Client/Server
const formatDate = (dateStr: string | null) => {
  if (!dateStr) return { day: '-', date: '-', time: '-' }
  const d = new Date(dateStr)
  return {
    day: d.toLocaleDateString('id-ID', { weekday: 'long' }),
    date: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    time: d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
  }
}

export default function EventSection({ data }: { data: Client }) {
  const { 
    akad_datetime, akad_venue_name, akad_venue_address,
    resepsi_datetime, resepsi_venue_name, resepsi_venue_address
  } = data.client_details

  const akad = formatDate(akad_datetime)
  const resepsi = formatDate(resepsi_datetime)

  return (
    <section className="py-32 px-6 md:px-12 xl:px-24 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Event Details</h2>
          <p className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px]">When & Where</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Akad Card */}
          <div className="group p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-amber-500/50 hover:bg-white/10 transition-all duration-500 relative overflow-hidden">
             {/* Hover Glow */}
             <div className="absolute inset-x-0 -bottom-20 h-40 bg-amber-500/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             <div className="relative z-10 space-y-8 text-center">
                <h3 className="text-3xl font-serif text-amber-50">Akad Nikah</h3>
                
                <div className="space-y-2">
                  <p className="text-sm font-bold uppercase tracking-widest text-amber-500">{akad.day}</p>
                  <p className="text-2xl font-black text-white">{akad.date}</p>
                  <p className="text-sm text-white/60 flex flex-col items-center gap-1 font-bold">
                    <Calendar className="w-4 h-4 text-amber-500 mb-1" />
                    Pukul {akad.time}
                  </p>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-3">
                  <MapPin className="w-6 h-6 text-amber-500 mx-auto" />
                  <p className="text-lg font-bold text-white">{akad_venue_name || 'Lokasi Belum Ditentukan'}</p>
                  <p className="text-xs text-white/50 leading-relaxed max-w-[250px] mx-auto">
                    {akad_venue_address || '-'}
                  </p>
                </div>
             </div>
          </div>

          {/* Resepsi Card */}
          <div className="group p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-amber-500/50 hover:bg-white/10 transition-all duration-500 relative overflow-hidden">
             {/* Hover Glow */}
             <div className="absolute inset-x-0 -bottom-20 h-40 bg-amber-500/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             <div className="relative z-10 space-y-8 text-center">
                <h3 className="text-3xl font-serif text-amber-50">Resepsi</h3>
                
                <div className="space-y-2">
                  <p className="text-sm font-bold uppercase tracking-widest text-amber-500">{resepsi.day}</p>
                  <p className="text-2xl font-black text-white">{resepsi.date}</p>
                  <p className="text-sm text-white/60 flex flex-col items-center gap-1 font-bold">
                    <Calendar className="w-4 h-4 text-amber-500 mb-1" />
                    Pukul {resepsi.time}
                  </p>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-3">
                  <MapPin className="w-6 h-6 text-amber-500 mx-auto" />
                  <p className="text-lg font-bold text-white">{resepsi_venue_name || 'Lokasi Belum Ditentukan'}</p>
                  <p className="text-xs text-white/50 leading-relaxed max-w-[250px] mx-auto">
                    {resepsi_venue_address || '-'}
                  </p>
                </div>
             </div>
          </div>
        </div>

        {/* Bank Accounts / RSVP Info Placeholder */}
        {data.client_details.bank_accounts && data.client_details.bank_accounts.length > 0 && (
          <div className="mt-20 p-10 rounded-3xl bg-[#111] border border-amber-500/20 text-center space-y-8 max-w-2xl mx-auto shadow-[0_0_30px_rgba(245,158,11,0.05)]">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-amber-500">Digital Gift</h3>
            <p className="text-sm text-white/60">Bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih, dapat melalui:</p>
            
            <div className="space-y-6">
              {data.client_details.bank_accounts.map((bank: BankAccount, index: number) => (
                <div key={index} className="p-4 bg-white/5 rounded-2xl border border-white/10 font-mono">
                  <p className="text-lg font-bold text-white">{bank.bank}</p>
                  <p className="text-2xl text-amber-400 tracking-wider my-2">{bank.number}</p>
                  <p className="text-xs uppercase text-white/50">a.n {bank.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
