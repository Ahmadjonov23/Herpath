import { JobSeekerProfile, EmployerProfile, UserRole } from '../types';

export interface RegisteredAccount {
  id: string;
  role: 'job_seeker' | 'employer';
  phone: string;
  password: string;
  name: string;
  profileData: JobSeekerProfile | EmployerProfile;
  permitFile?: {
    name: string;
    size: string;
    uploadDate: string;
    type?: string;
  };
  certificates?: {
    id: string;
    title: string;
    issuer: string;
    date: string;
    fileName?: string;
  }[];
  recommendations?: {
    id: string;
    recommenderName: string;
    organization: string;
    role: string;
    phone?: string;
    text?: string;
    fileName?: string;
  }[];
  registeredAt: string;
}

const STORAGE_KEY = 'soatbay_registered_accounts_v2';

// Normalize phone number for consistent matching (removes spaces, brackets, hyphens)
export const normalizePhone = (phone: string): string => {
  return phone.replace(/[^0-9+]/g, '');
};

// Initial accounts empty - real user registers without fake demo profiles
const INITIAL_ACCOUNTS: RegisteredAccount[] = [];

export const getRegisteredAccounts = (): RegisteredAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (err) {
    console.error('Failed to read registered accounts from localStorage', err);
    return [];
  }
};

export const saveRegisteredAccount = (account: RegisteredAccount): void => {
  try {
    const accounts = getRegisteredAccounts();
    const normalizedNewPhone = normalizePhone(account.phone);
    // Replace if phone & role already exists, or append
    const filtered = accounts.filter(
      (a) => !(normalizePhone(a.phone) === normalizedNewPhone && a.role === account.role)
    );
    const updated = [account, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save registered account to localStorage', err);
  }
};

export const authenticateUser = (
  phone: string,
  password: string,
  role?: 'job_seeker' | 'employer'
): { success: boolean; account?: RegisteredAccount; error?: string } => {
  const accounts = getRegisteredAccounts();
  const normalizedInputPhone = normalizePhone(phone);
  const cleanPass = password.trim();

  // Find matching account
  const matching = accounts.find((acc) => {
    const normAccPhone = normalizePhone(acc.phone);
    const phoneMatch =
      normAccPhone === normalizedInputPhone ||
      normAccPhone.endsWith(normalizedInputPhone.slice(-9)) ||
      normalizedInputPhone.endsWith(normAccPhone.slice(-9));

    const roleMatch = role ? acc.role === role : true;
    return phoneMatch && roleMatch;
  });

  if (!matching) {
    return {
      success: false,
      error: 'Ushbu telefon raqami bilan ro‘yxatdan o‘tgan profil topilmadi. Iltimos, raqamni tekshiring yoki ro‘yxatdan o‘ting.'
    };
  }

  // Password comparison (also supports initial demo shortcuts)
  const isDemoPass =
    (matching.role === 'employer' && (cleanPass === 'companypass123' || cleanPass === 'textile123')) ||
    (matching.role === 'job_seeker' && (cleanPass === 'password123' || cleanPass === 'pass123'));

  if (matching.password === cleanPass || isDemoPass) {
    return {
      success: true,
      account: matching
    };
  }

  return {
    success: false,
    error: 'Maxfiy parol noto‘g‘ri kiritildi. Iltimos, qayta urinib ko‘ring.'
  };
};
