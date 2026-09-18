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
  ShieldCheck,
  PackageCheck,
  Scissors,
  Truck,
  ClipboardList
} from 'lucide-react';

export const InstitutionalShowcase: React.FC = () => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const sectorFeatures = [
    {
      title: 'Schools, Vidyalayas & Colleges',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      tag: '450+ Schools (Our Active Core)',
      points: [
        'Complete sets: Shirts, pants, pinafores, salwar suits, sports house T-shirts, and winter sweaters',
        'Comfortable expandable waistbands and extra seam margin so uniforms fit growing children all year',
        'Strong stitching and color-fast cloth that does not fade after repeated home or dhobi washes',
      ],
    },
    {
      title: 'Offices & Corporate Staff',
      icon: <Building2 className="w-5 h-5 text-sky-600" />,
      tag: 'Expansion Sector (Inquiries Open)',
      points: [
        'Formal shirts, executive trousers, and jackets tailored for front-desk, hospitality, and office teams',
        'Breathable poly-cotton blends that stay crisp and wrinkle-free throughout the working day',
        'Computerized embroidery of your company logo on pocket or collar',
      ],
    },
    {
      title: 'Hospitals & Medical Staff',
      icon: <Stethoscope className="w-5 h-5 text-teal-600" />,
      tag: 'Expansion Sector (Inquiries Open)',
      points: [
        'Comfortable doctor aprons, nurse tunics, patient gowns, and scrub sets',
        'Easy to sterilize, boil-washable fabric that resists medical stains and liquids',
        'Available in standard hospital shades: Medical Blue, OT Green, White, and Navy',
      ],
    },
  ];

  return (
    <section id="institutional-clients" className="py-12 sm:py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200/80 text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Reliable Uniform Supply Across India</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Trusted by Schools &amp; Educational Institutions
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            We manage uniform supply for over 450+ state board, CBSE, and private schools across India. We take complete school orders, oversee specialized production with dedicated manufacturing lines, and deliver quality uniforms directly to schools.
          </p>
        </div>

        {/* Sectors Layout: School Uniforms on Top, Upcoming Expansion below */}
        <div className="space-y-6 mb-12">
          {/* Active Core Specialty: School Uniforms (Prominent Top Card) */}
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white border-2 border-indigo-600/40 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-900 text-white flex items-center justify-center shadow-xs">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-indigo-950 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      Our Active Core Business • 450+ Schools Supplied
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  Schools, Vidyalayas &amp; Educational Institutions
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                  We specialize in end-to-end uniform supply for state boards, CBSE, ICSE, and trust-run schools across India. Complete kits tailored to school colors and specifications with durable fabric and high-stress stitching.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Complete kits: Shirts, trousers, pinafores, salwar suits &amp; PT tees</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Growth margin seams &amp; expandable elastic for growing children</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Colorfast dyes tested against hard borewell water washing</span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50/80 p-5 rounded-3xl border border-indigo-200 text-center shrink-0 lg:w-64 space-y-2">
                <span className="text-3xl font-black text-indigo-950 font-sans block">450+</span>
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">Schools Active</span>
                <p className="text-[11px] text-slate-600 mt-1">
                  Prompt dispatch via regional transport parcels across all districts
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Expansion Sectors (Placed below School Uniforms) */}
          <div>
            <div className="flex items-center gap-2 mb-4 px-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Additional Institutional Sectors (Inquiries &amp; Trial Orders Open)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Offices & Corporate Staff */}
              <div className="p-6 sm:p-7 rounded-[2rem] bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center shadow-2xs">
                      <Building2 className="w-6 h-6 text-sky-700" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full uppercase">
                      Upcoming Expansion
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                    Offices &amp; Corporate Staff
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Formal executive shirts, trousers, security uniforms, and hospitality blazers.
                  </p>

                  <ul className="space-y-2 pt-1">
                    <li className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Breathable poly-cotton blends that stay crisp and wrinkle-free</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Computerized embroidery of corporate logos</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hospitals & Medical Staff */}
              <div className="p-6 sm:p-7 rounded-[2rem] bg-white border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center shadow-2xs">
                      <Stethoscope className="w-6 h-6 text-teal-700" />
                    </div>
                    <span className="text-[10px] font-bold text-teal-900 bg-teal-100 px-3 py-1 rounded-full uppercase">
                      Upcoming Expansion
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                    Hospitals &amp; Medical Staff
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Doctor aprons, hospital nurse tunics, and comfortable OT scrub suits.
                  </p>

                  <ul className="space-y-2 pt-1">
                    <li className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Boil-washable, stain-resistant cloth made for medical sanitation</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Standard hospital colors: Medical Blue, OT Green, White, and Navy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
