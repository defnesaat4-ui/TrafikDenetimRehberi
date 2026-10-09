import React from 'react';
import { TrafficViolation } from '../types/traffic';
import { formatCurrency } from '../utils/turkishSearch';
import { Heart, Plus, Check, ChevronRight, Car, IdCard, Scale } from 'lucide-react';

interface ViolationCardProps {
  violation: TrafficViolation;
  isFavorite: boolean;
  isInCalculator: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCalculator: (violation: TrafficViolation) => void;
  onSelect: (violation: TrafficViolation) => void;
  textSize: 'normal' | 'large' | 'xlarge';
}

export const ViolationCard: React.FC<ViolationCardProps> = ({
  violation,
  isFavorite,
  isInCalculator,
  onToggleFavorite,
  onToggleCalculator,
  onSelect,
  textSize,
}) => {
  const isVehicleImpounded =
    violation.vehicleAction && violation.vehicleAction.toLowerCase().includes('men');
  const isLicenseSuspended =
    violation.licenseAction &&
    (violation.licenseAction.toLowerCase().includes('geri alınır') ||
      violation.licenseAction.toLowerCase().includes('iptal'));
  const isPenalLaw = violation.legalBasis && violation.legalBasis.includes('TCK');

  const textClasses = {
    normal: { title: 'text-sm sm:text-base', desc: 'text-xs sm:text-sm', amount: 'text-base font-extrabold' },
    large: { title: 'text-base sm:text-lg', desc: 'text-sm sm:text-base', amount: 'text-lg font-black' },
    xlarge: { title: 'text-lg sm:text-xl', desc: 'text-base sm:text-lg', amount: 'text-xl font-black' },
  }[textSize];

  return (
    <div
      onClick={() => onSelect(violation)}
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition overflow-hidden cursor-pointer active:scale-[0.995]"
    >
      {/* Top Header of Card */}
      <div className="p-3 sm:p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          {/* Article & Category */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono font-black text-sm px-2.5 py-1 rounded-lg bg-blue-900 text-blue-100 border border-blue-700">
              {violation.article}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {violation.categoryName}
            </span>
            {violation.points > 0 && (
              <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded-md border border-red-200 dark:border-red-900/60">
                {violation.points} Ceza Puanı
              </span>
            )}
          </div>

          {/* Action buttons (Favorite Heart + Add to Calc) */}
          <div className="flex items-center space-x-1 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(violation.id);
              }}
              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                isFavorite
                  ? 'bg-red-50 dark:bg-red-950/60 text-red-600 border-red-300 dark:border-red-800'
                  : 'text-slate-400 hover:text-red-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              aria-label="Favori"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCalculator(violation);
              }}
              className={`p-1.5 rounded-lg border transition flex items-center gap-1 cursor-pointer ${
                isInCalculator
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
              }`}
              title={isInCalculator ? 'Hesaplayıcıdan Çıkar' : 'Hesaplayıcıya Ekle'}
              aria-label="Hesaplayıcı"
            >
              {isInCalculator ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-slate-900 dark:text-slate-100 mt-2 hover:text-blue-600 dark:hover:text-blue-400 transition ${textClasses.title}`}
        >
          {violation.title}
        </h3>

        {/* Short description */}
        <p className={`text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 ${textClasses.desc}`}>
          {violation.shortDescription}
        </p>

        {/* Badges for crucial law enforcement actions */}
        <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
          {isVehicleImpounded && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900/50">
              <Car className="w-3 h-3" />
              Trafikten Men
            </span>
          )}
          {isLicenseSuspended && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900/50">
              <IdCard className="w-3 h-3" />
              Sürücü Belgesine El Koyma
            </span>
          )}
          {isPenalLaw && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-900/50">
              <Scale className="w-3 h-3" />
              Adli İşlem (TCK)
            </span>
          )}
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Kime: <strong className="text-slate-700 dark:text-slate-300">{violation.appliesTo}</strong>
          </span>
        </div>
      </div>

      {/* Card Footer: Fine amount and Detail button */}
      <div className="bg-slate-50 dark:bg-slate-950/60 px-3 sm:px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            İdari Para Cezası
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-slate-900 dark:text-slate-100 ${textClasses.amount}`}>
              {formatCurrency(violation.fineAmount)}
            </span>
            {violation.fineAmount > 0 && (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium hidden xs:inline">
                (Erken: {formatCurrency(violation.discountedFine)})
              </span>
            )}
          </div>
        </div>

        <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-900/80 transition">
          <span>İşlem Detayı</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
