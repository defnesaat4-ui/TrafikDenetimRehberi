import React, { useState } from 'react';
import { TrafficViolation } from '../types/traffic';
import { formatCurrency } from '../utils/turkishSearch';
import {
  Scale,
  Weight,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Plus,
  ShieldCheck,
  Ban,
  Building2,
  CheckCheck,
} from 'lucide-react';

interface TonajmatikViewProps {
  onAddViolationToShift: (violation: TrafficViolation) => void;
  allViolations?: TrafficViolation[];
}

export const TonajmatikView: React.FC<TonajmatikViewProps> = ({
  onAddViolationToShift,
}) => {
  // Girdi durumları
  const [ruhsatAgirlik, setRuhsatAgirlik] = useState<number | ''>(40000);
  const [kantarSonucu, setKantarSonucu] = useState<number | ''>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Sayısal değerler
  const azamiKG = typeof ruhsatAgirlik === 'number' ? ruhsatAgirlik : 0;
  const kantarKG = typeof kantarSonucu === 'number' ? kantarSonucu : 0;

  // Tölerans Formülü:
  // 40 tona kadar olan ağırlıklarda (<= 40.000 KG): Azami yüklü ağırlığına %3.75 + 500 KG eklenir.
  // 40 tonun üzerinde olan ağırlıklarda (> 40.000 KG): Önce otomatik +2.000 KG (2 ton) eklenir, ardından %3.75 aşım eklenir.
  const isOver40k = azamiKG > 40000;
  let baseAgirlikKG = azamiKG;
  let percentageToleranceKG = 0;
  let toleransliUstSinirKG = 0;

  if (azamiKG > 0) {
    if (isOver40k) {
      baseAgirlikKG = azamiKG + 2000;
      percentageToleranceKG = Math.round(baseAgirlikKG * 0.0375);
      toleransliUstSinirKG = baseAgirlikKG + percentageToleranceKG;
    } else {
      // 40 tona kadar olan ağırlıklarda: %3.75 + 500 KG
      baseAgirlikKG = azamiKG;
      percentageToleranceKG = Math.round(azamiKG * 0.0375) + 500;
      toleransliUstSinirKG = azamiKG + percentageToleranceKG;
    }
  }

  // Otomatik Canlı Hesaplama:
  // sonrasında yüzde 10 aşarsa 65/1-(a) maddesi (10.000 ₺ - Seyre İzin Verilir)
  // yüzde 10 ile yüzde 15 aşarsa 65/1-(b) maddesi (20.000 ₺ - Seyre İzin Verilir)
  // yüzde 15 ile yüzde 20 aşarsa 65/1-(c) maddesi (30.000 ₺ - Seyre İzin Verilir)
  // yüzde 20 ile yüzde 25 aşarsa 65/1-(d) maddesi (40.000 ₺ - SEYRE İZİN VERİLMEZ)
  // yüzde 25 üzeri olursa 65/1-(e) maddesi (60.000 ₺ - SEYRE İZİN VERİLMEZ)
  // Sürücüye ceza uygulanmaz. İşletene ve yük gönderene uygulanır. Ceza puanı düşmez (0 Puan).
  const calculateResult = () => {
    if (azamiKG <= 0 || kantarKG <= 0) {
      return null;
    }

    // Aşım kontrolü (toleranslı yasal üst sınır üzerinden net fazla kilo)
    const netAsimKG = kantarKG - toleransliUstSinirKG;
    const brutAsimKG = kantarKG - azamiKG;

    // Yasal sınır içinde (Ceza uygulanmaz - Yeşil Renk)
    if (netAsimKG <= 0) {
      return {
        isViolation: false,
        levelKey: 'legal',
        status: 'legal',
        title: 'YASAL TARTIM SINIRLARI DAHİLİNDE',
        netAsimKG: 0,
        brutAsimKG: 0,
        asimYuzde: '0.00',
        article: null,
        tierName: 'Yasal Tartım Toleransı Dahilinde',
        totalFine: 0,
        points: 0,
        canTravel: true,
        vehicleAction: 'Araç seyrine izin verilir. Fazla yük yoktur.',
        appliedToText: 'Ceza Uygulanmaz',
        note: `Kantar tartım sonucu (${kantarKG.toLocaleString('tr-TR')} KG), izin verilen yasal toleranslı üst sınır olan ${toleransliUstSinirKG.toLocaleString('tr-TR')} KG dahilindedir.`,
        // Renk Yapılandırması: YEŞİL (Sadece renk değişecek, renk ismi yazmayacak)
        colorTheme: {
          border: 'border-emerald-500 dark:border-emerald-600',
          bg: 'bg-emerald-50 dark:bg-emerald-950/40',
          badgeBg: 'bg-emerald-600 text-white',
          badgeText: 'YASAL SINIR',
          badgeColorHex: '#10b981',
          subCardBg: 'bg-emerald-100/70 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-800',
          articleTag: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 border-emerald-300',
        },
      };
    }

    // Aşım yüzdesi (Yasal töleranslı üst sınıra oranla aşım %)
    const asimYuzdesi = (netAsimKG / toleransliUstSinirKG) * 100;

    // AŞIM KADEMELERİ:
    if (asimYuzdesi <= 10) {
      // %10'A KADAR AŞIM: 65/1-(a) MADDESİ -> SARI RENK (10.000 ₺ / 0 Puan - Seyre İzin Verilir)
      return {
        isViolation: true,
        levelKey: 'tier-a',
        status: 'violation',
        title: 'AŞIRI TONAJ / FAZLA YÜK (%10 Aşım)',
        netAsimKG,
        brutAsimKG,
        asimYuzde: asimYuzdesi.toFixed(2),
        article: '65/1-a',
        articleDisplay: '65/1-(a)',
        tierName: '%10 Aşarsa 65/1-(a) Maddesi',
        totalFine: 10000,
        points: 0,
        canTravel: true,
        vehicleAction: 'Araç seyrine izin verilir (Trafikten men edilmez).',
        appliedToText: 'İşletene ve Yük Gönderene Uygulanır (Sürücüye Ceza Uygulanmaz)',
        legalBasis: '2918 Sayılı SKTK Md. 65/1-(a), KTY Md. 128',
        note: '2918 SKTK 65/1-(a) maddesi uyarınca 10.000 ₺ ceza işletene ve yük gönderene uygulanır. Sürücüye ceza uygulanmaz, puan düşmez. Seyre izin verilir.',
        // Renk Yapılandırması: SARI
        colorTheme: {
          border: 'border-yellow-400 dark:border-yellow-500',
          bg: 'bg-yellow-50 dark:bg-yellow-950/40',
          badgeBg: 'bg-yellow-500 text-slate-950 font-black',
          badgeText: '%10 AŞIM',
          badgeColorHex: '#eab308',
          subCardBg: 'bg-yellow-100/70 dark:bg-yellow-950/60 border-yellow-300 dark:border-yellow-800',
          articleTag: 'bg-yellow-400 text-slate-950 border-yellow-500 font-black',
        },
      };
    } else if (asimYuzdesi <= 15) {
      // %10 İLE %15 ARASI AŞIM: 65/1-(b) MADDESİ -> KEHRİBAR RENK (20.000 ₺ / 0 Puan - Seyre İzin Verilir)
      return {
        isViolation: true,
        levelKey: 'tier-b',
        status: 'violation',
        title: 'AŞIRI TONAJ / FAZLA YÜK (%10 - %15 Aşım)',
        netAsimKG,
        brutAsimKG,
        asimYuzde: asimYuzdesi.toFixed(2),
        article: '65/1-b',
        articleDisplay: '65/1-(b)',
        tierName: '%10 ile %15 Aşarsa 65/1-(b) Maddesi',
        totalFine: 20000,
        points: 0,
        canTravel: true,
        vehicleAction: 'Araç seyrine izin verilir (Trafikten men edilmez).',
        appliedToText: 'İşletene ve Yük Gönderene Uygulanır (Sürücüye Ceza Uygulanmaz)',
        legalBasis: '2918 Sayılı SKTK Md. 65/1-(b), KTY Md. 128',
        note: '2918 SKTK 65/1-(b) maddesi uyarınca 20.000 ₺ ceza işletene ve yük gönderene uygulanır. Sürücüye ceza uygulanmaz, puan düşmez. Seyre izin verilir.',
        // Renk Yapılandırması: KEHRİBAR
        colorTheme: {
          border: 'border-amber-500 dark:border-amber-500',
          bg: 'bg-amber-50 dark:bg-amber-950/40',
          badgeBg: 'bg-amber-500 text-slate-950 font-black',
          badgeText: '%10 - %15 AŞIM',
          badgeColorHex: '#f59e0b',
          subCardBg: 'bg-amber-100/70 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800',
          articleTag: 'bg-amber-500 text-slate-950 border-amber-600 font-black',
        },
      };
    } else if (asimYuzdesi <= 20) {
      // %15 İLE %20 ARASI AŞIM: 65/1-(c) MADDESİ -> TURUNCU RENK (30.000 ₺ / 0 Puan - Seyre İzin Verilir)
      return {
        isViolation: true,
        levelKey: 'tier-c',
        status: 'violation',
        title: 'AŞIRI TONAJ / FAZLA YÜK (%15 - %20 Aşım)',
        netAsimKG,
        brutAsimKG,
        asimYuzde: asimYuzdesi.toFixed(2),
        article: '65/1-c',
        articleDisplay: '65/1-(c)',
        tierName: '%15 ile %20 Aşarsa 65/1-(c) Maddesi',
        totalFine: 30000,
        points: 0,
        canTravel: true,
        vehicleAction: 'Araç seyrine izin verilir (Trafikten men edilmez).',
        appliedToText: 'İşletene ve Yük Gönderene Uygulanır (Sürücüye Ceza Uygulanmaz)',
        legalBasis: '2918 Sayılı SKTK Md. 65/1-(c), KTY Md. 128',
        note: '2918 SKTK 65/1-(c) maddesi uyarınca 30.000 ₺ ceza işletene ve yük gönderene uygulanır. Sürücüye ceza uygulanmaz, puan düşmez. Seyre izin verilir.',
        // Renk Yapılandırması: TURUNCU
        colorTheme: {
          border: 'border-orange-500 dark:border-orange-500',
          bg: 'bg-orange-50 dark:bg-orange-950/40',
          badgeBg: 'bg-orange-500 text-white font-black',
          badgeText: '%15 - %20 AŞIM',
          badgeColorHex: '#f97316',
          subCardBg: 'bg-orange-100/70 dark:bg-orange-950/60 border-orange-300 dark:border-orange-800',
          articleTag: 'bg-orange-500 text-white border-orange-600 font-black',
        },
      };
    } else if (asimYuzdesi <= 25) {
      // %20 İLE %25 ARASI AŞIM: 65/1-(d) MADDESİ -> KOYU TURUNCU RENK (40.000 ₺ / 0 Puan - SEYRE İZİN VERİLMEZ)
      return {
        isViolation: true,
        levelKey: 'tier-d',
        status: 'violation',
        title: 'AŞIRI TONAJ / FAZLA YÜK (%20 - %25 Aşım)',
        netAsimKG,
        brutAsimKG,
        asimYuzde: asimYuzdesi.toFixed(2),
        article: '65/1-d',
        articleDisplay: '65/1-(d)',
        tierName: '%20 ile %25 Aşarsa 65/1-(d) Maddesi',
        totalFine: 40000,
        points: 0,
        canTravel: false,
        vehicleAction: 'SEYRE İZİN VERİLMEZ! Fazla yük aktarılıncaya kadar araç güvenli alana çekilir ve men edilir.',
        appliedToText: 'İşletene ve Yük Gönderene Uygulanır (Sürücüye Ceza Uygulanmaz)',
        legalBasis: '2918 Sayılı SKTK Md. 65/1-(d), KTY Md. 128',
        note: '2918 SKTK 65/1-(d) maddesi uyarınca 40.000 ₺ ceza işletene ve yük gönderene uygulanır. Sürücüye ceza uygulanmaz, puan düşmez. SEYRE İZİN VERİLMEZ.',
        // Renk Yapılandırması: KOYU TURUNCU
        colorTheme: {
          border: 'border-orange-600 dark:border-orange-600',
          bg: 'bg-orange-100/60 dark:bg-orange-950/50',
          badgeBg: 'bg-orange-600 text-white font-black',
          badgeText: '%20 - %25 AŞIM',
          badgeColorHex: '#ea580c',
          subCardBg: 'bg-orange-200/60 dark:bg-orange-900/40 border-orange-400 dark:border-orange-700',
          articleTag: 'bg-orange-600 text-white border-orange-700 font-black',
        },
      };
    } else {
      // %25 ÜZERİ OLURSA: 65/1-(e) MADDESİ -> KIRMIZI RENK (60.000 ₺ / 0 Puan - SEYRE İZİN VERİLMEZ)
      return {
        isViolation: true,
        levelKey: 'tier-e',
        status: 'violation',
        title: 'AĞIR TONAJ AŞIMI (%25 Üzeri İhlal)',
        netAsimKG,
        brutAsimKG,
        asimYuzde: asimYuzdesi.toFixed(2),
        article: '65/1-e',
        articleDisplay: '65/1-(e)',
        tierName: '%25 Üzeri Olursa 65/1-(e) Maddesi',
        totalFine: 60000,
        points: 0,
        canTravel: false,
        vehicleAction: 'SEYRE İZİN VERİLMEZ! Fazla yük aktarılıncaya kadar araç otoparka çekilir ve kesin men edilir.',
        appliedToText: 'İşletene ve Yük Gönderene Uygulanır (Sürücüye Ceza Uygulanmaz)',
        legalBasis: '2918 Sayılı SKTK Md. 65/1-(e), KTY Md. 128',
        note: '2918 SKTK 65/1-(e) maddesi uyarınca 60.000 ₺ ceza işletene ve yük gönderene uygulanır. Sürücüye ceza uygulanmaz, puan düşmez. SEYRE İZİN VERİLMEZ.',
        // Renk Yapılandırması: KIRMIZI
        colorTheme: {
          border: 'border-red-600 dark:border-red-600',
          bg: 'bg-red-50 dark:bg-red-950/50',
          badgeBg: 'bg-red-600 text-white font-black',
          badgeText: '%25 ÜZERİ AŞIM',
          badgeColorHex: '#dc2626',
          subCardBg: 'bg-red-100/70 dark:bg-red-950/60 border-red-300 dark:border-red-800',
          articleTag: 'bg-red-600 text-white border-red-700 font-black',
        },
      };
    }
  };

  const result = calculateResult();

  // Kantar Denetim Raporunu Kopyala
  const handleCopyReport = () => {
    if (!result) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    let text = `⚖️ TRAFİK DENETİMİ KANTAR VE TONAJ TARTIM RAPORU\n`;
    text += `Tarih / Saat: ${dateStr} - ${timeStr}\n\n`;
    text += `Ruhsat Azami Ağırlığı: ${azamiKG.toLocaleString('tr-TR')} KG\n`;
    if (isOver40k) {
      text += `40.000 KG Üzeri Otomatik Ek Tölerans: +2.000 KG (Taban Ağırlık: ${baseAgirlikKG.toLocaleString('tr-TR')} KG)\n`;
      text += `%3.75 Tartı Aşım Töleransı: +${Math.round(baseAgirlikKG * 0.0375).toLocaleString('tr-TR')} KG\n`;
    } else {
      text += `40.000 KG'a Kadar Yasal Tölerans (%3.75 + 500 KG): +${percentageToleranceKG.toLocaleString('tr-TR')} KG\n`;
    }
    text += `Toleranslı İzin Verilen Üst Sınır: ${toleransliUstSinirKG.toLocaleString('tr-TR')} KG\n`;
    text += `Kantar Tartım Sonucu: ${kantarKG.toLocaleString('tr-TR')} KG\n\n`;

    if (!result.isViolation) {
      text += `DURUM: YASAL SINIR DAHİLİNDE (Ceza Uygulanmaz)\n`;
      text += `Araç Seyrine İzin Verilir.\n`;
    } else {
      text += `DURUM: TONAJ AŞIMI TESPİT EDİLDİ!\n`;
      text += `Net Fazla Yük (Sınır Üzeri Aşım): +${result.netAsimKG?.toLocaleString('tr-TR')} KG\n`;
      text += `Aşım Oranı: %${result.asimYuzde}\n`;
      text += `Uygulanacak Kanun Maddesi: 2918 Sayılı SKTK Md. ${result.articleDisplay} (${result.tierName})\n`;
      text += `Ceza Muhatabı: İşletene ve Yük Gönderene (Sürücüye Ceza Uygulanmaz)\n`;
      text += `İDARİ PARA CEZASI: ${formatCurrency(result.totalFine)}\n`;
      text += `Peşin / Erken Ödeme (%25 İndirimli): ${formatCurrency(result.totalFine * 0.75)}\n`;
      text += `Ceza Puanı: Puan Düşmüyor (0 Puan)\n`;
      text += `Seyir Durumu: ${result.canTravel ? 'Seyre İzin Verilir' : 'SEYRE İZİN VERİLMEZ (Trafikten Men)'}\n`;
      text += `Araç Yaptırımı: ${result.vehicleAction}\n`;
    }

    text += `\nTrafik Denetim Rehberi (Trafik Jandarması & Trafik Polisi)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Faaliyet Sonucuna tespit edilen maddeyi ekle
  const handleAddToShift = () => {
    if (!result || !result.isViolation) return;
    const violation: TrafficViolation = {
      id: `ktk-${result.article}-${Date.now()}`,
      article: result.article || '65/1-a',
      category: 'arac-men',
      categoryName: 'Tonaj / Fazla Yük (2918 SKTK 65)',
      title: `Tonaj Aşımı (%${result.asimYuzde} Aşım - ${result.articleDisplay})`,
      shortDescription: `Kantar: ${kantarKG} KG / Ruhsat: ${azamiKG} KG. Net Aşım: +${result.netAsimKG} KG (${formatCurrency(result.totalFine)}).`,
      fullDescription: `2918 sayılı SKTK ${result.articleDisplay} uyarınca tartım toleransı üzerinde aşırı tonajlı yük taşıyan araca uygulanan idari para cezası.`,
      fineAmount: result.totalFine,
      discountedFine: result.totalFine * 0.75,
      points: 0,
      appliesTo: 'İşletene ve Yük Gönderene (Sürücüye Ceza Uygulanmaz)',
      vehicleAction: result.vehicleAction,
      actionProcedure: result.canTravel
        ? 'İdari para cezası işletene ve yük gönderene uygulanır. Sürücüye ceza uygulanmaz. Seyre izin verilir.'
        : 'Fazla yük başka araca aktarılıncaya kadar araç men edilir. Seyre izin verilmez.',
      legalBasis: `2918 Sayılı SKTK Md. ${result.articleDisplay}`,
      officerNotes: `Ceza Tutarı: ${formatCurrency(result.totalFine)}. Sürücüye ceza uygulanmaz, işletene ve yük gönderene uygulanır. Ceza puanı düşülmez (0 Puan). ${result.canTravel ? 'Seyre izin verilir.' : 'Seyre izin verilmez.'}`,
      keywords: ['tonaj', 'kantar', 'fazla yük', '2918 sktk 65', result.article || '65/1-a'],
      lastUpdated: '2026',
    };

    onAddViolationToShift(violation);
    setAddedNotice(`2918 SKTK ${result.articleDisplay} Tonaj Cezası (${formatCurrency(result.totalFine)}) Faaliyet Sonucuna Eklendi ✓`);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  // Hızlı standart ağırlık butonları
  const quickWeightValues = [40000, 32000, 26000, 18000, 3500];

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24">
      {/* Üst Başlık Kartı */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl shadow-xl border border-indigo-900/60 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-100">
                TONAJMATİK
              </h1>
              <p className="text-xs text-slate-300">
                Kantar Hesaplama & 2918 SKTK 65 Canlı Denetim Modülü
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setRuhsatAgirlik(40000);
              setKantarSonucu('');
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
            title="Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canlı Hesaplama Girdi Formu (Hesapla butonu kaldırıldı, değerler canlı hesaplanır) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        {/* Ana Girdi Alanları Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Ruhsat Azami Ağırlık (KG) */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Weight className="w-4 h-4 text-blue-600" />
                Ruhsat Azami Ağırlık (KG)
              </label>
              <span className="text-[11px] font-bold text-slate-500">Tescil Belgesi</span>
            </div>

            <input
              type="number"
              value={ruhsatAgirlik === '' ? '' : ruhsatAgirlik}
              onChange={(e) => {
                setRuhsatAgirlik(e.target.value === '' ? '' : Number(e.target.value));
              }}
              placeholder="Örn: 40000"
              className="w-full text-base sm:text-lg font-black px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            />

            {/* Hızlı Ağırlık Seçim Butonları */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[10px] text-slate-400 font-semibold mr-1">Hızlı Seçim:</span>
              {quickWeightValues.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setRuhsatAgirlik(val)}
                  className={`text-[10px] font-black px-2 py-1 rounded-lg border transition cursor-pointer ${
                    ruhsatAgirlik === val
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  {val.toLocaleString('tr-TR')} KG
                </button>
              ))}
            </div>

            {/* Otomatik Tölerans Değeri Gösterge Kutusu */}
            <div className="text-[11px] text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-700">
              {isOver40k ? (
                <div className="space-y-1 text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between items-center text-amber-700 dark:text-amber-400 font-bold">
                    <span>40 Tonun Üzerindeki Ağırlıklarda:</span>
                    <span>+2.000 KG Tölerans</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Töleranslı Taban Ağırlık:</span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {baseAgirlikKG.toLocaleString('tr-TR')} KG
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-emerald-700 dark:text-emerald-400 font-bold">
                    <span>%3.75 Tartı Aşım Töleransı:</span>
                    <span>+{Math.round(baseAgirlikKG * 0.0375).toLocaleString('tr-TR')} KG</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-bold">
                    <span>40 Tona Kadar Olan Ağırlıklarda:</span>
                    <span className="text-blue-600 dark:text-blue-400">%3.75 + 500 KG</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-700 dark:text-emerald-400 font-bold">
                    <span>Toplam Eklenen Tölerans:</span>
                    <span>+{percentageToleranceKG.toLocaleString('tr-TR')} KG</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center font-black text-xs text-slate-900 dark:text-slate-100 pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>Toleranslı İzin Verilen Üst Sınır:</span>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-black">
                  {toleransliUstSinirKG.toLocaleString('tr-TR')} KG
                </span>
              </div>
            </div>
          </div>

          {/* Kantar Sonucu (KG) */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-blue-600" />
                  Kantar Sonucu (KG)
                </label>
                <span className="text-[11px] font-bold text-slate-500">Ölçülen Tartım</span>
              </div>

              <input
                type="number"
                value={kantarSonucu === '' ? '' : kantarSonucu}
                onChange={(e) => {
                  setKantarSonucu(e.target.value === '' ? '' : Number(e.target.value));
                }}
                placeholder="Kantar tartım sonucunu girin..."
                className="w-full text-base sm:text-lg font-black px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
              <strong className="block font-bold text-slate-900 dark:text-slate-100">Kantar Denetim Esasları:</strong>
              <p>
                Kantar sonucu girildiğinde aşım yüzdesi canlı hesaplanır. <strong>Sürücüye ceza uygulanmaz</strong>; işletene ve yük gönderene uygulanır. Ceza puanı düşmez.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HESAPLAMA SONUÇ KARTI */}
      {result && (
        <div
          className={`rounded-2xl border-2 p-4 sm:p-5 shadow-xl space-y-4 transition-all ${result.colorTheme.border} ${result.colorTheme.bg}`}
        >
          {/* Sonuç Kartı Başlığı */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b pb-3.5 border-slate-300 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {!result.isViolation ? (
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
              ) : (
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-black shrink-0 shadow-md text-white"
                  style={{ backgroundColor: result.colorTheme.badgeColorHex }}
                >
                  <AlertTriangle className="w-7 h-7" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded uppercase tracking-wider inline-block shadow-xs ${result.colorTheme.badgeBg}`}
                  >
                    {result.colorTheme.badgeText}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {result.tierName}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black pt-1 text-slate-900 dark:text-slate-100">
                  {result.title}
                </h3>
              </div>
            </div>

            {/* Kanun Maddesi Vurgulu Rozet */}
            {result.articleDisplay && (
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider">
                  Uygulanacak Madde:
                </span>
                <span
                  className={`font-mono font-black text-sm sm:text-base px-3.5 py-1.5 rounded-xl border shadow-sm ${result.colorTheme.articleTag}`}
                >
                  2918 SKTK Md. {result.articleDisplay}
                </span>
              </div>
            )}
          </div>

          {/* Rakam Detayları */}
          {!result.isViolation ? (
            <div className="p-4 bg-emerald-100/70 dark:bg-emerald-900/40 rounded-xl text-xs sm:text-sm leading-relaxed space-y-2 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100">
              <p className="font-bold flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                {result.note}
              </p>
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold pl-7">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Seyir Durumu: Seyre izin verilir (Ceza uygulanmaz).</span>
              </div>
            </div>
          ) : (
            <>
              {/* Hangi Ağırlıkta Ne Kadar Aşım Yapıldığı */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                  Tartım ve Aşım Raporu:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-[11px] text-slate-500 font-bold block">
                      Kantar Sonucu
                    </span>
                    <span className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                      {kantarKG.toLocaleString('tr-TR')} KG
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-[11px] text-slate-500 font-bold block">
                      Yasal İzinli Üst Sınır
                    </span>
                    <span className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400">
                      {toleransliUstSinirKG.toLocaleString('tr-TR')} KG
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border shadow-xs ${result.colorTheme.subCardBg}`}>
                    <span className="text-[11px] font-bold block opacity-90">
                      Net Fazla Yük (Aşım)
                    </span>
                    <span className="text-base sm:text-lg font-black">
                      +{result.netAsimKG?.toLocaleString('tr-TR')} KG
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border shadow-xs ${result.colorTheme.subCardBg}`}>
                    <span className="text-[11px] font-bold block opacity-90">
                      Aşım Yüzdesi
                    </span>
                    <span className="text-base sm:text-lg font-black">
                      %{result.asimYuzde}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hangi Maddeden İşlem Yapılacağı ve Cezalar */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: result.colorTheme.badgeColorHex }}
                    />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Uygulanacak Kanun Maddesi:
                    </span>
                  </div>
                  <strong className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100">
                    2918 Sayılı SKTK Md. {result.articleDisplay} ({result.tierName})
                  </strong>
                </div>

                {/* Ceza Muhatabı Bildirimi */}
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2 text-blue-950 dark:text-blue-200">
                    <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span><strong>Ceza Muhatabı:</strong> İşletene ve Yük Gönderene uygulanır.</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800">
                    Sürücüye Ceza Uygulanmaz
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Ceza Miktarı */}
                  <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900">
                    <span className="text-[11px] text-blue-700 dark:text-blue-300 block font-semibold">
                      Uygulanacak Ceza Miktarı:
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-blue-700 dark:text-blue-300">
                      {formatCurrency(result.totalFine)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      İşletene ve Yük Gönderene
                    </span>
                  </div>

                  {/* Erken Ödeme İndirimi */}
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <span className="text-[11px] text-emerald-800 dark:text-emerald-300 block font-semibold">
                      Erken / Peşin Ödeme (%25):
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(result.totalFine * 0.75)}
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-500 block font-medium">
                      1 Ay İçinde Ödenirse
                    </span>
                  </div>

                  {/* Ceza Puanı (Puan Düşmüyor) */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 block font-semibold">
                      Ceza Puanı Durumu:
                    </span>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <CheckCheck className="w-5 h-5 text-emerald-600" />
                      <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                        Puan Düşmüyor
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      0 Ceza Puanı
                    </span>
                  </div>
                </div>

                {/* Seyir İzni ve Araç Yaptırımı */}
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    result.canTravel
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                      : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60 text-red-950 dark:text-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <strong className="block font-bold flex items-center gap-1.5">
                      {result.canTravel ? (
                        <>
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Seyir Durumu:</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Seyir Durumu (Men):</span>
                        </>
                      )}
                    </strong>
                    <span
                      className={`text-xs font-black px-2.5 py-0.5 rounded uppercase tracking-wider ${
                        result.canTravel
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-600 text-white animate-pulse'
                      }`}
                    >
                      {result.canTravel ? 'SEYRE İZİN VERİLİR' : 'SEYRE İZİN VERİLMEZ'}
                    </span>
                  </div>
                  <p className="leading-relaxed font-semibold">
                    {result.vehicleAction}
                  </p>
                  <span className="text-[11px] opacity-80 block">
                    {result.canTravel
                      ? '• 2918 SKTK 65/1-(a), (b) ve (c) maddelerinde araç trafikten men edilmez, seyrine devam edebilir.'
                      : '• 2918 SKTK 65/1-(d) ve 65/1-(e) maddelerinde fazla yük aktarılmadan seyre kesinlikle izin verilmez.'}
                  </span>
                </div>
              </div>

              {/* Rapor Kopyalama ve Faaliyet Sonucuna Ekleme Butonları */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleCopyReport}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Kantar Raporu Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Kantar Raporunu Kopyala</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleAddToShift}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs shadow-md transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Faaliyet Sonucuna Ekle (+1 Ceza 2918 SKTK {result.articleDisplay} • {formatCurrency(result.totalFine)})</span>
                </button>
              </div>

              {addedNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 text-center animate-in fade-in">
                  ✓ {addedNotice}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
