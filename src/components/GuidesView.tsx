import React, { useState } from 'react';
import { PROCEDURE_GUIDES } from '../data/procedureGuides';
import { ProcedureGuide } from '../types/traffic';
import {
  BookOpen,
  ChevronRight,
  AlertTriangle,
  FileCheck,
  CheckCircle,
  Scale,
  ArrowLeft,
  Share2,
  Copy,
  Check,
} from 'lucide-react';

export const GuidesView: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<ProcedureGuide | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyGuide = (guide: ProcedureGuide) => {
    let text = `[TRAFİK İŞLEM REHBERİ: ${guide.title.toUpperCase()}]\n`;
    text += `Özet: ${guide.summary}\n`;
    text += `Kanuni Dayanak: ${guide.legalBasis}\n\n`;
    text += `İŞLEM ADIMLARI:\n`;
    guide.steps.forEach((step, idx) => {
      text += `${idx + 1}. ${step.title}\n${step.description}\n`;
      if (step.warning) text += `UYARI: ${step.warning}\n`;
      text += `\n`;
    });
    text += `GEREKLİ EVRAKLAR:\n${guide.requiredForms.map((f) => `- ${f}`).join('\n')}\n\n`;
    text += `KRİTİK HUSUSLAR:\n${guide.criticalWarnings.map((w) => `! ${w}`).join('\n')}\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If a guide is selected, render its full detailed walkthrough
  if (selectedGuide) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto pb-24">
        {/* Back navigation bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedGuide(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tüm Rehberlere Dön</span>
          </button>

          <button
            onClick={() => handleCopyGuide(selectedGuide)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg shadow-xs transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Rehberi Kopyala</span>
              </>
            )}
          </button>
        </div>

        {/* Guide Title Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
              {selectedGuide.badge}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {selectedGuide.category}
            </span>
          </div>

          <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
            {selectedGuide.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {selectedGuide.summary}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <Scale className="w-4 h-4 text-blue-600" />
            <span>
              <strong>Yasal Dayanak:</strong> {selectedGuide.legalBasis}
            </span>
          </div>
        </div>

        {/* Step-by-Step Procedure */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Uygulama ve Müdahale Adımları
          </h3>

          <div className="space-y-2.5">
            {selectedGuide.steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1 flex-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                      {step.description}
                    </p>
                    {step.warning && (
                      <div className="mt-2 text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/60 flex items-start gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{step.warning}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Forms Checklist */}
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-blue-600" />
            Tanzim Edilecek Resmi Evrak ve Tutanaklar
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            {selectedGuide.requiredForms.map((form, i) => (
              <li
                key={i}
                className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200/80 dark:border-slate-700"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{form}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Critical Warnings */}
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 p-4 rounded-xl space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-red-800 dark:text-red-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Kolluk Personeli Kritik Dikkat Noktaları
          </h4>
          <ul className="space-y-1.5 text-xs text-red-950 dark:text-red-200">
            {selectedGuide.criticalWarnings.map((warn, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{warn}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Guide list overview
  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-5 rounded-2xl border border-slate-800 shadow-md space-y-1.5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg sm:text-xl font-black">
            Trafik İşlem & Saha El Kitabı
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300">
          Araç bağlama, ehliyete el koyma, kaza inceleme, sahte plaka tahkikatı ve denetim prosedürleri rehberi.
        </p>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROCEDURE_GUIDES.map((guide) => (
          <div
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500 hover:shadow-md cursor-pointer transition flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                  {guide.badge}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {guide.category}
                </span>
              </div>

              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition">
                {guide.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {guide.summary}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-bold">
              <span>{guide.steps.length} Adımlı Prosedür</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
