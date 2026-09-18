import React from 'react';
import { ShieldCheck, Scissors, Sparkles } from 'lucide-react';

interface FabricQualitySectionProps {
  onOpenSwatchModal: () => void;
}

export const FabricQualitySection: React.FC<FabricQualitySectionProps> = ({
  onOpenSwatchModal,
}) => {
  const specs = [
    {
      title: 'Durable Fabric Blends',
      description: 'Poly-cotton and combed cotton weaves engineered for frequent washing, color retention, and daily use in Indian conditions.',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-700" />,
    },
    {
      title: 'Reinforced Construction',
      description: 'Double lockstitching on stress points, heavy-duty thread, and reinforced seams to prevent tearing at pockets and joints.',
      icon: <Scissors className="w-5 h-5 text-indigo-700" />,
    },
    {
      title: 'Institution Branding',
      description: 'Precise computer embroidery, heat transfer, woven school ties, and custom crest belts tailored and supplied to your exact colors.',
      icon: <Sparkles className="w-5 h-5 text-indigo-700" />,
    },
  ];

  return (
    <section id="quality-standards" className="py-10 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              Quality &amp; Material Specifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Standard fabric composition and construction practices across our institutional supply orders.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSwatchModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors self-start sm:self-auto"
          >
            <span>Request Fabric Samples</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200 space-y-2.5"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
