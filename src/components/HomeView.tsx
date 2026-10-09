import React, { useState } from 'react';
import { AppTab, TrafficViolation, UnitContactConfig, DEFAULT_UNIT_CONTACT } from '../types/traffic';
import { OtoyolJandarmaLogo } from './OtoyolJandarmaLogo';
import { ViolationCard } from './ViolationCard';
import {
  Search,
  Scale,
  PhoneCall,
  BookOpen,
} from 'lucide-react';

interface HomeViewProps {
  onNavigateTab: (tab: AppTab) => void;
  onSelectViolation: (violation: TrafficViolation) => void;
  onAddViolationToShift: (violation: TrafficViolation) => void;
  allViolations: TrafficViolation[];
  calculatorIds: string[];
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  totalPenaltiesCount: number;
  textSize: 'normal' | 'large' | 'xlarge';
  unitContact?: UnitContactConfig;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateTab,
  onSelectViolation,
  onAddViolationToShift,
  allViolations,
  calculatorIds,
  favoriteIds,
  onToggleFavorite,
  textSize,
  unitContact = DEFAULT_UNIT_CONTACT,
}) => {
  // Law selector tab: '2918-SKTK' or '4925-STK'
  const [selectedLawTab, setSelectedLawTab] = useState<'2918-SKTK' | '4925-STK'>('2918-SKTK');

  // Filter violations by selected law
  const lawViolations = allViolations.filter((v) => {
    if (selectedLawTab === '4925-STK') {
      return v.lawType === '4925-STK';
    }
    // Default 2918 SKTK
    return v.lawType !== '4925-STK';
  });

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-24">
      {/* Hero / Main Command Banner (Kullanıcı Talebi Doğrultusunda Güncellendi) */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-5 sm:p-7 shadow-xl border border-blue-900/60 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-2 flex-1">
              {/* Modern Live Status Badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950/70 border border-blue-400/30 backdrop-blur-md shadow-xs text-[10px] font-black uppercase tracking-wider text-blue-200 flex-wrap">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                </span>
                <span>TRAFİK JANDARMASI & TRAFİK POLİSİ</span>
                <span className="w-1 h-1 rounded-full bg-slate-500 hidden sm:inline" />
                <span className="text-amber-300 font-extrabold hidden sm:inline">2026 RESMİ MEVZUAT</span>
              </div>

              {/* Modernized Trafik Denetim Rehberi Title */}
              <div className="pt-0.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                  <span className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
                    Trafik Denetim{' '}
                  </span>
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent inline-block drop-shadow-sm font-black">
                    Rehberi
                  </span>
                </h1>
                <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-blue-200 font-medium">
                  <span className="inline-block w-5 h-0.5 bg-gradient-to-r from-amber-400 to-blue-400 rounded-full shrink-0" />
                  <span>Ortak Denetim ve Uygulama Rehberi</span>
                </div>
              </div>
            </div>

            {/* Ortak Logo */}
            <div className="shrink-0 drop-shadow-2xl hover:scale-105 transition-transform">
              <OtoyolJandarmaLogo size="xl" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            2918 Sayılı SKTK (Karayolları Trafik Kanunu) ve 4925 Sayılı STK (Karayolu Taşıma Kanunu) mevzuatı, idari yaptırımlar, kantar tonaj ve tutanak usulleri.
          </p>

          {/* Direct Search Bar Trigger */}
          <div
            onClick={() => onNavigateTab('search')}
            className="flex items-center bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600 rounded-xl px-4 py-3.5 shadow-lg cursor-pointer border border-slate-200 dark:border-slate-700 transition group"
          >
            <Search className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform shrink-0" />
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold truncate">
              Madde no veya kural ihlali arayın (örn: 34/a, 48/5, 26/a, sürücü belgesiz, tonaj)...
            </span>
            <span className="ml-auto text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-md hidden xs:inline shrink-0">
              Ara ↵
            </span>
          </div>
        </div>

        {/* Background glow decoration */}
        <div className="absolute -right-12 -bottom-12 w-56 h-56 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Kanun Sekmeleri: 1. Sekme 2918 SKTK | 2. Sekme 4925 STK */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-amber-500" />
            Trafik ve Taşıma Mevzuatı Ceza Rehberi
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">
            {lawViolations.length} Madde Listelendi
          </span>
        </div>

        {/* 2 Büyük Sekme Butonu: 2918 SKTK ve 4925 STK */}
        <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-200/80 dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800">
          <button
            onClick={() => setSelectedLawTab('2918-SKTK')}
            className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 shadow-xs cursor-pointer ${
              selectedLawTab === '2918-SKTK'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="tracking-wide">2918 SKTK</span>
            <span className="text-[10px] font-normal opacity-90 hidden xs:inline">
              (Karayolları Trafik Kanunu)
            </span>
          </button>

          <button
            onClick={() => setSelectedLawTab('4925-STK')}
            className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 shadow-xs cursor-pointer ${
              selectedLawTab === '4925-STK'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="tracking-wide">4925 STK</span>
            <span className="text-[10px] font-normal opacity-90 hidden xs:inline">
              (Karayolu Taşıma Kanunu)
            </span>
          </button>
        </div>

        {/* Sekme Başlık Bilgi Notu */}
        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
          <div className="text-slate-700 dark:text-slate-300">
            <strong>
              {selectedLawTab === '2918-SKTK'
                ? '2918 Sayılı Karayolları Trafik Kanunu Maddeleri'
                : '4925 Sayılı Karayolu Taşıma Kanunu (Yetki Belgesi, SRC, Taşıt Kartı) Maddeleri'}
            </strong>
          </div>
          <button
            onClick={() => onNavigateTab('legislation')}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mevzuata Git</span>
          </button>
        </div>

        {/* Seçili Kanunun Madde Listesi */}
        <div className="space-y-3">
          {lawViolations.map((violation) => (
            <ViolationCard
              key={violation.id}
              violation={violation}
              isFavorite={favoriteIds.includes(violation.id)}
              isInCalculator={calculatorIds.includes(violation.id)}
              onToggleFavorite={onToggleFavorite}
              onToggleCalculator={onAddViolationToShift}
              onSelect={onSelectViolation}
              textSize={textSize}
            />
          ))}
        </div>
      </div>

      {/* Santral & Acil Saha Koordinasyon Çubuğu (Ayarlar'dan Değiştirilebilir) */}
      <div className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-start sm:items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center shrink-0 shadow-xs">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 text-xs sm:text-sm block">
              {unitContact.unitTitle}
            </span>
            <div className="text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-2 flex-wrap pt-0.5">
              <a
                href={`tel:${unitContact.phone1Number.replace(/\s+/g, '')}`}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
              >
                {unitContact.phone1Label}: {unitContact.phone1Number}
              </a>
              <span>•</span>
              <a
                href={`tel:${unitContact.phone2Number.replace(/\s+/g, '')}`}
                className="text-red-600 dark:text-red-400 font-bold hover:underline cursor-pointer"
              >
                {unitContact.phone2Label}
              </a>
              <span>•</span>
              <a
                href={`tel:${unitContact.phone3Number.replace(/\s+/g, '')}`}
                className="text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
              >
                {unitContact.phone3Label}
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
            Hattı Aktif
          </span>
        </div>
      </div>
    </div>
  );
};
