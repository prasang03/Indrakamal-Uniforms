import React, { useState } from 'react';
import { UniformItem } from '../types';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Ruler, 
  Sparkles, 
  HelpCircle, 
  Plus, 
  Scissors, 
  Truck, 
  Award,
  Layers
} from 'lucide-react';

interface ProductDetailModalProps {
  product: UniformItem | null;
  onClose: () => void;
  onAddToQuote: (product: UniformItem, selectedColor: string) => void;
  isInQuote: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  isInQuote,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<string>(product.colorOptions[0]?.name || '');
  const [measurementUnit, setMeasurementUnit] = useState<'inches' | 'cm'>('inches');
  const [activeTab, setActiveTab] = useState<'specs' | 'sizing' | 'customization'>('specs');

  const unitMultiplier = measurementUnit === 'cm' ? 2.54 : 1;

  const formatUnit = (valInches: number) => {
    if (measurementUnit === 'cm') {
      return `${Math.round(valInches * 2.54)} cm`;
    }
    return `${valInches}"`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="product-detail-modal-container"
        className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/90">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-950 border border-indigo-200">
              {product.category} Division
            </span>
            <span className="text-xs text-slate-500 font-medium">Style Code: {product.id.toUpperCase()}</span>
          </div>
          <button
            type="button"
            id="btn-close-product-modal"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Product Image & Color Selection (Col 1-5) */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-4/5 rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900 text-amber-300 border border-amber-400/30">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Color Shade Swatches */}
              <div className="p-4 rounded-[2rem] bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Selected Shade:</span>
                  <span className="font-bold text-indigo-900">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.colorOptions.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-white border-indigo-600 text-slate-900 shadow-xs ring-2 ring-indigo-600'
                            : 'bg-white/80 border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-500 italic pt-1">
                  *Custom institutional Pantone dye matching available for orders exceeding 200 units.
                </p>
              </div>

              {/* Bulk volume discount summary table */}
              <div className="p-4 rounded-[2rem] bg-indigo-50/60 border border-indigo-200 text-xs space-y-1.5">
                <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Institutional Tier Discounts</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 pt-1">
                  <div>50 – 199 pcs: <strong className="text-slate-800">Standard MOQ</strong></div>
                  <div>200 – 499 pcs: <strong className="text-emerald-700">8% Off</strong></div>
                  <div>500 – 1,999 pcs: <strong className="text-emerald-700">15% Off</strong></div>
                  <div>2,000+ pcs: <strong className="text-emerald-700">22% Off + Free Setup</strong></div>
                </div>
              </div>
            </div>

            {/* Right: Garment Details & Tabs (Col 6-12) */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  {product.name}
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Subcategory: {product.subcategory} • Fit Profile: {product.gender}
                </p>
                <p className="text-sm text-slate-700 mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tabs Navigation */}
              <div className="flex items-center gap-2 border-b border-slate-200 pt-1">
                <button
                  type="button"
                  id="tab-btn-specs"
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 text-xs font-bold transition-colors relative ${
                    activeTab === 'specs'
                      ? 'text-indigo-900 border-b-2 border-indigo-800'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Textile Specs &amp; Testing
                </button>
                <button
                  type="button"
                  id="tab-btn-sizing"
                  onClick={() => setActiveTab('sizing')}
                  className={`pb-2.5 text-xs font-bold transition-colors relative flex items-center gap-1.5 ${
                    activeTab === 'sizing'
                      ? 'text-indigo-900 border-b-2 border-indigo-800'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Measurements</span>
                </button>
                <button
                  type="button"
                  id="tab-btn-customization"
                  onClick={() => setActiveTab('customization')}
                  className={`pb-2.5 text-xs font-bold transition-colors relative flex items-center gap-1.5 ${
                    activeTab === 'customization'
                      ? 'text-indigo-900 border-b-2 border-indigo-800'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Embroidery &amp; Branding</span>
                </button>
              </div>

              {/* Tab 1: Specs */}
              {activeTab === 'specs' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Composition</span>
                      <strong className="text-slate-900 block mt-0.5">{product.fabricComposition}</strong>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Fabric Density</span>
                      <strong className="text-slate-900 block mt-0.5">{product.gsm} GSM ({product.weave})</strong>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Care &amp; Shrinkage</span>
                      <strong className="text-slate-900 block mt-0.5">&lt; 1.8% residual shrinkage</strong>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Colorfastness</span>
                      <strong className="text-slate-900 block mt-0.5">Grade 4.5 to ISO 105-C06</strong>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Engineered Key Features
                    </h3>
                    <ul className="space-y-1.5">
                      {product.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="font-bold text-slate-900 mb-1">Recommended Institutional Applications:</div>
                    <p className="text-slate-600">{product.suitableFor}</p>
                  </div>
                </div>
              )}

              {/* Tab 2: Sizing */}
              {activeTab === 'sizing' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Standard Institutional Size Grid
                    </span>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs">
                      <button
                        type="button"
                        onClick={() => setMeasurementUnit('inches')}
                        className={`px-3 py-0.5 rounded-full font-semibold transition-all ${
                          measurementUnit === 'inches' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Inches (&quot;)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMeasurementUnit('cm')}
                        className={`px-3 py-0.5 rounded-full font-semibold transition-all ${
                          measurementUnit === 'cm' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Centimeters (cm)
                      </button>
                    </div>
                  </div>

                  {product.sizeMeasurements && product.sizeMeasurements.length > 0 ? (
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                          <tr>
                            <th className="py-2.5 px-3.5">Size Spec</th>
                            <th className="py-2.5 px-3.5">Chest</th>
                            <th className="py-2.5 px-3.5">Waist</th>
                            <th className="py-2.5 px-3.5">Length</th>
                            <th className="py-2.5 px-3.5">Shoulder</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {product.sizeMeasurements.map((m) => (
                            <tr key={m.size} className="hover:bg-slate-50">
                              <td className="py-2 px-3.5 font-bold text-slate-900">{m.size}</td>
                              <td className="py-2 px-3.5 text-slate-700">{formatUnit(m.chestInches)}</td>
                              <td className="py-2 px-3.5 text-slate-700">{formatUnit(m.waistInches)}</td>
                              <td className="py-2 px-3.5 text-slate-700">{formatUnit(m.lengthInches)}</td>
                              <td className="py-2 px-3.5 text-slate-700">{formatUnit(m.shoulderInches)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                      <p className="text-slate-700">
                        Available Sizes in Production: <strong>{product.sizes.join(', ')}</strong>
                      </p>
                      <p className="text-slate-500">
                        *Indrakamal Uniforms provides full master size measuring kits sent directly to your campus or corporate office prior to mass production cutting.
                      </p>
                    </div>
                  )}

                  <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                    <span>
                      Need custom student or employee measurement logging? We provide Excel measurement roster templates and on-site master tailor sizing sessions.
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 3: Customization */}
              {activeTab === 'customization' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="text-xs text-slate-600">
                    Each uniform can be customized with your institution&apos;s crest, color trim, department piping, and personalized badges in our 64-head computerized embroidery facility.
                  </div>

                  <div className="space-y-2">
                    {product.customizationOptions.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800">
                        <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-1">
                    <div className="font-bold text-amber-300">Embroidery Precision Guarantee</div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      All embroidery utilizes Madeira color-safe threads resistant to industrial bleaching and repeated school/hospital laundering cycles.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
                Minimum Order Quantity
              </span>
              <span className="text-xs font-bold text-slate-800">
                {product.moq} units / style
              </span>
            </div>
            <span className="text-slate-300">|</span>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
                Production Lead Time
              </span>
              <span className="text-xs font-bold text-slate-800">
                14 – 21 Days
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-full hover:bg-slate-100 transition-colors"
            >
              Close
            </button>

            <button
              type="button"
              id="btn-modal-add-quote"
              onClick={() => {
                onAddToQuote(product, selectedColor);
                onClose();
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded-full transition-all shadow-xs active:scale-98 ${
                isInQuote
                  ? 'bg-emerald-700 text-white'
                  : 'bg-indigo-900 hover:bg-indigo-800 text-white'
              }`}
            >
              {isInQuote ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Already in RFQ Basket</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-indigo-300" />
                  <span>Add to Institutional Quote</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
