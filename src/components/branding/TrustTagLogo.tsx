import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
  dark?: boolean;
}

export const TrustTagLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  onClick,
  dark = false
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8'
  };

  const textSizes = {
    sm: 'text-sm tracking-tight',
    md: 'text-base tracking-tight',
    lg: 'text-lg tracking-tight'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className={`relative ${iconSizes[size]} bg-[#151515] rounded-[4px] border border-[#2E2E2E] flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-white"
        >
          {/* Tag / Shield Geometric Contour */}
          <path
            d="M6 5.5H18V14.5L12 19L6 14.5V5.5Z"
            fill="#222222"
            stroke="#DCDCD6"
            strokeWidth="1.2"
          />
          {/* Cobalt Tag Punch */}
          <circle cx="12" cy="8.5" r="1.2" fill="#1D4ED8" />
          {/* Verification Mark */}
          <path
            d="M9.5 12.5L11.2 14.2L14.8 10.5"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="square"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-semibold font-mono tracking-wider ${dark ? 'text-white' : 'text-[#171717]'} ${textSizes[size]}`}>
            TRUSTTAG
          </span>
          <span className="text-[9px] font-mono tracking-widest text-[#6B6B67] uppercase border border-[#DCDCD6] px-1 py-0.2 rounded-[2px]">
            SYS
          </span>
        </div>
      )}
    </div>
  );
};
