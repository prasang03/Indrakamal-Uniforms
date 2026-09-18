import React from 'react';
import { UniformCategory } from '../types';
import { 
  FileText, 
  Sparkles, 
  ArrowDown, 
  Phone,
  GraduationCap,
  Users,
  Stethoscope,
  BedDouble
} from 'lucide-react';

interface HeroProps {
  onSelectCategory: (category: UniformCategory) => void;
  onOpenQuoteModal: () => void;
  onOpenSwatchModal: () => void;
  showCatalog?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectCategory,
  onOpenQuoteModal,
  onOpenSwatchModal,
}) => {
  const scrollToCatalog = () => {
    const elem = document.getElementById('institutional-sectors');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className="py-8 sm:py-12 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Clean Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20">
            <span>Direct Wholesale Manufacturing</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
            Institutional Uniforms &amp; Bulk Textiles
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            We manufacture and supply uniforms, footwear, and linens for schools, hospitals, hotels, and corporate organizations across India. Direct wholesale rates with custom institution branding.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              id="hero-primary-calc-quote"
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Calculate Bulk Price (₹)</span>
            </button>

            <button
              type="button"
              id="hero-secondary-swatch-kit"
              onClick={onOpenSwatchModal}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Request Fabric Swatches</span>
            </button>

            <button
              type="button"
              onClick={scrollToCatalog}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
            >
              <span>View Products</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Simple Category Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
          
          <button
            type="button"
            onClick={() => {
              onSelectCategory('school');
              scrollToCatalog();
            }}
            className="text-left bg-slate-800/80 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700/80 hover:border-slate-600 transition-all group"
          >
            <div className="flex items-center gap-2.5 text-amber-400 mb-2">
              <GraduationCap className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">School Uniforms</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">
              Shirts, trousers, skirts, blazers, ties, belts, and school shoes.
            </p>
            <div className="text-[11px] font-semibold text-amber-300 mt-2">
              ₹85 – ₹750 / piece
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectCategory('staff');
              scrollToCatalog();
            }}
            className="text-left bg-slate-800/80 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700/80 hover:border-slate-600 transition-all group"
          >
            <div className="flex items-center gap-2.5 text-indigo-400 mb-2">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Staff &amp; Faculty</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">
              Teacher sarees, salwar suits, admin blazers, and driver sets.
            </p>
            <div className="text-[11px] font-semibold text-indigo-300 mt-2">
              ₹380 – ₹890 / piece
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectCategory('healthcare');
              scrollToCatalog();
            }}
            className="text-left bg-slate-800/80 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700/80 hover:border-slate-600 transition-all group"
          >
            <div className="flex items-center gap-2.5 text-emerald-400 mb-2">
              <Stethoscope className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Healthcare</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">
              Medical scrubs, lab coats, OT gowns, and hospital bedsheets.
            </p>
            <div className="text-[11px] font-semibold text-emerald-300 mt-2">
              ₹220 – ₹540 / piece
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectCategory('linen');
              scrollToCatalog();
            }}
            className="text-left bg-slate-800/80 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700/80 hover:border-slate-600 transition-all group"
          >
            <div className="flex items-center gap-2.5 text-cyan-400 mb-2">
              <BedDouble className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Hostel &amp; Hotel Linen</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">
              Fitted hostel bedsheets, thermal blankets, and satin stripes.
            </p>
            <div className="text-[11px] font-semibold text-cyan-300 mt-2">
              ₹95 – ₹490 / piece
            </div>
          </button>

        </div>

      </div>
    </section>
  );
};
