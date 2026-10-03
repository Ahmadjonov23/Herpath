import React from 'react';

interface SoatbayLogoIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  inverted?: boolean;
}

export const SoatbayLogoIcon: React.FC<SoatbayLogoIconProps> = ({
  className = '',
  size = 40,
  color,
  inverted = false
}) => {
  // Brand deep plum/maroon purple as in user's image
  const primaryColor = inverted ? '#FFFFFF' : (color || '#68255B');
  const cutoutBg = inverted ? '#68255B' : '#FFFFFF';

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="Soatbay Logo"
    >
      <g fill={primaryColor} stroke={primaryColor} strokeLinecap="round" strokeLinejoin="round">
        {/* MAIN WOMAN HEAD SILHOUETTE (Facing Right) */}
        <path
          d="M86 23 C112 21, 142 34, 148 64
             C149 71, 144 76, 143 83
             C143 87, 146 89, 148 91
             C145 93, 142 96, 144 100
             C146 104, 151 106, 151 109
             C149 112, 143 113, 143 116
             C144 119, 148 120, 147 123
             C145 125, 142 127, 143 131
             C144 135, 146 138, 141 142
             C137 145, 131 149, 126 156
             C121 163, 114 172, 110 180
             C104 168, 98 155, 93 145
             C84 126, 84 106, 82 85
             C80 62, 82 40, 86 23 Z"
          fill={primaryColor}
          stroke="none"
        />

        {/* Eyelash flick */}
        <path d="M146 91 C149 90, 151 91, 152 92" stroke={primaryColor} strokeWidth="1.2" fill="none" />

        {/* 1. CHEF (Oshpaz) - Top Center */}
        <g transform="translate(86, 26)">
          <path d="M-5 1 C-8 -4, -4 -9, 0 -9 C4 -9, 8 -4, 5 1 Z" fill={primaryColor} stroke={cutoutBg} strokeWidth="1" />
          <circle cx="-3" cy="-6" r="3.5" fill={primaryColor} stroke={cutoutBg} strokeWidth="0.8" />
          <circle cx="3" cy="-6" r="3.5" fill={primaryColor} stroke={cutoutBg} strokeWidth="0.8" />
          <circle cx="0" cy="-8" r="4" fill={primaryColor} stroke={cutoutBg} strokeWidth="0.8" />
          <circle cx="0" cy="4" r="2.8" fill={primaryColor} stroke={cutoutBg} strokeWidth="0.8" />
          <path d="M-4 9 L4 9 L3 20 L-3 20 Z" fill={primaryColor} stroke={cutoutBg} strokeWidth="1" />
          <path d="M-2 11 L2 11 L2 16 L-2 16 Z" fill={cutoutBg} />
          <path d="M-4 11 L-8 14 L-6 19" stroke={cutoutBg} strokeWidth="1.2" fill="none" />
          <path d="M4 11 L9 13 L11 8" stroke={cutoutBg} strokeWidth="1.2" fill="none" />
          <rect x="9.5" y="5" width="3" height="4" rx="0.5" fill={cutoutBg} />
          <rect x="-8.5" y="18" width="6" height="4.5" rx="1" fill={cutoutBg} />
        </g>

        {/* 2. TAILOR & SEWING (Chevar / Tikuvchi) - Top Right Inside Silhouette */}
        <g transform="translate(118, 40)">
          <rect x="-4" y="-12" width="9" height="7" rx="1" fill={cutoutBg} />
          <line x1="-3" y1="-10" x2="4" y2="-10" stroke={primaryColor} strokeWidth="0.7" />
          <line x1="-3" y1="-8.5" x2="4" y2="-8.5" stroke={primaryColor} strokeWidth="0.7" />
          <line x1="-3" y1="-7" x2="4" y2="-7" stroke={primaryColor} strokeWidth="0.7" />
          <circle cx="0" cy="-1" r="2.8" fill={cutoutBg} />
          <path d="M-3.5 3 C-3.5 3, 0 2, 3.5 3 L3 11 L-3 11 Z" fill={cutoutBg} />
          <rect x="-7" y="10" width="14" height="2" rx="0.5" fill={cutoutBg} />
          <line x1="-5" y1="12" x2="-5" y2="18" stroke={cutoutBg} strokeWidth="1" />
          <line x1="5" y1="12" x2="5" y2="18" stroke={cutoutBg} strokeWidth="1" />
          <circle cx="7" cy="3" r="1.2" fill="none" stroke={cutoutBg} strokeWidth="0.8" />
          <circle cx="9" cy="4" r="1.2" fill="none" stroke={cutoutBg} strokeWidth="0.8" />
          <line x1="7" y1="4" x2="11" y2="8" stroke={cutoutBg} strokeWidth="0.8" />
        </g>

        {/* 3. HAIRSTYLIST & BEAUTY (Sartarosh / Go'zallik ustasi) - Middle Right Inside Silhouette */}
        <g transform="translate(108, 92)">
          <ellipse cx="0" cy="-4" rx="7" ry="10" fill="none" stroke={cutoutBg} strokeWidth="1.8" />
          <rect x="-10" y="8" width="20" height="2.5" rx="0.8" fill={cutoutBg} />
          <path d="M-8 10.5 L-8 19" stroke={cutoutBg} strokeWidth="1.2" />
          <path d="M8 10.5 L8 19" stroke={cutoutBg} strokeWidth="1.2" />
          <circle cx="0" cy="1" r="2.8" fill={cutoutBg} />
          <path d="M-3.5 5 C-3.5 5, 0 4, 3.5 5 L3 14 L-3 14 Z" fill={cutoutBg} />
          <path d="M-3.5 6 L-7 3" stroke={cutoutBg} strokeWidth="1" />
          <rect x="-8.5" y="1" width="3" height="1.5" fill={cutoutBg} />
          <path d="M3.5 6 L7 3" stroke={cutoutBg} strokeWidth="1" />
        </g>

        {/* 4. EDUCATOR / MOTHER & CHILDREN (Tarbiyachi / Ustoz) - Bottom Inside Silhouette */}
        <g transform="translate(94, 126)">
          <circle cx="0" cy="-6" r="3" fill={cutoutBg} />
          <path d="M-3.5 -2 C-3.5 -2, 0 -3, 3.5 -2 L4 8 C4 11, -1 12, -4 12 C-6 12, -7 9, -5 6 Z" fill={cutoutBg} />
          <path d="M-4 1 L-1 0 L-1 6 L-4 7 Z" fill={cutoutBg} stroke={primaryColor} strokeWidth="0.5" />
          <path d="M2 1 L-1 0 L-1 6 L2 7 Z" fill={cutoutBg} stroke={primaryColor} strokeWidth="0.5" />
          <circle cx="-13" cy="2" r="2.3" fill={cutoutBg} />
          <path d="M-15 5 C-15 5, -13 4.5, -11 5 L-10 10 L-15 10 Z" fill={cutoutBg} />
          <circle cx="-8" cy="-1" r="2.5" fill={cutoutBg} />
          <circle cx="-10.5" cy="-2.5" r="1.2" fill={cutoutBg} />
          <path d="M-10 2 C-10 2, -8 1.5, -6 2 L-5 8 L-10 8 Z" fill={cutoutBg} />
        </g>

        {/* 5. DRAFTING COMPASS (Tsirkul - Muhandislik) - Top Left */}
        <g transform="translate(52, 44)">
          <rect x="-1" y="-18" width="2" height="6" rx="0.8" fill={primaryColor} />
          <circle cx="0" cy="-10" r="3" fill={primaryColor} stroke={cutoutBg} strokeWidth="1.2" />
          <circle cx="0" cy="-10" r="1" fill={cutoutBg} />
          <line x1="-1.5" y1="-8" x2="-9" y2="18" stroke={primaryColor} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="1.5" y1="-8" x2="9" y2="18" stroke={primaryColor} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M-6 3 Q0 5 6 3" stroke={primaryColor} strokeWidth="1.2" fill="none" />
        </g>

        {/* 6. CLEANER / HOUSEKEEPER (Tozalik ustasi) - Middle Left */}
        <g transform="translate(42, 92)">
          <circle cx="0" cy="-6" r="3.2" fill={primaryColor} />
          <path d="M-3.5 -8.5 Q0 -11 3.5 -8.5" stroke={cutoutBg} strokeWidth="1.2" fill="none" />
          <path d="M-4.5 -2 L4.5 -2 L3.5 13 L-3.5 13 Z" fill={primaryColor} />
          <path d="M-2.5 0 L2.5 0 L2 9 L-2 9 Z" fill={cutoutBg} />
          <rect x="-3" y="13" width="2.5" height="4.5" rx="0.5" fill={primaryColor} />
          <rect x="0.5" y="13" width="2.5" height="4.5" rx="0.5" fill={primaryColor} />
          <line x1="-8" y1="-8" x2="-14" y2="14" stroke={primaryColor} strokeWidth="1.5" />
          <path d="M-15 14 L-9 12 L-11 19 L-18 19 Z" fill={primaryColor} />
          <line x1="4" y1="0" x2="9" y2="-4" stroke={primaryColor} strokeWidth="1.2" />
          <path d="M9 -4 C11 -8, 15 -6, 14 -3 C13 0, 9 -2, 9 -4 Z" fill={primaryColor} />
        </g>

        {/* 7. TRIANGLE DRAFTING RULER (Uchburchak chizg'ich) - Bottom Left */}
        <g transform="translate(38, 144)">
          <path d="M-18 8 L18 8 L-18 -18 Z" fill={primaryColor} />
          <path d="M-14 5 L8 5 L-14 -11 Z" fill={cutoutBg} />
          <line x1="-16" y1="7" x2="-16" y2="4" stroke={cutoutBg} strokeWidth="0.8" />
          <line x1="-12" y1="7" x2="-12" y2="4.5" stroke={cutoutBg} strokeWidth="0.8" />
          <line x1="-8" y1="7" x2="-8" y2="4" stroke={cutoutBg} strokeWidth="0.8" />
          <line x1="-4" y1="7" x2="-4" y2="4.5" stroke={cutoutBg} strokeWidth="0.8" />
          <line x1="0" y1="7" x2="0" y2="4" stroke={cutoutBg} strokeWidth="0.8" />
          <line x1="4" y1="7" x2="4" y2="4.5" stroke={cutoutBg} strokeWidth="0.8" />
          <line x1="8" y1="7" x2="8" y2="4" stroke={cutoutBg} strokeWidth="0.8" />
          <line x1="12" y1="7" x2="12" y2="4.5" stroke={cutoutBg} strokeWidth="0.8" />
          <line x1="15" y1="7" x2="15" y2="4" stroke={cutoutBg} strokeWidth="0.8" />
        </g>

        {/* 8. SCREWDRIVER & TOOLS (Ustachilik asboblari) - Bottom */}
        <g transform="translate(64, 168) rotate(-35)">
          <rect x="-3" y="-12" width="6" height="13" rx="1.5" fill={primaryColor} />
          <line x1="-1" y1="-10" x2="-1" y2="-2" stroke={cutoutBg} strokeWidth="0.8" />
          <line x1="1" y1="-10" x2="1" y2="-2" stroke={cutoutBg} strokeWidth="0.8" />
          <rect x="-1" y="1" width="2" height="15" fill={primaryColor} />
          <polygon points="-1.5,16 1.5,16 0.8,18 -0.8,18" fill={primaryColor} />
        </g>

        {/* 9. CALIPER (Shtangentsirkul) - Bottom Center */}
        <g transform="translate(68, 138) rotate(25)">
          <rect x="-1.5" y="-12" width="3" height="26" rx="0.5" fill={primaryColor} />
          <path d="M-1.5 -12 L-7 -7 L-1.5 -7 Z" fill={primaryColor} />
          <path d="M1.5 -12 L6 -8 L1.5 -8 Z" fill={primaryColor} />
          <rect x="-3.5" y="-5" width="7" height="4.5" rx="0.8" fill={primaryColor} stroke={cutoutBg} strokeWidth="0.7" />
        </g>

        {/* 10. LIGHTBULBS (G'oya va Yangilik) - Left Side */}
        <g transform="translate(38, 62)">
          <path d="M-4.5 0 C-7 -4, -5 -9, 0 -9 C5 -9, 7 -4, 4.5 0 C3 2, 2 4, 2 5.5 L-2 5.5 C-2 4, -3 2, -4.5 0 Z" fill="none" stroke={primaryColor} strokeWidth="1.4" />
          <path d="M-1.5 1 L-1.5 -3 L0 -1 L1.5 -3 L1.5 1" stroke={primaryColor} strokeWidth="0.8" fill="none" />
          <line x1="-2" y1="7" x2="2" y2="7" stroke={primaryColor} strokeWidth="1.2" />
          <line x1="-1.5" y1="8.5" x2="1.5" y2="8.5" stroke={primaryColor} strokeWidth="1.2" />
        </g>
        <g transform="translate(24, 88)">
          <path d="M-5.5 0 C-9 -5, -6 -11, 0 -11 C6 -11, 9 -5, 5.5 0 C4 2.5, 2.5 5, 2.5 7 L-2.5 7 C-2.5 5, -4 2.5, -5.5 0 Z" fill="none" stroke={primaryColor} strokeWidth="1.5" />
          <path d="M-2 1 L-2 -4 L0 -2 L2 -4 L2 1" stroke={primaryColor} strokeWidth="0.9" fill="none" />
          <line x1="-2.5" y1="9" x2="2.5" y2="9" stroke={primaryColor} strokeWidth="1.3" />
          <line x1="-2" y1="10.8" x2="2" y2="10.8" stroke={primaryColor} strokeWidth="1.3" />
        </g>

        {/* 11. WRENCH (Gayka kaliti) - Upper Left */}
        <g transform="translate(29, 68) rotate(-45)">
          <path d="M-2 -8 C-4 -6, -4 -3, -2 -1 L-2 10 L2 10 L2 -1 C4 -3, 4 -6, 2 -8 C1 -6, -1 -6, -2 -8 Z" fill={primaryColor} />
        </g>

        {/* 12. GEARS (Tishli g'ildiraklar) */}
        <g transform="translate(71, 31)">
          <circle cx="0" cy="0" r="7.5" fill="none" stroke={primaryColor} strokeWidth="2.5" />
          <circle cx="0" cy="0" r="3.2" fill={cutoutBg} />
          <line x1="0" y1="-10" x2="0" y2="10" stroke={primaryColor} strokeWidth="2.5" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke={primaryColor} strokeWidth="2.5" />
          <line x1="-7" y1="-7" x2="7" y2="7" stroke={primaryColor} strokeWidth="2.5" />
          <line x1="7" y1="-7" x2="-7" y2="7" stroke={primaryColor} strokeWidth="2.5" />
        </g>
        <g transform="translate(73, 76)">
          <circle cx="0" cy="0" r="5" fill="none" stroke={primaryColor} strokeWidth="2" />
          <circle cx="0" cy="0" r="2" fill={cutoutBg} />
          <line x1="0" y1="-7" x2="0" y2="7" stroke={primaryColor} strokeWidth="2" />
          <line x1="-7" y1="0" x2="7" y2="0" stroke={primaryColor} strokeWidth="2" />
          <line x1="-5" y1="-5" x2="5" y2="5" stroke={primaryColor} strokeWidth="2" />
          <line x1="5" y1="-5" x2="-5" y2="5" stroke={primaryColor} strokeWidth="2" />
        </g>

        {/* 13. SAFETY HELMET (Kaska) - Center Left */}
        <g transform="translate(68, 98)">
          <path d="M-8 3 C-8 -4, -5 -7, 0 -7 C5 -7, 8 -4, 8 3 Z" fill={primaryColor} stroke={cutoutBg} strokeWidth="0.8" />
          <rect x="-9.5" y="3" width="19" height="1.8" rx="0.5" fill={primaryColor} />
          <line x1="0" y1="-6.5" x2="0" y2="2" stroke={cutoutBg} strokeWidth="0.9" />
        </g>

        {/* 14. COMPUTER / WORKSTATION (Kompyuter) */}
        <g transform="translate(74, 52)">
          <rect x="-6" y="-5" width="10" height="7" rx="0.8" fill={cutoutBg} stroke={primaryColor} strokeWidth="1.2" />
          <line x1="-1" y1="2" x2="-1" y2="5" stroke={primaryColor} strokeWidth="1.4" />
          <line x1="-4" y1="5" x2="2" y2="5" stroke={primaryColor} strokeWidth="1.4" />
        </g>
      </g>
    </svg>
  );
};
