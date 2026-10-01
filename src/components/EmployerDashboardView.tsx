import React, { useState } from 'react';
import { Job, EmployerProfile } from '../types';
import {
  Building2, Users, Plus, CheckCircle2,
  Calendar, MessageSquare, ShieldCheck, ArrowRight, X, Clock, MapPin, Briefcase,
  Phone, Mail, Globe, FileText, Check, Edit3, Save, Shield,
  Award, Paperclip, GraduationCap, Sparkles, Search, Filter, Printer
} from 'lucide-react';

interface EmployerDashboardViewProps {
  onOpenChat: (candidateName: string) => void;
  onCreateJob?: (job: Job) => void;
  activeJobsCount?: number;
  employerProfile?: EmployerProfile;
  onUpdateEmployerProfile?: (updated: EmployerProfile) => void;
}

export const EmployerDashboardView: React.FC<EmployerDashboardViewProps> = ({
  onOpenChat,
  onCreateJob,
  activeJobsCount = 0,
  employerProfile,
  onUpdateEmployerProfile
}) => {
  const [activeTab, setActiveTab] = useState<'applied' | 'matching' | 'profile' | 'jobs'>('applied');
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedResumeCandidate, setSelectedResumeCandidate] = useState<any | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filters for Applied candidates
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'interview' | 'reviewing' | 'accepted' | 'rejected'>('all');

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Employer Profile Data
  const [profile, setProfile] = useState<EmployerProfile>({
    companyName: employerProfile?.companyName || 'Kokand Textile Fabrikasi MCHJ',
    inn: employerProfile?.inn || '305 482 910',
    legalType: employerProfile?.legalType || 'MCHJ (To‘qimachilik korxonasi)',
    category: employerProfile?.category || 'To‘qimachilik va Tikuvchilik (Textile Fabrikasi)',
    address: employerProfile?.address || 'Qo‘qon shahri, Yangi Chorsu ko‘chasi 18-uy (Sanoat hududi)',
    landmark: employerProfile?.landmark || 'Qo‘qon Erkin Iqtisodiy Zonasi, 2-sanoat zonasi',
    contactPerson: employerProfile?.contactPerson || 'Nargiza Yo‘ldosheva',
    contactRole: employerProfile?.contactRole || 'Kadrlar bo‘limi boshlig‘i va HR direktori',
    phone: employerProfile?.phone || '+998 73 542 12 34',
    email: employerProfile?.email || 'hr@kokandtextile.uz',
    website: employerProfile?.website || 'https://kokandtextile.uz',
    employeeCount: employerProfile?.employeeCount || '450+ nafar (88% xotin-qizlar)',
    description: employerProfile?.description || 'Qo‘qon shahrining yetakchi to‘qimachilik va tayyor kiyim-kechak fabrikasi. Talaba qizlar va yosh mutaxassislar uchun qulay darsdan keyingi smenalar, bepul xizmat avtobusi, issiq ovqat va to‘liq videokuzatuv tizimi yaratilgan.',
    eveningTransportSupported: employerProfile?.eveningTransportSupported ?? true,
    cctvEquipped: employerProfile?.cctvEquipped ?? true,
    formalContractGuaranteed: employerProfile?.formalContractGuaranteed ?? true,
    femaleStaffRatio: employerProfile?.femaleStaffRatio || '88%',
    verifiedSince: employerProfile?.verifiedSince || '2026-yil',
    isVerified: employerProfile?.isVerified ?? true
  });

  const [editProfileForm, setEditProfileForm] = useState({ ...profile });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editProfileForm);
    if (onUpdateEmployerProfile) {
      onUpdateEmployerProfile(editProfileForm);
    }
    setIsEditingProfile(false);
    showNotice("Tashkilot rekvizitlari muvaffaqiyatli saqlandi!");
  };

  // 1. ARIZA TOPSHIRGAN ISHCHILAR (APPLIED WORKERS)
  const [appliedCandidates, setAppliedCandidates] = useState<any[]>([
    {
      id: 'app-c-1',
      name: 'Dilnoza Karimova',
      university: 'Kokand University',
      faculty: 'Dizayn va to‘qimachilik texnologiyalari',
      courseYear: '3-kurs talabasi',
      studyType: 'Kunduzgi',
      phone: '+998 90 123 45 67',
      email: 'dilnoza.karimova@edu.uz',
      district: 'Qo‘qon shahri, Shoxruxobod mavzesi',
      birthDate: '2004-yil 15-may',
      appliedFor: 'Tekstil konstruktori / Tikuvchilik amaliyoti',
      date: 'Bugun, 10:45',
      status: 'interview',
      statusText: 'Suhbat belgilandi',
      expectedSalary: '3 800 000 – 5 000 000 so‘m',
      preferredHours: 'Part-time (14:30 dan so‘ng)',
      freeHours: '14:30 – 19:00 (Dushanba-Juma)',
      preferredDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
      workingTimeOfDay: 'Tushdan so‘ng (Part-time / Darsdan keyin)',
      workingHoursStart: '14:30',
      workingHoursEnd: '19:00',
      experience: '1 yillik tikuvchilik va modellashtirish amaliyoti',
      bio: 'Kokand University talabasiman. Tikuv mashinalarida ishlash va lekalo chizish bo‘yicha amaliy tajribaga egaman. Darsdan so‘ng xavfsiz to‘qimachilik fabrikasida ishlashni xohlayman.',
      skills: ['Tikuv mashinalari (Juki, Jack)', 'Lekalo va bichish', 'Kompyuter savodxonligi', 'Figma', 'Jamoada ishlash'],
      languages: ['O‘zbek tili (Ona tili)', 'Rus tili (Erkin)', 'Ingliz tili (IELTS 7.0)'],
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
    {
      id: 'app-c-2',
      name: 'Nargiza Sobirova',
      university: 'Kokand University',
      faculty: 'Iqtisodiyot va sanoat boshqaruvi',
      courseYear: '2-kurs talabasi',
      studyType: 'Kunduzgi',
      phone: '+998 93 456 78 90',
      email: 'nargiza.sobirova@edu.uz',
      district: 'Qo‘qon shahri, Turkiston ko‘chasi',
      birthDate: '2005-yil 22-avgust',
      appliedFor: 'Sifat nazoratchisi (OTK yordamchisi)',
      date: 'Kecha, 16:20',
      status: 'reviewing',
      statusText: 'Ko‘rib chiqilmoqda',
      expectedSalary: '3 600 000 – 4 800 000 so‘m',
      preferredHours: 'Part-time (14:30 – 18:30)',
      freeHours: '14:30 – 19:30',
      experience: '6 oylik tovarshunoslik va sifat nazorati amaliyoti',
      bio: 'To‘qimachilik korxonalarida sifat nazorati va mahsulot standartlariga rioya etilishini ta’minlashda amaliy tajriba to‘plashni maqsad qilganman.',
      skills: ['Sifat nazorati (OTK standartlari)', 'Mahsulot qadoqlash', 'Excel va hisob-kitob', 'Diqqatlilik'],
      languages: ['O‘zbek tili (Ona tili)', 'Rus tili (B2)'],
      safetyPreferences: {
        cctvRequired: true,
        transportRequired: true,
        femaleStaffOnly: false
      },
      certificates: [
        {
          id: 'cert-ns-1',
          title: 'Sanoat korxonalarida sifat menejmenti va nazorat (ISO 9001)',
          issuer: 'Farg‘ona Standartlashtirish va Sertifikatlashtirish Markazi',
          date: '2025-yil',
          fileName: 'iso_sifat_sertifikat.pdf'
        }
      ],
      recommendations: [
        {
          id: 'rec-ns-1',
          recommenderName: 'Dotsent Alisher Qosimov',
          organization: 'Kokand University',
          role: 'Kafedra mudiri',
          phone: '+998 90 321 00 11',
          text: 'Nargiza hisob-kitob va hujjatlar bilan ishlashda nihoyatda sinchkov, halol va tartibli talabadir.'
        }
      ]
    },
    {
      id: 'app-c-3',
      name: 'Mahliyo Ergasheva',
      university: 'Qo‘qon Davlat Pedagogika Instituti',
      faculty: 'Texnologik ta’lim va amaliy san’at',
      courseYear: '4-kurs talabasi',
      studyType: 'Kunduzgi',
      phone: '+998 94 567 12 34',
      email: 'mahliyo.ergasheva@gmail.com',
      district: 'Qo‘qon shahri, Navoiy mavzesi',
      birthDate: '2003-yil 11-noyabr',
      appliedFor: 'Tayyor mahsulotlar qadoqlovchisi va saralovchisi',
      date: '28-mart',
      status: 'accepted',
      statusText: 'Qabul qilindi',
      expectedSalary: '3 500 000 so‘m',
      preferredHours: 'Part-time (15:00 dan so‘ng)',
      freeHours: '15:00 – 19:00',
      experience: '1 yillik tikuvchilik sexida saralovchi',
      bio: 'Mehnatsevar, jamoa bilan tez til topishaman. Smena jadvaliga va xavfsizlik qoidalariga qat’iy amal qilaman.',
      skills: ['Trikotaj saralash', 'Qadoqlash', 'Tezkorlik', 'Xushmuomalalik'],
      languages: ['O‘zbek tili (Ona tili)'],
      safetyPreferences: {
        cctvRequired: true,
        transportRequired: true,
        femaleStaffOnly: false
      },
      certificates: [
        {
          id: 'cert-me-1',
          title: 'Tikuvchilik ustasi yordamchisi guvohnomasi',
          issuer: 'Qo‘qon Hunarmandlar uyushmasi',
          date: '2024-yil',
          fileName: 'hunarmand_guvohnoma.pdf'
        }
      ],
      recommendations: [
        {
          id: 'rec-me-1',
          recommenderName: 'Dildora Rahimova',
          organization: 'Ipak Yo‘li Trikotaj XK',
          role: 'Sex boshlig‘i',
          phone: '+998 91 111 22 33',
          text: 'Mahliyo bizning korxonada amaliyot o‘tagan, ish unumdorligi yuqori va intizomli xodim.'
        }
      ]
    },
    {
      id: 'app-c-4',
      name: 'Nozima Qodirova',
      university: 'Qo‘qon Kasb-hunar Kolleji',
      faculty: 'Keng assortimentdagi kiyimlar tikuvchisi',
      courseYear: 'Bitiruvchi kurs',
      studyType: 'Kunduzgi',
      phone: '+998 97 888 44 22',
      email: 'nozima.qodirova@mail.uz',
      district: 'Qo‘qon shahri, Istiqlol ko‘chasi',
      birthDate: '2005-yil 3-aprel',
      appliedFor: 'Trikotaj mahsulotlari tikuvchisi (Smenali)',
      date: '29-mart',
      status: 'reviewing',
      statusText: 'Ko‘rib chiqilmoqda',
      expectedSalary: '4 000 000 – 5 500 000 so‘m',
      preferredHours: '14:00 – 18:30',
      freeHours: '14:00 – 19:00',
      experience: '2 yillik tikuvchilik amaliyoti',
      bio: 'Zamonaviy 4-ipli va 5-ipli overlok, to‘g‘ri chok tikuv mashinalarida erkin ishlay olaman.',
      skills: ['Overlok', 'Raspashivalka', 'Andaza asosida bichish', 'Tikuv tezligi yuqori'],
      languages: ['O‘zbek tili (Ona tili)', 'Rus tili'],
      safetyPreferences: {
        cctvRequired: true,
        transportRequired: true,
        femaleStaffOnly: false
      },
      certificates: [
        {
          id: 'cert-nq-1',
          title: '5-toifali professional tikuvchi diplomi',
          issuer: 'Qo‘qon Yengil Sanoat Kasb-hunar Ta’lim Markazi',
          date: '2025-yil',
          fileName: 'diplom_nozima_tikuvchi.pdf'
        }
      ],
      recommendations: [
        {
          id: 'rec-nq-1',
          recommenderName: 'Mavluda Karimova',
          organization: 'Ustoz-shogird markazi',
          role: 'Bosh usta',
          phone: '+998 90 777 66 55',
          text: 'Nozima tikuvchilik sirlarini mukammal egallagan, har qanday murakkab choklarni sifatli bajara oladi.'
        }
      ]
    }
  ]);

  // 2. YO‘NALISHGA MOS ISH IZLOVCHILAR (MATCHING JOB SEEKERS)
  const [matchingJobSeekers, setMatchingJobSeekers] = useState<any[]>([
    {
      id: 'match-1',
      name: 'Ziyoda To‘rayeva',
      university: 'Kokand University',
      faculty: 'Dizayn va amaliy san’at',
      courseYear: '3-kurs talabasi',
      studyType: 'Kunduzgi',
      phone: '+998 91 345 67 89',
      email: 'ziyoda.torayeva@edu.uz',
      district: 'Qo‘qon shahri, Turkiston ko‘chasi (Fabrikaga yaqin)',
      birthDate: '2004-yil 8-fevral',
      appliedFor: 'Kiyim dizayneri va bichuvchi-konstruktor',
      date: 'Faol qidiruvda',
      status: 'reviewing',
      statusText: 'Mos nomzod',
      matchScore: '98% moslik',
      matchReason: 'Tikuvchilik fabrikasi profiliga to‘liq mos mutaxassislik va rasmiy sertifikatlar',
      expectedSalary: '4 500 000 – 6 000 000 so‘m',
      preferredHours: 'Part-time (14:30 dan so‘ng)',
      freeHours: '14:30 – 19:30',
      experience: '1.5 yillik andaza va kiyim dizayni amaliyoti',
      bio: 'Zamonaviy kiyim modellarini yaratish, andazalar tayyorlash va kiyim texnologiyasi bo‘yicha darsdan keyin fabrikada ishlashga tayyorman.',
      skills: ['Clo3D / Marvelous Designer', 'Lekalo chizish', 'Trikotaj kiyim dizayni', 'Matoni tejamkor bichish'],
      languages: ['O‘zbek tili (Ona tili)', 'Rus tili', 'Ingliz tili (B2)'],
      safetyPreferences: {
        cctvRequired: true,
        transportRequired: true,
        femaleStaffOnly: false
      },
      certificates: [
        {
          id: 'cert-zt-1',
          title: 'Kompyuterlashtirilgan kiyim dizayni va modellashtirish sertifikati',
          issuer: 'Toshkent To‘qimachilik va Yengil Sanoat Instituti O‘quv Markazi',
          date: '2025-yil',
          fileName: 'dizayn_sertifikat_ziyoda.pdf'
        }
      ],
      recommendations: [
        {
          id: 'rec-zt-1',
          recommenderName: 'Dizayner Feruza Umarova',
          organization: 'Kokand Fashion Hub',
          role: 'Yetakchi modeler-konstruktor',
          phone: '+998 93 222 33 44',
          text: 'Ziyoda g‘oyat iqtidorli, zamonaviy tendensiyalarni tez ilg‘aydigan va mas’uliyatli mutaxassis.'
        }
      ]
    },
    {
      id: 'match-2',
      name: 'Nilufar Mirzayeva',
      university: 'Qo‘qon Davlat Pedagogika Instituti',
      faculty: 'Kimyo va materialshunoslik yo‘nalishi',
      courseYear: '3-kurs talabasi',
      studyType: 'Kunduzgi',
      phone: '+998 90 999 12 34',
      email: 'nilufar.mirzayeva@gmail.com',
      district: 'Qo‘qon shahri, Istiqlol mavzesi',
      birthDate: '2004-yil 19-noyabr',
      appliedFor: 'Tekstil laboratoriyasi tahlilchisi / Sifat nazorati',
      date: 'Faol qidiruvda',
      status: 'reviewing',
      statusText: 'Mos nomzod',
      matchScore: '94% moslik',
      matchReason: 'To‘qimachilik matolari zichligi va bo‘yoq chidamliligi laboratoriya tahlili',
      expectedSalary: '3 800 000 – 5 200 000 so‘m',
      preferredHours: '15:00 – 19:00',
      freeHours: '15:00 – 19:00',
      experience: '1 yillik laboratoriya tahlillari amaliyoti',
      bio: 'Matolar va iplarning laboratoriya sinovlari, tola tarkibini aniqlash va sifat standartlariga muvofiqligini tekshirishga qiziqaman.',
      skills: ['Mato sifat tahlili', 'Laboratoriya uskunalari', 'Standartlashtirish', 'Kimyoviy testlar'],
      languages: ['O‘zbek tili (Ona tili)', 'Rus tili'],
      safetyPreferences: {
        cctvRequired: true,
        transportRequired: true,
        femaleStaffOnly: false
      },
      certificates: [
        {
          id: 'cert-nm-1',
          title: 'Laboratoriya sinovlari va sifat sertifikatlashtirish kursi',
          issuer: 'O‘zstandart agentligi Qo‘qon filiali',
          date: '2025-yil',
          fileName: 'laboratoriya_tahlil_sertifikat.pdf'
        }
      ],
      recommendations: [
        {
          id: 'rec-nm-1',
          recommenderName: 'Dotsent Gulchehra Mahmudova',
          organization: 'Qo‘qon DPI',
          role: 'Kafedra dotsenti',
          phone: '+998 91 888 77 66',
          text: 'Nilufar laboratoriya ishlarida nihoyatda mas’uliyatli va sinchkov, korxona uchun juda qadrli kadr bo‘la oladi.'
        }
      ]
    },
    {
      id: 'match-3',
      name: 'Shahodat Usmonova',
      university: 'Kokand University',
      faculty: 'Iqtisodiyot va moliya',
      courseYear: '4-kurs talabasi',
      studyType: 'Kunduzgi',
      phone: '+998 93 111 55 77',
      email: 'shahodat.usmonova@edu.uz',
      district: 'Qo‘qon shahri, Yangi Chorsu ko‘chasi (Fabrika yaqinida)',
      birthDate: '2003-yil 30-dekabr',
      appliedFor: 'To‘qimachilik ombor hisobchisi / 1C operatori',
      date: 'Faol qidiruvda',
      status: 'reviewing',
      statusText: 'Mos nomzod',
      matchScore: '92% moslik',
      matchReason: 'Fabrika yaqinida istiqomat qiladi, 1C va xomashyo hisobi bo‘yicha mutaxassis',
      expectedSalary: '4 000 000 – 5 500 000 so‘m',
      preferredHours: 'Part-time (14:30 – 18:30)',
      freeHours: '14:30 – 19:00',
      experience: '1 yillik korxona ombor hisobi amaliyoti',
      bio: 'Tayyor trikotaj mahsulotlari kirim-chiqim hisobi, ombor qoldiqlari va hisob-fakturalarni 1C dasturida yuritish bo‘yicha bilim va amaliyotga egaman.',
      skills: ['1C: Buxgalteriya 8.3', 'Ombor hisobi', 'MS Excel (VLOOKUP, Pivot)', 'Audit'],
      languages: ['O‘zbek tili (Ona tili)', 'Rus tili (Erkin)'],
      safetyPreferences: {
        cctvRequired: true,
        transportRequired: true,
        femaleStaffOnly: false
      },
      certificates: [
        {
          id: 'cert-su-1',
          title: '1C Korxona va ishlab chiqarish hisobi professional sertifikati',
          issuer: 'Professional Buxgalterlar Akademiyasi',
          date: '2025-yil',
          fileName: '1c_sertifikat_shahodat.pdf'
        }
      ],
      recommendations: [
        {
          id: 'rec-su-1',
          recommenderName: 'Prof. Olimjon Boboyev',
          organization: 'Kokand University',
          role: 'Moliya fakulteti dekani',
          phone: '+998 90 555 44 33',
          text: 'Shahodat o‘z yo‘nalishi bo‘yicha yetakchi talabalardan, hisob-kitoblarda xatolikka yo‘l qo‘ymaydi.'
        }
      ]
    },
    {
      id: 'match-4',
      name: 'Gulhayo Rahimova',
      university: 'Qo‘qon IT va Dizayn Texnikumi',
      faculty: 'Grafika va to‘qimachilik printlari',
      courseYear: '2-kurs talabasi',
      studyType: 'Kunduzgi',
      phone: '+998 99 444 33 22',
      email: 'gulhayo.design@gmail.com',
      district: 'Qo‘qon shahri, Charxiy ko‘chasi',
      birthDate: '2005-yil 14-iyun',
      appliedFor: 'Trikotaj grafik dizayneri / Print andazalari yaratuvchisi',
      date: 'Faol qidiruvda',
      status: 'reviewing',
      statusText: 'Mos nomzod',
      matchScore: '90% moslik',
      matchReason: 'Kiyim-kechak printlari, kashta va bosma naqshlar tayyorlash mutaxassisi',
      expectedSalary: '3 800 000 – 5 000 000 so‘m',
      preferredHours: 'Part-time yoki moslashuvchan',
      freeHours: '15:00 – 19:30',
      experience: '1 yillik grafik dizayn amaliyoti',
      bio: 'Kiyimlar uchun zamonaviy printlar, kashtachilik vektor chizmalari va trikotaj matolariga naqshlar tayyorlash bo‘yicha ish qidiryapman.',
      skills: ['Adobe Illustrator', 'Photoshop', 'Kashta dasturi (Wilcom)', 'Tekstil print'],
      languages: ['O‘zbek tili (Ona tili)', 'Ingliz tili (B1)'],
      safetyPreferences: {
        cctvRequired: true,
        transportRequired: true,
        femaleStaffOnly: false
      },
      certificates: [
        {
          id: 'cert-gr-1',
          title: 'Tekstil va kiyim grafik dizayni xalqaro sertifikati',
          issuer: 'IT Park Farg‘ona filiali',
          date: '2025-yil',
          fileName: 'tekstil_grafika_sertifikat.pdf'
        }
      ],
      recommendations: [
        {
          id: 'rec-gr-1',
          recommenderName: 'Dizayn mentori Akmal Qodirov',
          organization: 'Digital Art Studio',
          role: 'Art direktor',
          phone: '+998 90 222 11 00',
          text: 'Gulhayo nozik didli va zamonaviy talablarga mos dizayn yaratuvchi juda iqtidorli mutaxassis.'
        }
      ]
    }
  ]);

  // Update candidate status handler
  const handleUpdateCandidateStatus = (candidateId: string, newStatus: 'interview' | 'accepted' | 'rejected') => {
    const statusMap: Record<string, string> = {
      interview: 'Suhbat belgilandi',
      accepted: 'Qabul qilindi',
      rejected: 'Rad etildi'
    };

    setAppliedCandidates(prev =>
      prev.map(c => (c.id === candidateId ? { ...c, status: newStatus, statusText: statusMap[newStatus] } : c))
    );

    if (selectedResumeCandidate && selectedResumeCandidate.id === candidateId) {
      setSelectedResumeCandidate((prev: any) => ({
        ...prev,
        status: newStatus,
        statusText: statusMap[newStatus]
      }));
    }

    showNotice(`Nomzod holati "${statusMap[newStatus]}" ga muvaffaqiyatli o‘zgartirildi!`);
  };

  // Invite matching candidate to interview
  const handleInviteMatchingCandidate = (cand: any) => {
    const exists = appliedCandidates.some(c => c.name === cand.name);
    if (!exists) {
      const newApp = {
        ...cand,
        id: `app-from-match-${Date.now()}`,
        date: 'Bugun (Siz taklif qildingiz)',
        status: 'interview',
        statusText: 'Suhbat belgilandi'
      };
      setAppliedCandidates([newApp, ...appliedCandidates]);
    }
    showNotice(`"${cand.name}" ga suhbatga taklifnoma yuborildi!`);
  };

  // Filtered Applied Candidates
  const filteredAppliedCandidates = appliedCandidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.appliedFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const [newJob, setNewJob] = useState({
    title: '',
    category: profile.category,
    workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'] as string[],
    workingTimeOfDay: 'Tushdan so‘ng (Part-time / 14:00 dan so‘ng)',
    workingHoursStart: '14:30',
    workingHoursEnd: '18:30',
    schedule: 'Dushanba – Juma (14:30 – 18:30, Part-time)',
    salaryMin: '3 600 000',
    salaryMax: '5 000 000',
    location: profile.address,
    eveningTransport: profile.eveningTransportSupported
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCreateJob && newJob.title.trim()) {
      const daysSummary = newJob.workingDays.length === 7
        ? 'Har kuni'
        : newJob.workingDays.length === 5 && newJob.workingDays.includes('Dushanba') && newJob.workingDays.includes('Juma') && !newJob.workingDays.includes('Shanba')
        ? 'Dushanba – Juma'
        : newJob.workingDays.length === 6 && !newJob.workingDays.includes('Yakshanba')
        ? 'Dushanba – Shanba'
        : newJob.workingDays.join(', ');

      const formattedSchedule = `${daysSummary} (${newJob.workingHoursStart} – ${newJob.workingHoursEnd}, ${newJob.workingTimeOfDay})`;

      const created: Job = {
        id: `job-${Date.now()}`,
        title: newJob.title,
        company: profile.companyName,
        companyLogoText: profile.companyName.split(' ').map(n => n[0]).join('').slice(0, 2) || 'KTF',
        companyCategory: newJob.category,
        salaryMin: parseInt(newJob.salaryMin.replace(/\D/g, '')) || 3600000,
        salaryMax: parseInt(newJob.salaryMax.replace(/\D/g, '')) || 5000000,
        salaryPeriod: 'oyiga',
        schedule: formattedSchedule,
        workingDays: newJob.workingDays,
        workingTimeOfDay: newJob.workingTimeOfDay,
        workingHoursStart: newJob.workingHoursStart,
        workingHoursEnd: newJob.workingHoursEnd,
        distanceKm: 0.8,
        location: newJob.location,
        district: 'Qo‘qon shahri',
        isVerified: true,
        verificationLevel: 'high',
        safetyRating: 5.0,
        reviewCount: 1,
        jobType: 'part-time',
        forStudents: true,
        noExperienceRequired: true,
        postedDate: 'Hozirgina',
        description: `${newJob.title} lavozimi uchun rasmiy xavfsizlik auditidan o‘tgan yangi ish o‘rni. Ish kunlari: ${daysSummary}, ish vaqti: ${newJob.workingHoursStart} – ${newJob.workingHoursEnd}.`,
        responsibilities: [
          'Dars jadvaliga muvofiq amaliyot va smenada faoliyat olib borish',
          'Brigadir va sifat nazoratchisi bilan doimiy hamkorlik'
        ],
        requirements: [
          'Oliy yoki o‘rta-maxsus ta’lim talabasi (1–4 kurs)',
          'Mas’uliyatli va intizomli bo‘lish'
        ],
        workConditions: [
          'Dars jadvaliga moslashtirilgan qulay grafik',
          'Bepul xizmat avtobusi va issiq ovqat',
          'Yorug‘, toza, zamonaviy konditsionerli sex'
        ],
        safetyNotes: [
          'Videokuzatuv kameralari bilan to‘liq nazorat qilinadi',
          'Rasmiy mehnat shartnomasi kafolatlanadi'
        ],
        employerInfo: {
          inn: profile.inn,
          verifiedSince: profile.verifiedSince,
          physicalAuditDate: '2026-yil',
          femaleStaffRatio: profile.femaleStaffRatio || '88%',
          eveningTransportSupported: newJob.eveningTransport,
          cctvEquipped: true,
          contactPerson: profile.contactPerson,
          phone: profile.phone
        },
        safetyScores: {
          workEnvironment: 5.0,
          scheduleIntegrity: 5.0,
          teamRespect: 5.0,
          locationConvenience: 5.0,
          eveningCommute: 5.0
        },
        reviews: []
      };
      onCreateJob(created);
    }
    setShowCreateJobModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Toast Alert Notice */}
      {actionNotice && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 p-3.5 px-4 rounded-xl bg-stone-900 text-white text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Top Header Card for Employer Organization */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-emerald-800 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
            {profile.companyName.split(' ').map(n => n[0]).join('').slice(0, 2) || 'KT'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                {profile.companyName}
              </h1>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Tekshirilgan tashkilot</span>
              </span>
              <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                Ish beruvchi tashkilot
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1 flex items-center gap-2 flex-wrap">
              <span>STIR (INN): <strong className="font-mono text-stone-800">{profile.inn}</strong></span>
              <span>·</span>
              <span>{profile.category}</span>
              <span>·</span>
              <span>{profile.address}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              setActiveTab('profile');
              setIsEditingProfile(true);
            }}
            className="h-9 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 text-xs font-semibold hover:bg-stone-100 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-stone-500" />
            <span>Rekvizitlarni tahrirlash</span>
          </button>

          <button
            onClick={() => setShowCreateJobModal(true)}
            className="h-9 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yangi e’lon berish</span>
          </button>
        </div>
      </div>

      {/* Main Employer Portal Navigation Tabs (Sahifalar) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-2 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
          <button
            onClick={() => setActiveTab('applied')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'applied'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Ariza topshirgan ishchilar</span>
            <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono ${
              activeTab === 'applied' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'
            }`}>
              {appliedCandidates.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('matching')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'matching'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Yo‘nalishga mos ish izlovchilar</span>
            <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono ${
              activeTab === 'matching' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {matchingJobSeekers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Tashkilot profili & Rekvizitlar</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'jobs'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Faol e’lonlar</span>
            <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono ${
              activeTab === 'jobs' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'
            }`}>
              {activeJobsCount}
            </span>
          </button>
        </div>
      </div>

      {/* 4 Core Summary Metric Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveTab('applied')}
          className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs hover:border-emerald-600 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[10.5px]">Kelib tushgan arizalar</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {appliedCandidates.length} ta
          </div>
          <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
            Tekshirish uchun tayyor
          </span>
        </div>

        <div
          onClick={() => setActiveTab('matching')}
          className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs hover:border-emerald-600 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[10.5px]">Yo‘nalishga mos nomzodlar</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {matchingJobSeekers.length} nafar
          </div>
          <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
            Sertifikatli talabalar
          </span>
        </div>

        <div
          onClick={() => {
            setActiveTab('applied');
            setStatusFilter('interview');
          }}
          className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs hover:border-emerald-600 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[10.5px]">Suhbat belgilangan</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {appliedCandidates.filter(c => c.status === 'interview').length} ta
          </div>
          <span className="text-[11px] text-blue-700 font-medium block mt-0.5">
            Kelishuv kutilmoqda
          </span>
        </div>

        <div
          onClick={() => setActiveTab('jobs')}
          className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs hover:border-emerald-600 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[10.5px]">Faol vakansiyalar</span>
            <Briefcase className="w-4 h-4 text-stone-500" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {activeJobsCount} ta
          </div>
          <span className="text-[11px] text-stone-600 font-medium block mt-0.5">
            Qo‘qon shahrida
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SAHIFA: ARIZA TOPSHIRGAN ISHCHILAR RO'YXATI                            */}
      {/* ========================================================================= */}
      {activeTab === 'applied' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4 animate-in fade-in">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-700" />
                <span>Ariza topshirgan ishchilar ro‘yxati</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Vakansiyalaringizga ariza yuborgan ishchilar va talabalar ro‘yxati. Har bir nomzodning to‘liq rezyumesini tekshiring.
              </p>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Barchasi ({appliedCandidates.length})
              </button>
              <button
                onClick={() => setStatusFilter('interview')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'interview'
                    ? 'bg-blue-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Suhbat ({appliedCandidates.filter(c => c.status === 'interview').length})
              </button>
              <button
                onClick={() => setStatusFilter('reviewing')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'reviewing'
                    ? 'bg-amber-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Ko‘rib chiqish ({appliedCandidates.filter(c => c.status === 'reviewing').length})
              </button>
              <button
                onClick={() => setStatusFilter('accepted')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'accepted'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Qabul qilingan ({appliedCandidates.filter(c => c.status === 'accepted').length})
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nomzod ismi, OTM yoki topshirgan lavozimi bo‘yicha qidiring..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
            />
          </div>

          {/* Applicants Table & List */}
          {filteredAppliedCandidates.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs">
              Ushbu filtr bo‘yicha ariza topshirgan nomzod topilmadi.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10.5px]">
                    <th className="pb-3 font-bold">Nomzod (Ishchi)</th>
                    <th className="pb-3 font-bold">Topshirgan vakansiyasi</th>
                    <th className="pb-3 font-bold">Ta’lim / OTM</th>
                    <th className="pb-3 font-bold">Sertifikat / Tavsiya</th>
                    <th className="pb-3 font-bold">Holat</th>
                    <th className="pb-3 font-bold text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredAppliedCandidates.map((cand) => (
                    <tr key={cand.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                            {cand.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-stone-900">{cand.name}</span>
                              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1 rounded border border-emerald-200">
                                HEMIS tasdiqlangan
                              </span>
                            </div>
                            <span className="text-[11px] text-stone-500 block">
                              {cand.phone} · {cand.district}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 pr-3">
                        <span className="font-semibold text-stone-800 block">{cand.appliedFor}</span>
                        <span className="text-[11px] text-stone-500 font-mono">{cand.date}</span>
                      </td>

                      <td className="py-3.5 pr-3 text-stone-700">
                        <span className="block font-medium">{cand.university}</span>
                        <span className="text-[11px] text-stone-500">{cand.faculty} ({cand.courseYear})</span>
                      </td>

                      <td className="py-3.5 pr-3">
                        <div className="flex flex-col gap-1">
                          {cand.certificates && cand.certificates.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              <Award className="w-3 h-3 text-emerald-700" />
                              <span>{cand.certificates.length} ta sertifikat</span>
                            </span>
                          )}
                          {cand.recommendations && cand.recommendations.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                              <GraduationCap className="w-3 h-3 text-blue-700" />
                              <span>Tavsiyanomasi bor</span>
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 pr-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                            cand.status === 'interview'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : cand.status === 'accepted'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : cand.status === 'rejected'
                              ? 'bg-stone-100 text-stone-600'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {cand.statusText}
                        </span>
                      </td>

                      <td className="py-3.5 text-right space-x-1.5 whitespace-nowrap">
                        {/* REZYUMENI TEKSHIRISH TUGMASI */}
                        <button
                          onClick={() => setSelectedResumeCandidate(cand)}
                          className="h-8.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                          title="Nomzod rezyumesini to‘liq tekshirish"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Rezyumeni tekshirish</span>
                        </button>

                        <button
                          onClick={() => onOpenChat(cand.name)}
                          className="h-8.5 px-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                          title="Chat orqali yozish"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-stone-600" />
                          <span>Suhbat</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SAHIFA: YO‘NALISHGA MOS ISH IZLOVCHILAR RO'YXATI                       */}
      {/* ========================================================================= */}
      {activeTab === 'matching' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4 animate-in fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <span>Yo‘nalishga mos ish izlovchilar ro‘yxati</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Tashkilotingiz yo‘nalishiga (To‘qimachilik, tikuvchilik, kiyim dizayni, sifat nazorati) to‘g‘ri keladigan Qo‘qon shahridagi talabalar va sertifikatli ish izlovchilar.
              </p>
            </div>

            <div className="text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              {matchingJobSeekers.length} nafar tavsiya etilgan nomzod
            </div>
          </div>

          {/* Cards Grid for Matching Job Seekers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchingJobSeekers.map((cand) => (
              <div
                key={cand.id}
                className="p-4.5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-emerald-600 hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                      {cand.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-stone-900 text-sm">{cand.name}</h4>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                          {cand.matchScore}
                        </span>
                      </div>
                      <span className="text-xs text-stone-600 block mt-0.5">
                        {cand.university} · {cand.courseYear}
                      </span>
                      <span className="text-xs font-semibold text-emerald-900 block mt-0.5">
                        Mutaxassislik: {cand.appliedFor}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-stone-700 italic">
                  "{cand.bio}"
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Kutilayotgan maosh:</span>
                    <strong className="text-stone-900 font-mono">{cand.expectedSalary}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Qulay ish vaqti:</span>
                    <strong className="text-stone-900">{cand.preferredHours}</strong>
                  </div>
                </div>

                {/* Certificates & Recommendations Chips */}
                <div className="flex items-center gap-2 flex-wrap">
                  {cand.certificates && cand.certificates.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-emerald-100/70 px-2 py-0.5 rounded-lg border border-emerald-200">
                      <Award className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{cand.certificates[0].title.slice(0, 32)}...</span>
                    </span>
                  )}
                  {cand.recommendations && cand.recommendations.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-900 bg-blue-100/70 px-2 py-0.5 rounded-lg border border-blue-200">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                      <span>Tavsiyanomasi bor</span>
                    </span>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-200 gap-2">
                  <button
                    onClick={() => setSelectedResumeCandidate(cand)}
                    className="px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Rezyumeni tekshirish</span>
                  </button>

                  <button
                    onClick={() => handleInviteMatchingCandidate(cand)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ishga taklif qilish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SAHIFA: TASHKILOT PROFILI & REKVIZITLAR                                */}
      {/* ========================================================================= */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-700" />
                <span>Ish beruvchi tashkilot rasmiy profili</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Tashkilotingiz rasmiy rekvizitlari, faoliyat manzili, xavfsizlik kafolatlari va mas’ul shaxs kontaktlari.
              </p>
            </div>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="h-8.5 px-3.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-stone-600" />
              <span>{isEditingProfile ? 'Yopish' : 'Rekvizitlarni tahrirlash'}</span>
            </button>
          </div>

          {/* Quick links to candidates from within the profile page */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-stone-900 text-xs block">
                Nomzodlar bilan ishlash
              </span>
              <p className="text-xs text-stone-600 mt-0.5">
                Fabrikangizga <strong>{appliedCandidates.length} ta</strong> ariza tushgan va <strong>{matchingJobSeekers.length} nafar</strong> yo‘nalishingizga mos talaba mavjud.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('applied')}
                className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 cursor-pointer shadow-2xs"
              >
                Arizalarni ko‘rish
              </button>
              <button
                onClick={() => setActiveTab('matching')}
                className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 cursor-pointer shadow-2xs"
              >
                Mos nomzodlar
              </button>
            </div>
          </div>

          {/* Editing Form */}
          {isEditingProfile && (
            <form onSubmit={handleSaveProfile} className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-4 text-xs">
              <h3 className="font-bold text-stone-900 text-sm pb-2 border-b border-stone-200">
                Tashkilot rekvizitlarini yangilash
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Tashkilot nomi *</label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.companyName}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, companyName: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">STIR (INN) *</label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.inn}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, inn: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 bg-white font-mono text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Faoliyat sohasi</label>
                  <input
                    type="text"
                    value={editProfileForm.category}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, category: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 bg-white text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Jismoniy ish joyi manzili</label>
                  <input
                    type="text"
                    value={editProfileForm.address}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, address: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mo‘ljal</label>
                  <input
                    type="text"
                    value={editProfileForm.landmark || ''}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, landmark: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 bg-white text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mas’ul shaxs (HR)</label>
                  <input
                    type="text"
                    value={editProfileForm.contactPerson}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, contactPerson: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Telefon raqam</label>
                  <input
                    type="text"
                    value={editProfileForm.phone}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, phone: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editProfileForm.email}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, email: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 bg-white text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Fabrika / Tashkilot haqida ma’lumot</label>
                <textarea
                  rows={2}
                  value={editProfileForm.description || ''}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-stone-300 bg-white text-stone-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Saqlash</span>
                </button>
              </div>
            </form>
          )}

          {/* Profile Overview Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2.5">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Yuridik va rasmiy ma’lumotlar</span>
              </h3>
              <div className="space-y-1.5 text-stone-700">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Tashkilot nomi:</span>
                  <strong className="text-stone-900">{profile.companyName}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">STIR (INN):</span>
                  <strong className="font-mono text-stone-900">{profile.inn}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Yuridik shakli:</span>
                  <span className="text-stone-800 font-medium">{profile.legalType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Faoliyat sohasi:</span>
                  <span className="text-stone-800 font-medium">{profile.category}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Xodimlar soni:</span>
                  <span className="text-stone-800 font-medium">{profile.employeeCount}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2.5">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Aloqa va Mas’ul kadrlar</span>
              </h3>
              <div className="space-y-1.5 text-stone-700">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Mas’ul shaxs (HR):</span>
                  <strong className="text-stone-900">{profile.contactPerson}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Lavozimi:</span>
                  <span className="text-stone-800">{profile.contactRole}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Telefon:</span>
                  <strong className="font-mono text-stone-900">{profile.phone}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Email:</span>
                  <span className="text-stone-800">{profile.email}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Veb-sayt:</span>
                  <span className="text-emerald-700 font-semibold">{profile.website}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Guarantees & Work Environment */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
            <h3 className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Xavfsizlik va mehnat kafolatlari (Tekshirilgan)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-emerald-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Videokuzatuv kameralari</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-emerald-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bepul xizmat avtobusi</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-emerald-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Rasmiy mehnat shartnomasi</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-emerald-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ayollar ulushi: <strong>{profile.femaleStaffRatio}</strong></span>
              </div>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed pt-1">
              {profile.description}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SAHIFA: FAOL VAKANSIYALAR                                              */}
      {/* ========================================================================= */}
      {activeTab === 'jobs' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-700" />
                <span>Faol e’lonlar va vakansiyalar</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Tashkilotingiz tomonidan joylashtirilgan ochiq ish o‘rinlari.
              </p>
            </div>

            <button
              onClick={() => setShowCreateJobModal(true)}
              className="h-8.5 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yangi e’lon berish</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-stone-900 text-sm block">
                  To‘qimachilik sifat nazoratchisi (OTK yordamchisi / Part-time)
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  14:30 – 18:30 (Part-time) · 3 600 000 – 5 000 000 so‘m · Qo‘qon sanoat hududi
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  {appliedCandidates.length} ta ariza tushgan
                </span>
                <button
                  onClick={() => setActiveTab('applied')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer"
                >
                  Arizalarni ko‘rish
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-stone-900 text-sm block">
                  Tekstil konstruktori va tikuvchilik amaliyotchisi
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  14:30 – 19:00 · 3 800 000 – 5 000 000 so‘m · Xizmat avtobusi mavjud
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  Faol holatda
                </span>
                <button
                  onClick={() => setActiveTab('matching')}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-bold cursor-pointer"
                >
                  Mos nomzodlar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* RESUME REVIEW MODAL / INSPECTION VIEW (REZYUMENI TEKSHIRISH OYNASI)       */}
      {/* ========================================================================= */}
      {selectedResumeCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4.5 border-b border-stone-100 flex items-center justify-between bg-stone-50 shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-emerald-800 text-white font-bold text-lg flex items-center justify-center shadow-xs shrink-0">
                  {selectedResumeCandidate.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-stone-900 text-lg">
                      {selectedResumeCandidate.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>HEMIS tasdiqlangan talaba</span>
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {selectedResumeCandidate.appliedFor} · <span className="font-mono text-stone-900 font-semibold">{selectedResumeCandidate.expectedSalary}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedResumeCandidate(null)}
                className="w-8.5 h-8.5 rounded-full border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Application Status Action Bar */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-stone-500 font-medium">Joriy holat:</span>
                  <span
                    className={`inline-block px-3 py-1 rounded-lg font-bold text-xs ${
                      selectedResumeCandidate.status === 'interview'
                        ? 'bg-blue-100 text-blue-900'
                        : selectedResumeCandidate.status === 'accepted'
                        ? 'bg-emerald-100 text-emerald-900'
                        : selectedResumeCandidate.status === 'rejected'
                        ? 'bg-stone-200 text-stone-700'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {selectedResumeCandidate.statusText || 'Ko‘rib chiqilmoqda'}
                  </span>
                </div>

                {/* Status Switcher Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateCandidateStatus(selectedResumeCandidate.id, 'interview')}
                    className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs cursor-pointer shadow-2xs"
                  >
                    Suhbat belgilash
                  </button>
                  <button
                    onClick={() => handleUpdateCandidateStatus(selectedResumeCandidate.id, 'accepted')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer shadow-2xs"
                  >
                    Ishga qabul qilish
                  </button>
                  <button
                    onClick={() => handleUpdateCandidateStatus(selectedResumeCandidate.id, 'rejected')}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100 font-semibold text-xs cursor-pointer"
                  >
                    Rad etish
                  </button>
                </div>
              </div>

              {/* Shaxsiy & Aloqa ma'lumotlari */}
              <div className="p-4.5 rounded-2xl bg-stone-50/70 border border-stone-200 space-y-2.5">
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Shaxsiy & Aloqa ma’lumotlari</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-stone-700">
                  <div>Telefon raqami: <strong className="text-stone-900 font-mono">{selectedResumeCandidate.phone}</strong></div>
                  <div>Elektron pochta: <strong className="text-stone-900">{selectedResumeCandidate.email}</strong></div>
                  <div>Yashash manzili: <strong className="text-stone-900">{selectedResumeCandidate.district}</strong></div>
                  <div>Tug‘ilgan sanasi: <strong className="text-stone-900">{selectedResumeCandidate.birthDate || '2004-yil'}</strong></div>
                </div>
              </div>

              {/* Nomzod o‘zi ishlashni hohlagan kunlari, kun vaqti va soatlari */}
              <div className="p-4.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
                <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Nomzod ishlashni hohlagan kunlari, kun vaqti va soatlari</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-800">
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                    <span className="text-stone-500 text-[11px] block font-medium">Qulay ish kunlari:</span>
                    <strong className="text-stone-900 block mt-0.5">
                      {selectedResumeCandidate.preferredDays?.join(', ') || 'Dushanba – Juma (5 kun)'}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                    <span className="text-stone-500 text-[11px] block font-medium">Kun vaqti (Smena):</span>
                    <strong className="text-emerald-900 block mt-0.5">
                      {selectedResumeCandidate.workingTimeOfDay || 'Tushdan so‘ng (Part-time)'}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                    <span className="text-stone-500 text-[11px] block font-medium">Aniq ish soatlari:</span>
                    <strong className="text-emerald-800 font-mono block mt-0.5">
                      {selectedResumeCandidate.workingHoursStart || '14:30'} – {selectedResumeCandidate.workingHoursEnd || '19:00'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Ta'lim ma'lumotlari */}
              <div className="p-4.5 rounded-2xl bg-stone-50/70 border border-stone-200 space-y-2.5">
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ta’lim & Oliy o‘quv yurti</span>
                </h4>
                <div className="space-y-1.5 text-stone-700">
                  <div>Oliy ta’lim muassasasi: <strong className="text-stone-900">{selectedResumeCandidate.university}</strong></div>
                  <div>Fakultet / Yo‘nalish: <strong className="text-stone-900">{selectedResumeCandidate.faculty}</strong></div>
                  <div>Bosqich: <span className="text-stone-900 font-semibold">{selectedResumeCandidate.courseYear}</span> ({selectedResumeCandidate.studyType || 'Kunduzgi ta’lim'})</div>
                </div>
              </div>

              {/* Mutaxassislik sertifikatlari */}
              <div className="p-4.5 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-700" />
                    <span>Mutaxassislik sertifikatlari ({(selectedResumeCandidate.certificates || []).length} ta)</span>
                  </h4>
                  <span className="text-[10.5px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                    Tekshirilgan hujjatlar
                  </span>
                </div>

                {(selectedResumeCandidate.certificates || []).length === 0 ? (
                  <p className="text-stone-500 italic">Sertifikat biriktirilmagan.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedResumeCandidate.certificates.map((cert: any, i: number) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                          <div>
                            <span className="font-bold text-stone-900 block">{cert.title}</span>
                            <span className="text-[11px] text-stone-500">{cert.issuer} · {cert.date}</span>
                          </div>
                        </div>
                        {cert.fileName && (
                          <span className="font-mono text-[10.5px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                            {cert.fileName}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rasmiy tavsiyanomalar */}
              <div className="p-4.5 rounded-2xl bg-blue-50/40 border border-blue-200 space-y-3">
                <h4 className="font-bold text-blue-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-blue-700" />
                  <span>Rasmiy tavsiyanomalar (OTM va ustozlardan)</span>
                </h4>

                {(selectedResumeCandidate.recommendations || []).length === 0 ? (
                  <p className="text-stone-500 italic">Tavsiyanoma kiritilmagan.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedResumeCandidate.recommendations.map((rec: any, i: number) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-blue-100 space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900">{rec.recommenderName}</span>
                          <span className="text-[10px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                            {rec.role} · {rec.organization}
                          </span>
                        </div>
                        {rec.text && (
                          <p className="text-stone-700 italic">"{rec.text}"</p>
                        )}
                        {rec.phone && (
                          <span className="text-[10.5px] text-stone-500 block font-mono">
                            Aloqa: {rec.phone}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ko'nikmalar & Tillar */}
              <div className="p-4.5 rounded-2xl bg-stone-50/70 border border-stone-200 space-y-2.5">
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                  Kasbiy ko‘nikmalar & Biladigan tillari
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedResumeCandidate.skills || []).map((sk: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-800 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
                <div className="pt-1 flex items-center gap-2 text-stone-700">
                  <span className="text-stone-500">Tillar:</span>
                  <strong className="text-stone-900">
                    {(selectedResumeCandidate.languages || []).join(', ')}
                  </strong>
                </div>
              </div>

              {/* Nomzod xulosasi (Bio) */}
              {selectedResumeCandidate.bio && (
                <div className="p-4.5 rounded-2xl bg-stone-50/70 border border-stone-200 space-y-1.5">
                  <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Nomzod xulosasi (O‘zi haqida)
                  </h4>
                  <p className="text-stone-700 italic leading-relaxed">
                    "{selectedResumeCandidate.bio}"
                  </p>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer Actions */}
            <div className="p-4 px-6 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => {
                  onOpenChat(selectedResumeCandidate.name);
                  setSelectedResumeCandidate(null);
                }}
                className="h-9.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-stone-700" />
                <span>Chat orqali yozish</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedResumeCandidate(null)}
                  className="h-9.5 px-4 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs cursor-pointer"
                >
                  Yopish
                </button>
                <button
                  onClick={() => handleUpdateCandidateStatus(selectedResumeCandidate.id, 'accepted')}
                  className="h-9.5 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Ishga qabul qilish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Yangi vakansiya joylashtirish */}
      {showCreateJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden animate-in fade-in">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-700" />
                <span>Yangi vakansiya joylashtirish</span>
              </h2>
              <button
                onClick={() => setShowCreateJobModal(false)}
                className="w-7 h-7 rounded-md border border-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Lavozim nomi *</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="Masalan: To‘qimachilik sifat nazoratchisi (OTK)"
                  className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              {/* Maosh oralig'i */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Boshlang‘ich maosh (so‘m) *</label>
                  <input
                    type="text"
                    required
                    value={newJob.salaryMin}
                    onChange={(e) => setNewJob({ ...newJob, salaryMin: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-900 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Maksimal maosh (so‘m) *</label>
                  <input
                    type="text"
                    required
                    value={newJob.salaryMax}
                    onChange={(e) => setNewJob({ ...newJob, salaryMax: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-900 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {/* Ish beruvchi o'zi hohlagan kun vaqti va soatlarini belgilashi */}
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Talab qilinadigan ish kunlari va soatlari *</span>
                  </label>
                  <span className="text-[10.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {newJob.workingDays.length} ish kuni
                  </span>
                </div>

                {/* Hafta kunlari presets & checkboxes */}
                <div>
                  <span className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Ish kunlarini tanlang (Hafta kunlari):
                  </span>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <button
                      type="button"
                      onClick={() => setNewJob({
                        ...newJob,
                        workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma']
                      })}
                      className="px-2 py-0.5 rounded-md border border-stone-300 bg-white hover:bg-stone-100 text-[10.5px] font-semibold text-stone-700 cursor-pointer"
                    >
                      Dush–Jum (5 kun)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewJob({
                        ...newJob,
                        workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
                      })}
                      className="px-2 py-0.5 rounded-md border border-stone-300 bg-white hover:bg-stone-100 text-[10.5px] font-semibold text-stone-700 cursor-pointer"
                    >
                      Dush–Shan (6 kun)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewJob({
                        ...newJob,
                        workingDays: ['Shanba', 'Yakshanba']
                      })}
                      className="px-2 py-0.5 rounded-md border border-stone-300 bg-white hover:bg-stone-100 text-[10.5px] font-semibold text-stone-700 cursor-pointer"
                    >
                      Dam olish kunlari
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewJob({
                        ...newJob,
                        workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba']
                      })}
                      className="px-2 py-0.5 rounded-md border border-stone-300 bg-white hover:bg-stone-100 text-[10.5px] font-semibold text-stone-700 cursor-pointer"
                    >
                      Barcha 7 kun
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {[
                      { id: 'Dushanba', short: 'Du' },
                      { id: 'Seshanba', short: 'Se' },
                      { id: 'Chorshanba', short: 'Chor' },
                      { id: 'Payshanba', short: 'Pay' },
                      { id: 'Juma', short: 'Jum' },
                      { id: 'Shanba', short: 'Shan' },
                      { id: 'Yakshanba', short: 'Yak' }
                    ].map(day => {
                      const isSelected = newJob.workingDays.includes(day.id);
                      return (
                        <button
                          key={day.id}
                          type="button"
                          onClick={() => {
                            const next = isSelected
                              ? newJob.workingDays.filter(d => d !== day.id)
                              : [...newJob.workingDays, day.id];
                            setNewJob({ ...newJob, workingDays: next.length ? next : [day.id] });
                          }}
                          className={`py-1.5 px-1 rounded-lg text-center font-bold text-xs transition-colors cursor-pointer border ${
                            isSelected
                              ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                              : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                          title={day.id}
                        >
                          <span className="block text-[11px]">{day.short}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Kun vaqti va Ish soatlari */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1 text-[11px]">
                      Kun vaqti (Smena) *
                    </label>
                    <select
                      value={newJob.workingTimeOfDay}
                      onChange={(e) => setNewJob({ ...newJob, workingTimeOfDay: e.target.value })}
                      className="w-full h-8.5 px-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                    >
                      <option value="Tushdan so‘ng (Part-time / 14:00 dan so‘ng)">Tushdan so‘ng (14:00+)</option>
                      <option value="Kechki smena (17:00 dan so‘ng)">Kechki smena (17:00+)</option>
                      <option value="Ertalabki smena (08:00 – 13:00)">Ertalabki smena (08:00 – 13:00)</option>
                      <option value="Moslashuvchan grafik">Moslashuvchan grafik</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1 text-[11px]">
                      Boshlanish soati *
                    </label>
                    <input
                      type="time"
                      value={newJob.workingHoursStart}
                      onChange={(e) => setNewJob({ ...newJob, workingHoursStart: e.target.value })}
                      className="w-full h-8.5 px-2 rounded-lg border border-stone-300 bg-white font-mono text-stone-900 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1 text-[11px]">
                      Tugash soati *
                    </label>
                    <input
                      type="time"
                      value={newJob.workingHoursEnd}
                      onChange={(e) => setNewJob({ ...newJob, workingHoursEnd: e.target.value })}
                      className="w-full h-8.5 px-2 rounded-lg border border-stone-300 bg-white font-mono text-stone-900 text-xs"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-emerald-900 bg-emerald-100/70 p-2 rounded-lg font-medium">
                  Belgilangan jadval: <strong>{newJob.workingDays.length === 5 ? 'Dushanba – Juma' : newJob.workingDays.join(', ')}</strong> ({newJob.workingHoursStart} dan {newJob.workingHoursEnd} gacha, {newJob.workingTimeOfDay})
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Ish joyi manzili</label>
                <input
                  type="text"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                  <input
                    type="checkbox"
                    checked={newJob.eveningTransport}
                    onChange={(e) => setNewJob({ ...newJob, eveningTransport: e.target.checked })}
                    className="w-4 h-4 text-emerald-700 rounded accent-emerald-700"
                  />
                  <span>Bepul korxona xizmat avtobusi bilan ta’minlanadi</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateJobModal(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer"
                >
                  E’lonni joylashtirish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
