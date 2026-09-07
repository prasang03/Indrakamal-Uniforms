import React, { useState } from 'react';
import { CLIENT_TESTIMONIALS, MANUFACTURING_METRICS } from '../data/uniformCatalog';
import { 
  Building2, 
  GraduationCap, 
  Stethoscope, 
  Quote, 
  Star, 
  CheckCircle2, 
  Award,
  ArrowRight,
  Factory
} from 'lucide-react';

export const InstitutionalShowcase: React.FC = () => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const sectorFeatures = [
    {
      title: 'School & Academy Networks',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      tag: '120+ Academic Campuses',
      points: [
        'Complete kits: Summer shirts, winter crested blazers, sports house polos, and permanent-pleat skirts',
        'Growth-friendly waistband elastic expandable systems to fit students across the school year',
        'Direct parent online portal and bookstore replenishment fulfillment available',
      ],
    },
    {
      title: 'Corporate Enterprises & Hospitality',
      icon: <Building2 className="w-5 h-5 text-sky-600" />,
      tag: '95+ Corporate Fleets',
      points: [
        'Executive 2-piece suiting with half-canvas structure and wrinkle-recovery yarns',
        'Liquid-repellent hospitality waistcoats, aprons, and front-desk reception uniforms',
        'Pantone-accurate corporate color dyeing with subtle tone-on-tone cuff embroidery',
      ],
    },
    {
      title: 'Healthcare & Hospital Networks',
      icon: <Stethoscope className="w-5 h-5 text-teal-600" />,
      tag: '65+ Hospital Chains',
      points: [
        'EPA-certified silver-ion antimicrobial 4-way stretch scrub tops & jogger pants',
        'Autoclavable AAMI Level 3 reusable surgical OT gowns with 100+ cycle warranty',
        'Department color coding: Doctors, Nurses, OT Technicians, Radiology, and Admin',
      ],
    },
  ];

  return (
    <section id="institutional-clients" className="py-12 sm:py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200/80 text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <Factory className="w-3.5 h-3.5 text-indigo-600" />
            <span>Industrial Scale &amp; Proven Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Trusted by Reputed Institutions Worldwide
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            From kindergarten to corporate boardrooms and intensive care units, Indrakamal Uniforms provides uninterrupted bulk production and turnkey apparel logistics.
          </p>
        </div>

        {/* 3 Sectors Cards - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sectorFeatures.map((sec, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-[2rem] bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-2xs group-hover:bg-indigo-50 transition-colors">
                    {sec.icon}
                  </div>
                  <span className="text-[11px] font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
                    {sec.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-indigo-950 transition-colors">
                  {sec.title}
                </h3>

                <ul className="space-y-2.5 pt-1">
                  {sec.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Block - Bento Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 sm:p-12 shadow-xs relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-slate-800 ml-2">5.0 Institutional Quality Rating</span>
              </div>

              {/* Selector Dots */}
              <div className="flex items-center gap-2">
                {CLIENT_TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTestimonialIdx(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeTestimonialIdx === idx ? 'bg-indigo-900 w-8' : 'bg-slate-200 hover:bg-slate-300 w-2.5'
                    }`}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="relative pl-6 sm:pl-8 border-l-4 border-indigo-700 space-y-4">
              <Quote className="w-8 h-8 text-indigo-700/20 absolute -left-4 -top-3" />
              <p className="text-base sm:text-lg text-slate-800 font-medium italic leading-relaxed">
                &ldquo;{CLIENT_TESTIMONIALS[activeTestimonialIdx].quote}&rdquo;
              </p>
              <div>
                <div className="text-sm font-bold text-slate-900 font-heading">
                  {CLIENT_TESTIMONIALS[activeTestimonialIdx].author}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {CLIENT_TESTIMONIALS[activeTestimonialIdx].role} • <strong className="text-indigo-900 font-semibold">{CLIENT_TESTIMONIALS[activeTestimonialIdx].institution}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
