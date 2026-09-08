import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  alt?: string;
}

export default function NobleRoamLogo({
  className = '',
  size = 46,
  alt = 'Noble Roam Africa Safaris Official Logo',
}: LogoProps) {
  const pixelHeight = typeof size === 'number' ? `${size}px` : size;
  const pixelWidth = typeof size === 'number' ? `${Math.round(size * (706 / 900))}px` : 'auto';

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ height: pixelHeight, width: pixelWidth }}
    >
      <img
        src="/logo.png"
        alt={alt}
        width={706}
        height={900}
        className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
}

