import React, { useState, useMemo } from 'react';
import { TrafficViolation } from '../types/traffic';
import { matchesSearchQuery } from '../utils/turkishSearch';
import { ViolationCard } from './ViolationCard';
import { Search, X, Scale } from 'lucide-react';

interface SearchViewProps {
  allViolations: TrafficViolation[];
  initialSearchQuery?: string;
  onSelectViolation: (violation: TrafficViolation) => void;
  onToggleFavorite: (id: string) => void;
  onToggleCalculator: (violation: TrafficViolation) => void;
  favoriteIds: string[];
  calculatorIds: string[];
  textSize: 'normal' | 'large' | 'xlarge';
}

export const SearchView: React.FC<SearchViewProps> = ({
  allViolations,
  initialSearchQuery = '',
  onSelectViolation,
  onToggleFavorite,
  onToggleCalculator,
  favoriteIds,
  calculatorIds,
  textSize,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  // Sadece 2918 SKTK ve 4925 STK sekmeleri (Kullanıcı talebi)
  const [selectedLawTab, setSelectedLawTab] = useState<'2918-SKTK' | '4925-STK'>('2918-SKTK');

  // Filter and match items
  const filteredViolations = useMemo(() => {
    return allViolations.filter((v) => {
      // Kanun sekmesi filtresi (Sadece 2918 SKTK veya 4925 STK)
      if (selectedLawTab === '2918-SKTK' && v.lawType === '4925-STK') {
        return false;
      }
      if (selectedLawTab === '4925-STK' && v.lawType !== '4925-STK') {
        return false;
      }

      // Search text matching
      if (!searchQuery.trim()) return true;

      return matchesSearchQuery(searchQuery, {
        article: v.article,
        title: v.title,
        description: v.shortDescription,
        fullDescription: v.fullDescription,
        keywords: v.keywords,
        categoryName: v.categoryName,
        legalBasis: v.legalBasis,
        actionProcedure: v.actionProcedure,
        officerNotes: v.officerNotes,
      });
    });
  }, [allViolations, searchQuery, selectedLawTab]);

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24">
      {/* Search Input Box */}
      <div className="sticky top-16 z-20 bg-slate-50 dark:bg-slate-950 pt-1 pb-2 space-y-2.5">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Madde no veya kural ihlali yazın (örn: 34/a, 48/5, 26/a, sürücü belgesiz)..."
            className="w-full pl-11 pr-10 py-3 text-sm sm:text-base rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-md focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              title="Temizle"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sadece 2918 SKTK ve 4925 STK Sekmeleri (Diğerleri kaldırıldı) */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/80 dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedLawTab('2918-SKTK')}
            className={`py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer ${
              selectedLawTab === '2918-SKTK'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>2918 SKTK</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedLawTab('4925-STK')}
            className={`py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer ${
              selectedLawTab === '4925-STK'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>4925 STK</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          <strong>{selectedLawTab === '2918-SKTK' ? '2918 SKTK' : '4925 STK'}</strong> kapsamında{' '}
          <strong>{filteredViolations.length}</strong> madde listelendi
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
          >
            Aramayı Temizle
          </button>
        )}
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filteredViolations.length > 0 ? (
          filteredViolations.map((violation) => (
            <ViolationCard
              key={violation.id}
              violation={violation}
              isFavorite={favoriteIds.includes(violation.id)}
              isInCalculator={calculatorIds.includes(violation.id)}
              onToggleFavorite={onToggleFavorite}
              onToggleCalculator={onToggleCalculator}
              onSelect={onSelectViolation}
              textSize={textSize}
            />
          ))
        ) : (
          /* Empty Search */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
              Eşleşen Madde Bulunamadı
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              "{searchQuery}" aramasıyla eşleşen bir madde bulunamadı. Lütfen kontrol edin veya diğer kanun sekmesine geçin.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Tüm Maddeleri Göster
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
