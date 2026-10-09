import { TrafficViolation } from '../types/traffic';
import {
  STRUCTURED_CEZALAR_2026,
  convertToTrafficViolation,
  CURRENT_UPDATE_NOTE,
} from './databaseProvider';

export const LAST_UPDATE_DATE = CURRENT_UPDATE_NOTE;

export const CATEGORY_DEFINITIONS: Record<string, { label: string; icon: string; color: string }> = {
  alkol: { label: 'Alkol & Uyuşturucu', icon: 'Wine', color: 'red' },
  ehliyet: { label: 'Sürücü Belgesi İşlemleri', icon: 'IdCard', color: 'blue' },
  plaka: { label: 'Plaka & Tescil İşlemleri', icon: 'Hash', color: 'amber' },
  muayene: { label: 'Araç Muayenesi', icon: 'Wrench', color: 'orange' },
  sigorta: { label: 'Zorunlu Trafik Sigortası', icon: 'ShieldCheck', color: 'emerald' },
  hiz: { label: 'Hız İhlalleri (Radar)', icon: 'Gauge', color: 'purple' },
  park: { label: 'Park & Duraklama', icon: 'CircleParking', color: 'indigo' },
  kural: { label: 'Kural İhlalleri (Işık, Kemer, Tel)', icon: 'AlertTriangle', color: 'rose' },
  'arac-men': { label: 'Trafikten Men & Tonaj', icon: 'Truck', color: 'yellow' },
  kaza: { label: 'Kaza & Olay Yeri', icon: 'CarCrash', color: 'slate' },
  diger: { label: 'Diğer Trafik & Taşıma', icon: 'FileText', color: 'teal' },
};

/**
 * 2026 Yapılandırılmış Veritabanı JSON dosyasından otomatik dönüştürülen ve
 * tüm uygulamada dinamik kullanılan ana ceza veri seti.
 * 2027 güncellemesinde sadece data/2027/cezalar.json eklenip veritabanı yılı değiştirilebilir.
 */
export const TRAFFIC_VIOLATIONS: TrafficViolation[] = STRUCTURED_CEZALAR_2026.map(convertToTrafficViolation);
