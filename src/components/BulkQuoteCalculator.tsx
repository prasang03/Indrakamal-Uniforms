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
  const [addCategoryFilter, setAddCategoryFilter] = useState<string>('all');

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

  // Volume discount calculation for Indian school/bulk orders
  let discountPercentage = 0;
  let tierLabel = 'Standard Wholesale Rate';
  if (totalGarments >= 1000) {
    discountPercentage = 18;
    tierLabel = 'Large School / Trust Discount (18% Off)';
  } else if (totalGarments >= 300) {
    discountPercentage = 10;
    tierLabel = 'Full School Batch Discount (10% Off)';
  } else if (totalGarments >= 100) {
    discountPercentage = 5;
    tierLabel = 'Small School Order (5% Off)';
  }

  // Estimated baseline wholesale price per garment in Indian Rupees (~₹320 avg)
  const baseAvgPrice = 320;
  const subtotalEst = totalGarments * baseAvgPrice;
  const discountedSubtotal = subtotalEst * (1 - discountPercentage / 100);

  const embroideryFee = embroideryOption ? totalGarments * 15 : 0; // ₹15 per piece for logo embroidery
  const labelsFee = customLabelsOption ? totalGarments * 8 : 0;   // ₹8 per piece for school woven label
  const packagingFee = individualPackaging ? totalGarments * 5 : 0; // ₹5 per piece for polybag packing

  const totalEstimate = discountedSubtotal + embroideryFee + labelsFee + packagingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `IKU-IND-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setQuoteReference(ref);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="quote-calculator-modal"
        className="relative bg-white w-full max-w-4xl rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-slate-200 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-900 text-white flex items-center justify-center shadow-xs shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading leading-snug">
                Institutional Price &amp; Order Estimator (in ₹)
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Indrakamal Uniforms • Fair wholesale pricing for schools &amp; institutions in India
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors shrink-0"
            aria-label="Close quote calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6">
          {isSubmitted ? (
            /* Success confirmation screen */
            <div className="py-10 text-center space-y-5 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Inquiry Received Successfully
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2 font-heading">
                  Thank You, {contactName || 'Respected School Management'}!
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Your uniform requirement for <strong>{orgName}</strong> has been received by our uniform supply team.
                </p>
              </div>

              {/* RFQ Reference Box */}
              <div className="p-5 rounded-[2rem] bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Inquiry Reference Number:</span>
                  <strong className="font-mono font-bold text-indigo-900 text-sm">{quoteReference}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Total Requested Garments:</span>
                  <strong className="text-slate-900">{totalGarments} Uniforms</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Volume Discount:</span>
                  <strong className="text-emerald-700 font-bold">{tierLabel}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Total Cost:</span>
                  <strong className="text-slate-900 font-bold text-sm">₹{Math.round(totalEstimate).toLocaleString('en-IN')} (approx. wholesale price)</strong>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span>Business Contact:</span>
                  <span className="text-slate-800 font-medium">+91 93025 02587 • info@indrakamal.in</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-left flex items-start gap-2.5">
                <Info className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                <span>
                  Our team will call or WhatsApp you within <strong>4 hours</strong>. We will arrange free physical samples couriered to your organization address so your committee can verify fabric quality and sizing before ordering.
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save Estimate
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded-full transition-colors shadow-xs"
                >
                  Back to Uniform Catalog
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
                    Selected Uniform Items ({quoteItems.length})
                  </h3>
                  {quoteItems.length > 0 && (
                    <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                      Total: {totalGarments} pieces
                    </span>
                  )}
                </div>

                {quoteItems.length === 0 ? (
                  <div className="p-8 rounded-[2rem] border-2 border-dashed border-slate-200 text-center space-y-3">
                    <p className="text-xs text-slate-500">
                      Your uniform list is empty right now. Choose school uniform items below or explore the catalog:
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
                              {item.category === 'school' ? 'Student' : 
                               item.category === 'staff' ? 'Staff' : 
                               item.category === 'healthcare' ? 'Healthcare' : 
                               item.category === 'corporate' ? 'Corporate' : 
                               item.category === 'hospitality' ? 'Hospitality' : 
                               item.category === 'linen' ? 'Linen' : item.category}
                            </span>
                            <strong className="text-xs font-bold text-slate-900">
                              {item.uniformName}
                            </strong>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Color: <span className="font-semibold text-slate-700">{item.selectedColor}</span>
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
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Quick Add More Items Drawer */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                          + Add More Items To Estimate:
                        </span>
                        <div className="flex items-center gap-1 text-[10px] overflow-x-auto">
                          {[
                            { id: 'all', label: 'All' },
                            { id: 'school', label: 'Students & Shoes' },
                            { id: 'staff', label: 'Staff' },
                            { id: 'healthcare', label: 'Healthcare' },
                            { id: 'corporate', label: 'Corporate' },
                            { id: 'hospitality', label: 'Hospitality' },
                            { id: 'linen', label: 'Bed Linen' },
                          ].map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setAddCategoryFilter(cat.id)}
                              className={`px-2 py-0.5 rounded-full font-semibold transition-colors ${
                                addCategoryFilter === cat.id
                                  ? 'bg-indigo-900 text-white'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1.5 bg-slate-50 rounded-2xl border border-slate-200">
                        {allProducts
                          .filter((p) => {
                            if (addCategoryFilter === 'all') return true;
                            return p.category === addCategoryFilter;
                          })
                          .filter((p) => !quoteItems.some((qi) => qi.uniformId === p.id))
                          .slice(0, 16)
                          .map((prod) => (
                            <button
                              key={prod.id}
                              type="button"
                              onClick={() => onAddItem(prod.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-indigo-50 hover:text-indigo-900 hover:border-indigo-300 text-slate-700 rounded-full border border-slate-200 transition-colors shadow-2xs"
                            >
                              <Plus className="w-3 h-3 text-indigo-600" />
                              <span>{prod.name}</span>
                            </button>
                          ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* Custom School / Institutional Options Checkboxes */}
                <div className="p-5 rounded-[2rem] bg-indigo-50/60 border border-indigo-200/80 space-y-3">
                  <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5 uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Institutional Customization &amp; Finishing Options</span>
                  </div>

                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={embroideryOption}
                        onChange={(e) => setEmbroideryOption(e.target.checked)}
                        className="rounded text-indigo-800 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span>School crest or logo computerized embroidery (+₹15 / piece)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customLabelsOption}
                        onChange={(e) => setCustomLabelsOption(e.target.checked)}
                        className="rounded text-indigo-800 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span>Woven school neck tag &amp; student name label (+₹8 / piece)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={individualPackaging}
                        onChange={(e) => setIndividualPackaging(e.target.checked)}
                        className="rounded text-indigo-800 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span>Individual transparent packet packaging with size sticker (+₹5 / piece)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={quickSamplingRequired}
                        onChange={(e) => setQuickSamplingRequired(e.target.checked)}
                        className="rounded text-indigo-800 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span className="font-semibold text-indigo-900">
                        Include free cloth sample kit sent by courier to your address (Free)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Estimate Summary Box */}
                <div className="p-5 rounded-[2rem] bg-slate-900 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Applicable Discount Tier:</span>
                    <span className="font-bold text-emerald-400">{tierLabel}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Total Quantity:</span>
                    <span className="font-bold text-slate-200">{totalGarments} Uniforms</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Estimated Wholesale Cost</span>
                      <span className="text-2xl font-extrabold text-white font-heading">
                        ₹{Math.round(totalEstimate).toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-400">INR (approx.)</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Estimated Production &amp; Delivery</span>
                      <span className="text-xs font-bold text-amber-400">12 – 18 Days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Institutional Details Submission Form (Col 8-12) */}
              <div className="lg:col-span-5 bg-slate-50/90 p-6 rounded-[2rem] border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Building2 className="w-4 h-4 text-indigo-800" />
                  <h3 className="text-sm font-bold text-slate-900">
                    School &amp; Order Inquiry Form
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      School / College / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Saraswati Vidya Mandir, St. Mary High School..."
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Principal / Trustee / Admin"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Mobile / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="schooloffice@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        District, State &amp; Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Satara, Maharashtra 415001"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Required By Month
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                      >
                        <option>Before School Reopens (June/July)</option>
                        <option>Mid-Term Supply (October/November)</option>
                        <option>Urgent Dispatch (Within 10-14 days)</option>
                        <option>Planning for Next Academic Year</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Uniform Details &amp; Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Classes 1 to 10, Navy Blue &amp; White check shirt, house T-shirts in Red, Blue, Green, Yellow..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-base sm:text-xs"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={quoteItems.length === 0}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                    >
                      <Send className="w-4 h-4 text-indigo-300" />
                      <span>Submit Inquiry &amp; Request Free Cloth Samples</span>
                    </button>
                    <p className="text-[10px] text-slate-500 text-center mt-1.5">
                      Direct phone / WhatsApp call from our uniform team within 4 working hours.
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
