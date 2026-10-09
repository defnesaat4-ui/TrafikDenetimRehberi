import { TrafficViolation, ViolationCategory } from './traffic';

export interface RepeatViolationRule {
  sira: number; // 1, 2, 3...
  aciklama?: string;
  ceza: number;
  indirimliTutar?: number;
  cezaPuani?: number | null;
  ehliyetGeriAlma?: string;
  trafiktenMen?: boolean;
}

export interface StructuredViolationRecord {
  // Standart Alanlar
  id: string;
  kanun: '2918' | '4925';
  madde: string; // e.g. "48", "36", "65"
  altMadde?: string; // e.g. "5", "3-a", "1-a"
  tamMadde: string; // e.g. "48/5", "36/3-a"
  baslik: string;
  ihlalKonusu: string;
  aciklama: string;
  uygulananKisi: string; // e.g. "Sürücüye", "Araç İşletene", "Yük Gönderene", "Sürücü ve Araç Sahibine"

  // Ceza Miktarları ve İndirimler
  trafikKolluguCezasi: number; // TL
  digerYetkiliCezasi?: number; // Varsa diğer yetkili idari yaptırım tutarı
  indirimliTutar: number; // %25 indirimli tutar (1 ay içinde)
  indirimOrani: number; // %25

  // Ceza Puanı (Önemli: Puan yoksa null)
  cezaPuani: number | null;
  cezaPuaniAciklama?: string; // e.g. "Ceza puanı uygulanmaz" veya "20 Ceza Puanı"

  // Yaptırımlar
  ehliyetGeriAlma: string | null; // e.g. "6 Ay Süreyle", "2 Yıl", "5 Yıl", null
  ehliyetIptal: boolean; // Doğrudan iptal var mı?
  trafiktenMen: boolean; // Araç trafikten men edilir mi?
  aracKullanmaktanMen: boolean; // Sürücü araç kullanmaktan men edilir mi?
  aracMuhafaza: string | null; // Otopark, refakatçiye teslim vb.
  digerYaptirimlar: string | null; // TCK 179/3, SÜDGE, teknik şartları giderme vb.
  yolaDevam: string; // "Yola devamına izin verilmez", "Eksiklik giderilene kadar", "Yola devam edebilir"

  // Özel Durumlar (Tekrarlar, Kademeler, Roller)
  ihlaller?: RepeatViolationRule[];
  aracTuruKurallari?: {
    aracTuru: string;
    sinir?: string;
    ceza: number;
    indirimliTutar: number;
    aciklama?: string;
  }[];
  rolAyrilimi?: {
    surucuCezasi?: number;
    isletenCezasi?: number;
    gonderenCezasi?: number;
    aciklama?: string;
  };

  // Kanuni ve Doğrulama Bilgileri
  kanuniDayanak: string;
  sonGuncelleme: string; // e.g. "27.02.2026"
  version: string; // e.g. "2026.02.27"
  kaynak: string; // e.g. "Emniyet Genel Müdürlüğü Trafik Başkanlığı 2026 Trafik Ceza Rehberi & Resmî Gazete 7574 SK"
  kaynakUrl: string;

  // Arama & UI Entegrasyonu
  kategori: ViolationCategory;
  kategoriAdi: string;
  anahtarKelimeler: string[];
  uygulamaAdimlari?: string;
  memurNotu?: string;
  isPopular?: boolean;
}

export interface PenaltyPointRule {
  id: string;
  madde: string;
  cezaPuani: number | null;
  uygulanan: string;
  aciklama: string;
  kanuniDayanak: string;
  kaynak: string;
}

export interface LicenseProcedureRule {
  id: string;
  madde: string;
  islemTuru: 'Geri Alma' | 'İptal' | 'Geçici Durdurma';
  sure: string; // "6 Ay", "2 Yıl", "5 Yıl", "Kesin İptal"
  kosullar: string;
  egitimVeyaRapor: string; // SÜDGE, Psiko-teknik değerlendirme, Sağlık kurulu raporu vb.
  kanuniDayanak: string;
}

export interface VehicleProcedureRule {
  id: string;
  madde: string;
  islemTuru: 'Trafikten Men' | 'Otoparka Çekme' | 'Muhafaza' | 'Geçici İzin';
  sure: string;
  menKaldirilmaSarti: string;
  yedieminUygulamasi: string;
  kanuniDayanak: string;
}

export interface SourceReference {
  id: string;
  adi: string;
  kurum: string;
  yili: number;
  yayimTarihi: string;
  resmiGazeteNo?: string;
  aciklama: string;
  url: string;
  versiyon: string;
}
