import React, { useState, useMemo } from 'react';
import { Job } from '../types';
import { JobCard } from './JobCard';
import {
  Search, SlidersHorizontal, X, RotateCcw, Briefcase
} from 'lucide-react';

interface JobSearchViewProps {
  jobs: Job[];
  savedJobIds: Set<string>;
  initialFilterPreset?: string;
  onSelectJob: (job: Job) => void;
  onSaveToggle: (jobId: string, e: React.MouseEvent) => void;
  onVerifyClick: (job: Job, e: React.MouseEvent) => void;
}

export const JobSearchView: React.FC<JobSearchViewProps> = ({
  jobs,
  savedJobIds,
  initialFilterPreset,
  onSelectJob,
  onSaveToggle,
  onVerifyClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>(
    initialFilterPreset === 'part-time' ? 'part-time' :
    initialFilterPreset === 'remote' ? 'remote' : 'all'
  );
  const [selectedDistance, setSelectedDistance] = useState<string>(
    initialFilterPreset === 'uyga-yaqin' ? 'near' : 'all'
  );
  const [forStudentsOnly, setForStudentsOnly] = useState<boolean>(
    initialFilterPreset === 'talaba' ? true : false
  );
  const [noExpOnly, setNoExpOnly] = useState<boolean>(
    initialFilterPreset === 'tajribasiz' ? true : false
  );
  const [minSalary, setMinSalary] = useState<number>(0);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // Filter computation
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Query search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchCompany = job.company.toLowerCase().includes(q);
        const matchCategory = job.companyCategory.toLowerCase().includes(q);
        const matchDistrict = job.district.toLowerCase().includes(q);
        if (!matchTitle && !matchCompany && !matchCategory && !matchDistrict) {
          return false;
        }
      }

      // Job type filter
      if (selectedType !== 'all') {
        if (job.jobType !== selectedType) return false;
      }

      // Distance filter
      if (selectedDistance === 'near' && job.distanceKm > 1.5 && job.distanceKm !== 0) {
        return false;
      }
      if (selectedDistance === 'remote' && job.distanceKm !== 0) {
        return false;
      }

      // Students
      if (forStudentsOnly && !job.forStudents) return false;

      // No experience
      if (noExpOnly && !job.noExperienceRequired) return false;

      // Min salary
      if (minSalary > 0 && job.salaryMin < minSalary) return false;

      return true;
    });
  }, [jobs, searchQuery, selectedType, selectedDistance, forStudentsOnly, noExpOnly, minSalary]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedDistance('all');
    setForStudentsOnly(false);
    setNoExpOnly(false);
    setMinSalary(0);
  };

  const hasActiveFilters = selectedType !== 'all' || selectedDistance !== 'all' || forStudentsOnly || noExpOnly || minSalary > 0 || searchQuery.length > 0;

  return (
    <div className="space-y-6">
      {/* Search Header & Integrated Filters */}
      <section className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mb-1">
          Ish o‘rinlari katalogi
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mb-4">
          Talaba qizlar uchun tasdiqlangan, xavfsiz va qulay grafikli bo‘sh ish o‘rinlari
        </p>

        {/* Search Input Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ish, lavozim yoki kompaniya nomi..."
              className="w-full h-10 pl-9 pr-8 rounded-lg border border-stone-200 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#802244] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
            className={`h-10 px-3.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showFiltersDrawer || hasActiveFilters
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filtrlar</span>
          </button>
        </div>

        {/* Filter Drawer / Expanded Controls */}
        {showFiltersDrawer && (
          <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs animate-in fade-in">
            {/* Ish turi */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Ish turi
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg border border-stone-200 bg-stone-50 text-xs text-stone-800"
              >
                <option value="all">Barchasi</option>
                <option value="part-time">Yarim kunlik (Part-time)</option>
                <option value="remote">Masofaviy (Online)</option>
                <option value="flexible">Moslashuvchan grafik</option>
                <option value="internship">Stajirovka / Amaliyot</option>
              </select>
            </div>

            {/* Masofa */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Masofa
              </label>
              <select
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg border border-stone-200 bg-stone-50 text-xs text-stone-800"
              >
                <option value="all">Ixtiyoriy masofa</option>
                <option value="near">Uyga yaqin (&lt; 1.5 km)</option>
                <option value="remote">Faqat masofaviy</option>
              </select>
            </div>

            {/* Minimal maosh */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Minimal maosh
              </label>
              <select
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full h-9 px-2.5 rounded-lg border border-stone-200 bg-stone-50 text-xs text-stone-800"
              >
                <option value={0}>Cheklovsiz</option>
                <option value={3000000}>3 000 000+ so‘m</option>
                <option value={4000000}>4 000 000+ so‘m</option>
                <option value={5000000}>5 000 000+ so‘m</option>
              </select>
            </div>

            {/* Toggle checkboxes */}
            <div className="flex flex-col justify-end gap-2">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                <input
                  type="checkbox"
                  checked={forStudentsOnly}
                  onChange={(e) => setForStudentsOnly(e.target.checked)}
                  className="w-4 h-4 text-[#802244] accent-[#802244] rounded"
                />
                <span>Faqat talabalar uchun</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                <input
                  type="checkbox"
                  checked={noExpOnly}
                  onChange={(e) => setNoExpOnly(e.target.checked)}
                  className="w-4 h-4 text-[#802244] accent-[#802244] rounded"
                />
                <span>Tajriba talab etilmaydi</span>
              </label>
            </div>
          </div>
        )}

        {/* Active Filters Pill Bar */}
        <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-stone-100 text-xs">
          <span className="text-stone-500 font-medium">
            Topildi: <strong className="text-stone-900 font-bold">{filteredJobs.length} ta vakansiya</strong>
          </span>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-[#802244] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Filtrlarni tozalash</span>
            </button>
          )}
        </div>
      </section>

      {/* Results Grid or Empty State */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-sm font-bold text-stone-800">
            {jobs.length === 0 ? 'Hozircha faol ish e’lonlari mavjud emas' : 'Hech qanday vakansiya topilmadi'}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {jobs.length === 0
              ? 'Platformada demo e’lonlar tozalangan. Ish beruvchilar auditdan o‘tgandan so‘ng yangi xavfsiz vakansiyalar e’lon qilinadi.'
              : 'Qidiruv so‘zini o‘zgartiring yoki filtrlarni tozalab qaytadan urinib ko‘ring.'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="mt-2 h-9 px-4 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Filtrlarni bekor qilish
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
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
    </div>
  );
};
