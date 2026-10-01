import { Job, Application, Companion, SafePoint, EmergencyContact, Conversation, AppNotification } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'kokand-job-1',
    title: 'Ingliz tili Speaking Mentori (Part-time)',
    company: 'Kokand Bright Academy',
    companyLogoText: 'KBA',
    companyCategory: 'O‘quv markazi',
    salaryMin: 3500000,
    salaryMax: 5500000,
    salaryPeriod: 'oyiga',
    schedule: '15:00 – 18:30 (Darsdan so‘ng)',
    workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
    workingTimeOfDay: 'Tushdan so‘ng (Part-time)',
    workingHoursStart: '15:00',
    workingHoursEnd: '18:30',
    distanceKm: 0.4,
    location: 'Qo‘qon shahri, Turkiston ko‘chasi 24 (Kokand University yonida)',
    district: 'Qo‘qon shahri',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 5.0,
    reviewCount: 14,
    jobType: 'part-time',
    forStudents: true,
    noExperienceRequired: true,
    postedDate: 'Bugun',
    description: 'Kokand University talabalari uchun darsdan keyin yoshlarga ingliz tili speaking mashg‘ulotlarini o‘tish. Yorug‘, shinam va videokuzatuvli xonalar.',
    responsibilities: [
      'Guruhlarda speaking va munozara darslarini olib borish',
      'Talabalarning o‘zlashtirishini nazorat qilish va metodist bilan hamkorlik'
    ],
    requirements: [
      'Kokand University yoki boshqa OTM talabasi (2–4 kurs)',
      'Ingliz tili darajasi kamida B2 / IELTS 6.5+'
    ],
    workConditions: [
      'Dars jadvaliga moslashtirilgan grafik',
      'Zamonaviy multimediya uskunalari bilan jihozlangan xonalar',
      'Kechki smenadan so‘ng xavfsiz transport ta’minlanadi'
    ],
    safetyNotes: [
      'Bino kirishida va xonalarda videokuzatuv mavjud',
      'Kokand University binosidan piyoda 5 daqiqalik masofa'
    ],
    employerInfo: {
      inn: '308 214 902',
      verifiedSince: '2026-yil',
      physicalAuditDate: '2026-yil 15-mart',
      femaleStaffRatio: '88%',
      eveningTransportSupported: true,
      cctvEquipped: true,
      contactPerson: 'Zulxumor Rahimova',
      phone: '+998 73 542 11 22'
    },
    safetyScores: {
      workEnvironment: 5.0,
      scheduleIntegrity: 5.0,
      teamRespect: 5.0,
      locationConvenience: 5.0,
      eveningCommute: 5.0
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Mohinur T.',
        role: '3-kurs talabasi',
        university: 'Kokand University',
        comment: 'Darslarimdan keyin 15:30 da boraman, jamoa juda ahil, barcha xonalar xavfsiz va nazoratda.',
        date: '24-mart 2026',
        rating: 5
      }
    ]
  },
  {
    id: 'kokand-job-2',
    title: 'Boshlang‘ich sinf o‘quvchilari uchun tutor / Repetitor',
    company: 'Qo‘qon Ziyo Maskani Xususiy Maktabi',
    companyLogoText: 'QZM',
    companyCategory: 'Xususiy maktab',
    salaryMin: 3200000,
    salaryMax: 4800000,
    salaryPeriod: 'oyiga',
    schedule: '14:30 – 18:00 (Haftada 4 kun)',
    workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba'],
    workingTimeOfDay: 'Tushdan so‘ng (Part-time)',
    workingHoursStart: '14:30',
    workingHoursEnd: '18:00',
    distanceKm: 0.9,
    location: 'Qo‘qon shahri, Navoiy mavzesi 12-bino',
    district: 'Qo‘qon shahri',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 4.9,
    reviewCount: 9,
    jobType: 'part-time',
    forStudents: true,
    noExperienceRequired: true,
    postedDate: 'Kecha',
    description: 'Boshlang‘ich sinf o‘quvchilariga darsdan so‘ng uy vazifalarini bajarishda yordam berish va qo‘shimcha to‘garaklar olib borish.',
    responsibilities: [
      'O‘quvchilarning darslarini tayyorlashda ko‘maklashish',
      'Kichik yoshdagi bolalar bilan qiziqarli rivojlantiruvchi o‘yinlar o‘tkazish'
    ],
    requirements: [
      'Pedagogika, filologiya yoki boshlang‘ich ta’lim yo‘nalishi talabasi',
      'Bolalar bilan muloqot qilish madaniyati va xushmuomalalik'
    ],
    workConditions: [
      'Issiq ovqat va bepul choy/kofe ta’minlanadi',
      'O‘qish sessiyasi vaqtida ta’til beriladi'
    ],
    safetyNotes: [
      'Maktab xavfsizlik xizmati va qo‘riqlash tizimi to‘liq nazoratida',
      'Turniket va videokuzatuv mavjud'
    ],
    employerInfo: {
      inn: '302 441 819',
      verifiedSince: '2026-yil',
      physicalAuditDate: '2026-yil 10-fevral',
      femaleStaffRatio: '95%',
      eveningTransportSupported: true,
      cctvEquipped: true,
      contactPerson: 'Dilafruz Karimova',
      phone: '+998 73 543 88 90'
    },
    safetyScores: {
      workEnvironment: 4.9,
      scheduleIntegrity: 5.0,
      teamRespect: 5.0,
      locationConvenience: 4.8,
      eveningCommute: 5.0
    },
    reviews: []
  },
  {
    id: 'kokand-job-3',
    title: 'Qabul bo‘limi koordinatori / Administrator',
    company: 'Kokand IT & Digital Hub',
    companyLogoText: 'KDH',
    companyCategory: 'IT va Raqamli markaz',
    salaryMin: 4000000,
    salaryMax: 6000000,
    salaryPeriod: 'oyiga',
    schedule: '15:00 – 19:00 (Moslashuvchan grafik)',
    workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
    workingTimeOfDay: 'Tushdan so‘ng (Part-time)',
    workingHoursStart: '15:00',
    workingHoursEnd: '19:00',
    distanceKm: 0.6,
    location: 'Qo‘qon shahri, Charxiy ko‘chasi 8',
    district: 'Qo‘qon shahri',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 5.0,
    reviewCount: 11,
    jobType: 'part-time',
    forStudents: true,
    noExperienceRequired: true,
    postedDate: 'Hozirgina',
    description: 'IT kurslariga qiziqqan yoshlarga kurslar haqida ma’lumot berish, ro‘yxatga olish va o‘quv markazi ichki tartibini yuritish.',
    responsibilities: [
      'Mijozlar bilan telefon va ofisda muloqot qilish',
      'CRM tizimida yangi o‘quvchilarni qayd etish'
    ],
    requirements: [
      'Kompyuter savodxonligi (MS Office, Telegram)',
      'Xushmuomala va mas’uliyatli talaba qizlar'
    ],
    workConditions: [
      'Zamonaviy kovorking muhiti va qulay ish stoli',
      'IT kurslarida 50% chegirma bilan ta’lim olish imkoniyati'
    ],
    safetyNotes: [
      'Yopiq xavfsiz biznes markaz binosi',
      'Avtobus bekatiga yaqin'
    ],
    employerInfo: {
      inn: '309 881 220',
      verifiedSince: '2026-yil',
      physicalAuditDate: '2026-yil 20-yanvar',
      femaleStaffRatio: '78%',
      eveningTransportSupported: true,
      cctvEquipped: true,
      contactPerson: 'Sardorbek To‘xtayev',
      phone: '+998 73 544 55 66'
    },
    safetyScores: {
      workEnvironment: 5.0,
      scheduleIntegrity: 5.0,
      teamRespect: 5.0,
      locationConvenience: 5.0,
      eveningCommute: 5.0
    },
    reviews: []
  },
  {
    id: 'kokand-job-restaurant-1',
    title: 'Restoran administratori va zal xodimi (Qizlar uchun qulay & xavfsiz)',
    company: 'Qo‘qon Milliy Taomlar & Saroy Restorani',
    companyLogoText: 'QSR',
    companyCategory: 'Restoran va Umumiy ovqatlanish',
    salaryMin: 3800000,
    salaryMax: 5500000,
    salaryPeriod: 'oyiga',
    schedule: '16:00 – 21:30 (Part-time, darsdan so‘ng)',
    distanceKm: 0.5,
    location: 'Qo‘qon shahri, Istiqlol ko‘chasi 45 (Shahar markazi, Shiroki ro‘parasi)',
    district: 'Qo‘qon shahri',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 5.0,
    reviewCount: 16,
    jobType: 'part-time',
    forStudents: true,
    noExperienceRequired: true,
    postedDate: 'Bugun',
    description: 'Qo‘qon markazidagi nufuzli milliy restoran majmuasiga talaba qizlarni kassa ma’muri va mehmonlarni kutib olish (hostess) lavozimiga ishga taklif etamiz. Kechki smenadan so‘ng bepul xizmat mashinasi bilan uyga yetkazish va issiq ovqat kafolatlanadi.',
    responsibilities: [
      'Mehmonlarni tabassum bilan kutib olish va buyurtmalarni qabul qilish',
      'Kassa hisob-kitoblarini yuritish (zamonaviy iiko dasturida, o‘rgatiladi)',
      'Restoran ichki tozaligi va servis madaniyatini nazorat qilish'
    ],
    requirements: [
      'Talaba qizlar (1–4 kurs), xushmuomala, ozoda va mas’uliyatli',
      'O‘zbek tilida ravon muloqot qila olish (rus tilini bilish qo‘shimcha ustunlik)'
    ],
    workConditions: [
      'Kuniga 2 mahal bepul issiq ovqat va dam olish xonasi',
      'Kechki smena tugagach (21:30 da) shaxsiy xizmat avtomashinasida uyiga bepul yetkazish',
      'Talabalik sessiyasi vaqtida ta’til berilishi kafolatlanadi'
    ],
    safetyNotes: [
      'Restoranning barcha zallari va kirish hududi 360° videokuzatuv tizimi bilan jihozlangan',
      'Litsenziyalangan qo‘riqlash xizmati 24/7 faoliyat yuritadi'
    ],
    employerInfo: {
      inn: '305 119 402',
      verifiedSince: '2026-yil',
      physicalAuditDate: '2026-yil 18-mart',
      femaleStaffRatio: '85%',
      eveningTransportSupported: true,
      cctvEquipped: true,
      contactPerson: 'Malikaxon Rahimova',
      phone: '+998 73 543 90 90'
    },
    safetyScores: {
      workEnvironment: 5.0,
      scheduleIntegrity: 5.0,
      teamRespect: 5.0,
      locationConvenience: 5.0,
      eveningCommute: 5.0
    },
    reviews: [
      {
        id: 'rev-rest-1',
        author: 'Gulnoza M.',
        role: 'Kokand University 2-kurs',
        university: 'Kokand University',
        comment: 'Juda shinam va madaniyatli joy. Smena tugagach har kuni mashina uyimning darvozasigacha xavfsiz eltib qo‘yadi.',
        date: '28-mart 2026',
        rating: 5
      }
    ]
  },
  {
    id: 'kokand-job-callcenter-1',
    title: 'Call-markaz operatori / Mijozlar bilan aloqa bo‘yicha maslahatchi',
    company: 'Qo‘qon Aloqa & Contact Center (BPO Hub)',
    companyLogoText: 'QAC',
    companyCategory: 'Call markaz va Aloqa',
    salaryMin: 3500000,
    salaryMax: 5200000,
    salaryPeriod: 'oyiga',
    schedule: '14:00 – 19:00 (Part-time, 5 soatlik smena)',
    distanceKm: 0.7,
    location: 'Qo‘qon shahri, Turkiston ko‘chasi 88-uy (Hamkorbank ro‘parasida)',
    district: 'Qo‘qon shahri',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 4.9,
    reviewCount: 22,
    jobType: 'part-time',
    forStudents: true,
    noExperienceRequired: true,
    postedDate: 'Bugun',
    description: 'Zamonaviy jihozlangan Qo‘qon call-markaziga kiruvchi qo‘ng‘iroqlarga javob berish va mijozlarga axborot xizmati ko‘rsatish bo‘yicha talabalarni ishga taklif qilamiz. Qizlar uchun maxsus qulay ofis, kofe-breyk va do‘stona yoshlar jamoasi.',
    responsibilities: [
      'Kiruvchi qo‘ng‘iroqlarga xushmuomalalik bilan javob berish va konsultatsiya berish',
      'Mijozlar so‘rovlarini CRM dasturida qayd etish',
      'Mijozlar mamnuniyatini oshirish'
    ],
    requirements: [
      'O‘zbek tilida ravon nutq (rus tilini boshlang‘ich bilish ma’qullanadi)',
      'Kompyuter savodxonligi va klaviaturada yoza olish',
      'O‘rganishga ishtiyoq (ish jarayoni boshida 2 kun bepul trening o‘tkaziladi)'
    ],
    workConditions: [
      'Zamonaviy ofis: individual qulay ish stoli, maxsus shovqinsiz quloqchinlar',
      'Bepul choy, kofe va shirinliklar bilan ta’minlangan qulay dam olish xonasi',
      'Universitet dars jadvaliga mos ravishda smena almashtirish imkoniyati'
    ],
    safetyNotes: [
      'Zamonaviy biznes markaz binosi, elektron turniket va to‘liq videokuzatuv',
      'Markaziy ko‘chada joylashgan, barcha jamoat transportlari bekatiga 1 daqiqalik yo‘l'
    ],
    employerInfo: {
      inn: '307 882 119',
      verifiedSince: '2026-yil',
      physicalAuditDate: '2026-yil 12-mart',
      femaleStaffRatio: '92%',
      eveningTransportSupported: true,
      cctvEquipped: true,
      contactPerson: 'Shahnoza To‘rayeva',
      phone: '+998 73 541 33 44'
    },
    safetyScores: {
      workEnvironment: 5.0,
      scheduleIntegrity: 5.0,
      teamRespect: 4.9,
      locationConvenience: 5.0,
      eveningCommute: 5.0
    },
    reviews: [
      {
        id: 'rev-call-1',
        author: 'Kamola O.',
        role: '3-kurs talabasi',
        university: 'Qo‘qon DPI',
        comment: 'Darslarimdan keyin 14:00 da kelaman, 19:00 da chiqaman. Jamoa yosh qizlardan iborat, rahbarlar juda samimiy.',
        date: '25-mart 2026',
        rating: 5
      }
    ]
  },
  {
    id: 'kokand-job-textile-1',
    title: 'Textile fabrikasi sifat nazoratchisi (OTK / Part-time smena)',
    company: 'Kokand Textile Fabrikasi MCHJ',
    companyLogoText: 'KTF',
    companyCategory: 'To‘qimachilik va Tikuvchilik (Textile Fabrikasi)',
    salaryMin: 3600000,
    salaryMax: 5000000,
    salaryPeriod: 'oyiga',
    schedule: '14:30 – 18:30 (Part-time, darsdan so‘ng)',
    distanceKm: 1.2,
    location: 'Qo‘qon shahri, Yangi Chorsu ko‘chasi 18-uy (Sanoat hududi)',
    district: 'Qo‘qon shahri',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 5.0,
    reviewCount: 34,
    jobType: 'part-time',
    forStudents: true,
    noExperienceRequired: true,
    postedDate: 'Bugun',
    description: 'Qo‘qondagi zamonaviy to‘qimachilik va tayyor kiyim-kechak fabrikamizga talaba qizlarni tayyor trikotaj mahsulotlari sifatini vizual tekshirish va qadoqlash bo‘limiga taklif qilamiz. Bepul xizmat avtobusi va issiq ovqat ta’minlanadi.',
    responsibilities: [
      'Tayyor trikotaj va kiyim mahsulotlarining tikilish sifatini tekshirish',
      'Yorliqlar va shtrix-kodlarning to‘g‘riligini nazorat qilish',
      'Sifat jurnali va elektron tizimga ma’lumotlarni kiritish'
    ],
    requirements: [
      'Talaba yoki yosh mutaxassis qizlar',
      'Diqqatli, mas’uliyatli va intizomli bo‘lish',
      'To‘qimachilik yo‘nalishidagi sertifikatlar yoki tavsiyanomalar ma’qullanadi'
    ],
    workConditions: [
      'Bepul korxona xizmat avtobusi (shahar bo‘ylab qatnaydi)',
      'Har kuni issiq tushlik va choy/kofe bilan ta’minlanadi',
      'Yorug‘, toza, zamonaviy konditsionerli va havoni tozalash tizimli sex'
    ],
    safetyNotes: [
      'Sexlar va fabrika hududida 32 ta videokuzatuv kameralari o‘rnatilgan',
      'Mehnat xavfsizligi bo‘yicha to‘liq instruktaj va shaxsiy himoya vositalari beriladi'
    ],
    employerInfo: {
      inn: '305 482 910',
      verifiedSince: '2026-yil',
      physicalAuditDate: '2026-yil 10-mart',
      femaleStaffRatio: '88%',
      eveningTransportSupported: true,
      cctvEquipped: true,
      contactPerson: 'Nargiza Yo‘ldosheva',
      phone: '+998 73 542 12 34'
    },
    safetyScores: {
      workEnvironment: 5.0,
      scheduleIntegrity: 5.0,
      teamRespect: 5.0,
      locationConvenience: 4.9,
      eveningCommute: 5.0
    },
    reviews: [
      {
        id: 'rev-tex-1',
        author: 'Nodira S.',
        role: 'Talaba-amaliyotchi',
        university: 'Kokand University',
        comment: 'Fabrikada sharoitlar juda a’lo! Darsdan so‘ng xizmat avtobusi universitet yonidan olib ketadi va ishdan so‘ng uyga yetkazadi.',
        date: '27-mart 2026',
        rating: 5
      }
    ]
  }
];

