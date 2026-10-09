import React, { useState, useEffect, useRef } from 'react';
import { LEGISLATION_ARTICLES, LegislationArticle } from '../data/legislationData';
import { matchesSearchQuery } from '../utils/turkishSearch';
import {
  BookOpen,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Scale,
  FileText,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { TrafficViolation } from '../types/traffic';

interface LegislationViewProps {
  targetArticle?: string | null;
  onSelectViolationByArticle?: (article: string) => void;
  allViolations?: TrafficViolation[];
}

export const LegislationView: React.FC<LegislationViewProps> = ({
  targetArticle,
  onSelectViolationByArticle,
  allViolations = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLawFilter, setSelectedLawFilter] = useState<
    'all' | '2918-SKTK' | 'KTY' | '4925-STK' | 'KTY-TASIMA'
  >('all');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const articleRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto-expand and scroll if targetArticle is passed (e.g. from violation detail click)
  useEffect(() => {
    if (targetArticle) {
      // Find matching article in legislation data
      // targetArticle might be "48/5", "65/1-a", "Madde 48", "36", etc.
      const cleanTarget = targetArticle.trim().toLowerCase();
      const match = LEGISLATION_ARTICLES.find((art) => {
        const artNumClean = art.articleNumber.toLowerCase();
        if (cleanTarget.includes('65') && artNumClean.includes('65')) return true;
        if (cleanTarget.includes('48') && artNumClean.includes('48')) return true;
        if (cleanTarget.includes('36') && artNumClean.includes('36')) return true;
        if (cleanTarget.includes('51') && artNumClean.includes('51')) return true;
        if (cleanTarget.includes('23') && artNumClean.includes('23')) return true;
        if (cleanTarget.includes('26/a') && art.id === 'stk-26-a') return true;
        if (cleanTarget.includes('26/e') && art.id === 'stk-26-e') return true;
        if (cleanTarget.includes('34') && artNumClean.includes('34')) return true;
        if (cleanTarget.includes('91') && artNumClean.includes('91')) return true;
        if (cleanTarget.includes('78') && artNumClean.includes('78')) return true;
        if (cleanTarget.includes('67') && artNumClean.includes('67')) return true;
        if (cleanTarget.includes('30') && artNumClean.includes('30')) return true;
        if (cleanTarget.includes('31') && artNumClean.includes('31')) return true;
        if (cleanTarget.includes('39') && artNumClean.includes('39')) return true;
        if (cleanTarget.includes('46') && artNumClean.includes('46')) return true;
        if (cleanTarget.includes('47') && artNumClean.includes('47')) return true;
        return (
          art.relatedViolations?.some((rv) => cleanTarget.includes(rv.toLowerCase())) ||
          artNumClean.includes(cleanTarget)
        );
      });

      if (match) {
        setExpandedArticleId(match.id);
        setTimeout(() => {
          articleRefs.current[match.id]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 150);
      }
    }
  }, [targetArticle]);

  // Filter legislation articles
  const filteredArticles = LEGISLATION_ARTICLES.filter((item) => {
    // Law type filter
    if (selectedLawFilter !== 'all' && item.lawType !== selectedLawFilter) {
      return false;
    }

    // Text search
    if (!searchQuery.trim()) return true;

    return (
      matchesSearchQuery(searchQuery, {
        article: item.articleNumber,
        title: item.articleTitle,
        description: item.summary,
        fullDescription: item.fullText,
        keywords: item.keywords,
      }) ||
      item.lawName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.chapter?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCopy = (item: LegislationArticle) => {
    const text = `${item.lawName}\n${item.articleNumber}: ${item.articleTitle}\n\n${item.fullText}\n\n[Trafik Denetim Rehberi]`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const lawPills = [
    { id: 'all', label: 'Tüm Mevzuat' },
    { id: '2918-SKTK', label: '2918 SKTK (Trafik Kanunu)' },
    { id: 'KTY', label: 'KTY (Trafik Yönetmeliği)' },
    { id: '4925-STK', label: '4925 STK (Taşıma Kanunu)' },
    { id: 'KTY-TASIMA', label: 'Taşıma Yönetmeliği' },
  ];

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 rounded-2xl shadow-xl border border-blue-900/60 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-100 uppercase">
              MEVZUAT VERİ TABANI
            </h1>
            <p className="text-xs text-slate-300">
              2918 Sayılı SKTK, 4925 Sayılı STK ve İlgili Yönetmelikler
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          Trafik Jandarması ve Trafik Polisi denetimlerinde uygulanan resmi kanun maddeleri, yönetmelik hükümleri ve yasal dayanak metinleri.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="sticky top-16 z-20 bg-slate-50 dark:bg-slate-950 pt-1 pb-2 space-y-2">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Mevzuatta madde no veya kavram ara (örn: Madde 48, alkol, tonaj, src, plaka)..."
            className="w-full pl-11 pr-10 py-3 text-sm sm:text-base rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-md focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Temizle"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Kanun & Yönetmelik Filtreleme Sekmeleri */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {lawPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedLawFilter(pill.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedLawFilter === pill.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          Toplam <strong>{filteredArticles.length}</strong> mevzuat maddesi listelendi
        </span>
        {(searchQuery || selectedLawFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLawFilter('all');
            }}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Filtreleri Sıfırla
          </button>
        )}
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((item) => {
            const isExpanded = expandedArticleId === item.id;
            const isTargeted = targetArticle && item.id === expandedArticleId;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  articleRefs.current[item.id] = el;
                }}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all overflow-hidden shadow-xs ${
                  isTargeted
                    ? 'ring-2 ring-blue-500 border-blue-400 dark:border-blue-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Header */}
                <div
                  onClick={() => setExpandedArticleId(isExpanded ? null : item.id)}
                  className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-3 select-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-black text-xs sm:text-sm px-2.5 py-1 rounded-lg bg-blue-900 text-blue-100 border border-blue-700">
                        {item.articleNumber}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {item.lawName}
                      </span>
                      {item.chapter && (
                        <span className="text-[10px] font-medium text-slate-400 hidden sm:inline">
                          • {item.chapter}
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 pt-0.5">
                      {item.articleTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0 mt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Madde Metnini Kopyala"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <div className="p-2 text-slate-400">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Full Text */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/50 space-y-3.5 animate-in fade-in">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block flex items-center gap-1.5 pt-2">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        Tam Kanun / Yönetmelik Metni
                      </span>
                      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-mono whitespace-pre-line leading-relaxed shadow-2xs">
                        {item.fullText}
                      </div>
                    </div>

                    {/* Related Traffic Violations in the Database */}
                    {item.relatedViolations && item.relatedViolations.length > 0 && (
                      <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          Bu Maddeye Bağlı Ceza İhlalleri:
                        </span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.relatedViolations.map((relArt) => {
                            const foundVio = allViolations.find((v) =>
                              v.article.startsWith(relArt) || v.article === relArt
                            );
                            return (
                              <button
                                key={relArt}
                                type="button"
                                onClick={() => {
                                  if (onSelectViolationByArticle) {
                                    onSelectViolationByArticle(relArt);
                                  }
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-blue-900 transition text-xs font-bold cursor-pointer"
                              >
                                <span>Ceza Maddesi: {relArt}</span>
                                {foundVio && (
                                  <span className="text-[10px] opacity-80">
                                    ({foundVio.fineAmount.toLocaleString('tr-TR')} ₺)
                                  </span>
                                )}
                                <ArrowRight className="w-3 h-3 ml-0.5" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
              Mevzuat Maddesi Bulunamadı
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              "{searchQuery}" aramasıyla eşleşen bir kanun veya yönetmelik maddesi bulunamadı.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLawFilter('all');
                }}
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
