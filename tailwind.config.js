/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // DaisyUI uses data-theme attributes, not class-based dark mode
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: "#FF6B2C",
          hover: "#E55A1F",
          light: "#FFE5DB",
        },
        dark: {
          DEFAULT: "#1A1A2E",
          light: "#2A2A3E",
        },
        blue: {
          primary: "#0F3460",
        },

        // Secondary Colors
        gray: {
          light: "#F5F7FA",
          medium: "#E8ECF1",
        },

        // Text Colors
        text: {
          primary: "#1A1A2E",
          secondary: "#6C757D",
          light: "#8B95A5",
        },

        // Utility Colors
        success: "#28A745",
        error: "#DC3545",
        warning: "#FFC107",
        info: "#17A2B8",
      },
      boxShadow: {
        sm: "0 2px 4px rgba(26, 26, 46, 0.05)",
        md: "0 4px 12px rgba(26, 26, 46, 0.1)",
        lg: "0 8px 24px rgba(26, 26, 46, 0.15)",
        xl: "0 16px 48px rgba(26, 26, 46, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        loanlink: {
          primary: "#FF6B2C",
          secondary: "#0F3460",
          accent: "#FFE5DB",
          neutral: "#1A1A2E",
          "base-100": "#FFFFFF",
          "base-200": "#F5F7FA",
          "base-300": "#E8ECF1",
          info: "#17A2B8",
          success: "#28A745",
          warning: "#FFC107",
          error: "#DC3545",
        },
        dark: {
          primary: "#FF6B2C",
          secondary: "#0F3460",
          accent: "#FFE5DB",
          neutral: "#2A2A3E",
          "base-100": "#1A1A2E",
          "base-200": "#2A2A3E",
          "base-300": "#3A3A4E",
          info: "#17A2B8",
          success: "#28A745",
          warning: "#FFC107",
          error: "#DC3545",
        },
      },
    ],
  },
}
