import React, { useState } from 'react';
import { X, Check, PackageCheck, Sparkles, Building2, Send, CheckCircle2 } from 'lucide-react';
import { SwatchKitRequest } from '../types';

interface SwatchKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SwatchKitModal: React.FC<SwatchKitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<SwatchKitRequest>({
    fullName: '',
    organizationName: '',
    sector: 'school',
    email: '',
    phone: '',
    shippingAddress: '',
    city: '',
    pincodeOrZip: '',
    estimatedQuantity: '100 - 500 units',
    specificRequirements: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [courierRef, setCourierRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `SWATCH-${Math.floor(100000 + Math.random() * 900000)}`;
    setCourierRef(ref);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="swatch-kit-modal"
        className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-200 bg-slate-50/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center">
              <PackageCheck className="w-5 h-5 text-indigo-800" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 font-heading">
                Request Physical Fabric Swatch Kit
              </h2>
              <p className="text-[11px] text-slate-500">
                Shipped free to verified schools, hospitals, and registered enterprises
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                Swatch Binder Dispatched for {formData.organizationName}!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Your sample kit including physical fabric swatches, color cards, and embroidered crest samples will be couriered to <strong>{formData.city}</strong> via express delivery.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs inline-block text-left space-y-1">
                <div>Courier Tracking Token: <strong className="font-mono text-indigo-900">{courierRef}</strong></div>
                <div>Estimated Arrival: <strong>2 – 3 Business Days</strong></div>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 text-xs font-bold text-white bg-indigo-900 rounded-full hover:bg-indigo-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200/70 text-[11px] text-indigo-950 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  Kit includes: Oxford weave cuts, Poly-Viscose suit swatches, Silver-ion scrub samples, and color cards.
                </span>
              </div>

              {/* Sector selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Primary Sector of Interest *
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['school', 'corporate', 'healthcare', 'multiple'] as const).map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setFormData({ ...formData, sector: sec })}
                      className={`py-2 px-1.5 rounded-full text-xs font-semibold capitalize border text-center transition-all ${
                        formData.sector === sec
                          ? 'bg-indigo-900 text-white border-indigo-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Institution / Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. St. Xavier's International"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="procurement@domain.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Courier Shipping Address *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Campus / Office street address, building number..."
                  value={formData.shippingAddress}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    City &amp; State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="City, State"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Postal / PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={formData.pincodeOrZip}
                    onChange={(e) => setFormData({ ...formData, pincodeOrZip: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-full shadow-md transition-all active:scale-98"
                >
                  <Send className="w-4 h-4 text-indigo-300" />
                  <span>Ship Sample Swatch Kit</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
