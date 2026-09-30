import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { X, Smartphone, ArrowRight, ShieldCheck, Building2, User, KeyRound } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userType: 'student' | 'employer', name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [role, setRole] = useState<'student' | 'employer'>('student');
  const [phone, setPhone] = useState('+998 90 123 45 67');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'student') {
        onLoginSuccess('student', 'Dilnoza Karimova');
      } else {
        onLoginSuccess('employer', 'Bright Academy');
      }
      onClose();
    }, 400);
  };

  const handleQuickDemoLogin = (selectedRole: 'student' | 'employer') => {
    if (selectedRole === 'student') {
      onLoginSuccess('student', 'Dilnoza Karimova');
    } else {
      onLoginSuccess('employer', 'Bright Academy');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 flex items-center justify-between border-b border-stone-100">
          <BrandLogo size="sm" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {/* Role selector */}
          <div className="mb-4">
            <span className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
              Kirish toifasi
            </span>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-lg">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-1.5 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  role === 'student'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Talaba / Izlovchi</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`py-1.5 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  role === 'employer'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Ish beruvchi</span>
              </button>
            </div>
          </div>

          {step === 'phone' ? (
            <form onSubmit={handleSendCode} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Telefon raqami
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+998 90 123 45 67"
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#802244]"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Tasdiqlash kodi SMS orqali yuboriladi.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 rounded-lg bg-[#802244] text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#6c1d39] transition-colors cursor-pointer"
              >
                {isLoading ? (
                  <span>Yuborilmoqda...</span>
                ) : (
                  <>
                    <span>Davom etish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-stone-700">SMS kod</label>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-[11px] text-[#802244] hover:underline cursor-pointer"
                  >
                    Raqamni o‘zgartirish
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="4 xonali kod (masalan: 1234)"
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#802244]"
                  />
                </div>
                <span className="text-[11px] text-stone-400 block mt-1">
                  Demo uchun ixtiyoriy kod kiritishingiz mumkin.
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 rounded-lg bg-[#802244] text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#6c1d39] transition-colors cursor-pointer"
              >
                {isLoading ? <span>Tekshirilmoqda...</span> : <span>Kirish</span>}
              </button>
            </form>
          )}

          {/* Quick profile presets */}
          <div className="mt-5 pt-3.5 border-t border-stone-100">
            <span className="text-[11px] text-stone-400 uppercase tracking-wider block mb-2 font-medium">
              Tezkor profil tanlash
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('student')}
                className="flex-1 py-1.5 px-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-[11px] font-semibold text-stone-700 transition-colors cursor-pointer"
              >
                Talaba (Dilnoza)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('employer')}
                className="flex-1 py-1.5 px-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-[11px] font-semibold text-stone-700 transition-colors cursor-pointer"
              >
                Ish beruvchi (Bright Academy)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
