import { ProcedureGuide } from '../types/traffic';

export const PROCEDURE_GUIDES: ProcedureGuide[] = [
  {
    id: 'rehber-arac-men',
    title: 'Araç Trafikten Men İşlemleri Rehberi',
    category: 'Araç İşlemleri',
    badge: 'Trafikten Men & Çekici',
    summary: '2918 Sayılı KTK gereğince araçların trafikten men edilme usulleri, EK-33 düzenlenmesi ve yediemin otoparkına teslim süreçleri.',
    legalBasis: '2918 Sayılı KTK Md. 21, 31, 34, 46/2-f, 48, 91, 125 ve KTY Md. 125',
    steps: [
      {
        title: '1. Men Sebebinin Tespiti ve Tutanak Tanzimi',
        description: 'Aracın men edilmesini gerektiren ihlal (sigortasızlık, muayene süresi aşımı, sahte plaka, drift, alkol vb.) tespit edilir. İlgili KTK ceza tutanağı düzenlenir.',
        warning: 'Men sebebi ceza tutanağının açıklama kısmına net şekilde yazılmalıdır.'
      },
      {
        title: '2. Araç Trafikten Men Tutanağı (EK-33) Düzenlenmesi',
        description: 'PolNet / JABS üzerinden veya fiziki koçandan 3 nüsha EK-33 "Araç Trafikten Men Tutanağı" tanzim edilir. Araçtaki mevcut hasar, kilometresi ve içindeki kıymetli eşyalar tutanağa kaydedilir.',
      },
      {
        title: '3. Araç İçi Eşyaların Kontrolü ve Güvenlik',
        description: 'Araç sürücüsüne veya sahibine araçtaki özel ve değerli eşyalarını alması bildirilir. Alınamayan eşyalar tutanağa şerh düşülerek sürücüye imzalatılır.',
        warning: 'İmzadan imtina halinde tutanağa "Sürücü imzadan imtina etti" şerhi düşülüp ekip personeli imzalar.'
      },
      {
        title: '4. Yediemin Otoparkı ve Çekici Koordinasyonu',
        description: 'Yetkili/anlaşmalı çekici çağrılır. Çekiciye yükleme ve otoparka indirme esnasında araç fotoğraflanır. Otopark görevlisine tutanağın bir nüshası teslim edilerek teslim-tesellüm imzası alınır.',
      },
      {
        title: '5. Menin Kaldırılması (İade) Şartları',
        description: 'Men sebebi ortadan kalktığında (sigorta yapılması, muayene randevusu, ceza ve otopark ücreti ödendiğinde) yetkili Trafik Denetleme Şube/Büro Amirliğince men şerhi kaldırılır ve araç sahibine teslim edilir.',
      }
    ],
    requiredForms: [
      'Trafik İdari Para Cezası Karar Tutanağı',
      'EK-33 Araç Trafikten Men Tutanağı',
      'Yediemin Teslim-Tesellüm Tutanağı',
      'Olay Yeri / Araç Fotoğraf Kayıtları'
    ],
    criticalWarnings: [
      'Alkol veya sürücü belgesizlik halinde araç sahibinin olay yerine ivedilikle gelip aracı teslim alması durumunda araç men edilmeyebilir (sadece sürücüye/sahibe ceza uygulanır).',
      'Sahte plaka veya drift (46/2-f) durumlarında araç KESİNLİKLE başkasına teslim edilmez, otoparka çekilmesi kanuni zorunluluktur.'
    ]
  },
  {
    id: 'rehber-surucu-belgesi',
    title: 'Sürücü Belgesi Geri Alma (El Koyma) İşlemleri',
    category: 'Sürücü Belgesi İşlemleri',
    badge: 'Geçici Geri Alma',
    summary: 'Alkol, uyuşturucu, 100 ceza puanı, drift ve 5 kez hız aşımı gibi durumlarda sürücü belgesine el koyma prosedürü.',
    legalBasis: '2918 SKTK Md. 48/5, 48/8, 48/9, 46/2-f, 51/2-c, 118 ve KTY Md. 90-97',
    steps: [
      {
        title: '1. Sürücü Belgesi Sorgulaması (PolNet / JABS)',
        description: 'Sürücünün TC kimlik numarası üzerinden sürücü belgesi sicili sorgulanır. Geriye dönük 1 yıl ve 5 yıllık ihlal geçmişi incelenerek kaçıncı ihlal olduğu kesinleştirilir.',
      },
      {
        title: '2. Geçici Geri Alma Tutanağının Tanzimi',
        description: '"Sürücü Belgesi Geri Alma Tutanağı" düzenlenir. Geri alma süresi (6 Ay, 2 Yıl, 5 Yıl, 60 Gün veya 2 Ay) ve kanuni dayanak açıkça belirtilir.',
        warning: 'Süre tebliğ tarihinden itibaren işlemeye başlar.'
      },
      {
        title: '3. Belgenin Fiziki Olarak Teslim Alınması',
        description: 'Sürücünün fiziki sürücü belgesi teslim alınır. Belge yoksa veya kaybettiğini beyan ederse tutanağa "Fiziki belge ibraz edilmedi, sistemden şerh konuldu" yazılır.',
      },
      {
        title: '4. Sisteme Şerh Düşülmesi',
        description: 'PolNet / JABS Trafik Denetleme modülüne anında ceza ve geri alma şerhi işlenir.',
      },
      {
        title: '5. İade Süreci Hakkında Sürücünün Bilgilendirilmesi',
        description: 'Süre bittiğinde belgenin iadesi için; idari para cezasının ödenmesi, varsa SÜDGE veya Psiko-teknik değerlendirme raporunun tamamlanması gerektiği tebliğ edilir.',
      }
    ],
    requiredForms: [
      'Geçici Sürücü Belgesi Geri Alma Tutanağı',
      'Trafik İdari Para Cezası Karar Tutanağı',
      'Alkol / Uyuşturucu Ölçüm Çıktısı (Varsa)'
    ],
    criticalWarnings: [
      'Belgesi geri alınan kişinin araç sürmeye devam etmesi halinde KTK 36/3-b maddesinden işlem yapılır.',
      'Aday sürücülerde 0.20 promil alkol veya kırmızı ışık/hız aşımı gibi hallerde belge doğrudan İPTAL edilir.'
    ]
  },
  {
    id: 'rehber-sahte-plaka',
    title: 'Sahte ve Mükerrer (İkiz) Plaka İşlem Rehberi',
    category: 'Plaka İşlemleri',
    badge: 'Adli İşlem (TCK 204)',
    summary: 'Başka araca ait veya sahte basılmış plaka kullanan araçlar hakkında KTK ve TCK adli tahkikat prosedürü.',
    legalBasis: '2918 Sayılı KTK Md. 23/5-b, TCK Md. 204 (Resmi Belgede Sahtecilik), CMK Md. 90',
    steps: [
      {
        title: '1. Şasi ve Motor Numarası Fiziki Kontrolü',
        description: 'Araç üzerindeki plaka ile ön cam altındaki şasi numarası, kaput altı şasi ve tescil belgesi karşılaştırılır. Uyuşmazlık fotoğraflanır.',
        warning: 'Şasi numarası kazınmış veya silinmişse (Change araç şüphesi) durum tutanağa derhal kaydedilir.'
      },
      {
        title: '2. İdari Yaptırım Tutanağı Düzenlenmesi',
        description: 'Sürücüye KTK 23/5-b maddesi gereğince 32.170 TL idari para cezası tutanağı düzenlenir.',
      },
      {
        title: '3. Plakaların Zapt Edilmesi ve Aracın Men Edilmesi',
        description: 'Sahte/ikiz plakalar araçtan sökülerek "El Koyma ve Muhafaza Altına Alma Tutanağı" düzenlenir. Araç derhal otoparka çektirilir.',
      },
      {
        title: '4. Nöbetçi Cumhuriyet Savcısına Bilgi Verilmesi',
        description: 'TCK Md. 204 Resmi Belgede Sahtecilik suçundan dolayı Nöbetçi Savcıya telefonla bilgi arz edilir ve adli talimatları (Gözaltı, ifade, kriminal sevk) alınır.',
      },
      {
        title: '5. Asayiş / Polis Merkezi Amirliğine Sevk',
        description: 'Şüpheli şahıs, zapt edilen sahte plakalar ve tanzim edilen evraklar ile birlikte Asayiş Büro / Şehit Polis Merkezi Amirliğine / Jandarma Karakoluna teslim edilir.',
      }
    ],
    requiredForms: [
      'KTK 23/5-b İdari Para Cezası Karar Tutanağı',
      'El Koyma ve Muhafaza Altına Alma Tutanağı',
      'EK-33 Araç Trafikten Men Tutanağı',
      'Görüşme ve Talimat Tutanağı (Cumhuriyet Savcısı)',
      'Olay Yeri İnceleme / Üst Arama Tutanağı'
    ],
    criticalWarnings: [
      'Plaka sahteciliği sadece trafik cezası ile geçiştirilemez. Adli işlem yapılmaması memur için görevi ihmal suçu teşkil eder.',
      'Gerçek plaka sahibinin mağduriyetini gidermek için sistemden gerçek sahibin tescil kaydı da teyit edilmelidir.'
    ]
  },
  {
    id: 'rehber-alkol-denetimi',
    title: 'Alkol ve Uyuşturucu Denetim Prosedürü',
    category: 'Alkol İşlemleri',
    badge: 'Alkol & Uyuşturucu Denetimi',
    summary: 'Teknik cihazla ölçüm yapılması, ölçümün reddedilmesi, adli sınır ve hastaneye sevk kuralları.',
    legalBasis: '2918 Sayılı KTK Md. 48, KTY Md. 97, TCK Md. 179/3',
    steps: [
      {
        title: '1. Güvenli Alan Oluşturulması ve Bilgilendirme',
        description: 'Araç güvenli denetim cebine alınır. Sürücüye alkol kontrolü yapılacağı kibar ve net şekilde bildirilir. Hijyenik ağızlık takılır.',
      },
      {
        title: '2. Teknik Cihazla Promil Ölçümü',
        description: 'Cihaza yeterli nefes verilmesi sağlanır. Çıkan promil değeri cihaza kaydettirilerek yazıcıdan 2 nüsha fiş çıktısı alınır ve sürücüye imzalatılır.',
      },
      {
        title: '3. Ölçüm Sonucuna Göre İşlem Ayrımı',
        description: '• Hususi Otomobil: 0.50 promile kadar cezasız. 0.51 ve üzeri KTK 48/5 uygulanır.\n• Ticari Araçlar: 0.20 promile kadar cezasız. 0.21 ve üzeri KTK 48/5 uygulanır.\n• Aday Sürücüler: 0.00 promil üstü ehliyet iptal edilir.\n• 1.00 Promil ve Üzeri: Adli sınır aşılmıştır, TCK 179/3 adli işlem uygulanır.',
        warning: '1.00 promil üzeri sürücüler doğrudan serbest bırakılamaz; adli tahkikat için karakola sevk edilir.'
      },
      {
        title: '4. Cihazı Reddetme Durumu (KTK 48/9)',
        description: 'Sürücü alkolmetreyi üflemeyi reddederse zor kullanılmaz. "Ölçümü Reddetme Tutanağı" düzenlenerek KTK 48/9 maddesinden 18.452 TL ceza kesilir ve ehliyetine 2 yıl el konulur.',
      },
      {
        title: '5. Hastaneye Sevk Kriteri',
        description: 'Teknik cihazın bozuk olması veya sürücünün cihaza üfleyemeyecek derecede yaralı/bilinçsiz olması durumunda savcı talimatıyla kan tespiti için sağlık kuruluşuna sevk edilir.',
      }
    ],
    requiredForms: [
      'Alkolmetre Cihaz Ölçüm Çıktısı',
      'Geçici Sürücü Belgesi Geri Alma Tutanağı',
      'EK-33 Trafikten Men Tutanağı',
      'Teknik Cihazla Ölçümü Reddetme Tutanağı (Gerektiğinde)',
      'Doktor Muayene Raporu / Adli Rapor (1.00 promil üzeri için)'
    ],
    criticalWarnings: [
      'Alkolmetreye üflemeyen sürücü "Hastanede kan vereceğim" dese dahi 48/9 uygulanır; kan verme talebi 48/9 cezasını durdurmaz.',
      'Ölçüm zamanı ile olay zamanı arasındaki fark adli tıp tarafından saat başı 0.15 promil eklenerek hesaplanır.'
    ]
  },
  {
    id: 'rehber-kaza-islemleri',
    title: 'Trafik Kazası İşlemleri (Maddi Hasarlı / Yaralanmalı)',
    category: 'Kaza İşlemleri',
    badge: 'Kaza & Olay Yeri',
    summary: 'Maddi hasarlı, yaralamalı ve ölümlü trafik kazalarında kolluk kuvvetinin olay yeri yönetimi ve tutanak tanzimi.',
    legalBasis: '2918 Sayılı KTK Md. 81, 82, 83 ve KTY Md. 151-157',
    steps: [
      {
        title: '1. Olay Yeri Çevre ve Trafik Güvenliği',
        description: 'Ekip aracı tepe lambaları açık şekilde kaza yerinin 100-150 metre gerisine emniyetli olarak park edilir. Trafik konileri ve reflektörler yerleştirilir. Yangın riski varsa akü kutup başları söktürülür.',
        warning: 'İkinci bir kazanın önlenmesi birincil önceliktir.'
      },
      {
        title: '2. Yaralı Durumunun Kontrolü ve 112 Koordinasyonu',
        description: 'Yaralı varsa 112 Acil Çağrı Merkezi bilgilendirilir. Bilinç kontrolü yapılır, hayati tehlike yoksa yaralılar profesyonel sağlık ekibi gelene kadar hareket ettirilmez.',
      },
      {
        title: '3. Kazanın Niteliğine Göre Tutanak Türü',
        description: '• Yalnızca Maddi Hasar Varsa: Taraflar anlaşabiliyorsa "Kaza Tespit Tutanağı"nı kendi aralarında doldurabilirler.\n• Yaralama/Ölüm, Kamu Malı Zararı, Taraflardan Birinde Ehliyetsizlik/Alkollülük/Sigortasızlık Varsa: Trafik Zabıtası resmi tutanak düzenlemek zorundadır.',
      },
      {
        title: '4. İz, Delil, Fren İzi ve Kaza Krokisi Çizimi',
        description: 'Fren izleri metre ile ölçülür. Çarpışma noktası (POC), yol genişliği, görüş mesafesi, hava ve yol şartları not edilir. Ölçekli kaza krokisi çizilir ve fotoğraflanır.',
      },
      {
        title: '5. Sürücülerin Alkol/Uyuşturucu Tespiti',
        description: 'Kazaya karışan tüm sürücülere kaza anından sonra vakit kaybetmeksizin alkol testi yapılır ve çıktılar kaza dosyasına eklenir.',
      }
    ],
    requiredForms: [
      'Trafik Kazası Tespit Tutanağı (Krokili)',
      'Alkol Ölçüm Çıktıları',
      'Olay Yeri Görgü ve Tespit Tutanağı',
      'Cumhuriyet Savcısı Talimat Tutanağı (Yaralamalı/Ölümlü kazalarda)'
    ],
    criticalWarnings: [
      'Yaralanmalı veya ölümlü kazalarda savcı talimatı olmadan araçlar yerinden kesinlikle oynatılmaz.',
      'Kaza yerini terk eden sürücü olursa derhal KTK 81/1-c maddesi uygulanır ve telsizden çevre birimlere bildirilir.'
    ]
  },
  {
    id: 'rehber-muayene-sigorta',
    title: 'Muayenesiz ve Sigortasız Araç Prosedürü',
    category: 'Muayene & Sigorta',
    badge: 'Tüvtürk & Trafik Sigortası',
    summary: 'Trafiğe muayenesiz ve zorunlu sigortasız çıkan araçlara uygulanacak süre verme ve trafikten men usulleri.',
    legalBasis: '2918 Sayılı KTK Md. 34/a, 34/b ve Md. 91',
    steps: [
      {
        title: '1. Sistem Sorgulaması (PolNet / SBM)',
        description: 'Aracın muayene geçerlilik tarihi ve trafik sigortası poliçe bitiş tarihi kontrol edilir.',
      },
      {
        title: '2. Muayenesiz Araç İlk Tespiti (KTK 34/a)',
        description: 'Daha önce süre verilmemişse KTK 34/a cezası (1.506 TL) kesilir. Muayenesini yaptırabilmesi için sürücüye 7 gün süreli "EK-33/A İzin Belgesi" verilir. Araç bağlanmaz.',
      },
      {
        title: '3. Muayenesiz Araç İkinci Tespiti (KTK 34/b)',
        description: '7 günlük süreyi aştığı halde muayenesiz yakalanırsa KTK 34/b cezası (3.135 TL) kesilir ve araç DERHAL trafikten men edilerek otoparka çekilir.',
        warning: '34/b uygulanan araca kesinlikle ikinci kez yol izni verilmez.'
      },
      {
        title: '4. Sigortasız Araç Tespiti (KTK 91)',
        description: 'Zorunlu Trafik Sigortası yoksa KTK 91 cezası (690 TL) kesilir. Araç DERHAL trafikten men edilir ve çekiciyle otoparka çektirilir.',
      },
      {
        title: '5. Olay Yerinde Sigorta Yaptırılması Hali',
        description: 'Sürücü ekip otosu yanındayken acentesinden veya mobil bankacılıktan sigorta yaptırır ve poliçe SBM sisteminde aktif görünürse araç otoparka gitmeksizin yoluna devam ettirilebilir.',
      }
    ],
    requiredForms: [
      'KTK 34/a veya 34/b İdari Para Cezası Tutanağı',
      'KTK 91 İdari Para Cezası Tutanağı',
      'EK-33/A İzin Belgesi (Muayene için 7 günlük)',
      'EK-33 Men Tutanağı (Sigortasızlık veya 34/b için)'
    ],
    criticalWarnings: [
      'Kasko poliçesi zorunlu trafik sigortası yerine geçmez. Mutlaka "Karayolları Motorlu Araçlar Zorunlu Mali Sorumluluk Sigortası" olmalıdır.'
    ]
  },
  {
    id: 'rehber-drift-makas',
    title: 'Drift, Spin ve Makas İhlalleri Müdahale Rehberi',
    category: 'Kural İhlalleri',
    badge: '60 Gün Men & Belge Geri Alma',
    summary: 'Drift yapmak, spin atmak ve ardı ardına makas atmak fiillerine yönelik ağır yaptırım süreci.',
    legalBasis: '2918 Sayılı SKTK Md. 46/2-f, 46/2-g ve TCK Md. 179/2',
    steps: [
      {
        title: '1. İhlalin Belgelendirilmesi (Video & Kamera Kaydı)',
        description: 'KGYS (Mobese), EDS, ekip otosu araç kamerası veya ihbar videosu delil klasörüne kaydedilir. Araca dur ikazı yapılır.',
      },
      {
        title: '2. Drift İhlali (KTK 46/2-f) Ağır Yaptırımı',
        description: '• 32.170 TL İdari Para Cezası kesilir.\n• Sürücü belgesi 60 GÜN süreyle geri alınır.\n• Araç 60 GÜN süreyle trafikten men edilerek yediemin otoparkına teslim edilir.\n• Sürücüye psiko-teknik değerlendirme raporu alma şartı getirilir.',
        warning: 'Araç sahibi başkası olsa dahi araç 60 gün boyunca otoparktan kesinlikle çıkarılamaz!'
      },
      {
        title: '3. Makas Atma İhlali (KTK 46/2-g)',
        description: 'Trafiği tehlikeye düşürecek şekilde ardı ardına şerit değiştiren sürücüye 6.439 TL para cezası ve 20 ceza puanı uygulanır.',
      },
      {
        title: '4. TCK 179/2 Kapsamında Adli Değerlendirme',
        description: 'Kişilerin hayatı, sağlığı veya malvarlığı açısından somut bir tehlike meydana gelmişse savcılık talimatı ile adli tahkikat başlatılır.',
      }
    ],
    requiredForms: [
      'KTK 46/2-f / 46/2-g İdari Para Cezası Tutanağı',
      '60 Günlük Geçici Sürücü Belgesi Geri Alma Tutanağı',
      '60 Günlük EK-33 Araç Trafikten Men Tutanağı',
      'Görüntü İnceleme ve Tespit Tutanağı'
    ],
    criticalWarnings: [
      'Drift cezası verilen sürücünün 5 yıl içinde aynı maddeyi ikinci kez ihlal etmesi durumunda sürücü belgesi tamamen İPTAL edilir.'
    ]
  },
  {
    id: 'rehber-park-cekici',
    title: 'Park Yasağı ve Araç Çekme Prosedürü',
    category: 'Park İşlemleri',
    badge: 'Park & Otopark',
    summary: 'Hangi araçların çekiciyle çekileceği, çekme tutanağı ve engelli park yerleri denetimi.',
    legalBasis: '2918 Sayılı KTK Md. 60, 61 ve Trafik Zabıtası Araç Çekme Yönetmeliği',
    steps: [
      {
        title: '1. Çekilme Kriterlerinin Kontrolü',
        description: 'Her park ihlalinde araç çekilmez. Araç şu durumlarda çekilir:\n• Trafik akışını veya kavşakları fiilen engelliyorsa\n• Otobüs, tramvay veya taksi duraklarına park edilmişse\n• Yangın musluğu, itfaiye/ambulans girişini tıkıyorsa\n• Engelli park alanına izinsiz park edilmişse\n• Yaya geçidi üzerine park edilmişse.',
      },
      {
        title: '2. Fotoğraflama ve Ceza Tanzimi',
        description: 'Aracın park hali 4 cepheden (plaka ve ihlal durumu net görünecek şekilde) fotoğraflanır. İlgili madde (normal park: 61/1-a veya engelli yeri: 61/1-o) cezası yazılır.',
      },
      {
        title: '3. Çekici Çağrılması ve Araç Hasar Kontrolü',
        description: 'Çekiciye yüklenmeden önce araçtaki mevcut çizik, göçük ve hasarlar çekici görevlisi ile birlikte tutanağa bağlanır.',
        warning: 'Yükleme esnasında sürücü olay yerine gelirse yükleme durdurulur; sadece ceza uygulanır, çekici masrafı alınmaz.'
      },
      {
        title: '4. Sisteme Otopark Bilgisinin Girilmesi',
        description: 'Aracın hangi yediemin otoparkına götürüldüğü PolNet çekici bilgi sistemine girilir ki vatandaş 112 veya e-Devlet üzerinden aracını bulabilsin.',
      }
    ],
    requiredForms: [
      'Trafik İdari Para Cezası Karar Tutanağı',
      'Araç Çekme ve Otoparka Teslim Tutanağı',
      'Araç Park ve Hasar Durumu Fotoğrafları'
    ],
    criticalWarnings: [
      'Engelli park yerine park edenlere normal park cezasının 2 katı (1.380 TL) uygulanması yasal zorunluluktur.'
    ]
  }
];
