import type { Config } from "tailwindcss";

/**
 * AURELIA design system.
 * A restrained ultra-luxury palette: deep tidal ink, champagne gold,
 * warm ivory sand and muted sea greens. Everything is intentionally
 * low-saturation so photography and gold accents carry the drama.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0E12", // deep tidal black
          900: "#0A0E12",
          800: "#0E1519",
          700: "#141C21",
          600: "#1B252B",
        },
        sea: {
          DEFAULT: "#1E3A3F",
          900: "#12262A",
          700: "#1E3A3F",
          500: "#2C4A4E",
          300: "#4A6B6E",
        },
        gold: {
          DEFAULT: "#C9A961",
          light: "#E4CE97",
          400: "#D4B876",
          500: "#C9A961",
          600: "#B08F49",
        },
        sand: {
          DEFAULT: "#F4EDE1",
          50: "#FBF8F2",
          100: "#F4EDE1",
          200: "#EDE3D2",
          300: "#E0D2BB",
        },
        stone: {
          DEFAULT: "#8B8378",
          light: "#A69E92",
          dark: "#6B6459",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Jost", "system-ui", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "11xl": ["13rem", { lineHeight: "0.9", letterSpacing: "-0.025em" }],
      },
      letterSpacing: {
        luxe: "0.28em",
        wide2: "0.18em",
      },
      spacing: {
        section: "clamp(6rem, 14vh, 12rem)",
      },
      maxWidth: {
        editorial: "78rem",
      },
      boxShadow: {
        luxe: "0 40px 120px -40px rgba(0,0,0,0.65)",
        glass: "0 8px 40px -12px rgba(0,0,0,0.5)",
        gold: "0 0 60px -12px rgba(201,169,97,0.45)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(120deg, #E4CE97 0%, #C9A961 40%, #B08F49 100%)",
        "sea-fade":
          "linear-gradient(180deg, rgba(10,14,18,0) 0%, rgba(10,14,18,0.85) 100%)",
        "sand-fade":
          "linear-gradient(180deg, #FBF8F2 0%, #F4EDE1 100%)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slow-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 3s linear infinite",
        "slow-spin": "slow-spin 26s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
