import { Job, Application, Companion, SafePoint, EmergencyContact, Conversation, AppNotification } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'English Tutor & Speaking Club Mentor',
    company: 'Bright Academy',
    companyLogoText: 'BA',
    companyCategory: 'O‘quv markazi',
    salaryMin: 3000000,
    salaryMax: 4500000,
    salaryPeriod: 'oyiga',
    schedule: '16:00 – 19:00',
    distanceKm: 0.8,
    location: 'Chilonzor tumani, Bunyodkor shox ko‘chasi 14',
    district: 'Chilonzor',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 4.9,
    reviewCount: 38,
    jobType: 'part-time',
    forStudents: true,
    noExperienceRequired: true,
    postedDate: '2 kun oldin',
    description: 'Bright Academy o‘quv markazimizga talaba qizlar va yosh pedagoglar uchun qulay vaqtda dars berish imkoniyati. Universitet darslaridan so‘ng 16:00 dan boshlanuvchi guruhlarga speaking club va grammatika mashg‘ulotlarini olib borish.',
    responsibilities: [
      'Haftada 3 kun (Dushanba-Chorshanba-Juma) 16:00–19:00 oralig‘ida kichik guruhlarga dars o‘tish',
      'O‘quvchilar bilan erkin muloqot va listening mashg‘ulotlarini tashkil etish',
      'Oylik o‘zlashtirish hisobotlarini metodistga topshirish'
    ],
    requirements: [
      'IELTS 6.5+ yoki CEFR B2 daraja (yoki tegishli til universiteti 2–4-kurs talabasi)',
      'O‘quvchilar bilan muloyim va mas’uliyatli muloqot madaniyati',
      'Darslarga vaqtida kelish va intizom'
    ],
    workConditions: [
      'Yorug‘, konditsionerli va zamonaviy xonalar',
      'Ayol pedagoglar va talaba qizlardan iborat do‘stona jamoa (85% ayollar)',
      'Markaz yonida metro (Novza) va jamoat transporti bekati (3 daqiqalik piyoda yo‘l)',
      'Kechki darslar tugagach bepul choy/kofe va xavfsiz transport tavsiyasi'
    ],
    safetyNotes: [
      'Markaz binosida 24/7 qo‘riqlash xizmati va kuzatuv kameralari mavjud',
      'Ish vaqti 19:00 da to‘liq tugaydi, kechki qo‘shimcha smenalar talab qilinmaydi',
      'O‘qituvchilar xonasi alohida ajratilgan va qulflanadi'
    ],
    employerInfo: {
      inn: '308 214 902',
      verifiedSince: '2023-yil sentabr',
      physicalAuditDate: '2026-yil 12-fevral',
      femaleStaffRatio: '84%',
      eveningTransportSupported: true,
      cctvEquipped: true,
      contactPerson: 'Zulxumor Rahimova (Kadrlar bo‘limi boshlig‘i)',
      phone: '+998 71 200 44 88'
    },
    safetyScores: {
      workEnvironment: 5.0,
      scheduleIntegrity: 4.9,
      teamRespect: 4.9,
      locationConvenience: 5.0,
      eveningCommute: 4.8
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Nargiza M.',
        role: 'Ingliz tili repetitori',
        university: 'O‘zDJTU 3-kurs',
        comment: 'Dars jadvali universitetim bilan juda qulay moslashdi. 19:00 da darslar tugaydi va Novza metrosiga juda yaqin, yo‘l doim yorug‘ va odam gavjum.',
        date: '14-fevral, 2026',
        rating: 5
      },
      {
        id: 'rev-2',
        author: 'Dildora K.',
        role: 'Speaking mentor',
        university: 'Kokand University Toshkent',
        comment: 'Maosh kechiktirilmasdan har oyning 5-sanasida beriladi. Jamoa juda hurmatli va yosh qizlarga alohida e’tibor bilan yordam berishadi.',
        date: '28-yanvar, 2026',
        rating: 5
      }
    ]
  },
  {
    id: 'job-2',
    title: 'Mijozlar bilan muloqot koordinatori (Kunduzgi/Kechki smena)',
    company: 'Apex BPO Aloqa Markazi',
    companyLogoText: 'AP',
    companyCategory: 'Call center & BPO',
    salaryMin: 4000000,
    salaryMax: 6200000,
    salaryPeriod: 'oyiga',
    schedule: 'Moslashuvchan: 4 yoki 6 soat',
    distanceKm: 1.4,
    location: 'Yakkasaroy tumani, Shota Rustaveli ko‘chasi 53',
    district: 'Yakkasaroy',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 4.8,
    reviewCount: 52,
    jobType: 'flexible',
    forStudents: true,
    noExperienceRequired: true,
    postedDate: 'Bugun',
    description: 'Zamonaviy biznes markazida joylashgan yirik mijozlar qo‘llab-quvvatlash xizmati. Faqat kiruvchi qo‘ng‘iroqlarga va Telegram bot orqali murojaatlarga javob berish. Sovuq qo‘ng‘iroqlar yo‘q.',
    responsibilities: [
      'Kiruvchi qo‘ng‘iroqlar va onlayn chat murojaatlariga muloyim javob qaytarish',
      'Mijozlar savollarini CRM tizimiga kiritish va yo‘naltirish',
      'Kunlik smena hisobotini dasturda belgilash'
    ],
    requirements: [
      'O‘zbek tilida ravon so‘zlasha olish (rus tilini bilish ma’qullanadi)',
      'Kompyuterda tez yozish va asosiy dasturlardan foydalanish ko‘nikmasi',
      'Hushmuomala va stressga chidamlilik'
    ],
    workConditions: [
      'Shinam ofis, bepul tushlik va doimiy qahva burchagi',
      'Kechki 21:00 dan keyingi smenalarda xodimlar uchun kompaniya hisobidan bepul taksi ta’minlanadi',
      'Talabalar sessiya paytida jadvalni vaqtincha yengillashtirish imkoniyati'
    ],
    safetyNotes: [
      'A toifali biznes markaz, biometrik turniket va qo‘riqlash xizmati',
      'Kechki smena tugaganda xodimlar korporativ Yandex Business taksisi bilan uylarigacha yetkaziladi',
      'Alohida xodimlar xonasi va dam olish hududi'
    ],
    employerInfo: {
      inn: '304 991 228',
      verifiedSince: '2022-yil iyun',
      physicalAuditDate: '2026-yil 18-yanvar',
      femaleStaffRatio: '72%',
      eveningTransportSupported: true,
      cctvEquipped: true,
      contactPerson: 'Nilufar Usmonova (HR direktori)',
      phone: '+998 78 150 09 00'
    },
    safetyScores: {
      workEnvironment: 4.9,
      scheduleIntegrity: 4.7,
      teamRespect: 4.8,
      locationConvenience: 4.7,
      eveningCommute: 5.0
    },
    reviews: [
      {
        id: 'rev-3',
        author: 'Shahnoza T.',
        role: 'Operator',
        university: 'TDIU 2-kurs',
        comment: 'Eng katta afzalligi — kechki smenada ishlasangiz, uyingizgacha rasmiy taksi xizmati bepul olib boradi. Ota-onam ham xotirjam.',
        date: '2-fevral, 2026',
        rating: 5
      }
    ]
  },
  {
    id: 'job-3',
    title: 'Boshlang‘ich sinf yordamchi o‘qituvchisi',
    company: 'SmartKids Xususiy Maktabi',
    companyLogoText: 'SK',
    companyCategory: 'Xususiy maktab',
    salaryMin: 3500000,
    salaryMax: 4800000,
    salaryPeriod: 'oyiga',
    schedule: '13:30 – 17:30',
    distanceKm: 2.1,
    location: 'Chilonzor tumani, Lutfiy ko‘chasi 28-A',
    district: 'Chilonzor',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 5.0,
    reviewCount: 29,
    jobType: 'part-time',
    forStudents: true,
    noExperienceRequired: true,
    postedDate: '3 kun oldin',
    description: 'Xususiy maktabimizning uzaytirilgan kun guruhida (prodlyonka) 1–3-sinf o‘quvchilariga dars vazifalarini bajarishda yordam berish va ijodiy to‘garaklar tashkil qilish.',
    responsibilities: [
      'Bolalar bilan darsdan keyingi uy vazifalarini ko‘rib chiqish',
      'Kitobxonlik soatlari va qiziqarli mantiqiy o‘yinlar o‘tkazish',
      'Ota-onalar kelguniga qadar bolalar xavfsizligini ta’minlash'
    ],
    requirements: [
      'Pedagogika, psixologiya yoki filologiya yo‘nalishidagi oliygoh talabasi',
      'Bolalarga mehr va sabr-toqat bilan yondashish',
      'Mas’uliyatlilik va tozalikka rioya qilish'
    ],
    workConditions: [
      'Xususiy maktab hududi to‘liq panjara bilan o‘ralgan va qattiq nazoratda',
      'Issiq tushlik maktab oshxonasida bepul taqdim etiladi',
      'Pedagogik amaliyot o‘tash to‘g‘risida rasmiy tasdiqnoma beriladi'
    ],
    safetyNotes: [
      'Faqat kunduzgi soatlar: 13:30 dan 17:30 gacha, qorong‘i tushmasdan tugaydi',
      'Maktab xavfsizlik xizmati barcha tashrif buyuruvchilarni tekshiruvdan o‘tkazadi'
    ],
    employerInfo: {
      inn: '307 441 519',
      verifiedSince: '2023-yil avgust',
      physicalAuditDate: '2026-yil 05-mart',
      femaleStaffRatio: '92%',
      eveningTransportSupported: false,
      cctvEquipped: true,
      contactPerson: 'Gulnora Karimova (O‘quv ishlari mudirasi)',
      phone: '+998 71 277 81 90'
    },
    safetyScores: {
      workEnvironment: 5.0,
      scheduleIntegrity: 5.0,
      teamRespect: 5.0,
      locationConvenience: 4.8,
      eveningCommute: 5.0
    },
    reviews: [
      {
        id: 'rev-4',
        author: 'Kamola R.',
        role: 'Yordamchi pedagog',
        university: 'Nizomiy nomidagi TDPU 4-kurs',
        comment: 'Talabalar uchun haqiqiy amaliyot maktabi. Ish 17:30 da tugaydi, shuning uchun kechqurun bemalol o‘z darslarimni qilishga ulguraman.',
        date: '20-fevral, 2026',
        rating: 5
      }
    ]
  },
  {
    id: 'job-4',
    title: 'SMM va Kontent Yaratuvchi (Masofaviy / Flexible)',
    company: 'Kokand Edu Ta’lim Loyihasi',
    companyLogoText: 'KE',
    companyCategory: 'Online education',
    salaryMin: 3200000,
    salaryMax: 5000000,
    salaryPeriod: 'oyiga',
    schedule: 'Erkin grafik (Haftasiga 20 soat)',
    distanceKm: 0.0,
    location: 'Masofaviy (Online)',
    district: 'Masofaviy',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 4.9,
    reviewCount: 44,
    jobType: 'remote',
    forStudents: true,
    noExperienceRequired: true,
    postedDate: '1 kun oldin',
    description: 'Qizlar uchun mo‘ljallangan ta’lim kurslarimizning Instagram va Telegram kanallari uchun foydali postlar, storislar va ta’limiy infografikalar tayyorlash. To‘liq uydan yoki universitet kovorkingidan ishlash mumkin.',
    responsibilities: [
      'Telegram va Instagram uchun haftalik post rejasini tuzish',
      'Canva yoki Figma dasturlarida o‘quv kartochkalari yaratish',
      'Komentariya va savollarga muloyim javob berish'
    ],
    requirements: [
      'O‘zbek adabiy tilida savodli matn yoza olish',
      'Smartfon yoki noutbukda vizual kontent tayyorlay olish',
      'Kreativ fikrlash va qizlar auditoriyasi ehtiyojlarini tushunish'
    ],
    workConditions: [
      '100% masofaviy ish — safar yoki yo‘l xarajatlari talab etilmaydi',
      'Vazifalar haftalik sprintlar ko‘rinishida beriladi, dars jadvalingizga qarab xohlagan paytda ishlaysiz',
      'Internet xarajatlari uchun har oy qo‘shimcha 200 000 so‘m kompensatsiya'
    ],
    safetyNotes: [
      'Masofaviy faoliyat — kechki yo‘l xavfi mutlaqo yo‘q',
      'Rasmiy o‘zini-o‘zi band qilgan shaxs yoki mehnat shartnomasi rasmiylashtiriladi'
    ],
    employerInfo: {
      inn: '302 811 405',
      verifiedSince: '2024-yil yanvar',
      physicalAuditDate: '2026-yil 10-yanvar',
      femaleStaffRatio: '90%',
      eveningTransportSupported: false,
      cctvEquipped: false,
      contactPerson: 'Madina Boboyeva (Loyiha rahbari)',
      phone: '+998 90 321 00 11'
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
        id: 'rev-5',
        author: 'Gulhayo S.',
        role: 'SMM yordamchisi',
        university: 'Kokand University 2-kurs',
        comment: 'Talaba uchun eng zo‘r variant! Yotoqxonadan chiqmasdan, darslar oralig‘ida postlarni tayyorlab topshiraman. Rahbariyat juda madaniyatli.',
        date: '1-mart, 2026',
        rating: 5
      }
    ]
  },
  {
    id: 'job-5',
    title: 'Junior Frontend Dasturchi (Stajirovka / Part-time)',
    company: 'IT Bilim Raqamli Markazi',
    companyLogoText: 'IT',
    companyCategory: 'IT kompaniya',
    salaryMin: 4500000,
    salaryMax: 7000000,
    salaryPeriod: 'oyiga',
    schedule: '14:00 – 18:30',
    distanceKm: 3.2,
    location: 'Yunusobod tumani, Amir Temur shox ko‘chasi 107-B',
    district: 'Yunusobod',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 4.9,
    reviewCount: 21,
    jobType: 'internship',
    forStudents: true,
    noExperienceRequired: false,
    postedDate: 'Kecha',
    description: 'Ayollar va qizlarning IT sohasidagi faolligini oshirish doirasida ochilgan dasturlash stajirovkasi. Tajribali senior dasturchilar qo‘l ostida haqiqiy loyihalarda amaliyot o‘tash va keyinchalik to‘liq shtatga o‘tish imkoniyati.',
    responsibilities: [
      'React va TypeScript komponentlarini tayyor dizayn asosida yig‘ish',
      'Saytlarning mobil moslashuvchanligini sinovdan o‘tkazish',
      'Jamoaviy kod ko‘riklari (code review)da ishtirok etish'
    ],
    requirements: [
      'HTML/CSS/JavaScript va React asoslarini bilish',
      'Git bilan ishlash bo‘yicha boshlang‘ich tushuncha',
      'O‘rganishga ishtiyoq va qat’iyat'
    ],
    workConditions: [
      'Zamonaviy kovorking markazi (Shahriston metro bekatidan 4 daqiqa)',
      'Kuchli ayol mentorlar tomonidan haftalik yakka darslar',
      'Texnika bilan ta’minlash yoki shaxsiy noutbuk uchun qulay ish joyi'
    ],
    safetyNotes: [
      'Metro bekatiga to‘g‘ridan-to‘g‘ri yorug‘ piyodalar yo‘lagi orqali o‘tiladi',
      'Ish vaqti 18:30 da yakunlanadi, ortiqcha ish soatlari taqiqlangan'
    ],
    employerInfo: {
      inn: '309 670 119',
      verifiedSince: '2023-yil dekabr',
      physicalAuditDate: '2026-yil 15-fevral',
      femaleStaffRatio: '65%',
      eveningTransportSupported: false,
      cctvEquipped: true,
      contactPerson: 'Malika Ergasheva (Lead Frontend)',
      phone: '+998 71 230 90 90'
    },
    safetyScores: {
      workEnvironment: 5.0,
      scheduleIntegrity: 4.9,
      teamRespect: 4.9,
      locationConvenience: 4.8,
      eveningCommute: 4.9
    },
    reviews: [
      {
        id: 'rev-6',
        author: 'Sevinch A.',
        role: 'Intern frontend',
        university: 'TATU 3-kurs',
        comment: 'Qizlar uchun IT muhiti juda samimiy. Hech kim kamsitmaydi, har qadamda yordam berishadi. Metro juda yaqin, kech qolish qo‘rquvi bo‘lmaydi.',
        date: '25-fevral, 2026',
        rating: 5
      }
    ]
  },
  {
    id: 'job-6',
    title: 'Kutubxona va resurs markazi koordinatori',
    company: 'Kokand University Axborot Markazi',
    companyLogoText: 'KU',
    companyCategory: 'Oliy ta’lim',
    salaryMin: 2800000,
    salaryMax: 3600000,
    salaryPeriod: 'oyiga',
    schedule: '10:00 – 14:00 yoki 14:00 – 18:00',
    distanceKm: 0.2,
    location: 'Universitet bosh binosi, 2-qavat',
    district: 'Universitet kampusi',
    isVerified: true,
    verificationLevel: 'high',
    safetyRating: 5.0,
    reviewCount: 67,
    jobType: 'part-time',
    forStudents: true,
    noExperienceRequired: true,
    postedDate: '4 kun oldin',
    description: 'O‘z universitetingiz kampusi ichida darslardan uzilmagan holda ishlash imkoniyati! Talabalar elektron bazasini yuritish, yangi kitoblarni qabul qilish va o‘quv zallarida tinchlikni ta’minlash.',
    responsibilities: [
      'Elektron kutubxona kartochkalarini rasmiylashtirish',
      'Kitoblar fondini tartibga solish va talabalarga adabiyot topishda ko‘maklashish',
      'Resurs markazi kompyuterlarining sozligini tekshirib turish'
    ],
    requirements: [
      'Kokand University yoki hamkor OTM talabasi bo‘lish',
      'Hushmuomala, kitoblarni sevuvchi va mas’uliyatli',
      'Kamida 2 ta semestr davomida ishlash niyati'
    ],
    workConditions: [
      'Universitet binosi ichida — transport uchun vaqt va mablag‘ sarflanmaydi',
      'Darslar boshlanganida smenani almashtirish imkoniyati',
      'Tinch va xotirjam akademik muhit'
    ],
    safetyNotes: [
      'Kampus xavfsizlik tizimi va videokuzatuv to‘liq ishlaydi',
      'Faqat talabalar va universitet xodimlari kirishi mumkin bo‘lgan yopiq hudud'
    ],
    employerInfo: {
      inn: '305 119 443',
      verifiedSince: '2021-yil sentabr',
      physicalAuditDate: '2026-yil 01-fevral',
      femaleStaffRatio: '78%',
      eveningTransportSupported: false,
      cctvEquipped: true,
      contactPerson: 'Gulchehra Yoqubova (Kutubxona mudirasi)',
      phone: '+998 73 545 55 55'
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
        id: 'rev-7',
        author: 'Diyora Q.',
        role: 'Kutubxona assistenti',
        university: 'Kokand University 4-kurs',
        comment: 'Talabalik davrimdagi eng yaxshi ish bo‘ldi. Dars tugashi bilan shu yerga kiraman, hech qayerga borish shart emas. Ham pul topaman, ham kitob o‘qiyman.',
        date: '10-yanvar, 2026',
        rating: 5
      }
    ]
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'English Tutor & Speaking Club Mentor',
    company: 'Bright Academy',
    appliedDate: '2026-03-24',
    status: 'interview',
    statusLabelUz: 'Suhbatga taklif qilindi',
    note: 'Sizning rezyumeingiz ma’qullandi. 28-mart kuni soat 15:00 da tanishuv suhbatiga taklif etilasiz.',
    interviewDate: '28-mart, 2026 — 15:00'
  },
  {
    id: 'app-2',
    jobId: 'job-4',
    jobTitle: 'SMM va Kontent Yaratuvchi',
    company: 'Kokand Edu Ta’lim Loyihasi',
    appliedDate: '2026-03-22',
    status: 'reviewing',
    statusLabelUz: 'Ko‘rib chiqilmoqda',
    note: 'Arizangiz HR mutaxassisi tomonidan o‘rganilmoqda (taxminan 1 ish kuni).'
  },
  {
    id: 'app-3',
    jobId: 'job-3',
    jobTitle: 'Boshlang‘ich sinf yordamchi o‘qituvchisi',
    company: 'SmartKids Xususiy Maktabi',
    appliedDate: '2026-03-15',
    status: 'accepted',
    statusLabelUz: 'Ishga qabul qilindi',
    note: 'Hujjatlarni rasmiylashtirish uchun kadrlar bo‘limiga murojaat qiling.'
  }
];

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
    unreadCount: 1,
    isVerified: true,
    messages: [
      {
        id: 'm1',
        sender: 'other',
        senderName: 'Zulxumor Rahimova',
        text: 'Assalomu alaykum Dilnoza! HerPath orqali topshirgan arizangizni ko‘rib chiqdik.',
        time: '11:40'
      },
      {
        id: 'm2',
        sender: 'other',
        senderName: 'Zulxumor Rahimova',
        text: 'Rezyumeingiz bilan tanishdik, 28-martdagi suhbat vaqti sizga ma’qulmi?',
        time: '11:42',
        isDelivered: true
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
    id: 'notif-1',
    title: 'Suhbatga taklif etildingiz',
    body: 'Bright Academy kompaniyasi sizni "English Tutor" lavozimiga suhbatga taklif qildi.',
    category: 'application',
    time: '24 daqiqa oldin',
    isRead: false,
    actionTab: 'applications'
  },
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
    actionTab: 'safety'
  },
  {
    id: 'notif-4',
    title: 'Mos yangi ish o‘rni',
    body: 'SmartKids Xususiy Maktabi sizning dars jadvalingizga mos yangi vakansiya e’lon qildi.',
    category: 'job',
    time: 'Kecha',
    isRead: true,
    actionTab: 'jobs'
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
