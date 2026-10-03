/// <reference types="google.maps" />
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary
} from '@vis.gl/react-google-maps';
import { SAFE_POINTS, MOCK_COMPANIONS } from '../data/mockData';
import { SafePoint, Companion, Job } from '../types';
import {
  ShieldCheck, Users, MapPin,
  AlertTriangle, Play, Pause, RotateCcw,
  Navigation,
  Compass, ExternalLink, Sparkles, Footprints, Car
} from 'lucide-react';

interface SafeMapViewProps {
  selectedJob?: Job | null;
  onNavigateToCompanions: () => void;
}

// Fixed Real Coordinates for Kokand University Toshkent filiali (Lutfiy ko'chasi)
const ORIGIN_COORDS = { lat: 41.2847, lng: 69.2081 };

export interface TrafficSegment {
  id: string;
  fromName: string;
  toName: string;
  path: { lat: number; lng: number }[];
  status: 'clean' | 'congested';
  color: string;
  label: string;
  safetyNote: string;
}

export interface ZoneCircle {
  lat: number;
  lng: number;
  radius: number;
  label: string;
  type: 'lighting' | 'crowded';
}

export interface RouteStep {
  instruction: string;
  distance: string;
  safetyNote: string;
  traffic: 'clean' | 'congested';
  trafficLabel: string;
}

export interface JobRouteConfig {
  destinationCoords: { lat: number; lng: number; address: string };
  distanceKm: number;
  durationText: string;
  waypoints: { lat: number; lng: number }[];
  segments: TrafficSegment[];
  lightingZones: ZoneCircle[];
  crowdedZones: ZoneCircle[];
  steps: RouteStep[];
}

