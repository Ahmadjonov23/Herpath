import React, { useState, useEffect } from 'react';
import {
  User, GraduationCap, Clock, Award, Shield, Lock,
  Phone, Mail, MapPin, CheckCircle2, ChevronRight, Edit3, Settings, LogOut, Briefcase,
  DollarSign, Sparkles, BookOpen, Save, X, Plus, FileText, Trash2, Paperclip,
  Check, UploadCloud
} from 'lucide-react';
import { JobSeekerProfile, Application, AppNotification } from '../types';

interface ProfileViewProps {
  onNavigateToMap: () => void;
  onReplayOnboarding: () => void;
  onLogout: () => void;
  profileData?: JobSeekerProfile;
  onUpdateProfile?: (updated: JobSeekerProfile) => void;
  applications?: Application[];
  notifications?: AppNotification[];
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavigateToMap,
  onReplayOnboarding,
  onLogout,
  profileData,
  onUpdateProfile,
  applications = [],
  notifications = []
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [showAddRecModal, setShowAddRecModal] = useState(false);

  // New certificate form state
  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    date: '2025-yil',
    fileName: ''
  });

  // New recommendation form state
  const [recForm, setRecForm] = useState({
    recommenderName: '',
    organization: '',
    role: '',
    phone: '+998 ',
    text: '',
    fileName: ''
  });

  const [profile, setProfile] = useState<JobSeekerProfile>({
    fullName: profileData?.fullName || 'Talaba',
    phone: profileData?.phone || '+998 ',
    email: profileData?.email || '',
    birthDate: profileData?.birthDate || '',
    gender: profileData?.gender || 'Ayol',
    university: profileData?.university || 'Kokand University',
    faculty: '',
    courseYear: profileData?.courseYear || '1-kurs talabasi',
    studyType: profileData?.studyType || 'Kunduzgi',
    district: profileData?.district || 'Qo‘qon shahri',
    expectedSalary: profileData?.expectedSalary || '',
    preferredHours: profileData?.preferredHours || 'Part-time',
    freeHours: profileData?.freeHours || '',
    preferredDays: profileData?.preferredDays || ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
    workingTimeOfDay: profileData?.workingTimeOfDay || 'Tushdan so‘ng (Part-time)',
    workingHoursStart: profileData?.workingHoursStart || '14:30',
    workingHoursEnd: profileData?.workingHoursEnd || '18:30',
    languages: profileData?.languages || ['O‘zbek tili'],
    skills: profileData?.skills || ['Mas’uliyatlilik', 'Muloqot madaniyati'],
    interests: profileData?.interests || ['Ta’lim', 'Mehnat'],
    experience: profileData?.experience || '',
    bio: profileData?.bio || '',
    safetyPreferences: profileData?.safetyPreferences || {
      cctvRequired: true,
      transportRequired: true,
      femaleStaffOnly: false
    },
    certificates: profileData?.certificates || [],
    recommendations: profileData?.recommendations || []
  });

  useEffect(() => {
    if (profileData) {
      setProfile(prev => ({ ...prev, ...profileData }));
    }
  }, [profileData]);

  // Form state for editing
  const [editForm, setEditForm] = useState({ ...profile });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const daysSummary = (editForm.preferredDays || []).length === 5 && editForm.preferredDays?.includes('Dushanba') && editForm.preferredDays?.includes('Juma') && !editForm.preferredDays?.includes('Shanba')
      ? 'Dushanba – Juma'
      : (editForm.preferredDays || []).join(', ');

    const updatedForm: JobSeekerProfile = {
      ...editForm,
      preferredHours: `${editForm.workingTimeOfDay || 'Tushdan so‘ng'} (${editForm.workingHoursStart || '14:30'} – ${editForm.workingHoursEnd || '19:00'})`,
      freeHours: `${editForm.workingHoursStart || '14:30'} – ${editForm.workingHoursEnd || '19:00'} (${daysSummary})`
    };

    setProfile(updatedForm);
    if (onUpdateProfile) {
      onUpdateProfile(updatedForm);
    }
    setIsEditing(false);
  };

  // Add Certificate Handler
  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.title.trim()) return;

    const newCert = {
      id: `cert-${Date.now()}`,
      title: certForm.title.trim(),
      issuer: certForm.issuer.trim() || 'Kasbiy sertifikatlashtirish markazi',
      date: certForm.date.trim() || '2025-yil',
      fileName: certForm.fileName || 'sertifikat_hujjati.pdf'
    };

    const updatedCerts = [...(profile.certificates || []), newCert];
    const updatedProfile = { ...profile, certificates: updatedCerts };
    setProfile(updatedProfile);
    if (onUpdateProfile) {
      onUpdateProfile(updatedProfile);
    }

    setCertForm({ title: '', issuer: '', date: '2025-yil', fileName: '' });
    setShowAddCertModal(false);
  };

  // Delete Certificate
  const handleDeleteCertificate = (certId: string) => {
    const updatedCerts = (profile.certificates || []).filter(c => c.id !== certId);
    const updatedProfile = { ...profile, certificates: updatedCerts };
    setProfile(updatedProfile);
    if (onUpdateProfile) {
      onUpdateProfile(updatedProfile);
    }
  };

  // Add Recommendation Handler
  const handleAddRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recForm.recommenderName.trim()) return;

    const newRec = {
      id: `rec-${Date.now()}`,
      recommenderName: recForm.recommenderName.trim(),
      organization: recForm.organization.trim() || 'Kokand University',
      role: recForm.role.trim() || 'Ustoz / Dekan',
      phone: recForm.phone.trim(),
      text: recForm.text.trim() || 'Nomzod tirishqoq, xushmuomala va o‘z ishiga mas’uliyatli.',
      fileName: recForm.fileName || 'tavsiyanoma_xati.pdf'
    };

    const updatedRecs = [...(profile.recommendations || []), newRec];
    const updatedProfile = { ...profile, recommendations: updatedRecs };
    setProfile(updatedProfile);
    if (onUpdateProfile) {
      onUpdateProfile(updatedProfile);
    }

    setRecForm({ recommenderName: '', organization: '', role: '', phone: '+998 ', text: '', fileName: '' });
    setShowAddRecModal(false);
  };

  // Delete Recommendation
  const handleDeleteRecommendation = (recId: string) => {
    const updatedRecs = (profile.recommendations || []).filter(r => r.id !== recId);
    const updatedProfile = { ...profile, recommendations: updatedRecs };
    setProfile(updatedProfile);
    if (onUpdateProfile) {
      onUpdateProfile(updatedProfile);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Profile Header & Completion Meter */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-[#802244] text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
              {profile.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) || 'TAL'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                  {profile.fullName}
                </h1>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Tasdiqlangan talaba</span>
                </span>
                <span className="text-[10px] font-bold text-[#802244] bg-[#802244]/10 px-2 py-0.5 rounded border border-[#802244]/20">
                  Ishchi / Talaba profili
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 flex items-center gap-1.5 flex-wrap">
                <GraduationCap className="w-4 h-4 text-[#802244] shrink-0" />
                <span>{profile.university}</span>
              </p>
              <span className="text-xs text-stone-400 mt-0.5 block">
                {profile.courseYear} · {profile.studyType || 'Kunduzgi ta’lim'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                setEditForm({ ...profile });
                setIsEditing(!isEditing);
              }}
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
        <div className="mt-4 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-stone-800">
              Profil to‘liqligi ko‘rsatkichi
            </span>
            <span className="font-mono font-bold text-[#802244]">
              96%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-[#802244] rounded-full transition-all duration-500"
              style={{ width: '96%' }}
            />
          </div>

          <p className="text-[11px] text-stone-500 mt-2">
            Talabalik guvohnomasi, sertifikatlar va tavsiyanomalar tizimda tekshirilgan.
          </p>
        </div>
      </div>

      {/* Editing Form when opened */}
      {isEditing && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#802244]" />
              <span>Standart profil ma’lumotlarini tahrirlash</span>
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">To‘liq ism-familiya *</label>
                <input
                  type="text"
                  required
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Telefon raqam *</label>
                <input
                  type="text"
                  required
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Yashash hududi (Qo‘qon shahri)</label>
                <input
                  type="text"
                  value={editForm.district}
                  onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                  className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Universitet (OTM)</label>
                <input
                  type="text"
                  value={editForm.university}
                  onChange={(e) => setEditForm({ ...editForm, university: e.target.value })}
                  className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Kursi</label>
                <input
                  type="text"
                  value={editForm.courseYear}
                  onChange={(e) => setEditForm({ ...editForm, courseYear: e.target.value })}
                  className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Kutilayotgan maosh</label>
              <input
                type="text"
                value={editForm.expectedSalary || ''}
                onChange={(e) => setEditForm({ ...editForm, expectedSalary: e.target.value })}
                placeholder="Masalan: 3 500 000 so‘m"
                className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900"
              />
            </div>

            {/* O‘zingiz ishlashni hohlagan kunlar, kun vaqti va soatlari */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#802244]" />
                  <span>Ishlashni hohlagan kunlaringiz, kun vaqti va soatlaringiz</span>
                </span>
                <span className="text-[11px] text-[#802244] font-semibold bg-[#802244]/10 px-2 py-0.5 rounded">
                  {(editForm.preferredDays || []).length} kun tanlandi
                </span>
              </div>

              {/* Hafta kunlari presets & checkboxes */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1.5">
                  Haftaning qaysi kunlarida ishlay olasiz? *
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  <button
                    type="button"
                    onClick={() => setEditForm({
                      ...editForm,
                      preferredDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma']
                    })}
                    className="px-2.5 py-1 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-[11px] font-semibold text-stone-700 cursor-pointer"
                  >
                    Dush–Jum (5 kun)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditForm({
                      ...editForm,
                      preferredDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
                    })}
                    className="px-2.5 py-1 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-[11px] font-semibold text-stone-700 cursor-pointer"
                  >
                    Dush–Shan (6 kun)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditForm({
                      ...editForm,
                      preferredDays: ['Shanba', 'Yakshanba']
                    })}
                    className="px-2.5 py-1 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-[11px] font-semibold text-stone-700 cursor-pointer"
                  >
                    Dam olish kunlari (Shan–Yak)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditForm({
                      ...editForm,
                      preferredDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba']
                    })}
                    className="px-2.5 py-1 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-[11px] font-semibold text-stone-700 cursor-pointer"
                  >
                    Barcha 7 kun
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {[
                    { id: 'Dushanba', short: 'Du' },
                    { id: 'Seshanba', short: 'Se' },
                    { id: 'Chorshanba', short: 'Chor' },
                    { id: 'Payshanba', short: 'Pay' },
                    { id: 'Juma', short: 'Jum' },
                    { id: 'Shanba', short: 'Shan' },
                    { id: 'Yakshanba', short: 'Yak' }
                  ].map(day => {
                    const isSelected = (editForm.preferredDays || []).includes(day.id);
                    return (
                      <button
                        key={day.id}
                        type="button"
                        onClick={() => {
                          const current = editForm.preferredDays || [];
                          const next = isSelected ? current.filter(d => d !== day.id) : [...current, day.id];
                          setEditForm({ ...editForm, preferredDays: next });
                        }}
                        className={`py-2 px-1 rounded-xl text-center font-bold text-xs transition-colors cursor-pointer border ${
                          isSelected
                            ? 'bg-[#802244] text-white border-[#802244] shadow-2xs'
                            : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                        }`}
                        title={day.id}
                      >
                        <span className="block text-xs">{day.short}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Kun vaqti va Ish soatlari */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Kun vaqti (Smena) *
                  </label>
                  <select
                    value={editForm.workingTimeOfDay || 'Tushdan so‘ng (Part-time / Darsdan keyin)'}
                    onChange={(e) => setEditForm({ ...editForm, workingTimeOfDay: e.target.value })}
                    className="w-full h-9.5 px-2.5 rounded-lg border border-stone-300 bg-white text-stone-900"
                  >
                    <option value="Tushdan so‘ng (Part-time / Darsdan keyin)">Tushdan so‘ng (Darsdan keyin)</option>
                    <option value="Kechki smena (17:00 dan so‘ng)">Kechki smena (17:00 dan so‘ng)</option>
                    <option value="Ertalabki smena (08:00 – 13:00)">Ertalabki smena (08:00 – 13:00)</option>
                    <option value="Moslashuvchan / Erkin grafik">Moslashuvchan / Erkin grafik</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Boshlanish soati *
                  </label>
                  <input
                    type="time"
                    value={editForm.workingHoursStart || '14:30'}
                    onChange={(e) => setEditForm({ ...editForm, workingHoursStart: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 bg-white font-mono text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Tugash soati *
                  </label>
                  <input
                    type="time"
                    value={editForm.workingHoursEnd || '19:00'}
                    onChange={(e) => setEditForm({ ...editForm, workingHoursEnd: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 bg-white font-mono text-stone-900"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Qisqacha rezyume tavsifi (Bio)</label>
              <textarea
                rows={2}
                value={editForm.bio || ''}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-900"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#802244] hover:bg-[#6c1d39] text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>O‘zgarishlarni saqlash</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================= */}
      {/* SERTIFIKATLAR & TAVSIYANOMALAR (IXTIYORIY)                     */}
      {/* ============================================================= */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#802244]" />
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Sertifikatlar & Tavsiyanomalar
              </h2>
              <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                Ixtiyoriy ravishda
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Ish beruvchilar oldida ustunlik beruvchi qo‘shimcha hujjatlaringiz
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddCertModal(true)}
              className="h-8 px-3 rounded-lg bg-[#802244] hover:bg-[#6c1d39] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Sertifikat qo‘shish</span>
            </button>
            <button
              onClick={() => setShowAddRecModal(true)}
              className="h-8 px-3 rounded-lg border border-[#802244]/30 bg-[#802244]/5 hover:bg-[#802244]/10 text-[#802244] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>Tavsiyanoma qo‘shish</span>
            </button>
          </div>
        </div>

        {/* 1. Sertifikatlar Ro'yxati */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#802244]" />
            <span>Sertifikatlar va kurslar ({(profile.certificates || []).length})</span>
          </span>

          {(profile.certificates || []).length === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-stone-200 text-center text-xs text-stone-500 bg-stone-50/50">
              Hozircha sertifikat qo‘shilmagan. Yuqoridagi "Sertifikat qo‘shish" tugmasi orqali til, IT yoki boshqa kurs sertifikatlarini kiritishingiz mumkin.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(profile.certificates || []).map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#802244]/10 text-[#802244] flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        {cert.issuer} · <span className="font-mono text-stone-500">{cert.date}</span>
                      </p>
                      {cert.fileName && (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-mono text-[#802244] bg-[#802244]/5 px-2 py-0.5 rounded mt-1 border border-[#802244]/10">
                          <Paperclip className="w-3 h-3" />
                          <span>{cert.fileName}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteCertificate(cert.id)}
                    className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. Tavsiyanomalar Ro'yxati */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Rasmiy tavsiyanomalar (OTM va ustozlardan) ({(profile.recommendations || []).length})</span>
          </span>

          {(profile.recommendations || []).length === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-stone-200 text-center text-xs text-stone-500 bg-stone-50/50">
              Hozircha tavsiyanoma qo‘shilmagan. OTM dekanati, ilmiy rahbar yoki sobiq ish beruvchingizdan olingan tavsiya xatini ixtiyoriy yuklashingiz mumkin.
            </div>
          ) : (
            <div className="space-y-2.5">
              {(profile.recommendations || []).map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40 hover:bg-emerald-50/60 transition-all flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-stone-900">
                          {rec.recommenderName}
                        </span>
                        <span className="text-[10.5px] text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded font-medium">
                          {rec.role} · {rec.organization}
                        </span>
                      </div>
                      {rec.text && (
                        <p className="text-[11px] text-stone-600 mt-1 italic bg-white/70 p-2 rounded-lg border border-stone-100">
                          "{rec.text}"
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-[10.5px] text-stone-500 mt-1.5">
                        {rec.phone && <span>Tel: <strong className="font-mono text-stone-700">{rec.phone}</strong></span>}
                        {rec.fileName && (
                          <span className="inline-flex items-center gap-1 font-mono text-emerald-800 bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                            <Paperclip className="w-3 h-3" />
                            <span>{rec.fileName}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteRecommendation(rec.id)}
                    className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shaxsiy ma’lumotlar & Aloqa */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
          <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#802244]" />
            <span>Shaxsiy ma’lumotlar & Aloqa</span>
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
              <span className="text-stone-500">Telefon:</span>
              <span className="font-semibold text-stone-800 font-mono">{profile.phone}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
              <span className="text-stone-500">Email:</span>
              <span className="font-semibold text-stone-800">{profile.email}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
              <span className="text-stone-500">Yashash hududi:</span>
              <span className="font-semibold text-stone-800">{profile.district}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
              <span className="text-stone-500">Tug‘ilgan sana:</span>
              <span className="font-semibold text-stone-800 font-mono">{profile.birthDate || '2004-05-14'}</span>
            </div>
          </div>
        </div>

        {/* Ishlashni hohlagan kunlar, kun vaqti va soatlari */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#802244]" />
              <span>Ishlashni hohlagan kunlari va soatlari</span>
            </h2>
            <button
              onClick={() => {
                setEditForm({ ...profile });
                setIsEditing(true);
              }}
              className="text-[11px] text-[#802244] hover:underline font-semibold cursor-pointer"
            >
              Tahrirlash
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 block text-[11px] mb-1 font-medium">Qulay ish kunlari (Hafta kunlari):</span>
              <div className="flex flex-wrap gap-1">
                {(profile.preferredDays || ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma']).map(day => (
                  <span key={day} className="px-2 py-0.5 rounded-md bg-[#802244]/10 text-[#802244] font-semibold text-[11px]">
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-stone-500 block text-[11px] font-medium">Kun vaqti (Smena):</span>
                <strong className="text-stone-900 block mt-0.5">
                  {profile.workingTimeOfDay || 'Tushdan so‘ng (Part-time)'}
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-stone-500 block text-[11px] font-medium">Aniq ish soatlari:</span>
                <strong className="text-[#802244] font-mono block mt-0.5">
                  {profile.workingHoursStart || '14:30'} – {profile.workingHoursEnd || '19:00'}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Arizalar holati va ish beruvchi javoblari */}
        {applications.length > 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Arizalarim holati ({applications.length})</span>
            </h2>

            <div className="space-y-2 text-xs">
              {applications.slice(0, 4).map((app) => (
                <div key={app.id} className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-stone-900 block">{app.jobTitle}</span>
                    <span className="text-stone-500 text-[11px]">{app.company} · {app.appliedDate}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    app.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                    app.status === 'interview' ? 'bg-blue-100 text-blue-800' :
                    app.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {app.statusLabelUz}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ish qidirish parametrlari & Kutilayotgan sharoitlar */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
          <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#802244]" />
            <span>Ish qidirish parametrlari</span>
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
              <span className="text-stone-500">Kutilayotgan maosh:</span>
              <span className="font-bold text-emerald-800 font-mono">{profile.expectedSalary || 'Kelishilgan holda'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
              <span className="text-stone-500">Darsdan bo‘sh soatlar:</span>
              <span className="font-semibold text-stone-800">{profile.freeHours || '14:30 – 19:00'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
              <span className="text-stone-500">Ish tajribasi:</span>
              <span className="font-semibold text-stone-800">{profile.experience || '1 yillik tikuvchilik amaliyoti'}</span>
            </div>
          </div>
        </div>

        {/* Ta’lim & Ko‘nikmalar */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
          <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#802244]" />
            <span>Ko‘nikmalar & Tillar</span>
          </h2>

          <div>
            <span className="text-[11px] text-stone-500 block mb-1.5 font-medium">Tillar:</span>
            <div className="flex flex-wrap gap-1.5">
              {(profile.languages || ['O‘zbek tili', 'Rus tili', 'Ingliz tili (IELTS 7.0)']).map((lang, i) => (
                <span key={i} className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <span className="text-[11px] text-stone-500 block mb-1.5 font-medium">Asosiy ko‘nikmalar:</span>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill, i) => (
                <span key={i} className="text-xs font-medium px-2 py-0.5 rounded-md bg-[#802244]/10 text-[#802244]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {profile.bio && (
            <div className="pt-2 border-t border-stone-100">
              <span className="text-[11px] text-stone-500 block mb-1 font-medium">Rezyume tavsifi:</span>
              <p className="text-xs text-stone-700 italic bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                "{profile.bio}"
              </p>
            </div>
          )}
        </div>

        {/* Maxfiylik & Xavfsizlik Sozlamalari */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#802244]" />
              <span>Xavfsizlik va Maxfiylik</span>
            </h2>
            <Lock className="w-3.5 h-3.5 text-stone-400" />
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-stone-50 flex items-center justify-between">
              <span className="text-stone-700">Videokuzatuvli (CCTV) ish joylari</span>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Yoqilgan</span>
            </div>

            <div className="p-2.5 rounded-lg bg-stone-50 flex items-center justify-between">
              <span className="text-stone-700">Kechki smenada korxona transporti talabi</span>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Talab qilinadi</span>
            </div>

            <div className="p-2.5 rounded-lg bg-stone-50 flex items-center justify-between">
              <span className="text-stone-700">Hamrohlik marshrutlariga qo‘shilish</span>
              <span className="text-[11px] font-bold text-[#802244] bg-[#802244]/10 px-2 py-0.5 rounded">Faol</span>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={onNavigateToMap}
              className="w-full p-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-800 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#802244]" />
                <span>Xavfsiz xarita & yo‘nalishlar</span>
              </span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* MODAL: ADD SPECIALTY CERTIFICATE                              */}
      {/* ============================================================= */}
      {showAddCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#802244]" />
                <h3 className="font-bold text-stone-900 text-sm">
                  Sertifikat ma’lumotlarini kiritish (Ixtiyoriy)
                </h3>
              </div>
              <button
                onClick={() => setShowAddCertModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCertificate} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Sertifikat yoki kurs nomi *
                </label>
                <input
                  type="text"
                  required
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  placeholder="Masalan: IELTS 7.0, Kompyuter savodxonligi, Tikuvchilik kursi..."
                  className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#802244]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Bergan tashkilot / O‘quv markazi / Muassasa *
                </label>
                <input
                  type="text"
                  required
                  value={certForm.issuer}
                  onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                  placeholder="Masalan: Qo‘qon Kasb-hunar markazi, British Council, IT Park"
                  className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#802244]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Berilgan sana / yil
                </label>
                <input
                  type="text"
                  value={certForm.date}
                  onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                  placeholder="2025-yil yoki Mart 2026"
                  className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#802244]"
                />
              </div>

              {/* Fayl biriktirish */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Sertifikat nusxasi (Fayl yuklash - ixtiyoriy)
                </label>
                <div className="relative border border-dashed border-stone-300 rounded-lg p-3 text-center bg-stone-50 hover:bg-stone-100 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setCertForm({ ...certForm, fileName: e.target.files[0].name });
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-1 text-stone-500">
                    <UploadCloud className="w-5 h-5 text-[#802244]" />
                    <span className="text-[11px] font-medium">
                      {certForm.fileName ? (
                        <span className="text-emerald-800 font-bold font-mono">
                          Tanlandi: {certForm.fileName}
                        </span>
                      ) : (
                        <span>Faylni tanlang (PDF, PNG yoki JPG)</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCertModal(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#802244] hover:bg-[#6c1d39] text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Sertifikatni saqlash</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL: ADD RECOMMENDATION LETTER                              */}
      {/* ============================================================= */}
      {showAddRecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-stone-900 text-sm">
                  Tavsiyanoma kiritish (Ixtiyoriy)
                </h3>
              </div>
              <button
                onClick={() => setShowAddRecModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddRecommendation} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Tavsiya beruvchi shaxs F.I.Sh. *
                </label>
                <input
                  type="text"
                  required
                  value={recForm.recommenderName}
                  onChange={(e) => setRecForm({ ...recForm, recommenderName: e.target.value })}
                  placeholder="Masalan: Prof. Xursheda Rahimova"
                  className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Tashkilot / OTM nomi *
                  </label>
                  <input
                    type="text"
                    required
                    value={recForm.organization}
                    onChange={(e) => setRecForm({ ...recForm, organization: e.target.value })}
                    placeholder="Kokand University"
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Lavozimi *
                  </label>
                  <input
                    type="text"
                    required
                    value={recForm.role}
                    onChange={(e) => setRecForm({ ...recForm, role: e.target.value })}
                    placeholder="Dekan o‘rinbosari / Kafedra mudiri"
                    className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Aloqa telefoni (Ish beruvchi tekshirishi uchun)
                </label>
                <input
                  type="tel"
                  value={recForm.phone}
                  onChange={(e) => setRecForm({ ...recForm, phone: e.target.value })}
                  placeholder="+998 90 123 45 67"
                  className="w-full h-9.5 px-3 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Tavsiya xati matni (Qisqacha mazmuni)
                </label>
                <textarea
                  rows={2}
                  value={recForm.text}
                  onChange={(e) => setRecForm({ ...recForm, text: e.target.value })}
                  placeholder="Talabaning mas’uliyati, intizomi va mehnatsevarligi haqida qisqacha..."
                  className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Fayl yuklash */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Tavsiyanoma hujjati fayli (Imzoli nusxa - ixtiyoriy)
                </label>
                <div className="relative border border-dashed border-stone-300 rounded-lg p-3 text-center bg-stone-50 hover:bg-stone-100 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setRecForm({ ...recForm, fileName: e.target.files[0].name });
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-1 text-stone-500">
                    <UploadCloud className="w-5 h-5 text-emerald-700" />
                    <span className="text-[11px] font-medium">
                      {recForm.fileName ? (
                        <span className="text-emerald-800 font-bold font-mono">
                          Tanlandi: {recForm.fileName}
                        </span>
                      ) : (
                        <span>Faylni tanlang (PDF, PNG yoki JPG)</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddRecModal(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Tavsiyanomani saqlash</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
