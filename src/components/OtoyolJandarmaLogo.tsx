import React from 'react';
import commonLogoUrl from '../assets/images/trafik_denetim_rehberi_foto_logo.jpg';

interface OtoyolJandarmaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'rounded' | 'circle' | 'square';
}

export const TRAFIK_ORTAK_LOGO_IMAGE_PATH = commonLogoUrl;
export const TRAFIK_ORTAK_FULL_LOGO_IMAGE_PATH = commonLogoUrl;
export const OTOYOL_JANDARMA_IMAGE_PATH = commonLogoUrl;

export const OtoyolJandarmaLogo: React.FC<OtoyolJandarmaLogoProps> = ({
  className = '',
  size = 'md',
  shape = 'rounded',
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
    '2xl': 'w-36 h-36 sm:w-44 sm:h-44',
  }[size];

  const roundedClasses = {
    rounded: 'rounded-xl sm:rounded-2xl',
    circle: 'rounded-full',
    square: 'rounded-lg',
  }[shape];

  return (
    <div
      className={`relative ${roundedClasses} overflow-hidden shrink-0 shadow-lg ring-2 ring-amber-400/80 dark:ring-amber-400/90 bg-slate-900 ${sizeClasses} ${className}`}
    >
      <img
        src={commonLogoUrl}
        alt="Trafik Denetim Rehberi - Trafik Jandarması & Trafik Polisi"
        className="w-full h-full object-cover object-center"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};

export const TrafikOrtakLogo = OtoyolJandarmaLogo;
export const TrafficCommonLogo = OtoyolJandarmaLogo;
