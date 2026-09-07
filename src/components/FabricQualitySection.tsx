import React from 'react';
import { 
  ShieldCheck, 
  Droplets, 
  Sparkles, 
  Scissors, 
  Layers, 
  Award, 
  Flame, 
  Microscope,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

interface FabricQualitySectionProps {
  onOpenSwatchModal: () => void;
}

export const FabricQualitySection: React.FC<FabricQualitySectionProps> = ({
  onOpenSwatchModal,
}) => {
  const pillars = [
    {
      title: 'Lab-Tested 50,000+ Rubs Durability',
      description: 'Our poly-viscose and combed cotton uniform fabrics undergo Martindale abrasion cycle testing to guarantee 3 academic years or 200+ hospital sterilization washes without thinning.',
      icon: <Microscope className="w-5 h-5 text-sky-600" />,
      metric: 'Grade 4.5 Resistance',
    },
    {
      title: 'Silver-Ion Antimicrobial Shield',
      description: 'Healthcare scrubs and medical coats feature silver-ion particles permanently embedded into yarn fibers that actively neutralize pathogens and eliminate odor-causing bacteria.',
      icon: <ShieldCheck className="w-5 h-5 text-teal-600" />,
      metric: '99.9% Pathogen Barrier',
    },
    {
      title: 'Lotus Effect Liquid Repellence',
      description: 'Hydrophobic fluorocarbon coatings cause water, tea, coffee, and biological fluids to roll right off the fabric surface instead of soaking into inner fibers.',
      icon: <Droplets className="w-5 h-5 text-cyan-600" />,
      metric: 'AAMI Level 3 Compliant',
    },
    {
      title: 'Permanent Steam-Baked Pleating',
      description: 'Our school skirts and pinafores use German thermofixation pleat autoclaves ensuring razor-sharp knife and box pleats that survive tumble drying without re-ironing.',
      icon: <Scissors className="w-5 h-5 text-indigo-600" />,
      metric: 'Zero-Ironing Recovery',
    },
    {
      title: 'Oeko-Tex Standard 100 Dyes',
      description: 'All fiber dyeing is certified free of formaldehyde, harmful heavy metals, and carcinogenic azo compounds—safeguarding young kindergarteners and healthcare staff.',
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      metric: '100% Skin Safe',
    },
    {
      title: 'Bar-Tacked Stress Engineering',
      description: 'Every pocket mouth, zipper base, belt loop, and crotch fork receives high-cycle computerized bar-tack stitching using 4-ply core-spun thread.',
      icon: <Layers className="w-5 h-5 text-amber-600" />,
      metric: 'Zero Seam Splits',
    },
  ];

  return (
    <section id="quality-standards" className="py-12 sm:py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200/80 text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>The Indrakamal Textile Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Why Leading Institutions Choose Indrakamal
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Institutional uniforms undergo more mechanical friction, aggressive detergents, and daily wear than any consumer garment. We engineer every yard of fabric specifically for intense daily performance.
          </p>
        </div>

        {/* 6 Technical Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-[2rem] bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-2xs group-hover:bg-indigo-50 group-hover:scale-105 transition-all">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80">
                    {pillar.metric}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-indigo-950 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Free Swatch Binder Banner Callout - Bento Highlight Card */}
        <div className="rounded-[2.5rem] bg-indigo-950 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-indigo-800">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-indigo-900/80 border border-indigo-700 px-3.5 py-1.5 rounded-full uppercase tracking-widest">
                <PackageCheck className="w-4 h-4 text-amber-400" />
                <span>Complimentary Institutional Sample Service</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Request Our Comprehensive Fabric Swatch Binder
              </h3>
              <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl leading-relaxed">
                Experience our textiles firsthand before committing to production. Our swatch kit includes 30+ physical fabric swatches (Oxford, Poly-Viscose Twill, Gabardine, Silver-Ion Scrubs), Pantone shade cards, and sample embroidered school and corporate crests.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <button
                type="button"
                id="btn-request-swatch-box"
                onClick={onOpenSwatchModal}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm rounded-full shadow-xl transition-all active:scale-98"
              >
                <PackageCheck className="w-4 h-4" />
                <span>Request Free Swatch Binder</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
