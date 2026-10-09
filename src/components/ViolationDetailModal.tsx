import React, { useState } from 'react';
import { TrafficViolation } from '../types/traffic';
import { formatCurrency } from '../utils/turkishSearch';
import { findViolationByExactArticle } from '../data/databaseProvider';
import {
  X,
  Heart,
  Plus,
  Check,
  Copy,
  AlertTriangle,
  Car,
  IdCard,
  FileText,
  Calendar,
  CheckCircle2,
  Layers,
  ExternalLink,
  BookOpen,
  UserCheck,
  Scale,
} from 'lucide-react';

interface ViolationDetailModalProps {
  violation: TrafficViolation | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  isInCalculator: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCalculator: (violation: TrafficViolation) => void;
  onNavigateToLegislation?: (article: string, lawType?: string) => void;
}

export const ViolationDetailModal: React.FC<ViolationDetailModalProps> = ({
  violation,
  isOpen,
  onClose,
  isFavorite,
  isInCalculator,
  onToggleFavorite,
  onToggleCalculator,
  onNavigateToLegislation,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !violation) return null;

  // 2026 Yapılandırılmış Veritabanı Kaydını Getir
  const structuredData = findViolationByExactArticle(violation.article);

  const pointsText =
    structuredData?.cezaPuani !== undefined
      ? structuredData.cezaPuani !== null
        ? `${structuredData.cezaPuani} Puan`
        : 'Ceza puanı uygulanmaz'
      : violation.points > 0
      ? `${violation.points} Puan`
      : 'Ceza puanı uygulanmaz';

  const yolaDevamText =
    structuredData?.yolaDevam ||
    (violation.vehicleAction && violation.vehicleAction.toLowerCase().includes('men')
      ? 'Eksiklik giderilene kadar seyre izin verilmez'
      : 'Yola devam edebilir');

  const handleCopy = () => {
    const textToCopy = `[TRAFİK İDARİ PARA CEZASI VE YAPTIRIM REHBERİ]
MADDE: ${violation.article} (${structuredData?.kanun || '2918 SKTK'})
İHLAL: ${violation.title}
AÇIKLAMA: ${violation.fullDescription}
UYGULANAN KİŞİ: ${violation.appliesTo}
CEZA TUTARI: ${formatCurrency(violation.fineAmount)}
%25 İNDİRİMLİ TUTAR: ${formatCurrency(violation.discountedFine)} (1 Ay İçinde)
CEZA PUANI: ${pointsText}
SÜRÜCÜ BELGESİ İŞLEMİ: ${violation.licenseAction || 'Sürücü belgesi işlemi uygulanmaz'}
ARAÇ İŞLEMİ: ${violation.vehicleAction || 'Araç muhafaza / men işlemi uygulanmaz'}
TRAFİKTEN MEN: ${structuredData?.trafiktenMen ? 'Evet (Trafikten men edilir)' : 'Hayır'}
DİĞER YAPTIRIMLAR: ${structuredData?.digerYaptirimlar || 'Yok'}
YOLA DEVAM: ${yolaDevamText}
KANUNİ DAYANAK: ${violation.legalBasis}
KAYNAK: ${structuredData?.kaynak || 'Emniyet Genel Müdürlüğü & Jandarma Genel Komutanlığı Trafik Ceza Rehberi'}
`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[92vh] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50 dark:bg-slate-950/70">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-black text-sm sm:text-base px-3 py-1 rounded-lg bg-blue-900 text-blue-100 border border-blue-700 shadow-xs">
                Madde {violation.article}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {violation.categoryName}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                2026 Resmi Veri
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 pt-1">
              {violation.title}
            </h2>
          </div>

          <div className="flex items-center space-x-1 shrink-0 ml-2">
            {/* Kalp İkonu Favori Butonu (Kullanıcı Talebi) */}
            <button
              onClick={() => onToggleFavorite(violation.id)}
              className={`p-2 rounded-lg border transition cursor-pointer ${
                isFavorite
                  ? 'bg-red-50 dark:bg-red-950/60 text-red-600 border-red-300 dark:border-red-800'
                  : 'text-slate-500 hover:text-red-500 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-slate-800 dark:text-slate-200 text-sm">
          {/* Key Financial and Point Stats Box */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="bg-slate-100 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                2026 CEZA TUTARI
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                {formatCurrency(violation.fineAmount)}
              </span>
              <span className="text-[10px] text-slate-500 block">Trafik Zabıtası Cezası</span>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block">
                %25 İNDİRİMLİ TUTAR
              </span>
              <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                {formatCurrency(violation.discountedFine)}
              </span>
              <span className="text-[10px] text-emerald-600/80 dark:text-emerald-500 block">1 ay içinde ödemede</span>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-800/60 flex flex-col justify-center">
              <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 block">
                CEZA PUANI
              </span>
              <span className="text-base sm:text-lg font-black text-rose-700 dark:text-rose-400">
                {pointsText}
              </span>
              <span className="text-[10px] text-rose-600/80 dark:text-rose-500 block truncate">
                Uygulanan: {violation.appliesTo}
              </span>
            </div>
          </div>

          {/* UYGULANAN KİŞİ KUTUSU */}
          <div className="bg-blue-50/70 dark:bg-blue-950/30 p-3 rounded-xl border border-blue-200 dark:border-blue-900/50 flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider block">
                UYGULANAN KİŞİ / TARAF
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {violation.appliesTo}
              </span>
            </div>
          </div>

          {/* ÖZEL DURUMLAR: Tekrarlar / Kademeler (ihlaller) */}
          {structuredData?.ihlaller && structuredData.ihlaller.length > 0 && (
            <div className="bg-indigo-50/60 dark:bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 space-y-2">
              <h4 className="font-bold text-xs text-indigo-900 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                ÖZEL DURUMLAR (Tekrarlar & Kademeler)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {structuredData.ihlaller.map((rule) => (
                  <div
                    key={rule.sira}
                    className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-indigo-100 dark:border-slate-800 text-xs space-y-1 shadow-2xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                      <span>{rule.aciklama || `${rule.sira}. İhlal`}</span>
                      <span className="text-rose-600 dark:text-rose-400 font-mono">
                        {formatCurrency(rule.ceza)}
                      </span>
                    </div>
                    {rule.indirimliTutar && (
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                        İndirimli: {formatCurrency(rule.indirimliTutar)}
                      </div>
                    )}
                    {rule.ehliyetGeriAlma && (
                      <div className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium">
                        Sürücü Belgesi: {rule.ehliyetGeriAlma}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROL VE İŞLETEN / GÖNDEREN AYRIMI */}
          {structuredData?.rolAyrilimi && (
            <div className="bg-amber-50/80 dark:bg-amber-950/40 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs space-y-1">
              <span className="font-bold text-amber-900 dark:text-amber-300 uppercase block tracking-wider">
                SÜRÜCÜ / İŞLETEN / GÖNDEREN AYRIMI
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {structuredData.rolAyrilimi.aciklama}
              </p>
            </div>
          )}

          {/* İHLAL VE AÇIKLAMA */}
          <div className="bg-slate-50 dark:bg-slate-950/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              İHLAL VE AÇIKLAMA
            </h4>
            <p className="leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
              {violation.fullDescription}
            </p>
          </div>

          {/* ARAÇ İŞLEMİ, TRAFİKTEN MEN & SÜRÜCÜ BELGESİ İŞLEMİ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Vehicle Action & Impound */}
            <div className="bg-amber-50/70 dark:bg-amber-950/30 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 space-y-1">
              <h4 className="font-bold text-xs text-amber-900 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Car className="w-4 h-4 text-amber-600" />
                ARAÇ İŞLEMİ & TRAFİKTEN MEN
              </h4>
              <p className="text-slate-700 dark:text-slate-300 font-medium text-xs leading-relaxed">
                {violation.vehicleAction || 'Araç hakkında trafikten men işlemi uygulanmaz.'}
              </p>
              <div className="pt-1 text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Trafikten Men: </span>
                {structuredData?.trafiktenMen ? (
                  <span className="text-rose-600 dark:text-rose-400 font-bold">EVET (Men Edilir)</span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">HAYIR</span>
                )}
              </div>
            </div>

            {/* License Action */}
            <div className="bg-indigo-50/70 dark:bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 space-y-1">
              <h4 className="font-bold text-xs text-indigo-900 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <IdCard className="w-4 h-4 text-indigo-600" />
                SÜRÜCÜ BELGESİ İŞLEMİ
              </h4>
              <p className="text-slate-700 dark:text-slate-300 font-medium text-xs leading-relaxed">
                {violation.licenseAction || 'Sürücü belgesi hakkında geri alma veya iptal işlemi uygulanmaz.'}
              </p>
              {structuredData?.ehliyetIptal && (
                <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 pt-0.5">
                  ⚠️ Sürücü Belgesi Doğrudan İPTAL Edilir.
                </div>
              )}
            </div>
          </div>

          {/* YOLA DEVAM & DİĞER YAPTIRIMLAR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                YOLA DEVAM DURUMU
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {yolaDevamText}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                DİĞER YAPTIRIMLAR
              </span>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {structuredData?.digerYaptirimlar || 'Ek adli/idari yaptırım bulunmamaktadır.'}
              </p>
            </div>
          </div>

          {/* Action Procedure (Field Officer) */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-xs text-blue-700 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              KOLLUK PERSONELİ UYGULAMA ADIMLARI
            </h4>
            <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed pl-1 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800">
              {violation.actionProcedure}
            </div>
          </div>

          {/* Field Officer Warnings */}
          {violation.officerNotes && (
            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-600 p-3.5 rounded-r-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-800 dark:text-red-400 uppercase">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                SAHA GÖREVLİSİ KRİTİK NOTU / İKAZ
              </div>
              <p className="text-xs sm:text-sm text-red-950 dark:text-red-200 leading-relaxed font-medium">
                {violation.officerNotes}
              </p>
            </div>
          )}

          {/* KANUNİ DAYANAK & MEVZUATA TEK TIKLA GİTME BUTONU (Kullanıcı Talebi) */}
          <div className="bg-slate-100/70 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3 text-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-blue-600" />
                KANUNİ DAYANAK & RESMİ MEVZUAT
              </div>

              {/* Kullanıcı Talebi: Kanuni dayanak kısmında mevzuata tek tıkla gitme butonu */}
              {onNavigateToLegislation && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToLegislation(violation.article, violation.lawType);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Mevzuatta Görüntüle (Madde {violation.article})</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-200 block">Kanuni Dayanak:</span>
                <span className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {violation.legalBasis}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-200 block">Resmi Kaynak:</span>
                {structuredData?.kaynak || 'EGM & JGK Trafik Ceza Rehberi'}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 gap-1">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Son Güncelleme: {structuredData?.sonGuncelleme || '27.02.2026'}</span>
              </div>
              {structuredData?.kaynakUrl && (
                <a
                  href={structuredData.kaynakUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Resmi Rehber Bağlantısı <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Tüm Detayları Kopyala</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleCalculator(violation)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                isInCalculator
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isInCalculator ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Faaliyete Eklendi</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Faaliyete Ekle</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
