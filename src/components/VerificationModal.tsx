import React from 'react';
import { Job } from '../types';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, Building, Calendar, Users, Eye } from 'lucide-react';

interface VerificationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-4.5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900 leading-tight">
                Soatbay Tekshiruv Sertifikati
              </h2>
              <p className="text-[11px] text-stone-500">
                Ish beruvchi xavfsizligi va ishonchliligi auditi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-stone-800 text-xs">
          {/* Status summary banner */}
          <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-emerald-900">
                Tasdiqlangan va tekshirilgan ish beruvchi
              </div>
              <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                Ushbu korxona Soatbay platformasining talabalar va yoshlar uchun mo‘ljallangan xavfsizlik standartlariga javob beradi.
              </p>
            </div>
          </div>

          {/* Audit points */}
          <div className="space-y-2">
            <span className="block text-[10.5px] font-bold text-stone-400 uppercase tracking-wider">
              O‘tkazilgan tekshiruv bosqichlari
            </span>

            {/* Point 1: Legal */}
            <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 flex items-start gap-2.5">
              <Building className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">Yuridik shaxs (STIR/INN)</span>
                  <span className="text-[11px] text-emerald-700 font-medium">✓ Tasdiqlangan</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  STIR: {job.employerInfo.inn} · Rasmiy davlat ro‘yxatidan o‘tgan korxona.
                </p>
              </div>
            </div>

            {/* Point 2: Physical Audit */}
            <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">Ish joyi va manzil ko‘rigi</span>
                  <span className="text-[11px] text-emerald-700 font-medium">✓ O‘rganilgan</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Ko‘rik sanasi: {job.employerInfo.physicalAuditDate}. Manzil: {job.location}.
                </p>
              </div>
            </div>

            {/* Point 3: Female team and environment */}
            <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 flex items-start gap-2.5">
              <Users className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">Jamoa muhiti & Ayol xodimlar ulushi</span>
                  <span className="text-[11px] text-emerald-700 font-medium">{job.employerInfo.femaleStaffRatio}</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Jamoada ayollar yetakchilik qiladi yoki alohida dam olish xonasi mavjud.
                </p>
              </div>
            </div>

            {/* Point 4: CCTV and Security */}
            <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">Kuzatuv va xavfsizlik choralari</span>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    {job.employerInfo.cctvEquipped ? '✓ CCTV mavjud' : 'Xavfsiz bino'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Kechki transport: {job.employerInfo.eveningTransportSupported ? 'Kompaniya tomonidan ta’minlanadi' : 'Kunduzgi grafik'}.
                </p>
              </div>
            </div>
          </div>

          {/* Contact person */}
          <div className="p-3 rounded-lg border border-stone-200 bg-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#802244]" />
              <div>
                <span className="font-semibold text-stone-900 block">{job.employerInfo.contactPerson}</span>
                <span className="text-stone-500 text-[11px]">{job.employerInfo.phone}</span>
              </div>
            </div>
            <div className="text-[11px] text-stone-400">
              Hamkor: {job.employerInfo.verifiedSince}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="h-8.5 px-4 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
