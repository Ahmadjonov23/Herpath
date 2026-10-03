import React, { useState, useEffect } from 'react';
import {
  TabType,
  UserRole,
  Job,
  Application,
  Companion,
  JobSeekerProfile,
  EmployerProfile,
  AppNotification
} from './types';
import {
  getStoredJobs,
  saveStoredJobs,
  getStoredApplications,
  saveStoredApplications,
  getStoredNotifications,
  saveStoredNotifications
} from './data/store';
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
import { BrandLogo } from './components/BrandLogo';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation & Auth State
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('job_seeker');
  const [userName, setUserName] = useState<string>('Foydalanuvchi');

  // Detailed standard profile state for both user types (Clean initial state - NO demo data!)
  const [jobSeekerProfile, setJobSeekerProfile] = useState<JobSeekerProfile | undefined>({
    fullName: '',
    phone: '',
    email: '',
    university: 'Kokand University',
    faculty: '',
    courseYear: '1-kurs talabasi',
    studyType: 'Kunduzgi',
    district: 'Qo‘qon shahri',
    expectedSalary: '3 500 000 – 5 000 000 so‘m',
    preferredHours: 'Part-time (14:30 dan so‘ng)',
    freeHours: '14:30 – 18:30',
    preferredDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
    workingTimeOfDay: 'Tushdan so‘ng (Part-time)',
    workingHoursStart: '14:30',
    workingHoursEnd: '18:30',
    skills: [],
    languages: ['O‘zbek tili']
  });

  const [employerProfile, setEmployerProfile] = useState<EmployerProfile | undefined>({
    companyName: 'Ish beruvchi tashkilot',
    inn: '',
    legalType: 'MCHJ',
    category: 'Xususiy korxona',
    address: 'Qo‘qon shahri',
    contactPerson: 'Mas’ul vakil',
    phone: '',
    email: '',
    eveningTransportSupported: true,
    cctvEquipped: true,
    formalContractGuaranteed: true,
    femaleStaffRatio: '75%',
    verifiedSince: '2026-yil',
    isVerified: true
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

  // Data state (Initialized from store: real listings and applications only!)
  const [jobs, setJobs] = useState<Job[]>(() => getStoredJobs());
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const [applications, setApplications] = useState<Application[]>(() => getStoredApplications());
  const [notifications, setNotifications] = useState<AppNotification[]>(() => getStoredNotifications());
  const [filterPreset, setFilterPreset] = useState<string | undefined>(undefined);

  // Toast notification state
  const [toastText, setToastText] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => {
      setToastText(null);
    }, 3200);
  };

  // URL Hash check for direct admin access (#admin) and Store state sync
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setAdminLoginModalOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const syncJobs = () => setJobs(getStoredJobs());
    const syncApps = () => setApplications(getStoredApplications());
    const syncNotifs = () => setNotifications(getStoredNotifications());

    window.addEventListener('soatbay_jobs_updated', syncJobs);
    window.addEventListener('soatbay_applications_updated', syncApps);
    window.addEventListener('soatbay_notifications_updated', syncNotifs);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('soatbay_jobs_updated', syncJobs);
      window.removeEventListener('soatbay_applications_updated', syncApps);
      window.removeEventListener('soatbay_notifications_updated', syncNotifs);
    };
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

  // Apply to job (Sends real application + notification message to employer profile!)
  const handleApplySuccess = (job: Job) => {
    if (!isLoggedIn) {
      handleOpenAuth('sign_in', 'job_seeker');
      return;
    }

    const applicantName = jobSeekerProfile?.fullName?.trim() || userName || 'Ish izlovchi';

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: 'Hozirgina',
      status: 'reviewing',
      statusLabelUz: 'Ko‘rib chiqilmoqda',
      note: 'Arizangiz ish beruvchi tomonidan o‘rganilmoqda.',
      applicantName: applicantName,
      applicantPhone: jobSeekerProfile?.phone || '+998 90 123 45 67',
      applicantEmail: jobSeekerProfile?.email,
      applicantUniversity: jobSeekerProfile?.university || 'OTM talabasi',
      applicantCourseYear: jobSeekerProfile?.courseYear || 'Talaba',
      applicantStudyType: jobSeekerProfile?.studyType || 'Kunduzgi',
      applicantDistrict: jobSeekerProfile?.district || 'Qo‘qon shahri',
      applicantSoha: jobSeekerProfile?.soha || '',
      applicantMutaxassislik: jobSeekerProfile?.mutaxassislik || '',
      applicantExpectedSalary: jobSeekerProfile?.expectedSalary || 'Kelishilgan holda',
      applicantPreferredDays: jobSeekerProfile?.preferredDays || ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
      applicantWorkingTimeOfDay: jobSeekerProfile?.workingTimeOfDay || 'Tushdan so‘ng (Part-time)',
      applicantWorkingHoursStart: jobSeekerProfile?.workingHoursStart || '14:30',
      applicantWorkingHoursEnd: jobSeekerProfile?.workingHoursEnd || '18:30',
      applicantExperience: jobSeekerProfile?.experience,
      applicantBio: jobSeekerProfile?.bio,
      applicantSkills: jobSeekerProfile?.skills || [],
      applicantLanguages: jobSeekerProfile?.languages || ['O‘zbek tili'],
      applicantCertificates: jobSeekerProfile?.certificates || [],
      applicantRecommendations: jobSeekerProfile?.recommendations || []
    };

    setApplications((prev) => {
      const updated = [newApp, ...prev];
      saveStoredApplications(updated);
      return updated;
    });

    // Send application notification to the employer's profile
    const employerNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Yangi ariza kelib tushdi!',
      body: `${applicantName}${jobSeekerProfile?.mutaxassislik ? ` (${jobSeekerProfile.mutaxassislik})` : ''} sizning "${job.title}" e'loningizga ariza yubordi. Rezyumeni tekshirishingiz mumkin.`,
      category: 'application',
      time: 'Hozirgina',
      isRead: false,
      targetRole: 'employer',
      targetCompany: job.company
    };

    setNotifications((prev) => {
      const updated = [employerNotif, ...prev];
      saveStoredNotifications(updated);
      return updated;
    });

    showToast(`"${job.title}" lavozimiga arizangiz yuborildi va ish beruvchiga bildirishnoma yetkazildi!`);
  };

  // Employer creates a new job (immediately appears in job seekers feed & saved to store!)
  const handleCreateJob = (newJob: Job) => {
    setJobs((prev) => {
      const updated = [newJob, ...prev];
      saveStoredJobs(updated);
      return updated;
    });
    showToast(`"${newJob.title}" yangi vakansiyasi barcha ish izlovchilarga taqdim etildi!`);
  };

  // Employer approves or rejects application (immediately notifies job seeker!)
  const handleUpdateApplicationStatus = (appId: string, newStatus: 'interview' | 'accepted' | 'rejected') => {
    let updatedJobTitle = 'Vakansiya';
    let updatedCompany = 'Ish beruvchi';

    setApplications((prev) => {
      const updated = prev.map((a) => {
        if (a.id === appId) {
          updatedJobTitle = a.jobTitle;
          updatedCompany = a.company;
          return {
            ...a,
            status: newStatus,
            statusLabelUz: newStatus === 'interview' ? 'Suhbat belgilandi' : newStatus === 'accepted' ? 'Qabul qilindi' : 'Rad etildi',
            note: newStatus === 'interview'
              ? 'Ish beruvchi sizni suhbatga taklif qildi!'
              : newStatus === 'accepted'
              ? 'Tabriklaymiz, siz ishga qabul qilindingiz!'
              : 'Arizangiz rad etildi.'
          };
        }
        return a;
      });
      saveStoredApplications(updated);
      return updated;
    });

    // Notification message to the job seeker
    const seekerNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: newStatus === 'rejected' ? 'Arizangiz rad etildi' : 'Arizangiz tasdiqlandi!',
      body: newStatus === 'rejected'
        ? `"${updatedJobTitle}" vakansiyasi bo‘yicha arizangiz ${updatedCompany} tomonidan rad etildi.`
        : `Tabriklaymiz! "${updatedJobTitle}" bo‘yicha arizangiz ${updatedCompany} tomonidan tasdiqlandi va suhbat belgilandi!`,
      category: 'application',
      time: 'Hozirgina',
      isRead: false,
      targetRole: 'job_seeker'
    };

    setNotifications((prev) => {
      const updated = [seekerNotif, ...prev];
      saveStoredNotifications(updated);
      return updated;
    });

    showToast(`Nomzod holati yangilandi va nomzod profiliga bildirishnoma yuborildi!`);
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
          onCreateJob={handleCreateJob}
          activeJobs={jobs}
          activeJobsCount={jobs.length}
          employerProfile={employerProfile}
          onUpdateEmployerProfile={(upd) => {
            setEmployerProfile(upd);
            setUserName(upd.companyName);
            showToast("Tashkilot rekvizitlari saqlandi!");
          }}
          applications={applications}
          onUpdateApplicationStatus={handleUpdateApplicationStatus}
          notifications={notifications}
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
            notifications={notifications.filter(n => n.targetRole !== 'employer')}
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
            applications={applications}
            notifications={notifications}
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
        unreadNotificationsCount={
          notifications.filter((n) => (userRole === 'employer' ? n.targetRole === 'employer' : n.targetRole !== 'employer') && !n.isRead).length
        }
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
            <BrandLogo size="sm" showText={true} />
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Talabalar va yoshlar uchun qulay soatbay ishlar platformasi</span>
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
              {userRole === 'employer' ? 'Ish izlovchi' : 'Ish beruvchi'}
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
            © 2026 Soatbay. O‘zbekiston.
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

      {/* Admin Login Modal (Login: admin@soatbay.uz / Parol: admin2026) */}
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
