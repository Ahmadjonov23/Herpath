import { JobSeekerProfile, EmployerProfile, UserRole } from '../types';

export interface RegisteredAccount {
  id: string;
  role: 'job_seeker' | 'employer';
  phone: string;
  password: string;
  name: string;
  profileData: JobSeekerProfile | EmployerProfile;
  permitFile?: {
    name: string;
    size: string;
    uploadDate: string;
    type?: string;
  };
  certificates?: {
    id: string;
    title: string;
    issuer: string;
    date: string;
    fileName?: string;
  }[];
  recommendations?: {
    id: string;
    recommenderName: string;
    organization: string;
    role: string;
    phone?: string;
    text?: string;
    fileName?: string;
  }[];
  registeredAt: string;
}

const STORAGE_KEY = 'herpath_registered_accounts_v1';

// Normalize phone number for consistent matching (removes spaces, brackets, hyphens)
export const normalizePhone = (phone: string): string => {
  return phone.replace(/[^0-9+]/g, '');
};

// Seed default initial accounts so tests & demo logins work instantly
const INITIAL_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'acc-textile-factory-1',
    role: 'employer',
    phone: '+998 73 542 12 34',
    password: 'textile123',
    name: 'Kokand Textile Fabrikasi MCHJ',
    permitFile: {
      name: 'davlat_ruxsatnomasi_kokand_textile_2026.pdf',
      size: '2.4 MB',
      uploadDate: '2026-yil 12-fevral',
      type: 'application/pdf'
    },
    profileData: {
      companyName: 'Kokand Textile Fabrikasi MCHJ',
      inn: '305 482 910',
      legalType: 'MCHJ (To‘qimachilik qo‘shma korxonasi)',
      category: 'To‘qimachilik va Tikuvchilik (Textile Fabrikasi)',
      address: 'Qo‘qon shahri, Yangi Chorsu ko‘chasi 18-uy (Sanoat hududi)',
      landmark: 'Qo‘qon Erkin Iqtisodiy Zonasi, 2-sanoat zonasi',
      contactPerson: 'Nargiza Yo‘ldosheva',
      contactRole: 'Kadrlar bo‘limi boshlig‘i va HR direktori',
      phone: '+998 73 542 12 34',
      email: 'hr@kokandtextile.uz',
      website: 'https://kokandtextile.uz',
      employeeCount: '450+ nafar (88% xotin-qizlar)',
      description: 'Qo‘qon shahrining yetakchi to‘qimachilik va tayyor kiyim-kechak fabrikasi. Talaba qizlar va yosh mutaxassislar uchun qulay darsdan keyingi smenalar, bepul xizmat avtobusi, issiq ovqat va to‘liq xavfsizlik ta’minlanadi.',
      eveningTransportSupported: true,
      cctvEquipped: true,
      formalContractGuaranteed: true,
      femaleStaffRatio: '88%',
      verifiedSince: '2026-yil',
      isVerified: true,
      permitFile: {
        name: 'davlat_ruxsatnomasi_kokand_textile_2026.pdf',
        size: '2.4 MB',
        uploadDate: '2026-yil 12-fevral'
      }
    },
    registeredAt: '2026-01-10'
  },
  {
    id: 'acc-seeker-dilnoza-1',
    role: 'job_seeker',
    phone: '+998 90 123 45 67',
    password: 'pass123',
    name: 'Dilnoza Karimova',
    certificates: [
      {
        id: 'cert-1',
        title: 'Tikuvchilik-modellash va trikotaj mahsulotlari texnologi',
        issuer: 'Qo‘qon Hunarmandchilik va Kasbiy Ta’lim Markazi',
        date: '2025-yil',
        fileName: 'tikuvchilik_mutaxassislik_sertifikati.pdf'
      },
      {
        id: 'cert-2',
        title: 'Ingliz tili IELTS 7.0 Xalqaro sertifikati',
        issuer: 'British Council Uzbekistan',
        date: '2025-yil',
        fileName: 'ielts_certificate_dilnoza.pdf'
      }
    ],
    recommendations: [
      {
        id: 'rec-1',
        recommenderName: 'Prof. Xursheda Rahimova',
        organization: 'Kokand University',
        role: 'Fakultet dekani o‘rinbosari',
        phone: '+998 91 234 56 78',
        text: 'Dilnoza Karimova intiluvchan, darslarda namunali va o‘z mutaxassisligini chuqur o‘rganayotgan iqtidorli talaba. Jamoada halol va mas’uliyatli faoliyat yuritishiga to‘liq kafolat beraman.',
        fileName: 'dekanat_tavsiyanomasi.pdf'
      }
    ],
    profileData: {
      fullName: 'Dilnoza Karimova',
      phone: '+998 90 123 45 67',
      email: 'dilnoza.karimova@edu.uz',
      birthDate: '2004-05-14',
      gender: 'Ayol',
      university: 'Kokand University',
      faculty: 'Dizayn, to‘qimachilik va amaliy san’at',
      courseYear: '3-kurs talabasi',
      studyType: 'Kunduzgi',
      district: 'Qo‘qon shahri, Shoxruxobod mavzesi',
      desiredPosition: 'Tekstil konstruktori / Tikuvchilik ustasi yordamchisi',
      expectedSalary: '3 500 000 – 5 000 000 so‘m',
      preferredHours: 'Part-time (14:30 dan so‘ng)',
      freeHours: '14:30 – 19:00 (Dushanba-Juma)',
      languages: ['O‘zbek tili (Ona tili)', 'Rus tili (Erkin)', 'Ingliz tili (IELTS 7.0)'],
      skills: ['Tikuv mashinalari bilan ishlash', 'Lekalo va bichish', 'Kompyuter savodxonligi', 'Figma', 'Jamoada ishlash'],
      interests: ['To‘qimachilik sanoati', 'Kiyim dizayni', 'Xorijiy tillar'],
      experience: '1 yillik tikuvchilik va modellashtirish amaliyoti',
      bio: 'Kokand University talabasiman. Tikuvchilik va kiyim-kechak ishlab chiqarish sohasida bilim va amaliy ko‘nikmaga egaman. Darsdan so‘ng xavfsiz fabrikada ishlashni maqsad qilganman.',
      safetyPreferences: {
        cctvRequired: true,
        transportRequired: true,
        femaleStaffOnly: false
      },
      certificates: [
        {
          id: 'cert-1',
          title: 'Tikuvchilik-modellash va trikotaj mahsulotlari texnologi',
          issuer: 'Qo‘qon Hunarmandchilik va Kasbiy Ta’lim Markazi',
          date: '2025-yil',
          fileName: 'tikuvchilik_mutaxassislik_sertifikati.pdf'
        },
        {
          id: 'cert-2',
          title: 'Ingliz tili IELTS 7.0 Xalqaro sertifikati',
          issuer: 'British Council Uzbekistan',
          date: '2025-yil',
          fileName: 'ielts_certificate_dilnoza.pdf'
        }
      ],
      recommendations: [
        {
          id: 'rec-1',
          recommenderName: 'Prof. Xursheda Rahimova',
          organization: 'Kokand University',
          role: 'Fakultet dekani o‘rinbosari',
          phone: '+998 91 234 56 78',
          text: 'Dilnoza Karimova intiluvchan, darslarda namunali va o‘z mutaxassisligini chuqur o‘rganayotgan iqtidorli talaba. Jamoada halol va mas’uliyatli faoliyat yuritishiga to‘liq kafolat beraman.',
          fileName: 'dekanat_tavsiyanomasi.pdf'
        }
      ]
    },
    registeredAt: '2026-02-01'
  }
];

