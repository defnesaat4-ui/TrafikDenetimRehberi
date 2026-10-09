import React, { useState } from 'react';
import { TrafficViolation, CalculatedItem, DailyShiftActivity } from '../types/traffic';
import { formatCurrency, matchesSearchQuery } from '../utils/turkishSearch';
import {
  Plus,
  Minus,
  Trash2,
  Copy,
  Check,
  Search,
  X,
  Share2,
  Car,
  RotateCcw,
  Calendar,
  Users,
  ShieldAlert,
  FileText,
} from 'lucide-react';

interface CalculatorViewProps {
  items: CalculatedItem[];
  allViolations: TrafficViolation[];
  activity: DailyShiftActivity;
  onChangeActivity: (updater: (prev: DailyShiftActivity) => DailyShiftActivity) => void;
  onAddItem: (violation: TrafficViolation) => void;
  onIncrementQuantity: (id: string) => void;
  onDecrementQuantity: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onClear: () => void;
  onSelectViolation: (violation: TrafficViolation) => void;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  items,
  allViolations,
  activity,
  onChangeActivity,
  onAddItem,
  onIncrementQuantity,
  onDecrementQuantity,
  onRemoveItem,
  onClear,
  onSelectViolation,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Filter available violations for the picker
  const filteredViolations = allViolations.filter((v) =>
    matchesSearchQuery(searchQuery, {
      article: v.article,
      title: v.title,
      description: v.shortDescription,
      keywords: v.keywords,
      categoryName: v.categoryName,
    })
  );

  // Calculations
  const totalFine = items.reduce(
    (sum, item) => sum + item.violation.fineAmount * item.quantity,
    0
  );
  const totalPenaltiesCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Format captured persons representation
  const totalCapturedPersons = activity.capturedPersonsUyap + activity.capturedPersonsAsal;
  let capturedPersonsText = `${totalCapturedPersons}`;
  if (totalCapturedPersons > 0) {
    const details: string[] = [];
    if (activity.capturedPersonsAsal > 0) {
      details.push(
        activity.capturedPersonsUyap === 0
          ? 'ASAL'
          : `${activity.capturedPersonsAsal} ASAL`
      );
    }
    if (activity.capturedPersonsUyap > 0) {
      details.push(
        activity.capturedPersonsAsal === 0
          ? 'UYAP'
          : `${activity.capturedPersonsUyap} UYAP`
      );
    }
    capturedPersonsText = `${totalCapturedPersons} (${details.join(', ')})`;
  }

  // Generate Faaliyet Sonucu text
  const generateFaaliyetSonucuText = () => {
    let report = `TARİH: ${activity.date}\n`;
    report += `TİM ADI: ${activity.teamName}\n\n`;
    report += `FAALİYET SONUCU;\n\n`;
    report += `✅Kontrol edilen araç sayısı: ${activity.checkedVehicles}\n`;
    report += `✅Kontrol edilen şahıs sayısı: ${activity.checkedPersons}\n`;
    report += `✅Yazılan ceza sayısı: ${totalPenaltiesCount}\n`;
    report += `✅Yazılan ceza miktarı: ${formatCurrency(totalFine)}\n`;
    report += `✅Yakalanan araç sayısı: ${activity.capturedVehicles}\n`;
    report += `✅Yakalanan şahıs: ${capturedPersonsText}\n`;
    report += `✅Ele geçirilen suç eşyası: ${activity.seizedCrimeGoods}\n\n`;

    if (items.length > 0) {
      items.forEach((item) => {
        report += `${item.violation.article} (${item.quantity} Adet)\n`;
      });
      report += `\n`;
    }

    report += `Arz ederim.`;
    return report;
  };

