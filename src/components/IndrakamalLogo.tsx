import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textVariant?: 'horizontal' | 'vertical' | 'minimal';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const IndrakamalLogo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  textVariant = 'horizontal',
  theme = 'light',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { imgClass: 'w-7 h-7 sm:w-8 sm:h-8', title: 'text-xs sm:text-base', sub: 'text-[7.5px] sm:text-[9px]' },
    md: { imgClass: 'w-8 h-8 sm:w-11 sm:h-11', title: 'text-sm sm:text-lg', sub: 'text-[8px] sm:text-[10px]' },
    lg: { imgClass: 'w-10 h-10 sm:w-14 sm:h-14', title: 'text-lg sm:text-2xl', sub: 'text-[9px] sm:text-xs' },
    xl: { imgClass: 'w-14 h-14 sm:w-20 sm:h-20', title: 'text-2xl sm:text-3xl', sub: 'text-xs sm:text-sm' },
  };

  const currentSize = sizeMap[size];
  const isDark = theme === 'dark';

  return (
    <div
      id="indrakamal-brand-logo"
      className={`inline-flex items-center gap-2 sm:gap-3 select-none ${
        textVariant === 'vertical' ? 'flex-col text-center' : 'flex-row'
      } ${className}`}
    >
      {/* Official Indrakamal Logo as shared */}
      <img
        src="/logo.png"
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src.includes('logo.png')) {
            img.src = '/logo.svg';
          }
        }}
        alt="Indrakamal Logo"
        className={`shrink-0 transition-transform duration-300 hover:scale-105 object-contain ${currentSize.imgClass}`}
        referrerPolicy="no-referrer"
      />

      {/* Brand Name Typography */}
      {showText && (
        <div
          className={`flex flex-col whitespace-nowrap justify-center ${
            textVariant === 'vertical' ? 'items-center text-center mt-1.5' : 'items-start text-left'
          }`}
        >
          <div className="flex items-baseline tracking-wider whitespace-nowrap leading-none">
            <span
              className={`font-heading font-extrabold uppercase ${currentSize.title} text-[#00296b]`}
            >
              Indrakamal
            </span>
            <span
              className={`font-heading font-light uppercase ml-1.5 ${currentSize.title} text-[#00509d]`}
            >
              Uniforms
            </span>
          </div>
          {textVariant !== 'minimal' && (
            <span
              className={`font-sans uppercase tracking-[0.16em] font-semibold text-slate-500 whitespace-nowrap block mt-1 leading-tight text-left ${currentSize.sub}`}
            >
              School • Healthcare • Hospitality • Linen
            </span>
          )}
        </div>
      )}
    </div>
  );
};
