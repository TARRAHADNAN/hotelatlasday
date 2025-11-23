import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#C9A55C",
          50: "#FAF7F0",
          100: "#F5EEDC",
          200: "#EBD9A6",
          300: "#E1C470",
          400: "#D7AF3A",
          500: "#C9A55C",
          600: "#A58642",
          700: "#8B6E32",
          800: "#6B5427",
          900: "#413418",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#2C5F7F",
          50: "#E8F1F6",
          100: "#D1E3ED",
          200: "#A3C7DB",
          300: "#75ABC9",
          400: "#478FB7",
          500: "#2C5F7F",
          600: "#234C66",
          700: "#1A394D",
          800: "#112633",
          900: "#081317",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#B85C3A",
          50: "#FCEEE9",
          100: "#F9DDD3",
          200: "#F3BBA7",
          300: "#ED997B",
          400: "#E7774F",
          500: "#B85C3A",
          600: "#934A2E",
          700: "#6E3723",
          800: "#492517",
          900: "#2A140C",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "Helvetica", "sans-serif"],
        arabic: ["var(--font-noto-arabic)", "Arial", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
