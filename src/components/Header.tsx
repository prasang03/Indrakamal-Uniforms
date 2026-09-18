import React, { useState } from 'react';
import { IndrakamalLogo } from './IndrakamalLogo';
import { UniformCategory } from '../types';
import { 
  Phone, 
  Mail, 
  FileText, 
  Layers, 
  Menu, 
  X, 
  GraduationCap, 
  Briefcase, 
  Stethoscope, 
  Award,
  Sparkles,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  BedDouble
} from 'lucide-react';

interface HeaderProps {
  activeCategory: UniformCategory;
  onSelectCategory: (category: UniformCategory) => void;
  onOpenQuoteModal: () => void;
  onOpenSwatchModal: () => void;
  quoteItemCount: number;
  showCatalog?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenQuoteModal,
  onOpenSwatchModal,
  quoteItemCount,
  showCatalog = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; shortLabel: string; category: UniformCategory; icon: React.ReactNode }[] = [
    { label: 'School Students & Shoes', shortLabel: 'School & Shoes', category: 'school', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { label: 'Staff Uniforms', shortLabel: 'Staff Attire', category: 'staff', icon: <Users className="w-3.5 h-3.5" /> },
    { label: 'Healthcare & Bed Linen', shortLabel: 'Healthcare', category: 'healthcare', icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { label: 'Hospitality & Linen', shortLabel: 'Hospitality', category: 'hospitality', icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
    { label: 'Corporate Suiting', shortLabel: 'Corporate', category: 'corporate', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { label: 'Hostel Bedding & Linen', shortLabel: 'Hostel Bedding', category: 'linen', icon: <BedDouble className="w-3.5 h-3.5" /> },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (category: UniformCategory) => {
    onSelectCategory(category);
    setMobileMenuOpen(false);
    const sectorsElem = document.getElementById('institutional-sectors');
    if (sectorsElem) {
      sectorsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-[#001845] text-slate-200 text-xs py-1.5 sm:py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-left">
          <div className="flex items-center gap-2 font-medium truncate">
            <span className="text-slate-300">
              Institutional Uniforms &amp; Textiles &bull; Direct Wholesale Manufacturing
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-normal shrink-0">
            <a 
              href="tel:+919302502587" 
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Phone: </span>
              <span className="font-semibold">+91 93025 02587</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a 
              href="mailto:sales@indrakamaluniforms.com" 
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-indigo-400 shrink-0" />
              <span>sales@indrakamaluniforms.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 h-18 sm:h-20">
          {/* Logo - guaranteed shrink-0 so it never gets compressed or overlapped */}
          <button 
            type="button" 
            onClick={() => scrollToSection('top')}
            className="flex items-center text-left focus:outline-hidden group shrink-0"
          >
            <IndrakamalLogo size="md" />
          </button>

          {/* Desktop Nav Links - Supply Sectors */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.category}
                type="button"
                onClick={() => handleCategoryClick(item.category)}
                className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === item.category
                    ? 'bg-indigo-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-indigo-900 hover:bg-slate-100'
                }`}
              >
                <span className={activeCategory === item.category ? 'text-indigo-300' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span className="hidden xl:inline">{item.label}</span>
                <span className="inline xl:hidden">{item.shortLabel}</span>
              </button>
            ))}
          </nav>

          {/* Action CTAs - Bento Pill Buttons */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              id="header-btn-swatch-kit"
              onClick={onOpenSwatchModal}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-full shadow-xs hover:border-slate-400 transition-all active:scale-98 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Free Samples</span>
            </button>

            <button
              type="button"
              id="header-btn-quote-calculator"
              onClick={onOpenQuoteModal}
              className="relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded-full shadow-md hover:shadow-lg transition-all active:scale-98 whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-300" />
              <span>Calculate Price (₹)</span>
              {quoteItemCount > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-extrabold bg-amber-400 text-amber-950 rounded-full ml-0.5">
                  {quoteItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile/Tablet menu toggle buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              id="mobile-quote-trigger"
              onClick={onOpenQuoteModal}
              className="sm:hidden relative p-2 text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200"
              aria-label="View Quote"
            >
              <ShoppingBag className="w-4 h-4 text-indigo-900" />
              {quoteItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold bg-amber-400 text-amber-950 rounded-full">
                  {quoteItemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 rounded-xl hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl rounded-b-3xl">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
              Institutional Supply Divisions
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.category}
                  type="button"
                  onClick={() => handleCategoryClick(item.category)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold text-left transition-colors ${
                    activeCategory === item.category
                      ? 'bg-indigo-900 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className={activeCategory === item.category ? 'text-indigo-300' : 'text-indigo-700'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('quality-standards');
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl font-medium"
            >
              Textile Standards &amp; Certifications
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('institutional-clients');
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl font-medium"
            >
              Institutional Case Studies
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSwatchModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 text-xs font-bold text-slate-800 bg-slate-100 rounded-full border border-slate-300"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Request Free Cloth Sample Kit
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 text-xs font-bold text-white bg-indigo-900 rounded-full shadow-md"
            >
              <FileText className="w-4 h-4 text-indigo-300" />
              Calculate Uniform Price in Rupees (₹)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
