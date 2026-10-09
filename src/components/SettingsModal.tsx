import React, { useState } from 'react';
import { LAST_UPDATE_DATE } from '../data/trafficViolations';
import { KAYNAKLAR_2026, CURRENT_DATABASE_VERSION } from '../data/databaseProvider';
import { TextSizeOption, UnitContactConfig, DEFAULT_UNIT_CONTACT } from '../types/traffic';
import { OtoyolJandarmaLogo } from './OtoyolJandarmaLogo';
import {
  X,
  Moon,
  Sun,
  Type,
  Smartphone,
  Trash2,
  Database,
  ExternalLink,
  BookOpen,
  PhoneCall,
  Save,
  RotateCcw,
  Check,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  textSize: TextSizeOption;
  onChangeTextSize: (size: TextSizeOption) => void;
  onResetAllData: () => void;
  unitContact: UnitContactConfig;
  onUpdateUnitContact: (config: UnitContactConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  textSize,
  onChangeTextSize,
  onResetAllData,
  unitContact,
  onUpdateUnitContact,
}) => {
  // Local state for editing unit contact
  const [contactForm, setContactForm] = useState<UnitContactConfig>(unitContact);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if modal reopens
  React.useEffect(() => {
    setContactForm(unitContact);
  }, [unitContact]);

  if (!isOpen) return null;

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUnitContact(contactForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleResetContact = () => {
    setContactForm(DEFAULT_UNIT_CONTACT);
    onUpdateUnitContact(DEFAULT_UNIT_CONTACT);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg max-h-[92vh] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center space-x-2.5">
            <OtoyolJandarmaLogo size="sm" />
            <div>
              <h3 className="font-black text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-tight">
                <span>Trafik Denetim </span>
                <span className="text-amber-500 dark:text-amber-400">Rehberi</span>
              </h3>
              <p className="text-[11px] text-slate-500">Trafik Jandarması & Trafik Polisi Ortak Ayarları</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-sm">
          {/* Birim İletişim & Saha Koordinasyon Bilgileri (Kullanıcı Talebi) */}
          <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-red-600" />
                Birim İletişim & Santral Numaraları
              </span>
              <button
                type="button"
                onClick={handleResetContact}
                className="text-[10px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Varsayılan Yap</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Araçlar ve ana ekrandaki santral koordinasyon başlığını ve telefon numaralarını kendi biriminize göre değiştirebilirsiniz.
            </p>

            <form onSubmit={handleSaveContact} className="space-y-3 pt-1">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Birim / Santral Başlığı:
                </label>
                <input
                  type="text"
                  value={contactForm.unitTitle}
                  onChange={(e) => setContactForm({ ...contactForm, unitTitle: e.target.value })}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="Örn: Otoyol Komutanlığı Santral Acil Saha Koordinasyon"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Alt Başlık / Ekip Adı:
                </label>
                <input
                  type="text"
                  value={contactForm.unitSubtitle}
                  onChange={(e) => setContactForm({ ...contactForm, unitSubtitle: e.target.value })}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="Örn: Manisa Otoyol Jandarma İletişim & İhbar"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                    1. Hat Başlığı:
                  </label>
                  <input
                    type="text"
                    value={contactForm.phone1Label}
                    onChange={(e) => setContactForm({ ...contactForm, phone1Label: e.target.value })}
                    className="w-full text-xs px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                    1. Hat Numarası:
                  </label>
                  <input
                    type="text"
                    value={contactForm.phone1Number}
                    onChange={(e) => setContactForm({ ...contactForm, phone1Number: e.target.value })}
                    className="w-full text-xs px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                    2. Hat Başlığı:
                  </label>
                  <input
                    type="text"
                    value={contactForm.phone2Label}
                    onChange={(e) => setContactForm({ ...contactForm, phone2Label: e.target.value })}
                    className="w-full text-xs px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                    2. Hat Numarası:
                  </label>
                  <input
                    type="text"
                    value={contactForm.phone2Number}
                    onChange={(e) => setContactForm({ ...contactForm, phone2Number: e.target.value })}
                    className="w-full text-xs px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                    3. Hat Başlığı:
                  </label>
                  <input
                    type="text"
                    value={contactForm.phone3Label}
                    onChange={(e) => setContactForm({ ...contactForm, phone3Label: e.target.value })}
                    className="w-full text-xs px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                    3. Hat Numarası:
                  </label>
                  <input
                    type="text"
                    value={contactForm.phone3Number}
                    onChange={(e) => setContactForm({ ...contactForm, phone3Number: e.target.value })}
                    className="w-full text-xs px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>İletişim Bilgilerini Kaydet</span>
                </button>
                {saveSuccess && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Kaydedildi
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Theme Mode */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Görünüm Teması
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onToggleTheme}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-bold transition cursor-pointer ${
                  !isDark
                    ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Açık Tema (Gündüz)</span>
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-bold transition cursor-pointer ${
                  isDark
                    ? 'border-blue-500 bg-blue-950/70 text-blue-300'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Koyu Tema (Gece Nöbeti)</span>
              </button>
            </div>
          </div>

          {/* Text Size For Field Officers */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Type className="w-4 h-4" />
                Yazı Boyutu (Saha Okunurluğu)
              </label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal' as TextSizeOption, label: 'Standart' },
                { id: 'large' as TextSizeOption, label: 'Büyük' },
                { id: 'xlarge' as TextSizeOption, label: 'Çok Büyük' },
              ].map((size) => (
                <button
                  key={size.id}
                  onClick={() => onChangeTextSize(size.id)}
                  className={`py-2.5 px-3 rounded-xl border font-bold text-xs transition cursor-pointer ${
                    textSize === size.id
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2026 Structured Database & Official Sources */}
          <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-blue-600" />
                2026 Mevzuat ve Ceza Veri Tabanı
              </span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded">
                Ver: {CURRENT_DATABASE_VERSION}
              </span>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
              <div>
                <strong>Durum: </strong> 2918 Sayılı SKTK & 4925 Sayılı STK ({LAST_UPDATE_DATE})
              </div>
            </div>

            {/* Kaynaklar Listesi */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                Resmi Kaynak Önceliği & Dayanaklar
              </span>
              <div className="space-y-1.5">
                {KAYNAKLAR_2026.map((src) => (
                  <div
                    key={src.id}
                    className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px]"
                  >
                    <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                      <span>{src.adi}</span>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                      >
                        Resmi Link <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <div className="text-slate-500 text-[10px]">{src.kurum} - {src.yayimTarihi}</div>
                    <div className="text-slate-600 dark:text-slate-400 mt-0.5 text-[10px] leading-tight">
                      {src.aciklama}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Offline & Mobile Installation Hint */}
          <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              Telefona Yükleme (Ana Ekrana Ekleme)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Cihazınızda menüden <strong>"Ana Ekrana Ekle"</strong> veya <strong>"Uygulamayı Yükle"</strong> seçeneğini seçerek bu sistemi internet olmadan da hızla çalışan bağımsız bir uygulama olarak kullanabilirsiniz.
            </p>
          </div>

          {/* Reset local storage */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                if (window.confirm('Tüm favoriler ve arama geçmişi sıfırlansın mı?')) {
                  onResetAllData();
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Tüm Yerel Verileri ve Favorileri Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
