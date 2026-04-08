import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// Setup Font Heading (Elegan, Klasik)
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: 'swap',
});

// Setup Font Body (Bersih, Rapi, Terbaca)
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan",
  description: "Undangan pernikahan elegan dan romantis",
};

import { Toaster } from 'sonner';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <body 
        className={cn(
          cormorant.variable, 
          montserrat.variable, 
          "bg-cream text-primary antialiased font-body font-light min-h-screen"
        )}
      >
        <div className="noise-overlay" />
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: 'var(--bg-cream)',
            color: 'var(--text-primary)',
            border: '0.5px solid var(--text-primary)',
            borderRadius: '0',
            fontFamily: 'var(--font-montserrat)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontSize: '10px'
          }
        }} />
        {children}
      </body>
    </html>
  );
}