// Comprehensive Per-Job Real Route Configurations
const JOB_ROUTE_CONFIGS: Record<string, JobRouteConfig> = {
  // 1. Bright Academy (Bunyodkor shox ko‘chasi 14, Chilonzor)
  'job-1': {
    destinationCoords: { lat: 41.2890, lng: 69.2220, address: 'Chilonzor tumani, Bunyodkor shox ko‘chasi 14' },
    distanceKm: 1.8,
    durationText: '~22 daqiqa',
    waypoints: [
      { lat: 41.2847, lng: 69.2081 }, // Kokand Uni
      { lat: 41.2862, lng: 69.2125 }, // Lutfiy ko'chasi
      { lat: 41.2880, lng: 69.2152 }, // 24/7 Dorixona va tinch yo'lak
      { lat: 41.2905, lng: 69.2158 }, // Novza metro
      { lat: 41.2900, lng: 69.2195 }, // Bunyodkor xiyoboni
      { lat: 41.2890, lng: 69.2220 }, // Bright Academy
    ],
    segments: [
      {
        id: 'j1-s1',
        fromName: 'Kokand University',
        toName: 'Lutfiy ko‘chasi',
        path: [{ lat: 41.2847, lng: 69.2081 }, { lat: 41.2862, lng: 69.2125 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Yoritilgan va keng piyodalar yo‘lagi, sokin hudud'
      },
      {
        id: 'j1-s2',
        fromName: 'Lutfiy ko‘chasi',
        toName: 'Katta Qani ko‘chasi',
        path: [{ lat: 41.2862, lng: 69.2125 }, { lat: 41.2880, lng: 69.2152 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: '24/7 Grand dorixona va xavfsiz ko‘cha chiroqlari'
      },
      {
        id: 'j1-s3',
        fromName: 'Novza metro bekat',
        toName: 'Muqimiy chorrahasi',
        path: [{ lat: 41.2880, lng: 69.2152 }, { lat: 41.2905, lng: 69.2158 }],
        status: 'congested',
        color: '#EAB308',
        label: 'Tirband / Gavjum hudud',
        safetyNote: 'Metro yo‘lovchilari oqimi, gavjum va serqatnov hudud'
      },
      {
        id: 'j1-s4',
        fromName: 'Bunyodkor shox ko‘chasi',
        toName: 'Kafelar xiyoboni',
        path: [{ lat: 41.2905, lng: 69.2158 }, { lat: 41.2900, lng: 69.2195 }],
        status: 'congested',
        color: '#EAB308',
        label: 'Tirband / Gavjum hudud',
        safetyNote: 'Jamoat transporti va savdo do‘konlari gavjum zonasi'
      },
      {
        id: 'j1-s5',
        fromName: 'Bunyodkor xiyoboni',
        toName: 'Bright Academy',
        path: [{ lat: 41.2900, lng: 69.2195 }, { lat: 41.2890, lng: 69.2220 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'O‘quv markazining qo‘riqlanadigan xavfsiz hududi'
      }
    ],
    lightingZones: [
      { lat: 41.2905, lng: 69.2155, radius: 190, label: 'Novza metro yoritilgan hududi', type: 'lighting' },
      { lat: 41.2862, lng: 69.2125, radius: 170, label: 'Lutfiy sokin xiyoboni', type: 'lighting' }
    ],
    crowdedZones: [
      { lat: 41.2902, lng: 69.2185, radius: 210, label: 'Novza & Bunyodkor gavjum chorrahasi', type: 'crowded' }
    ],
    steps: [
      {
        distance: '0 m',
        instruction: 'Kokand University Toshkent binosi markaziy chiqishidan chiqing',
        safetyNote: 'Yoritilgan turniket va doimiy qo‘riqlash nazorati',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: '500 m',
        instruction: 'Lutfiy ko‘chasi bo‘ylab piyodalar yo‘lagidan shimoli-sharqqa yuring',
        safetyNote: 'Ko‘cha chiroqlari to‘liq yoritilgan, sokin yo‘lak',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: '1.1 km',
        instruction: 'Novza metro bekatidan o‘ting (yer osti xavfsiz o‘tish yo‘li)',
        safetyNote: 'Odamlar va metro yo‘lovchilari ko‘p, faol harakat zonasi',
        traffic: 'congested',
        trafficLabel: '🟡 Tirband / Gavjum'
      },
      {
        distance: '1.5 km',
        instruction: 'Bunyodkor shox ko‘chasidagi keng piyodalar xiyobonidan davom eting',
        safetyNote: 'Transport bekatlari va kafelar oqimi, gavjum hudud',
        traffic: 'congested',
        trafficLabel: '🟡 Tirband / Gavjum'
      },
      {
        distance: '1.8 km',
        instruction: 'Bright Academy binosiga yetib kelindi',
        safetyNote: 'Auditorlik tekshiruvidan o‘tgan xavfsiz ish joyi',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      }
    ]
  },

  // 2. Apex BPO Aloqa Markazi (Shota Rustaveli ko‘chasi 53, Yakkasaroy)
  'job-2': {
    destinationCoords: { lat: 41.2825, lng: 69.2380, address: 'Yakkasaroy tumani, Shota Rustaveli ko‘chasi 53' },
    distanceKm: 2.8,
    durationText: '~34 daqiqa',
    waypoints: [
      { lat: 41.2847, lng: 69.2081 }, // Kokand Uni
      { lat: 41.2820, lng: 69.2140 }, // Cho‘ponota ko‘chasi
      { lat: 41.2800, lng: 69.2220 }, // Cho‘ponota & Kichik halqa yo‘li
      { lat: 41.2815, lng: 69.2290 }, // Muqimiy ko‘prigi yaqini
      { lat: 41.2820, lng: 69.2345 }, // Shota Rustaveli xiyoboni
      { lat: 41.2825, lng: 69.2380 }, // Apex BPO
    ],
    segments: [
      {
        id: 'j2-s1',
        fromName: 'Kokand University',
        toName: 'Cho‘ponota ko‘chasi',
        path: [{ lat: 41.2847, lng: 69.2081 }, { lat: 41.2820, lng: 69.2140 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Sokin turar-joy xiyoboni va yoritilgan yo‘lak'
      },
      {
        id: 'j2-s2',
        fromName: 'Cho‘ponota ko‘chasi',
        toName: 'Kichik halqa yo‘li',
        path: [{ lat: 41.2820, lng: 69.2140 }, { lat: 41.2800, lng: 69.2220 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Keng piyodalar yo‘li va xavfsizlik kameralari'
      },
      {
        id: 'j2-s3',
        fromName: 'Kichik halqa yo‘li',
        toName: 'Muqimiy chorrahasi',
        path: [{ lat: 41.2800, lng: 69.2220 }, { lat: 41.2815, lng: 69.2290 }],
        status: 'congested',
        color: '#EAB308',
        label: 'Tirband / Gavjum hudud',
        safetyNote: 'Katta transport chorrahasi va jamoat transporti'
      },
      {
        id: 'j2-s4',
        fromName: 'Muqimiy',
        toName: 'Shota Rustaveli xiyoboni',
        path: [{ lat: 41.2815, lng: 69.2290 }, { lat: 41.2820, lng: 69.2345 }],
        status: 'congested',
        color: '#EAB308',
        label: 'Tirband / Gavjum hudud',
        safetyNote: 'Askiya bozori yaqini, savdo do‘konlari va odam ko‘p'
      },
      {
        id: 'j2-s5',
        fromName: 'Shota Rustaveli',
        toName: 'Apex BPO binosi',
        path: [{ lat: 41.2820, lng: 69.2345 }, { lat: 41.2825, lng: 69.2380 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Biznes markazining yoritilgan va qo‘riqlanadigan hududi'
      }
    ],
    lightingZones: [
      { lat: 41.2810, lng: 69.2180, radius: 180, label: 'Cho‘ponota yoritilgan xiyoboni', type: 'lighting' },
      { lat: 41.2822, lng: 69.2360, radius: 180, label: 'Shota Rustaveli biznes xiyoboni', type: 'lighting' }
    ],
    crowdedZones: [
      { lat: 41.2818, lng: 69.2330, radius: 210, label: 'Askiya va Shota Rustaveli gavjum chorrahasi', type: 'crowded' }
    ],
    steps: [
      {
        distance: '0 m',
        instruction: 'Kokand University chiqishidan Cho‘ponota ko‘chasiga qarab chiqing',
        safetyNote: 'Turniket nazorati va yorug‘ piyodalar yo‘lagi',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: '750 m',
        instruction: 'Cho‘ponota ko‘chasi bo‘ylab yoritilgan yo‘lakdan davom eting',
        safetyNote: 'Ko‘cha chiroqlari to‘liq yoritilgan, sokin yo‘lak',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: '1.6 km',
        instruction: 'Kichik Halqa yo‘li chorrahasidan yer osti xavfsiz o‘tish yo‘lidan o‘ting',
        safetyNote: 'Transport harakati yuqori, doimiy kuzatuv kamerasi',
        traffic: 'congested',
        trafficLabel: '🟡 Tirband / Gavjum'
      },
      {
        distance: '2.4 km',
        instruction: 'Shota Rustaveli ko‘chasidagi keng savdo xiyoboni bo‘ylab boring',
        safetyNote: 'Askiya bozori yaqini, do‘konlar va piyodalar gavjum',
        traffic: 'congested',
        trafficLabel: '🟡 Tirband / Gavjum'
      },
      {
        distance: '2.8 km',
        instruction: 'Apex BPO Aloqa Markazi binosiga yetib kelindi',
        safetyNote: 'Kechki smena uchun bepul korporativ transport taqdim etiladi',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      }
    ]
  },

  // 3. SmartKids Xususiy Maktabi (Lutfiy ko‘chasi 28-A, Chilonzor)
  'job-3': {
    destinationCoords: { lat: 41.2810, lng: 69.1980, address: 'Chilonzor tumani, Lutfiy ko‘chasi 28-A' },
    distanceKm: 1.2,
    durationText: '~15 daqiqa',
    waypoints: [
      { lat: 41.2847, lng: 69.2081 }, // Kokand Uni
      { lat: 41.2835, lng: 69.2045 }, // Lutfiy g'arb
      { lat: 41.2825, lng: 69.2015 }, // 11-mavze bog'i
      { lat: 41.2818, lng: 69.1995 }, // Farhod chorraha
      { lat: 41.2810, lng: 69.1980 }, // SmartKids
    ],
    segments: [
      {
        id: 'j3-s1',
        fromName: 'Kokand University',
        toName: 'Lutfiy xiyoboni',
        path: [{ lat: 41.2847, lng: 69.2081 }, { lat: 41.2835, lng: 69.2045 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Maktablar va bog‘chalar bo‘ylab sokin yashil xiyobon'
      },
      {
        id: 'j3-s2',
        fromName: 'Lutfiy xiyoboni',
        toName: '11-mavze sayrgohi',
        path: [{ lat: 41.2835, lng: 69.2045 }, { lat: 41.2825, lng: 69.2015 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Oilaviy sayrgoh, tungi chiroqlar to‘liq yonadi'
      },
      {
        id: 'j3-s3',
        fromName: '11-mavze',
        toName: 'Farhod ko‘chasi chorrahasi',
        path: [{ lat: 41.2825, lng: 69.2015 }, { lat: 41.2818, lng: 69.1995 }],
        status: 'congested',
        color: '#EAB308',
        label: 'Tirband / Gavjum hudud',
        safetyNote: 'Piyodalar o‘tish joyi va avtobus bekatlari oqimi'
      },
      {
        id: 'j3-s4',
        fromName: 'Farhod chorrahasi',
        toName: 'SmartKids binosi',
        path: [{ lat: 41.2818, lng: 69.1995 }, { lat: 41.2810, lng: 69.1980 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Xususiy maktabning panjara bilan o‘ralgan qo‘riqlanadigan hududi'
      }
    ],
    lightingZones: [
      { lat: 41.2830, lng: 69.2030, radius: 170, label: 'Lutfiy oilaviy xiyoboni', type: 'lighting' },
      { lat: 41.2812, lng: 69.1985, radius: 150, label: 'SmartKids maktab yoritilgan maydoni', type: 'lighting' }
    ],
    crowdedZones: [
      { lat: 41.2818, lng: 69.1998, radius: 180, label: 'Farhod chorrahasi gavjum o‘tish joyi', type: 'crowded' }
    ],
    steps: [
      {
        distance: '0 m',
        instruction: 'Universitet binosidan Lutfiy ko‘chasiga chiqing',
        safetyNote: 'Xavfsiz chiqish yo‘lagi',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: '400 m',
        instruction: 'Chilonzor 11-mavze yoritilgan sokin yo‘lagidan janubi-g‘arbga yuring',
        safetyNote: 'Tungi yoritish to‘liq ishlaydi',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: '900 m',
        instruction: 'Farhod chorrahasi xavfsiz svetoforidan o‘ting',
        safetyNote: 'Piyodalar va transport gavjum',
        traffic: 'congested',
        trafficLabel: '🟡 Tirband / Gavjum'
      },
      {
        distance: '1.2 km',
        instruction: 'SmartKids xususiy maktabi qo‘riqlanadigan hududiga yetib kelindi',
        safetyNote: '17:30 da darslar tugaydi, xavfsizlik yuqori',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      }
    ]
  },

  // 4. Kokand Edu Ta’lim Loyihasi (Masofaviy / Kovorking)
  'job-4': {
    destinationCoords: { lat: 41.2849, lng: 69.2085, address: 'Kokand University Coworking Markazi' },
    distanceKm: 0.1,
    durationText: '~2 daqiqa',
    waypoints: [
      { lat: 41.2847, lng: 69.2081 },
      { lat: 41.2848, lng: 69.2083 },
      { lat: 41.2849, lng: 69.2085 }
    ],
    segments: [
      {
        id: 'j4-s1',
        fromName: 'Universitet bosh binosi',
        toName: 'Talabalar yashil maydoni',
        path: [{ lat: 41.2847, lng: 69.2081 }, { lat: 41.2848, lng: 69.2083 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Universitet qo‘riqlash xizmati hududi'
      },
      {
        id: 'j4-s2',
        fromName: 'Talabalar maydoni',
        toName: 'Kokand Edu Kovorking',
        path: [{ lat: 41.2848, lng: 69.2083 }, { lat: 41.2849, lng: 69.2085 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Talaba qizlar uchun yopiq xavfsiz muhit'
      }
    ],
    lightingZones: [
      { lat: 41.2848, lng: 69.2083, radius: 110, label: 'Kampus ichki bog‘i', type: 'lighting' }
    ],
    crowdedZones: [
      { lat: 41.2849, lng: 69.2085, radius: 90, label: 'Talabalar kovorking zali', type: 'crowded' }
    ],
    steps: [
      {
        distance: '0 m',
        instruction: 'Universitet binosidan chiqib ichki xiyobonga o‘ting',
        safetyNote: 'Kampus xavfsizlik nazorati',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: '100 m',
        instruction: 'Kokand Edu talabalar zamonaviy kovorking markaziga kiring',
        safetyNote: '100% masofaviy va xavfsiz muhit',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      }
    ]
  },

  // 5. IT Bilim Raqamli Markazi (Yunusobod tumani, Amir Temur shox ko‘chasi 107-B)
  // This is the downtown / Yunusobod route shown in the user's screenshot!
  'job-5': {
    destinationCoords: { lat: 41.3280, lng: 69.2820, address: 'Yunusobod tumani, Amir Temur shox ko‘chasi 107-B' },
    distanceKm: 6.8,
    durationText: '~45 daqiqa (Piyoda + Metro)',
    waypoints: [
      { lat: 41.2847, lng: 69.2081 }, // Kokand Uni
      { lat: 41.2905, lng: 69.2155 }, // Novza metro
      { lat: 41.3020, lng: 69.2380 }, // Milliy Bog' & O'zbekiston shox ko'chasi
      { lat: 41.3160, lng: 69.2680 }, // Alisher Navoiy & Amir Temur xiyoboni
      { lat: 41.3230, lng: 69.2780 }, // Minor metrosi
      { lat: 41.3280, lng: 69.2820 }, // IT Bilim Markazi (Shahriston yo'nalishi)
    ],
    segments: [
      {
        id: 'j5-s1',
        fromName: 'Kokand University',
        toName: 'Novza metro bekati',
        path: [{ lat: 41.2847, lng: 69.2081 }, { lat: 41.2905, lng: 69.2155 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Lutfiy ko‘chasi sokin yashil piyoda yo‘lagi'
      },
      {
        id: 'j5-s2',
        fromName: 'Novza metro',
        toName: 'Milliy Bog‘ & O‘zbekiston shox ko‘chasi',
        path: [{ lat: 41.2905, lng: 69.2155 }, { lat: 41.3020, lng: 69.2380 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Yoritilgan xiyobon va xavfsiz metro koridori'
      },
      {
        id: 'j5-s3',
        fromName: 'Milliy Bog‘',
        toName: 'Alisher Navoiy & Amir Temur',
        path: [{ lat: 41.3020, lng: 69.2380 }, { lat: 41.3160, lng: 69.2680 }],
        status: 'congested',
        color: '#EAB308',
        label: 'Tirband / Gavjum hudud',
        safetyNote: 'Markaziy metro tugunlari va Alisher Navoiy gavjum xiyoboni'
      },
      {
        id: 'j5-s4',
        fromName: 'Amir Temur xiyoboni',
        toName: 'Minor metrosi',
        path: [{ lat: 41.3160, lng: 69.2680 }, { lat: 41.3230, lng: 69.2780 }],
        status: 'congested',
        color: '#EAB308',
        label: 'Tirband / Gavjum hudud',
        safetyNote: 'Amir Temur shox ko‘chasi, transport va yo‘lovchilar gavjum'
      },
      {
        id: 'j5-s5',
        fromName: 'Minor metrosi',
        toName: 'IT Bilim Raqamli Markazi',
        path: [{ lat: 41.3230, lng: 69.2780 }, { lat: 41.3280, lng: 69.2820 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'IT markazining xavfsiz va to‘liq yoritilgan kovorking hududi'
      }
    ],
    lightingZones: [
      { lat: 41.2905, lng: 69.2155, radius: 180, label: 'Novza metro yoritilgan hududi', type: 'lighting' },
      { lat: 41.3160, lng: 69.2680, radius: 210, label: 'Mustaqillik & Navoiy yoritilgan xiyoboni', type: 'lighting' },
      { lat: 41.3270, lng: 69.2810, radius: 190, label: 'Amir Temur IT Park yorug‘ maydoni', type: 'lighting' }
    ],
    crowdedZones: [
      { lat: 41.3150, lng: 69.2660, radius: 230, label: 'Amir Temur & Navoiy gavjum metro chorrahasi', type: 'crowded' },
      { lat: 41.3230, lng: 69.2780, radius: 200, label: 'Minor metrosi gavjum bekatlari', type: 'crowded' }
    ],
    steps: [
      {
        distance: '0 m',
        instruction: 'Kokand University Toshkent binosidan chiqing',
        safetyNote: 'Yoritilgan turniket nazorati',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: '1.1 km',
        instruction: 'Novza metro bekatidan Chilonzor yo‘li bo‘yicha markaz tomon yuring',
        safetyNote: 'Yer osti xavfsiz o‘tish yo‘li',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: '3.6 km',
        instruction: 'Alisher Navoiy va Amir Temur xiyobonlari gavjum zonasidan o‘ting',
        safetyNote: 'Markaziy xiyobon, jamoat transporti va talabalar gavjum',
        traffic: 'congested',
        trafficLabel: '🟡 Tirband / Gavjum'
      },
      {
        distance: '5.4 km',
        instruction: 'Minor metrosidan Amir Temur shox ko‘chasi bo‘ylab shimolga boring',
        safetyNote: 'Katta ko‘cha, keng piyodalar yo‘li va yoritgichlar',
        traffic: 'congested',
        trafficLabel: '🟡 Tirband / Gavjum'
      },
      {
        distance: '6.8 km',
        instruction: 'IT Bilim Raqamli Markazi binosiga yetib kelindi (Shahriston yaqini)',
        safetyNote: 'Zamonaviy IT ofis, 18:30 da ish yakunlanadi',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      }
    ]
  },

  // 6. Kokand University Axborot Markazi (Universitet bosh binosi, 2-qavat)
  'job-6': {
    destinationCoords: { lat: 41.2852, lng: 69.2088, address: 'Universitet bosh binosi, 2-qavat' },
    distanceKm: 0.2,
    durationText: '~3 daqiqa',
    waypoints: [
      { lat: 41.2847, lng: 69.2081 },
      { lat: 41.2850, lng: 69.2085 },
      { lat: 41.2852, lng: 69.2088 }
    ],
    segments: [
      {
        id: 'j6-s1',
        fromName: 'Asosiy kirish',
        toName: 'Rektorat va talabalar xiyoboni',
        path: [{ lat: 41.2847, lng: 69.2081 }, { lat: 41.2850, lng: 69.2085 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Universitet qo‘riqlash xizmati va videokuzatuv'
      },
      {
        id: 'j6-s2',
        fromName: 'Talabalar xiyoboni',
        toName: 'Kutubxona va resurs markazi',
        path: [{ lat: 41.2850, lng: 69.2085 }, { lat: 41.2852, lng: 69.2088 }],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Akademik tinch muhit va yoritilgan zallar'
      }
    ],
    lightingZones: [
      { lat: 41.2850, lng: 69.2085, radius: 120, label: 'Universitet kutubxona xiyoboni', type: 'lighting' }
    ],
    crowdedZones: [
      { lat: 41.2851, lng: 69.2086, radius: 95, label: 'Talabalar qabul zali', type: 'crowded' }
    ],
    steps: [
      {
        distance: '0 m',
        instruction: 'Universitet asosiy foyesidan chiqing',
        safetyNote: 'Turniket va talabalar xizmati',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: '200 m',
        instruction: 'Axborot-resurs markazi va elektron kutubxona zaliga kiring (2-qavat)',
        safetyNote: 'Talabalar uchun doimiy tinch va himoyalangan maskan',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      }
    ]
  }
};

// Smart fallback generator for any arbitrary or dynamically added job
function generateDynamicJobRoute(job: Job): JobRouteConfig {
  const destCoords = {
    lat: job.distanceKm === 0 ? 41.2849 : 41.2847 + (job.distanceKm * 0.007),
    lng: job.distanceKm === 0 ? 69.2085 : 69.2081 + (job.distanceKm * 0.009),
    address: job.location
  };

  const mid1 = {
    lat: ORIGIN_COORDS.lat + (destCoords.lat - ORIGIN_COORDS.lat) * 0.33,
    lng: ORIGIN_COORDS.lng + (destCoords.lng - ORIGIN_COORDS.lng) * 0.33,
  };
  const mid2 = {
    lat: ORIGIN_COORDS.lat + (destCoords.lat - ORIGIN_COORDS.lat) * 0.66,
    lng: ORIGIN_COORDS.lng + (destCoords.lng - ORIGIN_COORDS.lng) * 0.66,
  };

  const km = job.distanceKm || 2.4;
  const minutes = Math.round(km * 12);

  return {
    destinationCoords: destCoords,
    distanceKm: km,
    durationText: `~${minutes} daqiqa`,
    waypoints: [ORIGIN_COORDS, mid1, mid2, destCoords],
    segments: [
      {
        id: `dyn-s1`,
        fromName: 'Kokand University',
        toName: 'Xavfsiz yo‘lak',
        path: [ORIGIN_COORDS, mid1],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Yoritilgan ko‘cha va sokin piyodalar yo‘lagi'
      },
      {
        id: `dyn-s2`,
        fromName: 'Oraliq chorraha',
        toName: 'Gavjum xiyobon',
        path: [mid1, mid2],
        status: 'congested',
        color: '#EAB308',
        label: 'Tirband / Gavjum hudud',
        safetyNote: 'Jamoat transporti va piyodalar gavjum chorrahasi'
      },
      {
        id: `dyn-s3`,
        fromName: 'Yakuniy yo‘nalish',
        toName: job.company,
        path: [mid2, destCoords],
        status: 'clean',
        color: '#16A34A',
        label: 'Toza yo‘l',
        safetyNote: 'Bino kirish qismigacha tekshirilgan xavfsiz yo‘lak'
      }
    ],
    lightingZones: [
      { lat: mid1.lat, lng: mid1.lng, radius: 180, label: 'Yoritilgan sokin xiyobon', type: 'lighting' }
    ],
    crowdedZones: [
      { lat: mid2.lat, lng: mid2.lng, radius: 200, label: 'Gavjum transport va savdo chorrahasi', type: 'crowded' }
    ],
    steps: [
      {
        distance: '0 m',
        instruction: 'Kokand University Toshkent binosidan chiqing',
        safetyNote: 'Yoritilgan xavfsiz hudud',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: `${(km * 0.4).toFixed(1)} km`,
        instruction: 'Yoritilgan piyodalar xiyobonidan davom eting',
        safetyNote: 'Doimiy ko‘cha chiroqlari',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      },
      {
        distance: `${(km * 0.7).toFixed(1)} km`,
        instruction: 'Gavjum chorrahadan xavfsiz svetofor orqali o‘ting',
        safetyNote: 'Odamlar va transport gavjum',
        traffic: 'congested',
        trafficLabel: '🟡 Tirband / Gavjum'
      },
      {
        distance: `${km} km`,
        instruction: `${job.company} binosiga yetib kelindi`,
        safetyNote: 'Auditorlik tekshiruvidan o‘tgan xavfsiz ish joyi',
        traffic: 'clean',
        trafficLabel: '🟢 Toza yo‘l'
      }
    ]
  };
}

// Camera Auto-fit bounds controller
const MapBoundsController: React.FC<{
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  waypoints: { lat: number; lng: number }[];
}> = ({ origin, destination, waypoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    try {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(origin);
      bounds.extend(destination);
      waypoints.forEach((p) => bounds.extend(p));
      map.fitBounds(bounds, {
        top: 60,
        right: 60,
        bottom: 60,
        left: 60
      });
    } catch {
      // ignore
    }
  }, [map, origin, destination, waypoints]);

  return null;
};

// Subcomponent that manages real route rendering on Google Maps with traffic colors & dynamic zones
interface GoogleMapsTrafficRouteProps {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  activeLayer: string;
  segments: TrafficSegment[];
  lightingZones: ZoneCircle[];
  crowdedZones: ZoneCircle[];
}

const GoogleMapsTrafficRouteRenderer: React.FC<GoogleMapsTrafficRouteProps> = ({
  origin,
  destination,
  activeLayer,
  segments,
  lightingZones,
  crowdedZones
}) => {
  const map = useMap();
  const mapsLib = useMapsLibrary('maps');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const circlesRef = useRef<google.maps.Circle[]>([]);

  useEffect(() => {
    if (!map) return;

    // Clean up previous polylines & circles
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];
    circlesRef.current.forEach((c) => c.setMap(null));
    circlesRef.current = [];

    // 1. Draw Google Maps styled navigation polylines with traffic coloring:
    // White border casing underneath for crisp Google Maps look + Green / Yellow inner stroke
    segments.forEach((seg) => {
      // Outer casing polyline
      const casing = new google.maps.Polyline({
        path: seg.path,
        strokeColor: '#FFFFFF',
        strokeWeight: 8,
        strokeOpacity: 0.85,
        map: map,
        zIndex: 5
      });

      // Traffic-colored inner polyline
      const inner = new google.maps.Polyline({
        path: seg.path,
        strokeColor: seg.color,
        strokeWeight: 5,
        strokeOpacity: 0.98,
        map: map,
        zIndex: 6
      });

      polylinesRef.current.push(casing, inner);
    });

    // 2. Outer subtle green glow corridor for overall safety aura
    const allCoords = [origin, ...segments.flatMap((s) => s.path), destination];
    const auraPolyline = new google.maps.Polyline({
      path: allCoords,
      strokeColor: '#22C55E',
      strokeWeight: 14,
      strokeOpacity: 0.16,
      map: map,
      zIndex: 2
    });
    polylinesRef.current.push(auraPolyline);

    // 3. Draw safety corridor circles dynamically based on the current job's route
    if (mapsLib) {
      if (activeLayer === 'all' || activeLayer === 'lighting') {
        lightingZones.forEach((lz) => {
          const circle = new mapsLib.Circle({
            center: { lat: lz.lat, lng: lz.lng },
            radius: lz.radius,
            fillColor: '#22C55E',
            fillOpacity: 0.14,
            strokeColor: '#16A34A',
            strokeWeight: 1.5,
            map: map,
            zIndex: 3
          });
          circlesRef.current.push(circle);
        });
      }

      if (activeLayer === 'all' || activeLayer === 'crowded') {
        crowdedZones.forEach((cz) => {
          const circle = new mapsLib.Circle({
            center: { lat: cz.lat, lng: cz.lng },
            radius: cz.radius,
            fillColor: '#EAB308',
            fillOpacity: 0.15,
            strokeColor: '#CA8A04',
            strokeWeight: 1.5,
            map: map,
            zIndex: 3
          });
          circlesRef.current.push(circle);
        });
      }
    }

    return () => {
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
      circlesRef.current.forEach((c) => c.setMap(null));
      circlesRef.current = [];
    };
  }, [map, mapsLib, origin, destination, activeLayer, segments, lightingZones, crowdedZones]);

  return null;
};

export const SafeMapView: React.FC<SafeMapViewProps> = ({
  selectedJob,
  onNavigateToCompanions
}) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'lighting' | 'crowded' | 'safePoints' | 'companions'>('all');
  const [mapEngine, setMapEngine] = useState<'google' | 'iframe' | 'vector'>('google');
  const [iframeMode, setIframeMode] = useState<'walking' | 'driving'>('walking');
  const [selectedSafePoint, setSelectedSafePoint] = useState<SafePoint | null>(SAFE_POINTS[0]);
  const [infoWindowTarget, setInfoWindowTarget] = useState<{
    type: 'origin' | 'destination' | 'safepoint' | 'companion';
    title: string;
    desc: string;
    coords: { lat: number; lng: number };
  } | null>(null);

  // Simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0); // 0 to 100%
  const [simSpeed, setSimSpeed] = useState<number>(1); // 1x or 2x

  // Google Maps API Key
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyD61uDAdJlxlyFpRtGxW3HoJNCmTYHPzhM';

  // Compute active route data dynamically for the selected job
  const currentRoute: JobRouteConfig = useMemo(() => {
    if (selectedJob && JOB_ROUTE_CONFIGS[selectedJob.id]) {
      return JOB_ROUTE_CONFIGS[selectedJob.id];
    }
    if (selectedJob) {
      return generateDynamicJobRoute(selectedJob);
    }
    return JOB_ROUTE_CONFIGS['job-1'];
  }, [selectedJob]);

  const destinationCoords = currentRoute.destinationCoords;
  const destinationName = selectedJob ? selectedJob.company : 'Bright Academy & Coworking';

  // Distance & Duration computed directly from currentRoute
  const routeStats = useMemo(() => {
    return {
      distance: `${currentRoute.distanceKm} km`,
      duration: currentRoute.durationText
    };
  }, [currentRoute]);

  // Robust simulation ticker with speed multiplier
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 99) {
          return 100;
        }
        return Math.min(100, prev + 1.0 * simSpeed);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isSimulating, simSpeed]);

  useEffect(() => {
    if (simProgress >= 100 && isSimulating) {
      setIsSimulating(false);
    }
  }, [simProgress, isSimulating]);

  // Reset simulation when job changes
  useEffect(() => {
    setIsSimulating(false);
    setSimProgress(0);
  }, [selectedJob?.id]);

  // Toggle simulation safely with restart logic
  const handleToggleSimulation = () => {
    if (isSimulating) {
      setIsSimulating(false);
    } else {
      if (simProgress >= 98) {
        setSimProgress(0);
      }
      setIsSimulating(true);
    }
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimProgress(0);
  };

  // Interpolated walker position smoothly along the CURRENT job's real waypoints
  const walkerCoords = useMemo(() => {
    const p = simProgress / 100;
    const points = currentRoute.waypoints;
    const segmentCount = points.length - 1;
    if (segmentCount <= 0) return points[0];

    const segmentIndex = Math.min(segmentCount - 1, Math.floor(p * segmentCount));
    const segmentT = (p * segmentCount) - segmentIndex;

    const start = points[segmentIndex];
    const end = points[segmentIndex + 1];

    return {
      lat: start.lat + (end.lat - start.lat) * segmentT,
      lng: start.lng + (end.lng - start.lng) * segmentT
    };
  }, [simProgress, currentRoute]);

  // Determine current active step index (0 to N-1)
  const currentStepIndex = useMemo(() => {
    const totalSteps = currentRoute.steps.length;
    return Math.min(totalSteps - 1, Math.floor((simProgress / 100) * totalSteps));
  }, [simProgress, currentRoute]);

  // Google Maps Direction Iframe URL
  const iframeDirectionUrl = useMemo(() => {
    const travelFlag = iframeMode === 'walking' ? 'w' : 'd';
    return `https://maps.google.com/maps?saddr=${ORIGIN_COORDS.lat},${ORIGIN_COORDS.lng}&daddr=${destinationCoords.lat},${destinationCoords.lng}&dirflg=${travelFlag}&output=embed`;
  }, [destinationCoords, iframeMode]);

  const externalMapsUrl = useMemo(() => {
    return `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN_COORDS.lat},${ORIGIN_COORDS.lng}&destination=${destinationCoords.lat},${destinationCoords.lng}&travelmode=${iframeMode}`;
  }, [destinationCoords, iframeMode]);

  return (
    <div className="flex flex-col lg:flex-row gap-5 h-full">
      {/* Map Interactive Canvas */}
      <div className="flex-1 bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col min-h-[540px] lg:min-h-[660px] relative shadow-xs">
        {/* Map Header Overlay */}
        <div className="px-4 py-3 bg-white/95 backdrop-blur-md border-b border-stone-200 z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-stone-900">
                  Kokand Uni → {destinationName}
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Xavfsiz Navigator
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Toza yo‘llar (yashil) va gavjum/tirband hududlar (sariq) ko‘rsatilgan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Map Mode Switcher: Google Map vs Google Maps Iframe Direction vs Vector */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg text-xs font-medium border border-stone-200">
              <button
                onClick={() => setMapEngine('google')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  mapEngine === 'google'
                    ? 'bg-white text-stone-900 font-bold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Interaktiv Google Xaritasi"
              >
                <Sparkles className="w-3 h-3 text-[#802244]" />
                <span>Google Map</span>
              </button>
              <button
                onClick={() => setMapEngine('iframe')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  mapEngine === 'iframe'
                    ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
                title="Google Maps Navigator Iframe ichida"
              >
                <Compass className="w-3 h-3 text-current" />
                <span>Navigator (Iframe)</span>
              </button>
              <button
                onClick={() => setMapEngine('vector')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  mapEngine === 'vector'
                    ? 'bg-white text-stone-900 font-bold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Vektor
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="px-2 py-1 rounded-md bg-stone-100 font-semibold text-stone-800 tabular-nums">
                {routeStats.distance}
              </span>
              <span className="px-2 py-1 rounded-md bg-stone-100 font-semibold text-stone-800 tabular-nums">
                {routeStats.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Map Layer Filter Tabs (Only shown when not in full iframe mode) */}
        {mapEngine !== 'iframe' && (
          <div className="px-3.5 py-2 bg-[#FAF8F5] border-b border-stone-200 z-10 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
            <button
              onClick={() => setActiveLayer('all')}
              className={`px-3 py-1 rounded-md whitespace-nowrap font-medium transition-colors cursor-pointer ${
                activeLayer === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setActiveLayer('lighting')}
              className={`px-3 py-1 rounded-md whitespace-nowrap font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeLayer === 'lighting'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Yorug‘ yo‘lak ({currentRoute.lightingZones.length})</span>
            </button>
            <button
              onClick={() => setActiveLayer('crowded')}
              className={`px-3 py-1 rounded-md whitespace-nowrap font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeLayer === 'crowded'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Tirband / Odam ko‘p ({currentRoute.crowdedZones.length})</span>
            </button>
            <button
              onClick={() => setActiveLayer('safePoints')}
              className={`px-3 py-1 rounded-md whitespace-nowrap font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeLayer === 'safePoints'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Xavfsiz nuqtalar</span>
            </button>
            <button
              onClick={() => setActiveLayer('companions')}
              className={`px-3 py-1 rounded-md whitespace-nowrap font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeLayer === 'companions'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#802244]" />
              <span>Hamrohlar ({MOCK_COMPANIONS.length})</span>
            </button>
          </div>
        )}

        {/* MAP CANVAS CONTAINER */}
        <div className="flex-1 relative w-full h-full min-h-[460px] lg:min-h-[540px] bg-[#F5F2EB] overflow-hidden">
          {/* 1. IFRAME DIRECTION MODE */}
          {mapEngine === 'iframe' ? (
            <div className="w-full h-full flex flex-col bg-white">
              {/* Iframe Top Bar with Controls */}
              <div className="px-4 py-2 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-700">Yo‘nalish turi:</span>
                  <div className="inline-flex rounded-lg border border-stone-200 bg-white p-0.5">
                    <button
                      onClick={() => setIframeMode('walking')}
                      className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 cursor-pointer font-medium ${
                        iframeMode === 'walking'
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Footprints className="w-3.5 h-3.5" />
                      <span>Piyoda</span>
                    </button>
                    <button
                      onClick={() => setIframeMode('driving')}
                      className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 cursor-pointer font-medium ${
                        iframeMode === 'driving'
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span>Mashinada</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={externalMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 font-medium text-xs shadow-2xs"
                  >
                    <span>Google Maps ilovasida ochish</span>
                    <ExternalLink className="w-3 h-3 text-stone-500" />
                  </a>

                  <button
                    onClick={() => setMapEngine('google')}
                    className="px-3 py-1 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold cursor-pointer text-xs"
                  >
                    Interaktiv xaritaga qaytish
                  </button>
                </div>
              </div>

              {/* The Live Google Maps Direction Iframe */}
              <iframe
                src={iframeDirectionUrl}
                className="w-full h-full flex-1 border-0"
                title="Google Maps Yo‘nalish Navigatori"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : mapEngine === 'google' ? (
            /* 2. REAL GOOGLE MAPS PLATFORM MODE */
            <APIProvider apiKey={apiKey} language="uz" region="UZ">
              <div className="w-full h-full absolute inset-0">
                <Map
                  defaultCenter={ORIGIN_COORDS}
                  defaultZoom={13}
                  mapId="DEMO_MAP_ID"
                  gestureHandling="greedy"
                  disableDefaultUI={false}
                  fullscreenControl={true}
                  zoomControl={true}
                  mapTypeControl={true}
                  streetViewControl={true}
                  style={{ width: '100%', height: '100%' }}
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                >
                  {/* Smooth camera auto-fit to current job's route */}
                  <MapBoundsController
                    origin={ORIGIN_COORDS}
                    destination={destinationCoords}
                    waypoints={currentRoute.waypoints}
                  />

                  {/* Traffic-colored polylines & dynamic lighting/crowded zones along THIS job's route */}
                  <GoogleMapsTrafficRouteRenderer
                    origin={ORIGIN_COORDS}
                    destination={destinationCoords}
                    activeLayer={activeLayer}
                    segments={currentRoute.segments}
                    lightingZones={currentRoute.lightingZones}
                    crowdedZones={currentRoute.crowdedZones}
                  />

                  {/* Origin: Kokand University */}
                  <AdvancedMarker
                    position={ORIGIN_COORDS}
                    title="Kokand University (Boshlang‘ich nuqta)"
                    onClick={() => {
                      setInfoWindowTarget({
                        type: 'origin',
                        title: 'Kokand University (Toshkent filiali)',
                        desc: 'Boshlang‘ich xavfsiz nuqta: Talabalar chiqish hududi va turniket nazorati.',
                        coords: ORIGIN_COORDS
                      });
                    }}
                  >
                    <Pin
                      background="#802244"
                      borderColor="#FFFFFF"
                      glyphColor="#FFFFFF"
                      scale={1.2}
                    />
                  </AdvancedMarker>

                  {/* Destination Marker (Ish joyi) - EXACT USER REQUIREMENT:
                      Ustki qora o'rnida yashil (#16A34A), ichki yashil o'rnida oq (#FFFFFF) */}
                  <AdvancedMarker
                    position={destinationCoords}
                    title={`${destinationName} (Ish joyi)`}
                    onClick={() => {
                      setInfoWindowTarget({
                        type: 'destination',
                        title: destinationName,
                        desc: `${destinationCoords.address}. Soatbay auditi o‘tkazilgan xavfsiz bino.`,
                        coords: destinationCoords
                      });
                    }}
                  >
                    <Pin
                      background="#16A34A"
                      borderColor="#FFFFFF"
                      glyphColor="#FFFFFF"
                      scale={1.25}
                    />
                  </AdvancedMarker>

                  {/* Safe Points Markers */}
                  {(activeLayer === 'all' || activeLayer === 'safePoints') && (
                    <>
                      {SAFE_POINTS.map((sp) => {
                        const coords = { lat: sp.lat, lng: sp.lng };
                        return (
                          <AdvancedMarker
                            key={sp.id}
                            position={coords}
                            title={`${sp.name} (${sp.typeLabelUz})`}
                            onClick={() => {
                              setSelectedSafePoint(sp);
                              setInfoWindowTarget({
                                type: 'safepoint',
                                title: sp.name,
                                desc: `${sp.typeLabelUz} · ${sp.address}. ${sp.description}`,
                                coords: coords
                              });
                            }}
                          >
                            <Pin
                              background="#7E22CE"
                              borderColor="#FFFFFF"
                              glyphColor="#FFFFFF"
                              scale={1.05}
                            />
                          </AdvancedMarker>
                        );
                      })}
                    </>
                  )}

                  {/* Student Companions Markers */}
                  {(activeLayer === 'all' || activeLayer === 'companions') && (
                    <>
                      {MOCK_COMPANIONS.map((comp: any) => {
                        const coords = {
                          lat: 41.2847 + (comp.distanceMeters * 0.00003),
                          lng: 69.2081 + (comp.distanceMeters * 0.00004)
                        };
                        return (
                          <AdvancedMarker
                            key={comp.id}
                            position={coords}
                            title={`${comp.displayName} (${comp.university})`}
                            onClick={() => {
                              setInfoWindowTarget({
                                type: 'companion',
                                title: `${comp.displayName} (${comp.avatarInitials})`,
                                desc: `${comp.university} · ${comp.major}. ${comp.walkingTime}.`,
                                coords: coords
                              });
                            }}
                          >
                            <div className="w-8 h-8 rounded-full bg-[#802244] border-2 border-white shadow-md flex items-center justify-center text-white text-[11px] font-bold cursor-pointer hover:scale-110 transition-transform">
                              {comp.avatarInitials}
                            </div>
                          </AdvancedMarker>
                        );
                      })}
                    </>
                  )}

                  {/* Simulated Moving Walker Marker (Active when test route is running) */}
                  {isSimulating && (
                    <AdvancedMarker
                      position={walkerCoords}
                      title="Sizning o‘rningiz (Yo‘l sinovi harakatlanmoqda)"
                    >
                      <div className="relative flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/40 animate-ping absolute" />
                        <div className="w-7 h-7 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
                          <Footprints className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </AdvancedMarker>
                  )}

                  {/* Interactive InfoWindow */}
                  {infoWindowTarget && (
                    <InfoWindow
                      position={infoWindowTarget.coords}
                      onCloseClick={() => setInfoWindowTarget(null)}
                    >
                      <div className="p-1 max-w-[220px] text-xs">
                        <span className="font-bold text-stone-900 block text-xs">
                          {infoWindowTarget.title}
                        </span>
                        <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                          {infoWindowTarget.desc}
                        </p>
                        {infoWindowTarget.type === 'destination' && (
                          <button
                            onClick={() => setMapEngine('iframe')}
                            className="mt-2 w-full py-1 rounded bg-emerald-600 text-white text-[10.5px] font-semibold flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Compass className="w-3 h-3" />
                            <span>Iframe Navigatorida ochish</span>
                          </button>
                        )}
                        {infoWindowTarget.type === 'companion' && (
                          <button
                            onClick={onNavigateToCompanions}
                            className="mt-2 w-full py-1 rounded bg-[#802244] text-white text-[10.5px] font-semibold cursor-pointer"
                          >
                            Birga borishni taklif qilish
                          </button>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </div>
            </APIProvider>
          ) : (
            /* 3. FALLBACK CARTOGRAPHIC VECTOR MAP WITH TRAFFIC COLORING */
            <div className="w-full h-full relative">
              <svg
                viewBox="0 0 1000 680"
                className="w-full h-full object-cover min-w-[700px] min-h-[460px]"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <pattern id="cityPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ECE6DA" strokeWidth="1" />
                  </pattern>
                </defs>

                <rect width="1000" height="680" fill="#F8F6F0" />
                <rect width="1000" height="680" fill="url(#cityPattern)" />

                <path d="M 140 180 Q 220 140 320 190 T 380 340 T 200 360 Z" fill="#E5ECE2" stroke="#D2DFCE" strokeWidth="1.5" />
                <text x="210" y="270" fill="#5F7D59" fontSize="12" fontWeight="600">G‘afur G‘ulom bog‘i</text>

                <rect x="80" y="40" width="220" height="90" rx="4" fill="#FFFFFF" stroke="#E6E0D4" strokeWidth="1" />
                <text x="95" y="85" fill="#8C857B" fontSize="11" fontWeight="500">Chilonzor 5-mavze</text>

                <rect x="420" y="40" width="240" height="120" rx="4" fill="#FFFFFF" stroke="#E6E0D4" strokeWidth="1" />
                <text x="440" y="95" fill="#8C857B" fontSize="11" fontWeight="500">Chilonzor Savdo Markazi</text>

                <line x1="60" y1="580" x2="940" y2="120" stroke="#FFFFFF" strokeWidth="28" strokeLinecap="round" />
                <line x1="60" y1="580" x2="940" y2="120" stroke="#E0D8C5" strokeWidth="22" strokeLinecap="round" />
                <text x="490" y="325" fill="#6B655B" fontSize="11" fontWeight="600" transform="rotate(-28 490 325)">
                  Toshkent markaziy xiyoboni
                </text>

                {/* Google Maps style traffic-segmented path */}
                {/* Segment 1 & 2: Yashil (Toza yo'l) */}
                <path
                  d="M 120 540 L 260 420 L 420 420"
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Segment 3 & 4: Sariq (Tirband / Gavjum hudud) */}
                <path
                  d="M 420 420 L 530 340 L 720 220"
                  fill="none"
                  stroke="#EAB308"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Segment 5: Yashil (Toza yo'l) */}
                <path
                  d="M 720 220 L 860 140"
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Origin Marker */}
                <g transform="translate(120, 540)">
                  <circle r="14" fill="#FFFFFF" stroke="#802244" strokeWidth="2.5" />
                  <circle r="6" fill="#802244" />
                  <text x="0" y="34" textAnchor="middle" fill="#1C1917" fontSize="10" fontWeight="bold">Kokand University</text>
                </g>

                {/* Destination Marker - Updated to Green with White interior */}
                <g transform="translate(860, 140)">
                  <circle r="15" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle r="5" fill="#FFFFFF" />
                  <text x="0" y="-18" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="bold">{destinationName.slice(0, 18)}</text>
                </g>

                {/* Vector Walker simulation position */}
                {isSimulating && (
                  <g transform={`translate(${120 + (860 - 120) * (simProgress / 100)}, ${540 + (140 - 540) * (simProgress / 100)})`}>
                    <circle r="12" fill="#22C55E" opacity="0.4">
                      <animate attributeName="r" values="8;16;8" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle r="8" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* Floating Simulation HUD Overlay (when simulating) */}
          {isSimulating && mapEngine !== 'iframe' && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-emerald-300 shadow-md z-20 flex items-center gap-3 text-xs pointer-events-auto max-w-[90%]">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Footprints className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900">
                    Yo‘l sinovi: {Math.round(simProgress)}%
                  </span>
                  {currentRoute.steps[currentStepIndex] && (
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      currentRoute.steps[currentStepIndex].traffic === 'clean'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        currentRoute.steps[currentStepIndex].traffic === 'clean' ? 'bg-emerald-600' : 'bg-amber-500'
                      }`} />
                      <span>{currentRoute.steps[currentStepIndex].trafficLabel.replace(/^[🟢🟡]\s*/, '')}</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-600 line-clamp-1">
                  {currentRoute.steps[currentStepIndex]?.instruction}
                </p>
              </div>

              <div className="flex items-center gap-1.5 ml-2 border-l border-stone-200 pl-2">
                <button
                  onClick={() => setSimSpeed(simSpeed === 1 ? 2 : 1)}
                  className="px-1.5 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-[10px] font-bold text-stone-700 cursor-pointer"
                  title="Tezlikni o‘zgartirish"
                >
                  {simSpeed}x
                </button>
                <button
                  onClick={handleResetSimulation}
                  className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
                  title="Boshiga qaytarish"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Map Legend Overlay with Google Maps Traffic representation */}
          {mapEngine !== 'iframe' && (
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md rounded-lg p-2.5 border border-stone-200 shadow-xs text-xs space-y-1.5 z-20 pointer-events-auto">
              <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                Yo‘l harakati va belgilar
              </span>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span className="text-stone-700 font-medium">Toza yo‘l (Erkin harakat)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-stone-700 font-medium">Tirband / Odam ko‘p hudud</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
                <span className="text-stone-700 font-medium">24/7 Xavfsiz tayanch nuqta</span>
              </div>
            </div>
          )}

          {/* Controls: Simulation, Iframe Quick Direction, and SOS */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20 pointer-events-auto">
            {/* Quick Iframe Direction Switch */}
            <button
              onClick={() => setMapEngine(mapEngine === 'iframe' ? 'google' : 'iframe')}
              className={`h-9 px-3 rounded-lg border shadow-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                mapEngine === 'iframe'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>{mapEngine === 'iframe' ? 'Xaritaga qaytish' : 'Iframe Direction'}</span>
            </button>

            {/* Test Route Simulation Button */}
            <button
              onClick={handleToggleSimulation}
              className={`h-9 px-3 rounded-lg border shadow-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                isSimulating
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50'
              }`}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-700" />
                  <span>To‘xtatish</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{simProgress > 0 && simProgress < 98 ? 'Davom ettirish' : 'Yo‘lni sinash'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Inspector & Turn-by-Turn list */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
        {/* Iframe Direction CTA Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-xl border border-emerald-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Google Maps Direction</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded">
              Iframe
            </span>
          </div>

          <p className="text-xs text-emerald-900/80 mb-3 leading-relaxed">
            Tanlangan ish joyi ({destinationName}) uchun Google Maps navigatsiyasini to‘g‘ridan-to‘g‘ri ko‘ring.
          </p>

          <button
            onClick={() => setMapEngine('iframe')}
            className="w-full h-8.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Iframe Navigatorda ochish</span>
          </button>
        </div>

        {/* Selected Safe Point card */}
        {selectedSafePoint && (
          <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <h4 className="text-xs font-bold text-stone-900 leading-tight">
                  {selectedSafePoint.name}
                </h4>
                <span className="text-[11px] text-purple-700 font-medium">
                  {selectedSafePoint.typeLabelUz}
                </span>
              </div>
              {selectedSafePoint.is24Hours && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                  24/7
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 mb-2 leading-relaxed">
              {selectedSafePoint.description}
            </p>

            <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-100 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{selectedSafePoint.address}</span>
            </div>
          </div>
        )}

        {/* Turn-by-Turn Directions with Traffic Badges */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Yo‘nalish bosqichlari ({routeStats.distance})
            </h4>
            <span className="text-[11px] text-stone-400 font-mono">
              {currentRoute.steps.length} bosqich
            </span>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[290px] pr-1">
            {currentRoute.steps.map((step, idx) => {
              const isActive = isSimulating && currentStepIndex === idx;
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border transition-all text-xs ${
                    isActive
                      ? 'bg-emerald-50/90 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-stone-50/50 border-stone-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`w-4.5 h-4.5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-semibold text-stone-900 leading-snug">
                          {step.instruction}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono tabular-nums ml-1 shrink-0">
                          {step.distance}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 block mb-1">
                        {step.safetyNote}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                          step.traffic === 'clean'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            step.traffic === 'clean' ? 'bg-emerald-600' : 'bg-amber-500'
                          }`} />
                          <span>{step.trafficLabel.replace(/^[🟢🟡]\s*/, '')}</span>
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-bold text-emerald-700 animate-pulse">
                            • Harakatlanmoqda
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-3 pt-2.5 border-t border-stone-100 text-[11px] text-stone-400 leading-normal">
            * Tanlangan ish joyi bo‘yicha toza (yashil) va tirband (sariq) hududlar xaritada ko‘rsatilgan.
          </p>
        </div>
      </div>
    </div>
  );
};
