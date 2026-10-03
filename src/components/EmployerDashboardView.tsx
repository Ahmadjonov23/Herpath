import React, { useState, useEffect } from 'react';
import { Job, EmployerProfile, Application, AppNotification } from '../types';
import {
  Building2, Users, Plus, CheckCircle2,
  Calendar, MessageSquare, ShieldCheck, ArrowRight, X, Clock, MapPin, Briefcase,
  Phone, Mail, Globe, FileText, Check, Edit3, Save, Shield,
  Award, Paperclip, GraduationCap, Sparkles, Search, Filter, Printer, Bell, AlertCircle
} from 'lucide-react';
import {
  getStoredApplications,
  updateStoredApplicationStatus,
  getStoredNotifications,
  saveStoredEmployerProfile,
  StoredCandidateApplication,
  ExtendedNotification
} from '../data/store';
import { getRegisteredAccounts } from '../data/accounts';

interface EmployerDashboardViewProps {
  onOpenChat: (candidateName: string) => void;
  onCreateJob?: (job: Job) => void;
  activeJobs?: Job[];
  activeJobsCount?: number;
  employerProfile?: EmployerProfile;
  onUpdateEmployerProfile?: (updated: EmployerProfile) => void;
  applications?: Application[];
  onUpdateApplicationStatus?: (applicationId: string, newStatus: 'interview' | 'accepted' | 'rejected') => void;
  notifications?: AppNotification[];
}

