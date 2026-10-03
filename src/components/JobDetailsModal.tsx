import React, { useState } from 'react';
import { Job } from '../types';
import {
  X, CheckCircle2, Bookmark, MapPin, Clock, ShieldCheck, Map, Send,
  Star, FileText, Check
} from 'lucide-react';

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  isSaved: boolean;
  onClose: () => void;
  onSaveToggle: (jobId: string) => void;
  onViewOnMap: (job: Job) => void;
  onApplySuccess: (job: Job) => void;
  onOpenVerification: (job: Job) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  isOpen,
  isSaved,
  onClose,
  onSaveToggle,
  onViewOnMap,
  onApplySuccess,
  onOpenVerification
}) => {
  const [isApplying, setIsApplying] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !job) return null;

  const formatSalary = (min: number, max: number) => {
    return `${(min / 1000000).toFixed(1).replace('.0', '')} – ${(max / 1000000).toFixed(1).replace('.0', '')} mln so‘m / oyiga`;
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onApplySuccess(job);
      setIsApplying(false);
      setSubmitted(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-4.5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center shrink-0">
              {job.companyLogoText}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-stone-900">{job.company}</span>
                {job.isVerified && (
                  <button
                    onClick={() => onOpenVerification(job)}
                    className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-800 hover:underline cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Tekshirilgan</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-stone-500">{job.companyCategory} · {job.district}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSaveToggle(job.id)}
              className="w-8.5 h-8.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 flex items-center justify-center transition-colors cursor-pointer"
              title={isSaved ? "Saqlangandan chiqarish" : "Saqlash"}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'text-[#802244] fill-[#802244]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="w-8.5 h-8.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Title & Salary */}
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight mb-1.5">
              {job.title}
            </h1>
            <div className="text-base font-bold text-[#802244] tabular-nums mb-3.5">
              {formatSalary(job.salaryMin, job.salaryMax)}
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
              <div>
                <span className="text-stone-400 block text-[10.5px]">Ish vaqti</span>
                <span className="font-semibold text-stone-800">{job.schedule}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10.5px]">Ish turi</span>
                <span className="font-semibold text-stone-800">
                  {job.jobType === 'part-time' ? 'Yarim kunlik' : job.jobType === 'remote' ? 'Masofaviy' : 'Moslashuvchan'}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10.5px]">Masofa</span>
                <span className="font-semibold text-stone-800">{job.distanceKm === 0 ? 'Online' : `${job.distanceKm} km`}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10.5px]">Tajriba</span>
                <span className="font-semibold text-stone-800">{job.noExperienceRequired ? 'Tajribasiz ham' : 'Boshlang‘ich'}</span>
              </div>
            </div>

            {/* Ish beruvchi belgilagan ish kunlari va soatlari */}
            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-stone-800 space-y-2 mt-3">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950 uppercase tracking-wider text-[11px]">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Ish beruvchi belgilagan ish kunlari va soatlari</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 bg-white rounded-lg border border-emerald-100">
                  <span className="text-stone-500 text-[10.5px] block font-medium">Ish kunlari:</span>
                  <strong className="text-stone-900 block mt-0.5">
                    {job.workingDays && job.workingDays.length > 0
                      ? (job.workingDays.length === 5 && job.workingDays.includes('Dushanba') && job.workingDays.includes('Juma') && !job.workingDays.includes('Shanba')
                        ? 'Dushanba – Juma'
                        : job.workingDays.join(', '))
                      : 'Dushanba – Juma'}
                  </strong>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-emerald-100">
                  <span className="text-stone-500 text-[10.5px] block font-medium">Kun vaqti (Smena):</span>
                  <strong className="text-emerald-900 block mt-0.5">
                    {job.workingTimeOfDay || 'Tushdan so‘ng (Part-time)'}
                  </strong>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-emerald-100">
                  <span className="text-stone-500 text-[10.5px] block font-medium">Ish soatlari:</span>
                  <strong className="text-emerald-800 font-mono block mt-0.5">
                    {job.workingHoursStart || '14:30'} – {job.workingHoursEnd || '18:30'}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Map Location Banner */}
          {job.distanceKm > 0 && (
            <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/60 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-stone-700">
                <MapPin className="w-4 h-4 text-[#802244] shrink-0" />
                <span>{job.location}</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onViewOnMap(job);
                }}
                className="h-8 px-3 rounded-md bg-white border border-stone-300 text-xs font-semibold text-stone-800 hover:bg-stone-50 flex items-center gap-1.5 shrink-0 transition-colors shadow-xs cursor-pointer"
              >
                <Map className="w-3.5 h-3.5 text-[#802244]" />
                <span>Xaritada</span>
              </button>
            </div>
          )}

          {/* Description */}
          <div>
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1.5">Tavsif</h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Vazifalar */}
          <div>
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Vazifalar</h2>
            <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#802244] mt-1.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Talablar */}
          <div>
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Talablar</h2>
            <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ish sharoiti */}
          <div>
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Ish sharoiti va qulayliklar</h2>
            <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
              {job.workConditions.map((cond, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety notes */}
          <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Ish joyi xavfsizligi kafolatlari</h2>
            </div>
            <ul className="space-y-1 text-xs text-stone-700 mb-2.5">
              {job.safetyNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onOpenVerification(job)}
              className="text-xs font-semibold text-[#802244] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Soatbay audit ma’lumotlarini ko‘rish →</span>
            </button>
          </div>

          {/* Safety Rating & Transparent Reviews */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Xodimlar bahosi ({job.reviews.length} ta fikr)
              </h2>
              <div className="flex items-center gap-1 text-xs font-bold text-stone-900">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{job.safetyRating.toFixed(1)} / 5.0</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3 text-xs">
              <div className="p-2 rounded-md bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block text-[10.5px]">Ish muhiti</span>
                <span className="font-semibold text-stone-800">{job.safetyScores.workEnvironment} / 5.0</span>
              </div>
              <div className="p-2 rounded-md bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block text-[10.5px]">Grafik intizomi</span>
                <span className="font-semibold text-stone-800">{job.safetyScores.scheduleIntegrity} / 5.0</span>
              </div>
              <div className="p-2 rounded-md bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block text-[10.5px]">Hurmatli muloqot</span>
                <span className="font-semibold text-stone-800">{job.safetyScores.teamRespect} / 5.0</span>
              </div>
            </div>

            <div className="space-y-2">
              {job.reviews.map((rev) => (
                <div key={rev.id} className="p-3 rounded-lg border border-stone-200 bg-stone-50/40 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-stone-900">{rev.author} · {rev.university}</span>
                    <span className="text-stone-400 text-[10.5px]">{rev.date}</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* In-Modal Application Form Drawer */}
          {isApplying && (
            <div className="p-4 rounded-lg border border-[#802244]/40 bg-[#FAF8F5] space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Ariza topshirish: {job.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsApplying(false)}
                  className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Bekor qilish
                </button>
              </div>

              <div className="p-2.5 bg-white rounded-md border border-stone-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#802244]" />
                  <div>
                    <span className="font-medium text-stone-900 block">dilnoza_karimova_cv.pdf</span>
                    <span className="text-stone-400 text-[10.5px]">Kokand University · 1.2 MB</span>
                  </div>
                </div>
                <span className="text-emerald-700 text-[11px] font-semibold">✓ Biriktirilgan</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Qisqa qo‘shimcha izoh (ixtiyoriy)
                </label>
                <textarea
                  rows={2}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Darslarim 15:30 da tugaydi, ko‘rsatilgan vaqtda ishlashga tayyorman..."
                  className="w-full p-2.5 rounded-md border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#802244]"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmitApplication}
                disabled={submitted}
                className="w-full h-9 rounded-lg bg-[#802244] hover:bg-[#6c1d39] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Arizangiz yuborildi!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Arizani tasdiqlab yuborish</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="p-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          <button
            onClick={() => onSaveToggle(job.id)}
            className="h-10 px-4 rounded-lg border border-stone-300 bg-white text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'text-[#802244] fill-[#802244]' : ''}`} />
            <span>{isSaved ? 'Saqlangan' : 'Saqlash'}</span>
          </button>

          {!isApplying && (
            <button
              onClick={() => setIsApplying(true)}
              className="flex-1 h-10 rounded-lg bg-[#802244] hover:bg-[#6c1d39] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Ariza topshirish</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
