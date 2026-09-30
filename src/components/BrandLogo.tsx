import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  inverted?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  inverted = false,
  className = '',
  onClick
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* 
        Artistic Embellished Emblem:
        Profile silhouette of an empowered young woman with graceful hair flowing
        into an ascending, safe luminous pathway, illuminated by a guiding star.
      */}
      <div
        className={`${iconSizes[size]} shrink-0 rounded-xl flex items-center justify-center p-1 transition-all duration-300 ${
          inverted
            ? 'bg-white text-[#802244] shadow-sm'
            : 'bg-gradient-to-br from-[#802244] via-[#91244C] to-[#6C1A37] text-white shadow-md shadow-[#802244]/20'
        }`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="hairGrad" x1="12" y1="10" x2="38" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor={inverted ? '#802244' : '#FFFFFF'} stopOpacity="0.95" />
              <stop offset="1" stopColor={inverted ? '#9E2A54' : '#FCE7F3'} stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="pathGrad" x1="8" y1="36" x2="40" y2="12" gradientUnits="userSpaceOnUse">
              <stop stopColor={inverted ? '#802244' : '#FDE047'} />
              <stop offset="1" stopColor={inverted ? '#B45309' : '#F59E0B'} />
            </linearGradient>
            <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Graceful flowing hair & silhouette of an ambitious girl looking forward */}
          <path
            d="M21 11C16.5 11 13 14.5 13 19C13 22 14.5 24.5 17 26C15 28 11 31 9 37C11.5 35 15.5 33.5 18 33.5C18.8 33.5 19.5 33.7 20.2 34C19.2 36.5 17 38.5 14 40C18.5 40 22.5 37.5 24.5 33.5C26 30.5 26.5 27 26.5 24V21.5C26.5 21 27 20.5 27.5 20.5C28.2 20.5 28.7 21 29 21.6C29.6 22.8 30.8 23.5 32 23.5C30.5 21.2 30 19 30 17C30 13.7 26 11 21 11Z"
            fill="url(#hairGrad)"
          />

          {/* Girl's serene facial profile outline */}
          <path
            d="M25 18C25.5 18.8 26.2 19.5 27.2 19.5C27.8 19.5 28.3 19.8 28.5 20.2C28.8 20.8 28.2 21.6 27.5 21.8C26.5 22.1 25.5 22.8 25 23.8C24.5 24.8 24.5 26 24.5 27.2C24.5 28.5 23.8 29.8 22.8 30.5"
            stroke={inverted ? '#802244' : '#FFE4E6'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Ascending Safe Pathway Curve wrapping upwards */}
          <path
            d="M8 41C16 41 24 37 31 29C35 24.5 38 18 41 11"
            stroke="url(#pathGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="0.1 0"
          />

          {/* Glowing Guiding Star (Beacon of safety & future) */}
          <g transform="translate(38, 12)">
            {/* Soft radiant aura */}
            <circle cx="0" cy="0" r="6" fill="url(#starGlow)" />
            {/* 4-point sparkle star */}
            <path
              d="M0 -5.5L1.3 -1.3L5.5 0L1.3 1.3L0 5.5L-1.3 1.3L-5.5 0L-1.3 -1.3Z"
              fill={inverted ? '#B45309' : '#FEF08A'}
            />
            {/* Star center */}
            <circle cx="0" cy="0" r="1.2" fill={inverted ? '#78350F' : '#FFFFFF'} />
          </g>

          {/* Delicate waypoint sparkle on the path */}
          <circle
            cx="24"
            cy="36"
            r="1.8"
            fill={inverted ? '#802244' : '#FDE047'}
          />
        </svg>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className={`font-bold tracking-tight ${textSizes[size]} ${inverted ? 'text-white' : 'text-[#1E1B18]'}`}>
            Her<span className="text-[#802244] font-semibold dark:text-rose-300">Path</span>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F59E0B] -mt-2 shrink-0 animate-pulse" />
        </div>
        {showTagline && (
          <span className={`text-[11px] font-medium tracking-tight -mt-0.5 ${inverted ? 'text-white/80' : 'text-[#78716C]'}`}>
            Qizlar uchun xavfsiz ish va erkin yo‘l
          </span>
        )}
      </div>
    </div>
  );
};
