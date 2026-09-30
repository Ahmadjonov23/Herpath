import React, { useState } from 'react';
import {
  Building2, Users, Eye, Bookmark, Plus, CheckCircle2,
  Calendar, MessageSquare, ShieldCheck, ArrowRight, X, Clock, MapPin, Briefcase
} from 'lucide-react';

interface EmployerDashboardViewProps {
  onSwitchToStudent: () => void;
  onOpenChat: (candidateName: string) => void;
}

export const EmployerDashboardView: React.FC<EmployerDashboardViewProps> = ({
  onSwitchToStudent,
  onOpenChat
}) => {
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [candidates, setCandidates] = useState([
    {
      id: 'c-1',
      name: 'Dilnoza Karimova',
      university: 'Kokand University, 3-kurs',
      appliedFor: 'English Tutor & Speaking Club Mentor',
      date: '24-mart, 2026',
      status: 'interview',
      statusText: 'Suhbat belgilangan (28-mart, 15:00)',
      matchScore: 98
    },
    {
      id: 'c-2',
      name: 'Shahzoda Rahimova',
      university: 'O‘zDJTU, 4-kurs',
      appliedFor: 'English Tutor & Speaking Club Mentor',
      date: '25-mart, 2026',
      status: 'reviewing',
      statusText: 'Ko‘rib chiqilmoqda',
      matchScore: 92
    },
    {
      id: 'c-3',
      name: 'Ziyoda Yoqubova',
      university: 'TDPU, 2-kurs',
      appliedFor: 'Speaking Club Mentor (Kechki)',
      date: '22-mart, 2026',
      status: 'accepted',
      statusText: 'Qabul qilindi',
      matchScore: 95
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: '',
    category: 'O‘quv markazi',
    schedule: '15:00 – 18:30',
    salaryMin: '3 500 000',
    salaryMax: '5 000 000',
    location: 'Chilonzor tumani, Bunyodkor shox ko‘chasi 14',
    eveningTransport: true
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCreateJobModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Top Bar for Employer Portal */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-stone-900 text-white font-bold text-base flex items-center justify-center shrink-0">
            BA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                Bright Academy
              </h1>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Tekshirilgan ish beruvchi</span>
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Toshkent shahri · O‘quv markazi tarmog‘i · STIR: 308 214 902
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateJobModal(true)}
            className="h-8.5 px-3 rounded-lg bg-[#802244] hover:bg-[#6c1d39] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yangi vakansiya</span>
          </button>
          <button
            onClick={onSwitchToStudent}
            className="h-8.5 px-3 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Talaba ko‘rinishi
          </button>
        </div>
      </div>

      {/* 4 Core Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Faol e’lonlar */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[10.5px]">Faol e’lonlar</span>
            <Briefcase className="w-3.5 h-3.5 text-stone-400" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            3 ta
          </div>
          <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
            Barchasi talabalar uchun
          </span>
        </div>

        {/* Arizalar */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[10.5px]">Arizalar</span>
            <Users className="w-3.5 h-3.5 text-stone-400" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            18 ta
          </div>
          <span className="text-[11px] text-[#802244] font-medium block mt-0.5">
            +4 ta yangi ko‘rilmagan
          </span>
        </div>

        {/* Ko‘rilishlar */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[10.5px]">Ko‘rilishlar</span>
            <Eye className="w-3.5 h-3.5 text-stone-400" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            142 marta
          </div>
          <span className="text-[11px] text-stone-400 font-medium block mt-0.5">
            So‘nggi 7 kunda
          </span>
        </div>

        {/* Suhbatlar */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[10.5px]">Suhbatlar</span>
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            5 ta
          </div>
          <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
            Jadval bo‘yicha
          </span>
        </div>
      </div>

      {/* Candidates Management Table */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 mb-4">
          <div>
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Nomzodlar arizalari ({candidates.length})
            </h2>
            <p className="text-xs text-stone-500">
              Vakansiyangizga qiziqish bildirgan talaba qizlarning ma’lumotlari
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10.5px]">
                <th className="pb-2.5 font-bold">Nomzod</th>
                <th className="pb-2.5 font-bold">Vakansiya</th>
                <th className="pb-2.5 font-bold">Sana</th>
                <th className="pb-2.5 font-bold">Holat</th>
                <th className="pb-2.5 font-bold text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {candidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-[#802244] text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {cand.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-stone-900 block">{cand.name}</span>
                        <span className="text-[11px] text-stone-500">{cand.university}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-3 text-stone-700 font-medium">
                    {cand.appliedFor}
                  </td>
                  <td className="py-3 pr-3 text-stone-500 font-mono text-[11px]">
                    {cand.date}
                  </td>
                  <td className="py-3 pr-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        cand.status === 'interview'
                          ? 'bg-[#802244]/10 text-[#802244]'
                          : cand.status === 'accepted'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {cand.statusText}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onOpenChat(cand.name)}
                      className="h-7.5 px-2.5 rounded-md border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-[11px] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3 text-[#802244]" />
                      <span>Suhbat</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Yangi vakansiya joylashtirish */}
      {showCreateJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden animate-in fade-in">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Yangi vakansiya joylashtirish
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
                <label className="block font-semibold text-stone-700 mb-1">Lavozim nomi</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Boshlang‘ich guruhlar uchun Speaking Mentor"
                  className="w-full p-2.5 rounded-md border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#802244]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Ish vaqti</label>
                  <input
                    type="text"
                    defaultValue="15:00 – 18:30 (Part-time)"
                    className="w-full p-2.5 rounded-md border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#802244]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Maosh (so‘m)</label>
                  <input
                    type="text"
                    defaultValue="3 000 000 – 4 500 000"
                    className="w-full p-2.5 rounded-md border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#802244]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Aniq manzil</label>
                <input
                  type="text"
                  defaultValue="Chilonzor tumani, Bunyodkor shox ko‘chasi 14"
                  className="w-full p-2.5 rounded-md border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#802244]"
                />
              </div>

              {/* Safety Assurance Checkboxes */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                <span className="font-bold text-stone-800 block text-[11px] uppercase tracking-wider">
                  Xavfsizlik majburiyatlari (Audit tekshiruvi)
                </span>
                <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                  <input type="checkbox" defaultChecked className="w-3.5 h-3.5 text-[#802244] accent-[#802244]" />
                  <span>Ish joyida videokuzatuv va administrator mavjud</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                  <input type="checkbox" defaultChecked className="w-3.5 h-3.5 text-[#802244] accent-[#802244]" />
                  <span>Kechki smena tugaganda xodimlar uchun taksi/transport ta’minlanadi</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateJobModal(false)}
                  className="px-3.5 py-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#802244] hover:bg-[#6c1d39] text-white font-semibold cursor-pointer"
                >
                  Moderatsiyaga yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
