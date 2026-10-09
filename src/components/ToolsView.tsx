import React, { useState } from 'react';
import {
  SPEED_TOLERANCE_RULES,
  PROMIL_LIMITS,
  FREQUENT_FIELD_QUESTIONS,
} from '../data/quickReferences';
import { formatCurrency } from '../utils/turkishSearch';
import { UnitContactConfig, DEFAULT_UNIT_CONTACT } from '../types/traffic';
import {
  Gauge,
  Wine,
  HelpCircle,
  CheckCircle,
  PhoneCall,
  Settings,
} from 'lucide-react';

interface ToolsViewProps {
  unitContact?: UnitContactConfig;
  onOpenSettings?: () => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({
  unitContact = DEFAULT_UNIT_CONTACT,
  onOpenSettings,
}) => {
  // Speed calculator interactive state
  const [limitInput, setLimitInput] = useState<number>(50);
  const [measuredInput, setMeasuredInput] = useState<number>(68);

  // Speed calculation logic
  const calculateSpeedInfraction = () => {
    if (!limitInput || !measuredInput) return null;
    if (measuredInput <= limitInput) {
      return { status: 'safe', message: 'Hız yasal sınır dahilindedir.', article: null, fine: 0, points: 0 };
    }

    const toleranceMax = limitInput * 1.1; // 10% tolerans
    if (measuredInput <= toleranceMax) {
      return {
        status: 'tolerance',
        message: `%10 yasal tolerans içindedir (${toleranceMax.toFixed(1)} km/s). İdari para cezası uygulanmaz.`,
        article: null,
        fine: 0,
        points: 0,
      };
    }

    const excessAmount = measuredInput - limitInput;
    const excessPercentage = (excessAmount / limitInput) * 100;

    if (excessPercentage <= 30) {
      return {
        status: 'tier1',
        percentage: excessPercentage.toFixed(1),
        article: '51/2-a',
        title: 'Hız sınırını %10 - %30 aşmak',
        fine: 1506,
        discounted: 1129.5,
        points: 10,
        licenseAction: 'İşlem yok',
      };
    } else if (excessPercentage <= 50) {
      return {
        status: 'tier2',
        percentage: excessPercentage.toFixed(1),
        article: '51/2-b',
        title: 'Hız sınırını %30 - %50 aşmak',
        fine: 3135,
        discounted: 2351.25,
        points: 15,
        licenseAction: 'İşlem yok',
      };
    } else {
      return {
        status: 'tier3',
        percentage: excessPercentage.toFixed(1),
        article: '51/2-c',
        title: 'Hız sınırını %50\'den fazla aşmak',
        fine: 6439,
        discounted: 4829.25,
        points: 15,
        licenseAction: '1 yıl içinde 5 kez ihlalde 1 yıl sürücü belgesine el koyulur.',
      };
    }
  };

  const speedResult = calculateSpeedInfraction();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Interactive Speed Calculator Tool */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-purple-300" />
            <h2 className="font-bold text-base sm:text-lg">
              Hız & Radar Tolerans Hesaplayıcı
            </h2>
          </div>
          <span className="text-[11px] font-semibold bg-purple-700/60 px-2 py-0.5 rounded text-purple-200">
            %10 Yasal Payı Dahil
          </span>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Limit Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Yoldaki Yasal Hız Sınırı (km/s)
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[50, 70, 82, 90, 110, 130, 140].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setLimitInput(preset)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition cursor-pointer ${
                      limitInput === preset
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={limitInput}
                onChange={(e) => setLimitInput(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Measured Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Radarda Ölçülen Hız (km/s)
              </label>
              <input
                type="number"
                value={measuredInput}
                onChange={(e) => setMeasuredInput(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
              <div className="text-[11px] text-slate-500">
                Yasal %10 Tolerans Üst Sınırı:{' '}
                <strong>{(limitInput * 1.1).toFixed(1)} km/s</strong>
              </div>
            </div>
          </div>

          {/* Result Box */}
          {speedResult && (
            <div
              className={`p-4 rounded-xl border ${
                speedResult.status === 'safe'
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                  : speedResult.status === 'tolerance'
                  ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300'
                  : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-200'
              }`}
            >
              {speedResult.article ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm px-2.5 py-0.5 rounded bg-rose-600 text-white">
                      Madde {speedResult.article}
                    </span>
                    <span className="text-xs font-bold">
                      Aşım Oranı: %{speedResult.percentage}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base">
                    {speedResult.title}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
                    <div>
                      <span className="text-slate-500 block">İdari Para Cezası:</span>
                      <strong className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {formatCurrency(speedResult.fine!)}
                      </strong>
                    </div>
                    <div>
                      <span className="text-emerald-700 dark:text-emerald-400 block">%25 İndirimli:</span>
                      <strong className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        {formatCurrency(speedResult.discounted!)}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Ceza Puanı:</span>
                      <strong className="text-sm font-bold text-rose-600">
                        {speedResult.points} Puan
                      </strong>
                    </div>
                  </div>

                  {speedResult.licenseAction && (
                    <div className="text-[11px] text-rose-800 dark:text-rose-300 font-medium pt-1 border-t border-rose-200/60 dark:border-rose-900/40">
                      Sürücü Belgesi Yaptırımı: {speedResult.licenseAction}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-bold">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{speedResult.message}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Promil Limits Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-red-900 to-rose-950 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wine className="w-5 h-5 text-red-300" />
            <h2 className="font-bold text-base sm:text-lg">
              Yasal Alkol (Promil) Sınırları Tablosu
            </h2>
          </div>
          <span className="text-[11px] font-semibold bg-red-800/60 px-2 py-0.5 rounded text-red-200">
            2918 SKTK Md. 48 & TCK 179/3
          </span>
        </div>

        <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROMIL_LIMITS.map((item, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  {item.category}
                </h4>
                <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                  {item.limit}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.action}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Speed Tolerance Matrix Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
              Yol Türlerine Göre Hız & Radar Matrisi
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Yol / Güzergah Türü</th>
                <th className="p-3 text-center">Yasal Sınır</th>
                <th className="p-3 text-center">%10 Tolerans</th>
                <th className="p-3">%10 - %30 (51/2-a)</th>
                <th className="p-3">%30 - %50 (51/2-b)</th>
                <th className="p-3">%50+ (51/2-c)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {SPEED_TOLERANCE_RULES.map((rule, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">
                    {rule.roadType}
                  </td>
                  <td className="p-3 text-center font-bold text-blue-600 dark:text-blue-400">
                    {rule.speedLimit} km/s
                  </td>
                  <td className="p-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                    {rule.toleranceLimit} km/s
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {rule.tier1}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {rule.tier2}
                  </td>
                  <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">
                    {rule.tier3}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Field Questions */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-4 sm:p-5 space-y-3">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
            Saha Denetimlerinde Sıkça Karşılaşılan Sorular
          </h3>
        </div>

        <div className="space-y-2.5">
          {FREQUENT_FIELD_QUESTIONS.map((qa, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1"
            >
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-start gap-1.5">
                <span className="text-blue-600 shrink-0 font-mono">S:</span>
                <span>{qa.q}</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-4">
                {qa.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Santral & Saha Koordinasyon Kartı (Ayarlar bölümünden değiştirilebilir) */}
      <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-100">
                {unitContact.unitTitle}
              </h4>
              <p className="text-xs text-slate-400">{unitContact.unitSubtitle}</p>
            </div>
          </div>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-700 transition cursor-pointer"
              title="İletişim Bilgilerini Düzenle"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Düzenle</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <a
            href={`tel:${unitContact.phone1Number.replace(/\s+/g, '')}`}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex flex-col items-center justify-center text-center transition cursor-pointer"
          >
            <span className="text-[11px] text-slate-400">{unitContact.phone1Label}</span>
            <span className="font-black text-sm text-blue-400">{unitContact.phone1Number}</span>
          </a>

          <a
            href={`tel:${unitContact.phone2Number.replace(/\s+/g, '')}`}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex flex-col items-center justify-center text-center transition cursor-pointer"
          >
            <span className="text-[11px] text-slate-400">{unitContact.phone2Label}</span>
            <span className="font-black text-sm text-red-400">{unitContact.phone2Number}</span>
          </a>

          <a
            href={`tel:${unitContact.phone3Number.replace(/\s+/g, '')}`}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex flex-col items-center justify-center text-center transition cursor-pointer"
          >
            <span className="text-[11px] text-slate-400">{unitContact.phone3Label}</span>
            <span className="font-black text-sm text-amber-400">{unitContact.phone3Number}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
