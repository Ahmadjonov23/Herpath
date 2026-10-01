import React, { useMemo } from 'react';
import { Job } from '../types';
import { JobCard } from './JobCard';
import {
  Search, ShieldCheck, MapPin,
  ChevronRight, Users, Map, Clock, Navigation,
  Sunrise, Sun, Moon, GraduationCap, Laptop, Sparkles, Briefcase
} from 'lucide-react';

interface HomeViewProps {
  userName: string;
  recommendedJobs: Job[];
  savedJobIds: Set<string>;
  onSelectJob: (job: Job) => void;
  onSaveToggle: (jobId: string, e: React.MouseEvent) => void;
  onVerifyClick: (job: Job, e: React.MouseEvent) => void;
  onNavigateToMap: () => void;
  onNavigateToJobs: (filterPreset?: string) => void;
  onNavigateToCompanions: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userName,
  recommendedJobs,
  savedJobIds,
  onSelectJob,
  onSaveToggle,
  onVerifyClick,
  onNavigateToMap,
  onNavigateToJobs,
  onNavigateToCompanions
}) => {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        text: 'Hayrli tong',
        icon: Sunrise,
        iconColor: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-200'
      };
    } else if (hour >= 12 && hour < 18) {
      return {
        text: 'Hayrli kun',
        icon: Sun,
        iconColor: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-200'
      };
    } else {
      return {
        text: 'Hayrli kech',
        icon: Moon,
        iconColor: 'text-indigo-400',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200'
      };
    }
  }, []);

  const GreetingIcon = greeting.icon;

  return (
    <div className="space-y-6">
      {/* Editorial Header Greeting & Search Section */}
      <section className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2.5 mb-1">
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center border ${greeting.bg} ${greeting.border} shrink-0`}>
              <GreetingIcon className={`w-4 h-4 ${greeting.iconColor}`} />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              {greeting.text}, {userName.split(' ')[0]}
            </h1>
          </div>
          <p className="text-sm text-stone-600 mt-1 mb-4">
            Bugun siz uchun <span className="font-semibold text-stone-900">{recommendedJobs.length > 0 ? `${recommendedJobs.length} ta mos imkoniyat` : 'yangi xavfsiz imkoniyatlar tez orada'}</span> mavjud.
          </p>

          {/* Search Trigger Input Bar */}
          <div
            onClick={() => onNavigateToJobs()}
            className="flex items-center gap-3 px-3.5 py-2.5 bg-stone-50 hover:bg-stone-100/90 border border-stone-200 rounded-lg cursor-pointer transition-colors group"
          >
            <Search className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors" />
            <span className="text-xs sm:text-sm text-stone-500 font-normal flex-1">
              Qanday ish izlayapsiz? Masalan: ingliz tili, SMM, call center...
            </span>
            <span className="text-xs font-semibold text-[#802244] hidden sm:inline">
              Qidirish →
            </span>
          </div>

          {/* Quick Filters with Real Lucide Icons */}
          <div className="flex items-center gap-2 mt-3.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-stone-400 font-medium shrink-0">Filtrlar:</span>
            <button
              onClick={() => onNavigateToJobs('talaba')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#802244]" />
              <span>Talaba uchun</span>
            </button>
            <button
              onClick={() => onNavigateToJobs('part-time')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-stone-600" />
              <span>Yarim kunlik</span>
            </button>
            <button
              onClick={() => onNavigateToJobs('remote')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              <Laptop className="w-3.5 h-3.5 text-sky-600" />
              <span>Masofaviy</span>
            </button>
            <button
              onClick={() => onNavigateToJobs('tajribasiz')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Tajribasiz</span>
            </button>
            <button
              onClick={() => onNavigateToJobs('uyga-yaqin')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Uyga yaqin</span>
            </button>
          </div>
        </div>
      </section>

      {/* Two Column Grid: Safe Route Hub + Contextual Safety Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Section 7.D: Safe Route Card */}
        <section className="lg:col-span-2 bg-white rounded-xl border border-stone-200 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Bugungi yo‘lingiz
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Xavfsizlik: Yuqori
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-stone-900 mb-1">
              Universitet → Ish joyi (Bright Academy)
            </h2>

            <div className="flex items-center gap-2 text-xs text-stone-600 mb-4">
              <span className="font-semibold text-stone-800">3.2 km</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>taxminan 38 daqiqa piyoda</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-emerald-800 font-medium">Yoritilgan piyodalar xiyoboni orqali</span>
            </div>

            {/* Linear route track */}
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 mb-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#802244]" />
                <span className="font-semibold text-stone-800">Kokand University</span>
              </div>
              <div className="flex-1 mx-3 flex items-center">
                <div className="h-0.5 w-full bg-emerald-500/50 relative">
                  <div className="absolute left-1/2 -top-1 w-2.5 h-2.5 rounded-full bg-emerald-700" title="Novza metro bekati" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span className="font-semibold text-stone-800">Bright Academy</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
            <div className="flex items-center gap-1.5 text-xs text-stone-600 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Yorug‘ hudud</span>
              <span className="text-stone-300">·</span>
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
              <span>3 ta tasdiqlangan xavfsiz nuqta yo‘nalishda</span>
            </div>
            <button
              onClick={onNavigateToMap}
              className="h-9 px-4 rounded-lg bg-[#802244] hover:bg-[#6c1d39] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              <Map className="w-3.5 h-3.5" />
              <span>Xavfsiz yo‘lni ko‘rish</span>
            </button>
          </div>
        </section>

        {/* Section 7.E: Safety Status & Contextual Hub */}
        <section className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-stone-900">
                Yo‘l xavfsizligi ko‘rsatkichlari
              </h3>
            </div>

            <div className="space-y-2.5 mb-4 text-xs">
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <div>
                  <span className="font-semibold text-stone-900 block">3 ta xavfsiz nuqta mavjud</span>
                  <span className="text-stone-500 text-[11px]">Novza metro, Grand dorixona (24/7), IIB tayanch maskani</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex items-start gap-2">
                <Users className="w-4 h-4 text-[#802244] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">2 nafar hamroh yo‘nalishda</span>
                  <span className="text-stone-500 text-[11px]">17:15 – 17:45 oraliqda birga ketish taklifini yuborish mumkin</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToCompanions}
            className="w-full h-9 rounded-lg border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#802244]" />
            <span>Hamrohlarni ko‘rish</span>
          </button>
        </section>
      </div>

      {/* Recommended Jobs Section */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
              Tavsiya etilgan ish o‘rinlari
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Dars jadvalingiz va xavfsiz transport marshrutlariga mos tekshirilgan vakansiyalar
            </p>
          </div>

          <button
            onClick={() => onNavigateToJobs()}
            className="text-xs font-semibold text-[#802244] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Barchasi ({recommendedJobs.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Job Cards Grid */}
        {recommendedJobs.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-8 text-center space-y-2">
            <Briefcase className="w-8 h-8 text-stone-300 mx-auto" />
            <h4 className="text-sm font-bold text-stone-800">Hozircha faol ish e’lonlari mavjud emas</h4>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Ish beruvchilar xavfsizlik auditidan o‘tgandan so‘ng yangi kafolatlangan vakansiyalar shu yerda ko‘rinadi.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedJobs.slice(0, 6).map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobIds.has(job.id)}
                onSelect={onSelectJob}
                onSaveToggle={onSaveToggle}
                onVerifyClick={onVerifyClick}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
