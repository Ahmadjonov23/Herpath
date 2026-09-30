import React, { useState } from 'react';
import { MOCK_COMPANIONS } from '../data/mockData';
import { Companion } from '../types';
import {
  Users, Shield, Lock, MapPin, Clock, CheckCircle2,
  Send, MessageCircle, AlertCircle, ArrowRight, Check
} from 'lucide-react';

interface NearbyCompanionsViewProps {
  onStartChat: (companion: Companion) => void;
  onBackToMap: () => void;
}

export const NearbyCompanionsView: React.FC<NearbyCompanionsViewProps> = ({
  onStartChat,
  onBackToMap
}) => {
  const [companions, setCompanions] = useState<Companion[]>(MOCK_COMPANIONS);
  const [invitationSent, setInvitationSent] = useState<string | null>(null);

  const handleSendInvite = (comp: Companion) => {
    setInvitationSent(comp.id);
    setTimeout(() => {
      onStartChat(comp);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header & Privacy Notice */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                Yo‘lingizdagi hamrohlar
              </h1>
              <span className="text-[11px] font-semibold text-[#802244] bg-[#802244]/5 border border-[#802244]/20 px-2 py-0.5 rounded">
                {companions.length} nafar faol
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Siz bilan bir yo‘nalishda harakatlanayotgan tasdiqlangan talaba qizlar
            </p>
          </div>

          <button
            onClick={onBackToMap}
            className="h-8.5 px-3 rounded-lg border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 self-start sm:self-auto transition-colors cursor-pointer"
          >
            <span>Xaritada ko‘rish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Privacy Notice Card */}
        <div className="mt-4 p-3.5 rounded-lg bg-stone-50 border border-stone-200 flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-stone-500 mt-0.5 shrink-0" />
          <div className="text-xs text-stone-600 leading-relaxed">
            <span className="font-bold text-stone-900 mr-1.5">Maxfiylik kafolati:</span>
            Platformada sizning aniq yashash manzilingiz yoki telefon raqamingiz ko‘rinmaydi. Faqat umumiy taxminiy bekat va tasdiqlangan talabalik holati ko‘rsatiladi.
          </div>
        </div>
      </div>

      {/* Companions Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {companions.map((comp) => {
          const isSent = invitationSent === comp.id;

          return (
            <div
              key={comp.id}
              className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name & Verified badge */}
                <div className="flex items-start justify-between gap-2.5 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#802244] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {comp.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-stone-900">{comp.displayName}</span>
                        {comp.isVerifiedStudent && (
                          <span title="Tasdiqlangan talaba">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-500 block truncate max-w-[140px]">
                        {comp.university}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {comp.compatibilityScore}% mos
                  </span>
                </div>

                <div className="text-xs text-stone-600 mb-3">
                  {comp.major}
                </div>

                {/* Approximate Location & Route Info */}
                <div className="space-y-1.5 p-2.5 bg-stone-50 rounded-lg border border-stone-100 text-xs mb-3.5">
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <MapPin className="w-3.5 h-3.5 text-[#802244] shrink-0" />
                    <div>
                      <span className="text-stone-400 text-[10px] block">Taxminiy hudud</span>
                      <span className="font-semibold text-stone-800">{comp.approxLocation}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-stone-700 pt-1.5 border-t border-stone-200/50">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <div>
                      <span className="text-stone-400 text-[10px] block">Qulay vaqt</span>
                      <span className="font-medium text-stone-800">{comp.walkingTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div>
                {isSent ? (
                  <div className="h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Taklif yuborildi...</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSendInvite(comp)}
                    className="w-full h-9 rounded-lg bg-[#802244] hover:bg-[#6c1d39] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Birga borishni taklif qilish</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
