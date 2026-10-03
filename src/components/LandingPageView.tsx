import React, { useState } from 'react';
import { Job, UserRole } from '../types';
import {
  Search, MapPin, ArrowRight, ShieldCheck, CheckCircle2,
  Building2, Users, Briefcase, GraduationCap, ChevronRight,
  Sparkles, Smartphone, Download, Star, Clock, Lock, Award
} from 'lucide-react';
import { SoatbayLogoIcon } from './SoatbayLogoIcon';

interface LandingPageViewProps {
  jobs?: Job[];
  savedJobIds?: Set<string>;
  onSelectJob?: (job: Job) => void;
  onSaveToggle?: (jobId: string, e?: React.MouseEvent) => void;
  onVerifyClick?: (job: Job, e?: React.MouseEvent) => void;
  onOpenAuth: (mode?: 'role_selection' | 'register_details' | 'sign_in', initialRole?: 'job_seeker' | 'employer', phone?: string) => void;
  onExploreJobs: (filterPreset?: string) => void;
  activeRoleTab?: 'job_seeker' | 'employer';
  onChangeRoleTab?: (role: 'job_seeker' | 'employer') => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onOpenAuth,
  onExploreJobs,
  activeRoleTab = 'job_seeker'
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCity, setSelectedCity] = useState('Qo‘qon');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = phoneNumber.trim() || '+998 90 123 45 67';
    onOpenAuth('register_details', 'job_seeker', formatted);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExploreJobs(searchKeyword);
  };

  const popularKeywords = [
    'Kokand University yaqinida',
    'Ingliz tili speaking mentori',
    'Boshlang‘ich sinf repetitori',
    'Part-time (15:00 dan so‘ng)',
    'Turkiston ko‘chasi',
    'Qo‘qon IT markazi'
  ];

  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO BANNER (100% ISHONCHLI, RASM XATOLIKLARISIZ)             */}
      {/* ========================================================================= */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0A0F1D] border border-stone-800">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content Container: 2-ustunli kompozitsiya */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-10 sm:py-14 lg:py-16 flex flex-col justify-between min-h-[460px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Chap tomon: Sarlavha, Telefon kiritish va Aniq ma'lumot */}
            <div className="lg:col-span-7 space-y-5">
              {/* Yuqori xavfsizlik va rasmiy platforma ko'rsatkichi */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-rose-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Qo‘qon shahri talaba qizlari uchun rasmiy xavfsiz ish platformasi</span>
              </div>

              {/* Headline Text */}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.25]">
                  Telefon raqamingizni qoldiring, ish beruvchilar sizga mos ish taklif qilishlari mumkin
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 font-normal leading-relaxed">
                  Kokand University va boshqa OTM talabalari uchun darsdan keyingi part-time vakansiyalar, 100% videokuzatuv va tekshirilgan rasmiy ish beruvchilar.
                </p>
              </div>

              {/* Interactive Phone Input Bar */}
              <div className="max-w-xl space-y-2">
                <form onSubmit={handlePhoneSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Telefon raqami (+998)"
                      className="w-full h-12 px-4 rounded-xl bg-white text-stone-900 text-sm font-medium placeholder-stone-400 focus:outline-none focus:ring-3 focus:ring-[#0066FF] shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    className="h-12 px-7 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] active:scale-[0.98] text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Davom etish</span>
                  </button>
                </form>

                {/* Legal consent note */}
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  “Davom etish” tugmasini bosish orqali siz{' '}
                  <button
                    type="button"
                    onClick={() => onOpenAuth('role_selection')}
                    className="underline hover:text-white transition-colors cursor-pointer"
                  >
                    kelishuvlar
                  </button>{' '}
                  shartlarini o‘qib chiqqaningizni, to‘liq roziligingizni va qabul qilganingizni tasdiqlaysiz.
                </p>
              </div>
            </div>

            {/* O'ng tomon: Ishchi/talaba qiz illustratsiyasi va xavfsiz ish kartochkasi (100% inline SVG & Vector, hech qachon buzilmaydi) */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md p-4 shadow-2xl space-y-3.5">
                {/* Ishchi talaba qiz illustratsion banneri */}
                <div className="relative h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-[#802244]/80 via-[#4A1525]/90 to-[#1E1B4B] border border-white/20 p-4 flex flex-col justify-between shadow-inner">
                  {/* Floating Badges */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Kokand University</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tasdiqlangan</span>
                    </span>
                  </div>

                  {/* Markaziy rasmiy Soatbay logosi (shaffof fonli ayol silueti va kasb-hunar ramzlari) */}
                  <div className="flex items-center justify-center py-2">
                    <div className="relative">
                      {/* Aura glow */}
                      <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full" />
                      
                      {/* Vektor qahramon rasmiy logosi */}
                      <div className="relative w-28 h-28 rounded-2xl bg-white/10 border border-white/25 backdrop-blur-md flex items-center justify-center text-white shadow-2xl p-2">
                        <SoatbayLogoIcon size={84} inverted={true} className="drop-shadow-md" />
                      </div>
                    </div>
                  </div>

                  {/* Pastki yorliq */}
                  <div className="flex items-center justify-between text-[11px] text-white/90">
                    <span className="font-bold flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                      <span>Talaba qizlar va yosh mutaxassislar</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300 bg-black/40 px-2 py-0.5 rounded">
                      Part-time
                    </span>
                  </div>
                </div>

                {/* Kartochka tavsifi */}
                <div className="space-y-2 p-1 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold tracking-tight">O‘quv markazi ingliz tili mentori</span>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-800 px-2 py-0.5 rounded">
                      15:00 – 18:30
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-snug">
                    Dars jadvaliga moslashtirilgan grafik, videokuzatuvli shinam xonalar va rasmiy kafolat.
                  </p>
                  
                  {/* Qulaylik ko'rsatkichlari */}
                  <div className="pt-1 flex items-center gap-2 text-[10px] font-semibold text-stone-300 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-300" /> Moslashuvchan
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-rose-300" /> CCTV nazorati
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Qo‘qon shahri mavjud vakansiyalar haqida lo‘nda ma’lumot (miqdorlarsiz) & App Store Badges */}
          <div className="pt-6 mt-6 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            {/* Qo‘qon shahridagi mavjud vakansiyalar haqida lo‘nda va aniq ma’lumot (uzun matnsiz, miqdorlarsiz) */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl max-w-xl space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Hozirda Qo‘qon shahridagi mavjud vakansiyalar</span>
                </span>
              </div>

              <p className="text-xs text-stone-200 leading-relaxed">
                Kokand University va boshqa OTM talabalari uchun darsdan keyingi (part-time) o‘quv markazlari, xususiy maktablar, IT studiyalari va servis sohalarida qulay grafikli ish o‘rinlari mavjud. Barcha ish joylarida videokuzatuv va xavfsiz sharoitlar kafolatlanadi.
              </p>
            </div>

            {/* App Store Download Badges */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* App Store */}
              <div className="h-10 px-3 rounded-lg bg-black/60 hover:bg-black/90 border border-white/15 flex items-center gap-2 text-white cursor-pointer transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.74 1.04-1.77.92-2.81-.9.04-1.99.6-2.64 1.36-.58.67-.99 1.74-.86 2.76 1.01.08 2.02-.51 2.58-1.31" />
                </svg>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-stone-400 leading-none">Yuklab oling</div>
                  <div className="text-[11px] font-bold leading-tight">App Store</div>
                </div>
              </div>

              {/* Google Play */}
              <div className="h-10 px-3 rounded-lg bg-black/60 hover:bg-black/90 border border-white/15 flex items-center gap-2 text-white cursor-pointer transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.67.4.67 1.36 0 1.76l-14 8.5c-.66.5-1.6.03-1.6-.96z" />
                </svg>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-stone-400 leading-none">Yuklab oling</div>
                  <div className="text-[11px] font-bold leading-tight">Google Play</div>
                </div>
              </div>

              {/* AppGallery */}
              <div className="h-10 px-3 rounded-lg bg-black/60 hover:bg-black/90 border border-white/15 flex items-center gap-2 text-white cursor-pointer transition-colors">
                <div className="w-4 h-4 rounded bg-[#802244] flex items-center justify-center text-[10px] font-bold text-white">HP</div>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-stone-400 leading-none">Oching</div>
                  <div className="text-[11px] font-bold leading-tight">AppGallery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SEARCH BAR: "O‘ZBEKISTONDA ISH QIDIRISH"                               */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          O‘zbekistonda ish qidirish
        </h2>

        {/* Big Search Bar Container */}
        <form onSubmit={handleSearchSubmit} className="bg-white p-2 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch gap-2">
          {/* Keyword Search Input */}
          <div className="relative flex-1 flex items-center pl-3">
            <Search className="w-5 h-5 text-stone-400 shrink-0" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Kasb, lavozim yoki kompaniya nomi..."
              className="w-full h-11 pl-2.5 pr-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
            />
          </div>

          {/* Region / City Select */}
          <div className="flex items-center pl-3 pr-2 border-t md:border-t-0 md:border-l border-stone-200">
            <MapPin className="w-4 h-4 text-stone-400 shrink-0 mr-1.5" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="h-11 bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer pr-4"
            >
              <option value="Qo‘qon">Qo‘qon shahri</option>
              <option value="Toshkent">Toshkent shahri</option>
              <option value="Fargona">Farg‘ona</option>
              <option value="Andijon">Andijon</option>
              <option value="Namangan">Namangan</option>
            </select>
          </div>

          {/* Search Action Button */}
          <button
            type="submit"
            className="h-11 px-7 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] active:scale-[0.98] text-white font-bold text-xs tracking-wide transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Qidirish</span>
          </button>
        </form>

        {/* Popular Quick Search Tags */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-xs text-stone-500 font-medium">Mashhur so‘rovlar:</span>
          {popularKeywords.map((kw, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onExploreJobs(kw)}
              className="text-xs px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
            >
              {kw}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SAFETY & TRUST HIGHLIGHTS                                              */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 leading-tight">
              100% Rasmiy STIR Tekshiruvi
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Har bir kompaniya soliq idorasi va adliya ro‘yxatidan to‘liq audit qilinadi.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 leading-tight">
              Talabalar uchun moslashuvchan jadval
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Darsingizga xalaqit qilmaydigan part-time, masofaviy va 15:00 dan keyingi ishlar.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#802244] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 leading-tight">
              CCTV va Kechki Transport Kafolati
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Ish joyida videokuzatuv va kechki smenada xavfsiz transport ta’minoti majburiy.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CALL TO ACTION FOR BOTH PROFILES: IKKALA BUTTON HAM "Ro'yxatdan o'tish"  */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Talabalar uchun */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] bg-blue-100/70 px-2.5 py-0.5 rounded-md">
              Talaba qizlar uchun
            </span>
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              O‘z rezyumeingizni bepul yarating
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              OTM, fakultetingiz va bo‘sh soatlaringizni ko‘rsatib, 3 daqiqada rezyume to‘ldiring. Ish beruvchilar o‘zlari siz bilan bog‘lanishadi.
            </p>
          </div>

          <button
            onClick={() => onOpenAuth('register_details', 'job_seeker')}
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all self-start"
          >
            <span>Ro'yxatdan o'tish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2: Ish beruvchilar uchun */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-800 text-white border border-stone-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded-md">
              Ish beruvchilar uchun
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Iqtidorli talabalarni ishga oling
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              O‘quv markazingiz, maktabingiz yoki IT kompaniyangiz uchun intiluvchan yosh kadrlarni toping va rasmiy auditdan o‘ting.
            </p>
          </div>

          <button
            onClick={() => onOpenAuth('register_details', 'employer')}
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all self-start"
          >
            <span>Ro'yxatdan o'tish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
