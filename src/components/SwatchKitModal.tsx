import React, { useState } from 'react';
import { X, Check, PackageCheck, Sparkles, Building2, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { SwatchKitRequest } from '../types';
import { sendSampleKitInquiry } from '../services/inquiryService';

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

  const [honeypot, setHoneypot] = useState('');
  const [openedAt] = useState<number>(() => Date.now());
  const [validationError, setValidationError] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [courierRef, setCourierRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setValidationError(null);
    setIsSubmitting(true);
    const ref = `SAMPLE-${Math.floor(100000 + Math.random() * 900000)}`;
    setCourierRef(ref);

    const elapsedSeconds = (Date.now() - openedAt) / 1000;

    const result = await sendSampleKitInquiry({
      reference: ref,
      fullName: formData.fullName,
      organizationName: formData.organizationName,
      sector: formData.sector,
      phone: formData.phone,
      email: formData.email.trim() || undefined,
      address: formData.shippingAddress,
      city: formData.city,
      pincode: formData.pincodeOrZip,
      estimatedQuantity: formData.estimatedQuantity,
      requirements: formData.specificRequirements.trim() || undefined,
      honeypot,
      elapsedSeconds,
    });

    if (!result.success && result.error) {
      setValidationError(result.error);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="sample-kit-modal"
        className="relative bg-white w-full max-w-xl rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-slate-200 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center shrink-0">
              <PackageCheck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-800" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading">
                Request Free Cloth Sample Kit
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-500">
                Couried free of cost to schools, institutions &amp; organizations across India
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                Cloth Samples Dispatched for {formData.organizationName}!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Your sample kit with original institutional uniform cloth samples, shade cards, and stitching examples has been scheduled for dispatch to <strong>{formData.city}</strong>.
              </p>
              <div className="inline-flex items-center justify-center gap-2 py-1.5 px-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sample dispatch request sent to info@indrakamal.in</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs inline-block text-left space-y-1">
                <div>Parcel Reference Number: <strong className="font-mono text-indigo-900">{courierRef}</strong></div>
                <div>Expected Courier Arrival: <strong>3 – 4 Days by Speed Post / Courier</strong></div>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 text-xs font-bold text-white bg-indigo-900 rounded-full hover:bg-indigo-800 transition-colors"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200/70 text-[11px] text-indigo-950 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  Sample envelope contains: Real cloth samples of uniform shirts, heavy trouser twill, pleated skirt checks, PT sport polo fabric, and color shade card.
                </span>
              </div>

              {/* Sector selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Select Sector of Interest *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {[
                    { id: 'school', label: 'School Students' },
                    { id: 'staff', label: 'School Staff & Faculty' },
                    { id: 'healthcare', label: 'Healthcare & Bed Linen' },
                    { id: 'corporate', label: 'Corporate Office' },
                    { id: 'hospitality', label: 'Hospitality & Hotel Linen' },
                    { id: 'linen', label: 'Hostel Bedding & Linen' },
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, sector: sec.id as any })}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                        formData.sector === sec.id
                          ? 'bg-indigo-900 text-white border-indigo-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {sec.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    School / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saraswati Vidya Mandir"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Principal / Admin"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="schooloffice@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                  />
                </div>
                {/* Anti-spam trap: hidden from humans, automatically filled by web crawler bots */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="swatch_company_fax">Leave this empty</label>
                  <input
                    id="swatch_company_fax"
                    type="text"
                    name="swatch_company_fax"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    placeholder="e.g. 98200 12345"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (validationError) setValidationError(null);
                    }}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    10-digit Indian mobile number for courier dispatch SMS
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Postal Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Complete school / institution campus address, city, district..."
                  value={formData.shippingAddress}
                  onChange={(e) => {
                    setFormData({ ...formData, shippingAddress: e.target.value });
                    if (validationError) setValidationError(null);
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    City, District &amp; State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Satara, Maharashtra"
                    value={formData.city}
                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value });
                      if (validationError) setValidationError(null);
                    }}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    6-digit PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="e.g. 415001"
                    value={formData.pincodeOrZip}
                    onChange={(e) => {
                      setFormData({ ...formData, pincodeOrZip: e.target.value });
                      if (validationError) setValidationError(null);
                    }}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                  />
                </div>
              </div>

              {validationError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-full shadow-md transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-indigo-300 animate-spin" />
                      <span>Dispatching Sample Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-indigo-300" />
                      <span>Send Me Free Cloth Samples by Post</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
