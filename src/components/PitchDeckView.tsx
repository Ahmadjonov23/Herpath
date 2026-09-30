import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft, ChevronRight, Maximize2, Minimize2,
  Grid, Printer, Play, Pause, ExternalLink, ArrowRight
} from 'lucide-react';
import { Realistic3DDiorama } from './Realistic3DDiorama';

interface PitchDeckViewProps {
  onBackToApp: () => void;
  onNavigateToMap: () => void;
  onNavigateToJobs: () => void;
}

export interface SlideData {
  id: string;
  category: string;
  slideNumber: string;
  headline: string;
  primaryMetric: string;
  primaryMetricLabel: string;
  secondaryMetrics: Array<{
    value: string;
    label: string;
  }>;
  keyPoints: Array<{
    title: string;
    desc: string;
  }>;
  sceneType: 'university_route' | 'safe_map' | 'verification' | 'ecosystem' | 'community' | 'business' | 'roadmap';
}

const SLIDES: SlideData[] = [
  {
    id: 'intro',
    category: 'MISSIYA VA STRATEGIYA',
    slideNumber: '01',
    headline: 'Talaba qizlar uchun xavfsiz harakat va kafolatlangan bandlik ekotizimi',
    primaryMetric: '78%',
    primaryMetricLabel: 'Ota-onalarning qizlari kechki payt notanish yo‘llarda yurishi bo‘yicha xavotir darajasi',
    secondaryMetrics: [
      { value: '3.2 km', label: 'Optimal piyoda radiusi' },
      { value: '4,200+', label: 'Faol talabalar auditoriyasi' },
      { value: '100%', label: 'Auditorlik tekshiruvidan o‘tgan' }
    ],
    keyPoints: [
      { title: 'Yoritilgan yo‘laklar', desc: 'Google Maps xaritasi va 24/7 tayanch xavfsiz nuqtalar' },
      { title: '4 soatlik moslashuvchan grafik', desc: 'Dars jadvaliga xalaqit bermaydigan darsdan so‘nggi amaliyot' },
      { title: 'Kafolatlangan B2B hamkorlik', desc: 'OTM va tekshirilgan ish beruvchilar o‘rtasidagi rasmiy protokol' }
    ],
    sceneType: 'university_route'
  },
  {
    id: 'problem',
    category: 'BOZOR TAHLILI · TIZIMLI MUAMMO',
    slideNumber: '02',
    headline: '180,000 talaba qizning 64% qismi xavfsizlik va vaqt sabab ishlay olmaydi',
    primaryMetric: '64%',
    primaryMetricLabel: 'Xavfsiz transport va qulay grafik yo‘qligi sabab ishlay olmayotgan talabalar',
    secondaryMetrics: [
      { value: '2.5 soat', label: 'Tirbandlikda yo‘qotiladigan vaqt' },
      { value: '82%', label: 'To‘liq kun talab qiluvchi e’lonlar' },
      { value: '0 ta', label: 'Mavjud saytlarda xavfsizlik filtri' }
    ],
    keyPoints: [
      { title: 'Kechki transport taqchilligi', desc: 'Qorong‘i ko‘chalar va notanish tumanlar ota-onalarni xavotirga soladi' },
      { title: 'Dars jadvali bilan to‘qnashuv', desc: 'An’anaviy bo‘sh ish o‘rinlarida talaba jadvali inobatga olinmaydi' },
      { title: 'Noma’lum ish beruvchilar', desc: 'Yuridik manzilsiz yoki shubhali korxonalar xatari mavjud' }
    ],
    sceneType: 'safe_map'
  },
  {
    id: 'solution',
    category: 'TEXNOLOGIK YECHIM · XAVFSIZ XARITA',
    slideNumber: '03',
    headline: 'Google Maps integratsiyasi va ko‘p qatlamli xavfsizlik navigatsiyasi',
    primaryMetric: '100%',
    primaryMetricLabel: 'Google Maps platformasi asosida to‘liq yoritilgan piyodalar koridori',
    secondaryMetrics: [
      { value: '12 ta', label: '24/7 tayanch va metro nuqtalari' },
      { value: '~38 daq', label: 'O‘rtacha xavfsiz piyoda vaqti' },
      { value: 'Jonli', label: 'Marshrutni oldindan sinash' }
    ],
    keyPoints: [
      { title: 'Yashil va tinch yo‘laklar', desc: 'Tirband va qorong‘i ko‘chalarni aylanib o‘tuvchi yo‘nalish' },
      { title: '24/7 xavfsizlik qalqoni', desc: 'Metro bekatlari, tunu-kun dorixonalar va IIB maskanlari' },
      { title: 'Jonli yo‘l simulyatsiyasi', desc: 'Marshrut xavfsizligini 1x/2x tezlikda oldindan ko‘rish' }
    ],
    sceneType: 'safe_map'
  },
  {
    id: 'verification',
    category: 'SIFAT STANDARTLARI · 5 BOSQICHLI AUDIT',
    slideNumber: '04',
    headline: 'E’lon joylashtirishdan oldin 5 bosqichli jismoniy va yuridik audit',
    primaryMetric: '5 bosqich',
    primaryMetricLabel: 'Davlat soliq INN, jismoniy manzil, videokuzatuv va jamoa balansi tekshiruvi',
    secondaryMetrics: [
      { value: '98.4%', label: 'Auditdan muvaffaqiyatli o‘tish' },
      { value: '100%', label: 'Maosh va soat ochiqligi' },
      { value: '30%+', label: 'Jamoada ayollar ulushi talabi' }
    ],
    keyPoints: [
      { title: 'Yuridik va soliq tekshiruvi', desc: 'Kompaniya INN va soliq qarzdorligi yo‘qligi avtomat tekshiriladi' },
      { title: 'Turniket va videokuzatuv', desc: '24/7 kuzatuv kamerasi va yoritilgan kirish yo‘lagi majburiy' },
      { title: 'Kafolatlangan mehnat sharoiti', desc: 'Kechki smenada korporativ transport ta’minlanishi talab etiladi' }
    ],
    sceneType: 'verification'
  },
  {
    id: 'ecosystem',
    category: 'HAMKORLIK EKO-TIZIMI · UNIVERSITET VA BIZNES',
    slideNumber: '05',
    headline: 'Universitetlar bilan rasmiy memorandum va 4 soatlik grafik',
    primaryMetric: '4 soat',
    primaryMetricLabel: 'Talabaning darsdan so‘nggi kunlik optimal amaliyot vaqti (14:00 – 18:00)',
    secondaryMetrics: [
      { value: '12 ta', label: 'Toshkentdagi hamkor OTMlar' },
      { value: '3 ta', label: 'Maktablar, IT park va markazlar' },
      { value: '0 soat', label: 'Akademik darslarga salbiy ta’sir' }
    ],
    keyPoints: [
      { title: 'Xususiy maktab va markazlar', desc: 'Ingliz tili, aniq fanlar bo‘yicha yordamchi o‘qituvchilik' },
      { title: 'IT kovorking va raqamli kasblar', desc: 'SMM, dizayn va dasturlash bo‘yicha qulay amaliyot' },
      { title: 'OTM ichki vakansiyalari', desc: 'Elektron kutubxona va laboratoriyalarda ishlash imkoni' }
    ],
    sceneType: 'ecosystem'
  },
  {
    id: 'community',
    category: 'JAMOAVIY XAVFSIZLIK · HAMROHLAR VA SOS',
    slideNumber: '06',
    headline: 'Bir yo‘nalishdagi talaba hamrohlar va tezkor SOS markazi',
    primaryMetric: '3 soniya',
    primaryMetricLabel: 'Favqulodda SOS tugmasi bosilganda SMS va koordinatalar uzatilishi',
    secondaryMetrics: [
      { value: '17:15', label: 'Ommabop birga ketish vaqti' },
      { value: '102 / 112', label: 'Tezkor xizmatlar bilan aloqa' },
      { value: '1-bosish', label: 'Soxta qo‘ng‘iroq (Fake Call)' }
    ],
    keyPoints: [
      { title: 'Tengdosh hamrohlar (Peer Match)', desc: 'Bitta universitet talabalari bilan birgalikda xavfsiz yurish' },
      { title: 'Tezkor SOS vositasi', desc: 'Tasodifiy bosishdan himoyalangan avtomat koordinata uzatish' },
      { title: 'Soxta qo‘ng‘iroq himoyasi', desc: 'Noqulay vaziyatlarda telefon qo‘ng‘irog‘i simulyatsiyasi' }
    ],
    sceneType: 'community'
  },
  {
    id: 'business',
    category: 'MOLIYAVIY MODEL · B2B DAROMAD VA BARQARORLIK',
    slideNumber: '07',
    headline: 'Talabalar uchun 100% bepul, barqaror B2B daromad modeli',
    primaryMetric: '1.8 mln',
    primaryMetricLabel: 'Ish beruvchi uchun kafolatlangan xavfsiz vakansiya va rekruting paketi (so‘m)',
    secondaryMetrics: [
      { value: '4.5 mln', label: 'Talaba qizlar o‘rtacha daromadi' },
      { value: '3.5x', label: 'Xodim topish tezligi samaradorligi' },
      { value: '85%', label: 'Yillik obunani uzaytirish (Retention)' }
    ],
    keyPoints: [
      { title: 'B2B Verified Employer obunasi', desc: 'Kompaniyalar audit nishoni va saralangan kadrlar bazasiga kirish uchun to‘laydi' },
      { title: 'Tezkor kadrlar buyurtmasi', desc: 'Ko‘rgazma va tadbirlar uchun til biluvchi talabalarni saralash' },
      { title: 'Universitet konsaltingi', desc: 'Talabalar bandligi monitoringi va xavfsizlik reytingi' }
    ],
    sceneType: 'business'
  },
  {
    id: 'roadmap',
    category: 'RIVOJLANISH XARITASI · 2026 – 2027',
    slideNumber: '08',
    headline: 'Toshkentdan butun O‘zbekiston viloyatlariga kengayish',
    primaryMetric: '25,000+',
    primaryMetricLabel: '18 oy ichida platforma orqali rasmiy daromadga ega bo‘ladigan talabalar soni',
    secondaryMetrics: [
      { value: '4 ta', label: 'Boshlang‘ich hududlar' },
      { value: '50+', label: 'Hamkor oliy ta’lim maskanlari' },
      { value: '18 oy', label: 'To‘liq qamrov muddati' }
    ],
    keyPoints: [
      { title: '1-bosqich: Toshkent OTMlari', desc: 'Poytaxtdagi davlat va xususiy universitetlar to‘liq qamrovi' },
      { title: '2-bosqich: Samarqand, Buxoro, Vodiy', desc: 'Viloyat markazlarida xavfsiz yo‘laklar va kadrlar tarmog‘i' },
      { title: '3-bosqich: Milliy infratuzilma', desc: 'Respublika miqyosidagi qizlar bandligi va xavfsizligi standarti' }
    ],
    sceneType: 'roadmap'
  }
];

