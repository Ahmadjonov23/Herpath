import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import {
  X, ChevronLeft, User, Building2, Smartphone, Lock,
  CheckCircle2, ArrowRight, ShieldCheck, Mail, MapPin,
  GraduationCap, Clock, DollarSign, Globe, Award, Sparkles,
  KeyRound, Shield, Check, HelpCircle, FileText, UploadCloud,
  Paperclip, AlertCircle, Trash2
} from 'lucide-react';
import { UserRole, JobSeekerProfile, EmployerProfile } from '../types';
import { saveRegisteredAccount, authenticateUser, normalizePhone } from '../data/accounts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole, name: string, profileData?: any) => void;
  onOpenAdminLogin: () => void;
  initialMode?: 'role_selection' | 'register_details' | 'sign_in';
  initialRole?: 'job_seeker' | 'employer';
  initialPhone?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenAdminLogin,
  initialMode,
  initialRole,
  initialPhone
}) => {
  // Modes: 'role_selection' | 'register_details' | 'sign_in'
  const [mode, setMode] = useState<'role_selection' | 'register_details' | 'sign_in'>(initialMode || 'role_selection');
  const [selectedRole, setSelectedRole] = useState<'job_seeker' | 'employer'>(initialRole || 'job_seeker');
  const [signInError, setSignInError] = useState<string | null>(null);
  const [employerPermitError, setEmployerPermitError] = useState<string>('');

  React.useEffect(() => {
    if (isOpen) {
      if (initialMode) setMode(initialMode);
      if (initialRole) setSelectedRole(initialRole);
      if (initialPhone) {
        setSeekerForm(prev => ({ ...prev, phone: initialPhone }));
        setEmployerForm(prev => ({ ...prev, phone: initialPhone }));
        setLoginPhone(initialPhone);
      }
      setSignInError(null);
      setEmployerPermitError('');
    }
  }, [isOpen, initialMode, initialRole, initialPhone]);

  // Form Step within registration (1: Asosiy, 2: Qo'shimcha/Xavfsizlik)
  const [registerStep, setRegisterStep] = useState<1 | 2>(1);

  // -------------------------------------------------------------
  // 1. ISH QIDIRUVCHI (E'LON QIDIRUVCHI) - STANDART TO'LIQ MA'LUMOTLAR
  // -------------------------------------------------------------
  const [seekerForm, setSeekerForm] = useState({
    fullName: '',
    phone: '+998 ',
    email: '',
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
    preferredDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'] as string[],
    workingTimeOfDay: 'Tushdan so‘ng (Part-time / Darsdan keyin)',
    workingHoursStart: '14:30',
    workingHoursEnd: '19:00',
    languages: 'O‘zbek tili (Ona tili), Rus tili (B2), Ingliz tili (IELTS 7.0)',
    skills: 'Tikuv mashinalari bilan ishlash, Lekalo va bichish, Kompyuter savodxonligi, Jamoada ishlash',
    experience: '1 yillik tikuvchilik va modellashtirish amaliyoti',
    bio: 'Kokand University talabasiman. Tikuvchilik va kiyim-kechak ishlab chiqarish sohasida bilim va amaliy ko‘nikmaga egaman. Darsdan so‘ng xavfsiz korxonada ishlashni xohlayman.',
    cctvRequired: true,
    transportRequired: true,
    femaleStaffOnly: false,
    certificatesText: '',
    recommendationsText: '',
    certFileName: '',
    recFileName: '',
    password: '',
    passwordConfirm: ''
  });

  // -------------------------------------------------------------
  // 2. XODIM QIDIRUVCHI (E'LON BERUVCHI) - STANDART TO'LIQ MA'LUMOTLAR
  // -------------------------------------------------------------
  const [employerForm, setEmployerForm] = useState({
    companyName: '',
    inn: '',
    legalType: 'MCHJ (To‘qimachilik qo‘shma korxonasi)',
    category: 'To‘qimachilik va Tikuvchilik (Textile Fabrikasi)',
    address: 'Qo‘qon shahri, Yangi Chorsu ko‘chasi 18-uy (Sanoat hududi)',
    landmark: 'Qo‘qon Erkin Iqtisodiy Zonasi, 2-sanoat zonasi',
    contactPerson: '',
    contactRole: 'Kadrlar bo‘limi boshlig‘i va HR direktori',
    phone: '+998 ',
    email: '',
    website: 'https://kokandtextile.uz',
    employeeCount: '450+ nafar',
    description: 'Qo‘qon shahrining yetakchi to‘qimachilik va tayyor kiyim-kechak fabrikasi. Talaba qizlar va yosh mutaxassislar uchun qulay darsdan keyingi smenalar, bepul xizmat avtobusi, issiq ovqat va to‘liq videokuzatuv tizimi yaratilgan.',
    eveningTransportSupported: true,
    cctvEquipped: true,
    formalContractGuaranteed: true,
    femaleStaffRatio: '88%',
    permitFile: null as { name: string; size: string; uploadDate: string; type?: string } | null,
    password: '',
    passwordConfirm: ''
  });

  // Sign In Form Fields
  const [loginPhone, setLoginPhone] = useState('+998 73 542 12 34');
  const [loginPassword, setLoginPassword] = useState('textile123');

  if (!isOpen) return null;

  // Handle Seeker Registration Submit
  const handleSeekerRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsList = seekerForm.skills.split(',').map(s => s.trim()).filter(Boolean);

    const parsedCertificates = seekerForm.certificatesText ? [{
      id: `cert-${Date.now()}`,
      title: seekerForm.certificatesText,
      issuer: 'Kasbiy ta’lim / Sertifikatlash markazi',
      date: '2025-yil',
      fileName: seekerForm.certFileName || undefined
    }] : [];

    const parsedRecommendations = seekerForm.recommendationsText ? [{
      id: `rec-${Date.now()}`,
      recommenderName: seekerForm.recommendationsText,
      organization: 'Kokand University',
      role: 'Ustoz / Dekanat',
      text: 'O‘zlashtirishi yuqori va intizomli talaba.',
      fileName: seekerForm.recFileName || undefined
    }] : [];

    const profile: JobSeekerProfile = {
      fullName: seekerForm.fullName || 'Dilnoza Karimova',
      phone: seekerForm.phone,
      email: seekerForm.email || 'dilnoza.karimova@edu.uz',
      birthDate: seekerForm.birthDate,
      gender: seekerForm.gender,
      university: seekerForm.university,
      faculty: seekerForm.faculty,
      courseYear: seekerForm.courseYear,
      studyType: seekerForm.studyType,
      district: seekerForm.district,
      desiredPosition: seekerForm.desiredPosition,
      expectedSalary: seekerForm.expectedSalary,
      preferredDays: seekerForm.preferredDays,
      workingTimeOfDay: seekerForm.workingTimeOfDay,
      workingHoursStart: seekerForm.workingHoursStart,
      workingHoursEnd: seekerForm.workingHoursEnd,
      preferredHours: `${seekerForm.workingTimeOfDay || 'Tushdan so‘ng'} (${seekerForm.workingHoursStart} – ${seekerForm.workingHoursEnd})`,
      freeHours: `${seekerForm.workingHoursStart} – ${seekerForm.workingHoursEnd} (${seekerForm.preferredDays.join(', ')})`,
      languages: seekerForm.languages.split(',').map(l => l.trim()),
      skills: skillsList.length ? skillsList : ['Tikuv mashinalari bilan ishlash', 'Lekalo', 'Kompyuter savodxonligi'],
      interests: ['To‘qimachilik sanoati', 'Kiyim dizayni', 'Xorijiy tillar'],
      experience: seekerForm.experience,
      bio: seekerForm.bio,
      safetyPreferences: {
        cctvRequired: seekerForm.cctvRequired,
        transportRequired: seekerForm.transportRequired,
        femaleStaffOnly: seekerForm.femaleStaffOnly
      },
      certificates: parsedCertificates,
      recommendations: parsedRecommendations
    };

    // Save newly registered seeker account for future phone + password logins
    saveRegisteredAccount({
      id: `acc-seeker-${Date.now()}`,
      role: 'job_seeker',
      phone: seekerForm.phone,
      password: seekerForm.password || 'pass123',
      name: profile.fullName,
      profileData: profile,
      certificates: parsedCertificates,
      recommendations: parsedRecommendations,
      registeredAt: new Date().toISOString().slice(0, 10)
    });

    onLoginSuccess('job_seeker', profile.fullName, profile);
    onClose();
  };

  // Handle Employer Registration Submit
  const handleEmployerRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profile: EmployerProfile = {
      companyName: employerForm.companyName || 'Kokand Textile Fabrikasi MCHJ',
      inn: employerForm.inn || '305 482 910',
      legalType: employerForm.legalType,
      category: employerForm.category,
      address: employerForm.address,
      landmark: employerForm.landmark,
      contactPerson: employerForm.contactPerson || 'Nargiza Yo‘ldosheva',
      contactRole: employerForm.contactRole,
      phone: employerForm.phone,
      email: employerForm.email || 'hr@kokandtextile.uz',
      website: employerForm.website,
      employeeCount: employerForm.employeeCount,
      description: employerForm.description,
      eveningTransportSupported: employerForm.eveningTransportSupported,
      cctvEquipped: employerForm.cctvEquipped,
      formalContractGuaranteed: employerForm.formalContractGuaranteed,
      femaleStaffRatio: employerForm.femaleStaffRatio,
      verifiedSince: '2026-yil',
      isVerified: true,
      permitFile: employerForm.permitFile || undefined
    };

    // Save newly registered employer account for future phone + password logins
    saveRegisteredAccount({
      id: `acc-employer-${Date.now()}`,
      role: 'employer',
      phone: employerForm.phone,
      password: employerForm.password || 'textile123',
      name: profile.companyName,
      profileData: profile,
      permitFile: employerForm.permitFile || undefined,
      registeredAt: new Date().toISOString().slice(0, 10)
    });

    onLoginSuccess('employer', profile.companyName, profile);
    onClose();
  };

  // Handle Sign In Submit (Checks registered accounts by phone & password!)
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError(null);

    const authResult = authenticateUser(loginPhone, loginPassword, selectedRole);
    if (authResult.success && authResult.account) {
      onLoginSuccess(
        authResult.account.role,
        authResult.account.name,
        authResult.account.profileData
      );
      onClose();
    } else {
      setSignInError(authResult.error || 'Kiritilgan telefon raqami yoki parol noto‘g‘ri!');
    }
  };

  // Quick preset fills for fast testing
  const fillSeekerDemo = () => {
    setSeekerForm({
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
      desiredPosition: 'Tekstil konstruktori / Tikuvchilik amaliyoti',
      expectedSalary: '4 000 000 so‘m',
      preferredHours: 'Part-time (14:30 dan so‘ng)',
      freeHours: '14:30 – 19:00',
      languages: 'O‘zbek tili (Ona tili), Rus tili (Erkin), Ingliz tili (IELTS 7.0)',
      skills: 'Tikuv mashinalari bilan ishlash, Lekalo va bichish, Kompyuter savodxonligi, Jamoada ishlash',
      experience: '1 yillik tikuvchilik va modellashtirish amaliyoti',
      bio: 'Kokand University talabasiman. Tikuvchilik va kiyim-kechak ishlab chiqarish sohasida bilim va amaliy ko‘nikmaga egaman. Darsdan so‘ng xavfsiz to‘qimachilik fabrikasida ishlashni xohlayman.',
      cctvRequired: true,
      transportRequired: true,
      femaleStaffOnly: false,
      certificatesText: 'Tikuvchilik va modellashtirish mutaxassisligi (Qo‘qon Kasb-hunar markazi)',
      recommendationsText: 'Prof. Xursheda Rahimova (Kokand University dekan muovini)',
      certFileName: 'tikuvchilik_mutaxassislik_sertifikati.pdf',
      recFileName: 'dekanat_tavsiyanomasi.pdf',
      password: 'pass123',
      passwordConfirm: 'pass123'
    });
  };

  const fillEmployerDemo = () => {
    setEmployerForm({
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
      description: 'Qo‘qon shahrining yetakchi to‘qimachilik va tayyor kiyim-kechak fabrikasi. Talaba qizlar va yosh mutaxassislar uchun qulay darsdan keyingi smenalar, bepul xizmat avtobusi, issiq ovqat va to‘liq videokuzatuv tizimi yaratilgan.',
      eveningTransportSupported: true,
      cctvEquipped: true,
      formalContractGuaranteed: true,
      femaleStaffRatio: '88%',
      permitFile: {
        name: 'davlat_ruxsatnomasi_kokand_textile_2026.pdf',
        size: '2.4 MB',
        uploadDate: '2026-yil 12-fevral',
        type: 'application/pdf'
      },
      password: 'textile123',
      passwordConfirm: 'textile123'
    });
    setEmployerPermitError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-stone-100 bg-stone-50/70 shrink-0">
          <div>
            {mode !== 'role_selection' ? (
              <button
                type="button"
                onClick={() => {
                  if (registerStep === 2) {
                    setRegisterStep(1);
                  } else {
                    setMode('role_selection');
                  }
                }}
                className="w-9 h-9 rounded-full border border-stone-200 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-700 transition-colors cursor-pointer shadow-2xs"
                title="Ortga"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-stone-200 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-700 transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-center">
            <BrandLogo size="md" />
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* ============================================================= */}
          {/* 1. ROLE SELECTION SCREEN WITH 3 PROFILE RIGHTS CLEARLY SHOWN  */}
          {/* ============================================================= */}
          {mode === 'role_selection' && (
            <div className="space-y-5">
              <div className="text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded-full">
                  Foydalanuvchi huquqlari
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1.5">
                  Platformaga kirish va ro‘yxatdan o‘tish
                </h1>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Profil huquqlari 3 toifaga bo‘lingan. O‘zingizga mos faoliyat yo‘nalishini tanlang:
                </p>
              </div>

              {/* 2 Main Selectable Profile Cards */}
              <div className="space-y-3">
                {/* Profile 1: Ish qidiruvchi (E'lon qidiruvchi) */}
                <div
                  onClick={() => setSelectedRole('job_seeker')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                    selectedRole === 'job_seeker'
                      ? 'border-[#2563EB] bg-[#EFF6FF]/60 shadow-sm ring-2 ring-[#2563EB]/15'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-100/80 border border-blue-200 flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
                    <User className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-stone-900 leading-tight">
                        Ish qidiruvchi (E'lon qidiruvchi)
                      </h3>
                      <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                        selectedRole === 'job_seeker'
                          ? 'border-[#2563EB] bg-[#2563EB] text-white'
                          : 'border-stone-300'
                      }`}>
                        {selectedRole === 'job_seeker' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">
                      Talaba qizlar, rezyume to‘ldiruvchi, xavfsiz marshrut va vakansiyalarga ariza topshiruvchilar
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-100/70 text-blue-800">Part-time ishlar</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-100/70 text-blue-800">Xavfsiz xarita</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-100/70 text-blue-800">Rezyume</span>
                    </div>
                  </div>
                </div>

                {/* Profile 2: Xodim qidiruvchi (E'lon beruvchi) */}
                <div
                  onClick={() => setSelectedRole('employer')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                    selectedRole === 'employer'
                      ? 'border-[#2563EB] bg-[#EFF6FF]/60 shadow-sm ring-2 ring-[#2563EB]/15'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <Building2 className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-stone-900 leading-tight">
                        Xodim qidiruvchi (E'lon beruvchi)
                      </h3>
                      <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                        selectedRole === 'employer'
                          ? 'border-[#2563EB] bg-[#2563EB] text-white'
                          : 'border-stone-300'
                      }`}>
                        {selectedRole === 'employer' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">
                      Kompaniyalar, o‘quv markazlari, maktablar, xavfsiz vakansiya joylashtiruvchi ish beruvchilar
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-800">Vakansiya berish</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-800">STIR audit</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-800">Nomzodlar arizasi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={() => {
                  setRegisterStep(1);
                  setMode('register_details');
                }}
                className="w-full h-11.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] active:scale-[0.99] text-white font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Standart ma’lumotlarni kiritish</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Sign In & Admin Direct Access Section */}
              <div className="pt-3 border-t border-stone-100 space-y-3">
                <div className="text-center text-xs text-stone-500">
                  <span>Allaqachon ro‘yxatdan o‘tganmisiz? </span>
                  <button
                    type="button"
                    onClick={() => setMode('sign_in')}
                    className="font-bold text-[#0066FF] hover:underline cursor-pointer"
                  >
                    Tizimga kirish
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 2. ISH QIDIRUVCHI (E'LON QIDIRUVCHI) - BARCHA STANDART SO'ROVLAR */}
          {/* ============================================================= */}
          {mode === 'register_details' && selectedRole === 'job_seeker' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded">
                    Ish qidiruvchi (E'lon qidiruvchi)
                  </span>
                  <h2 className="text-base font-bold text-stone-900 mt-1">
                    Talaba va rezyume ma’lumotlarini to‘ldirish
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={fillSeekerDemo}
                  className="text-[11px] font-bold text-[#0066FF] hover:underline cursor-pointer bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60"
                >
                  Namunani to‘ldirish ⚡
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setRegisterStep(1)}
                  className={`flex-1 py-1.5 px-2 rounded-lg border text-center transition-all ${
                    registerStep === 1
                      ? 'bg-blue-50 text-[#0066FF] border-[#0066FF]'
                      : 'bg-stone-50 text-stone-600 border-stone-200'
                  }`}
                >
                  1. Shaxsiy & Ta’lim
                </button>
                <button
                  type="button"
                  onClick={() => setRegisterStep(2)}
                  className={`flex-1 py-1.5 px-2 rounded-lg border text-center transition-all ${
                    registerStep === 2
                      ? 'bg-blue-50 text-[#0066FF] border-[#0066FF]'
                      : 'bg-stone-50 text-stone-600 border-stone-200'
                  }`}
                >
                  2. Ish talablari & Xavfsizlik
                </button>
              </div>

              <form onSubmit={handleSeekerRegisterSubmit} className="space-y-3.5 text-xs">
                {registerStep === 1 && (
                  <div className="space-y-3">
                    {/* F.I.Sh */}
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        To‘liq ism, familiya va sharifingiz *
                      </label>
                      <input
                        type="text"
                        required
                        value={seekerForm.fullName}
                        onChange={(e) => setSeekerForm({ ...seekerForm, fullName: e.target.value })}
                        placeholder="Masalan: Dilnoza Karimova Rustam qizi"
                        className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>

                    {/* Telefon va Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Telefon raqam *
                        </label>
                        <input
                          type="tel"
                          required
                          value={seekerForm.phone}
                          onChange={(e) => setSeekerForm({ ...seekerForm, phone: e.target.value })}
                          placeholder="+998 90 123 45 67"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Elektron pochta (Email) *
                        </label>
                        <input
                          type="email"
                          required
                          value={seekerForm.email}
                          onChange={(e) => setSeekerForm({ ...seekerForm, email: e.target.value })}
                          placeholder="talaba@edu.uz"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                        />
                      </div>
                    </div>

                    {/* Tug'ilgan sana va Yashash tumani */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Tug‘ilgan sana
                        </label>
                        <input
                          type="date"
                          value={seekerForm.birthDate}
                          onChange={(e) => setSeekerForm({ ...seekerForm, birthDate: e.target.value })}
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Yashash hududi / Tumani *
                        </label>
                        <select
                          value={seekerForm.district}
                          onChange={(e) => setSeekerForm({ ...seekerForm, district: e.target.value })}
                          className="w-full h-9.5 px-2.5 rounded-lg border border-stone-300 bg-white text-stone-800"
                        >
                          <option value="Chilonzor tumani">Chilonzor tumani</option>
                          <option value="Yunusobod tumani">Yunusobod tumani</option>
                          <option value="Mirzo Ulug‘bek tumani">Mirzo Ulug‘bek tumani</option>
                          <option value="Yakkasaroy tumani">Yakkasaroy tumani</option>
                          <option value="Shayxontohur tumani">Shayxontohur tumani</option>
                          <option value="Olmazor tumani">Olmazor tumani</option>
                          <option value="Mirobod tumani">Mirobod tumani</option>
                          <option value="Uchtepa tumani">Uchtepa tumani</option>
                          <option value="Sergeli tumani">Sergeli tumani</option>
                          <option value="Yangi Hayot tumani">Yangi Hayot tumani</option>
                        </select>
                      </div>
                    </div>

                    {/* Universitet / OTM */}
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Oliy ta’lim muassasasi (Universitet) *
                      </label>
                      <select
                        value={seekerForm.university}
                        onChange={(e) => setSeekerForm({ ...seekerForm, university: e.target.value })}
                        className="w-full h-9.5 px-2.5 rounded-lg border border-stone-300 bg-white text-stone-800"
                      >
                        <option value="Kokand University Toshkent">Kokand University Toshkent</option>
                        <option value="Toshkent Davlat Pedagogika Universiteti (TDPU)">TDPU (Nizomiy nomidagi)</option>
                        <option value="O‘zbekiston Milliy Universiteti (O‘zMU)">O‘zbekiston Milliy Universiteti (O‘zMU)</option>
                        <option value="O‘zbekiston Davlat Jahon Tillari Universiteti (O‘zDJTU)">O‘zDJTU</option>
                        <option value="Toshkent Davlat Iqtisodiyot Universiteti (TDIU)">TDIU</option>
                        <option value="TATU - Toshkent Axborot Texnologiyalari Universiteti">TATU</option>
                        <option value="Jahon Iqtisodiyoti va Diplomatiya Universiteti (JIDU)">JIDU</option>
                        <option value="Boshqa Oliy ta’lim muassasasi">Boshqa OTM</option>
                      </select>
                    </div>

                    {/* Fakultet, Kurs va Ta'lim shakli */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="sm:col-span-1">
                        <label className="block font-semibold text-stone-700 mb-1">
                          Fakultet / Yo‘nalish
                        </label>
                        <input
                          type="text"
                          value={seekerForm.faculty}
                          onChange={(e) => setSeekerForm({ ...seekerForm, faculty: e.target.value })}
                          placeholder="Ingliz tili filologiyasi"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Kursi
                        </label>
                        <select
                          value={seekerForm.courseYear}
                          onChange={(e) => setSeekerForm({ ...seekerForm, courseYear: e.target.value })}
                          className="w-full h-9.5 px-2.5 rounded-lg border border-stone-300 bg-white text-stone-800"
                        >
                          <option value="1-kurs talabasi">1-kurs</option>
                          <option value="2-kurs talabasi">2-kurs</option>
                          <option value="3-kurs talabasi">3-kurs</option>
                          <option value="4-kurs talabasi">4-kurs</option>
                          <option value="Magistratura">Magistratura</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Ta’lim shakli
                        </label>
                        <select
                          value={seekerForm.studyType}
                          onChange={(e) => setSeekerForm({ ...seekerForm, studyType: e.target.value })}
                          className="w-full h-9.5 px-2.5 rounded-lg border border-stone-300 bg-white text-stone-800"
                        >
                          <option value="Kunduzgi">Kunduzgi</option>
                          <option value="Kechki">Kechki</option>
                          <option value="Sirtqi">Sirtqi</option>
                          <option value="Masofaviy">Masofaviy</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setRegisterStep(2)}
                      className="w-full h-10 mt-2 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Keyingi bosqich: Ish parametrlari va Maxfiylik</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {registerStep === 2 && (
                  <div className="space-y-3">
                    {/* Qidirayotgan lavozimi va Maosh */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Qidirayotgan lavozim / Sohasi *
                        </label>
                        <input
                          type="text"
                          required
                          value={seekerForm.desiredPosition}
                          onChange={(e) => setSeekerForm({ ...seekerForm, desiredPosition: e.target.value })}
                          placeholder="Ingliz tili repetitori, Administrator..."
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Kutilayotgan oylik maosh
                        </label>
                        <input
                          type="text"
                          value={seekerForm.expectedSalary}
                          onChange={(e) => setSeekerForm({ ...seekerForm, expectedSalary: e.target.value })}
                          placeholder="3 000 000 – 5 000 000 so‘m"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                        />
                      </div>
                    </div>

                    {/* Qulay ish kunlari, kun vaqti va soatlari */}
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-stone-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                          <span>O‘zingiz ishlashni hohlagan kunlar va soatlar *</span>
                        </label>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                          {seekerForm.preferredDays.length} kun tanlandi
                        </span>
                      </div>

                      {/* Hafta kunlari presets & checkboxes */}
                      <div>
                        <span className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Haftaning qaysi kunlarida ishlay olasiz?
                        </span>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <button
                            type="button"
                            onClick={() => setSeekerForm({
                              ...seekerForm,
                              preferredDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma']
                            })}
                            className="px-2 py-0.5 rounded-md border border-stone-300 bg-white hover:bg-stone-100 text-[10.5px] font-semibold text-stone-700 cursor-pointer"
                          >
                            Dush–Jum (5 kun)
                          </button>
                          <button
                            type="button"
                            onClick={() => setSeekerForm({
                              ...seekerForm,
                              preferredDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
                            })}
                            className="px-2 py-0.5 rounded-md border border-stone-300 bg-white hover:bg-stone-100 text-[10.5px] font-semibold text-stone-700 cursor-pointer"
                          >
                            Dush–Shan (6 kun)
                          </button>
                          <button
                            type="button"
                            onClick={() => setSeekerForm({
                              ...seekerForm,
                              preferredDays: ['Shanba', 'Yakshanba']
                            })}
                            className="px-2 py-0.5 rounded-md border border-stone-300 bg-white hover:bg-stone-100 text-[10.5px] font-semibold text-stone-700 cursor-pointer"
                          >
                            Dam olish kunlari
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
                            const isSelected = seekerForm.preferredDays.includes(day.id);
                            return (
                              <button
                                key={day.id}
                                type="button"
                                onClick={() => {
                                  const current = seekerForm.preferredDays;
                                  const next = isSelected ? current.filter(d => d !== day.id) : [...current, day.id];
                                  setSeekerForm({ ...seekerForm, preferredDays: next });
                                }}
                                className={`py-1.5 px-1 rounded-lg text-center font-bold text-xs transition-colors cursor-pointer border ${
                                  isSelected
                                    ? 'bg-[#0066FF] text-white border-[#0066FF]'
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
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        <div>
                          <label className="block font-semibold text-stone-700 mb-1 text-[11px]">
                            Kun vaqti (Smena)
                          </label>
                          <select
                            value={seekerForm.workingTimeOfDay}
                            onChange={(e) => setSeekerForm({ ...seekerForm, workingTimeOfDay: e.target.value })}
                            className="w-full h-8.5 px-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                          >
                            <option value="Tushdan so‘ng (Part-time / Darsdan keyin)">Tushdan so‘ng (Darsdan keyin)</option>
                            <option value="Kechki smena (17:00 dan so‘ng)">Kechki smena (17:00 dan so‘ng)</option>
                            <option value="Ertalabki smena (08:00 – 13:00)">Ertalabki smena (08:00 – 13:00)</option>
                            <option value="Moslashuvchan / Erkin grafik">Moslashuvchan / Erkin grafik</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-semibold text-stone-700 mb-1 text-[11px]">
                            Boshlanish soati
                          </label>
                          <input
                            type="time"
                            value={seekerForm.workingHoursStart}
                            onChange={(e) => setSeekerForm({ ...seekerForm, workingHoursStart: e.target.value })}
                            className="w-full h-8.5 px-2 rounded-lg border border-stone-300 bg-white font-mono text-stone-900 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-stone-700 mb-1 text-[11px]">
                            Tugash soati
                          </label>
                          <input
                            type="time"
                            value={seekerForm.workingHoursEnd}
                            onChange={(e) => setSeekerForm({ ...seekerForm, workingHoursEnd: e.target.value })}
                            className="w-full h-8.5 px-2 rounded-lg border border-stone-300 bg-white font-mono text-stone-900 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tillarni bilish va Ko'nikmalar */}
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Til bilish darajangiz (Chet tillari)
                      </label>
                      <input
                        type="text"
                        value={seekerForm.languages}
                        onChange={(e) => setSeekerForm({ ...seekerForm, languages: e.target.value })}
                        placeholder="Ingliz tili (C1/IELTS 7.0), Rus tili..."
                        className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Asosiy ko‘nikmalaringiz (Vergul bilan ajrating)
                      </label>
                      <input
                        type="text"
                        value={seekerForm.skills}
                        onChange={(e) => setSeekerForm({ ...seekerForm, skills: e.target.value })}
                        placeholder="Kompyuter savodxonligi, MS Word, Pedagogika, Muloqot madaniyati"
                        className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>

                    {/* Rezyume qisqacha tavsifi */}
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        O‘zingiz haqingizda qisqacha rezyume tavsifi
                      </label>
                      <textarea
                        rows={2}
                        value={seekerForm.bio}
                        onChange={(e) => setSeekerForm({ ...seekerForm, bio: e.target.value })}
                        placeholder="Tajribangiz, maqsadlaringiz va qobiliyatingiz..."
                        className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>

                    {/* Xavfsizlik shartlari (Checkboxes) */}
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                      <span className="font-bold text-stone-800 block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-[#0066FF]" />
                        <span>Xavfsizlik talablaringiz</span>
                      </span>
                      <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                        <input
                          type="checkbox"
                          checked={seekerForm.cctvRequired}
                          onChange={(e) => setSeekerForm({ ...seekerForm, cctvRequired: e.target.checked })}
                          className="w-3.5 h-3.5 text-[#0066FF] accent-[#0066FF] rounded"
                        />
                        <span>Faqat videokuzatuvli va xavfsizlik auditidan o‘tgan joylar</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                        <input
                          type="checkbox"
                          checked={seekerForm.transportRequired}
                          onChange={(e) => setSeekerForm({ ...seekerForm, transportRequired: e.target.checked })}
                          className="w-3.5 h-3.5 text-[#0066FF] accent-[#0066FF] rounded"
                        />
                        <span>Kechki smena tugaganda xavfsiz transport ta’minlangan bo‘lishi</span>
                      </label>
                    </div>

                    {/* Mutaxassislik sertifikatlari va Tavsiyanomalar (Ixtiyoriy) */}
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[#802244]" />
                          <span>Mutaxassislik sertifikatlari & Tavsiyanomalar</span>
                        </span>
                        <span className="text-[10px] text-stone-500 font-semibold bg-stone-200/70 px-2 py-0.5 rounded">
                          Ixtiyoriy
                        </span>
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Mutaxassislik sertifikati (Yo‘nalish, tashkilot nomi)
                        </label>
                        <input
                          type="text"
                          value={seekerForm.certificatesText}
                          onChange={(e) => setSeekerForm({ ...seekerForm, certificatesText: e.target.value })}
                          placeholder="Masalan: Tikuvchilik-modellash sertifikati, IELTS 7.0, IT/Grafika..."
                          className="w-full h-9 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#802244]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Tavsiyanoma (Ustoz yoki OTM tavsiya beruvchisi)
                        </label>
                        <input
                          type="text"
                          value={seekerForm.recommendationsText}
                          onChange={(e) => setSeekerForm({ ...seekerForm, recommendationsText: e.target.value })}
                          placeholder="Masalan: Prof. Xursheda Rahimova (Kokand University)"
                          className="w-full h-9 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#802244]"
                        />
                      </div>
                    </div>

                    {/* Maxfiy Parol */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Maxfiy parol yarating *
                        </label>
                        <input
                          type="password"
                          required
                          value={seekerForm.password}
                          onChange={(e) => setSeekerForm({ ...seekerForm, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Parolni tasdiqlang *
                        </label>
                        <input
                          type="password"
                          required
                          value={seekerForm.passwordConfirm}
                          onChange={(e) => setSeekerForm({ ...seekerForm, passwordConfirm: e.target.value })}
                          placeholder="••••••••"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setRegisterStep(1)}
                        className="w-1/3 h-11 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs cursor-pointer"
                      >
                        Ortga
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 h-11 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                      >
                        Ro‘yxatdan o‘tishni yakunlash
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* ============================================================= */}
          {/* 3. XODIM QIDIRUVCHI (E'LON BERUVCHI) - BARCHA STANDART SO'ROVLAR */}
          {/* ============================================================= */}
          {mode === 'register_details' && selectedRole === 'employer' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                    Xodim qidiruvchi (E'lon beruvchi)
                  </span>
                  <h2 className="text-base font-bold text-stone-900 mt-1">
                    Tashkilot va vakansiya beruvchi ma’lumotlari
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={fillEmployerDemo}
                  className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60"
                >
                  Namunani to‘ldirish ⚡
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setRegisterStep(1)}
                  className={`flex-1 py-1.5 px-2 rounded-lg border text-center transition-all ${
                    registerStep === 1
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-600'
                      : 'bg-stone-50 text-stone-600 border-stone-200'
                  }`}
                >
                  1. Kompaniya & Yuridik STIR
                </button>
                <button
                  type="button"
                  onClick={() => setRegisterStep(2)}
                  className={`flex-1 py-1.5 px-2 rounded-lg border text-center transition-all ${
                    registerStep === 2
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-600'
                      : 'bg-stone-50 text-stone-600 border-stone-200'
                  }`}
                >
                  2. Vakil & Xavfsizlik kafolatlari
                </button>
              </div>

              <form onSubmit={handleEmployerRegisterSubmit} className="space-y-3.5 text-xs">
                {registerStep === 1 && (
                  <div className="space-y-3">
                    {/* Tashkilot nomi */}
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Tashkilot / Kompaniya nomi *
                      </label>
                      <input
                        type="text"
                        required
                        value={employerForm.companyName}
                        onChange={(e) => setEmployerForm({ ...employerForm, companyName: e.target.value })}
                        placeholder="Masalan: Bright Academy O‘quv Markazi"
                        className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    {/* STIR (INN) va Yuridik shakli */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Tashkilot STIR (INN - 9 xonali) *
                        </label>
                        <input
                          type="text"
                          required
                          value={employerForm.inn}
                          onChange={(e) => setEmployerForm({ ...employerForm, inn: e.target.value })}
                          placeholder="308 214 902"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Yuridik maqomi
                        </label>
                        <select
                          value={employerForm.legalType}
                          onChange={(e) => setEmployerForm({ ...employerForm, legalType: e.target.value })}
                          className="w-full h-9.5 px-2.5 rounded-lg border border-stone-300 bg-white text-stone-800"
                        >
                          <option value="MCHJ">MCHJ (Mas’uliyati cheklangan jamiyat)</option>
                          <option value="XK">XK (Xususiy korxona)</option>
                          <option value="YaTT">YaTT (Yakka tartibdagi tadbirkor)</option>
                          <option value="NTM">NTM (Nodavlat ta’lim muassasasi)</option>
                          <option value="AJ">AJ (Aksiyadorlik jamiyati)</option>
                        </select>
                      </div>
                    </div>

                    {/* Faoliyat sohasi va Xodimlar soni */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Faoliyat sohasi *
                        </label>
                        <select
                          value={employerForm.category}
                          onChange={(e) => setEmployerForm({ ...employerForm, category: e.target.value })}
                          className="w-full h-9.5 px-2.5 rounded-lg border border-stone-300 bg-white text-stone-800"
                        >
                          <option value="To‘qimachilik va Tikuvchilik (Textile Fabrikasi)">To‘qimachilik va Tikuvchilik (Textile Fabrikasi)</option>
                          <option value="Restoran va Umumiy ovqatlanish">Restoran va Umumiy ovqatlanish</option>
                          <option value="Call center & BPO">Aloqa markazi (Call center & BPO)</option>
                          <option value="O‘quv markazi">O‘quv markazi</option>
                          <option value="Xususiy maktab">Xususiy maktab / Bog‘cha</option>
                          <option value="IT va Raqamli markaz">IT kompaniya / Kovorking</option>
                          <option value="Xizmat ko‘rsatish">Xizmat ko‘rsatish va servis</option>
                          <option value="Savdo / E-commerce">Savdo va marketing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Xodimlar soni
                        </label>
                        <select
                          value={employerForm.employeeCount}
                          onChange={(e) => setEmployerForm({ ...employerForm, employeeCount: e.target.value })}
                          className="w-full h-9.5 px-2.5 rounded-lg border border-stone-300 bg-white text-stone-800"
                        >
                          <option value="10 nafargacha">10 nafargacha</option>
                          <option value="10–25 nafar">10–25 nafar</option>
                          <option value="25–50 nafar">25–50 nafar</option>
                          <option value="50–100 nafar">50–100 nafar</option>
                          <option value="100–300 nafar">100–300 nafar</option>
                          <option value="450+ nafar">450+ nafar (Fabrika)</option>
                        </select>
                      </div>
                    </div>

                    {/* Jismoniy ish joyi manzili */}
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Jismoniy ish joyi manzili (Qo‘qon shahri) *
                      </label>
                      <input
                        type="text"
                        required
                        value={employerForm.address}
                        onChange={(e) => setEmployerForm({ ...employerForm, address: e.target.value })}
                        placeholder="Qo‘qon shahri, Yangi Chorsu ko‘chasi 18-uy"
                        className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    {/* Mo'ljal va Veb-sayt */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Mo‘ljal / Lokatsiya
                        </label>
                        <input
                          type="text"
                          value={employerForm.landmark}
                          onChange={(e) => setEmployerForm({ ...employerForm, landmark: e.target.value })}
                          placeholder="Qo‘qon Erkin Iqtisodiy Zonasi yoki metro"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Veb-sayt yoki Telegram sahifasi
                        </label>
                        <input
                          type="text"
                          value={employerForm.website}
                          onChange={(e) => setEmployerForm({ ...employerForm, website: e.target.value })}
                          placeholder="https://kokandtextile.uz yoki t.me/textile"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                    </div>

                    {/* Tashkilot davlat faoliyat ruxsatnomasi fayli (Ixtiyoriy) */}
                    <div className="p-3 rounded-xl border border-dashed border-stone-300 bg-stone-50/60 hover:bg-stone-50 transition-all">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="font-semibold text-stone-800 text-xs flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-stone-600" />
                          <span>Tashkilot faoliyat ruxsatnomasi / Guvohnoma</span>
                        </label>
                        <span className="text-[10px] font-semibold text-stone-600 bg-stone-200/80 px-2 py-0.5 rounded-full">
                          Ixtiyoriy
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mb-2">
                        Davlat ro‘yxatidan o‘tganlik guvohnomasi yoki litsenziya fayli (PDF, PNG, JPG).
                      </p>

                      <div className="relative border border-stone-200 rounded-lg p-2.5 bg-white text-center hover:border-emerald-600 transition-colors shadow-2xs">
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const f = e.target.files[0];
                              const sizeMb = (f.size / (1024 * 1024)).toFixed(1);
                              setEmployerForm({
                                ...employerForm,
                                permitFile: {
                                  name: f.name,
                                  size: `${sizeMb > '0.0' ? sizeMb : '0.8'} MB`,
                                  uploadDate: 'Bugun',
                                  type: f.type
                                }
                              });
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center justify-center gap-1">
                          <UploadCloud className="w-4 h-4 text-emerald-700" />
                          <span className="text-xs font-semibold text-stone-800">
                            {employerForm.permitFile ? (
                              <span className="text-emerald-800 font-bold font-mono">
                                Yuklangan fayl: {employerForm.permitFile.name} ({employerForm.permitFile.size}) ✓
                              </span>
                            ) : (
                              <span className="text-stone-600">Ruxsatnoma faylini tanlash (ixtiyoriy)</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setRegisterStep(2)}
                      className="w-full h-10 mt-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Keyingi bosqich: Mas’ul vakil va Kafolatlar</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {registerStep === 2 && (
                  <div className="space-y-3">
                    {/* Mas'ul vakil F.I.Sh. va Lavozimi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Mas’ul vakil F.I.Sh. *
                        </label>
                        <input
                          type="text"
                          required
                          value={employerForm.contactPerson}
                          onChange={(e) => setEmployerForm({ ...employerForm, contactPerson: e.target.value })}
                          placeholder="Zulxumor Rahimova"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Vakil lavozimi
                        </label>
                        <input
                          type="text"
                          value={employerForm.contactRole}
                          onChange={(e) => setEmployerForm({ ...employerForm, contactRole: e.target.value })}
                          placeholder="HR direktor, Kadrlar bo‘limi"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                    </div>

                    {/* Telefon va Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Aloqa telefoni *
                        </label>
                        <input
                          type="tel"
                          required
                          value={employerForm.phone}
                          onChange={(e) => setEmployerForm({ ...employerForm, phone: e.target.value })}
                          placeholder="+998 71 200 44 88"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Korporativ Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={employerForm.email}
                          onChange={(e) => setEmployerForm({ ...employerForm, email: e.target.value })}
                          placeholder="hr@brightacademy.uz"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                    </div>

                    {/* Kompaniya tavsifi */}
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Kompaniya va taklif etiladigan sharoitlar haqida
                      </label>
                      <textarea
                        rows={2}
                        value={employerForm.description}
                        onChange={(e) => setEmployerForm({ ...employerForm, description: e.target.value })}
                        placeholder="Talabalar uchun yaratilgan imkoniyatlar va ish muhiti..."
                        className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    {/* HerPath Xavfsizlik Kafolatlari (Standart talablar) */}
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                          <span>HerPath Ish Beruvchi Xavfsizlik Kafolatlari</span>
                        </span>
                        <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                          Majburiy
                        </span>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                        <input
                          type="checkbox"
                          checked={employerForm.cctvEquipped}
                          onChange={(e) => setEmployerForm({ ...employerForm, cctvEquipped: e.target.checked })}
                          className="w-3.5 h-3.5 text-emerald-700 accent-emerald-700 rounded"
                        />
                        <span>Bino kirishida va umumiy maydonda videokuzatuv / Turniket mavjud</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                        <input
                          type="checkbox"
                          checked={employerForm.eveningTransportSupported}
                          onChange={(e) => setEmployerForm({ ...employerForm, eveningTransportSupported: e.target.checked })}
                          className="w-3.5 h-3.5 text-emerald-700 accent-emerald-700 rounded"
                        />
                        <span>Kechki smena tugaganda xodimlar uchun xavfsiz transport ta’minlanadi</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                        <input
                          type="checkbox"
                          checked={employerForm.formalContractGuaranteed}
                          onChange={(e) => setEmployerForm({ ...employerForm, formalContractGuaranteed: e.target.checked })}
                          className="w-3.5 h-3.5 text-emerald-700 accent-emerald-700 rounded"
                        />
                        <span>Rasmiy mehnat shartnomasi va erkin o‘qish jadvali kafolatlanadi</span>
                      </label>
                    </div>

                    {/* Maxfiy Parol */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Maxfiy parol yarating *
                        </label>
                        <input
                          type="password"
                          required
                          value={employerForm.password}
                          onChange={(e) => setEmployerForm({ ...employerForm, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Parolni tasdiqlang *
                        </label>
                        <input
                          type="password"
                          required
                          value={employerForm.passwordConfirm}
                          onChange={(e) => setEmployerForm({ ...employerForm, passwordConfirm: e.target.value })}
                          placeholder="••••••••"
                          className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setRegisterStep(1)}
                        className="w-1/3 h-11 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs cursor-pointer"
                      >
                        Ortga
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                      >
                        Ro‘yxatdan o‘tish va auditga topshirish
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* ============================================================= */}
          {/* 4. SIGN IN FORM (TIZIMGA KIRISH)                              */}
          {/* ============================================================= */}
          {mode === 'sign_in' && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                  Tizimga kirish
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Avval ro‘yxatdan o‘tgan profilingizga kiring
                </p>
              </div>

              {/* Role Tab Selector: Ish qidiruvchi vs Xodim qidiruvchi */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('job_seeker');
                    setSignInError(null);
                  }}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedRole === 'job_seeker'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Ish qidiruvchi</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('employer');
                    setSignInError(null);
                  }}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedRole === 'employer'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Xodim qidiruvchi</span>
                </button>
              </div>

              {signInError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{signInError}</span>
                </div>
              )}

              <form onSubmit={handleSignInSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Telefon raqam yoki Elektron pochta
                  </label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Maxfiy Parol
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-10.5 mt-2 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  {selectedRole === 'job_seeker' ? 'Talaba profiliga kirish' : 'Ish beruvchi kabinetiga kirish'}
                </button>
              </form>

              {/* Bottom Switcher */}
              <div className="pt-2 text-center text-xs text-stone-500 border-t border-stone-100 flex flex-col gap-2">
                <div>
                  <span>Profilingiz yo‘qmi? </span>
                  <button
                    type="button"
                    onClick={() => setMode('role_selection')}
                    className="font-bold text-[#0066FF] hover:underline cursor-pointer"
                  >
                    Ro‘yxatdan o‘tish
                  </button>
                </div>

                {/* Direct Admin Access Link */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAdminLogin();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 text-stone-600 hover:text-stone-950 font-semibold py-1 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer text-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                  <span>Administrator portali orqali kirish (Alohida link) →</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
