import React, { useState } from 'react';
import {
  User, GraduationCap, Clock, Award, Shield, Lock,
  Phone, Mail, MapPin, CheckCircle2, ChevronRight, Edit3, Settings, LogOut, Briefcase
} from 'lucide-react';

interface ProfileViewProps {
  onOpenSafetyCenter: () => void;
  onReplayOnboarding: () => void;
  onSwitchToEmployer: () => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onOpenSafetyCenter,
  onReplayOnboarding,
  onSwitchToEmployer,
  onLogout
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Dilnoza Karimova',
    university: 'Kokand University',
    faculty: 'Filologiya va xorijiy tillar (Ingliz tili)',
    courseYear: '3-kurs talabasi',
    phone: '+998 90 123 45 67',
    email: 'dilnoza.karimova@edu.uz',
    district: 'Toshkent shahri, Chilonzor tumani',
    preferredHours: 'Part-time (15:00 dan so‘ng)',
    skills: ['IELTS 7.0', 'Ingliz tili (C1)', 'Speaking mentorlik', 'Pedagogika asoslari', 'Figma', 'Kompyuter savodxonligi'],
    interests: ['Xorijiy tillar markazi', 'Tutorlik', 'Xususiy maktab', 'Masofaviy ta’lim'],
    hideExactAddress: true,
    allowCompanionRequests: true,
    cctvAuditedWorkplacesOnly: true
  });

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Profile Header & Completion Meter */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-lg bg-[#802244] text-white font-bold text-lg flex items-center justify-center shrink-0">
              DK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                  {profile.fullName}
                </h1>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Tasdiqlangan talaba</span>
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#802244]" />
                <span>{profile.university} · {profile.faculty}</span>
              </p>
              <span className="text-xs text-stone-400 mt-0.5 block">
                {profile.courseYear}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="h-8.5 px-3 rounded-lg border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Yopish' : 'Tahrirlash'}</span>
            </button>
            <button
              onClick={onLogout}
              className="h-8.5 px-3 rounded-lg border border-stone-200 bg-stone-50 text-xs font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Chiqish"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Profile Completion Meter */}
        <div className="mt-4 p-3.5 rounded-lg bg-stone-50 border border-stone-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-stone-800">
              Profil to‘liqligi darajasi
            </span>
            <span className="font-mono font-bold text-[#802244]">
              78%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-[#802244] rounded-full transition-all duration-500"
              style={{ width: '78%' }}
            />
          </div>

          <p className="text-[11px] text-stone-500 mt-2">
            Talabalik guvohnomasi (HEMIS) tasdig‘i orqali to‘liq tekshiruvdan o‘tgan.
          </p>
        </div>
      </div>

      {/* Profile Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shaxsiy ma’lumotlar */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
          <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Shaxsiy ma’lumotlar & Aloqa
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-md bg-stone-50">
              <span className="text-stone-500">Telefon:</span>
              <span className="font-semibold text-stone-800 font-mono">{profile.phone}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-stone-50">
              <span className="text-stone-500">Email:</span>
              <span className="font-semibold text-stone-800">{profile.email}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-stone-50">
              <span className="text-stone-500">Yashash hududi:</span>
              <span className="font-semibold text-stone-800">{profile.district}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-stone-50">
              <span className="text-stone-500">Qulay ish vaqti:</span>
              <span className="font-semibold text-[#802244]">{profile.preferredHours}</span>
            </div>
          </div>
        </div>

        {/* Ta’lim & Ko‘nikmalar */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
          <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Ko‘nikmalar & Yo‘nalishlar
          </h2>

          <div>
            <span className="text-[11px] text-stone-400 block mb-1.5 font-medium">Ko‘nikmalar:</span>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill, i) => (
                <span key={i} className="text-xs font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-1.5">
            <span className="text-[11px] text-stone-400 block mb-1.5 font-medium">Qiziqqan sohalar:</span>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map((interest, i) => (
                <span key={i} className="text-xs font-medium px-2 py-0.5 rounded-md bg-[#802244]/10 text-[#802244]">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Maxfiylik & Xavfsizlik Sozlamalari */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Maxfiylik va Xavfsizlik
            </h2>
            <Lock className="w-3.5 h-3.5 text-stone-400" />
          </div>

          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between p-2.5 rounded-md bg-stone-50 cursor-pointer">
              <span className="text-stone-700">Aniq yashash manzilini yashirish</span>
              <input
                type="checkbox"
                checked={profile.hideExactAddress}
                onChange={(e) => setProfile({ ...profile, hideExactAddress: e.target.checked })}
                className="w-4 h-4 text-[#802244] accent-[#802244] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-md bg-stone-50 cursor-pointer">
              <span className="text-stone-700">Hamrohlik takliflarini qabul qilish</span>
              <input
                type="checkbox"
                checked={profile.allowCompanionRequests}
                onChange={(e) => setProfile({ ...profile, allowCompanionRequests: e.target.checked })}
                className="w-4 h-4 text-[#802244] accent-[#802244] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-md bg-stone-50 cursor-pointer">
              <span className="text-stone-700">Faqat tekshirilgan va kamerali ish joylari</span>
              <input
                type="checkbox"
                checked={profile.cctvAuditedWorkplacesOnly}
                onChange={(e) => setProfile({ ...profile, cctvAuditedWorkplacesOnly: e.target.checked })}
                className="w-4 h-4 text-[#802244] accent-[#802244] rounded"
              />
            </label>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
              Tezkor amallar
            </h2>

            <div className="space-y-1.5">
              <button
                onClick={onOpenSafetyCenter}
                className="w-full p-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-800 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#802244]" />
                  <span>Xavfsizlik markazi & Kontaktlar</span>
                </span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={onReplayOnboarding}
                className="w-full p-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-800 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-stone-600" />
                  <span>Platforma qo‘llanmasini qayta ko‘rish</span>
                </span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 mt-3">
            <button
              onClick={onSwitchToEmployer}
              className="w-full h-9 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Ish beruvchi kabinetiga o‘tish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