export const EmployerDashboardView: React.FC<EmployerDashboardViewProps> = ({
  onOpenChat,
  onCreateJob,
  activeJobs = [],
  activeJobsCount = 0,
  employerProfile,
  onUpdateEmployerProfile,
  applications,
  onUpdateApplicationStatus,
  notifications
}) => {
  const [activeTab, setActiveTab] = useState<'applied' | 'matching' | 'profile' | 'jobs'>('applied');
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedResumeCandidate, setSelectedResumeCandidate] = useState<any | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filters for Applied candidates
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'interview' | 'reviewing' | 'accepted' | 'rejected'>('all');

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Employer Profile Data
  const [profile, setProfile] = useState<EmployerProfile>({
    companyName: employerProfile?.companyName || 'Ish beruvchi tashkilot',
    inn: employerProfile?.inn || '',
    legalType: employerProfile?.legalType || 'MCHJ',
    category: employerProfile?.category || 'Xususiy korxona',
    address: employerProfile?.address || 'Qo‘qon shahri',
    landmark: employerProfile?.landmark || '',
    contactPerson: employerProfile?.contactPerson || 'Mas’ul vakil',
    contactRole: employerProfile?.contactRole || 'HR menejer',
    phone: employerProfile?.phone || '+998 ',
    email: employerProfile?.email || '',
    website: employerProfile?.website || '',
    employeeCount: employerProfile?.employeeCount || '50+ nafar',
    description: employerProfile?.description || 'Talabalar uchun qulay va xavfsiz soatbay ish o‘rinlari taqdim etuvchi korxona.',
    eveningTransportSupported: employerProfile?.eveningTransportSupported ?? true,
    cctvEquipped: employerProfile?.cctvEquipped ?? true,
    formalContractGuaranteed: employerProfile?.formalContractGuaranteed ?? true,
    femaleStaffRatio: employerProfile?.femaleStaffRatio || '75%',
    verifiedSince: employerProfile?.verifiedSince || '2026-yil',
    isVerified: employerProfile?.isVerified ?? true
  });

  const [editProfileForm, setEditProfileForm] = useState({ ...profile });

  useEffect(() => {
    if (employerProfile) {
      setProfile(employerProfile);
      setEditProfileForm(employerProfile);
    }
  }, [employerProfile]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editProfileForm);
    saveStoredEmployerProfile(editProfileForm);
    if (onUpdateEmployerProfile) {
      onUpdateEmployerProfile(editProfileForm);
    }
    setIsEditingProfile(false);
    showNotice("Tashkilot rekvizitlari muvaffaqiyatli saqlandi!");
  };

  // 1. ARIZA TOPSHIRGAN ISHCHILAR (REAL DATA FROM STORE)
  const [appliedCandidates, setAppliedCandidates] = useState<any[]>([]);
  // 2. TIZIMDAGI ISH IZLOVCHILAR (REAL REGISTERED JOB SEEKERS)
  const [matchingJobSeekers, setMatchingJobSeekers] = useState<any[]>([]);
  // 3. ISH BERUVCHI BILDIRISHNOMALARI (REAL NOTIFICATIONS)
  const [employerNotifications, setEmployerNotifications] = useState<ExtendedNotification[]>([]);

  const loadData = () => {
    const rawApps = getStoredApplications();
    const mapped = rawApps.map((app) => {
      const c = (app as any).candidate || ({} as any);
      return {
        id: app.id,
        appId: app.id,
        name: (app as any).applicantName || c.name || app.company,
        university: (app as any).applicantUniversity || c.university || 'Talaba',
        courseYear: (app as any).applicantCourseYear || c.courseYear || 'Talaba',
        studyType: (app as any).applicantStudyType || c.studyType || 'Kunduzgi',
        phone: (app as any).applicantPhone || c.phone || '',
        email: (app as any).applicantEmail || c.email || '',
        district: (app as any).applicantDistrict || c.district || 'Qo‘qon shahri',
        soha: (app as any).applicantSoha || c.soha || 'Ta’lim va xizmat ko‘rsatish',
        mutaxassislik: (app as any).applicantMutaxassislik || c.mutaxassislik || 'Talaba / Mutaxassis',
        birthDate: (app as any).applicantBirthDate || c.birthDate || '',
        appliedFor: app.jobTitle,
        date: app.appliedDate || 'Bugun',
        status: app.status || 'reviewing',
        statusText: app.statusLabelUz || 'Ko‘rib chiqilmoqda',
        expectedSalary: (app as any).applicantExpectedSalary || c.expectedSalary || 'Kelishilgan',
        preferredHours: (app as any).applicantPreferredHours || c.preferredHours || 'Part-time',
        freeHours: (app as any).applicantFreeHours || c.freeHours || '',
        preferredDays: (app as any).applicantPreferredDays || c.preferredDays || ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
        workingTimeOfDay: (app as any).applicantWorkingTimeOfDay || c.workingTimeOfDay || 'Tushdan so‘ng (Part-time)',
        workingHoursStart: (app as any).applicantWorkingHoursStart || c.workingHoursStart || '14:30',
        workingHoursEnd: (app as any).applicantWorkingHoursEnd || c.workingHoursEnd || '18:30',
        experience: (app as any).applicantExperience || c.experience || '',
        bio: (app as any).applicantBio || c.bio || '',
        skills: (app as any).applicantSkills || c.skills || [],
        languages: (app as any).applicantLanguages || c.languages || ['O‘zbek tili'],
        certificates: (app as any).applicantCertificates || c.certificates || [],
        recommendations: (app as any).applicantRecommendations || c.recommendations || []
      };
    });
    setAppliedCandidates(mapped);

    // Matching registered seekers
    const regAccounts = getRegisteredAccounts();
    const seekers = regAccounts
      .filter((a) => a.role === 'job_seeker')
      .map((a) => {
        const p = (a.profileData as any) || {};
        return {
          id: a.id,
          name: a.name || p.fullName,
          university: p.university || 'Talaba',
          courseYear: p.courseYear || 'Talaba',
          studyType: p.studyType || 'Kunduzgi',
          phone: a.phone || p.phone,
          email: p.email || '',
          district: p.district || 'Qo‘qon shahri',
          soha: p.soha || 'Ta’lim va xizmat ko‘rsatish',
          mutaxassislik: p.mutaxassislik || 'Talaba / Mutaxassis',
          appliedFor: 'Soatbay ish izlovchi',
          date: 'Faol qidiruvda',
          status: 'reviewing',
          statusText: 'Mos nomzod',
          matchScore: 'Mos nomzod',
          expectedSalary: p.expectedSalary || 'Kelishilgan',
          preferredHours: p.preferredHours || 'Part-time',
          preferredDays: p.preferredDays || ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
          workingTimeOfDay: p.workingTimeOfDay || 'Tushdan so‘ng (Part-time)',
          workingHoursStart: p.workingHoursStart || '14:30',
          workingHoursEnd: p.workingHoursEnd || '18:30',
          experience: p.experience || '',
          bio: p.bio || '',
          skills: p.skills || [],
          languages: p.languages || ['O‘zbek tili'],
          certificates: a.certificates || p.certificates || [],
          recommendations: a.recommendations || p.recommendations || []
        };
      });
    setMatchingJobSeekers(seekers);

    // Notifications
    const notifs = getStoredNotifications().filter((n) => n.targetRole === 'employer');
    setEmployerNotifications(notifs);
  };

  useEffect(() => {
    loadData();

    const handleAppsUpdate = () => loadData();
    const handleNotifsUpdate = () => loadData();

    window.addEventListener('soatbay_applications_updated', handleAppsUpdate);
    window.addEventListener('soatbay_notifications_updated', handleNotifsUpdate);

    return () => {
      window.removeEventListener('soatbay_applications_updated', handleAppsUpdate);
      window.removeEventListener('soatbay_notifications_updated', handleNotifsUpdate);
    };
  }, []);

  // Update candidate status handler (Ish beruvchi arizani tasdiqlaganda yoki rad etganda)
  const handleUpdateCandidateStatus = (candidateId: string, newStatus: 'interview' | 'accepted' | 'rejected') => {
    const updated = updateStoredApplicationStatus(candidateId, newStatus, profile.companyName);

    if (onUpdateApplicationStatus) {
      onUpdateApplicationStatus(candidateId, newStatus);
    }

    const statusMap: Record<string, string> = {
      interview: 'Suhbat belgilandi',
      accepted: 'Tasdiqlandi / Qabul qilindi',
      rejected: 'Rad etildi'
    };

    setAppliedCandidates(prev =>
      prev.map(c => (c.id === candidateId || c.appId === candidateId ? { ...c, status: newStatus, statusText: statusMap[newStatus] } : c))
    );

    if (selectedResumeCandidate && (selectedResumeCandidate.id === candidateId || selectedResumeCandidate.appId === candidateId)) {
      setSelectedResumeCandidate((prev: any) => ({
        ...prev,
        status: newStatus,
        statusText: statusMap[newStatus]
      }));
    }

    if (newStatus === 'accepted' || newStatus === 'interview') {
      showNotice(`Nomzod arizasi tasdiqlandi ("${statusMap[newStatus]}") va ish izlovchi profiliga xabar yuborildi!`);
    } else {
      showNotice(`Nomzod arizasi rad etildi va ish izlovchi profiliga bildirishnoma yuborildi.`);
    }
  };

  // Invite matching candidate to interview
  const handleInviteMatchingCandidate = (cand: any) => {
    const exists = appliedCandidates.some(c => c.name === cand.name);
    if (!exists) {
      const newApp = {
        ...cand,
        id: `app-from-match-${Date.now()}`,
        date: 'Bugun (Siz taklif qildingiz)',
        status: 'interview',
        statusText: 'Suhbat belgilandi'
      };
      setAppliedCandidates([newApp, ...appliedCandidates]);
    }
    showNotice(`"${cand.name}" ga suhbat taklifi yuborildi!`);
  };

  // Filtered Applied Candidates
  const filteredAppliedCandidates = appliedCandidates.filter(c => {
    const matchesSearch = (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.appliedFor || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.university || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const [newJob, setNewJob] = useState({
    title: '',
    category: profile.category || 'Xizmat ko‘rsatish va Ta’lim',
    workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'] as string[],
    workingTimeOfDay: 'Tushdan so‘ng (Part-time / 14:00 dan so‘ng)',
    workingHoursStart: '14:30',
    workingHoursEnd: '18:30',
    schedule: 'Dushanba – Juma (14:30 – 18:30, Part-time)',
    salaryMin: '3 500 000',
    salaryMax: '5 000 000',
    location: profile.address || 'Qo‘qon shahri',
    eveningTransport: profile.eveningTransportSupported
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJob.title.trim()) {
      const daysSummary = newJob.workingDays.length === 7
        ? 'Har kuni'
        : newJob.workingDays.length === 5 && newJob.workingDays.includes('Dushanba') && newJob.workingDays.includes('Juma') && !newJob.workingDays.includes('Shanba')
        ? 'Dushanba – Juma'
        : newJob.workingDays.length === 6 && !newJob.workingDays.includes('Yakshanba')
        ? 'Dushanba – Shanba'
        : newJob.workingDays.join(', ');

      const formattedSchedule = `${daysSummary} (${newJob.workingHoursStart} – ${newJob.workingHoursEnd}, ${newJob.workingTimeOfDay})`;

      const created: Job = {
        id: `job-${Date.now()}`,
        title: newJob.title,
        company: profile.companyName,
        companyLogoText: profile.companyName.split(' ').map(n => n[0]).join('').slice(0, 2) || 'SB',
        companyCategory: newJob.category,
        salaryMin: parseInt(newJob.salaryMin.replace(/\D/g, '')) || 3500000,
        salaryMax: parseInt(newJob.salaryMax.replace(/\D/g, '')) || 5000000,
        salaryPeriod: 'oyiga',
        schedule: formattedSchedule,
        workingDays: newJob.workingDays,
        workingTimeOfDay: newJob.workingTimeOfDay,
        workingHoursStart: newJob.workingHoursStart,
        workingHoursEnd: newJob.workingHoursEnd,
        distanceKm: 0.8,
        location: newJob.location,
        district: 'Qo‘qon shahri',
        isVerified: true,
        verificationLevel: 'high',
        safetyRating: 5.0,
        reviewCount: 0,
        jobType: 'part-time',
        forStudents: true,
        noExperienceRequired: true,
        postedDate: 'Hozirgina',
        description: `${newJob.title} lavozimi bo‘yicha intiluvchan talabalar va yoshlarni jamoamizga taklif etamiz. Qulay soatbay grafik, darsdan so‘ng mos smena va xavfsiz mehnat sharoitlari yaratilgan.`,
        responsibilities: [
          'Vazifalarni o‘z vaqtida va sifatli bajarish',
          'Jamoa va mijozlar bilan xushmuomala munosabatda bo‘lish'
        ],
        requirements: [
          'Talaba yoki mas’uliyatli yosh nomzod',
          'O‘zbek tilida erkin muloqot'
        ],
        workConditions: [
          'Darsdan keyingi moslashuvchan soatbay grafik',
          'Xavfsiz bino va qulay ish stoli'
        ],
        safetyNotes: [
          'Binoda videokuzatuv tizimi mavjud',
          'Kechki smenada xavfsizlik ta’minlanadi'
        ],
        employerInfo: {
          inn: profile.inn || 'Tekshirilgan',
          verifiedSince: profile.verifiedSince || '2026-yil',
          physicalAuditDate: '2026-yil',
          femaleStaffRatio: profile.femaleStaffRatio || '80%',
          eveningTransportSupported: profile.eveningTransportSupported,
          cctvEquipped: profile.cctvEquipped,
          contactPerson: profile.contactPerson,
          phone: profile.phone
        },
        safetyScores: {
          workEnvironment: 5.0,
          scheduleIntegrity: 5.0,
          teamRespect: 5.0,
          locationConvenience: 5.0,
          eveningCommute: 5.0
        },
        reviews: []
      };

      if (onCreateJob) {
        onCreateJob(created);
      }
      setShowCreateJobModal(false);
      setNewJob({
        title: '',
        category: profile.category || 'Xizmat ko‘rsatish va Ta’lim',
        workingDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
        workingTimeOfDay: 'Tushdan so‘ng (Part-time / 14:00 dan so‘ng)',
        workingHoursStart: '14:30',
        workingHoursEnd: '18:30',
        schedule: 'Dushanba – Juma (14:30 – 18:30, Part-time)',
        salaryMin: '3 500 000',
        salaryMax: '5 000 000',
        location: profile.address || 'Qo‘qon shahri',
        eveningTransport: profile.eveningTransportSupported
      });
      showNotice(`"${created.title}" e’loni joylashtirildi va ish izlovchilar profiliga chiqdi!`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Alert */}
      {actionNotice && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 p-3.5 bg-stone-900 text-white text-xs font-semibold rounded-2xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Incoming Messages / Notifications Banner for Employer */}
      {employerNotifications.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <span>Kelib tushgan yangi xabarlar va arizalar ({employerNotifications.length} ta)</span>
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              </h4>
              <p className="text-[11px] text-amber-800 mt-0.5 line-clamp-1">
                {employerNotifications[0].body}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('applied')}
            className="px-3 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs cursor-pointer shrink-0 transition-colors"
          >
            Arizalarni ko‘rish
          </button>
        </div>
      )}

      {/* Main Top Header: Company Card & Actions */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
            {profile.companyName.split(' ').map(n => n[0]).join('').slice(0, 2) || 'IB'}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                {profile.companyName}
              </h1>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Tasdiqlangan Ish beruvchi</span>
              </span>
            </div>

            <p className="text-xs text-stone-500 mt-1 flex items-center gap-2 flex-wrap">
              <span>{profile.category}</span>
              <span className="text-stone-300">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{profile.address}</span>
              </span>
              <span className="text-stone-300">·</span>
              <span>STIR: <strong className="font-mono text-stone-700">{profile.inn || '305 482 910'}</strong></span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start lg:self-auto flex-wrap">
          <button
            onClick={() => setShowCreateJobModal(true)}
            className="h-10 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi e’lon berish</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white rounded-2xl border border-stone-200 p-1.5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          <button
            onClick={() => setActiveTab('applied')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'applied'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Ariza topshirganlar</span>
            <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono ${
              activeTab === 'applied' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-700'
            }`}>
              {appliedCandidates.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('matching')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'matching'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Ro‘yxatdagi nomzodlar</span>
            <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono ${
              activeTab === 'matching' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-700'
            }`}>
              {matchingJobSeekers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Tashkilot profili</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Faol e’lonlar</span>
            <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono ${
              activeTab === 'jobs' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-700'
            }`}>
              {activeJobsCount}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: ARIZA TOPSHIRGAN ISHCHILAR */}
      {activeTab === 'applied' && (
        <div className="space-y-4">
          {/* Search & Filter Header */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nomzod ismi yoki e'lon nomi..."
                className="w-full h-9 pl-9 pr-3 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Barchasi ({appliedCandidates.length})
              </button>
              <button
                onClick={() => setStatusFilter('reviewing')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  statusFilter === 'reviewing'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Kutilmoqda
              </button>
              <button
                onClick={() => setStatusFilter('interview')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  statusFilter === 'interview'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Suhbat belgilangan
              </button>
              <button
                onClick={() => setStatusFilter('accepted')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  statusFilter === 'accepted'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Tasdiqlangan
              </button>
              <button
                onClick={() => setStatusFilter('rejected')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  statusFilter === 'rejected'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Rad etilgan
              </button>
            </div>
          </div>

          {/* Candidates List */}
          {filteredAppliedCandidates.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
              <Users className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="text-base font-bold text-stone-900">
                Hozircha arizalar kelib tushmagan
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Platformadagi soatbay e’loningizga talaba va ish izlovchilar ariza yuborganda, ular shu yerda ko‘rinadi hamda rezyumesini tekshirishingiz mumkin bo‘ladi.
              </p>
              <button
                onClick={() => setShowCreateJobModal(true)}
                className="mt-2 h-9 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Yangi e’lon berish
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAppliedCandidates.map((cand) => (
                <div
                  key={cand.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-emerald-600 transition-all space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-base flex items-center justify-center shrink-0">
                        {cand.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'NOM'}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">{cand.name}</h4>
                        <span className="text-xs text-stone-500 block">
                          {cand.university} · {cand.courseYear}
                        </span>
                        {(cand.mutaxassislik || cand.soha) && (
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            {cand.mutaxassislik && (
                              <span className="text-[10.5px] font-bold text-blue-900 bg-blue-100/80 px-2 py-0.5 rounded-md">
                                {cand.mutaxassislik}
                              </span>
                            )}
                            {cand.soha && (
                              <span className="text-[10px] text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded-md">
                                {cand.soha}
                              </span>
                            )}
                          </div>
                        )}
                        <span className="text-xs font-semibold text-emerald-800 block mt-0.5">
                          E'lon: {cand.appliedFor}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                      cand.status === 'interview'
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : cand.status === 'accepted'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : cand.status === 'rejected'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {cand.statusText}
                    </span>
                  </div>

                  {/* Nomzod belgilagan ish kunlari va soatlari */}
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Qulay ish kunlari:</span>
                      <strong className="text-stone-900">{cand.preferredDays?.join(', ') || 'Moslashuvchan'}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Smena & Soatlar:</span>
                      <strong className="text-emerald-800 font-mono">
                        {cand.workingHoursStart || '14:30'} – {cand.workingHoursEnd || '18:30'} ({cand.workingTimeOfDay || 'Part-time'})
                      </strong>
                    </div>
                    {cand.phone && (
                      <div className="flex items-center justify-between pt-1 border-t border-stone-200/60">
                        <span className="text-stone-500">Telefon:</span>
                        <strong className="text-stone-900 font-mono">{cand.phone}</strong>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-1 gap-2">
                    <button
                      onClick={() => setSelectedResumeCandidate(cand)}
                      className="flex-1 h-9 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-200 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Rezyumeni tekshirish</span>
                    </button>

                    <button
                      onClick={() => onOpenChat(cand.name)}
                      className="h-9 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      title="Muloqot"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#802244]" />
                      <span>Chat</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: RO'YXATDAGI NOMZODLAR */}
      {activeTab === 'matching' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Soatbay ish qidirayotgan talabalar ro‘yxati</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Tizimda ro‘yxatdan o‘tgan va o‘ziga qulay kun va soatlarni belgilagan nomzodlar
            </p>
          </div>

          {matchingJobSeekers.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-stone-300 mx-auto" />
              <h4 className="text-sm font-bold text-stone-800">
                Hozircha yangi nomzodlar ro‘yxatdan o‘tmagan
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Yangi talabalar ro‘yxatdan o‘tgan sari ularning profil va ish vaqtlari shu yerda aks etadi.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchingJobSeekers.map((cand) => (
                <div
                  key={cand.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-emerald-600 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-900 font-bold text-sm flex items-center justify-center shrink-0">
                        {cand.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">{cand.name}</h4>
                        <span className="text-xs text-stone-500 block">
                          {cand.university} · {cand.courseYear}
                        </span>
                        {(cand.mutaxassislik || cand.soha) && (
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            {cand.mutaxassislik && (
                              <span className="text-[10.5px] font-bold text-blue-900 bg-blue-100/80 px-2 py-0.5 rounded-md">
                                {cand.mutaxassislik}
                              </span>
                            )}
                            {cand.soha && (
                              <span className="text-[10px] text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded-md">
                                {cand.soha}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Ishlay oladigan kunlari:</span>
                      <strong className="text-stone-900">{cand.preferredDays?.join(', ') || 'Dushanba – Juma'}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Bo‘sh soatlari:</span>
                      <strong className="text-emerald-800 font-mono">
                        {cand.workingHoursStart || '14:30'} – {cand.workingHoursEnd || '18:30'}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setSelectedResumeCandidate(cand)}
                      className="flex-1 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Rezyumesi</span>
                    </button>
                    <button
                      onClick={() => handleInviteMatchingCandidate(cand)}
                      className="h-9 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Suhbatga taklif qilish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TASHKILOT PROFILI */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Tashkilot rasmiy rekvizitlari va xavfsizlik parametrlari
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Ish beruvchi ma’lumotlari e’lon berayotganda nomzodlarga ko‘rinadi
              </p>
            </div>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-3.5 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingProfile ? 'Bekor qilish' : 'Tahrirlash'}</span>
            </button>
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Tashkilot nomi *</label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.companyName}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, companyName: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">STIR (INN) *</label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.inn}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, inn: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-xl border border-stone-300 text-stone-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Manzil *</label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.address}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, address: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Telefon raqam *</label>
                  <input
                    type="tel"
                    required
                    value={editProfileForm.phone}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, phone: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mas’ul xodim (F.I.Sh) *</label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.contactPerson}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, contactPerson: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Elektron pochta</label>
                  <input
                    type="email"
                    value={editProfileForm.email}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, email: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Tashkilot tavsifi</label>
                <textarea
                  rows={3}
                  value={editProfileForm.description}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 text-stone-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                >
                  Saqlash
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 block mb-0.5">Yuridik nomi:</span>
                <strong className="text-stone-900 text-sm">{profile.companyName}</strong>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 block mb-0.5">Yuridik STIR (INN):</span>
                <strong className="text-stone-900 font-mono text-sm">{profile.inn || 'Kiritilmagan'}</strong>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 block mb-0.5">Manzil:</span>
                <strong className="text-stone-900">{profile.address}</strong>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 block mb-0.5">Mas’ul xodim va telefon:</span>
                <strong className="text-stone-900">{profile.contactPerson} ({profile.phone})</strong>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 sm:col-span-2">
                <span className="text-stone-500 block mb-0.5">Tashkilot tavsifi:</span>
                <p className="text-stone-700 leading-relaxed">{profile.description}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: FAOL E'LONLAR */}
      {activeTab === 'jobs' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Tashkilot faol e’lonlari ({activeJobsCount} ta)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Siz joylashtirgan barcha soatbay vakansiyalar
              </p>
            </div>
            <button
              onClick={() => setShowCreateJobModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yangi e’lon</span>
            </button>
          </div>

          {activeJobsCount === 0 ? (
            <div className="p-10 text-center space-y-2">
              <Briefcase className="w-10 h-10 text-stone-300 mx-auto" />
              <h4 className="text-sm font-bold text-stone-800">Hozircha e’lonlar mavjud emas</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Yangi soatbay ish e’loni bersangiz, u darhol ish izlovchilar profilinga chiqadi.
              </p>
              <button
                onClick={() => setShowCreateJobModal(true)}
                className="mt-2 h-9 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer"
              >
                E’lon berish
              </button>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 font-medium">
              Sizning {activeJobsCount} ta faol e’loningiz ish izlovchilar qidiruvida va bosh sahifada ko‘rinmoqda.
            </div>
          )}
        </div>
      )}

      {/* MODAL: RESUME INSPECTION (REZYUMENI TEKSHIRISH) */}
      {selectedResumeCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                  {selectedResumeCandidate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">{selectedResumeCandidate.name}</h3>
                  <span className="text-xs text-stone-500">Nomzod rezyumesi va ish parametrlari</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedResumeCandidate(null)}
                className="w-8 h-8 rounded-full hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto text-xs">
              {/* Status and Action Buttons */}
              <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-stone-500 block">Joriy holat:</span>
                  <span className={`font-bold text-xs ${
                    selectedResumeCandidate.status === 'accepted' || selectedResumeCandidate.status === 'interview'
                      ? 'text-emerald-800'
                      : selectedResumeCandidate.status === 'rejected'
                      ? 'text-rose-800'
                      : 'text-amber-800'
                  }`}>
                    {selectedResumeCandidate.statusText || 'Ko‘rib chiqilmoqda'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateCandidateStatus(selectedResumeCandidate.id || selectedResumeCandidate.appId, 'interview')}
                    className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Suhbat belgilash
                  </button>
                  <button
                    onClick={() => handleUpdateCandidateStatus(selectedResumeCandidate.id || selectedResumeCandidate.appId, 'accepted')}
                    className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Tasdiqlash
                  </button>
                  <button
                    onClick={() => handleUpdateCandidateStatus(selectedResumeCandidate.id || selectedResumeCandidate.appId, 'rejected')}
                    className="px-3 py-2 rounded-xl border border-stone-300 hover:bg-stone-200 text-stone-700 font-semibold text-xs cursor-pointer"
                  >
                    Rad etish
                  </button>
                </div>
              </div>

              {/* Work Schedule Preferences (Kunlari, Kun vaqti, Soatlari) */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
                <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Nomzod ishlashni hohlagan kunlari, kun vaqti va soatlari</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-stone-800">
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                    <span className="text-[11px] text-stone-500 block">Qulay ish kunlari:</span>
                    <strong className="text-stone-900 mt-0.5 block">
                      {selectedResumeCandidate.preferredDays?.join(', ') || 'Dushanba – Juma'}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                    <span className="text-[11px] text-stone-500 block">Kun vaqti (Smena):</span>
                    <strong className="text-emerald-900 mt-0.5 block">
                      {selectedResumeCandidate.workingTimeOfDay || 'Tushdan so‘ng (Part-time)'}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                    <span className="text-[11px] text-stone-500 block">Aniq ish soatlari:</span>
                    <strong className="text-emerald-800 font-mono mt-0.5 block">
                      {selectedResumeCandidate.workingHoursStart || '14:30'} – {selectedResumeCandidate.workingHoursEnd || '18:30'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Nomzodning Sohasi va Mutaxassisligi (Ish beruvchiga taqdim etilgan) */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2.5">
                <h4 className="font-bold text-blue-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-700" />
                  <span>Nomzod sohasi va mutaxassisligi</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-800">
                  <div className="p-2.5 bg-white rounded-xl border border-blue-100">
                    <span className="text-[11px] text-stone-500 block">Faoliyat sohasi:</span>
                    <strong className="text-stone-900 block mt-0.5">
                      {selectedResumeCandidate.soha || 'Ta’lim va repetitorlik'}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-blue-100">
                    <span className="text-[11px] text-stone-500 block">Mutaxassislik / Kasb:</span>
                    <strong className="text-blue-900 font-bold block mt-0.5">
                      {selectedResumeCandidate.mutaxassislik || 'Talaba / Mutaxassis'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Shaxsiy & Aloqa ma'lumotlari */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Aloqa & Shaxsiy ma’lumotlar</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                  <div>Telefon: <strong className="text-stone-900 font-mono">{selectedResumeCandidate.phone}</strong></div>
                  <div>Manzil: <strong className="text-stone-900">{selectedResumeCandidate.district || 'Qo‘qon shahri'}</strong></div>
                  <div>Ta’lim muassasasi: <strong className="text-stone-900">{selectedResumeCandidate.university}</strong></div>
                  <div>Bosqich: <strong className="text-stone-900">{selectedResumeCandidate.courseYear}</strong></div>
                </div>
              </div>

              {/* Ko'nikmalar va Tajriba */}
              {(selectedResumeCandidate.skills?.length > 0 || selectedResumeCandidate.bio) && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Ko‘nikmalar & Qo‘shimcha ma’lumot
                  </h4>
                  {selectedResumeCandidate.bio && (
                    <p className="text-stone-700 italic bg-white p-2.5 rounded-xl border border-stone-200">
                      "{selectedResumeCandidate.bio}"
                    </p>
                  )}
                  {selectedResumeCandidate.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedResumeCandidate.skills.map((s: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-800 text-[11px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedResumeCandidate(null)}
                className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 font-semibold text-xs text-stone-800 cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE JOB (YANGI E'LON BERISH) */}
      {showCreateJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            <div className="px-6 py-4 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-bold text-emerald-950 text-base">
                  Yangi soatbay ish e’loni berish
                </h3>
                <p className="text-xs text-emerald-800">
                  Ish izlovchilar uchun o‘zingiz hohlagan kun, vaqt va soatlarni belgilang
                </p>
              </div>
              <button
                onClick={() => setShowCreateJobModal(false)}
                className="w-8 h-8 rounded-full hover:bg-emerald-200/50 flex items-center justify-center text-emerald-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="p-6 space-y-4 overflow-y-auto text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Vakansiya / E’lon nomi *
                </label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="Masalan: Ingliz tili repetitori (part-time), Kassa ma’muri..."
                  className="w-full h-10 px-3 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* ISH BERUVCHI BELGILAYDIGAN KUNLAR, KUN VAQTI VA SOATLARI */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <span className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>Ish beruvchi hohlagan kun vaqti va soatlari *</span>
                </span>

                {/* Kunlar */}
                <div>
                  <span className="block font-semibold text-stone-700 mb-1.5">Hafta kunlari:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'].map((day) => {
                      const selected = newJob.workingDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            setNewJob({
                              ...newJob,
                              workingDays: selected
                                ? newJob.workingDays.filter(d => d !== day)
                                : [...newJob.workingDays, day]
                            });
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selected
                              ? 'bg-emerald-700 text-white border-emerald-700'
                              : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Kun vaqti (Smena) */}
                <div>
                  <span className="block font-semibold text-stone-700 mb-1">Kun vaqti (Smena):</span>
                  <select
                    value={newJob.workingTimeOfDay}
                    onChange={(e) => setNewJob({ ...newJob, workingTimeOfDay: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl border border-stone-300 bg-white text-stone-900"
                  >
                    <option value="Tushdan so‘ng (Part-time / 14:00 dan so‘ng)">Tushdan so‘ng (Part-time / 14:00 dan so‘ng)</option>
                    <option value="Kechki smena (17:00 – 21:00)">Kechki smena (17:00 – 21:00)</option>
                    <option value="Ertalabki smena (08:30 – 13:00)">Ertalabki smena (08:30 – 13:00)</option>
                    <option value="Moslashuvchan grafik (Kelishuv asosida)">Moslashuvchan grafik (Kelishuv asosida)</option>
                  </select>
                </div>

                {/* Soatlar */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Boshlanish vaqti</label>
                    <input
                      type="time"
                      value={newJob.workingHoursStart}
                      onChange={(e) => setNewJob({ ...newJob, workingHoursStart: e.target.value })}
                      className="w-full h-9 px-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Tugash vaqti</label>
                    <input
                      type="time"
                      value={newJob.workingHoursEnd}
                      onChange={(e) => setNewJob({ ...newJob, workingHoursEnd: e.target.value })}
                      className="w-full h-9 px-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Maosh va Manzil */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Oylik maosh (so‘mda)</label>
                  <input
                    type="text"
                    value={newJob.salaryMin}
                    onChange={(e) => setNewJob({ ...newJob, salaryMin: e.target.value })}
                    placeholder="3 500 000"
                    className="w-full h-9.5 px-3 rounded-xl border border-stone-300 text-stone-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Ish joyi manzili</label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="w-full h-9.5 px-3 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="eveningTransport"
                  checked={newJob.eveningTransport}
                  onChange={(e) => setNewJob({ ...newJob, eveningTransport: e.target.checked })}
                  className="w-4 h-4 text-emerald-700 accent-emerald-700 rounded"
                />
                <label htmlFor="eveningTransport" className="text-xs text-stone-700 font-medium cursor-pointer">
                  Kechki smena tugagach xavfsiz transport ta’minlanadi
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateJobModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 font-semibold text-stone-700 cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer shadow-md transition-colors"
                >
                  E’lonni joylashtirish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
