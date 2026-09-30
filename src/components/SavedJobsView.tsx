import React from 'react';
import { Job } from '../types';
import { JobCard } from './JobCard';
import { Bookmark, ArrowRight } from 'lucide-react';

interface SavedJobsViewProps {
  savedJobs: Job[];
  onSelectJob: (job: Job) => void;
  onSaveToggle: (jobId: string, e: React.MouseEvent) => void;
  onOpenVerification: (job: Job, e: React.MouseEvent) => void;
  onExploreJobs: () => void;
}

export const SavedJobsView: React.FC<SavedJobsViewProps> = ({
  savedJobs,
  onSelectJob,
  onSaveToggle,
  onOpenVerification,
  onExploreJobs
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">
            Saqlangan ishlar
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Siz keyinroq ko‘rib chiqish yoki ariza topshirish uchun belgilagan vakansiyalar ({savedJobs.length} ta)
          </p>
        </div>

        <button
          onClick={onExploreJobs}
          className="h-8.5 px-3 rounded-lg border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span>Barcha ishlarni ko‘rish</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid or Empty State */}
      {savedJobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-10 text-center space-y-2.5">
          <Bookmark className="w-8 h-8 text-stone-300 mx-auto" />
          <h2 className="text-sm font-bold text-stone-800">
            Hozircha saqlangan ishlar yo‘q
          </h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Vakansiyalar ro‘yxatida o‘zingizga ma’qul bo‘lgan ish kartochkasidagi xatcho‘p belgisini bosib saqlab qo‘yishingiz mumkin.
          </p>
          <button
            onClick={onExploreJobs}
            className="mt-2 h-8.5 px-4 rounded-lg bg-[#802244] text-white text-xs font-semibold hover:bg-[#6c1d39] transition-colors cursor-pointer"
          >
            Vakansiyalarni ko‘rish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onSelect={onSelectJob}
              onSaveToggle={onSaveToggle}
              onVerifyClick={onOpenVerification}
            />
          ))}
        </div>
      )}
    </div>
  );
};
