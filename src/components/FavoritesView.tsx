import React, { useState } from 'react';
import { TrafficViolation } from '../types/traffic';
import { ViolationCard } from './ViolationCard';
import { Heart, History, Trash2 } from 'lucide-react';

interface FavoritesViewProps {
  favoriteViolations: TrafficViolation[];
  recentViolations: TrafficViolation[];
  onSelectViolation: (violation: TrafficViolation) => void;
  onToggleFavorite: (id: string) => void;
  onToggleCalculator: (violation: TrafficViolation) => void;
  onClearRecent: () => void;
  onClearFavorites: () => void;
  favoriteIds: string[];
  calculatorIds: string[];
  textSize: 'normal' | 'large' | 'xlarge';
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteViolations,
  recentViolations,
  onSelectViolation,
  onToggleFavorite,
  onToggleCalculator,
  onClearRecent,
  onClearFavorites,
  favoriteIds,
  calculatorIds,
  textSize,
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'recent'>('favorites');

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24">
      {/* Tab Switcher */}
      <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
        <div className="grid grid-cols-2 gap-1 flex-1">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'fill-white text-white' : 'text-slate-400'}`} />
            <span>Favori Maddeler ({favoriteViolations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('recent')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === 'recent'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Son İncelenenler ({recentViolations.length})</span>
          </button>
        </div>
      </div>

      {/* Content depending on active tab */}
      {activeTab === 'favorites' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-slate-500">
              Sık kullandığınız ve kırmızı kalp ile kaydettiğiniz maddeler
            </span>
            {favoriteViolations.length > 0 && (
              <button
                onClick={onClearFavorites}
                className="text-xs text-red-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Tüm Favorileri Sil</span>
              </button>
            )}
          </div>

          {favoriteViolations.length > 0 ? (
            favoriteViolations.map((violation) => (
              <ViolationCard
                key={violation.id}
                violation={violation}
                isFavorite={true}
                isInCalculator={calculatorIds.includes(violation.id)}
                onToggleFavorite={onToggleFavorite}
                onToggleCalculator={onToggleCalculator}
                onSelect={onSelectViolation}
                textSize={textSize}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 text-center space-y-2">
              <Heart className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                Henüz Favori Madde Eklenmedi
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Saha denetimlerinde sıkça işlem yaptığınız maddeleri kartların sağ üstündeki kalp (♥) butonuna dokunarak favorilerinize ekleyebilirsiniz.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-slate-500">
              Son görüntülediğiniz trafik cezası maddeleri
            </span>
            {recentViolations.length > 0 && (
              <button
                onClick={onClearRecent}
                className="text-xs text-red-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Geçmişi Temizle</span>
              </button>
            )}
          </div>

          {recentViolations.length > 0 ? (
            recentViolations.map((violation) => (
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
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 text-center space-y-2">
              <History className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                Henüz İnceleme Geçmişi Yok
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Detayını incelediğiniz maddeler otomatik olarak burada listelenecektir.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
