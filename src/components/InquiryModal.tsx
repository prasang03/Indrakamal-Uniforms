import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Calculator, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  ArrowRight,
  Loader2,
  Clock,
  FileSpreadsheet
} from 'lucide-react';
import { sendGeneralInquiry } from '../services/inquiryService';

export interface AttachedQuoteData {
  totalGarments: number;
  estimatedTotal: string;
  itemsSummary: string;
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator: () => void;
  attachedQuote?: AttachedQuoteData | null;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  onOpenCalculator,
  attachedQuote,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    orgName: '',
    contactName: '',
    role: '',
    phone: '',
    email: '',
    location: '',
    sector: 'school',
    approxQuantity: '300 - 500 pieces',
    requirements: '',
    timeline: 'Before School Reopens (June/July)',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const ref = `INQ-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setReferenceId(ref);

    await sendGeneralInquiry({
      reference: ref,
      organization: formData.orgName,
      contactPerson: formData.contactName,
      role: formData.role.trim() || undefined,
      phone: formData.phone,
      email: formData.email.trim() || undefined,
      location: formData.location,
      sector: formData.sector,
      approxQuantity: formData.approxQuantity,
      requirements: formData.requirements,
      timeline: formData.timeline,
      attachedQuote: attachedQuote || undefined,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleSwitchToCalculator = () => {
    onClose();
    onOpenCalculator();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="inquiry-form-modal"
        className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-slate-200 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#001845] text-white flex items-center justify-center shadow-xs shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading leading-snug">
                Institutional Inquiry &amp; RFQ Form
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Direct wholesale supply inquiry for schools, trusts, &amp; organizations
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors shrink-0"
            aria-label="Close inquiry form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-5">
          {isSubmitted ? (
            /* Success confirmation screen */
            <div className="py-8 text-center space-y-5 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Inquiry Dispatched Successfully
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2 font-heading">
                  Thank You, {formData.contactName || 'Respected Patron'}!
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Your institutional uniform inquiry for <strong>{formData.orgName}</strong> has been received by our sales team.
                </p>
              </div>

              <div className="inline-flex items-center justify-center gap-2 py-1.5 px-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Inquiry Logged &amp; Assigned</span>
              </div>

              {/* Inquiry Details Box */}
              <div className="p-5 rounded-[2rem] bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Inquiry Reference ID:</span>
                  <strong className="font-mono font-bold text-indigo-950 text-sm">{referenceId}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Organization:</span>
                  <strong className="text-slate-900">{formData.orgName}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Contact Number:</span>
                  <strong className="text-slate-900">{formData.phone}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Supply Sector:</span>
                  <strong className="text-slate-900 capitalize">{formData.sector}</strong>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-200">
                  <span>Helpdesk / WhatsApp:</span>
                  <span className="text-slate-800 font-medium">+91 93025 02587</span>
                </div>
              </div>

              {/* Cross-reference CTA to Bulk Calculator on Success */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-bold text-amber-950 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-amber-700" />
                    <span>Need instant price estimates for committee approvals?</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Use our live Wholesale Price Calculator to estimate per-piece costs, volume discounts, and embroidery.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSwitchToCalculator}
                  className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-full shrink-0 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Open Calculator</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 text-xs font-bold text-white bg-indigo-950 rounded-full hover:bg-indigo-900 transition-colors shadow-md"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* CROSS-REFERENCE BANNER: Link to Bulk Price Calculator */}
              <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-indigo-50/50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-800 flex items-center justify-center shrink-0">
                    <Calculator className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Want an instant price estimate with volume discounts?
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Calculate per-piece rates, volume discounts (up to 18%), and embroidery fees live.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSwitchToCalculator}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-full transition-all shrink-0 shadow-xs active:scale-98"
                >
                  <span>Bulk Calculator</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Notice if a quote is attached */}
              {attachedQuote && (
                <div className="mb-4 p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-indigo-700 shrink-0" />
                    <span>
                      Attached Estimate: <strong>{attachedQuote.totalGarments} items</strong> ({attachedQuote.estimatedTotal})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSwitchToCalculator}
                    className="text-[11px] font-bold text-indigo-700 hover:underline"
                  >
                    Edit Items
                  </button>
                </div>
              )}

              {/* The Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Organization & Sector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      School / College / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. St. Xavier's High School, Apollo Clinic"
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Supply Sector *
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                    >
                      <option value="school">School Uniforms (Students)</option>
                      <option value="staff">Staff &amp; Faculty Attire</option>
                      <option value="healthcare">Healthcare (Scrubs, Lab Coats, Bed Linen)</option>
                      <option value="corporate">Corporate Office Uniforms</option>
                      <option value="hospitality">Hospitality &amp; Hotel Linen</option>
                      <option value="linen">Hostel &amp; Institutional Linen</option>
                      <option value="multiple">Multiple Categories</option>
                    </select>
                  </div>
                </div>

                {/* Contact Person & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Principal / Trustee / Purchase Head"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Designation / Role (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Administrator, Director, Trustee"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Official Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="principal@school.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                    />
                  </div>
                </div>

                {/* Location & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      District, City &amp; State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune, Maharashtra 411001"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Approximate Quantity Needed
                    </label>
                    <select
                      value={formData.approxQuantity}
                      onChange={(e) => setFormData({ ...formData, approxQuantity: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                    >
                      <option>50 - 100 pieces (Trial batch)</option>
                      <option>100 - 300 pieces</option>
                      <option>300 - 500 pieces (Full standard batch)</option>
                      <option>500 - 1,000 pieces</option>
                      <option>1,000 - 5,000+ pieces (Trust / Mega order)</option>
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Expected Delivery Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                  >
                    <option>Before School Reopens (June/July)</option>
                    <option>Mid-Term Supply (October/November)</option>
                    <option>Urgent Dispatch (Within 10-14 days)</option>
                    <option>Planning for Next Academic Year</option>
                  </select>
                </div>

                {/* Requirements details */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Uniform Details &amp; Specific Requirements *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. Navy blue checked shirts, dark grey pleated skirts/trousers, sports polo T-shirts for 4 house colors, embroidery of school crest on chest..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-[#001845] hover:bg-[#002855] text-white font-bold rounded-full shadow-lg transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>Submit</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-2">
                    Official response &amp; WhatsApp contact within 4 working hours.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
