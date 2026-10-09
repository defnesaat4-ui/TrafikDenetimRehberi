import React from 'react';
import { Moon, Sun, Settings } from 'lucide-react';
import { LAST_UPDATE_DATE } from '../data/trafficViolations';
import { OtoyolJandarmaLogo } from './OtoyolJandarmaLogo';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Brand / Logo (Kullanıcı Talebi: Trafik Denetim Rehberi) */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <OtoyolJandarmaLogo size="md" />
          <div>
            <div className="flex items-center space-x-1.5 flex-wrap leading-tight">
              <span className="font-black tracking-tight text-sm sm:text-base">
                <span className="text-white">Trafik Denetim </span>
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent font-black">
                  Rehberi
                </span>
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium truncate max-w-[220px] sm:max-w-none">
              Trafik Jandarması & Trafik Polisi Ortak Denetim Rehberi
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title={isDark ? 'Açık Mod' : 'Koyu Mod'}
            aria-label="Tema Değiştir"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Ayarlar & Mevzuat"
            aria-label="Ayarlar"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Subheader ticker for update notice */}
      <div className="bg-slate-950/70 border-t border-slate-800/80 px-4 py-1 text-[11px] text-slate-400 flex items-center justify-between max-w-4xl mx-auto">
        <span className="flex items-center space-x-1.5 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
          <span className="truncate">2918 SKTK & 4925 STK Denetim Sistemi ({LAST_UPDATE_DATE})</span>
        </span>
        <span className="text-[10px] text-slate-400 font-mono hidden xs:inline">
          Çevrimdışı Çalışır
        </span>
      </div>
    </header>
  );
};
