import React, { useState } from 'react';
import { Conversation, ChatMessage } from '../types';
import { CONVERSATIONS } from '../data/mockData';
import {
  Send, ShieldAlert, CheckCircle2, User, Building,
  ArrowLeft, Lock, Info, CheckCheck
} from 'lucide-react';

interface ChatViewProps {
  initialConversationId?: string;
  onBack?: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ initialConversationId, onBack }) => {
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
  const [activeId, setActiveId] = useState<string>(initialConversationId || CONVERSATIONS[0].id);
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find((c) => c.id === activeId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      senderName: 'Dilnoza',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDelivered: true
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeId) {
          return {
            ...c,
            lastMessage: newMsg.text,
            lastMessageTime: newMsg.time,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    setInputText('');
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden flex flex-col md:flex-row h-[76vh] min-h-[520px]">
      {/* Sidebar: Conversations List */}
      <div className={`w-full md:w-80 border-r border-stone-200 flex flex-col ${activeId && 'hidden md:flex'}`}>
        <div className="p-3.5 border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-stone-900">Xabarlar</h2>
          <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
            {conversations.length} ta suhbat
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
          {conversations.map((conv) => {
            const isActive = conv.id === activeId;
            return (
              <div
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                  isActive ? 'bg-[#FAF8F5]' : 'hover:bg-stone-50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    conv.type === 'employer'
                      ? 'bg-stone-100 text-stone-800 border border-stone-200'
                      : 'bg-[#802244] text-white'
                  }`}
                >
                  {conv.avatarText}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-stone-900 truncate">
                      {conv.recipientName}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {conv.lastMessageTime}
                    </span>
                  </div>

                  <span className="text-[11px] text-stone-400 block mb-1">
                    {conv.recipientRole}
                  </span>

                  <p className="text-xs text-stone-600 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Thread Area */}
      <div className={`flex-1 flex flex-col ${!activeId && 'hidden md:flex'}`}>
        {/* Chat Header */}
        <div className="p-3 sm:p-3.5 border-b border-stone-200 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveId('')}
              className="md:hidden w-8 h-8 rounded-md flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div
              className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                activeConv.type === 'employer'
                  ? 'bg-stone-100 text-stone-800 border border-stone-200'
                  : 'bg-[#802244] text-white'
              }`}
            >
              {activeConv.avatarText}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-stone-900">
                  {activeConv.recipientName}
                </span>
                {activeConv.isVerified && (
                  <span title="Tasdiqlangan profil">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  </span>
                )}
              </div>
              <span className="text-[11px] text-stone-500">
                {activeConv.type === 'employer' ? 'Tekshirilgan ish beruvchi' : 'Tasdiqlangan talaba hamroh'}
              </span>
            </div>
          </div>
        </div>

        {/* Safety Warning Notice */}
        <div className="px-3.5 py-1.5 bg-amber-50 border-b border-amber-200/80 flex items-center gap-2 text-[11px] text-amber-900">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>
            <strong>Xavfsizlik eslatmasi:</strong> Shaxsiy karta ma’lumotlari yoki parollarni bermang. Uchrashuvlarni faqat rasmiy ofis yoki gavjum joylarda belgilang.
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2.5 bg-stone-50/50">
          {activeConv.messages.map((msg) => {
            const isMe = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] p-2.5 rounded-lg text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#802244] text-white'
                      : 'bg-white text-stone-800 border border-stone-200'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-0.5 px-1 text-[10px] text-stone-400">
                  <span>{msg.time}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-stone-400" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Xabar yozing..."
            className="flex-1 h-9 px-3 rounded-lg border border-stone-200 bg-stone-50 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#802244] focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="h-9 px-3.5 rounded-lg bg-[#802244] disabled:opacity-40 text-white flex items-center justify-center hover:bg-[#6c1d39] transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
