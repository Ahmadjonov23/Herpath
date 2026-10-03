import React, { useState, useEffect } from 'react';
import { AppNotification, TabType } from '../types';
import {
  Bell, CheckCircle2, ShieldCheck, Briefcase, Users,
  Check, ArrowRight, Clock, AlertCircle
} from 'lucide-react';

interface NotificationsViewProps {
  notifications?: AppNotification[];
  onNavigateTab: (tab: TabType) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications: initialNotifications = [],
  onNavigateTab
}) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getCategoryIcon = (category: AppNotification['category']) => {
    switch (category) {
      case 'application':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />;
      case 'companion':
        return <Users className="w-3.5 h-3.5 text-stone-700" />;
      case 'safety':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />;
      case 'job':
      default:
        return <Briefcase className="w-3.5 h-3.5 text-stone-700" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">
            Bildirishnomalar
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Arizalar, ishlar va qabul qilingan qarorlar bo‘yicha yangilanishlar
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            O‘qilgan deb belgilash
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-stone-800">Hozircha yangi bildirishnomalar yo‘q</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Ish beruvchilarga ariza yuborganingizda yoki arizangiz ko‘rib chiqilganda bu yerda xabarlar paydo bo‘ladi.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-xs">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => notif.actionTab && onNavigateTab(notif.actionTab)}
              className={`p-4 flex items-start gap-3 transition-colors cursor-pointer ${
                notif.isRead ? 'hover:bg-stone-50/70' : 'bg-stone-50/60 hover:bg-stone-50'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                {getCategoryIcon(notif.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h2 className={`text-xs sm:text-sm tracking-tight ${notif.isRead ? 'font-semibold text-stone-800' : 'font-bold text-stone-900'}`}>
                    {notif.title}
                  </h2>
                  <span className="text-[10px] text-stone-400 font-mono shrink-0">
                    {notif.time}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-1.5">
                  {notif.body}
                </p>

                {notif.actionTab && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-900 hover:underline">
                    <span>Ko‘rish</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </div>

              {!notif.isRead && (
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
