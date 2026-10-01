import React, { useState } from 'react';
import { TabType, UserRole } from '../types';
import { BrandLogo } from './BrandLogo';
import {
  User, Bookmark, Briefcase, ChevronDown, MapPin, Send, HelpCircle,
  LogOut, Globe, Check
} from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  savedCount: number;
  userName: string;
  userRole: UserRole;
  isLoggedIn: boolean;
  onOpenAuth: (mode?: 'role_selection' | 'register_details' | 'sign_in', initialRole?: 'job_seeker' | 'employer') => void;
  onLogout: () => void;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  userName,
  userRole,
  isLoggedIn,
  onOpenAuth,
  onLogout,
  onOpenHelp
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'UZ' | 'RU' | 'EN'>('UZ');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-15 flex items-center justify-between gap-3">
        {/* Left Side: Brand Logo + Help Link */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* HerPath Platform Logo */}
          <BrandLogo
            size="md"
            onClick={() => onSelectTab('home')}
            className="hover:opacity-95 transition-opacity"
          />

          {/* "Yordam" link */}
          <button
            type="button"
            onClick={onOpenHelp}
            className="hidden md:inline-flex items-center text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
          >
            Yordam
          </button>
        </div>

        {/* Right Side: Region + Language + Auth Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Region / Location with Paper Plane Icon (✈ O'zbekiston) */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-700 font-medium cursor-pointer hover:text-stone-950">
            <Send className="w-3.5 h-3.5 -rotate-45 text-stone-500" />
            <span>O‘zbekiston</span>
          </div>

          {/* Language Selector (UZ ⌵) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-xs font-bold text-stone-700 hover:text-stone-950 px-2 py-1 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1 w-24 bg-white rounded-xl border border-stone-200 shadow-lg py-1 z-50 text-xs">
                {(['UZ', 'RU', 'EN'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-stone-50 flex items-center justify-between ${
                      selectedLang === lang ? 'font-bold text-stone-900' : 'text-stone-600'
                    }`}
                  >
                    <span>{lang}</span>
                    {selectedLang === lang && <Check className="w-3 h-3 text-stone-900" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* IF NOT LOGGED IN: "Kirish" and Primary CTA "Rezyume yaratish" / "Vakansiya berish" */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              {/* Kirish Button (light gray button) */}
              <button
                type="button"
                onClick={() => onOpenAuth('sign_in', userRole === 'employer' ? 'employer' : 'job_seeker')}
                className="h-9 px-3.5 sm:px-4 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-[0.98] text-stone-800 text-xs font-bold transition-all cursor-pointer"
              >
                Kirish
              </button>

              {/* Primary Black High-Contrast CTA Button (Ro'yxatdan o'tish) */}
              <button
                type="button"
                onClick={() => onOpenAuth('register_details', userRole === 'employer' ? 'employer' : 'job_seeker')}
                className="h-9 px-4 sm:px-5 rounded-full bg-black hover:bg-stone-800 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
              >
                Ro'yxatdan o'tish
              </button>
            </div>
          ) : (
            /* IF LOGGED IN: Clean User Controls (Without duplicate kirish/profil buttons) */
            <div className="flex items-center gap-2">
              {/* Saved Jobs Bookmark for job seeker */}
              {userRole === 'job_seeker' && (
                <button
                  type="button"
                  onClick={() => onSelectTab('saved')}
                  className={`w-9 h-9 rounded-full border text-stone-600 hover:text-stone-900 hover:bg-stone-50 flex items-center justify-center relative transition-colors cursor-pointer ${
                    currentTab === 'saved' ? 'border-stone-900 text-stone-900 bg-stone-50' : 'border-stone-200'
                  }`}
                  title="Saqlangan ishlar"
                  aria-label="Saqlangan ishlar"
                >
                  <Bookmark className="w-4 h-4" />
                  {savedCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center">
                      {savedCount}
                    </span>
                  )}
                </button>
              )}

              {/* User Avatar with Profile Tab navigation */}
              <button
                type="button"
                onClick={() => onSelectTab(userRole === 'employer' ? 'employer' : 'profile')}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
                title="Profilim"
              >
                <div className="w-6.5 h-6.5 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center">
                  {userName.charAt(0)}
                </div>
                <span className="text-xs font-bold text-stone-900 max-w-[120px] truncate">
                  {userName}
                </span>
              </button>

              {/* Clean Logout */}
              <button
                type="button"
                onClick={onLogout}
                className="w-9 h-9 rounded-full border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                title="Chiqish"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
