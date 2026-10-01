import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck, Lock, Mail, KeyRound, X, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAutofill = () => {
    setLogin('admin@herpath.uz');
    setPassword('admin2026');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      // Valid credentials check
      const cleanLogin = login.trim().toLowerCase();
      if ((cleanLogin === 'admin@herpath.uz' || cleanLogin === 'admin') && password === 'admin2026') {
        onLoginSuccess('Bosh Administrator');
        onClose();
      } else {
        setError('Login yoki parol noto‘g‘ri. Administrator login: admin@herpath.uz, parol: admin2026');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-hidden">
        {/* Dark Navy Executive Header */}
        <div className="bg-[#0A192F] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800">
                  Xavfsiz Portal
                </span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
                Admin Konsoliga Kirish
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Credentials Info Notice */}
          <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs text-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F766E] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                Rasmiy Admin Kirish Ma’lumotlari:
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="text-[11px] font-bold text-[#0F766E] hover:underline cursor-pointer bg-white px-2 py-0.5 rounded border border-teal-200 shadow-2xs"
                  title="Formaga to‘ldirish"
                >
                  To‘ldirish ⚡
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLoginSuccess('Bosh Administrator');
                    onClose();
                  }}
                  className="text-[11px] font-bold text-white bg-[#0F766E] hover:bg-[#115e59] px-2 py-0.5 rounded shadow-2xs cursor-pointer transition-colors"
                  title="1-klikda to‘g‘ridan-to‘g‘ri kirish"
                >
                  1-klikda kirish 🚀
                </button>
              </div>
            </div>
            <div className="font-mono text-[11px] bg-white p-2.5 rounded-lg border border-teal-100 flex items-center justify-between text-stone-700">
              <div className="space-y-0.5">
                <div><strong className="text-stone-900">Login:</strong> <span className="text-teal-900 font-semibold select-all">admin@herpath.uz</span></div>
                <div><strong className="text-stone-900">Parol:</strong> <span className="text-teal-900 font-semibold select-all">admin2026</span></div>
              </div>
              <span className="text-[10px] text-teal-700 font-sans bg-teal-50 px-2 py-1 rounded border border-teal-200">
                To‘liq boshqaruv huquqi
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Admin Login / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="admin@herpath.uz"
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Maxfiy Parol
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-2 rounded-lg bg-[#0A192F] hover:bg-[#1E293B] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-60"
            >
              {isLoading ? (
                <span>Tekshirilmoqda...</span>
              ) : (
                <>
                  <span>Admin Paneli Kirish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-stone-400">
              HerPath xavfsizlik auditi va platforma moderatsiya tizimi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