export const PitchDeckView: React.FC<PitchDeckViewProps> = ({
  onBackToApp,
  onNavigateToMap,
  onNavigateToJobs
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  const currentSlide = SLIDES[currentSlideIndex];

  // Navigation handlers
  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < SLIDES.length - 1 ? prev + 1 : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : SLIDES.length - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGridView) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        if (isGridView) setIsGridView(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen, isGridView]);

  // Autoplay timer
  useEffect(() => {
    let interval: any;
    if (autoplay && !isGridView) {
      interval = setInterval(() => {
        handleNext();
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [autoplay, handleNext, isGridView]);

  // Fullscreen toggle helper
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#FDFCFB] text-[#0A192F] flex flex-col font-sans transition-all selection:bg-[#0D9488] selection:text-white ${
      isFullscreen ? 'p-0' : 'pb-10'
    }`}>
      {/* ------------------------------------------------------------- */}
      {/* TOP EDITORIAL CONTROL HEADER                                  */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Return & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToApp}
            className="flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-[#0A192F] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Ilovaga qaytish</span>
          </button>

          <span className="text-stone-300">|</span>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A192F]">
              HerPath Taqdimot (Pitch Deck)
            </span>
            <span className="text-[10px] font-semibold text-[#0F766E] bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
              2026 Nashri
            </span>
          </div>
        </div>

        {/* Center: Slide indicator and quick dots */}
        <div className="hidden md:flex items-center gap-1.5">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentSlideIndex(idx);
                setIsGridView(false);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlideIndex
                  ? 'w-6 bg-[#0F766E]'
                  : 'w-2 bg-stone-200 hover:bg-stone-300'
              }`}
              title={`${idx + 1}-slayd: ${s.headline.slice(0, 24)}...`}
            />
          ))}
          <span className="text-xs font-mono font-bold text-stone-500 ml-2">
            {currentSlide.slideNumber} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Right: Controls (Autoplay, Grid, Fullscreen, Print) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setAutoplay(!autoplay)}
            className={`h-8 px-2.5 rounded-md border text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              autoplay
                ? 'bg-[#0F766E] text-white border-[#0F766E]'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
            title={autoplay ? "Avto-ko‘rsatuvni to‘xtatish" : "Avto-ko‘rsatuvni yoqish"}
          >
            {autoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoplay ? "To‘xtatish" : "Avto"}</span>
          </button>

          <button
            onClick={() => setIsGridView(!isGridView)}
            className={`h-8 px-2.5 rounded-md border text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              isGridView
                ? 'bg-[#0A192F] text-white border-[#0A192F]'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
            title="Barcha slaydlarni ko‘rish"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ro‘yxat</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="h-8 w-8 rounded-md border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 flex items-center justify-center transition-colors cursor-pointer"
            title={isFullscreen ? "To‘liq ekrandan chiqish" : "To‘liq ekranda ko‘rish"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => window.print()}
            className="h-8 px-3 rounded-md bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer ml-1"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chop etish / PDF</span>
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* GRID OVERVIEW MODE (IF ACTIVE)                                */}
      {/* ------------------------------------------------------------- */}
      {isGridView ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 animate-in fade-in">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-200">
            <div>
              <h2 className="text-xl font-bold text-[#0A192F] tracking-tight">
                Taqdimot slaydlari (8 ta bo‘lim)
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Istalgan slaydni tanlab, batafsil tahlil rejimiga o‘ting.
              </p>
            </div>
            <button
              onClick={() => setIsGridView(false)}
              className="text-xs font-semibold text-[#0F766E] hover:underline"
            >
              Yopish ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SLIDES.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setIsGridView(false);
                }}
                className={`bg-white rounded-xl border p-4.5 transition-all duration-150 cursor-pointer flex flex-col justify-between hover:shadow-md hover:border-[#0F766E] ${
                  idx === currentSlideIndex
                    ? 'border-[#0F766E] ring-2 ring-[#0F766E]/20 bg-teal-50/10'
                    : 'border-stone-200 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#0F766E]">
                      SLAYD {s.slideNumber}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 font-semibold truncate max-w-[120px]">
                      {s.category.split('·')[0]}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-[#0A192F] line-clamp-2 leading-snug mb-3">
                    {s.headline}
                  </h3>

                  <div className="text-3xl font-extrabold text-[#0F766E] tabular-nums tracking-tight mb-1">
                    {s.primaryMetric}
                  </div>
                  <p className="text-[10px] text-stone-500 line-clamp-2">
                    {s.primaryMetricLabel}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Slaydga o‘tish</span>
                  <ArrowRight className="w-3 h-3 text-[#0F766E]" />
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        /* ------------------------------------------------------------- */
        /* EDITORIAL DUAL-COLUMN PITCH PRESENTATION SLIDE                */
        /* ------------------------------------------------------------- */
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT EDITORIAL COLUMN: Focus on Headline, Giant Number, Concise Tags */}
            <div className="lg:col-span-6 space-y-6">
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#0F766E] tracking-widest bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                  SLAYD {currentSlide.slideNumber} / {String(SLIDES.length).padStart(2, '0')}
                </span>
                <span className="text-stone-300">/</span>
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  {currentSlide.category}
                </span>
              </div>

              {/* Bold Editorial Headline (Large, authoritative, dark navy) */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A192F] tracking-tight leading-[1.18]">
                {currentSlide.headline}
              </h1>

              {/* Giant Numerical Anchor with Teal Accent */}
              <div className="py-4 border-y border-stone-200/80 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0F766E] tracking-tight tabular-nums shrink-0">
                  {currentSlide.primaryMetric}
                </div>
                <div className="text-xs sm:text-sm text-stone-600 font-medium leading-snug">
                  {currentSlide.primaryMetricLabel}
                </div>
              </div>

              {/* Secondary Metrics Row */}
              <div className="grid grid-cols-3 gap-3 pt-1 text-xs">
                {currentSlide.secondaryMetrics.map((sm, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-lg border border-stone-200/80 shadow-2xs space-y-0.5">
                    <span className="text-base sm:text-lg font-bold text-[#0A192F] tabular-nums block">
                      {sm.value}
                    </span>
                    <span className="text-[11px] text-stone-500 leading-tight block">
                      {sm.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Concise 3 Key Highlights (Optimized & Minimal) */}
              <div className="space-y-2.5 pt-2">
                {currentSlide.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] shrink-0 mt-1.5" />
                    <div>
                      <span className="font-bold text-[#0A192F] mr-1.5">
                        {point.title}:
                      </span>
                      <span className="text-stone-600">
                        {point.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Realistic 3D Isometric Diorama Model */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="w-full flex flex-col items-center justify-center">
                {/* 3D Realistic Diorama with Three.js */}
                <div className="w-full h-[400px] sm:h-[450px] lg:h-[480px]">
                  <Realistic3DDiorama
                    sceneType={currentSlide.sceneType}
                    autoRotate={true}
                  />
                </div>

                {/* Bottom Quick Action Bar */}
                <div className="w-full pt-3 px-1 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    <span>Real 3D interaktiv arxitektura modeli</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onNavigateToMap}
                      className="font-semibold text-[#0F766E] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Xaritada ochish</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={onNavigateToJobs}
                      className="font-semibold text-stone-700 hover:text-navy-900 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Vakansiyalar</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SLIDE FOOTER NAVIGATION BAR                                  */}
          {/* ------------------------------------------------------------- */}
          <footer className="mt-8 pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="font-semibold text-[#0A192F]">Navigatsiya:</span>
              <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded text-[10px] font-mono">←</kbd>
              <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded text-[10px] font-mono">→</kbd>
              <span>strelkalar yoki Probel tugmasi</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="h-9 px-4 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-[#0A192F] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Oldingi slayd</span>
              </button>

              <button
                onClick={handleNext}
                className="h-9 px-5 rounded-lg bg-[#0A192F] hover:bg-[#1E293B] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span>Keyingi slayd</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
};
