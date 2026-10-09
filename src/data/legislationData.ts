export interface LegislationArticle {
  id: string;
  lawType: '2918-SKTK' | 'KTY' | '4925-STK' | 'KTY-TASIMA';
  lawName: string;
  articleNumber: string; // e.g. "Madde 48", "Madde 65", "Madde 26"
  articleTitle: string;
  chapter?: string;
  summary: string;
  fullText: string;
  relatedViolations?: string[]; // e.g. ["48/5", "65/1-a"]
  keywords: string[];
}

export const LEGISLATION_ARTICLES: LegislationArticle[] = [
  // ----------------------------------------------------
  // 2918 SAYILI KARAYOLLARI TRAFİK KANUNU (2918 SKTK)
  // ----------------------------------------------------
  {
    id: 'sktk-1',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 1',
    articleTitle: 'Amaç',
    chapter: 'Genel Hükümler',
    summary: 'Karayollarında can ve mal güvenliği yönünden trafik düzenini sağlamak ve trafik güvenliğini ilgilendiren tüm konularda alınacak önlemleri belirlemektir.',
    fullText: 'Bu Kanunun amacı; karayollarında can ve mal güvenliği yönünden trafik düzenini sağlamak ve trafik güvenliğini ilgilendiren tüm konularda alınacak önlemleri belirlemektir.',
    keywords: ['amaç', 'kapsam', 'güvenlik', 'genel hükümler'],
  },
  {
    id: 'sktk-3',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 3',
    articleTitle: 'Tanımlar',
    chapter: 'Genel Hükümler',
    summary: 'Trafik, araç, taşıt, sürücü, işleten, otoyol, refüj, gabari ve azami ağırlık gibi temel kavramların yasal tanımları.',
    fullText: `Bu Kanunda geçen terimlerin tanımları aşağıda gösterilmiştir:
- Trafik: Yayaların, hayvanların ve araçların karayolları üzerindeki hal ve hareketleridir.
- Araç: Karayollarında kullanılabilen motorlu, motorsuz ve özel amaçlı taşıtlar ile iş makineleri ve lastik tekerlekli traktörlerin genel adıdır.
- Sürücü: Karayolunda motorlu veya motorsuz bir aracı veya taşıtı sevk ve idare eden kişidir.
- İşleten: Araç sahibi olan veya mülkiyeti muhafaza kaydıyla satışta alıcı sıfatıyla sicilde kayıtlı görülen veya aracın uzun süreli kiralama, ariyet veya rehin gibi hallerde kiracı, ariyet veya rehin alan kişidir.
- Gabari: Araçların yüklü veya yüksüz olarak karayolunda güvenli seyirlerini temin amacı ile uzunluk, genişlik ve yüksekliklerini belirleyen yasal ölçülerdir.
- Azami Yüklü Ağırlık: Bir aracın güvenle taşıyabileceği azami yükle birlikteki ağırlığıdır (kantar denetimlerinde esas alınır).
- Otoyol: Özellikle transit trafiğe tahsis edilen, belirli yerler dışında giriş ve çıkışın yasaklandığı, yaya, hayvan ve motorsuz araçların giremediği erişme kontrollü karayoludur.`,
    keywords: ['tanımlar', 'araç', 'sürücü', 'işleten', 'otoyol', 'gabari', 'azami ağırlık'],
  },
  {
    id: 'sktk-23',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 23',
    articleTitle: 'Tescil Plakaları Standartları ve İhlalleri',
    chapter: 'Araçların Tescili',
    summary: 'Tescil plakasının monte edilmemesi, standart dışı basımı, okunurluğunun engellenmesi veya sahte plaka takılması yaptırımları.',
    fullText: `Araç tescil belgesi ve tescil plakalarının araç üzerinde bulundurulması mecburidir.
Araç tescil belgesini araçta bulundurmayan veya tescil plakasını monte edilmesi gereken yerin dışında farklı bir yere takan sürücülere idari para cezası verilir.
Tescil plakasının uygun durumda basılmaması, okunmasını engelleyecek şekilde değiştirilmesi halinde idari para cezası verilir ve plaka uygun hale getirilinceye kadar araç trafikten men edilir.
Plakasız araç kullananlara idari para cezası verilir, tescil plakası takılıncaya kadar araç men edilir.
Başka bir araca tescilli veya sahte plaka takan veya kullanan kişilere idari para cezası verilir, araç trafikten men edilir ve Türk Ceza Kanununun resmi belgede sahtecilik (TCK Md. 204) hükümlerine göre adli işlem yapılır.`,
    relatedViolations: ['23/3-a-1', '23/3-b-1', '23/4', '23/5-a', '23/5-b'],
    keywords: ['plaka', 'tescil', 'sahte plaka', 'app plaka', 'plakasız', 'tck 204'],
  },
  {
    id: 'sktk-26',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 26',
    articleTitle: 'Araçlarda Işık, Ses ve Donanım Düzenlemeleri (Çakar / Siren)',
    chapter: 'Araç Donanımları',
    summary: 'Mevzuatta izin verilmeyen araçlara çakar, siren ve ışıklı/sesli uyarı donanımı takılması yasağı ve araç men yaptırımı.',
    fullText: `Araçların dışında bulundurulması zorunlu işaretlerden başka, izin alınmaksızın tepe lambası, sesli ve ışıklı uyarı sistemleri (çakar, siren, megafon) takılamaz ve kullanılamaz.
Yetkisiz çakar ve tepe lambası kullanan sürücülere ağır idari para cezası uygulanır, cihazlar söktürülerek mülkiyeti kamuya geçirilir, sürücü belgesi geri alınır ve araç trafikten men edilir.`,
    relatedViolations: ['26/2'],
    keywords: ['çakar', 'siren', 'tepe lambası', 'ışıklı donanım', 'men'],
  },
  {
    id: 'sktk-30',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 30',
    articleTitle: 'Teknik Şartlara Aykırı Araçlar (Cam Filmi, Abartı Egzoz)',
    chapter: 'Araç Donanımları',
    summary: 'Görüşü engelleyen cam filmleri, gürültü çıkaran abartı egzoz ve teknik bozukluğu bulunan araçlarla trafiğe çıkma yaptırımları.',
    fullText: `Araçların, teknik şartlara uygun durumda bulundurulması zorunludur.
a) Görüşü engelleyecek veya bir kaza halinde içindekiler için tehlike olabilecek süs, aksesuar, eşya ve çıkıntıları olan, karayolunu kullananlar için tehlike yaratacak şekilde olan veya duman ve gürültü çıkaran araçları kullanan sürücülere idari para cezası verilir.
b) Diğer kusurların giderilmesi için sürücüye ihtar verilir; abartı egzoz ve mevzuata aykırı cam filmi durumunda araç men edilir, abartı egzoz sisteminin sökülmesi zorunludur.`,
    relatedViolations: ['30/1-a', '30/1-b'],
    keywords: ['cam filmi', 'abartı egzoz', 'teknik kusur', 'gürültü'],
  },
  {
    id: 'sktk-31',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 31',
    articleTitle: 'Takograf, Taksimetre ve Yangın Söndürme Cihazı Bulundurma',
    chapter: 'Araç Donanımları',
    summary: 'Kamyon, çekici ve otobüslerde takograf cihazı; taksilerde taksimetre bulundurma, kullanma ve muayene zorunluluğu.',
    fullText: `Özelliklerine ve sınıflarına göre araçlarda; takograf, taksimetre, takograf kartı, reflektör, yangın söndürme tüpü ve ilk yardım çantası bulundurulması ve kullanılır durumda olması zorunludur.
Takograf veya taksimetre bulundurmayan, kullanmayan veya kullanılabilir durumda bulundurmayan sürücü ve işletene idari para cezası uygulanır. Takograf üzerinde manipülasyon yapan veya yanıltıcı veri üreten cihaz kullananlar hakkında TCK kapsamında da adli işlem yapılır.`,
    relatedViolations: ['31/1-a', '31/1-b'],
    keywords: ['takograf', 'taksimetre', 'yangın tüpü', 'çalışma süresi'],
  },
  {
    id: 'sktk-34',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 34',
    articleTitle: 'Araçların Muayene Zorunluluğu ve Muayenesiz Seyir',
    chapter: 'Muayene',
    summary: 'Araçların periyodik fenni muayenelerinin yaptırılması zorunluluğu, muayenesiz araçla yakalanma ve 7 günlük izin süresi.',
    fullText: `Motorlu araçların cins ve kullanım amaçlarına göre belirlenen periyotlarda fenni muayenelerinin yaptırılması zorunludur.
Muayene süresi geçirilen araç sürücülerine idari para cezası verilir ve 7 iş gününe kadar ek süre izin belgesi düzenlenir. Verilen süre sonunda muayenesi yaptırılmamış olarak yakalanan araçlar doğrudan trafikten men edilir.`,
    relatedViolations: ['34/a', '34/b'],
    keywords: ['muayene', 'vize', 'tüvtürk', 'fenni muayene', 'men'],
  },
  {
    id: 'sktk-36',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 36',
    articleTitle: 'Sürücü Belgesi Sahibi Olma Zorunluluğu (Sürücü Belgesiz Araç Kullanımı)',
    chapter: 'Sürücü Belgeleri',
    summary: 'Sürücü belgesi olmadan, geçici geri alınmış veya iptal edilmişken araç kullanma; araç sahibine de aynı cezanın verilmesi.',
    fullText: `Motorlu araçların, sürücü belgesi sahibi olmayan kişiler tarafından karayollarında sürülmesi yasaktır.
Sürücü belgesi olmayan, sürücü belgesi geçici olarak geri alınmış olan veya sürücü belgesi iptal edilmiş olduğu halde motorlu araç kullanan kişilere idari para cezası uygulanır.
Ayrıca aracın sürücü belgesi olmayan kişi tarafından kullanılmasına izin veren araç sahibine (işletene) de tescil plakası üzerinden aynı miktarda idari para cezası verilir.`,
    relatedViolations: ['36/3-a', '36/3-b', '36/3-c'],
    keywords: ['sürücü belgesi', 'ehliyetsiz', 'geri alınan belge', 'araç sahibi'],
  },
  {
    id: 'sktk-39',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 39',
    articleTitle: 'Sürücü Belgesi Sınıfına Uygun Olmayan Araç Kullanmak (Yetersiz Belge)',
    chapter: 'Sürücü Belgeleri',
    summary: 'Sürücü belgesi sınıfının kapsamadığı sınıftaki araçları kullanmak (örn: B sınıfı ile çekici/kamyon sürmek) ve araç sahibine ceza.',
    fullText: `Sürücü belgesi sahiplerinin, sürücü belgelerinde belirtilen sınıfın dışındaki sınıflara ait motorlu araçları kullanması yasaktır.
Sürücü belgesi sınıfına uymayan aracı kullanan kişiye ve aracın bu şekilde kullanılmasına izin veren araç sahibine idari para cezası uygulanır. Sürücüye 20 ceza puanı verilir.`,
    relatedViolations: ['39/2'],
    keywords: ['sürücü belgesi', 'sınıf', 'yetersiz ehliyet', 'çekici', 'kamyon'],
  },
  {
    id: 'sktk-46',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 46',
    articleTitle: 'Karayolunda Trafik Akışı, Şerit İzleme ve Emniyet Şeridi İhlali',
    chapter: 'Trafik Kuralları',
    summary: 'Trafiği aksatacak şekilde şerit değiştirme, ters yönde araç sürme, emniyet şeridi ve banketleri ihlal etme yasakları.',
    fullText: `Karayollarında sürücüler gidiş yönüne göre yolun en sağından veya şeritlerine uygun hızda seyretmekle yükümlüdür.
Emniyet şeritlerini ve banketleri acil zorunluluk halleri dışında kullanmak kesinlikle yasaktır. Emniyet şeridini ihlal eden veya ters istikamette araç süren sürücülere ağır idari para cezası ve ceza puanı uygulanır.`,
    relatedViolations: ['46/2-a', '46/2-c', '46/2-f', '46/2-h'],
    keywords: ['şerit', 'emniyet şeridi', 'ters yön', 'makas', 'otoyol'],
  },
  {
    id: 'sktk-47',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 47',
    articleTitle: 'Trafik İşaret ve Görevlilerine Uyma Zorunluluğu (Kırmızı Işık)',
    chapter: 'Trafik Kuralları',
    summary: 'Trafik zabıtasının işaretlerine, ışıklı trafik işaret cihazlarına (kırmızı ışık) ve trafik levhalarına uyma yükümlülüğü.',
    fullText: `Karayolunu kullananlar trafik kurallarına, işaretlerine ve trafik zabıtası ile diğer yetkililerin sevk ve idare amaçlı işaretlerine uymak zorundadır.
Kırmızı ışık kuralına uymayan sürücülere idari para cezası ve 20 ceza puanı verilir. Bir yıl içinde kırmızı ışık ihlalini 3 veya daha fazla kez tekrarlayan sürücülerin sürücü belgeleri kademeli olarak (30 gün, 45 gün, 60 gün) geri alınır.`,
    relatedViolations: ['47/1-a', '47/1-b', '47/1-c', '47/1-d'],
    keywords: ['kırmızı ışık', 'dur ihtarı', 'trafik polisi', 'trafik jandarması', 'levha'],
  },
  {
    id: 'sktk-48',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 48',
    articleTitle: 'Alkol, Uyuşturucu veya Uyarıcı Madde Etkisinde Araç Kullanımı',
    chapter: 'Trafik Kuralları',
    summary: 'Yasal promil sınırları (hususi: 0.50, ticari/resmi: 0.20, aday: 0.00), ölçüm reddi yaptırımı, kademeli geri alma süreleri ve TCK 179/3.',
    fullText: `Uyuşturucu veya uyarıcı maddeleri almış olan sürücüler ile alkollü olan sürücülerin karayolunda araç sürmeleri yasaktır.
- Hususi otomobil sürücüleri için 0.50 promil, ticari araçlar ve diğer motorlu araç sürücüleri için 0.20 promil yasal sınırdır. Aday sürücüler için sınır 0.00 promildir.
- 1. Defa ihlalde: 6 ay süreyle sürücü belgesi geri alınır, 20 ceza puanı düşülür, araç men edilir.
- 2. Defa ihlalde: 2 yıl süreyle sürücü belgesi geri alınır ve SÜDGE eğitimi şartı getirilir.
- 3. ve daha fazla ihlalde: 5 yıl süreyle sürücü belgesi geri alınır, psiko-teknik değerlendirme ve psikiyatri muayenesi zorunlu tutulur.
- 1.00 Promil ve üzerinde ölçüm yapılan sürücüler hakkında doğrudan Türk Ceza Kanunu Md. 179/3 (Trafik güvenliğini tehlikeye sokma) uyarınca adli tahkikat başlatılır.
- Alkolmetre cihazına üflemeyi / teknik cihazla ölçümü kabul etmeyen sürücülere ağır idari para cezası verilir, sürücü belgesi doğrudan 2 yıl süreyle geri alınır ve araç trafikten men edilir.
- Uyuşturucu veya uyarıcı madde aldığı tespit edilen sürücülerin sürücü belgeleri 5 yıl süreyle geri alınır ve TCK kapsamında adli işlem yapılır.`,
    relatedViolations: ['48/5-1', '48/5-2', '48/5-3', '48/8', '48/9'],
    keywords: ['alkol', 'promil', 'südge', 'alkolmetre', 'tck 179', 'uyuşturucu', 'geri alma'],
  },
  {
    id: 'sktk-51',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 51',
    articleTitle: 'Hız Sınırları ve Aşım Kademeleri (Radar)',
    chapter: 'Trafik Kuralları',
    summary: 'Yol ve araç cinsine göre belirlenen hız sınırlarının %10 pay dahilinde denetimi, %10-%30, %30-%50 ve %50 üzeri aşım yaptırımları.',
    fullText: `Sürücüler, araçlarının hızlarını karayolu ve hava şartlarına, aracın teknik özelliklerine ve trafik işaretleriyle belirtilen hız sınırlarına uydurmak zorundadır.
Hız sınırlarını %10 yasal tolerans payı üzerinde aşan sürücülere:
a) Hız sınırını %10'dan %30'a kadar aşmak (51/2-a): İdari para cezası ve 10 ceza puanı.
b) Hız sınırını %30'dan %50'ye kadar aşmak (51/2-b): İdari para cezası ve 15 ceza puanı.
c) Hız sınırını %50'den fazla aşmak (51/2-c): Ağır idari para cezası ve 15 ceza puanı. 1 yıl içinde bu kuralı 5 kez ihlal edenlerin sürücü belgeleri 1 yıl süreyle geri alınır.`,
    relatedViolations: ['51/2-a', '51/2-b', '51/2-c'],
    keywords: ['hız', 'radar', 'hız sınırı', '51/2', 'aşım'],
  },
  {
    id: 'sktk-65',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 65',
    articleTitle: 'Araçların Yüklenmesi, Gabari ve Tonaj Kuralları (Kantar)',
    chapter: 'Yükleme ve Tonaj',
    summary: 'Azami yüklü ağırlık toleransları (40 tona kadar %3.75 + 500 KG; 40 ton üzerine 2 ton + %3.75), 65/1-a\'dan 65/1-e\'ye kademeli idari para cezaları.',
    fullText: `Araçların azami yüklü ağırlıklarını ve gabarilerini aşacak şekilde yüklenmesi yasaktır.
Kantar tartım denetimlerinde:
- 40 tona kadar olan ağırlıklarda azami yüklü ağırlığına %3.75 + 500 KG tolerans tanınır.
- 40 ton ve üzerindeki araçlarda taban ağırlığına +2.000 KG ilave edildikten sonra %3.75 tartı toleransı uygulanır.
Aşım Kademeleri ve Cezalar:
- Toleranslı üst sınırın %10'una kadar aşım: KTK 65/1-(a) - 10.000 ₺ ceza (Seyre izin verilir).
- %10 ile %15 arası aşım: KTK 65/1-(b) - 20.000 ₺ ceza (Seyre izin verilir).
- %15 ile %20 arası aşım: KTK 65/1-(c) - 30.000 ₺ ceza (Seyre izin verilir).
- %20 ile %25 arası aşım: KTK 65/1-(d) - 40.000 ₺ ceza (SEYRE İZİN VERİLMEZ, araç men edilir).
- %25 üzeri ağır aşım: KTK 65/1-(e) - 60.000 ₺ ceza (SEYRE İZİN VERİLMEZ, araç otoparka çekilir).
Önemli Esas: Bu fıkralarda belirtilen idari para cezaları işletene ve yük gönderene uygulanır; sürücüye idari para cezası uygulanmaz ve ceza puanı düşülmez.`,
    relatedViolations: ['65/1-a', '65/1-b', '65/1-c', '65/1-d', '65/1-e'],
    keywords: ['tonaj', 'kantar', 'istiap haddi', '65/1', 'ağır yük', 'işleten', 'yük gönderen'],
  },
  {
    id: 'sktk-67',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 67',
    articleTitle: 'Dönüş ve Manevra Kuralları (Drift / Spin / Tehlikeli Hareketler)',
    chapter: 'Trafik Kuralları',
    summary: 'Karayolunda el freni çekerek veya aracı kaydırarak drift/spin atmak, kamu düzenini ve güvenliğini tehlikeye düşürmek.',
    fullText: `Herhangi bir zorunluluk olmaksızın, karayollarında dönüş kuralları dışında bilerek ve isteyerek el freni çekilmesi veya başka yönlerden aracın ani olarak yönünün değiştirilmesi veya kendi etrafında döndürülmesi (drift / spin) yasaktır.
Bu fiili işleyen sürücülere ağır idari para cezası verilir, sürücü belgesi 60 gün süreyle geri alınır ve araç 60 gün süreyle trafikten men edilir.`,
    relatedViolations: ['67/1-d'],
    keywords: ['drift', 'spin', 'el freni', '60 gün men', 'akrobatik'],
  },
  {
    id: 'sktk-73',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 73',
    articleTitle: 'Araç Kullanırken Seyir Halinde Cep Telefonu Kullanımı',
    chapter: 'Trafik Kuralları',
    summary: 'Seyir esnasında cep telefonu veya benzeri haberleşme cihazlarını ele alarak kullanma yasağı.',
    fullText: `Karayolunda seyir halindeyken sürücülerin cep ve araç telefonları ile benzer haberleşme cihazlarını sürücünün elinde tutarak veya dikkatini dağıtacak şekilde kullanması yasaktır. İhlal halinde idari para cezası ve ceza puanı uygulanır.`,
    relatedViolations: ['73/c'],
    keywords: ['cep telefonu', 'telefon', 'haberleşme', 'seyir hali'],
  },
  {
    id: 'sktk-78',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 78',
    articleTitle: 'Emniyet Kemeri ve Koruma Başlığı (Kask) Zorunluluğu',
    chapter: 'Trafik Kuralları',
    summary: 'Araçlarda emniyet kemeri; motosikletlerde koruma başlığı ve koruma gözlüğü takma zorunluluğu.',
    fullText: `Belirli sürücülerin ve yolcuların koruma başlığı, koruma gözlüğü ve emniyet kemeri takmaları zorunludur. Emniyet kemeri takmayan sürücü ve yolculara idari para cezası verilir.`,
    relatedViolations: ['78/1-a', '78/1-b'],
    keywords: ['emniyet kemeri', 'kask', 'koruma başlığı', 'motosiklet'],
  },
  {
    id: 'sktk-91',
    lawType: '2918-SKTK',
    lawName: '2918 Sayılı Karayolları Trafik Kanunu',
    articleNumber: 'Madde 91',
    articleTitle: 'Zorunlu Mali Sorumluluk Sigortası (Trafik Sigortası)',
    chapter: 'Hukuki Sorumluluk ve Sigorta',
    summary: 'Geçerli zorunlu trafik sigortası yaptırmadan trafiğe çıkma yasağı ve araç men prosedürü.',
    fullText: `İşletenlerin, Karayolları Trafik Kanununa göre Zorunlu Mali Sorumluluk Sigortası yaptırmaları mecburidir.
Geçerli sigortası bulunmayan araçların karayolunda trafiğe çıkması yasaktır. Sigortasız araç tespit edildiğinde idari para cezası verilir ve geçerli sigorta poliçesi ibraz edilene kadar araç trafikten men edilir.`,
    relatedViolations: ['91'],
    keywords: ['sigorta', 'zorunlu mali sorumluluk', 'poliçe', 'men'],
  },

  // ----------------------------------------------------
  // KARAYOLLARI TRAFİK YÖNETMELİĞİ (KTY)
  // ----------------------------------------------------
  {
    id: 'kty-128',
    lawType: 'KTY',
    lawName: 'Karayolları Trafik Yönetmeliği',
    articleNumber: 'KTY Madde 128',
    articleTitle: 'Araçların Boyutları, Ağırlıkları ve Kantar Tartım Toleransları',
    chapter: 'Teknik Ölçüler',
    summary: 'Karayolunda seyredecek araçların azami dingil ağırlıkları, gabarileri ve tartı istasyonlarındaki tolerans oranları.',
    fullText: `Karayolunda seyreden araçların yüklü ve yüksüz azami genişliği 2.55 metre (soğutuculu araçlarda 2.60 metre), azami yüksekliği 4.00 metredir.
Tartı denetimlerinde azami yüklü ağırlıklara uygulanan %3.75 aşım toleransı ve 40 tona kadar olan yüklerde tanınan +500 KG ek pay kuralı bu madde ile düzenlenmiştir. 40 ton üzeri araçlar için ise dingil ve azami ağırlık yapısına göre 2 ton tolerans ilave edilmektedir.`,
    relatedViolations: ['65/1-a', '65/1-b', '65/1-c', '65/1-d', '65/1-e'],
    keywords: ['kty 128', 'kantar', 'dingil ağırlığı', 'gabari toleransı', '40 ton'],
  },
  {
    id: 'kty-76',
    lawType: 'KTY',
    lawName: 'Karayolları Trafik Yönetmeliği',
    articleNumber: 'KTY Madde 76',
    articleTitle: 'Sürücü Belgesi Sınıfları, Yaş ve Deneyim Şartları',
    chapter: 'Sürücü Belgeleri',
    summary: 'A, B, C, D, CE gibi sürücü belgesi sınıflarının kapsamı, geçerlilik süreleri ve araç kullanma yetkileri.',
    fullText: `Sürücü belgeleri; M, A1, A2, A, B1, B, BE, C1, C1E, C, CE, D1, D1E, D, DE, F ve G sınıflarına ayrılır. Her sınıfın kullanabileceği araç cinsleri, römork takma limitleri ve geçerlilik süreleri yönetmelikte ayrıntılı olarak belirlenmiştir.`,
    relatedViolations: ['39/2'],
    keywords: ['kty 76', 'sınıf', 'b sınıfı', 'c sınıfı', 'ce sınıfı', 'ehliyet sınıfı'],
  },

  // ----------------------------------------------------
  // 4925 SAYILI KARAYOLU TAŞIMA KANUNU (4925 STK)
  // ----------------------------------------------------
  {
    id: 'stk-5',
    lawType: '4925-STK',
    lawName: '4925 Sayılı Karayolu Taşıma Kanunu',
    articleNumber: 'Madde 5',
    articleTitle: 'Taşımacılık Faaliyetleri ve Yetki Belgesi Alma Zorunluluğu',
    chapter: 'Taşımacılık Esasları',
    summary: 'Ticari amaçla yük, eşya veya yolcu taşımacılığı yapan tüm gerçek ve tüzel kişilerin yetki belgesi alma zorunluluğu.',
    fullText: `Karayoluyla ticari amaçla yük, eşya veya yolcu taşımacılığı yapacak gerçek ve tüzel kişilerin Ulaştırma ve Altyapı Bakanlığından türüne uygun yetki belgesi (K1, K2, K3, D1, D2 vb.) almaları zorunludur. Yetki belgesiz faaliyet gösterilmesi kanunun amir hükmü gereği yasaktır.`,
    relatedViolations: ['26/a'],
    keywords: ['yetki belgesi', 'k1', 'k2', 'ticari taşıma', 'ulaştırma bakanlığı'],
  },
  {
    id: 'stk-26-a',
    lawType: '4925-STK',
    lawName: '4925 Sayılı Karayolu Taşıma Kanunu',
    articleNumber: 'Madde 26/a',
    articleTitle: 'Yetki Belgesiz Karayolu Taşımacılığı Yapmak',
    chapter: 'İdari Para Cezaları',
    summary: 'Yetki belgesi almadan ticari eşya veya yolcu taşıyanlara uygulanan idari para cezası ve faaliyetten men yaptırımı.',
    fullText: `4925 Sayılı Kanunun 5 inci maddesine göre yetki belgesi almadan taşıma yapanlara idari para cezası uygulanır ve araç faaliyetten men edilir. İlgili evrak düzenlenerek Ulaştırma Bölge Müdürlüğüne ve kolluk kayıtlarına intikal ettirilir.`,
    relatedViolations: ['26/a'],
    keywords: ['26/a', 'yetki belgesiz', 'k belgesi', 'korsan taşıma', 'men'],
  },
  {
    id: 'stk-26-e',
    lawType: '4925-STK',
    lawName: '4925 Sayılı Karayolu Taşıma Kanunu',
    articleNumber: 'Madde 26/e',
    articleTitle: 'Mesleki Yeterlilik Belgesi (SRC) Olmadan Taşıt Kullanmak',
    chapter: 'İdari Para Cezaları',
    summary: 'Ticari taşıt kullanan şoförlerin SRC 1, 2, 3, 4 ve Psikoteknik değerlendirme raporu bulundurma zorunluluğu; şoföre ve yetki belgesi sahibine ayrı ceza.',
    fullText: `Mesleki yeterlilik belgesine (SRC Belgesi) sahip olmadan ticari taşıt kullanan şoförlere ve bu şoförleri çalıştıran yetki belgesi sahiplerine ayrı ayrı idari para cezası verilir. Psikoteknik değerlendirme raporu bulunmayan şoförlerin ticari taşıt kullanmasına izin verilmez.`,
    relatedViolations: ['26/e'],
    keywords: ['src', 'src belgesi', 'psikoteknik', 'mesleki yeterlilik', '26/e'],
  },
  {
    id: 'stk-26-k',
    lawType: '4925-STK',
    lawName: '4925 Sayılı Karayolu Taşıma Kanunu',
    articleNumber: 'Madde 26/k',
    articleTitle: 'Taşıt Kartı ve Taşıma Listesi Bulundurmama',
    chapter: 'İdari Para Cezaları',
    summary: 'Ticari taşıtta onaylı taşıt kartı ve taşıma irsaliyesi/listesi bulundurmadan seyre çıkılması hali.',
    fullText: `Taşıtlarında geçerli taşıt kartı bulundurmayan veya taşınan eşyaya ilişkin sevk irsaliyesi, taşıma listesi düzenlemeyen yetki belgesi sahiplerine kanunun 26 ncı maddesinin ilgili fıkrası uyarınca idari para cezası verilir.`,
    relatedViolations: ['26/k'],
    keywords: ['taşıt kartı', 'irsaliye', 'taşıma listesi', 'yolcu listesi'],
  },

  // ----------------------------------------------------
  // KARAYOLU TAŞIMA YÖNETMELİĞİ
  // ----------------------------------------------------
  {
    id: 'kty-tasima-34',
    lawType: 'KTY-TASIMA',
    lawName: 'Karayolu Taşıma Yönetmeliği',
    articleNumber: 'Madde 34',
    articleTitle: 'Şoförlerde Aranacak Nitelikler ve Şartlar',
    chapter: 'Şoförler ve Personel',
    summary: 'Ticari taşıt kullanan şoförlerde yaş sınırları (asgari ve azami 69 yaş), SRC türleri ve psikoteknik şartı.',
    fullText: `Ticari taşıt kullanan şoförlerin;
- İlgili sınıfta geçerli sürücü belgesine sahip olmaları,
- Taşımanın türüne göre (SRC 1 uluslararası yolcu, SRC 2 yurtiçi yolcu, SRC 3 uluslararası eşya, SRC 4 yurtiçi eşya) mesleki yeterlilik belgesine sahip olmaları,
- Yetkili merkezlerden alınmış psikoteknik değerlendirme raporuna sahip olmaları,
- 69 yaşından gün almamış olmaları zorunludur.`,
    relatedViolations: ['26/e'],
    keywords: ['şoför', 'src', 'yaş haddi', 'psikoteknik', 'taşıma yönetmeliği'],
  },
];
