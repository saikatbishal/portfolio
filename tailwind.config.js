/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: ["Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", "monospace"],
      },
      colors: {
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
        "grid-pattern-dark":
          "linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        gradient: "gradient 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        glow: "0 0 20px rgba(59, 130, 246, 0.5)",
        "glow-purple": "0 0 20px rgba(168, 85, 247, 0.5)",
      },
    },
  },
  plugins: [],
};
