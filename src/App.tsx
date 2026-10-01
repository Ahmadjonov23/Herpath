import React, { useState, useEffect } from 'react';
import {
  TabType,
  UserRole,
  Job,
  Application,
  Companion,
  JobSeekerProfile,
  EmployerProfile
} from './types';
import {
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  NOTIFICATIONS,
  CONVERSATIONS
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { LandingPageView } from './components/LandingPageView';
import { HomeView } from './components/HomeView';
import { JobSearchView } from './components/JobSearchView';
import { JobDetailsModal } from './components/JobDetailsModal';
import { VerificationModal } from './components/VerificationModal';
import { SafeMapView } from './components/SafeMapView';
import { NearbyCompanionsView } from './components/NearbyCompanionsView';
import { ApplicationsView } from './components/ApplicationsView';
import { SavedJobsView } from './components/SavedJobsView';
import { ProfileView } from './components/ProfileView';
import { ChatView } from './components/ChatView';
import { NotificationsView } from './components/NotificationsView';
import { UniversityPartnersView } from './components/UniversityPartnersView';
import { EmployerDashboardView } from './components/EmployerDashboardView';
import { AdminVerificationView } from './components/AdminVerificationView';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthModal } from './components/AuthModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation & Auth State
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('job_seeker');
  const [userName, setUserName] = useState<string>('Dilnoza Karimova');

  // Detailed standard profile state for both user types
  const [jobSeekerProfile, setJobSeekerProfile] = useState<JobSeekerProfile | undefined>({
    fullName: 'Dilnoza Karimova',
    phone: '+998 90 123 45 67',
    email: 'dilnoza.karimova@edu.uz',
    birthDate: '2004-05-14',
    gender: 'Ayol',
    university: 'Kokand University',
    faculty: 'Dizayn va amaliy san’at / To‘qimachilik texnologiyalari',
    courseYear: '3-kurs talabasi',
    studyType: 'Kunduzgi',
    district: 'Qo‘qon shahri, Shoxruxobod mavzesi',
    desiredPosition: 'Tekstil konstruktori / Tikuvchilik ustasi yordamchisi',
    expectedSalary: '3 500 000 – 5 000 000 so‘m',
    preferredHours: 'Part-time (14:30 dan so‘ng)',
    freeHours: '14:30 – 19:00 (Dushanba-Juma)',
    languages: ['O‘zbek tili (Ona tili)', 'Rus tili (Erkin)', 'Ingliz tili (IELTS 7.0)'],
    skills: ['Tikuv mashinalari bilan ishlash', 'Lekalo va bichish', 'Kompyuter savodxonligi', 'Figma', 'Jamoada ishlash'],
    interests: ['To‘qimachilik sanoati', 'Kiyim dizayni', 'Xorijiy tillar'],
    experience: '1 yillik tikuvchilik va modellashtirish amaliyoti',
    bio: 'Kokand University talabasiman. Tikuvchilik va kiyim-kechak ishlab chiqarish sohasida bilim va amaliy ko‘nikmaga egaman. Darsdan so‘ng xavfsiz to‘qimachilik fabrikasida ishlashni xohlayman.',
    safetyPreferences: {
      cctvRequired: true,
      transportRequired: true,
      femaleStaffOnly: false
    },
    certificates: [
      {
        id: 'cert-1',
        title: 'Tikuvchilik-modellash va trikotaj mahsulotlari texnologi',
        issuer: 'Qo‘qon Hunarmandchilik va Kasbiy Ta’lim Markazi',
        date: '2025-yil',
        fileName: 'tikuvchilik_mutaxassislik_sertifikati.pdf'
      },
      {
        id: 'cert-2',
        title: 'Ingliz tili IELTS 7.0 Xalqaro sertifikati',
        issuer: 'British Council Uzbekistan',
        date: '2025-yil',
        fileName: 'ielts_certificate_dilnoza.pdf'
      }
    ],
    recommendations: [
      {
        id: 'rec-1',
        recommenderName: 'Prof. Xursheda Rahimova',
        organization: 'Kokand University',
        role: 'Fakultet dekani o‘rinbosari',
        phone: '+998 91 234 56 78',
        text: 'Dilnoza Karimova intiluvchan, darslarda namunali va o‘z mutaxassisligini chuqur o‘rganayotgan iqtidorli talaba. Jamoada halol va mas’uliyatli faoliyat yuritishiga to‘liq kafolat beraman.',
        fileName: 'dekanat_tavsiyanomasi.pdf'
      }
    ]
  });

  const [employerProfile, setEmployerProfile] = useState<EmployerProfile | undefined>({
    companyName: 'Kokand Textile Fabrikasi MCHJ',
    inn: '305 482 910',
    legalType: 'MCHJ (To‘qimachilik qo‘shma korxonasi)',
    category: 'To‘qimachilik va Tikuvchilik (Textile Fabrikasi)',
    address: 'Qo‘qon shahri, Yangi Chorsu ko‘chasi 18-uy (Sanoat hududi)',
    landmark: 'Qo‘qon Erkin Iqtisodiy Zonasi, 2-sanoat zonasi',
    contactPerson: 'Nargiza Yo‘ldosheva',
    contactRole: 'Kadrlar bo‘limi boshlig‘i va HR direktori',
    phone: '+998 73 542 12 34',
    email: 'hr@kokandtextile.uz',
    website: 'https://kokandtextile.uz',
    employeeCount: '450+ nafar (88% xotin-qizlar)',
    description: 'Qo‘qon shahrining yetakchi to‘qimachilik va tayyor kiyim-kechak fabrikasi. Talaba qizlar va yosh mutaxassislar uchun qulay darsdan keyingi smenalar, bepul xizmat avtobusi, issiq ovqat va to‘liq videokuzatuv tizimi yaratilgan.',
    eveningTransportSupported: true,
    cctvEquipped: true,
    formalContractGuaranteed: true,
    femaleStaffRatio: '88%',
    verifiedSince: '2026-yil',
    isVerified: true,
    permitFile: {
      name: 'davlat_ruxsatnomasi_kokand_textile_2026.pdf',
      size: '2.4 MB',
      uploadDate: '2026-yil 12-fevral',
      type: 'application/pdf'
    }
  });

  // Modals state
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState<{
    mode?: 'role_selection' | 'register_details' | 'sign_in';
    initialRole?: 'job_seeker' | 'employer';
    initialPhone?: string;
  }>({});

  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [verificationJob, setVerificationJob] = useState<Job | null>(null);

  // Data state
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [filterPreset, setFilterPreset] = useState<string | undefined>(undefined);

  // Toast notification state
  const [toastText, setToastText] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => {
      setToastText(null);
    }, 3200);
  };

  // URL Hash check for direct admin access (#admin)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setAdminLoginModalOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Open Auth Modal helper
  const handleOpenAuth = (
    mode: 'role_selection' | 'register_details' | 'sign_in' = 'role_selection',
    role?: 'job_seeker' | 'employer',
    phone?: string
  ) => {
    setAuthModalConfig({
      mode,
      initialRole: role || (userRole === 'admin' ? 'job_seeker' : userRole),
      initialPhone: phone
    });
    setAuthModalOpen(true);
  };

  // Bookmark toggle
  const handleSaveToggle = (jobId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
        showToast("Ish saqlanganlardan olib tashlandi.");
      } else {
        next.add(jobId);
        showToast("Ish xatcho‘pga saqlandi!");
      }
      return next;
    });
  };

  // Job selection
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setJobDetailsOpen(true);
  };

  // Open verification modal
  const handleOpenVerification = (job: Job, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setVerificationJob(job);
    setVerificationModalOpen(true);
  };

  // Apply to job
  const handleApplySuccess = (job: Job) => {
    if (!isLoggedIn) {
      handleOpenAuth('sign_in', 'job_seeker');
      return;
    }
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: 'Bugun',
      status: 'reviewing',
      statusLabelUz: 'Ko‘rib chiqilmoqda',
      note: 'Arizangiz HR mutaxassisi tomonidan o‘rganilmoqda.'
    };
    setApplications([newApp, ...applications]);
    showToast(`"${job.title}" lavozimiga arizangiz muvaffaqiyatli yuborildi!`);
  };

  // View job on map
  const handleViewJobOnMap = (job: Job) => {
    setSelectedJob(job);
    setCurrentTab('map');
  };

  // Navigate to Jobs with a filter preset
  const handleNavigateToJobsWithFilter = (preset?: string) => {
    setFilterPreset(preset);
    setCurrentTab('jobs');
  };

  // Role switch from top pill: [ Ish qidiryapman | Xodim qidiryapman ]
  const handleSwitchRoleTab = (role: 'job_seeker' | 'employer') => {
    setUserRole(role);
    if (isLoggedIn) {
      if (role === 'employer') {
        setCurrentTab('employer');
      } else {
        setCurrentTab('home');
      }
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('job_seeker');
    setUserName('Dilnoza Karimova');
    setCurrentTab('home');
    showToast("Tizimdan chiqildi.");
  };

  // Successful login from AuthModal
  const handleLoginSuccess = (role: UserRole, name: string, profileData?: any) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);

    if (role === 'admin') {
      setCurrentTab('admin');
      showToast("Administrator konsoliga muvaffaqiyatli kirdingiz!");
    } else if (role === 'employer') {
      if (profileData) {
        setEmployerProfile(profileData);
      }
      setCurrentTab('employer');
      showToast(`Xush kelibsiz! "${name}" ish beruvchi kabinetiga kirdingiz.`);
    } else {
      if (profileData) {
        setJobSeekerProfile(profileData);
      }
      setCurrentTab('home');
      showToast(`Xush kelibsiz, ${name}! Profilingiz ochildi.`);
    }
  };

  // Saved Jobs list
  const savedJobsList = jobs.filter((j) => savedJobIds.has(j.id));

  // Render main view based on state
  const renderCurrentView = () => {
    // 1. LANDING PAGE VIEW (When not logged in on home tab)
    if (!isLoggedIn && currentTab === 'home') {
      return (
        <LandingPageView
          jobs={jobs}
          savedJobIds={savedJobIds}
          onSelectJob={handleSelectJob}
          onSaveToggle={handleSaveToggle}
          onVerifyClick={handleOpenVerification}
          onOpenAuth={handleOpenAuth}
          onExploreJobs={handleNavigateToJobsWithFilter}
          activeRoleTab={userRole === 'employer' ? 'employer' : 'job_seeker'}
          onChangeRoleTab={handleSwitchRoleTab}
        />
      );
    }

    // 2. ADMIN ROLE VIEW
    if (userRole === 'admin' || currentTab === 'admin') {
      return (
        <AdminVerificationView
          onLogoutAdmin={handleLogout}
          jobs={jobs}
          onApproveJob={(jobId) => {
            setJobs((prev) =>
              prev.map((j) => (j.id === jobId ? { ...j, isVerified: true, verificationLevel: 'high' } : j))
            );
            showToast("Vakansiya xavfsizlik auditidan o‘tkazildi va tasdiqlandi!");
          }}
          onRejectJob={(jobId) => {
            setJobs((prev) => prev.filter((j) => j.id !== jobId));
            showToast("Vakansiya moderatsiyadan o‘tmadi va olib tashlandi.");
          }}
        />
      );
    }

    // 3. EMPLOYER ROLE VIEW (When logged in as employer or in employer tab)
    if (userRole === 'employer' || currentTab === 'employer') {
      return (
        <EmployerDashboardView
          onOpenChat={() => setCurrentTab('chat')}
          onCreateJob={(newJob) => {
            setJobs((prev) => [newJob, ...prev]);
            showToast(`"${newJob.title}" yangi vakansiyasi joylashtirildi!`);
          }}
          activeJobsCount={jobs.length}
          employerProfile={employerProfile}
          onUpdateEmployerProfile={(upd) => {
            setEmployerProfile(upd);
            setUserName(upd.companyName);
            showToast("Tashkilot rekvizitlari saqlandi!");
          }}
        />
      );
    }

    // 4. LOGGED IN STUDENT (JOB SEEKER) VIEWS
    switch (currentTab) {
      case 'home':
        return (
          <HomeView
            userName={userName}
            recommendedJobs={jobs}
            savedJobIds={savedJobIds}
            onSelectJob={handleSelectJob}
            onSaveToggle={handleSaveToggle}
            onVerifyClick={handleOpenVerification}
            onNavigateToMap={() => setCurrentTab('map')}
            onNavigateToJobs={handleNavigateToJobsWithFilter}
            onNavigateToCompanions={() => setCurrentTab('map')}
          />
        );
      case 'jobs':
        return (
          <JobSearchView
            jobs={jobs}
            savedJobIds={savedJobIds}
            initialFilterPreset={filterPreset}
            onSelectJob={handleSelectJob}
            onSaveToggle={handleSaveToggle}
            onVerifyClick={handleOpenVerification}
          />
        );
      case 'map':
        return (
          <SafeMapView
            selectedJob={selectedJob}
            onNavigateToCompanions={() => setCurrentTab('profile')}
          />
        );
      case 'applications':
        return (
          <ApplicationsView
            applications={applications}
            onOpenChat={() => setCurrentTab('chat')}
            onExploreJobs={() => setCurrentTab('jobs')}
          />
        );
      case 'saved':
        return (
          <SavedJobsView
            savedJobs={savedJobsList}
            onSelectJob={handleSelectJob}
            onSaveToggle={handleSaveToggle}
            onOpenVerification={handleOpenVerification}
            onExploreJobs={() => setCurrentTab('jobs')}
          />
        );
      case 'chat':
        return (
          <ChatView
            onBack={() => setCurrentTab('home')}
          />
        );
      case 'notifications':
        return (
          <NotificationsView
            onNavigateTab={(tab) => setCurrentTab(tab)}
          />
        );
      case 'university':
        return (
          <UniversityPartnersView
            onExploreUniversityJobs={() => handleNavigateToJobsWithFilter('talaba')}
          />
        );
      case 'profile':
      default:
        return (
          <ProfileView
            onNavigateToMap={() => setCurrentTab('map')}
            onReplayOnboarding={() => setOnboardingOpen(true)}
            onLogout={handleLogout}
            profileData={jobSeekerProfile}
            onUpdateProfile={(upd) => {
              setJobSeekerProfile(upd);
              setUserName(upd.fullName);
              showToast("Talaba ma’lumotlari saqlandi!");
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] flex flex-col font-sans selection:bg-[#E51B24] selection:text-white antialiased">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        savedCount={savedJobIds.size}
        userName={userName}
        userRole={userRole}
        isLoggedIn={isLoggedIn}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenHelp={() => setOnboardingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-12">
        {renderCurrentView()}
      </main>

      {/* Mobile Fixed Bottom Nav (shown on small screens) */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        applicationsCount={applications.length}
      />

      {/* Footer: Clean, professional footer with discreet admin access link */}
      <footer className="border-t border-stone-200 bg-white py-8 px-4 sm:px-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E51B24] to-[#B91C1C] text-white font-extrabold text-xs flex items-center justify-center">
              HP
            </div>
            <span className="font-bold text-stone-900 text-sm">HerPath</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Qo‘qon shahri talabalari uchun xavfsiz va qulay ish o‘rinlari</span>
          </div>

          <div className="flex items-center gap-5 text-stone-600 flex-wrap justify-center">
            <button
              onClick={() => setCurrentTab('university')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Hamkor OTMlar
            </button>
            <button
              onClick={() => handleSwitchRoleTab(userRole === 'employer' ? 'job_seeker' : 'employer')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              {userRole === 'employer' ? 'Ish qidiruvchi (Talaba)' : 'Xodim qidiruvchi (Ish beruvchi)'}
            </button>
            <button
              onClick={() => setOnboardingOpen(true)}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Yordam va Yo‘riqnoma
            </button>

            {/* Discreet Admin Link in footer (Removed from top Navbar as requested) */}
            <button
              onClick={() => setAdminLoginModalOpen(true)}
              className="hover:text-stone-900 transition-colors cursor-pointer text-stone-400 hover:text-stone-600 flex items-center gap-1"
              title="Admin tizimi"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin tizimi</span>
            </button>
          </div>

          <div className="text-stone-400 text-center md:text-right">
            © 2026 HerPath. Toshkent, O‘zbekiston.
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastText && (
        <div className="fixed bottom-18 md:bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-50 p-3 bg-stone-900 text-white text-xs font-semibold rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Modals */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onComplete={() => setOnboardingOpen(false)}
      />

      {/* Registration & Sign In Modal for Job Seeker & Employer */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenAdminLogin={() => {
          setAuthModalOpen(false);
          setAdminLoginModalOpen(true);
        }}
        initialMode={authModalConfig.mode}
        initialRole={authModalConfig.initialRole}
        initialPhone={authModalConfig.initialPhone}
      />

      {/* Admin Login Modal (Login: admin@herpath.uz / Parol: admin2026) */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onLoginSuccess={(adminName) => {
          setIsLoggedIn(true);
          setUserRole('admin');
          setUserName(adminName);
          setCurrentTab('admin');
          showToast("Administrator konsoliga xush kelibsiz!");
        }}
      />

      <JobDetailsModal
        job={selectedJob}
        isOpen={jobDetailsOpen}
        isSaved={selectedJob ? savedJobIds.has(selectedJob.id) : false}
        onClose={() => setJobDetailsOpen(false)}
        onSaveToggle={(id) => handleSaveToggle(id)}
        onViewOnMap={handleViewJobOnMap}
        onApplySuccess={handleApplySuccess}
        onOpenVerification={(job) => {
          setJobDetailsOpen(false);
          handleOpenVerification(job);
        }}
      />

      <VerificationModal
        job={verificationJob}
        isOpen={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
      />
    </div>
  );
}