  const handleCopyReport = () => {
    const text = generateFaaliyetSonucuText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = generateFaaliyetSonucuText();
    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // Helper updater for numeric activity counters
  const updateCounter = (field: keyof DailyShiftActivity, delta: number) => {
    onChangeActivity((prev) => {
      const currentVal = typeof prev[field] === 'number' ? (prev[field] as number) : 0;
      const nextVal = Math.max(0, currentVal + delta);
      return { ...prev, [field]: nextVal };
    });
  };

  const setCounterValue = (field: keyof DailyShiftActivity, val: number) => {
    onChangeActivity((prev) => ({
      ...prev,
      [field]: Math.max(0, val),
    }));
  };

  // Helper renderer for counter input that allows 0 to be deleted cleanly
  const renderCounterInput = (field: keyof DailyShiftActivity) => {
    const currentVal = typeof activity[field] === 'number' ? (activity[field] as number) : 0;
    return (
      <input
        type="number"
        value={currentVal === 0 ? '' : currentVal}
        placeholder="0"
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          const raw = e.target.value.trim();
          if (raw === '') {
            setCounterValue(field, 0);
          } else {
            const parsed = parseInt(raw, 10);
            setCounterValue(field, isNaN(parsed) ? 0 : Math.max(0, parsed));
          }
        }}
        className="w-full px-2 py-1 text-xs font-bold rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
      />
    );
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24">
      {/* Sadece "Faaliyet Sonucu" Başlığı Olacak (Kullanıcı Talebi) */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-blue-800 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Faaliyet Sonucu
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ceza Maddesi Ekle</span>
            </button>
            <button
              onClick={onClear}
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
              title="Cezaları Temizle"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tim & Tarih Düzenleme Alanı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 bg-slate-950/70 p-2 rounded-xl border border-slate-800">
            <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-xs text-slate-400 font-semibold shrink-0">TARİH:</span>
            <input
              type="text"
              value={activity.date}
              onChange={(e) =>
                onChangeActivity((prev) => ({ ...prev, date: e.target.value }))
              }
              className="bg-transparent text-xs sm:text-sm font-bold text-white w-full focus:outline-hidden"
              placeholder="GG.AA.YYYY"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-950/70 p-2 rounded-xl border border-slate-800">
            <Users className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-slate-400 font-semibold shrink-0">TİM ADI:</span>
            <input
              type="text"
              value={activity.teamName}
              onChange={(e) =>
                onChangeActivity((prev) => ({ ...prev, teamName: e.target.value }))
              }
              className="bg-transparent text-xs sm:text-sm font-bold text-white w-full focus:outline-hidden"
              placeholder="Örn: 6.Oto.J.Timi"
            />
          </div>
        </div>
      </div>

      {/* Sayaçlar (Counters) Bölümü - 0'lar silinebilir */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Kontrol Edilen Araç Sayısı */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-blue-500" />
                Kontrol Edilen Araç
              </span>
              <span className="text-base font-black text-blue-600 dark:text-blue-400">
                {activity.checkedVehicles}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {renderCounterInput('checkedVehicles')}
              <button
                onClick={() => updateCounter('checkedVehicles', -1)}
                className="p-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 font-bold text-xs shrink-0 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateCounter('checkedVehicles', 1)}
                className="p-1 rounded-lg bg-blue-600 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateCounter('checkedVehicles', 10)}
                className="px-1.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[10px] shrink-0 cursor-pointer"
              >
                +10
              </button>
            </div>
          </div>

          {/* Kontrol Edilen Şahıs Sayısı */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                Kontrol Edilen Şahıs
              </span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                {activity.checkedPersons}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {renderCounterInput('checkedPersons')}
              <button
                onClick={() => updateCounter('checkedPersons', -1)}
                className="p-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 font-bold text-xs shrink-0 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateCounter('checkedPersons', 1)}
                className="p-1 rounded-lg bg-emerald-600 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateCounter('checkedPersons', 10)}
                className="px-1.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] shrink-0 cursor-pointer"
              >
                +10
              </button>
            </div>
          </div>

          {/* Yakalanan Araç Sayısı */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-amber-500" />
                Yakalanan Araç
              </span>
              <span className="text-base font-black text-amber-600 dark:text-amber-400">
                {activity.capturedVehicles}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {renderCounterInput('capturedVehicles')}
              <button
                onClick={() => updateCounter('capturedVehicles', -1)}
                className="p-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 font-bold text-xs shrink-0 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateCounter('capturedVehicles', 1)}
                className="p-1 rounded-lg bg-amber-600 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Yakalanan Şahıs (UYAP) */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                Yakalanan Şahıs (UYAP)
              </span>
              <span className="text-base font-black text-rose-600 dark:text-rose-400">
                {activity.capturedPersonsUyap}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {renderCounterInput('capturedPersonsUyap')}
              <button
                onClick={() => updateCounter('capturedPersonsUyap', -1)}
                className="p-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 font-bold text-xs shrink-0 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateCounter('capturedPersonsUyap', 1)}
                className="p-1 rounded-lg bg-rose-600 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Yakalanan Şahıs (ASAL) */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" />
                Yakalanan Şahıs (ASAL)
              </span>
              <span className="text-base font-black text-indigo-600 dark:text-indigo-400">
                {activity.capturedPersonsAsal}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {renderCounterInput('capturedPersonsAsal')}
              <button
                onClick={() => updateCounter('capturedPersonsAsal', -1)}
                className="p-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 font-bold text-xs shrink-0 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateCounter('capturedPersonsAsal', 1)}
                className="p-1 rounded-lg bg-indigo-600 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Ele Geçirilen Suç Eşyası */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-purple-500" />
                Ele Geçirilen Suç Eşyası
              </span>
              <span className="text-base font-black text-purple-600 dark:text-purple-400">
                {activity.seizedCrimeGoods}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {renderCounterInput('seizedCrimeGoods')}
              <button
                onClick={() => updateCounter('seizedCrimeGoods', -1)}
                className="p-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 font-bold text-xs shrink-0 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateCounter('seizedCrimeGoods', 1)}
                className="p-1 rounded-lg bg-purple-600 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toplam Ceza & Tutar Kartı */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
            Yazılan Ceza Sayısı
          </span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
            {totalPenaltiesCount} Adet
          </span>
          <span className="text-[11px] text-slate-400 block">
            {items.length} farklı madde
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
            Yazılan Ceza Miktarı
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
            {formatCurrency(totalFine)}
          </span>
          <span className="text-[11px] text-slate-400 block">Toplam İdari Para Cezası</span>
        </div>
      </div>

      {/* Yazılan Ceza Maddeleri Listesi */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          <span>Yazılan Ceza Maddeleri ({items.length})</span>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline normal-case flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yeni Madde Ekle</span>
          </button>
        </div>

        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.violation.id}
              className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs"
            >
              <div
                onClick={() => onSelectViolation(item.violation)}
                className="cursor-pointer space-y-0.5 flex-1"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                    Madde {item.violation.article}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600 truncate">
                    {item.violation.title}
                  </h4>
                </div>
                <div className="text-xs text-slate-500">
                  Birim: {formatCurrency(item.violation.fineAmount)} | Toplam:{' '}
                  <strong className="text-slate-700 dark:text-slate-300">
                    {formatCurrency(item.violation.fineAmount * item.quantity)}
                  </strong>
                </div>
              </div>

              {/* Quantity Counter Controls */}
              <div className="flex items-center space-x-2 shrink-0">
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => onDecrementQuantity(item.violation.id)}
                    className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                    title="1 Azalt"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 font-black text-xs sm:text-sm text-slate-900 dark:text-slate-100 min-w-[28px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onIncrementQuantity(item.violation.id)}
                    className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 transition cursor-pointer"
                    title="1 Arttır"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(item.violation.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                  title="Listeden Kaldır"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-6 text-center text-xs text-slate-400 space-y-1">
            <p>Bugün henüz ceza maddesi eklenmedi.</p>
            <p className="text-[11px] text-slate-500">
              "Ceza Maddesi Ekle" butonundan veya arama ekranından yazılan cezaları ekleyebilirsiniz.
            </p>
          </div>
        )}
      </div>

      {/* FAALİYET SONUCU Resmi Rapor Önizleme Kartı */}
      <div className="bg-slate-900 text-slate-100 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <h3 className="font-black text-sm text-amber-400 tracking-wide uppercase">
              FAALİYET SONUCU METNİ
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Raporu Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-xs cursor-pointer"
              title="WhatsApp ile Gönder"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Monospace exact format */}
        <pre className="font-mono text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 overflow-x-auto select-all">
          {generateFaaliyetSonucuText()}
        </pre>
      </div>

      {/* Madde Ekle Arama Çekmecesi */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg max-h-[85vh] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Ceza Maddesi Ekle
              </h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Madde no veya ihlal ara (örn: 34/a, 48/5, sürücü belgesiz)..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>

            {/* List */}
            <div className="p-2 sm:p-3 overflow-y-auto space-y-1.5 flex-1 text-sm">
              {filteredViolations.length > 0 ? (
                filteredViolations.map((violation) => {
                  const existingItem = items.find((i) => i.violation.id === violation.id);
                  return (
                    <div
                      key={violation.id}
                      className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between gap-2 transition"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                            {violation.article}
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                            {violation.title}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {formatCurrency(violation.fineAmount)}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {existingItem && (
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mr-1">
                            ({existingItem.quantity} Adet)
                          </span>
                        )}
                        <button
                          onClick={() => {
                            onAddItem(violation);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
                        >
                          {existingItem ? '+1 Ekle' : 'Listeye Ekle'}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-xs text-slate-400">
                  Aramanıza uygun madde bulunamadı.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
              >
                Tamamla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
