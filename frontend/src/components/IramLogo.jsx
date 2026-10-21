import React from 'react';

/**
 * IramLogo Component
 * Matches the user's uploaded Hexagonal Isometric ConTech Badge:
 * - Glowing neon mint/cyan outer hexagonal border (#00F5D4)
 * - Deep midnight navy canvas (#0A1124)
 * - 3D beveled silver/platinum architectural structural beams
 * - Safety orange concentric contour hooks (#FF6A00)
 * - Center 3D isometric construction cube with warm orange multi-tone lighting
 */
export default function IramLogo({ 
  className = "h-9 w-auto", 
  variant = "light", // "light" or "dark"
  showTagline = true,
  iconOnly = false
}) {
  const isDark = variant === "dark";

  return (
    <div className="inline-flex items-center gap-3 select-none">
      {/* Hexagonal Isometric ConTech Emblem */}
      <svg 
        viewBox="0 0 240 240" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          {/* Glowing Neon Cyan Outer Rim Filter */}
          <filter id="iramCyanGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#00F5D4" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#00F5D4" floodOpacity="0.5" />
          </filter>

          <linearGradient id="beamSilverLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          <linearGradient id="beamSilverDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="60%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          <linearGradient id="cubeFaceTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC27A" />
            <stop offset="100%" stopColor="#F59E42" />
          </linearGradient>

          <linearGradient id="cubeFaceLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E85312" />
            <stop offset="100%" stopColor="#B83200" />
          </linearGradient>

          <linearGradient id="cubeFaceRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>
        </defs>

        {/* Outer Dark Navy Hexagonal Badge with Glowing Neon Cyan Rim */}
        <path
          d="M 120 18 L 204 66.5 Q 212 71 212 80 L 212 160 Q 212 169 204 173.5 L 120 222 Q 114 225 108 222 L 36 173.5 Q 28 169 28 160 L 28 80 Q 28 71 36 66.5 L 120 18 Z"
          fill="#0A1124"
          stroke="#00F5D4"
          strokeWidth="3.5"
          strokeLinejoin="round"
          filter="url(#iramCyanGlow)"
        />

        {/* Outer Structural Silver Hexagonal Beveled Beams */}
        {/* Top Left Beam */}
        <path
          d="M 112 36 L 48 73 L 48 116 L 64 125 L 64 85 L 112 57 Z"
          fill="url(#beamSilverLight)"
          stroke="#0A1124"
          strokeWidth="1.5"
        />
        <path
          d="M 112 57 L 64 85 L 64 96 L 102 74 L 112 74 Z"
          fill="url(#beamSilverDark)"
        />

        {/* Top Right Beam */}
        <path
          d="M 128 36 L 192 73 L 192 108 L 176 108 L 176 85 L 128 57 Z"
          fill="url(#beamSilverLight)"
          stroke="#0A1124"
          strokeWidth="1.5"
        />
        <path
          d="M 128 57 L 176 85 L 176 96 L 138 74 L 128 74 Z"
          fill="url(#beamSilverDark)"
        />

        {/* Right Vertical Slit Notch on beam */}
        <line x1="176" y1="112" x2="192" y2="112" stroke="#0A1124" strokeWidth="3" />

        {/* Bottom Right Beam */}
        <path
          d="M 192 116 L 192 167 L 120 204 L 120 183 L 176 155 L 176 125 Z"
          fill="url(#beamSilverLight)"
          stroke="#0A1124"
          strokeWidth="1.5"
        />
        <path
          d="M 176 125 L 176 155 L 120 183 L 120 171 L 164 148 L 164 125 Z"
          fill="url(#beamSilverDark)"
        />

        {/* Bottom Left Beam */}
        <path
          d="M 48 138 L 120 204 L 120 183 L 64 151 L 64 138 Z"
          fill="url(#beamSilverLight)"
          stroke="#0A1124"
          strokeWidth="1.5"
        />
        <path
          d="M 64 138 L 64 151 L 120 183 L 120 171 L 76 146 L 76 138 Z"
          fill="url(#beamSilverDark)"
        />

        {/* Left Vertical Slit Notch */}
        <line x1="48" y1="126" x2="64" y2="135" stroke="#0A1124" strokeWidth="3" />

        {/* Inner Orange Hexagonal Framing Ring */}
        <path
          d="M 120 70 L 168 97 L 168 147 L 152 156 L 152 168 L 168 159 L 174 156 L 174 93 L 120 62 L 66 93 L 66 147 L 72 150 L 72 165 L 60 159 L 60 90 Z"
          fill="#FF6A00"
          stroke="#FF6A00"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Orange Upper Vertical Hanging Tabs */}
        <path d="M 112 62 L 112 78 L 118 78 L 118 62 Z" fill="#FF6A00" />
        <path d="M 128 62 L 128 78 L 122 78 L 122 62 Z" fill="#FF6A00" />

        {/* Lower Orange Flanking Chevron Bars */}
        <path d="M 82 148 L 106 162 L 106 170 L 82 156 Z" fill="#FF6A00" />
        <path d="M 158 148 L 134 162 L 134 170 L 158 156 Z" fill="#FF6A00" />

        {/* Center 3D Isometric Construction Cube */}
        <g filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.6))">
          {/* Top Face (Warm Light Peach Orange) */}
          <polygon
            points="120,84 152,102.5 120,121 88,102.5"
            fill="url(#cubeFaceTop)"
            stroke="#0A1124"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Left Face (Deep Shadow Orange) */}
          <polygon
            points="88,102.5 120,121 120,158 88,139.5"
            fill="url(#cubeFaceLeft)"
            stroke="#0A1124"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Right Face (Vibrant Bright Orange) */}
          <polygon
            points="152,102.5 120,121 120,158 152,139.5"
            fill="url(#cubeFaceRight)"
            stroke="#0A1124"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Inner Isometric Y-Dividing Crevices */}
          <line x1="120" y1="121" x2="120" y2="158" stroke="#0A1124" strokeWidth="2.5" />
          <line x1="120" y1="121" x2="88" y2="102.5" stroke="#0A1124" strokeWidth="2" />
          <line x1="120" y1="121" x2="152" y2="102.5" stroke="#0A1124" strokeWidth="2" />
        </g>
      </svg>

      {/* Typography Section (shown unless iconOnly) */}
      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`text-[19px] font-black tracking-wider ${isDark ? 'text-white' : 'text-[#26231F]'}`}>
              IRAM
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-pulse"></span>
          </div>
          {showTagline && (
            <span className="text-[8.5px] font-bold tracking-[0.22em] text-[#E85312] uppercase leading-tight mt-0.5">
              CONTECH SYSTEMS
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Hexagonal 3D Cube Icon Box for Navbars, Headers, and Favicons
 * Exported both as RealEstateIconBox (for backward-compatibility across all views)
 * and HexCubeIconBox
 */
export function RealEstateIconBox({ className = "w-8 h-8" }) {
  return (
    <div className={`${className} rounded-lg bg-[#080E21] border border-[#00F5D4]/40 flex items-center justify-center p-0.5 shadow-md hover:border-[#00F5D4] hover:shadow-[0_0_14px_rgba(0,245,212,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 group shrink-0`}>
      <svg 
        viewBox="0 0 240 240" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <filter id="boxCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00F5D4" floodOpacity="0.85" />
          </filter>

          <linearGradient id="boxSilverLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="boxCubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC27A" />
            <stop offset="100%" stopColor="#F59E42" />
          </linearGradient>

          <linearGradient id="boxCubeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E85312" />
            <stop offset="100%" stopColor="#B83200" />
          </linearGradient>

          <linearGradient id="boxCubeRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>
        </defs>

        {/* Outer Hexagon with Neon Cyan Glow Rim */}
        <path
          d="M 120 18 L 204 66.5 Q 212 71 212 80 L 212 160 Q 212 169 204 173.5 L 120 222 Q 114 225 108 222 L 36 173.5 Q 28 169 28 160 L 28 80 Q 28 71 36 66.5 L 120 18 Z"
          fill="#080E21"
          stroke="#00F5D4"
          strokeWidth="3.5"
          strokeLinejoin="round"
          filter="url(#boxCyanGlow)"
        />

        {/* Structural Silver Beams */}
        <path d="M 112 36 L 48 73 L 48 116 L 64 125 L 64 85 L 112 57 Z" fill="url(#boxSilverLight)" stroke="#080E21" strokeWidth="1.5" />
        <path d="M 128 36 L 192 73 L 192 108 L 176 108 L 176 85 L 128 57 Z" fill="url(#boxSilverLight)" stroke="#080E21" strokeWidth="1.5" />
        <line x1="176" y1="112" x2="192" y2="112" stroke="#080E21" strokeWidth="3" />
        <path d="M 192 116 L 192 167 L 120 204 L 120 183 L 176 155 L 176 125 Z" fill="url(#boxSilverLight)" stroke="#080E21" strokeWidth="1.5" />
        <path d="M 48 138 L 120 204 L 120 183 L 64 151 L 64 138 Z" fill="url(#boxSilverLight)" stroke="#080E21" strokeWidth="1.5" />
        <line x1="48" y1="126" x2="64" y2="135" stroke="#080E21" strokeWidth="3" />

        {/* Orange Hex Ring */}
        <path
          d="M 120 70 L 168 97 L 168 147 L 152 156 L 152 168 L 168 159 L 174 156 L 174 93 L 120 62 L 66 93 L 66 147 L 72 150 L 72 165 L 60 159 L 60 90 Z"
          fill="#FF6A00"
        />
        <path d="M 112 62 L 112 78 L 118 78 L 118 62 Z" fill="#FF6A00" />
        <path d="M 128 62 L 128 78 L 122 78 L 122 62 Z" fill="#FF6A00" />
        <path d="M 82 148 L 106 162 L 106 170 L 82 156 Z" fill="#FF6A00" />
        <path d="M 158 148 L 134 162 L 134 170 L 158 156 Z" fill="#FF6A00" />

        {/* Isometric 3D Cube */}
        <polygon points="120,84 152,102.5 120,121 88,102.5" fill="url(#boxCubeTop)" stroke="#080E21" strokeWidth="2" />
        <polygon points="88,102.5 120,121 120,158 88,139.5" fill="url(#boxCubeLeft)" stroke="#080E21" strokeWidth="2" />
        <polygon points="152,102.5 120,121 120,158 152,139.5" fill="url(#boxCubeRight)" stroke="#080E21" strokeWidth="2" />
        <line x1="120" y1="121" x2="120" y2="158" stroke="#080E21" strokeWidth="2.5" />
      </svg>
    </div>
  );
}

export const HexCubeIconBox = RealEstateIconBox;
