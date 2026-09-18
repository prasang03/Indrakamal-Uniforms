import React from 'react';
import { IndrakamalLogo } from './IndrakamalLogo';
import { UniformCategory } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  ShieldCheck, 
  FileText, 
  Clock, 
  ArrowUpRight,
  ArrowUp,
  MessageCircle,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: UniformCategory) => void;
  onOpenQuoteModal: () => void;
  onOpenSwatchModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenQuoteModal,
  onOpenSwatchModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 pb-12 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Container */}
        <div className="bg-[#001845] text-slate-200 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-12 border border-indigo-900/80 shadow-2xl space-y-8 sm:space-y-12">
          
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Column 1: Brand & Entity (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <div className="inline-flex bg-white py-2.5 px-3.5 rounded-2xl shadow-sm border border-slate-100">
                  <IndrakamalLogo theme="light" size="md" />
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Wholesale supply and institutional distribution of uniforms, footwear, and linens for schools, hospitals, hotels, and corporate organizations across India.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-900 border border-slate-800 text-slate-300">
                  Direct Wholesale
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-900 border border-slate-800 text-slate-300">
                  GST Invoicing
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-900 border border-slate-800 text-slate-300">
                  Doorstep Delivery
                </span>
              </div>
            </div>

            {/* Column 2: Uniform & Textile Divisions (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="border-b border-slate-800/80 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  Supply Divisions
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('school')}
                    className="hover:text-indigo-300 transition-colors text-left flex items-center justify-between w-full"
                  >
                    <span>Student Uniforms, Ties, Belts &amp; Shoes</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">Core</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('staff')}
                    className="hover:text-indigo-300 transition-colors text-left flex items-center justify-between w-full"
                  >
                    <span>School Staff &amp; Faculty Sarees / Blazers</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">Core</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('healthcare')}
                    className="hover:text-indigo-300 transition-colors text-left flex items-center justify-between w-full"
                  >
                    <span>Healthcare Scrubs &amp; Hospital Bedsheets</span>
                    <span className="text-[10px] text-sky-400 font-bold bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-800/40">Active</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('hospitality')}
                    className="hover:text-indigo-300 transition-colors text-left flex items-center justify-between w-full"
                  >
                    <span>Hospitality Attire &amp; Hotel Bed Linen</span>
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">Active</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('corporate')}
                    className="hover:text-indigo-300 transition-colors text-left flex items-center justify-between w-full"
                  >
                    <span>Corporate Suits &amp; Office Formal Wear</span>
                    <span className="text-[10px] text-slate-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">Active</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('linen')}
                    className="hover:text-indigo-300 transition-colors text-left flex items-center justify-between w-full"
                  >
                    <span>Hostel Bedding, Blankets &amp; Curtains</span>
                    <span className="text-[10px] text-indigo-400 font-bold bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-800/40">Active</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Action Tools (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="border-b border-slate-800/80 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Quick Tools
                </h4>
              </div>
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-indigo-700/60 transition-colors group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-indigo-300 flex items-center justify-between">
                    <span>Price Estimator</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Get instant bulk quote in ₹</p>
                </button>

                <button
                  type="button"
                  onClick={onOpenSwatchModal}
                  className="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-700/60 transition-colors group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center justify-between">
                    <span>Free Sample Kit</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Free sample delivery by post</p>
                </button>

                <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span>Dispatch: 12 – 18 Days</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Pan-India institutional doorstep delivery</div>
                </div>
              </div>
            </div>

            {/* Column 4: Contact & Helpline (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="border-b border-slate-800/80 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Business Contact &amp; Helpline
                </h4>
              </div>

              <div className="space-y-3.5">
                {/* Phone & WhatsApp */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Business Contact (Phone &amp; WhatsApp)
                  </span>
                  <a
                    href="tel:+919302502587"
                    className="text-sm font-extrabold text-white hover:text-amber-400 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>+91 93025 02587</span>
                  </a>
                  <div className="pt-1 border-t border-slate-800 flex items-center gap-2">
                    <a
                      href="https://wa.me/919302502587?text=Hello%20Indrakamal%20Trade%20Solutions%2C%20we%20have%20an%20inquiry%20for%20institutional%20uniforms%20and%20textiles."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Email Inquiry
                  </span>
                  <a
                    href="mailto:indrakamaltradesolutions@gmail.com"
                    className="text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-2 truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">indrakamaltradesolutions@gmail.com</span>
                  </a>
                </div>

                {/* Supply Hub */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Central Supply Hub
                  </span>
                  <div className="text-xs text-slate-400 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Indrakamal Ventures Pvt Ltd., India</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Alignment */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="text-center md:text-left space-y-0.5">
              <p className="text-slate-300 font-medium">
                &copy; {currentYear} Indrakamal Ventures Pvt Ltd. All rights reserved.
              </p>
              <p className="text-[11px] text-slate-400">
                Institutional Uniform &amp; Linen Partner • Nationwide Delivery Across India
              </p>
            </div>

            <div className="flex items-center gap-5 flex-wrap justify-center md:justify-end">
              <span className="hover:text-white cursor-pointer transition-colors text-[11px]">Quality Compliance</span>
              <span className="text-slate-800">•</span>
              <span className="hover:text-white cursor-pointer transition-colors text-[11px]">Delivery Terms</span>
              <span className="text-slate-800">•</span>
              <span className="hover:text-white cursor-pointer transition-colors text-[11px]">Fabric &amp; Stitching Audits</span>
              <button
                type="button"
                onClick={scrollToTop}
                className="ml-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 hover:text-indigo-300 hover:bg-slate-850 transition-colors font-bold text-xs flex items-center gap-1.5"
                aria-label="Scroll back to top"
              >
                <span>Top</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

