export interface SpeedToleranceRule {
  roadType: string;
  speedLimit: number;
  toleranceLimit: number;
  tier1: string;
  tier2: string;
  tier3: string;
}

export const SPEED_TOLERANCE_RULES: SpeedToleranceRule[] = [
  {
    roadType: 'Şehir İçi Standart Yol (Otomobil)',
    speedLimit: 50,
    toleranceLimit: 55,
    tier1: '56 - 65 km/s (1.506 TL)',
    tier2: '66 - 75 km/s (3.135 TL)',
    tier3: '76 km/s ve üzeri (6.439 TL)',
  },
  {
    roadType: 'Şehir İçi Ana Arter / Çevre Yolu (UKOME Kararlı)',
    speedLimit: 70,
    toleranceLimit: 77,
    tier1: '78 - 91 km/s (1.506 TL)',
    tier2: '92 - 105 km/s (3.135 TL)',
    tier3: '106 km/s ve üzeri (6.439 TL)',
  },
  {
    roadType: 'Şehir İçi Ekspres Yol',
    speedLimit: 82,
    toleranceLimit: 90,
    tier1: '91 - 106 km/s (1.506 TL)',
    tier2: '107 - 123 km/s (3.135 TL)',
    tier3: '124 km/s ve üzeri (6.439 TL)',
  },
  {
    roadType: 'Şehir Dışı İki Yönlü Karayolu',
    speedLimit: 90,
    toleranceLimit: 99,
    tier1: '100 - 117 km/s (1.506 TL)',
    tier2: '118 - 135 km/s (3.135 TL)',
    tier3: '136 km/s ve üzeri (6.439 TL)',
  },
  {
    roadType: 'Şehir Dışı Bölünmüş Yol',
    speedLimit: 110,
    toleranceLimit: 121,
    tier1: '122 - 143 km/s (1.506 TL)',
    tier2: '144 - 165 km/s (3.135 TL)',
    tier3: '166 km/s ve üzeri (6.439 TL)',
  },
  {
    roadType: 'Standart Otoyol (KGM İşletmesindeki Otoyollar)',
    speedLimit: 130,
    toleranceLimit: 143,
    tier1: '144 - 169 km/s (1.506 TL)',
    tier2: '170 - 195 km/s (3.135 TL)',
    tier3: '196 km/s ve üzeri (6.439 TL)',
  },
  {
    roadType: 'Yap-İşlet-Devret Otoyolları (KGM / Otoyol A.Ş.)',
    speedLimit: 140,
    toleranceLimit: 154,
    tier1: '155 - 182 km/s (1.506 TL)',
    tier2: '183 - 210 km/s (3.135 TL)',
    tier3: '211 km/s ve üzeri (6.439 TL)',
  },
];

export const PROMIL_LIMITS = [
  {
    category: 'Hususi Otomobil Sürücüleri',
    limit: '0.50 Promil',
    action: '0.50 promile kadar yasal. 0.51 promil ve üzeri 2918 SKTK 48/5 uygulanır ve sürücü belgesine 6 ay el konulur.',
    badgeColor: 'blue',
  },
  {
    category: 'Ticari Araç ve Diğer Araç Sürücüleri',
    limit: '0.20 Promil',
    action: 'Taksi, minibüs, otobüs, kamyon, kamyonet, motosiklet vb. araçlarda yasal sınır 0.20 promildir.',
    badgeColor: 'amber',
  },
  {
    category: 'Aday Sürücüler (Aday Sürücü Belgesi)',
    limit: '0.00 Promil (Sıfır Tolerans)',
    action: '0.20 promil üzerinde alkollü yakalanan aday sürücünün belgesi DOĞRUDAN İPTAL edilir.',
    badgeColor: 'red',
  },
  {
    category: 'Adli İşlem Eşiği (TCK 179/3)',
    limit: '1.00 Promil ve Üzeri',
    action: 'Hususi veya ticari fark etmeksizin 1.00 promil üzeri tespitlerde trafik güvenliğini tehlikeye sokmaktan adli sevk zorunludur.',
    badgeColor: 'purple',
  },
];

export const FREQUENT_FIELD_QUESTIONS = [
  {
    q: 'Sürücü belgesiz araç kullananın aracı başkasına aitse araç sahibine de ceza yazılır mı?',
    a: 'EVET. 2918 Sayılı SKTK Md. 36/3-a uyarınca sürücüye ceza uygulandığı gibi, araç tescil plakasına da aracın belgesiz kişiye verilmesinden dolayı AYNI TUTARDA ceza uygulanır.',
  },
  {
    q: 'Sürücü alkolmetreyi üflemek istemeyip "Hastanede kan vereceğim" derse ne yapılır?',
    a: 'Teknik cihazı üflemeyi reddetmiş sayılır. 2918 SKTK 48/9 maddesinden ceza uygulanır ve sürücü belgesine 2 yıl süreyle el konulur. Hastaneye gitme talebi cezayı engellemez.',
  },
  {
    q: 'Araç muayenesi geçmiş araca ilk yakalanışında süre verilir mi?',
    a: 'EVET. Daha önce süre verilmemişse 2918 SKTK 34/a maddesinden ceza yazılır ve muayeneye gidebilmesi için 7 günlük EK-33/A belgesi verilir. 7 gün dolmasına rağmen muayene yaptırmayan araca 34/b uygulanır ve derhal bağlanır.',
  },
  {
    q: 'Trafik cezalarında peşin ödeme indirimi ne kadardır ve süresi nedir?',
    a: 'Trafik idari para cezası tebliğ tarihinden itibaren 1 ay içinde ödenirse %25 indirim uygulanır.',
  },
  {
    q: 'Drift yapan araç hemen teslim edilebilir mi?',
    a: 'HAYIR. 2918 Sayılı KTK Md. 46/2-f uyarınca drift yapan araç 60 GÜN süreyle trafikten men edilir ve yediemin otoparkında tutulur. 60 gün dolmadan kimseye teslim edilemez.',
  },
];

export const EMERGENCY_NUMBERS = [
  { name: 'Otoyol Komutanlığı Santral Acil Saha Koordinasyon', number: '0236 231 13 12', desc: 'Manisa Otoyol Santral Hattı' },
  { name: '112 Acil Çağrı Merkezi', number: '112', desc: 'Genel Acil İhbar ve Koordinasyon' },
  { name: 'Karayolları Otoyol Acil Yardım', number: '161', desc: 'Karayolları Otoyol Hattı (161)' },
];
