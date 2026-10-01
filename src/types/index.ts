export type TabType = 'home' | 'jobs' | 'map' | 'applications' | 'profile' | 'saved' | 'chat' | 'notifications' | 'university' | 'employer' | 'admin';

export type UserRole = 'job_seeker' | 'employer' | 'admin';

export interface JobSeekerProfile {
  fullName: string;
  phone: string;
  email: string;
  birthDate?: string;
  gender?: string;
  university: string;
  faculty: string;
  courseYear: string;
  studyType?: string;
  district: string;
  desiredPosition?: string;
  expectedSalary?: string;
  preferredHours: string;
  freeHours?: string;
  // Ish izlovchi o'zi ishlashni hohlagan kunlari, kun vaqti va soatlari
  preferredDays?: string[];
  workingTimeOfDay?: string;
  workingHoursStart?: string;
  workingHoursEnd?: string;
  languages?: string[];
  skills: string[];
  interests: string[];
  experience?: string;
  bio?: string;
  safetyPreferences?: {
    cctvRequired: boolean;
    transportRequired: boolean;
    femaleStaffOnly: boolean;
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
}

export interface EmployerProfile {
  companyName: string;
  inn: string;
  legalType?: string;
  category: string;
  address: string;
  landmark?: string;
  contactPerson: string;
  contactRole?: string;
  phone: string;
  email: string;
  website?: string;
  employeeCount?: string;
  description?: string;
  eveningTransportSupported: boolean;
  cctvEquipped: boolean;
  formalContractGuaranteed?: boolean;
  femaleStaffRatio?: string;
  verifiedSince: string;
  isVerified: boolean;
  permitFile?: {
    name: string;
    size: string;
    uploadDate: string;
    type?: string;
  };
}

export interface AdminProfile {
  fullName: string;
  email: string;
  role: string;
  lastLogin: string;
}

export type JobType = 'part-time' | 'remote' | 'flexible' | 'internship' | 'full-time';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogoText: string;
  companyCategory: string;
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: string;
  schedule: string;
  // Ish beruvchi e'londa belgilagan ish kunlari, kun vaqti va soatlari
  workingDays?: string[];
  workingTimeOfDay?: string;
  workingHoursStart?: string;
  workingHoursEnd?: string;
  distanceKm: number;
  location: string;
  district: string;
  isVerified: boolean;
  verificationLevel: 'high' | 'standard';
  safetyRating: number; // e.g. 4.9
  reviewCount: number;
  jobType: JobType;
  forStudents: boolean;
  noExperienceRequired: boolean;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  workConditions: string[];
  safetyNotes: string[];
  employerInfo: {
    inn: string;
    verifiedSince: string;
    physicalAuditDate: string;
    femaleStaffRatio: string;
    eveningTransportSupported: boolean;
    cctvEquipped: boolean;
    contactPerson: string;
    phone: string;
  };
  safetyScores: {
    workEnvironment: number;
    scheduleIntegrity: number;
    teamRespect: number;
    locationConvenience: number;
    eveningCommute: number;
  };
  reviews: {
    id: string;
    author: string;
    role: string;
    university: string;
    comment: string;
    date: string;
    rating: number;
  }[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'submitted' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  statusLabelUz: string;
  note?: string;
  interviewDate?: string;
}

export interface Companion {
  id: string;
  displayName: string;
  university: string;
  major: string;
  approxLocation: string; // "Chilonzor 7-mavze yaqinida"
  distanceMeters: number;
  routeHeading: string;
  isVerifiedStudent: boolean;
  avatarInitials: string;
  walkingTime: string;
  compatibilityScore: number;
}

export interface SafePoint {
  id: string;
  name: string;
  type: 'metro' | 'pharmacy' | 'police' | 'cafe' | 'university' | 'workplace';
  typeLabelUz: string;
  address: string;
  is24Hours: boolean;
  lat: number;
  lng: number;
  description: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'other';
  senderName: string;
  text: string;
  time: string;
  isDelivered?: boolean;
}

export interface Conversation {
  id: string;
  recipientName: string;
  recipientRole: string;
  avatarText: string;
  type: 'employer' | 'companion';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isVerified: boolean;
  messages: ChatMessage[];
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  category: 'job' | 'safety' | 'application' | 'companion';
  time: string;
  isRead: boolean;
  actionTab?: TabType;
  actionId?: string;
}
