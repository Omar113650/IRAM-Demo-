import React from 'react';

/**
 * IRAM Official Logo Component
 * Matches the user's uploaded crane-hoisting brand identity:
 * - "I": Bold slanted slab letter
 * - "R": Features top horizontal crane jib extending outward with pivot pulley
 * - Crane Cable & Hook: Vibrant construction safety yellow (#F5B700)
 * - "A": Tilted and hoisted mid-air by the crane hook
 * - "M": Strong modern geometric letter
 * Supports both Light (Navy #0B192C) and Dark Mode (Crisp White/Silver with Gold Hook)
 */
export default function IramLogo({ 
  className = "h-9 w-auto", 
  variant = "light", // "light" (dark text for white bg) or "dark" (white text for dark bg)
  showTagline = false 
}) {
  const isDarkBg = variant === "dark";
  const mainColor = isDarkBg ? "#FFFFFF" : "#0A1931";
  const hookColor = "#F5B700"; // Safety Gold Yellow
  const accentNavy = isDarkBg ? "#94A3B8" : "#1E293B";

  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg 
        viewBox="0 0 320 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* --- LETTER "I" (Slanted Slab Serif) --- */}
        <path
          d="M 22 22 L 58 22 L 56 29 L 45 29 L 36 81 L 47 81 L 45 88 L 10 88 L 12 81 L 23 81 L 32 29 L 20 29 Z"
          fill={mainColor}
        />

        {/* --- LETTER "R" & EXTENDED CRANE JIB --- */}
        {/* Vertical Left Stem */}
        <rect x="72" y="22" width="12" height="66" fill={mainColor} />
        
        {/* Top Loop of R */}
        <path
          d="M 84 22 L 140 22 C 146 22 150 26 150 32 L 150 48 C 150 54 146 58 140 58 L 84 58 Z M 96 32 L 96 48 L 138 48 L 138 32 Z"
          fill={mainColor}
        />
        
        {/* Right Diagonal Leg of R */}
        <polygon 
          points="106,56 122,56 154,88 136,88" 
          fill={mainColor} 
        />

        {/* Extended Crane Boom (Jib) extending horizontally from the top of R */}
        <rect x="140" y="22" width="38" height="9" fill={mainColor} />

        {/* Crane Pulley / Pivot Joint Circle */}
        <circle cx="182" cy="26.5" r="11" fill={mainColor} />
        <circle cx="182" cy="26.5" r="4" fill={isDarkBg ? "#0F172A" : "#FFFFFF"} />

        {/* --- YELLOW CRANE HOOK & CABLE --- */}
        {/* Vertical Cable */}
        <rect x="180" y="36" width="4" height="24" rx="2" fill={hookColor} />
        
        {/* Hook Block */}
        <rect x="178" y="54" width="8" height="6" rx="1.5" fill={hookColor} />
        
        {/* Hoisting Hook (Curved Eye & Loop) */}
        <path
          d="M 182 60 C 182 67 172 67 172 73 C 172 77 177 80 182 80 C 187 80 190 76 190 72 L 186 72 C 186 74 184 76.5 182 76.5 C 179 76.5 175.5 74.5 175.5 72.5 C 175.5 69 184.5 68 185.5 61 Z"
          fill={hookColor}
        />

        {/* --- LETTER "A" (Suspended & Tilted ~12 deg by the Crane) --- */}
        <g transform="translate(178, 52) rotate(11) translate(-178, -52)">
          {/* Main A Body */}
          <path
            d="M 166 42 L 180 42 L 202 88 L 188 88 L 183 76 L 163 76 L 158 88 L 144 88 Z M 167 66 L 179 66 L 173 52 Z"
            fill={mainColor}
          />
        </g>

        {/* --- LETTER "M" (Solid Geometric Block) --- */}
        <path
          d="M 226 42 L 238 42 L 258 72 L 278 42 L 290 42 L 290 88 L 278 88 L 278 58 L 262 82 L 254 82 L 238 58 L 238 88 L 226 88 Z"
          fill={mainColor}
        />
      </svg>

      {showTagline && (
        <div className="flex flex-col border-l border-slate-300/40 pl-2.5">
          <span className={`text-[11px] font-black tracking-wider uppercase ${isDarkBg ? 'text-white' : 'text-slate-900'}`}>
            IRAM
          </span>
          <span className="text-[9px] font-bold text-amber-500 tracking-tight">
            Material Lifecycle AI
          </span>
        </div>
      )}
    </div>
  );
}
