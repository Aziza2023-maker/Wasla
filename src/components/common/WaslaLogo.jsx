// WaslaLogo.jsx - Exact SVG Wasla Chain-Link Branding
import React from 'react';

export const WaslaChainIcon = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    {/* Dark link */}
    <path
      d="M32 58 C22 48 22 32 34 20 C46 8 62 8 72 18 C78 24 80 32 78 40"
      stroke="#0B192C"
      strokeWidth="11"
      strokeLinecap="round"
    />
    {/* Interlocking Teal link */}
    <path
      d="M68 42 C78 52 78 68 66 80 C54 92 38 92 28 82 C22 76 20 68 22 60"
      stroke="#0D9488"
      strokeWidth="11"
      strokeLinecap="round"
    />
    {/* Connection overlapping nodes */}
    <circle cx="34" cy="20" r="5.5" fill="#38BDF8" />
    <circle cx="66" cy="80" r="5.5" fill="#10B981" />
  </svg>
);

export const WaslaLogo = ({
  variant = 'dark', // 'dark' | 'light' | 'white'
  size = 'md',      // 'sm' | 'md' | 'lg'
  showSubtitle = true,
  subtitleText = 'بوابة العمل الحر الأكاديمي',
  onClick = null,
}) => {
  const iconSizes = { sm: 26, md: 34, lg: 42 };
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const isLight = variant === 'light' || variant === 'white';

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''}`}
    >
      <WaslaChainIcon size={iconSizes[size]} />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight ${textSizes[size]} ${isLight ? 'text-white' : 'text-[#0B192C]'}`}>
            وصلة
          </span>
          <span className="text-teal-600 font-bold text-xs px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200">
            WASLA.YE
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-[10px] font-medium tracking-wide mt-0.5 ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};

export default WaslaLogo;

