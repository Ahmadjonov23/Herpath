import React, { useState } from 'react';
import { Application } from '../types';
import {
  FileText, Clock, CheckCircle2, AlertCircle, Calendar,
  MessageCircle, Building, ChevronRight, ArrowRight
} from 'lucide-react';

interface ApplicationsViewProps {
  applications: Application[];
  onOpenChat: (app: Application) => void;
  onExploreJobs: () => void;
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  applications,
  onOpenChat,
  onExploreJobs
}) => {
  const [filter, setFilter] = useState<'all' | 'interview' | 'reviewing' | 'accepted' | 'rejected'>('all');

  const filteredApps = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusBadge = (status: Application['status'], label: string) => {
    switch (status) {
      case 'interview':
        return (
          <span className="text-[11px] font-semibold text-[#802244] bg-[#802244]/10 border border-[#802244]/20 px-2 py-0.5 rounded flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{label}</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-rose-700" />
            <span>{label || 'Rad etildi'}</span>
          </span>
        );
      case 'accepted':
        return (
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>{label}</span>
          </span>
        );
      case 'reviewing':
      default:
        return (
          <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-700" />
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header & Filter Controls */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <h1 className="text-xl font-bold text-stone-900 tracking-tight">
              Mening arizalarim
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Ish beruvchilarga yuborilgan arizalarning holati va suhbat takliflari
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Barchasi ({applications.length})
            </button>
            <button
              onClick={() => setFilter('interview')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === 'interview'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Suhbatga taklif
            </button>
            <button
              onClick={() => setFilter('reviewing')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === 'reviewing'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Kutilmoqda
            </button>
            <button
              onClick={() => setFilter('accepted')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === 'accepted'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Qabul qilingan
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === 'rejected'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Rad etilgan
            </button>
          </div>
        </div>

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <div className="py-10 text-center space-y-2.5">
            <FileText className="w-8 h-8 text-stone-300 mx-auto" />
            <h3 className="text-xs font-semibold text-stone-700">Arizalar topilmadi</h3>
            <p className="text-xs text-stone-400 max-w-xs mx-auto">
              Ushbu filtr bo‘yicha arizalar yo‘q. Mos bo‘sh ish o‘rinlariga ariza topshirishingiz mumkin.
            </p>
            <button
              onClick={onExploreJobs}
              className="mt-2 h-8.5 px-3.5 rounded-lg bg-[#802244] text-white text-xs font-semibold hover:bg-[#6c1d39] transition-colors cursor-pointer"
            >
              Ishlarni ko‘rish
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-lg border border-stone-200 bg-stone-50/40 hover:bg-stone-50 hover:border-stone-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-stone-500">{app.company}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-[11px] text-stone-400 font-mono">{app.appliedDate}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-stone-900">
                    {app.jobTitle}
                  </h3>

                  {app.note && (
                    <p className="text-xs text-stone-600 bg-white p-2.5 rounded-md border border-stone-200 leading-relaxed">
                      <span className="font-semibold text-stone-800">Izoh:</span> {app.note}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  {getStatusBadge(app.status, app.statusLabelUz)}

                  <button
                    onClick={() => onOpenChat(app)}
                    className="h-8 px-2.5 rounded-md border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Muloqot"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#802244]" />
                    <span>Xabarlar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
