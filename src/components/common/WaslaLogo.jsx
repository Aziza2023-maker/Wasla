// WaslaLogo.jsx - Exact Vector Branding matching Official Wasla Guidelines
import React from 'react';

export const WaslaChainIcon = ({
  size = 40,
  variant = 'full', // 'full' | 'inverted' | 'monochrome' | 'dark' | 'light'
  className = '',
}) => {
  const isLight = variant === 'inverted' || variant === 'light';
  const isMono = variant === 'monochrome';
  const navyColor = isLight ? '#FFFFFF' : '#0F172A';
  const blueColor = isLight ? (isMono ? '#FFFFFF' : '#38BDF8') : isMono ? '#0F172A' : '#0EA5E9';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
    >
      {/* Group rotated -45 degrees around center (50, 50) */}
      <g transform="rotate(-45 50 50)">
        {/* Top-Right Link (Navy #0F172A) */}
        <rect
          x="40"
          y="39"
          width="42"
          height="22"
          rx="11"
          fill="none"
          stroke={navyColor}
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bottom-Left Link (Sky Blue #0EA5E9) */}
        <rect
          x="18"
          y="39"
          width="42"
          height="22"
          rx="11"
          fill="none"
          stroke={blueColor}
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interlocking Overlap: Navy bottom arc passing over Cyan bottom link */}
        <path
          d="M 40 50 A 11 11 0 0 0 51 61 H 64"
          fill="none"
          stroke={navyColor}
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export const WaslaLogo = ({
  variant = 'full', // 'full' | 'inverted' | 'monochrome' | 'dark' | 'light'
  layout = 'horizontal', // 'horizontal' | 'vertical'
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  showEnglish = true,
  subTitle = null, // e.g. "بوابة العمل الحر الأكاديمي" or "WASLA.YE"
  subtitleText = null,
  className = '',
  onClick = null,
}) => {
  const effectiveSubtitle = subTitle || subtitleText;
  const iconSizes = { sm: 28, md: 38, lg: 52, xl: 72 };
  const arabicSizes = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl sm:text-6xl',
  };
  const englishSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-xs tracking-[0.3em]',
    lg: 'text-sm tracking-[0.35em]',
    xl: 'text-lg tracking-[0.4em]',
  };

  const isLight = variant === 'inverted' || variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#0F172A]';

  if (layout === 'vertical') {
    return (
      <div
        onClick={onClick}
        className={`flex flex-col items-center justify-center text-center select-none ${
          onClick ? 'cursor-pointer group' : ''
        } ${className}`}
      >
        <div className="mb-2 transition-transform duration-200 group-hover:scale-105">
          <WaslaChainIcon size={iconSizes[size]} variant={variant} />
        </div>
        <div className="flex flex-col items-center">
          <span
            className={`font-black leading-tight ${arabicSizes[size]} ${textColor}`}
            style={{ fontFamily: "'Cairo', 'IBM Plex Sans Arabic', sans-serif" }}
          >
            وصلة
          </span>
          {showEnglish && (
            <span
              className={`font-black uppercase -mt-0.5 ${englishSizes[size]} ${
                isLight ? 'text-slate-300' : 'text-[#0F172A]'
              }`}
            >
              WASLA
            </span>
          )}
          {effectiveSubtitle && (
            <span className={`text-[11px] mt-1 font-medium ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
              {effectiveSubtitle}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Horizontal Layout
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      dir="rtl"
    >
      <div className="transition-transform duration-200 group-hover:scale-105">
        <WaslaChainIcon size={iconSizes[size]} variant={variant} />
      </div>
      <div className="flex flex-col text-right justify-center">
        <span
          className={`font-black leading-none ${arabicSizes[size]} ${textColor}`}
          style={{ fontFamily: "'Cairo', 'IBM Plex Sans Arabic', sans-serif" }}
        >
          وصلة
        </span>
        {effectiveSubtitle ? (
          <span
            className={`text-[10px] mt-1 font-medium ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            {effectiveSubtitle}
          </span>
        ) : showEnglish ? (
          <span
            className={`font-black uppercase tracking-[0.22em] text-[10px] mt-1 ${
              isLight ? 'text-slate-300' : 'text-[#0F172A]'
            }`}
          >
            WASLA
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default WaslaLogo;
