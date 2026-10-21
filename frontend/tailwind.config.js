/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iram: {
          // Brand Colors
          primary: "#E85312",          // Primary brand orange
          primaryHover: "#CC4509",     // Primary Hover
          primaryLight: "#FEECE5",     // Primary Light (Peach)
          primaryText: "#26231F",      // Obsidian Slate / Architectural Charcoal
          secondaryText: "#6E6862",    // Warm Muted Text

          // Neutral Colors
          bg: "#FFFDF9",               // Warm Ivory Canvas Background
          surface: "#FFFFFF",          // Surface Pure White
          subtle: "#F7F5F1",           // Subtle Neutral Card Background
          border: "#EAE5DE",           // Crisp Warm Architectural Border
          mutedText: "#6E6862",        // Muted Slate/Charcoal

          // Semantic Colors
          success: "#15803D",          // Success Green
          successBg: "#E8F1E4",        // Success Background
          warning: "#B45309",          // Warning Amber
          warningBg: "#F5ECD2",        // Warning Background
          error: "#B91C1C",            // Error Red
          errorBg: "#FEE2E2",          // Error Background
          info: "#1D4ED8",             // Info Blue
          infoBg: "#DBEAFE",           // Info Background

          // Backward compatibility mappings
          orange: "#E85312",
          orangeDark: "#CC4509",
          orangeLight: "#FEECE5",
          orangeBorder: "#FDBA74",
          dark: "#26231F",
          slate: "#3A3530",
          bodyText: "#26231F",
          cardBg: "#FFFFFF",
          pageBg: "#FFFDF9"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['Cairo', 'IBM Plex Sans Arabic', 'Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'pill': '999px'
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'dropdown': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'dialog': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
        'card': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'card-hover': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'figma-modal': '0 20px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.1)'
      }
    },
  },
  plugins: [],
}
