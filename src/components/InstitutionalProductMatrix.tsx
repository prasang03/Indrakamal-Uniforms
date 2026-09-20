import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Users, 
  Stethoscope, 
  Briefcase, 
  UtensilsCrossed, 
  BedDouble, 
  FileText, 
  Sparkles,
  Search,
  Plus,
  Eye,
  Check,
  X
} from 'lucide-react';
import { UniformCategory, UniformItem } from '../types';
import { UNIFORM_CATALOG } from '../data/uniformCatalog';

interface InstitutionalProductMatrixProps {
  onSelectCategory?: (category: UniformCategory) => void;
  onOpenQuoteModal: () => void;
  onOpenSwatchModal: () => void;
  onAddToQuote?: (product: UniformItem, selectedColor: string) => void;
  onSelectProduct?: (product: UniformItem) => void;
  quoteUniformIds?: string[];
}

interface SectorTab {
  id: UniformCategory;
  label: string;
  icon: React.ReactNode;
}

export const InstitutionalProductMatrix: React.FC<InstitutionalProductMatrixProps> = ({
  onSelectCategory,
  onOpenQuoteModal,
  onOpenSwatchModal,
  onAddToQuote,
  onSelectProduct,
  quoteUniformIds = [],
}) => {
  const [activeTab, setActiveTab] = useState<UniformCategory>('school');
  const [searchQuery, setSearchQuery] = useState('');

  const sectors: SectorTab[] = [
    { id: 'school', label: 'School & Shoes', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'staff', label: 'Staff Attire', icon: <Users className="w-4 h-4" /> },
    { id: 'healthcare', label: 'Healthcare', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'hospitality', label: 'Hospitality', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'corporate', label: 'Corporate', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'linen', label: 'Hostel & Linen', icon: <BedDouble className="w-4 h-4" /> },
  ];

  const sectorProducts = useMemo(() => {
    return UNIFORM_CATALOG.filter((item) => item.category === activeTab);
  }, [activeTab]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return UNIFORM_CATALOG.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.fabricComposition.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.subcategory && item.subcategory.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;
  const displayedProducts = isSearching ? searchResults : sectorProducts;

  const handleTabClick = (tabId: UniformCategory) => {
    setActiveTab(tabId);
    setSearchQuery('');
    if (onSelectCategory) {
      onSelectCategory(tabId);
    }
  };

  return (
    <section id="institutional-sectors" className="py-8 sm:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Products &amp; Pricing
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select a category or search items to view fabric specs and add them to your wholesale quotation.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={onOpenSwatchModal}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Free Samples</span>
            </button>
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-full text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 transition-colors shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-300" />
              <span>Calculate Quote</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin -mx-1 px-1">
              {sectors.map((sec) => {
                const isActive = !isSearching && activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleTabClick(sec.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? 'bg-indigo-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span className={isActive ? 'text-indigo-300' : 'text-slate-500'}>
                      {sec.icon}
                    </span>
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products (e.g. shoes, scrubs, sheets)..."
                className="w-full pl-8 pr-7 py-2 sm:py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-600 focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

          </div>

          {isSearching && (
            <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span>Found {searchResults.length} {searchResults.length === 1 ? 'item' : 'items'} matching &ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="font-semibold text-indigo-700 hover:text-indigo-900 underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <p className="font-semibold text-slate-700">No products found for &ldquo;{searchQuery}&rdquo;</p>
            <p>We supply custom institutional attire upon request. Contact us or clear search.</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-2 px-3 py-1.5 bg-indigo-900 text-white rounded-full text-xs font-medium"
            >
              View All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedProducts.map((item) => {
              const isInQuote = quoteUniformIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="relative aspect-4/3 bg-white border-b border-slate-100 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (item.fallbackImageUrl && e.currentTarget.src !== item.fallbackImageUrl) {
                          e.currentTarget.src = item.fallbackImageUrl;
                        }
                      }}
                      className="w-full h-full object-contain p-1.5 object-center group-hover:scale-103 transition-transform duration-300"
                      loading="lazy"
                    />
                    {item.badge && (
                      <span className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {item.fabricComposition}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 text-[11px]">Wholesale Est:</span>
                        <span className="text-slate-900 font-bold">{item.priceRangeEstimate}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {onSelectProduct && (
                          <button
                            type="button"
                            onClick={() => onSelectProduct(item)}
                            className="py-1.5 px-2 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1 transition-colors"
                          >
                            <Eye className="w-3 h-3 text-slate-500" />
                            <span>Specs</span>
                          </button>
                        )}

                        {onAddToQuote && (
                          <button
                            type="button"
                            onClick={() => onAddToQuote(item, item.colorOptions[0]?.name || '')}
                            className={`py-1.5 px-2 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 transition-colors ${
                              isInQuote
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-indigo-900 hover:bg-indigo-800 text-white'
                            }`}
                          >
                            {isInQuote ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>In Quote</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Add Quote</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Minimal Procurement Info Footnote */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100">
          <span>Minimum Order Quantity (MOQ): Typically 30–50 units per pattern. Samples provided on request.</span>
          <a
            href="tel:+919302502587"
            className="text-indigo-900 font-semibold hover:underline"
          >
            Direct Inquiry: +91 93025 02587
          </a>
        </div>

      </div>
    </section>
  );
};
