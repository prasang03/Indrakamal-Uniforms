import React, { useState } from 'react';
import { BulkQuoteItem, UniformItem } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Send, 
  Printer, 
  ArrowRight,
  Info,
  Layers,
  Truck,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { AttachedQuoteData } from './InquiryModal';

interface BulkQuoteCalculatorProps {
  quoteItems: BulkQuoteItem[];
  allProducts: UniformItem[];
  onUpdateQuantity: (uniformId: string, delta: number) => void;
  onSetQuantity: (uniformId: string, quantity: number) => void;
  onRemoveItem: (uniformId: string) => void;
  onAddItem: (uniformId: string) => void;
  onClose: () => void;
  onOpenInquiryForm: (quoteData?: AttachedQuoteData) => void;
}

export const BulkQuoteCalculator: React.FC<BulkQuoteCalculatorProps> = ({
  quoteItems,
  allProducts,
  onUpdateQuantity,
  onSetQuantity,
  onRemoveItem,
  onAddItem,
  onClose,
  onOpenInquiryForm,
}) => {
  const [embroideryOption, setEmbroideryOption] = useState<boolean>(true);
  const [customLabelsOption, setCustomLabelsOption] = useState<boolean>(true);
  const [individualPackaging, setIndividualPackaging] = useState<boolean>(false);
  const [quickSamplingRequired, setQuickSamplingRequired] = useState<boolean>(true);
  const [addCategoryFilter, setAddCategoryFilter] = useState<string>('all');

  // Total Garments Count
  const totalGarments = quoteItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Volume discount calculation for Indian school/bulk orders
  let discountPercentage = 0;
  let tierLabel = 'Standard Wholesale Tier';
  if (totalGarments >= 1000) {
    discountPercentage = 18;
    tierLabel = 'Trust / Institutional Tier (18% Off)';
  } else if (totalGarments >= 300) {
    discountPercentage = 10;
    tierLabel = 'Batch School Tier (10% Off)';
  } else if (totalGarments >= 100) {
    discountPercentage = 5;
    tierLabel = 'Small Order Tier (5% Off)';
  }

  // Baseline estimate in Indian Rupees (~₹320 avg)
  const baseAvgPrice = 320;
  const subtotalEst = totalGarments * baseAvgPrice;
  const discountAmount = (subtotalEst * discountPercentage) / 100;
  const discountedSubtotal = subtotalEst - discountAmount;

  const embroideryFee = embroideryOption ? totalGarments * 15 : 0; // ₹15/pc logo embroidery
  const labelsFee = customLabelsOption ? totalGarments * 8 : 0;    // ₹8/pc woven school label
  const packagingFee = individualPackaging ? totalGarments * 5 : 0;// ₹5/pc transparent bag

  const totalEstimate = discountedSubtotal + embroideryFee + labelsFee + packagingFee;

  const handleProceedToInquiry = () => {
    const itemsSummary = quoteItems.length > 0 
      ? quoteItems.map((item, idx) => 
          `${idx + 1}. ${item.uniformName} (${item.category}): ${item.quantity} units | Color: ${item.selectedColor} | Fabric: ${item.selectedFabricGrade} | Embroidery: ${item.includeEmbroidery ? 'Yes (+₹15)' : 'No'}`
        ).join('\n')
      : 'General institutional uniform quotation';

    onClose();
    onOpenInquiryForm({
      totalGarments,
      estimatedTotal: `₹${Math.round(totalEstimate).toLocaleString('en-IN')} (${tierLabel})`,
      itemsSummary
    });
  };

  const handleOpenGeneralInquiry = () => {
    onClose();
    onOpenInquiryForm();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="quote-calculator-modal"
        className="relative bg-white w-full max-w-5xl rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-slate-200 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#001845] text-white flex items-center justify-center shadow-xs shrink-0">
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading leading-snug">
                Institutional Bulk Price Calculator (in ₹)
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Transparent wholesale pricing, volume discount tiers &amp; customization estimator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Cross-reference Button to Inquiry Form in Header */}
            <button
              type="button"
              onClick={handleOpenGeneralInquiry}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-950 bg-white hover:bg-slate-100 border border-slate-200 rounded-full transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-700" />
              <span>Inquiry Form</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors shrink-0"
              aria-label="Close quote calculator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6">
          
          {/* CROSS-REFERENCE BANNER: Link to General Inquiry Form */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-indigo-700" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Prefer submitting custom specifications or request a vendor proposal?
                </div>
                <div className="text-[11px] text-slate-600">
                  Fill our dedicated Institutional Inquiry Form directly without line-item pricing.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenGeneralInquiry}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-950 hover:bg-indigo-900 rounded-full transition-all shrink-0 shadow-xs active:scale-98"
            >
              <span>Go to Inquiry Form</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </button>
          </div>

          {/* Active Quote Builder Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left Column: Items in RFQ Basket (Col 1-7) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Configured Uniform Items ({quoteItems.length})
                </h3>
                {quoteItems.length > 0 && (
                  <span className="text-xs font-semibold text-indigo-950 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    Total: {totalGarments} garments
                  </span>
                )}
              </div>

              {quoteItems.length === 0 ? (
                <div className="p-8 rounded-[2rem] border-2 border-dashed border-slate-200 text-center space-y-3">
                  <p className="text-xs text-slate-500">
                    Your uniform list is empty right now. Choose items below to estimate wholesale pricing:
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
                  {quoteItems.map((item) => {
                    const product = allProducts.find((p) => p.id === item.uniformId);
                    return (
                      <div
                        key={item.uniformId}
                        className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {item.category}
                            </span>
                            <span className="text-xs font-bold text-slate-900 line-clamp-1">
                              {item.uniformName}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span>Color: <strong className="text-slate-700">{item.selectedColor}</strong></span>
                            <span>Fabric: <strong className="text-slate-700">{item.selectedFabricGrade}</strong></span>
                            {item.includeEmbroidery && (
                              <span className="text-indigo-600 font-medium">+ Embroidery</span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 p-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.uniformId, -25)}
                              className="w-7 h-7 flex items-center justify-center rounded-full text-slate-600 hover:bg-white hover:text-slate-900 transition-colors text-xs font-bold"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="25"
                              step="25"
                              value={item.quantity}
                              onChange={(e) => onSetQuantity(item.uniformId, Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-14 text-center text-xs font-bold bg-transparent text-slate-900 focus:outline-hidden"
                            />
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.uniformId, 25)}
                              className="w-7 h-7 flex items-center justify-center rounded-full text-slate-600 hover:bg-white hover:text-slate-900 transition-colors text-xs font-bold"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.uniformId)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                            aria-label={`Remove ${item.uniformName}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add more items dropdown */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Add more products to estimate:</span>
                  <select
                    value={addCategoryFilter}
                    onChange={(e) => setAddCategoryFilter(e.target.value)}
                    className="text-[11px] bg-slate-100 border border-slate-200 rounded-lg px-2 py-1"
                  >
                    <option value="all">All Categories</option>
                    <option value="school">School Uniforms</option>
                    <option value="staff">Staff &amp; Faculty</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="corporate">Corporate</option>
                    <option value="linen">Hostel Linen</option>
                  </select>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {allProducts
                    .filter((p) => addCategoryFilter === 'all' || p.category === addCategoryFilter)
                    .filter((p) => !quoteItems.some((qi) => qi.uniformId === p.id))
                    .map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => onAddItem(p.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-slate-50 hover:bg-indigo-50 hover:text-indigo-900 text-slate-700 rounded-full border border-slate-200 transition-colors truncate max-w-[200px]"
                      >
                        <Plus className="w-2.5 h-2.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{p.name}</span>
                      </button>
                    ))}
                </div>
              </div>

              {/* Custom Finishing Options */}
              <div className="p-4 sm:p-5 rounded-[2rem] bg-indigo-50/60 border border-indigo-200/80 space-y-2.5">
                <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5 uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Institutional Customization Options</span>
                </div>

                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2.5 text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={embroideryOption}
                      onChange={(e) => setEmbroideryOption(e.target.checked)}
                      className="rounded text-indigo-800 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span>School crest or logo computerized embroidery (+₹15 / pc)</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customLabelsOption}
                      onChange={(e) => setCustomLabelsOption(e.target.checked)}
                      className="rounded text-indigo-800 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span>Woven neck tag &amp; student name label (+₹8 / pc)</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={individualPackaging}
                      onChange={(e) => setIndividualPackaging(e.target.checked)}
                      className="rounded text-indigo-800 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span>Individual transparent polybag packing with size sticker (+₹5 / pc)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Wholesale Pricing Calculation & Cross-Reference Actions (Col 8-12) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              
              {/* Pricing Breakdown Card */}
              <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-[2rem] space-y-4 shadow-xl">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Wholesale Price Breakdown</span>
                    <span className="text-emerald-400 font-semibold">{tierLabel}</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white font-heading">
                    ₹{Math.round(totalEstimate).toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-slate-400 ml-1.5">INR (approx.)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Estimated bulk rate for {totalGarments} pieces (avg. ₹{totalGarments > 0 ? Math.round(totalEstimate / totalGarments) : 0}/pc)
                  </p>
                </div>

                {/* Line Item Table */}
                <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Base Wholesale Garment Cost:</span>
                    <span>₹{Math.round(subtotalEst).toLocaleString('en-IN')}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>Volume Discount ({discountPercentage}% Off):</span>
                      <span>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {embroideryOption && (
                    <div className="flex items-center justify-between">
                      <span>Computerized Logo Embroidery:</span>
                      <span>+₹{Math.round(embroideryFee).toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {customLabelsOption && (
                    <div className="flex items-center justify-between">
                      <span>Woven Neck Tags &amp; Labels:</span>
                      <span>+₹{Math.round(labelsFee).toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {individualPackaging && (
                    <div className="flex items-center justify-between">
                      <span>Individual Polybag Packing:</span>
                      <span>+₹{Math.round(packagingFee).toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-amber-300">
                    <span>Cloth Sample Kit Courier:</span>
                    <span className="font-semibold">₹0 (Free)</span>
                  </div>
                </div>

                {/* Volume Discount Progress / Milestones */}
                <div className="pt-3 border-t border-slate-800 space-y-1.5 text-[11px]">
                  <div className="text-slate-400 font-medium">Volume Tier Milestones:</div>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                    <div className={`p-1.5 rounded-lg border ${totalGarments >= 100 ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200' : 'bg-slate-800/60 border-slate-700 text-slate-500'}`}>
                      100+ pcs: 5% Off
                    </div>
                    <div className={`p-1.5 rounded-lg border ${totalGarments >= 300 ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200' : 'bg-slate-800/60 border-slate-700 text-slate-500'}`}>
                      300+ pcs: 10% Off
                    </div>
                    <div className={`p-1.5 rounded-lg border ${totalGarments >= 1000 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-slate-800/60 border-slate-700 text-slate-500'}`}>
                      1000+ pcs: 18% Off
                    </div>
                  </div>
                </div>

                {/* Dispatch note */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Estimated Dispatch:</span>
                  </span>
                  <span className="text-amber-400 font-bold">12 – 18 Days</span>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-900">
                  Ready to proceed with this estimate?
                </div>

                {/* PRIMARY CROSS-REFERENCE BUTTON: Transfer Estimate to Inquiry Form */}
                <button
                  type="button"
                  disabled={quoteItems.length === 0}
                  onClick={handleProceedToInquiry}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-full shadow-md hover:shadow-lg transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Estimate via Inquiry Form</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>

                {/* SECONDARY CROSS-REFERENCE BUTTON: General Inquiry */}
                <button
                  type="button"
                  onClick={handleOpenGeneralInquiry}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-300 rounded-full transition-colors text-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Fill General Inquiry Form Instead</span>
                </button>

                {/* Print button */}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save Estimate Slip</span>
                </button>
              </div>

              {/* Verified Quality Badge */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Official wholesale factory pricing by Indrakamal Uniforms. All fabrics color-fastness tested (ISO Grade 4+), anti-pilling, and shrink-resistant.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
