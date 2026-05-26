import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vert KMK — couleur principale
        primary: {
          DEFAULT: "#236A15",
          50:  "#f2faea",
          100: "#e0f3d0",
          200: "#c0e8a1",
          300: "#96d46a",
          400: "#8FC726",
          500: "#6aaa1a",
          600: "#236A15",
          700: "#1d5811",
          800: "#18470e",
          900: "#12380b",
        },
        // Orange KMK — couleur d'accent
        accent: {
          DEFAULT: "#EC5F0A",
          50:  "#fff4ed",
          100: "#ffe6d3",
          200: "#ffc9a5",
          300: "#ffa36d",
          400: "#f87332",
          500: "#EC5F0A",
          600: "#c94a06",
          700: "#a33908",
          800: "#832e0a",
          900: "#6b270b",
        },
        // Gris KMK
        "brand-gray": "#61615F",
        dark: "#0f1a14",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
