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
  ShoppingBag
} from 'lucide-react';

interface HeaderProps {
  activeCategory: UniformCategory;
  onSelectCategory: (category: UniformCategory) => void;
  onOpenQuoteModal: () => void;
  onOpenSwatchModal: () => void;
  quoteItemCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenQuoteModal,
  onOpenSwatchModal,
  quoteItemCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; category: UniformCategory; icon: React.ReactNode }[] = [
    { label: 'All Attire', category: 'all', icon: <Layers className="w-4 h-4" /> },
    { label: 'School Uniforms', category: 'school', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Corporate Attire', category: 'corporate', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Healthcare & Medical', category: 'healthcare', icon: <Stethoscope className="w-4 h-4" /> },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Institutional Notification Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3 font-medium">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold tracking-wide">
              <Award className="w-3.5 h-3.5" />
              ISO 9001:2015 &amp; Oeko-Tex Certified
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">Direct Factory Bulk Uniform Supply (MOQ 30-50 pcs)</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-normal">
            <a 
              href="tel:+919829012345" 
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-indigo-400" />
              <span>+91 (0) 98290-12345</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="mailto:procurement@indrakamaluniforms.com" 
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-indigo-400" />
              <span>procurement@indrakamaluniforms.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            type="button" 
            onClick={() => scrollToSection('top')}
            className="flex items-center text-left focus:outline-hidden group"
          >
            <IndrakamalLogo size="md" />
          </button>

          {/* Desktop Navigation Links - Bento Pill Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeCategory === item.category;
              return (
                <button
                  key={item.category}
                  type="button"
                  id={`nav-cat-${item.category}`}
                  onClick={() => {
                    onSelectCategory(item.category);
                    scrollToSection('uniform-catalog');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                  }`}
                >
                  <span className={isActive ? 'text-indigo-300' : 'text-slate-400'}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs - Bento Pill Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              id="header-btn-swatch-kit"
              onClick={onOpenSwatchModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-full shadow-xs hover:border-slate-400 transition-all active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Swatch Binder</span>
            </button>

            <button
              type="button"
              id="header-btn-quote-calculator"
              onClick={onOpenQuoteModal}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded-full shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-300" />
              <span>Institutional Quote</span>
              {quoteItemCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-extrabold bg-amber-400 text-amber-950 rounded-full ml-1">
                  {quoteItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              id="mobile-quote-trigger"
              onClick={onOpenQuoteModal}
              className="relative p-2.5 text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200"
              aria-label="View Quote"
            >
              <ShoppingBag className="w-5 h-5 text-indigo-900" />
              {quoteItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-amber-400 text-amber-950 rounded-full">
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
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl rounded-b-3xl">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
            Catalog Divisions
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.category}
                type="button"
                onClick={() => {
                  onSelectCategory(item.category);
                  scrollToSection('uniform-catalog');
                }}
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
              Request Free Fabric Swatch Binder
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
              Calculate Institutional Bulk Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
