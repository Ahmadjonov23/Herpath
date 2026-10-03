import React, { useState } from 'react';
import { UNIVERSITY_PARTNERS } from '../data/mockData';
import {
  GraduationCap, Building, ShieldCheck, CheckCircle2,
  Users, ArrowRight, BookOpen, Send, Check
} from 'lucide-react';

interface UniversityPartnersViewProps {
  onExploreUniversityJobs: () => void;
}

export const UniversityPartnersView: React.FC<UniversityPartnersViewProps> = ({
  onExploreUniversityJobs
}) => {
  const [partnerRequestSent, setPartnerRequestSent] = useState(false);
  const [uniName, setUniName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerRequestSent(true);
  };

  const categories = [
    { name: 'Xususiy maktablar', desc: 'Boshlang‘ich sinf repetitorligi' },
    { name: 'Maktabgacha ta’lim', desc: 'Ingliz tili va rivojlanish' },
    { name: 'O‘quv markazlari', desc: 'IELTS / CEFR mentorlik' },
    { name: 'Call-markazlar', desc: 'Kunlik 4 soatlik mos grafik' },
    { name: 'Masofaviy ta’lim', desc: 'Online dars va SMM' },
    { name: 'Universitet ichi', desc: 'Kutubxona va laboratoriya' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-5 h-5 text-[#802244]" />
              <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                Universitet hamkorliklari
              </h1>
            </div>
            <p className="text-xs text-stone-600">
              O‘zbekiston oliy ta’lim muassasalari bilan tuzilgan memorandumlarga muvofiq talaba qizlar uchun tasdiqlangan, dars jadvaliga xalaqit bermaydigan ish o‘rinlari.
            </p>
          </div>

          <button
            onClick={onExploreUniversityJobs}
            className="h-8.5 px-3 rounded-lg bg-[#802244] text-white text-xs font-semibold hover:bg-[#6c1d39] flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0 cursor-pointer"
          >
            <span>Talaba ishlarini ko‘rish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Clean student job categories */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {categories.map((c, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
              <span className="font-semibold text-stone-900 block truncate">{c.name}</span>
              <span className="text-[10.5px] text-stone-500 block truncate mt-0.5">{c.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* University Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {UNIVERSITY_PARTNERS.map((uni) => (
          <div
            key={uni.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 text-[#802244] font-bold text-sm flex items-center justify-center shrink-0">
                  {uni.logoInitial}
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  {uni.badge}
                </span>
              </div>

              <h2 className="text-sm font-bold text-stone-900 leading-snug mb-1">
                {uni.name}
              </h2>
              <span className="text-xs text-stone-400 block mb-2.5">
                {uni.city} · {uni.studentsCount} talaba
              </span>

              <p className="text-xs text-stone-600 leading-relaxed mb-3.5">
                {uni.description}
              </p>
            </div>

            <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">
                {uni.verifiedJobsCount} ta tasdiqlangan o‘rin
              </span>
              <button
                onClick={onExploreUniversityJobs}
                className="text-[#802244] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Vakansiyalar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Partnership Proposal Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-stone-100 text-stone-800 text-xs font-semibold mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#802244]" />
            <span>OTM ma’muriyati va xotin-qizlar qo‘mitasi uchun</span>
          </div>

          <h2 className="text-lg font-bold text-stone-900 tracking-tight mb-1.5">
            Universitetingiz bilan hamkorlik memorandumi
          </h2>

          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            Talaba qizlarning o‘qishdan bo‘sh vaqtlarida xavfsiz va kafolatlangan daromad manbaiga ega bo‘lishlarini qo‘llab-quvvatlaymiz. Har bir ish beruvchi talaba dars jadvaliga muvofiq tekshiruvdan o‘tkaziladi.
          </p>

          {partnerRequestSent ? (
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Hamkorlik so‘rovi qabul qilindi. Soatbay muvofiqlashtiruvchisi tez orada siz bilan bog‘lanadi.</span>
            </div>
          ) : (
            <form onSubmit={handlePartnerSubmit} className="space-y-2.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="OTM nomi (Masalan: O‘zMU)"
                  value={uniName}
                  onChange={(e) => setUniName(e.target.value)}
                  required
                  className="p-2 rounded-md border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#802244]"
                />
                <input
                  type="text"
                  placeholder="Mas’ul shaxs (F.I.SH)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  className="p-2 rounded-md border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#802244]"
                />
                <input
                  type="tel"
                  placeholder="Telefon raqami"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                  className="p-2 rounded-md border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#802244]"
                />
              </div>
              <button
                type="submit"
                className="h-8.5 px-4 rounded-lg bg-[#802244] hover:bg-[#6c1d39] text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Hamkorlik arizasini jo‘natish</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
