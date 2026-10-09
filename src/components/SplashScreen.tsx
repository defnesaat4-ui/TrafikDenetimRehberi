import React, { useEffect, useState } from 'react';
import { TRAFIK_ORTAK_LOGO_IMAGE_PATH } from './OtoyolJandarmaLogo';
import { ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Show splash for 2.4 seconds then fade out
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(onFinish, 450);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleSkip = () => {
    setFading(true);
    setTimeout(onFinish, 200);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white cursor-pointer select-none transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Subtle Header */}
      <div className="pt-4 flex items-center space-x-2 opacity-80 animate-in fade-in duration-700">
        <ShieldCheck className="w-4 h-4 text-amber-400" />
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-300">
          T.C. İÇİŞLERİ BAKANLIĞI
        </span>
      </div>

      {/* Center Animated Logo & Titles */}
      <div className="flex flex-col items-center text-center space-y-6 max-w-sm">
        {/* Glowing seal logo */}
        <div className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/30 via-blue-600/30 to-amber-500/30 rounded-3xl blur-xl animate-pulse" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-amber-400/80 bg-slate-900 transition-transform duration-700 scale-100 hover:scale-105">
            <img
              src={TRAFIK_ORTAK_LOGO_IMAGE_PATH}
              alt="Trafik Denetim Rehberi Logosu"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Titles */}
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase bg-blue-950/80 text-blue-200 border border-blue-400/40 tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
            <span>Trafik Jandarması & Trafik Polisi</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight drop-shadow-md">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
              Trafik Denetim{' '}
            </span>
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent font-black inline-block">
              Rehberi
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Ortak Denetim ve Uygulama Rehberi
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="w-48 space-y-2 pt-2">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 via-blue-500 to-amber-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" />
          </div>
          <span className="text-[10px] text-slate-400 tracking-wider font-semibold block">
            Veri Tabanı & Mevzuat Yükleniyor...
          </span>
        </div>
      </div>

      {/* Screen Bottom Credit: User Request */}
      <div className="pb-4 text-center animate-in fade-in duration-1000">
        <p className="text-xs sm:text-sm font-bold text-amber-300/90 tracking-wide drop-shadow-sm">
          Yasin SAAT tarafından hazırlanmıştır.
        </p>
        <span className="text-[10px] text-slate-400 block pt-1">
          Geçmek için ekrana dokunun
        </span>
      </div>
    </div>
  );
};
