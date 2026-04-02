import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body 
        className={cn(
          cormorant.variable, 
          montserrat.variable, 
          "bg-cream text-primary antialiased font-body font-light min-h-screen"
        )}
      >
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
