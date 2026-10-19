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
          primaryHover: "#CC490F",     // Primary Hover
          primaryLight: "#FEECE5",     // Primary Light
          primaryText: "#0F172A",      // Primary Text (Obsidian Slate)
          secondaryText: "#475569",    // Secondary Text (Darker, crisper slate-600)

          // Neutral Colors
          bg: "#EEF2F6",               // Rich balanced canvas background (replaces washed out #F7F9FB)
          surface: "#FFFFFF",          // Surface
          subtle: "#E2E8F0",           // Subtle Background (replaces #F1F5F9)
          border: "#CBD5E1",           // Crisper, well-defined border (replaces faint #E2E8F0)
          mutedText: "#64748B",        // Muted Text (replaces pale #94A3B8)

          // Semantic Colors
          success: "#15803D",          // Success
          successBg: "#DCFCE7",        // Success Background
          warning: "#B45309",          // Warning
          warningBg: "#FEF3C7",        // Warning Background
          error: "#B91C1C",            // Error
          errorBg: "#FEE2E2",          // Error Background
          info: "#1D4ED8",             // Info
          infoBg: "#DBEAFE",           // Info Background

          // Backward compatibility mappings
          orange: "#E85312",
          orangeDark: "#CC490F",
          orangeLight: "#FEECE5",
          orangeBorder: "#FDBA74",
          dark: "#0F172A",
          slate: "#1E293B",
          bodyText: "#334155",
          cardBg: "#FFFFFF",
          pageBg: "#EEF2F6"
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
