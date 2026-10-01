import React from 'react';
import { Job } from '../types';
import { CheckCircle2, Bookmark, MapPin, Clock, ChevronRight, Star } from 'lucide-react';

interface JobCardProps {
  job: Job;
  isSaved?: boolean;
  onSaveToggle: (jobId: string, e: React.MouseEvent) => void;
  onSelect: (job: Job) => void;
  onVerifyClick?: (job: Job, e: React.MouseEvent) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved = false,
  onSaveToggle,
  onSelect,
  onVerifyClick
}) => {
  const formatSalary = (min: number, max: number) => {
    const minFmt = (min / 1000000).toFixed(1).replace('.0', '');
    const maxFmt = (max / 1000000).toFixed(1).replace('.0', '');
    return `${minFmt} – ${maxFmt} mln so‘m`;
  };

  return (
    <article
      onClick={() => onSelect(job)}
      className="group bg-white rounded-xl border border-stone-200 p-4.5 hover:border-stone-300 hover:shadow-xs transition-all duration-150 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Company Header Row */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3 min-w-0">
            {/* Monogram logo */}
            <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center shrink-0 group-hover:border-stone-300 transition-colors">
              {job.companyLogoText}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-stone-900 truncate">
                  {job.company}
                </span>

                {job.isVerified && (
                  <button
                    type="button"
                    onClick={(e) => onVerifyClick && onVerifyClick(job, e)}
                    className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-800 hover:underline cursor-pointer"
                    title="Tekshirilgan ish beruvchi ma’lumotlari"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Tekshirilgan</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-0.5">
                <span>{job.companyCategory}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="flex items-center gap-0.5 text-stone-700 font-medium">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  {job.safetyRating.toFixed(1)} ({job.reviewCount})
                </span>
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => onSaveToggle(job.id, e)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-[#802244] hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
            aria-label={isSaved ? "Saqlangandan o'chirish" : "Ishni saqlash"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'text-[#802244] fill-[#802244]' : ''}`} />
          </button>
        </div>

        {/* Job Title */}
        <h3 className="text-base font-bold text-stone-900 leading-snug group-hover:text-[#802244] transition-colors mb-1.5 line-clamp-2">
          {job.title}
        </h3>

        {/* Salary */}
        <div className="text-sm font-bold text-[#802244] tabular-nums mb-3">
          {formatSalary(job.salaryMin, job.salaryMax)}{' '}
          <span className="text-xs font-normal text-stone-500">/ oyiga</span>
        </div>

        {/* Meta row: Time, District, Distance */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-2.5 text-xs text-stone-600 mb-3 pt-2.5 border-t border-stone-100">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#802244] shrink-0" />
            <span className="font-medium text-stone-800">
              {job.workingDays && job.workingDays.length > 0 && job.workingHoursStart
                ? `${job.workingDays.length === 5 && job.workingDays.includes('Dushanba') && job.workingDays.includes('Juma') && !job.workingDays.includes('Shanba') ? 'Dush–Jum' : job.workingDays.join(', ')} (${job.workingHoursStart} – ${job.workingHoursEnd})`
                : job.schedule}
            </span>
          </div>

          <span aria-hidden="true" className="text-stone-300">·</span>

          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>{job.district}</span>
          </div>

          <span aria-hidden="true" className="text-stone-300">·</span>

          <div className="text-stone-800 font-medium">
            {job.distanceKm === 0 ? 'Masofaviy ish' : `${job.distanceKm} km`}
          </div>
        </div>
      </div>

      {/* Card Footer: Context flags & Action */}
      <div className="flex items-center justify-between pt-2.5 border-t border-stone-100 text-xs">
        <div className="flex items-center gap-2">
          {job.forStudents && (
            <span className="text-stone-600 font-medium text-[11px]">
              🎓 Talabalar uchun
            </span>
          )}
          {job.employerInfo.eveningTransportSupported && (
            <span className="text-emerald-800 text-[11px] font-medium hidden sm:inline">
              · Bepul taksi
            </span>
          )}
        </div>

        <span className="text-[#802244] font-semibold flex items-center gap-0.5 text-xs group-hover:translate-x-0.5 transition-transform">
          Tafsilotlar
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
