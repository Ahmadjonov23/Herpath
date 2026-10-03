import { Job, Application, AppNotification, EmployerProfile } from '../types';

const STORAGE_KEYS = {
  JOBS: 'soatbay_jobs_v2',
  APPLICATIONS: 'soatbay_applications_v2',
  NOTIFICATIONS: 'soatbay_notifications_v2',
  EMPLOYER_PROFILE: 'soatbay_employer_profile_v2'
};

export type StoredCandidateApplication = Application & {
  candidate?: any;
};

export type ExtendedNotification = AppNotification;

// 1. JOBS STORAGE (Starts empty, no demo ads)
export const getStoredJobs = (): Job[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading jobs:', err);
    return [];
  }
};

export const saveStoredJobs = (jobs: Job[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    window.dispatchEvent(new Event('soatbay_jobs_updated'));
  } catch (err) {
    console.error('Error saving jobs:', err);
  }
};

// 2. APPLICATIONS STORAGE (Starts empty, only real submissions)
export const getStoredApplications = (): Application[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading applications:', err);
    return [];
  }
};

export const saveStoredApplications = (apps: Application[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    window.dispatchEvent(new Event('soatbay_applications_updated'));
  } catch (err) {
    console.error('Error saving applications:', err);
  }
};

// 3. NOTIFICATIONS STORAGE (Real notifications for applicant & employer)
export const getStoredNotifications = (): AppNotification[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading notifications:', err);
    return [];
  }
};

export const saveStoredNotifications = (notifications: AppNotification[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    window.dispatchEvent(new Event('soatbay_notifications_updated'));
  } catch (err) {
    console.error('Error saving notifications:', err);
  }
};

// 4. EMPLOYER PROFILE STORAGE
export const getStoredEmployerProfile = (): EmployerProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EMPLOYER_PROFILE);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading employer profile:', err);
    return null;
  }
};

export const saveStoredEmployerProfile = (profile: EmployerProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.EMPLOYER_PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Error saving employer profile:', err);
  }
};

// 5. UPDATE APPLICATION STATUS
export const updateStoredApplicationStatus = (
  candidateOrAppId: string,
  newStatus: 'interview' | 'accepted' | 'rejected',
  companyName: string = 'Ish beruvchi'
): Application | null => {
  try {
    const apps = getStoredApplications();
    let updatedApp: Application | null = null;
    let updatedJobTitle = 'Vakansiya';

    const statusLabels: Record<string, string> = {
      interview: 'Suhbat belgilandi',
      accepted: 'Tasdiqlandi / Qabul qilindi',
      rejected: 'Rad etildi'
    };

    const newApps = apps.map((app) => {
      if (app.id === candidateOrAppId || (app as any).candidate?.id === candidateOrAppId) {
        updatedJobTitle = app.jobTitle;
        updatedApp = {
          ...app,
          status: newStatus,
          statusLabelUz: statusLabels[newStatus] || newStatus
        };
        return updatedApp;
      }
      return app;
    });

    saveStoredApplications(newApps);

    // Send notification to Job Seeker
    const notifs = getStoredNotifications();
    const isApproved = newStatus === 'accepted';
    const isInterview = newStatus === 'interview';

    let title = '';
    let body = '';

    if (isApproved) {
      title = `Ariza tasdiqlandi! 🎉 (${companyName})`;
      body = `Tabriklaymiz! "${updatedJobTitle}" vakansiyasi bo'yicha arizangiz ${companyName} tomonidan qabul qilindi.`;
    } else if (isInterview) {
      title = `Suhbatga taklifnoma 📞 (${companyName})`;
      body = `"${updatedJobTitle}" vakansiyasi bo'yicha suhbatga taklif etildingiz.`;
    } else {
      title = `Ariza holati yangilandi (${companyName})`;
      body = `"${updatedJobTitle}" vakansiyasi bo'yicha arizangiz ish beruvchi tomonidan rad etildi.`;
    }

    const newNotification: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      category: 'application',
      title,
      body,
      time: 'Hozirgina',
      isRead: false,
      targetRole: 'job_seeker'
    };

    saveStoredNotifications([newNotification, ...notifs]);

    return updatedApp;
  } catch (err) {
    console.error('Error updating application status:', err);
    return null;
  }
};
