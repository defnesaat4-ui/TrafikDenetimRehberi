import { StructuredViolationRecord, PenaltyPointRule, LicenseProcedureRule, VehicleProcedureRule, SourceReference } from '../types/database2026';
import { TrafficViolation } from '../types/traffic';

// 2026 JSON Data Imports
import cezalarDataRaw from './2026/cezalar.json';
import cezaPuanlariDataRaw from './2026/ceza_puanlari.json';
import ehliyetIslemleriDataRaw from './2026/ehliyet_islemleri.json';
import aracIslemleriDataRaw from './2026/arac_islemleri.json';
import kaynaklarDataRaw from './2026/kaynaklar.json';

export const CURRENT_DATABASE_YEAR = 2026;
export const CURRENT_DATABASE_VERSION = '2026.02.27';
export const CURRENT_UPDATE_NOTE = '2026 Yılı Güncel (7574 Sayılı Kanun & Resmî Gazete & EGM Trafik Ceza Rehberi)';

export const STRUCTURED_CEZALAR_2026: StructuredViolationRecord[] = cezalarDataRaw as StructuredViolationRecord[];
export const CEZA_PUANLARI_2026: PenaltyPointRule[] = cezaPuanlariDataRaw as PenaltyPointRule[];
export const EHLIYET_ISLEMLERI_2026: LicenseProcedureRule[] = ehliyetIslemleriDataRaw as LicenseProcedureRule[];
export const ARAC_ISLEMLERI_2026: VehicleProcedureRule[] = aracIslemleriDataRaw as VehicleProcedureRule[];
export const KAYNAKLAR_2026: SourceReference[] = kaynaklarDataRaw as SourceReference[];

/**
 * Mevcut bileşenlerle %100 uyumluluk için StructuredViolationRecord -> TrafficViolation adaptörü.
 * Böylece mevcut arama, kartlar, hesaplayıcı, favoriler kusursuz çalışmaya devam eder.
 */
export function convertToTrafficViolation(s: StructuredViolationRecord): TrafficViolation {
  const sanitizedTitle = s.baslik
    .replace(/\(Ehliyetsiz\)/gi, '(Sürücü Belgesiz)')
    .replace(/Ehliyetsiz/gi, 'Sürücü Belgesiz')
    .replace(/Ehliyet/gi, 'Sürücü Belgesi');

  const sanitizedCategory = s.kategoriAdi
    .replace(/Sürücü Belgesi \(Ehliyet\)/gi, 'Sürücü Belgesi İşlemleri')
    .replace(/Ehliyet/gi, 'Sürücü Belgesi');

  const sanitizedLegalBasis = s.kanuniDayanak
    .replace(/2918 Sayılı KTK/gi, '2918 Sayılı SKTK')
    .replace(/2918 KTK/gi, '2918 SKTK');

  const sanitizedLicenseAction = s.ehliyetGeriAlma
    ? s.ehliyetGeriAlma.replace(/ehliyete/gi, 'sürücü belgesine').replace(/ehliyet/gi, 'sürücü belgesi')
    : s.ehliyetIptal
    ? 'Sürücü belgesi iptal edilir.'
    : undefined;

  return {
    id: s.id,
    article: s.tamMadde,
    lawType: s.kanun === '4925' ? '4925-STK' : '2918-SKTK',
    category: s.kategori,
    categoryName: sanitizedCategory,
    title: sanitizedTitle,
    shortDescription: s.ihlalKonusu.replace(/ehliyet/gi, 'sürücü belgesi'),
    fullDescription: s.aciklama.replace(/ehliyet/gi, 'sürücü belgesi'),
    fineAmount: s.trafikKolluguCezasi,
    discountedFine: s.indirimliTutar,
    points: s.cezaPuani ?? 0,
    appliesTo: s.uygulananKisi,
    licenseAction: sanitizedLicenseAction,
    vehicleAction: s.aracMuhafaza || (s.trafiktenMen ? 'Araç trafikten men edilir.' : undefined),
    actionProcedure: (s.uygulamaAdimlari || '').replace(/ehliyet/gi, 'sürücü belgesi'),
    legalBasis: sanitizedLegalBasis,
    officerNotes: (s.memurNotu || '').replace(/ehliyet/gi, 'sürücü belgesi'),
    keywords: s.anahtarKelimeler || [],
    lastUpdated: `Güncelleme: ${s.sonGuncelleme} (Ver: ${s.version}) - ${s.kaynak}`,
    isPopular: s.isPopular,
  };
}

// 2027 veya gelecek yıllara genişletilebilirlik için dinamik veri getirme fonksiyonu
export function getViolationsByYear(year: number = 2026): StructuredViolationRecord[] {
  if (year === 2026) {
    return STRUCTURED_CEZALAR_2026;
  }
  // İleride 2027 JSON dosyası eklendiğinde buradan dinamik yüklenebilir
  return STRUCTURED_CEZALAR_2026;
}

// Hızlı arama için yardımcı
export function findViolationByExactArticle(article: string): StructuredViolationRecord | undefined {
  const clean = article.replace(/\s+/g, '').toLowerCase();
  return STRUCTURED_CEZALAR_2026.find(
    (c) =>
      c.tamMadde.replace(/\s+/g, '').toLowerCase() === clean ||
      c.madde.replace(/\s+/g, '').toLowerCase() === clean
  );
}
