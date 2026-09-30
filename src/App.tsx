import React, { useState } from 'react';
import { TabType, Job, Application, Companion } from './types';
import {
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  NOTIFICATIONS,
  CONVERSATIONS
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { JobSearchView } from './components/JobSearchView';
import { JobDetailsModal } from './components/JobDetailsModal';
import { VerificationModal } from './components/VerificationModal';
import { SafeMapView } from './components/SafeMapView';
import { NearbyCompanionsView } from './components/NearbyCompanionsView';
import { ApplicationsView } from './components/ApplicationsView';
import { SavedJobsView } from './components/SavedJobsView';
import { SafetyCenterView } from './components/SafetyCenterView';
import { ProfileView } from './components/ProfileView';
import { ChatView } from './components/ChatView';
import { NotificationsView } from './components/NotificationsView';
import { UniversityPartnersView } from './components/UniversityPartnersView';
import { EmployerDashboardView } from './components/EmployerDashboardView';
import { AdminVerificationView } from './components/AdminVerificationView';
import { PitchDeckView } from './components/PitchDeckView';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthModal } from './components/AuthModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [userRole, setUserRole] = useState<'student' | 'employer'>('student');
  const [userName, setUserName] = useState<string>('Dilnoza Karimova');

  // Modals state
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(INITIAL_JOBS[0]);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [verificationJob, setVerificationJob] = useState<Job | null>(INITIAL_JOBS[0]);

  // Data state
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set(['job-1', 'job-3']));
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [filterPreset, setFilterPreset] = useState<string | undefined>(undefined);
  const [activeCompanionChat, setActiveCompanionChat] = useState<Companion | null>(null);

  // Toast notification state
  const [toastText, setToastText] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => {
      setToastText(null);
    }, 3000);
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

  // Switch to Employer Dashboard
  const handleSwitchToEmployer = () => {
    setUserRole('employer');
    setUserName('Bright Academy HR');
    setCurrentTab('employer');
    showToast("Ish beruvchi kabinetiga o‘tildi (Bright Academy).");
  };

  // Switch to Student mode
  const handleSwitchToStudent = () => {
    setUserRole('student');
    setUserName('Dilnoza Karimova');
    setCurrentTab('home');
    showToast("Talaba rejimiga qaytildi (Dilnoza Karimova).");
  };

  // Saved Jobs list
  const savedJobsList = jobs.filter((j) => savedJobIds.has(j.id));

  // Render current tab view
  const renderCurrentView = () => {
    // If in employer mode or employer tab
    if (userRole === 'employer' || currentTab === 'employer') {
      return (
        <EmployerDashboardView
          onSwitchToStudent={handleSwitchToStudent}
          onOpenChat={() => setCurrentTab('chat')}
        />
      );
    }

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
            onNavigateToPitch={() => setCurrentTab('pitch')}
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
            onTriggerSos={() => setCurrentTab('safety')}
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
      case 'safety':
        return (
          <SafetyCenterView
            onBack={() => setCurrentTab('home')}
          />
        );
      case 'university':
        return (
          <UniversityPartnersView
            onExploreUniversityJobs={() => handleNavigateToJobsWithFilter('talaba')}
          />
        );
      case 'admin':
        return <AdminVerificationView />;
      case 'pitch':
        return (
          <PitchDeckView
            onBackToApp={() => setCurrentTab('home')}
            onNavigateToMap={() => setCurrentTab('map')}
            onNavigateToJobs={() => setCurrentTab('jobs')}
          />
        );
      case 'profile':
      default:
        return (
          <ProfileView
            onOpenSafetyCenter={() => setCurrentTab('safety')}
            onReplayOnboarding={() => setOnboardingOpen(true)}
            onSwitchToEmployer={handleSwitchToEmployer}
            onLogout={() => setAuthModalOpen(true)}
          />
        );
    }
  };

  // Full-immersion executive mode for Pitch Deck
  if (currentTab === 'pitch') {
    return (
      <PitchDeckView
        onBackToApp={() => setCurrentTab('home')}
        onNavigateToMap={() => setCurrentTab('map')}
        onNavigateToJobs={() => setCurrentTab('jobs')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] flex flex-col font-sans selection:bg-[#802244] selection:text-white antialiased">
      {/* Main Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'employer') {
            setUserRole('employer');
          }
          setCurrentTab(tab);
        }}
        unreadCount={2}
        savedCount={savedJobIds.size}
        userName={userName}
        userRole={userRole}
        onOpenSos={() => setCurrentTab('safety')}
        onOpenAuth={() => setAuthModalOpen(true)}
        onSwitchRole={userRole === 'student' ? handleSwitchToEmployer : handleSwitchToStudent}
      />

      {/* Main Content Area: Responsive container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-20 md:pb-10">
        {renderCurrentView()}
      </main>

      {/* Mobile Fixed Bottom Nav */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        applicationsCount={applications.length}
      />

      {/* Footer: Editorial, unboxed, strictly human-crafted */}
      <footer className="border-t border-stone-200 bg-white py-6 px-4 sm:px-6 text-xs text-stone-500 hidden md:block">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-stone-900">HerPath</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Xavfsiz ish. Erkin yo‘l. Kuchli kelajak.</span>
          </div>

          <div className="flex items-center gap-4 text-stone-600">
            <button
              onClick={() => setCurrentTab('university')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Universitetlar
            </button>
            <button
              onClick={userRole === 'employer' ? handleSwitchToStudent : handleSwitchToEmployer}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              {userRole === 'employer' ? 'Talaba rejimi' : 'Ish beruvchilar'}
            </button>
            <button
              onClick={() => setCurrentTab('admin')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Xavfsizlik auditi
            </button>
            <button
              onClick={() => setOnboardingOpen(true)}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Qo‘llanma
            </button>
          </div>

          <div className="text-stone-400">
            © 2026 HerPath. Toshkent, O‘zbekiston.
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastText && (
        <div className="fixed bottom-18 md:bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-50 p-3 bg-stone-900 text-white text-xs font-semibold rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Modals */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onComplete={() => setOnboardingOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(role, name) => {
          setUserRole(role);
          setUserName(name);
          showToast(`Xush kelibsiz, ${name}!`);
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
