import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

export default function NobleRoamLogo({ className = '', size = 44 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} text-amber-500 dark:text-amber-400`}
    >
      {/* Elegant Luxury Shield Outer Border */}
      <path
        d="M50 8 C80 20 85 45 85 62 C85 78 68 90 50 94 C32 90 15 78 15 62 C15 45 20 20 50 8 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Inner golden shield dotted/dashed lining */}
      <path
        d="M50 14 C74 24 78 45 78 60 C78 72 64 83 50 87 C36 83 22 72 22 60 C22 45 26 24 50 14 Z"
        stroke="#F59E0B"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      
      {/* Radiant sun ray behind acacia */}
      <circle cx="50" cy="45" r="15" fill="#F59E0B" fillOpacity="0.12" />
      <circle cx="50" cy="45" r="9" fill="#F59E0B" fillOpacity="0.22" />

      {/* Elegant Golden Crown at the Top Peak */}
      <path
        d="M38 31 L43 35 L50 28 L57 35 L62 31 L60 40 H40 L38 31 Z"
        fill="#F59E0B"
      />
      <circle cx="38" cy="30" r="1.2" fill="#F59E0B" />
      <circle cx="50" cy="27" r="1.5" fill="#F59E0B" />
      <circle cx="62" cy="30" r="1.2" fill="#F59E0B" />
      
      {/* Majestic African Acacia Tree Silhouette */}
      <path
        d="M50 72 V55 M50 63 L44 59 M50 61 L56 57"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Acacia Canopy Layer 1 (Upper dense flat foliage) */}
      <path
        d="M34 50 C37 48 45 47 50 50 C55 47 63 48 66 50 C70 52 68 55 63 55 H37 C32 55 30 52 34 50 Z"
        fill="currentColor"
      />
      
      {/* Acacia Canopy Layer 2 (Lower outer flat foliage) */}
      <path
        d="M38 56 C41 54 46 54 50 56 C54 54 59 54 62 56 C65 57 64 59 60 59 H40 C36 59 35 57 38 56 Z"
        fill="#F59E0B"
      />

      {/* Elegant Roaming Eagle Flight Lines */}
      <path
        d="M33 38 C36 35 41 36 44 38"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M56 38 C59 36 64 35 67 38"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