export const getRegisteredAccounts = (): RegisteredAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ACCOUNTS));
      return INITIAL_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ACCOUNTS));
      return INITIAL_ACCOUNTS;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to read registered accounts from localStorage', err);
    return INITIAL_ACCOUNTS;
  }
};

export const saveRegisteredAccount = (account: RegisteredAccount): void => {
  try {
    const accounts = getRegisteredAccounts();
    const normalizedNewPhone = normalizePhone(account.phone);
    // Replace if phone & role already exists, or append
    const filtered = accounts.filter(
      (a) => !(normalizePhone(a.phone) === normalizedNewPhone && a.role === account.role)
    );
    const updated = [account, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save registered account to localStorage', err);
  }
};

export const authenticateUser = (
  phone: string,
  password: string,
  role?: 'job_seeker' | 'employer'
): { success: boolean; account?: RegisteredAccount; error?: string } => {
  const accounts = getRegisteredAccounts();
  const normalizedInputPhone = normalizePhone(phone);
  const cleanPass = password.trim();

  // Find matching account
  const matching = accounts.find((acc) => {
    const normAccPhone = normalizePhone(acc.phone);
    const phoneMatch =
      normAccPhone === normalizedInputPhone ||
      normAccPhone.endsWith(normalizedInputPhone.slice(-9)) ||
      normalizedInputPhone.endsWith(normAccPhone.slice(-9));

    const roleMatch = role ? acc.role === role : true;
    return phoneMatch && roleMatch;
  });

  if (!matching) {
    return {
      success: false,
      error: 'Ushbu telefon raqami bilan ro‘yxatdan o‘tgan profil topilmadi. Iltimos, raqamni tekshiring yoki ro‘yxatdan o‘ting.'
    };
  }

  // Password comparison (also supports initial demo shortcuts)
  const isDemoPass =
    (matching.role === 'employer' && (cleanPass === 'companypass123' || cleanPass === 'textile123')) ||
    (matching.role === 'job_seeker' && (cleanPass === 'password123' || cleanPass === 'pass123'));

  if (matching.password === cleanPass || isDemoPass) {
    return {
      success: true,
      account: matching
    };
  }

  return {
    success: false,
    error: 'Maxfiy parol noto‘g‘ri kiritildi. Iltimos, qayta urinib ko‘ring.'
  };
};
