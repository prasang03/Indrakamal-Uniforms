import React from 'react';
import { UniformCategory } from '../types';
import { 
  GraduationCap, 
  Briefcase, 
  Stethoscope, 
  ChevronRight,
  Download,
  CheckCircle2,
  Users,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onSelectCategory: (category: UniformCategory) => void;
  onOpenQuoteModal: () => void;
  onOpenSwatchModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectCategory,
  onOpenQuoteModal,
  onOpenSwatchModal,
}) => {
  const scrollToCatalog = () => {
    const catalog = document.getElementById('uniform-catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className="py-8 sm:py-10 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-6 gap-4">
          
          {/* Bento Hero Main Card: col-span-2 row-span-4 on desktop */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-4 bg-indigo-900 rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl min-h-[420px]">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-indigo-500/30 text-indigo-200 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase inline-block border border-indigo-400/30">
                  Est. 1994 • Factory Direct
                </span>
                <span className="hidden sm:inline-block bg-indigo-800/60 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-700/50">
                  MOQ 30-50 pcs
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mt-2 font-heading">
                Excellence in <br />
                Every Stitch.
              </h1>

              <p className="text-indigo-200 mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed font-normal">
                Custom uniform manufacturing solutions engineered for academies, global enterprises, and healthcare institutions across the world.
              </p>

              {/* Lab-tested assurance tag */}
              <div className="mt-5 flex items-center gap-2 text-xs text-indigo-200">
                <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100+ Wash Colorfast
                </span>
                <span>•</span>
                <span>In-House Embroidery</span>
                <span>•</span>
                <span>48h Prototyping</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mt-8 relative z-10">
              <button
                type="button"
                id="hero-cta-explore-catalog"
                onClick={scrollToCatalog}
                className="bg-white text-indigo-900 px-7 sm:px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-lg hover:bg-indigo-50 transition-all active:scale-98 flex items-center gap-2"
              >
                <span>View Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="hero-cta-bulk-quote"
                onClick={onOpenQuoteModal}
                className="bg-indigo-800 hover:bg-indigo-700 text-white border border-indigo-600/60 px-6 sm:px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                <span>Quote Request</span>
              </button>

              <button
                type="button"
                id="hero-cta-swatch-kit"
                onClick={onOpenSwatchModal}
                className="inline-flex items-center gap-1.5 text-xs text-indigo-200 hover:text-white transition-colors py-2 px-2"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Sample Swatch Kit</span>
              </button>
            </div>

            {/* Decorative ambient blurred glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Bento Card: Corporate Wear (col-span-1 row-span-3) */}
          <div
            onClick={() => {
              onSelectCategory('corporate');
              scrollToCatalog();
            }}
            className="md:col-span-1 lg:col-span-1 lg:row-span-3 bg-white rounded-[2.5rem] p-6 border border-slate-200 flex flex-col items-center justify-between text-center shadow-xs hover:shadow-md hover:border-indigo-300 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-indigo-50 transition-all shadow-inner">
                <Briefcase className="w-8 h-8 text-indigo-700" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-800 font-heading group-hover:text-indigo-900 transition-colors">
                Corporate Wear
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Precision-tailored blazers, non-iron dress shirts, trousers, and corporate executive attire.
              </p>
            </div>
            <div className="mt-4 pt-2 w-full border-t border-slate-100 flex items-center justify-center">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 uppercase tracking-tight group-hover:text-indigo-800 transition-colors">
                Discover Professionalism <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Bento Card: Healthcare (col-span-1 row-span-3) */}
          <div
            onClick={() => {
              onSelectCategory('healthcare');
              scrollToCatalog();
            }}
            className="md:col-span-1 lg:col-span-1 lg:row-span-3 bg-white rounded-[2.5rem] p-6 border border-slate-200 flex flex-col items-center justify-between text-center shadow-xs hover:shadow-md hover:border-teal-300 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-teal-100/60 transition-all shadow-inner">
                <Stethoscope className="w-8 h-8 text-teal-700" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-800 font-heading group-hover:text-teal-900 transition-colors">
                Healthcare
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Antimicrobial scrubs and lab coats designed for clinical endurance, fluid barrier, and comfort.
              </p>
            </div>
            <div className="mt-4 pt-2 w-full border-t border-slate-100 flex items-center justify-center">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 uppercase tracking-tight group-hover:text-teal-800 transition-colors">
                Shop Medical Gear <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Bento Card: School Collections (col-span-2 row-span-2) */}
          <div
            onClick={() => {
              onSelectCategory('school');
              scrollToCatalog();
            }}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between shadow-xs hover:shadow-md hover:border-indigo-300 transition-all duration-300 cursor-pointer group gap-6"
          >
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>K-12 &amp; Higher Academies</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-heading group-hover:text-indigo-950 transition-colors">
                School Collections
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-sm leading-relaxed">
                Durable, colorfast uniforms for over 500+ educational institutions. Wool-blend blazers, pleated skirts &amp; house kits.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 shrink-0 w-full sm:w-auto">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                <div className="text-xs font-bold text-slate-800">Anti-Pill</div>
                <div className="text-[10px] text-slate-400">Lab Tested</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                <div className="text-xs font-bold text-slate-800">Knife-Pleat</div>
                <div className="text-[10px] text-slate-400">German Autoclave</div>
              </div>
            </div>
          </div>

          {/* Bento Stat Pill 1: 25+ Years Exp */}
          <div className="col-span-1 lg:col-span-1 lg:row-span-1 bg-amber-400 rounded-3xl p-5 flex flex-col justify-center items-center text-amber-950 shadow-xs group hover:bg-amber-300 transition-colors">
            <span className="text-3xl sm:text-4xl font-black font-sans leading-none">25+</span>
            <span className="text-[11px] font-bold uppercase tracking-widest mt-1">Years Exp.</span>
          </div>

          {/* Bento Stat Pill 2: 1M+ Units/Year */}
          <div className="col-span-1 lg:col-span-1 lg:row-span-1 bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-center items-center text-slate-800 shadow-xs hover:border-slate-300 transition-colors">
            <span className="text-3xl sm:text-4xl font-black font-sans text-indigo-950 leading-none">1M+</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mt-1">Units / Year</span>
          </div>

          {/* Bento Live Status Pill: Bulk Production Active (col-span-2 row-span-1) */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-1 bg-slate-900 rounded-3xl px-6 sm:px-8 py-4 flex items-center justify-between text-white border border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  Current Status
                </span>
                <span className="text-xs sm:text-sm font-medium text-white">
                  Bulk Production: <strong className="text-emerald-400 font-bold">Active</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>64 Embroidery Heads</span>
              </div>
              <span className="px-3 py-1 bg-slate-800 text-slate-300 text-[11px] font-bold rounded-full border border-slate-700">
                ISO 9001
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