export const INITIAL_APPLICATIONS: Application[] = [];

export const MOCK_COMPANIONS: Companion[] = [
  {
    id: 'comp-1',
    displayName: 'Madina Sh.',
    university: 'Kokand University',
    major: 'Xalqaro munosabatlar, 3-kurs',
    approxLocation: 'Chilonzor 7-mavze yaqinida (taxminiy)',
    distanceMeters: 280,
    routeHeading: 'Novza metrosi tomonga',
    isVerifiedStudent: true,
    avatarInitials: 'MS',
    walkingTime: '17:15 – 17:45',
    compatibilityScore: 96
  },
  {
    id: 'comp-2',
    displayName: 'Sevara B.',
    university: 'TDIU',
    major: 'Buxgalteriya hisobi, 2-kurs',
    approxLocation: 'Bunyodkor xiyoboni hududida (taxminiy)',
    distanceMeters: 450,
    routeHeading: 'Muqimiy ko‘chasi yo‘nalishida',
    isVerifiedStudent: true,
    avatarInitials: 'SB',
    walkingTime: '18:00 – 18:30',
    compatibilityScore: 91
  },
  {
    id: 'comp-3',
    displayName: 'Ziyoda O.',
    university: 'O‘zMU',
    major: 'Amaliy matematika, 4-kurs',
    approxLocation: 'G‘afur G‘ulom bog‘i yaqinida (taxminiy)',
    distanceMeters: 620,
    routeHeading: 'Mirzo Ulug‘bek metrosi tomon',
    isVerifiedStudent: true,
    avatarInitials: 'ZO',
    walkingTime: '17:30 – 18:00',
    compatibilityScore: 88
  }
];

