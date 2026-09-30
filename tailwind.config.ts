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
        navy: {
          50:  "#eef2fb",
          100: "#d5dff5",
          200: "#aabdea",
          300: "#7f9bdf",
          400: "#5479d4",
          500: "#2957c9",
          600: "#1a3a8f",
          700: "#132d6e",
          800: "#0d2050",
          900: "#071432",
          950: "#040d20",
        },
        orange: {
          50:  "#fff7ed",
          100: "#ffedd5",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea6c0d",
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', "Inter", "sans-serif"],
      },
      animation: {
        "fade-up":   "fadeUp 0.6s ease forwards",
        "fade-in":   "fadeIn 0.4s ease forwards",
        "marquee":   "marquee 35s linear infinite",
        "marquee2":  "marquee2 35s linear infinite",
        "spin-slow": "spin 18s linear infinite",
      },
      keyframes: {
        fadeUp:  { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:  { from: { opacity: "0" }, to: { opacity: "1" } },
        marquee: { "0%": { transform: "translateX(0)" },   "100%": { transform: "translateX(-50%)" } },
        marquee2:{ "0%": { transform: "translateX(50%)" }, "100%": { transform: "translateX(0)" } },
      },
      boxShadow: {
        "card":  "0 2px 20px 0 rgba(26,58,143,0.07)",
        "card-hover": "0 8px 40px 0 rgba(26,58,143,0.13)",
        "orange": "0 4px 24px 0 rgba(249,115,22,0.25)",
        "navy":  "0 4px 24px 0 rgba(26,58,143,0.20)",
      },
    },
  },
  plugins: [],
};
export default config;
