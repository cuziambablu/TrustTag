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
      <div className={`relative ${iconSizes[size]} bg-[#111318] rounded-[5px] border border-[#2B313E] flex items-center justify-center shrink-0 shadow-sm`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-white"
        >
          {/* Tag / Shield Geometric Contour */}
          <path
            d="M6 5.5H18V14.5L12 19L6 14.5V5.5Z"
            fill="#1E2330"
            stroke="#98A2B3"
            strokeWidth="1.2"
          />
          {/* Primary Brand Punch */}
          <circle cx="12" cy="8.5" r="1.3" fill="#174EA6" />
          {/* Verification Mark */}
          <path
            d="M9.5 12.5L11.2 14.2L14.8 10.5"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-semibold tracking-tight font-sans ${dark ? 'text-white' : 'text-[#111318]'} ${textSizes[size]}`}>
            TrustTag
          </span>
          <span className="text-[9px] font-mono tracking-wider text-[#667085] uppercase border border-[#E4E7EC] px-1 py-0.5 rounded-[3px] bg-[#F7F8FA]">
            v2.4
          </span>
        </div>
      )}
    </div>
  );
};
