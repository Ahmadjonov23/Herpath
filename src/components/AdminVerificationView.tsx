import React, { useState } from 'react';
import {
  ShieldCheck, CheckCircle2, AlertTriangle, FileCheck, Building,
  Eye, Users, Check, X, Search, Clock
} from 'lucide-react';

export const AdminVerificationView: React.FC = () => {
  const [selectedAudit] = useState({
    company: 'Apex BPO Aloqa Markazi',
    inn: '304 991 228',
    category: 'Call center',
    location: 'Yakkasaroy tumani, Shota Rustaveli ko‘chasi 53',
    steps: [
      { name: 'Yuridik shaxs (STIR) tekshiruvi', detail: 'Davlat soliq qo‘mitasi ochiq reestri orqali tasdiqlangan' },
      { name: 'Jismoniy ofis va manzil auditi', detail: 'HerPath inspektori tomonidan bevosita borib o‘rganilgan' },
      { name: 'Kuzatuv kameralari va turniket nazorati', detail: 'Barcha kirish va umumiy zonalarda CCTV mavjud' },
      { name: 'Kechki transport ta’minoti tekshiruvi', detail: 'Korporativ taksi shartnomasi rasmiylashtirilgan' },
      { name: 'Ayol xodimlar ulushi va xavfsiz muhit', detail: 'Jamoaning 72% ini ayollar tashkil etadi, alohida dam olish xonasi mavjud' }
    ],
    status: 'Tasdiqlangan',
    score: '98/100'
  });

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                HerPath Xavfsizlik Audit Tizimi
              </h1>
            </div>
            <p className="text-xs text-stone-600">
              Ish beruvchilar va ish o‘rinlarining talaba qizlar xavfsizligi talablariga muvofiqligini tekshirish konsoli
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-xs font-semibold text-stone-800 self-start sm:self-auto">
            <span>Standart:</span>
            <span className="font-mono text-emerald-800">ISO-HP 2026.1</span>
          </div>
        </div>

        {/* Audit Pipeline Stages */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs">
          <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">1-bosqich</span>
            <span className="font-bold text-stone-900 block mb-0.5">Yuridik shaxs (STIR)</span>
            <span className="text-stone-500 text-[11px]">Soliq qarzdorligi va davlat ro‘yxatidan o‘tganlik</span>
          </div>
          <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">2-bosqich</span>
            <span className="font-bold text-stone-900 block mb-0.5">Jismoniy manzil auditi</span>
            <span className="text-stone-500 text-[11px]">Ofisning xavfsiz ko‘chada joylashuvi va yoritilganligi</span>
          </div>
          <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">3-bosqich</span>
            <span className="font-bold text-stone-900 block mb-0.5">Kuzatuv & Nazorat</span>
            <span className="text-stone-500 text-[11px]">CCTV kameralar, qo‘riqlash xizmati mavjudligi</span>
          </div>
          <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">4-bosqich</span>
            <span className="font-bold text-stone-900 block mb-0.5">Kechki transport</span>
            <span className="text-stone-500 text-[11px]">Kechki smenalarda uyga xavfsiz yetkazish kafolati</span>
          </div>
        </div>
      </div>

      {/* Selected Company Audit Inspector */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Audit kartochkasi: {selectedAudit.company}
            </h2>
            <span className="text-xs text-stone-500">
              STIR: {selectedAudit.inn} · {selectedAudit.category} · {selectedAudit.location}
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            ✓ {selectedAudit.status} ({selectedAudit.score})
          </span>
        </div>

        <div className="space-y-2">
          {selectedAudit.steps.map((st, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-start justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-4.5 h-4.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <span className="font-bold text-stone-900 block">{st.name}</span>
                  <span className="text-stone-600 mt-0.5 block">{st.detail}</span>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                Muvofiq
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>Tekshiruv o‘tkazgan: HerPath Xavfsizlik Qo‘mitasi</span>
          <span className="font-medium text-stone-800">Qayta audit: Har 6 oyda</span>
        </div>
      </div>
    </div>
  );
};
