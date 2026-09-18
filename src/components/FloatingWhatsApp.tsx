import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink, Send } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phone = '919302502587';
  const displayPhone = '+91 93025 02587';

  const presets = [
    {
      label: 'School Uniforms & Shoes',
      text: 'Hello Indrakamal Uniforms, I am inquiring about school student uniforms, ties, belts, and shoes for our institution.',
      icon: '🎒',
    },
    {
      label: 'Staff Sarees & Faculty Attire',
      text: 'Hello Indrakamal Uniforms, we need bulk uniforms for school staff and faculty (sarees, salwar suits, blazers).',
      icon: '👩‍🏫',
    },
    {
      label: 'Hospital Scrubs & Bedsheets',
      text: 'Hello Indrakamal Uniforms, we require wholesale medical scrubs, doctor coats, and hospital bedsheets.',
      icon: '🏥',
    },
    {
      label: 'Hotel Bedding & Hospitality Wear',
      text: 'Hello Indrakamal Uniforms, we are looking for hotel bed linen (satin sheets) and hospitality staff attire.',
      icon: '🏨',
    },
    {
      label: 'Hostel Bedding & Blankets',
      text: 'Hello Indrakamal Uniforms, we have a bulk requirement for hostel bedding, thermal blankets, and curtains.',
      icon: '🛏️',
    },
    {
      label: 'Corporate Suiting & Uniforms',
      text: 'Hello Indrakamal Uniforms, we need tailored formal blazers and office shirts for our corporate campus.',
      icon: '👔',
    },
  ];

  const handleOpenPreset = (messageText: string) => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {/* Quick Selection Dialog */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Chat with Indrakamal</h4>
                <p className="text-[10px] text-emerald-200">Business Desk: {displayPhone}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 bg-slate-50 space-y-2">
            <p className="text-[11px] text-slate-600 font-medium px-1">
              Select your inquiry division to start a direct WhatsApp chat:
            </p>

            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOpenPreset(p.text)}
                  className="w-full flex items-center justify-between p-2.5 bg-white hover:bg-emerald-50 text-left rounded-2xl border border-slate-200/80 hover:border-emerald-300 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{p.icon}</span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">
                      {p.label}
                    </span>
                  </div>
                  <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() =>
                  handleOpenPreset('Hello Indrakamal Uniforms, I have an institutional uniform inquiry.')
                }
                className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Direct Chat on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        id="floating-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group"
        aria-label="Chat with Indrakamal Uniforms on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="text-xs font-extrabold hidden sm:inline tracking-wide">
          WhatsApp Us
        </span>
      </button>
    </div>
  );
};
