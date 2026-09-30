import React, { useState } from 'react';
import { EMERGENCY_CONTACTS } from '../data/mockData';
import { EmergencyContact } from '../types';
import {
  AlertTriangle, Phone, ShieldCheck, MapPin, Users,
  PhoneCall, Bell, Lock, CheckCircle2, Plus, X, Radio, ArrowRight, ShieldAlert
} from 'lucide-react';

interface SafetyCenterViewProps {
  onBack?: () => void;
}

export const SafetyCenterView: React.FC<SafetyCenterViewProps> = ({ onBack }) => {
  const [contacts, setContacts] = useState<EmergencyContact[]>(EMERGENCY_CONTACTS);
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [sosSent, setSosSent] = useState(false);
  const [isSharingLocation, setIsSharingLocation] = useState(true);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRel, setNewContactRel] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('+998 9');
  const [fakeCallActive, setFakeCallActive] = useState(false);

  // Countdown timer for SOS trigger
  React.useEffect(() => {
    let timer: any;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setSosActive(true);
      setSosSent(true);
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleStartSos = () => {
    setCountdown(3);
  };

  const handleCancelSos = () => {
    setCountdown(null);
    setSosActive(false);
    setSosSent(false);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;
    const newEntry: EmergencyContact = {
      id: `ec-${Date.now()}`,
      name: newContactName,
      relationship: newContactRel || 'Yaqinim',
      phone: newContactPhone,
      isPrimary: false
    };
    setContacts([...contacts, newEntry]);
    setNewContactName('');
    setNewContactRel('');
    setNewContactPhone('+998 9');
    setShowAddContact(false);
  };

  const handleRemoveContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Title & Status */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                Xavfsizlik markazi
              </h1>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Faol himoya
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Favqulodda tezkor yordam, ishonchli kontaktlar va shaxsiy himoya vositalari
            </p>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer self-start sm:self-auto"
            >
              ← Ortga qaytish
            </button>
          )}
        </div>

        {/* SOS Emergency Module */}
        <div className="mt-5 p-5 sm:p-6 rounded-lg bg-stone-50 border border-stone-200 text-center flex flex-col items-center">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
            Favqulodda signal (SOS)
          </span>
          <p className="text-xs text-stone-600 max-w-md mb-5 leading-relaxed">
            Tugma bosilganda ishonchli yaqinlaringizga va 102 xizmatiga real vaqtdagi geo-joylashuvingiz ko‘rsatilgan favqulodda xabar yuboriladi.
          </p>

          {countdown !== null ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold text-3xl shadow-lg animate-pulse">
                {countdown}
              </div>
              <span className="text-xs font-bold text-[#DC2626]">
                Signal yuborilmoqda... Bekor qilish uchun bosing:
              </span>
              <button
                onClick={handleCancelSos}
                className="h-9 px-5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Bekor qilish
              </button>
            </div>
          ) : sosSent ? (
            <div className="w-full p-4 rounded-lg bg-red-50 border border-red-200 text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-red-900">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>SOS signali muvaffaqiyatli yuborildi!</span>
              </div>
              <p className="text-xs text-red-800 leading-relaxed">
                Yaqinlaringizga koordinatangiz SMS orqali yetkazildi: <br />
                <span className="font-mono font-medium text-[11px]">"Xavf signali! Dilnoza Bunyodkor shox ko‘chasi 14 yaqinida yordam so‘ramoqda. Koordinatalar: 41.2855, 69.2140"</span>
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="tel:102"
                  className="h-8.5 px-3.5 rounded-md bg-[#DC2626] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-red-700 transition-colors shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>102 ga qo‘ng‘iroq</span>
                </a>
                <button
                  onClick={handleCancelSos}
                  className="h-8.5 px-3 rounded-md border border-red-300 text-xs font-semibold text-red-800 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  Signalni yakunlash
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleStartSos}
              className="w-32 h-32 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] active:scale-95 text-white flex flex-col items-center justify-center p-3 shadow-md transition-all cursor-pointer"
            >
              <AlertTriangle className="w-8 h-8 mb-1" />
              <span className="text-sm font-bold tracking-tight">SOS</span>
              <span className="text-[10px] text-white/80">3 soniyalik tekshiruv</span>
            </button>
          )}

          <p className="text-[11px] text-stone-400 mt-4">
            Tasodifiy bosishdan himoyalangan: 3 soniya ichida bekor qilish mumkin.
          </p>
        </div>
      </div>

      {/* Direct Emergency Services (102, 112, 103) */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
          Tezkor davlat xizmatlari
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <a
            href="tel:102"
            className="p-3 rounded-lg border border-stone-200 hover:border-stone-300 bg-stone-50/60 hover:bg-stone-50 flex items-center justify-between text-xs transition-colors"
          >
            <div>
              <span className="font-bold text-stone-900 block text-sm">102</span>
              <span className="text-stone-500 text-[11px]">Ichki ishlar (IIB)</span>
            </div>
            <PhoneCall className="w-4 h-4 text-[#802244]" />
          </a>

          <a
            href="tel:112"
            className="p-3 rounded-lg border border-stone-200 hover:border-stone-300 bg-stone-50/60 hover:bg-stone-50 flex items-center justify-between text-xs transition-colors"
          >
            <div>
              <span className="font-bold text-stone-900 block text-sm">112</span>
              <span className="text-stone-500 text-[11px]">Yagona qutqaruv (FVV)</span>
            </div>
            <PhoneCall className="w-4 h-4 text-[#802244]" />
          </a>

          <a
            href="tel:103"
            className="p-3 rounded-lg border border-stone-200 hover:border-stone-300 bg-stone-50/60 hover:bg-stone-50 flex items-center justify-between text-xs transition-colors"
          >
            <div>
              <span className="font-bold text-stone-900 block text-sm">103</span>
              <span className="text-stone-500 text-[11px]">Tez tibbiy yordam</span>
            </div>
            <PhoneCall className="w-4 h-4 text-[#802244]" />
          </a>
        </div>
      </div>

      {/* Trusted Contacts */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Ishonchli kontaktlar ({contacts.length})
            </h2>
            <p className="text-xs text-stone-500">
              SOS yuborilganda tezkor xabardor qilinadigan yaqinlaringiz
            </p>
          </div>
          <button
            onClick={() => setShowAddContact(!showAddContact)}
            className="h-8 px-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Qo‘shish</span>
          </button>
        </div>

        {/* Add contact form */}
        {showAddContact && (
          <form onSubmit={handleAddContact} className="p-3.5 mb-3.5 rounded-lg bg-stone-50 border border-stone-200 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="F.I.SH (Masalan: Onam)"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                required
                className="p-2 rounded-md border border-stone-300 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#802244]"
              />
              <input
                type="text"
                placeholder="Qarindoshligi (Ona, dugona...)"
                value={newContactRel}
                onChange={(e) => setNewContactRel(e.target.value)}
                className="p-2 rounded-md border border-stone-300 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#802244]"
              />
              <input
                type="tel"
                placeholder="+998 90 123 45 67"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                required
                className="p-2 rounded-md border border-stone-300 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#802244]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddContact(false)}
                className="px-3 py-1.5 rounded-md text-stone-600 hover:bg-stone-200 cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-md bg-[#802244] text-white font-medium hover:bg-[#6c1d39] cursor-pointer"
              >
                Saqlash
              </button>
            </div>
          </form>
        )}

        {/* Contact List */}
        <div className="space-y-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-[#802244]/10 text-[#802244] font-bold text-xs flex items-center justify-center shrink-0">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-stone-900">{contact.name}</span>
                    {contact.isPrimary && (
                      <span className="text-[10px] bg-stone-200 text-stone-800 px-1 rounded font-medium">
                        Asosiy
                      </span>
                    )}
                  </div>
                  <span className="text-stone-500 text-[11px]">
                    {contact.relationship} · {contact.phone}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`tel:${contact.phone}`}
                  className="w-8 h-8 rounded-md border border-stone-200 bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                  title="Qo‘ng‘iroq qilish"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleRemoveContact(contact.id)}
                  className="w-8 h-8 rounded-md border border-stone-200 bg-white flex items-center justify-center text-stone-400 hover:text-red-600 hover:bg-stone-50 transition-colors cursor-pointer"
                  title="O‘chirish"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Tools: Soxta qo'ng'iroq (Fake Call) & Live Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Fake Call Trigger */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <PhoneCall className="w-4 h-4 text-[#802244]" />
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Soxta qo‘ng‘iroq (Fake Call)
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Noxush yoki xavfli holatlarda (shubhali transport yoki notanish shaxslar yonida) suhbatdan qutulish uchun telefoningizga kiruvchi qo‘ng‘iroq simulyatsiyasini yoqing.
            </p>
          </div>

          {fakeCallActive ? (
            <div className="p-3 bg-stone-900 text-white rounded-lg text-center space-y-1.5 animate-pulse">
              <span className="text-[11px] font-semibold block text-emerald-400">Kiruvchi qo‘ng‘iroq...</span>
              <span className="text-xs font-bold block">Onam (+998 90 123 45 67)</span>
              <button
                onClick={() => setFakeCallActive(false)}
                className="mt-1 text-xs text-stone-300 underline cursor-pointer"
              >
                Qo‘ng‘iroqni tugatish
              </button>
            </div>
          ) : (
            <button
              onClick={() => setFakeCallActive(true)}
              className="w-full h-9 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-800 transition-colors cursor-pointer"
            >
              Qo‘ng‘iroqni faollashtirish
            </button>
          )}
        </div>

        {/* Live Location Sharing */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Real vaqt joylashuvi
                </h3>
              </div>
              <span className={`text-[11px] font-semibold ${isSharingLocation ? 'text-emerald-700' : 'text-stone-400'}`}>
                {isSharingLocation ? 'Ulashilmoqda' : 'O‘chirilgan'}
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Universitetdan ishga yoki uyga qaytayotganda joylashuvingiz xaritada ishonchli kontaktlaringizga ko‘rinadi.
            </p>
          </div>

          <button
            onClick={() => setIsSharingLocation(!isSharingLocation)}
            className={`w-full h-9 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              isSharingLocation
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {isSharingLocation ? 'Joylashuv ulashishni to‘xtatish' : 'Joylashuvni ulashish'}
          </button>
        </div>
      </div>
    </div>
  );
};
