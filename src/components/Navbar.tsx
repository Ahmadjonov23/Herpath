import React from 'react';
import { BrandLogo } from './BrandLogo';
import { TabType } from '../types';
import {
  Bell, AlertTriangle, User, Bookmark, Briefcase, GraduationCap, Map, FileText, ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadCount: number;
  savedCount: number;
  userName: string;
  userRole: 'student' | 'employer';
  onOpenSos: () => void;
  onOpenAuth: () => void;
  onSwitchRole: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  unreadCount,
  savedCount,
  userName,
  userRole,
  onOpenSos,
  onOpenAuth,
  onSwitchRole
}) => {
  const navItems: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Bosh sahifa' },
    { id: 'jobs', label: 'Ish topish' },
    { id: 'map', label: 'Xavfsiz xarita' },
    { id: 'applications', label: 'Arizalar' },
    { id: 'university', label: 'Hamkorlar' },
    { id: 'safety', label: 'Xavfsizlik' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand Wordmark & Mode Badge */}
        <div className="flex items-center gap-3">
          <BrandLogo
            size="md"
            onClick={() => onSelectTab('home')}
            className="cursor-pointer"
          />

          {userRole === 'employer' ? (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-stone-700 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-md">
              <Briefcase className="w-3 h-3 text-stone-500" />
              <span>Ish beruvchi</span>
            </span>
          ) : (
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-medium text-stone-500 border-l border-stone-200 pl-3">
              Toshkent talaba qizlari platformasi
            </span>
          )}
        </div>

        {/* Primary Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#802244] bg-[#802244]/5 font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Functional SOS Emergency Trigger (Tasteful, serious, non-decorative) */}
          <button
            onClick={onOpenSos}
            className="h-8.5 px-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.98] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            title="Favqulodda SOS signal markazi"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>SOS</span>
          </button>

          {/* Saved Jobs Bookmark */}
          <button
            onClick={() => onSelectTab('saved')}
            className={`w-8.5 h-8.5 rounded-lg border text-stone-600 hover:text-stone-900 hover:bg-stone-50 flex items-center justify-center relative transition-colors cursor-pointer ${
              currentTab === 'saved' ? 'border-[#802244] text-[#802244] bg-[#802244]/5' : 'border-stone-200'
            }`}
            title="Saqlangan ishlar"
            aria-label="Saqlangan ishlar"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-1 rounded-full bg-[#802244] text-white text-[9px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => onSelectTab('notifications')}
            className={`w-8.5 h-8.5 rounded-lg border text-stone-600 hover:text-stone-900 hover:bg-stone-50 flex items-center justify-center relative transition-colors cursor-pointer ${
              currentTab === 'notifications' ? 'border-[#802244] text-[#802244] bg-[#802244]/5' : 'border-stone-200'
            }`}
            title="Bildirishnomalar"
            aria-label="Bildirishnomalar"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#802244]" />
            )}
          </button>

          {/* User Profile Trigger */}
          <button
            onClick={() => onSelectTab('profile')}
            className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
              currentTab === 'profile' ? 'border-[#802244] bg-[#802244]/5' : 'border-stone-200 hover:bg-stone-50'
            }`}
          >
            <div className="w-6.5 h-6.5 rounded-md bg-[#802244] text-white font-bold text-xs flex items-center justify-center">
              {userName.charAt(0)}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-stone-800 max-w-[120px] truncate">
              {userName}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
