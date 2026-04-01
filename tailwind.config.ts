import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--bg-cream)",
        primary: "var(--text-primary)",
        gold: "var(--accent-gold)",
        background: "var(--bg-cream)",
        foreground: "var(--text-primary)",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
      letterSpacing: {
        widest: '.25em',
        wider: '.15em',
        loose: '.05em',
      }
    },
  },
  plugins: [],
};
export default config;