export const SAFE_POINTS: SafePoint[] = [
  {
    id: 'sp-1',
    name: 'Novza Metro Bekati',
    type: 'metro',
    typeLabelUz: 'Metro bekati',
    address: 'Bunyodkor shox ko‘chasi, Novza',
    is24Hours: false,
    lat: 41.2855,
    lng: 69.2140,
    description: 'Xavfsizlik xodimlari, yorug‘ vestibyul va videokuzatuv mavjud.'
  },
  {
    id: 'sp-2',
    name: 'Chilonzor IIB 3-sonli tayanch punkti',
    type: 'police',
    typeLabelUz: 'Ichki ishlar tayanch punkti (24/7)',
    address: 'Qatortol ko‘chasi 18',
    is24Hours: true,
    lat: 41.2820,
    lng: 69.2105,
    description: 'Navbatchi xodimlar doimiy faoliyat ko‘rsatuvchi xavfsiz davlat maskani.'
  },
  {
    id: 'sp-3',
    name: '24/7 Grand Dorixona',
    type: 'pharmacy',
    typeLabelUz: 'Tunu-kun dorixona',
    address: 'Muqimiy ko‘chasi 42',
    is24Hours: true,
    lat: 41.2872,
    lng: 69.2185,
    description: 'Doimiy yoritilgan va xodimlar hozir bo‘lgan jamoat maskani.'
  },
  {
    id: 'sp-4',
    name: 'Kokand University Toshkent Kampusi',
    type: 'university',
    typeLabelUz: 'Universitet kampusi',
    address: 'Chilonzor tumani, Lutfiy ko‘chasi 10',
    is24Hours: false,
    lat: 41.2810,
    lng: 69.2050,
    description: 'Universitet qo‘riqlash xizmati va talabalar uchun himoyalangan hudud.'
  },
  {
    id: 'sp-5',
    name: 'Bright Academy & Coworking',
    type: 'workplace',
    typeLabelUz: 'Tekshirilgan ish joyi',
    address: 'Bunyodkor shox ko‘chasi 14',
    is24Hours: false,
    lat: 41.2890,
    lng: 69.2220,
    description: 'Xodimlar uchun tasdiqlangan bino va videokuzatuv nazorati.'
  },
  {
    id: 'sp-6',
    name: 'Safia Qandolatxonasi (Yorug‘ kafe)',
    type: 'cafe',
    typeLabelUz: 'Jamoat qahvaxonasi',
    address: 'Bunyodkor shox ko‘chasi 20',
    is24Hours: false,
    lat: 41.2868,
    lng: 69.2160,
    description: 'Odam gavjum, yorug‘ vitrina va xavfsiz kutish joyi.'
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'ec-1',
    name: 'Karima opa Karimova',
    relationship: 'Onam',
    phone: '+998 90 123 45 67',
    isPrimary: true
  },
  {
    id: 'ec-2',
    name: 'Malika Ergasheva',
    relationship: 'Dugonam (Guruh sardori)',
    phone: '+998 93 987 65 43',
    isPrimary: false
  },
  {
    id: 'ec-3',
    name: 'Alisher aka Qodirov',
    relationship: 'Universitet tyutori',
    phone: '+998 97 555 44 33',
    isPrimary: false
  }
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    recipientName: 'Zulxumor Rahimova (Bright Academy)',
    recipientRole: 'HR menejer',
    avatarText: 'BA',
    type: 'employer',
    lastMessage: 'Assalomu alaykum Dilnoza! Rezyumeingiz bilan tanishdik, 28-martdagi suhbat vaqti sizga ma’qulmi?',
    lastMessageTime: '11:42',
    unreadCount: 0,
    isVerified: true,
    messages: [
      {
        id: 'm1',
        sender: 'other',
        senderName: 'Zulxumor Rahimova',
        text: 'Assalomu alaykum Dilnoza! HerPath orqali murojaatingizni ko‘rib chiqdik.',
        time: '11:40'
      }
    ]
  },
  {
    id: 'conv-2',
    recipientName: 'Madina Sh. (Hamroh)',
    recipientRole: 'Kokand University talabasi',
    avatarText: 'MS',
    type: 'companion',
    lastMessage: 'Ha, 17:15 da universitet chiqishidagi bekatda ko‘rishsak yaxshi bo‘lardi.',
    lastMessageTime: 'Kecha',
    unreadCount: 0,
    isVerified: true,
    messages: [
      {
        id: 'm3',
        sender: 'user',
        senderName: 'Dilnoza',
        text: 'Salom Madina! Bugun darsdan so‘ng Novza metrosi tomonga birga ketsak bo‘ladimi?',
        time: '16:50'
      },
      {
        id: 'm4',
        sender: 'other',
        senderName: 'Madina Sh.',
        text: 'Ha, albatta! 17:15 da universitet chiqishidagi bekatda ko‘rishsak yaxshi bo‘lardi.',
        time: '17:02'
      }
    ]
  }
];

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-2',
    title: 'Yo‘lingizda yangi hamroh topildi',
    body: 'Madina Sh. siz tanlagan yo‘nalish bo‘yicha 17:15 da harakatlanadi.',
    category: 'companion',
    time: '1 soat oldin',
    isRead: false,
    actionTab: 'map'
  },
  {
    id: 'notif-3',
    title: 'Xavfsizlik eslatmasi',
    body: 'Bugun kechki soatlarda Muqimiy ko‘chasida obodonlashtirish ishlari tufayli Bunyodkor shox ko‘chasidagi yorug‘ yo‘lak tavsiya etiladi.',
    category: 'safety',
    time: '3 soat oldin',
    isRead: true,
    actionTab: 'map'
  }
];

