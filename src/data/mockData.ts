import { Job, Application, Companion, SafePoint, EmergencyContact, Conversation, AppNotification } from '../types';

// Barcha demo e'lonlar, arizalar va demo ma'lumotlar olib tashlandi
export const INITIAL_JOBS: Job[] = [];

export const INITIAL_APPLICATIONS: Application[] = [];

export const INITIAL_COMPANIONS: Companion[] = [];
export const MOCK_COMPANIONS: Companion[] = [];

export const SAFE_POINTS: SafePoint[] = [
  {
    id: 'sp-1',
    name: 'Kokand University (Bosh bino)',
    type: 'university',
    typeLabelUz: 'Universitet',
    address: 'Turkiston ko‘chasi 28-A',
    is24Hours: true,
    lat: 40.5285,
    lng: 70.9423,
    description: 'Qo‘riqlash xizmati va talabalar uchun 24/7 xavfsiz nuqta.'
  },
  {
    id: 'sp-2',
    name: 'Qo‘qon Shahar Ichki Ishlar Bo‘limi (Navbatchilik)',
    type: 'police',
    typeLabelUz: 'Ichki ishlar punkti',
    address: 'Navoiy shoh ko‘chasi 45',
    is24Hours: true,
    lat: 40.5312,
    lng: 70.9385,
    description: '24/7 navbatchi xodimlar va shoshilinch yordam punkti.'
  },
  {
    id: 'sp-3',
    name: 'Grand Apteka 24/7 (Yorug‘ dorixona)',
    type: 'pharmacy',
    typeLabelUz: '24/7 Dorixona',
    address: 'Istiqlol ko‘chasi 12',
    is24Hours: true,
    lat: 40.5298,
    lng: 70.9451,
    description: 'Yorug‘, videokuzatuvli va doim ochiq bo‘lgan dorixona.'
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [];

export const CONVERSATIONS: Conversation[] = [];

export const NOTIFICATIONS: AppNotification[] = [];

export const UNIVERSITY_PARTNERS = [
  {
    id: 'uni-1',
    name: 'Kokand University',
    shortName: 'Kokand Uni',
    city: 'Qo‘qon',
    studentsCount: '12 000+',
    verifiedJobsCount: 0,
    logoInitial: 'KU',
    badge: 'Bosh hamkor OTM',
    description: 'Talabalarni o‘qish davomida xavfsiz va soatbay grafikli ish o‘rinlari bilan ta’minlash hamkorligi.'
  }
];
