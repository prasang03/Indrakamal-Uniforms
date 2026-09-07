import React, { useState } from 'react';
import { BulkQuoteItem, UniformItem } from '../types';
import { 
  X, 
  Check, 
  Trash2, 
  Plus, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Send, 
  CheckCircle2, 
  Printer, 
  ArrowRight,
  Info
} from 'lucide-react';

interface BulkQuoteCalculatorProps {
  quoteItems: BulkQuoteItem[];
  allProducts: UniformItem[];
  onUpdateQuantity: (uniformId: string, delta: number) => void;
  onSetQuantity: (uniformId: string, quantity: number) => void;
  onRemoveItem: (uniformId: string) => void;
  onAddItem: (uniformId: string) => void;
  onClose: () => void;
}

export const BulkQuoteCalculator: React.FC<BulkQuoteCalculatorProps> = ({
  quoteItems,
  allProducts,
  onUpdateQuantity,
  onSetQuantity,
  onRemoveItem,
  onAddItem,
  onClose,
}) => {
  const [embroideryOption, setEmbroideryOption] = useState<boolean>(true);
  const [customLabelsOption, setCustomLabelsOption] = useState<boolean>(true);
  const [individualPackaging, setIndividualPackaging] = useState<boolean>(false);
  const [quickSamplingRequired, setQuickSamplingRequired] = useState<boolean>(true);

  // Form submission state
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [timeline, setTimeline] = useState('Standard (3-4 Weeks)');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');

  // Total Garments Count
  const totalGarments = quoteItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Volume discount calculation
  let discountPercentage = 0;
  let tierLabel = 'Standard MOQ Tier';
  if (totalGarments >= 2000) {
    discountPercentage = 22;
    tierLabel = 'Mega Institutional Tier (22% Savings)';
  } else if (totalGarments >= 500) {
    discountPercentage = 15;
    tierLabel = 'Enterprise Volume Tier (15% Savings)';
  } else if (totalGarments >= 200) {
    discountPercentage = 8;
    tierLabel = 'Bulk Academic Tier (8% Savings)';
  }

  // Estimated baseline price per garment roughly $10.50 average
  const baseAvgPrice = 11.5;
  const subtotalEst = totalGarments * baseAvgPrice;
  const discountedSubtotal = subtotalEst * (1 - discountPercentage / 100);

  const embroideryFee = embroideryOption ? totalGarments * 0.75 : 0;
  const labelsFee = customLabelsOption ? totalGarments * 0.35 : 0;
  const packagingFee = individualPackaging ? totalGarments * 0.25 : 0;

  const totalEstimate = discountedSubtotal + embroideryFee + labelsFee + packagingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `IKU-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setQuoteReference(ref);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="quote-calculator-modal"
        className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-200 bg-slate-50/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-900 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 font-heading">
                Institutional Bulk Quote Builder
              </h2>
              <p className="text-xs text-slate-500">
                Official Indrakamal Uniforms Manufacturing &amp; Wholesale Pricing
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
            aria-label="Close quote calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {isSubmitted ? (
            /* Success confirmation screen */
            <div className="py-10 text-center space-y-5 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  RFQ Generated Successfully
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2 font-heading">
                  Thank You, {contactName || 'Valued Partner'}!
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Your formal Request for Quotation for <strong>{orgName}</strong> has been logged into our factory scheduling system.
                </p>
              </div>

              {/* RFQ Reference Box */}
              <div className="p-5 rounded-[2rem] bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">RFQ Reference Number:</span>
                  <strong className="font-mono font-bold text-indigo-900 text-sm">{quoteReference}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Total Requested Units:</span>
                  <strong className="text-slate-900">{totalGarments} Garments</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Volume Savings Applied:</span>
                  <strong className="text-emerald-700 font-bold">{tierLabel}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Project Total:</span>
                  <strong className="text-slate-900 font-bold">${Math.round(totalEstimate).toLocaleString()} USD (approx.)</strong>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span>Factory Account Manager:</span>
                  <span className="text-slate-800 font-medium">procurement@indrakamaluniforms.com</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-left flex items-start gap-2.5">
                <Info className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                <span>
                  Our Senior Merchandiser will contact you via WhatsApp/Email within <strong>4 working hours</strong> with formal proforma invoicing, computerized embroidery digital mockups, and swatch courier details.
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save RFQ PDF
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded-full transition-colors shadow-xs"
                >
                  Back to Catalog
                </button>
              </div>
            </div>
          ) : (
            /* Active Quote Builder */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Items in RFQ Basket (Col 1-7) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Requested Attire Styles ({quoteItems.length})
                  </h3>
                  {quoteItems.length > 0 && (
                    <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                      Total: {totalGarments} units
                    </span>
                  )}
                </div>

                {quoteItems.length === 0 ? (
                  <div className="p-8 rounded-[2rem] border-2 border-dashed border-slate-200 text-center space-y-3">
                    <p className="text-xs text-slate-500">
                      Your RFQ basket is currently empty. Browse the catalog to add school, corporate, or healthcare attire, or choose from our popular models below.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center pt-2">
                      {allProducts.slice(0, 4).map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => onAddItem(p.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 text-slate-700 rounded-full border border-slate-200 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-indigo-600" />
                          <span>+ {p.name.split(' ').slice(0, 3).join(' ')}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {quoteItems.map((item) => (
                      <div
                        key={item.uniformId}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                              {item.category}
                            </span>
                            <strong className="text-xs font-bold text-slate-900">
                              {item.uniformName}
                            </strong>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Shade: <span className="font-semibold text-slate-700">{item.selectedColor}</span> • Grade: {item.selectedFabricGrade}
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <div className="flex items-center bg-white border border-slate-200 rounded-full shadow-2xs overflow-hidden">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.uniformId, -25)}
                              className="px-3 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                            >
                              -25
                            </button>
                            <input
                              type="number"
                              min="25"
                              step="5"
                              value={item.quantity}
                              onChange={(e) => onSetQuantity(item.uniformId, Math.max(10, parseInt(e.target.value) || 0))}
                              className="w-14 text-center text-xs font-bold text-slate-900 border-x border-slate-200 py-1 focus:outline-hidden"
                            />
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.uniformId, 25)}
                              className="px-3 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                            >
                              +25
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.uniformId)}
                            className="p-2 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                            title="Remove from RFQ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Custom Institutional Options Checkboxes */}
                <div className="p-5 rounded-[2rem] bg-indigo-50/60 border border-indigo-200/80 space-y-3">
                  <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5 uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Institutional Customization Options</span>
                  </div>

                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={embroideryOption}
                        onChange={(e) => setEmbroideryOption(e.target.checked)}
                        className="rounded text-indigo-800 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span>Direct computerized crest / logo embroidery (+$0.75/pc)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customLabelsOption}
                        onChange={(e) => setCustomLabelsOption(e.target.checked)}
                        className="rounded text-indigo-800 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span>Custom institutional woven neck label &amp; student name tag (+$0.35/pc)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={individualPackaging}
                        onChange={(e) => setIndividualPackaging(e.target.checked)}
                        className="rounded text-indigo-800 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span>Individual barcode polybag packaging by student/staff size (+$0.25/pc)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={quickSamplingRequired}
                        onChange={(e) => setQuickSamplingRequired(e.target.checked)}
                        className="rounded text-indigo-800 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span className="font-semibold text-indigo-900">
                        Include 48-Hour Pre-Production Sample Garment Courier (Complimentary)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Estimate Summary Box */}
                <div className="p-5 rounded-[2rem] bg-slate-900 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Selected Discount Bracket:</span>
                    <span className="font-bold text-emerald-400">{tierLabel}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Total Volume:</span>
                    <span className="font-bold text-slate-200">{totalGarments} Garments</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Estimated Budget Bracket</span>
                      <span className="text-xl font-extrabold text-white font-heading">
                        ${Math.round(totalEstimate).toLocaleString()} <span className="text-xs font-normal text-slate-400">USD (CIF/FOB)</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Factory Lead Time</span>
                      <span className="text-xs font-bold text-amber-400">14 – 21 Days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Institutional Details Submission Form (Col 8-12) */}
              <div className="lg:col-span-5 bg-slate-50/90 p-6 rounded-[2rem] border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Building2 className="w-4 h-4 text-indigo-800" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Institutional Procurement Form
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Organization / School / Hospital Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. St. Xavier's Academy, Apollo Care..."
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Institutional Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@institution.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Delivery City / State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="City, Country"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Required Delivery Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                      >
                        <option>Rush (10-14 Days)</option>
                        <option>Standard (3-4 Weeks)</option>
                        <option>Next Academic Term (60 Days)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Specific Fabric or Branding Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., specific Pantone shade, customized tartan plaid, embroidery stitch count requirements..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={quoteItems.length === 0}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                    >
                      <Send className="w-4 h-4 text-indigo-300" />
                      <span>Generate &amp; Transmit Formal RFQ</span>
                    </button>
                    <p className="text-[10px] text-slate-500 text-center mt-1.5">
                      Guaranteed response within 4 hours by factory merchandisers.
                    </p>
                  </div>
                </form>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
