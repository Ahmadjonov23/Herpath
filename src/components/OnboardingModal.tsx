import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowRight, Check, Compass, ShieldCheck, Users } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Imkoniyatlarni toping',
      subtitle: 'Dars jadvali, yashash manzili va qiziqishlaringizga mos, xavfsiz va tekshirilgan ish o‘rinlari.',
      icon: Compass,
      abstractSvg: (
        <svg viewBox="0 0 280 140" fill="none" className="w-full h-32 mx-auto text-[#802244]">
          <rect x="20" y="15" width="240" height="110" rx="8" fill="#FAF8F5" stroke="#E7E5E4" strokeWidth="1.5" />
          <line x1="40" y1="42" x2="160" y2="42" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="40" y1="62" x2="200" y2="62" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="78" x2="140" y2="78" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" />
          <rect x="40" y="96" width="75" height="18" rx="4" fill="#802244" fillOpacity="0.1" />
          <text x="48" y="109" fill="#802244" fontSize="9" fontWeight="600">Tekshirilgan</text>
          <circle cx="215" cy="46" r="16" fill="#FDF2F4" stroke="#802244" strokeWidth="1.5" />
          <path d="M210 46L213 49L220 42" stroke="#802244" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      highlight: 'Tekshirilgan ish beruvchilar va kafolatlangan mehnat shartnomasi'
    },
    {
      title: 'Yo‘lingizni xavfsiz rejalashtiring',
      subtitle: 'Universitetdan ishga va uyga qaytishda eng yorug‘, odam gavjum va xavfsiz tayanch nuqtalarga ega yo‘nalishlarni tanlang.',
      icon: ShieldCheck,
      abstractSvg: (
        <svg viewBox="0 0 280 140" fill="none" className="w-full h-32 mx-auto text-[#802244]">
          <path d="M40 105 C 80 105, 100 35, 150 35 C 200 35, 210 90, 240 60" stroke="#E7E5E4" strokeWidth="8" strokeLinecap="round" />
          <path d="M40 105 C 80 105, 100 35, 150 35 C 200 35, 210 90, 240 60" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5" />
          <circle cx="40" cy="105" r="6" fill="#802244" />
          <circle cx="150" cy="35" r="5" fill="#166534" />
          <circle cx="240" cy="60" r="7" fill="#1C1917" />
          <text x="24" y="124" fill="#78716C" fontSize="9" fontWeight="500">Universitet</text>
          <text x="135" y="22" fill="#166534" fontSize="9" fontWeight="600">Yorug‘ bekat</text>
          <text x="222" y="80" fill="#1C1917" fontSize="9" fontWeight="600">Ish joyi</text>
        </svg>
      ),
      highlight: 'Tunu-kun dorixonalar, metro va IIB tayanch maskanlari xaritada'
    },
    {
      title: 'Yolg‘iz emassiz',
      subtitle: 'Siz bilan bir yo‘nalishda ketayotgan boshqa talaba qizlarni toping va xavfsiz hamrohlikda harakatlaning.',
      icon: Users,
      abstractSvg: (
        <svg viewBox="0 0 280 140" fill="none" className="w-full h-32 mx-auto text-[#802244]">
          <circle cx="110" cy="65" r="28" fill="#FAF8F5" stroke="#802244" strokeWidth="1.5" />
          <circle cx="170" cy="65" r="28" fill="#FAF8F5" stroke="#166534" strokeWidth="1.5" />
          <circle cx="110" cy="56" r="10" fill="#802244" fillOpacity="0.2" />
          <path d="M98 80C98 73 103 70 110 70C117 70 122 73 122 80" stroke="#802244" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="170" cy="56" r="10" fill="#166534" fillOpacity="0.2" />
          <path d="M158 80C158 73 163 70 170 70C177 70 182 73 182 80" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M125 65L155 65" stroke="#78716C" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      ),
      highlight: 'Faqat talabalik hujjati tasdiqlangan foydalanuvchilar'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const current = steps[currentStep];
  const StepIcon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 pb-2 flex items-center justify-between border-b border-stone-100">
          <BrandLogo size="sm" />
          <button
            onClick={onComplete}
            className="text-xs font-medium text-stone-500 hover:text-stone-900 px-2 py-1 rounded transition-colors cursor-pointer"
          >
            O‘tkazib yuborish
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Visual element */}
            <div className="mb-5 p-3 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center">
              {current.abstractSvg}
            </div>

            {/* Step badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#802244] text-white text-[11px] font-bold flex items-center justify-center">
                {currentStep + 1}
              </span>
              <span className="text-xs font-medium text-stone-500">
                {currentStep + 1} / 3-bosqich
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-1.5 tracking-tight">
              {current.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3.5">
              {current.subtitle}
            </p>

            <div className="p-2.5 bg-stone-50 rounded-md border border-stone-200 text-xs text-stone-700 flex items-start gap-2">
              <StepIcon className="w-3.5 h-3.5 text-[#802244] shrink-0 mt-0.5" />
              <span>{current.highlight}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 pt-3.5 border-t border-stone-100">
            <div className="flex items-center justify-between gap-4">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentStep ? 'w-5 bg-[#802244]' : 'w-1.5 bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Qadam ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="h-9 px-4 rounded-lg bg-[#802244] hover:bg-[#6c1d39] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{currentStep === steps.length - 1 ? 'Boshlash' : 'Keyingisi'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
