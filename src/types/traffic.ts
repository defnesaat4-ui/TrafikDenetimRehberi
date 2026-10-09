export type ViolationCategory =
  | 'alkol'
  | 'ehliyet'
  | 'plaka'
  | 'muayene'
  | 'sigorta'
  | 'hiz'
  | 'park'
  | 'kural'
  | 'arac-men'
  | 'kaza'
  | 'diger';

export interface TrafficViolation {
  id: string;
  article: string; // e.g. "48/5", "36/3-a", "26/a"
  lawType?: '2918-SKTK' | '4925-STK'; // Kanun türü (2918 SKTK veya 4925 STK)
  category: ViolationCategory;
  categoryName: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  fineAmount: number; // TL
  discountedFine: number; // TL (%25 indirimli)
  points: number; // Ceza puanı
  appliesTo: string; // Kime uygulanır (örn: Sürücüye, Araç Tescil Plakasına, Sürücü ve Araç Sahibine)
  licenseAction?: string; // Sürücü belgesi işlemi (örn: 6 Ay Geri Alma, İptal, Yok)
  vehicleAction?: string; // Araç işlemi (örn: Trafikten Men, Otoparka Çekilir, Men Edilmez)
  actionProcedure: string; // Uygulanacak yasal işlem adımları
  legalBasis: string; // Kanuni dayanak (2918 SKTK Md..., TCK Md...)
  officerNotes: string; // Saha personeli için dikkat edilecek kritik hususlar
  keywords: string[]; // Arama etiketleri
  lastUpdated: string;
  isPopular?: boolean;
}

export interface ProcedureGuide {
  id: string;
  title: string;
  category: string;
  badge: string;
  summary: string;
  legalBasis: string;
  steps: {
    title: string;
    description: string;
    warning?: string;
  }[];
  requiredForms: string[];
  criticalWarnings: string[];
}

export interface CalculatedItem {
  violation: TrafficViolation;
  quantity: number;
  customNote?: string;
}

export interface DailyShiftActivity {
  date: string; // e.g. "08.10.2026"
  teamName: string; // e.g. "6.Oto.J.Timi"
  checkedVehicles: number; // Kontrol edilen araç sayısı
  checkedPersons: number; // Kontrol edilen şahıs sayısı
  capturedVehicles: number; // Yakalanan araç sayısı
  capturedPersonsUyap: number; // Yakalanan şahıs (UYAP)
  capturedPersonsAsal: number; // Yakalanan şahıs (ASAL)
  seizedCrimeGoods: number; // Ele geçirilen suç eşyası
}

export interface UnitContactConfig {
  unitTitle: string;
  unitSubtitle: string;
  phone1Label: string;
  phone1Number: string;
  phone2Label: string;
  phone2Number: string;
  phone3Label: string;
  phone3Number: string;
}

export const DEFAULT_UNIT_CONTACT: UnitContactConfig = {
  unitTitle: 'Otoyol Komutanlığı Santral Acil Saha Koordinasyon',
  unitSubtitle: 'Manisa Otoyol Jandarma İletişim & İhbar',
  phone1Label: 'Santral Hattı',
  phone1Number: '0236 231 13 12',
  phone2Label: 'Acil Çağrı',
  phone2Number: '112',
  phone3Label: 'Otoyol Acil Yardım',
  phone3Number: '161',
};

export type TextSizeOption = 'normal' | 'large' | 'xlarge';
export type AppTab = 'home' | 'search' | 'legislation' | 'calculator' | 'tonnage' | 'guides' | 'tools' | 'favorites';
