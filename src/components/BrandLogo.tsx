import React from 'react';
import { SoatbayLogoIcon } from './SoatbayLogoIcon';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  inverted?: boolean;
  className?: string;
  onClick?: () => void;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  inverted = false,
  className = '',
  onClick,
  showText = true
}) => {
  const iconPixelSizes = {
    sm: 32,
    md: 40,
    lg: 52,
    xl: 68
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* 
        Soatbay Rasmiy Logosi:
        Ayol silueti va kasb-hunar ramzlari aks etgan shaffof fonli (transparent) vektor logo
      */}
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <SoatbayLogoIcon
          size={iconPixelSizes[size]}
          inverted={inverted}
          color="#68255B"
          className="drop-shadow-xs"
        />
      </div>

      {/* Brand Name & Tagline */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1">
            <span className={`font-black tracking-tight ${textSizes[size]} ${inverted ? 'text-white' : 'text-stone-900'}`}>
              Soat<span className={inverted ? 'text-rose-200' : 'text-[#68255B]'}>bay</span>
            </span>
          </div>
          {showTagline && (
            <span className={`text-[10px] font-semibold tracking-tight -mt-0.5 ${inverted ? 'text-white/80' : 'text-stone-500'}`}>
              Qulay soatbay ishlar platformasi
            </span>
          )}
        </div>
      )}
    </div>
  );
};
