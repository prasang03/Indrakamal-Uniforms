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
  Globe2, 
  Printer, 
  HeartHandshake
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

  return (
    <footer className="bg-slate-100 pb-12 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Bento Grid Footer Card */}
        <div className="bg-slate-950 text-slate-300 rounded-[2.5rem] p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            
            {/* Cell 1: Brand & Certification (Col 1-5) */}
            <div className="lg:col-span-5 p-7 rounded-[2rem] bg-slate-900/90 border border-slate-800/80 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <IndrakamalLogo theme="dark" size="lg" />
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  Indrakamal Uniforms is an institutional contract manufacturer and bulk apparel exporter. Specializing in high-durability school attire, tailored corporate suiting, and certified antimicrobial medical uniforms for leading organizations worldwide.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-slate-800/80 border border-slate-700/60 text-indigo-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> ISO 9001:2015
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-slate-800/80 border border-slate-700/60 text-emerald-400">
                  <Award className="w-3.5 h-3.5 text-emerald-400" /> Oeko-Tex Standard 100
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-slate-800/80 border border-slate-700/60 text-cyan-400">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> SEDEX Audited
                </span>
              </div>
            </div>

            {/* Cell 2: Catalog Divisions (Col 6-8) */}
            <div className="lg:col-span-3 p-7 rounded-[2rem] bg-slate-900/50 border border-slate-800/60 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Catalog Divisions
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('school')}
                    className="hover:text-indigo-400 transition-colors text-left"
                  >
                    School Blazers &amp; Pleated Skirts
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('school')}
                    className="hover:text-indigo-400 transition-colors text-left"
                  >
                    House Sports Kits &amp; Sweaters
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('corporate')}
                    className="hover:text-indigo-400 transition-colors text-left"
                  >
                    Executive Bespoke Corporate Suits
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('corporate')}
                    className="hover:text-indigo-400 transition-colors text-left"
                  >
                    Non-Iron Twill Shirts &amp; Polos
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('healthcare')}
                    className="hover:text-indigo-400 transition-colors text-left"
                  >
                    Antimicrobial Scrub Sets
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('healthcare')}
                    className="hover:text-indigo-400 transition-colors text-left"
                  >
                    Autoclavable OT Gowns &amp; Lab Coats
                  </button>
                </li>
              </ul>
            </div>

            {/* Cell 3: Institutional Procurement (Col 9-12) */}
            <div className="lg:col-span-4 p-7 rounded-[2rem] bg-indigo-950/40 border border-indigo-900/50 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  Procurement Actions
                </h4>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={onOpenQuoteModal}
                    className="w-full text-left p-3 rounded-2xl bg-indigo-900/60 hover:bg-indigo-800/80 border border-indigo-700/60 transition-colors text-xs font-bold text-white flex items-center justify-between"
                  >
                    <span>Institutional RFQ Builder</span>
                    <span className="text-[10px] text-indigo-300 font-mono">Instant &rarr;</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenSwatchModal}
                    className="w-full text-left p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 transition-colors text-xs font-semibold text-slate-200 flex items-center justify-between"
                  >
                    <span>Request Physical Swatch Binder</span>
                    <span className="text-[10px] text-emerald-400 font-bold">Free Courier &rarr;</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-[11px]">Indrakamal Apparel Park, Phase II, Textile Hub, India.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                  <a href="tel:+919829012345" className="text-[11px] hover:text-white transition-colors">
                    +91 (0) 98290-12345
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <a href="mailto:procurement@indrakamaluniforms.com" className="text-[11px] hover:text-white transition-colors truncate">
                    procurement@indrakamaluniforms.com
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar inside the Bento card */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} Indrakamal Uniforms Private Limited. All rights reserved.
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <span className="hover:text-slate-400 cursor-pointer">Quality Compliance</span>
              <span className="hover:text-slate-400 cursor-pointer">Export Terms</span>
              <span className="hover:text-slate-400 cursor-pointer">Factory Audits</span>
              <button
                type="button"
                onClick={scrollToTop}
                className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors font-semibold flex items-center gap-1"
              >
                <span>Top</span>
                <span>&uarr;</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
