"use client";

import React, { useState, useEffect } from "react";
import { Copy, Share2, MessageCircle, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface ShareToolProps {
  slug: string;
  brideName: string;
  groomName: string;
}

export default function ShareTool({ slug, brideName, groomName }: ShareToolProps) {
  const [guestName, setGuestName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [template, setTemplate] = useState("");
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize template and localStorage
  useEffect(() => {
    setIsMounted(true);
    const savedTemplate = localStorage.getItem(`viding_template_${slug}`);
    if (savedTemplate) {
      setTemplate(savedTemplate);
    } else {
      const defaultTemplate = `Kepada Yth. 
* Bapak/Ibu/Saudara/i [nama]*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

*${brideName} & ${groomName}*

Berikut link undangan kami untuk informasi lengkap mengenai acara:

[link]

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.`;
      setTemplate(defaultTemplate);
    }
  }, [slug, brideName, groomName]);

  // Save template to localStorage on change
  useEffect(() => {
    if (isMounted && template) {
      localStorage.setItem(`viding_template_${slug}`, template);
    }
  }, [template, slug, isMounted]);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const invitationLink = `${baseUrl}/${slug}?to=${encodeURIComponent(guestName).replace(/%20/g, "+")}`;

  const generatedMessage = template
    .replace(/\[nama\]/g, guestName || "Nama Tamu")
    .replace(/\[link\]/g, invitationLink);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const encodedMessage = encodeURIComponent(generatedMessage);
    const waUrl = phoneNumber 
      ? `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`
      : `https://api.whatsapp.com/send?text=${encodedMessage}`;
    
    window.open(waUrl, "_blank");
  };

  const handleResetTemplate = () => {
    if (confirm("Reset template ke pesan default?")) {
      const defaultTemplate = `Kepada Yth. 
* Bapak/Ibu/Saudara/i [nama]*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

*${brideName} & ${groomName}*

Berikut link undangan kami untuk informasi lengkap mengenai acara:

[link]

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.`;
      setTemplate(defaultTemplate);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="grid gap-8">
      {/* Step 1: Guest Identity */}
      <Card className="bg-black/40 backdrop-blur-3xl border-white/5 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        
        <div className="space-y-6 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Share2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-[11px] font-bold text-emerald-400/80 uppercase tracking-[0.3em]">
              1. Identitas Tamu
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">Nama Lengkap Tamu</label>
              <Input 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Contoh: Aditya Kristianto"
                className="bg-white/[0.03] border-white/10 rounded-xl h-14 text-sm focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">Nomor WhatsApp (Opsional)</label>
              <Input 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Contoh: 62812345678"
                className="bg-white/[0.03] border-white/10 rounded-xl h-14 text-sm focus:ring-emerald-500/50 transition-all"
              />
              <p className="text-[8px] text-white/20 italic ml-1">Kosongkan jika ingin share manual via WA</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Step 2: Message Template */}
      <Card className="bg-black/40 backdrop-blur-3xl border-white/5 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        
        <div className="space-y-6 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <h2 className="text-[11px] font-bold text-emerald-400/80 uppercase tracking-[0.3em]">
                2. Kustomisasi Pesan
              </h2>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleResetTemplate}
              className="text-[9px] font-bold text-white/20 hover:text-white uppercase tracking-widest hidden md:flex gap-2"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </Button>
          </div>

          <div className="space-y-3">
            <Textarea 
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="bg-white/[0.03] border-white/10 rounded-2xl min-h-[250px] text-sm leading-relaxed p-6 focus:ring-emerald-500/50 resize-none transition-all scrollbar-hide"
            />
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-bold text-white/40 border border-white/5">Gunakan [nama] untuk placeholder nama</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-bold text-white/40 border border-white/5">Gunakan [link] untuk placeholder URL</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button 
          onClick={handleCopyLink}
          disabled={!guestName}
          className="flex-1 h-16 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-[0.2em] text-[10px] border border-white/5 transition-all active:scale-95 disabled:opacity-30"
        >
          {copied ? (
            <><Check className="w-4 h-4 mr-3 text-emerald-400" /> Link Tersalin!</>
          ) : (
            <><Copy className="w-4 h-4 mr-3" /> Salin Link Saja</>
          )}
        </Button>

        <Button 
          onClick={handleShareWhatsApp}
          disabled={!guestName}
          className="flex-[2] h-16 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-emerald-900/40 transition-all active:scale-95 disabled:opacity-30"
        >
          <MessageCircle className="w-4 h-4 mr-3" /> Kirim via WhatsApp
        </Button>
      </div>

      {/* Live Preview UI (Subtle) */}
      <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-2xl p-6">
        <h3 className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] mb-4 text-center">Live Preview Link</h3>
        <p className="text-[10px] font-mono text-emerald-400/60 break-all text-center">
          {invitationLink}
        </p>
      </div>
    </div>
  );
}