export const UNIVERSITY_PARTNERS = [
  {
    id: 'uni-1',
    name: 'Kokand University',
    shortName: 'Kokand Uni',
    city: 'Qo‘qon / Toshkent',
    studentsCount: '12 000+',
    verifiedJobsCount: 48,
    logoInitial: 'KU',
    badge: 'Bosh hamkor OTM',
    description: 'Talaba qizlarni o‘qish davomida xavfsiz va moslashuvchan grafikli ish o‘rinlari bilan ta’minlash memorandumi imzolangan.'
  },
  {
    id: 'uni-2',
    name: 'Toshkent Davlat Pedagogika Universiteti (TDPU)',
    shortName: 'Nizomiy nomidagi TDPU',
    city: 'Toshkent',
    studentsCount: '18 000+',
    verifiedJobsCount: 62,
    logoInitial: 'TP',
    badge: 'Pedagogik amaliyot',
    description: 'Xususiy maktablar, o‘quv markazlari va bolalar bog‘chalarida xavfsiz kunduzgi yordamchi o‘qituvchi lavozimlari.'
  },
  {
    id: 'uni-3',
    name: 'O‘zbekiston Milliy Universiteti (O‘zMU)',
    shortName: 'O‘zMU',
    city: 'Toshkent',
    studentsCount: '24 000+',
    verifiedJobsCount: 39,
    logoInitial: 'MU',
    badge: 'Ilmiy & IT amaliyot',
    description: 'Tarjima, tahririyat, IT va tahliliy markazlarda talaba qizlar uchun tasdiqlangan part-time o‘rinlar.'
  }
];
