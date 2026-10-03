import React, { useState } from 'react';
import {
  ShieldCheck, CheckCircle2, AlertTriangle, FileCheck, Building,
  Eye, Users, Check, X, Search, Clock, LogOut, ArrowRight,
  Briefcase, CheckSquare, XCircle, SlidersHorizontal, ShieldAlert, Sparkles
} from 'lucide-react';
import { Job } from '../types';

interface AdminVerificationViewProps {
  onLogoutAdmin?: () => void;
  jobs?: Job[];
  onApproveJob?: (jobId: string) => void;
  onRejectJob?: (jobId: string) => void;
}

export const AdminVerificationView: React.FC<AdminVerificationViewProps> = ({
  onLogoutAdmin,
  jobs = [],
  onApproveJob,
  onRejectJob
}) => {
  const [activeTab, setActiveTab] = useState<'audits' | 'job_moderation' | 'stats'>('audits');

  // Employers under audit
  const [auditedCompanies, setAuditedCompanies] = useState([
    {
      id: 'cmp-1',
      name: 'Kokand Textile Fabrikasi MCHJ',
      inn: '305 482 910',
      category: 'To‘qimachilik va Tikuvchilik (Textile Fabrikasi)',
      location: 'Qo‘qon shahri, Yangi Chorsu ko‘chasi 18-uy (Sanoat hududi)',
      status: 'verified',
      auditScore: 100,
      physicalAuditDate: '2026-yil 12-fevral',
      cctv: true,
      transport: true,
      femaleStaffRatio: '88%',
      permitDoc: 'davlat_ruxsatnomasi_kokand_textile_2026.pdf (Tekshirilgan)'
    },
    {
      id: 'cmp-2',
      name: 'Qo‘qon Milliy Taomlar & Saroy Restorani',
      inn: '305 119 402',
      category: 'Restoran va Umumiy ovqatlanish',
      location: 'Qo‘qon shahri, Istiqlol ko‘chasi 45',
      status: 'verified',
      auditScore: 99,
      physicalAuditDate: '2026-yil 18-mart',
      cctv: true,
      transport: true,
      femaleStaffRatio: '85%',
      permitDoc: 'restoran_litsenziya_kokand.pdf (Tekshirilgan)'
    },
    {
      id: 'cmp-3',
      name: 'Qo‘qon Aloqa & Contact Center (BPO)',
      inn: '307 882 119',
      category: 'Call center & BPO',
      location: 'Qo‘qon shahri, Turkiston ko‘chasi 88',
      status: 'verified',
      auditScore: 98,
      physicalAuditDate: '2026-yil 12-mart',
      cctv: true,
      transport: true,
      femaleStaffRatio: '92%',
      permitDoc: 'bpo_aloqa_guvohnoma.pdf (Tekshirilgan)'
    },
    {
      id: 'cmp-4',
      name: 'Kokand Bright Academy',
      inn: '308 214 902',
      category: 'O‘quv markazi',
      location: 'Qo‘qon shahri, Turkiston ko‘chasi 24',
      status: 'verified',
      auditScore: 96,
      physicalAuditDate: '2026-yil 15-mart',
      cctv: true,
      transport: true,
      femaleStaffRatio: '88%',
      permitDoc: 'ntm_litsenziya_kba.pdf (Tekshirilgan)'
    }
  ]);

  const handleToggleVerification = (companyId: string) => {
    setAuditedCompanies(prev =>
      prev.map(c => {
        if (c.id === companyId) {
          const nextStatus = c.status === 'verified' ? 'pending' : 'verified';
          return { ...c, status: nextStatus, auditScore: nextStatus === 'verified' ? 98 : 80 };
        }
        return c;
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Top Admin Brand & Identity Bar */}
      <div className="bg-[#0A192F] text-white rounded-2xl p-5 sm:p-6 shadow-md border border-[#1E293B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold bg-teal-900/60 px-2.5 py-0.5 rounded border border-teal-700">
                  SUPER ADMIN
                </span>
                <span className="text-xs text-stone-300 font-mono">admin@soatbay.uz</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                Soatbay Boshqaruv & Audit Konsoli
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {onLogoutAdmin && (
              <button
                type="button"
                onClick={onLogoutAdmin}
                className="h-8.5 px-3 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Chiqish</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/10 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('audits')}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'audits'
                ? 'bg-teal-500 text-[#0A192F] font-bold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Kompaniyalar Auditi ({auditedCompanies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('job_moderation')}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'job_moderation'
                ? 'bg-teal-500 text-[#0A192F] font-bold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>E’lonlar Moderatsiyasi ({jobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'stats'
                ? 'bg-teal-500 text-[#0A192F] font-bold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Platforma Statistikasi</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. EMPLOYERS AUDIT & VERIFICATION TAB                         */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'audits' && (
        <div className="space-y-4">
          {/* Audit Protocol Standards Pipeline */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
              5 Bosqichli Xavfsizlik Auditi Standartlari
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-[#0A192F] block">1. STIR (INN)</span>
                <span className="text-[11px] text-stone-500">Soliq va yuridik ro‘yxat</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-[#0A192F] block">2. Manzil tekshiruvi</span>
                <span className="text-[11px] text-stone-500">Yoritilgan ko‘cha va ofis</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-[#0A192F] block">3. Videokuzatuv</span>
                <span className="text-[11px] text-stone-500">24/7 CCTV va turniket</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-[#0A192F] block">4. Transport kafolati</span>
                <span className="text-[11px] text-stone-500">Kechki smena taksi xizmati</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-[#0A192F] block">5. Jamoa balansi</span>
                <span className="text-[11px] text-stone-500">Kamida 30% ayollar ulushi</span>
              </div>
            </div>
          </div>

          {/* Companies Verification Table */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Ro‘yxatdan o‘tgan korxonalar va verifikatsiya holati
                </h3>
                <p className="text-xs text-stone-500">
                  Audit natijalari bo‘yicha vakansiyalar e’lon qilish huquqini boshqarish
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10.5px]">
                    <th className="pb-2.5 font-bold">Kompaniya nomi</th>
                    <th className="pb-2.5 font-bold">STIR (INN)</th>
                    <th className="pb-2.5 font-bold">Soha</th>
                    <th className="pb-2.5 font-bold">Xavfsizlik balli</th>
                    <th className="pb-2.5 font-bold">Audit holati</th>
                    <th className="pb-2.5 font-bold text-right">Admin amali</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {auditedCompanies.map((comp) => (
                    <tr key={comp.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#0A192F] text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {comp.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-stone-900 block">{comp.name}</span>
                            <span className="text-[11px] text-stone-500">{comp.location}</span>
                            {comp.permitDoc && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded mt-0.5 border border-emerald-200">
                                <span>📄 {comp.permitDoc}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-3 font-mono font-medium text-stone-700">
                        {comp.inn}
                      </td>
                      <td className="py-3.5 pr-3 text-stone-600">
                        {comp.category}
                      </td>
                      <td className="py-3.5 pr-3">
                        <span className="font-mono font-bold text-stone-900">
                          {comp.auditScore} / 100
                        </span>
                      </td>
                      <td className="py-3.5 pr-3">
                        {comp.status === 'verified' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            <span>Tasdiqlangan</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Audit kutilmoqda</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => handleToggleVerification(comp.id)}
                          className={`h-7.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs ${
                            comp.status === 'verified'
                              ? 'border border-stone-200 text-stone-700 hover:bg-stone-100'
                              : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                          }`}
                        >
                          {comp.status === 'verified' ? 'Qayta ko‘rib chiqish' : 'Auditni tasdiqlash'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. JOB POSTINGS MODERATION TAB                                */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'job_moderation' && (
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Ish beruvchilar kiritgan e’lonlar ({jobs.length} ta)
              </h3>
              <p className="text-xs text-stone-500">
                Har bir vakansiya xavfsizlik va grafik talablariga muvofiqligi tekshiriladi
              </p>
            </div>
          </div>

          {jobs.length === 0 ? (
            <div className="p-10 text-center space-y-2 text-stone-500 text-xs">
              <Briefcase className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="font-semibold text-stone-700">Hozircha moderatsiyada vakansiyalar yo‘q</p>
              <p>Ish beruvchilar yangi vakansiya kiritganda shu yerda ko‘rinadi.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {jobs.map((job) => (
                <div key={job.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">{job.title}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-semibold">
                        {job.schedule}
                      </span>
                    </div>
                    <div className="text-stone-500 flex items-center gap-2">
                      <span className="font-medium text-stone-800">{job.company}</span>
                      <span>·</span>
                      <span>{job.location}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-semibold">
                        {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()} so‘m
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <button
                      onClick={() => onApproveJob ? onApproveJob(job.id) : null}
                      className="h-8 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Tasdiqlash</span>
                    </button>
                    <button
                      onClick={() => onRejectJob ? onRejectJob(job.id) : null}
                      className="h-8 px-3 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Rad etish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. PLATFORM OVERSIGHT & METRICS TAB                           */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Ro‘yxatdagi Talabalar</span>
              <Users className="w-4 h-4 text-[#802244]" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900 font-mono">
              4,280+
            </div>
            <span className="text-[11px] text-emerald-700 font-medium block mt-1">
              Faol ish qidiruvchilar
            </span>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Tasdiqlangan Korxonalar</span>
              <Building className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900 font-mono">
              {auditedCompanies.filter(c => c.status === 'verified').length} ta
            </div>
            <span className="text-[11px] text-emerald-700 font-medium block mt-1">
              Auditdan to‘liq o‘tgan
            </span>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Faol Vakansiyalar</span>
              <Briefcase className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900 font-mono">
              {jobs.length} ta
            </div>
            <span className="text-[11px] text-stone-500 font-medium block mt-1">
              Talabalar uchun ochiq
            </span>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Xavfsizlik Indeksi</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900 font-mono">
              98.6%
            </div>
            <span className="text-[11px] text-emerald-700 font-medium block mt-1">
              ISO-HP 2026.1 standarti
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
