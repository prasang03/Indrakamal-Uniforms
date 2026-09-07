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
    sm: { icon: 34, title: 'text-base', sub: 'text-[9px]' },
    md: { icon: 46, title: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 60, title: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 84, title: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];
  const isDark = theme === 'dark';

  return (
    <div
      id="indrakamal-brand-logo"
      className={`inline-flex items-center gap-3 select-none ${
        textVariant === 'vertical' ? 'flex-col text-center' : 'flex-row'
      } ${className}`}
    >
      {/* SVG Emblem recreated from the company's uploaded fabric lotus logo */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Indrakamal Uniforms Lotus Logo"
      >
        <defs>
          {/* Subtle woven fabric texture pattern mimicking real textile uniform weave */}
          <pattern id="fabric-weave" width="8" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M0 4L8 4 M4 0L4 8"
              stroke="#ffffff"
              strokeWidth="0.6"
              strokeOpacity="0.18"
            />
            <path
              d="M0 0L8 8 M0 8L8 0"
              stroke="#0a2a3b"
              strokeWidth="0.4"
              strokeOpacity="0.12"
            />
          </pattern>

          {/* Gradients matching the user's authentic slate/denim blue palette */}
          <linearGradient id="centralPetalGrad" x1="250" y1="60" x2="250" y2="330" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e5875" />
            <stop offset="50%" stopColor="#2c6d8d" />
            <stop offset="100%" stopColor="#184a63" />
          </linearGradient>

          <linearGradient id="midPetalGrad" x1="160" y1="120" x2="340" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#437b98" />
            <stop offset="100%" stopColor="#2b6583" />
          </linearGradient>

          <linearGradient id="outerPetalGrad" x1="100" y1="180" x2="400" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#195370" />
            <stop offset="100%" stopColor="#103c52" />
          </linearGradient>

          <linearGradient id="basePetalGrad" x1="130" y1="310" x2="370" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#114259" />
            <stop offset="100%" stopColor="#0b2e3e" />
          </linearGradient>

          {/* Stitching filter effect */}
          <filter id="stitch-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#ffffff" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Central Upright Diamond Petal */}
        <path
          d="M250 58 C266 112 308 174 308 238 C308 274 286 312 250 326 C214 312 192 274 192 238 C192 174 234 112 250 58 Z"
          fill="url(#centralPetalGrad)"
        />
        {/* Fabric texture overlay */}
        <path
          d="M250 58 C266 112 308 174 308 238 C308 274 286 312 250 326 C214 312 192 274 192 238 C192 174 234 112 250 58 Z"
          fill="url(#fabric-weave)"
        />

        {/* Inner white cutout of central petal (Key distinctive feature of the Indrakamal logo) */}
        <path
          d="M250 144 C259 176 280 214 280 244 C280 264 268 286 250 294 C232 286 220 264 220 244 C220 214 241 176 250 144 Z"
          fill="#ffffff"
        />
        {/* White stitched thread contour line inside central petal */}
        <path
          d="M250 156 C257 184 274 216 274 242 C274 260 264 278 250 286 C236 278 226 260 226 242 C226 216 243 184 250 156 Z"
          fill="none"
          stroke="#205c7a"
          strokeWidth="2.5"
          strokeDasharray="5 3"
        />

        {/* Mid-Left Petal */}
        <path
          d="M192 238 C182 172 136 126 124 120 C128 178 148 238 184 278 C189 264 191 251 192 238 Z"
          fill="url(#midPetalGrad)"
        />
        <path
          d="M192 238 C182 172 136 126 124 120 C128 178 148 238 184 278 C189 264 191 251 192 238 Z"
          fill="url(#fabric-weave)"
        />

        {/* Mid-Right Petal */}
        <path
          d="M308 238 C318 172 364 126 376 120 C372 178 352 238 316 278 C311 264 309 251 308 238 Z"
          fill="url(#midPetalGrad)"
        />
        <path
          d="M308 238 C318 172 364 126 376 120 C372 178 352 238 316 278 C311 264 309 251 308 238 Z"
          fill="url(#fabric-weave)"
        />

        {/* Outer-Left Wing Petal */}
        <path
          d="M124 120 C120 186 64 246 58 256 C114 286 190 324 244 330 C194 308 146 268 124 120 Z"
          fill="url(#outerPetalGrad)"
        />
        <path
          d="M124 120 C120 186 64 246 58 256 C114 286 190 324 244 330 C194 308 146 268 124 120 Z"
          fill="url(#fabric-weave)"
        />

        {/* Outer-Right Wing Petal */}
        <path
          d="M376 120 C380 186 436 246 442 256 C386 286 310 324 256 330 C306 308 354 268 376 120 Z"
          fill="url(#outerPetalGrad)"
        />
        <path
          d="M376 120 C380 186 436 246 442 256 C386 286 310 324 256 330 C306 308 354 268 376 120 Z"
          fill="url(#fabric-weave)"
        />

        {/* Inner white stitched aperture on Left Wing */}
        <path
          d="M144 242 L216 294 L178 310 L134 266 Z"
          fill="#ffffff"
        />
        <path
          d="M148 246 L210 292 L178 304 L138 266 Z"
          fill="none"
          stroke="#164d68"
          strokeWidth="2"
          strokeDasharray="4 2.5"
        />

        {/* Inner white stitched aperture on Right Wing */}
        <path
          d="M356 242 L284 294 L322 310 L366 266 Z"
          fill="#ffffff"
        />
        <path
          d="M352 246 L290 292 L322 304 L362 266 Z"
          fill="none"
          stroke="#164d68"
          strokeWidth="2"
          strokeDasharray="4 2.5"
        />

        {/* Lower Left Base Petal */}
        <path
          d="M242 334 C192 328 140 320 130 334 C120 348 148 376 196 376 C226 376 240 354 242 334 Z"
          fill="url(#basePetalGrad)"
        />
        <path
          d="M242 334 C192 328 140 320 130 334 C120 348 148 376 196 376 C226 376 240 354 242 334 Z"
          fill="url(#fabric-weave)"
        />

        {/* Lower Right Base Petal */}
        <path
          d="M258 334 C308 328 360 320 370 334 C380 348 352 376 304 376 C274 376 260 354 258 334 Z"
          fill="url(#basePetalGrad)"
        />
        <path
          d="M258 334 C308 328 360 320 370 334 C380 348 352 376 304 376 C274 376 260 354 258 334 Z"
          fill="url(#fabric-weave)"
        />

        {/* Delicate white tailor stitches running down the center base stem */}
        <path
          d="M250 332 L250 388"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeDasharray="5 3.5"
          strokeLinecap="round"
        />
        <path
          d="M236 348 L228 382"
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
        <path
          d="M264 348 L272 382"
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Name Typography */}
      {showText && (
        <div className={`flex flex-col ${textVariant === 'vertical' ? 'items-center mt-1' : 'items-start'}`}>
          <div className="flex items-baseline tracking-wider">
            <span
              className={`font-heading font-extrabold uppercase ${currentSize.title} ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Indrakamal
            </span>
            <span
              className={`font-heading font-light uppercase ml-1.5 ${currentSize.title} ${
                isDark ? 'text-sky-300' : 'text-cyan-700'
              }`}
            >
              Uniforms
            </span>
          </div>
          {textVariant !== 'minimal' && (
            <span
              className={`font-sans uppercase tracking-[0.2em] font-semibold text-slate-500 dark:text-slate-400 ${currentSize.sub}`}
            >
              School • Corporate • Healthcare Attire
            </span>
          )}
        </div>
      )}
    </div>
  );
};
