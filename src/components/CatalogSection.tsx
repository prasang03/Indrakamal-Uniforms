import React, { useState, useMemo } from 'react';
import { UniformItem, UniformCategory, UniformGender } from '../types';
import { 
  Search, 
  Filter, 
  GraduationCap, 
  Briefcase, 
  Stethoscope, 
  SlidersHorizontal,
  FileSpreadsheet,
  Plus,
  Check,
  Eye,
  Sparkles,
  Info,
  Users,
  UtensilsCrossed,
  BedDouble,
  Layers
} from 'lucide-react';

interface CatalogSectionProps {
  catalog: UniformItem[];
  activeCategory: UniformCategory;
  onSelectCategory: (category: UniformCategory) => void;
  onSelectProduct: (product: UniformItem) => void;
  onAddToQuote: (product: UniformItem, selectedColor: string) => void;
  quoteUniformIds: string[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  catalog,
  activeCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToQuote,
  quoteUniformIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<UniformGender | 'All'>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [activeCardColor, setActiveCardColor] = useState<Record<string, string>>({});

  // Derive subcategories based on current active category
  const availableSubcategories = useMemo(() => {
    let items = catalog;
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }
    const set = new Set<string>();
    items.forEach((item) => set.add(item.subcategory));
    return Array.from(set);
  }, [catalog, activeCategory]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return catalog.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcategory !== 'all' && item.subcategory !== selectedSubcategory) {
        return false;
      }
      // Gender filter
      if (selectedGender !== 'All' && item.gender !== selectedGender && item.gender !== 'Unisex') {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesFabric = item.fabricComposition.toLowerCase().includes(query);
        const matchesSubcat = item.subcategory.toLowerCase().includes(query);
        const matchesSuitable = item.suitableFor.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesFabric && !matchesSubcat && !matchesSuitable) {
          return false;
        }
      }
      return true;
    });
  }, [catalog, activeCategory, selectedSubcategory, selectedGender, searchQuery]);

  const schoolItems = useMemo(() => {
    return filteredItems.filter((i) => i.category === 'school');
  }, [filteredItems]);

  const upcomingItems = useMemo(() => {
    return filteredItems.filter((i) => i.category !== 'school');
  }, [filteredItems]);

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'school':
        return {
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          icon: <GraduationCap className="w-3.5 h-3.5" />,
          accentText: 'text-indigo-900',
        };
      case 'staff':
        return {
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: <Users className="w-3.5 h-3.5" />,
          accentText: 'text-purple-900',
        };
      case 'corporate':
        return {
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
          icon: <Briefcase className="w-3.5 h-3.5" />,
          accentText: 'text-slate-900',
        };
      case 'healthcare':
        return {
          badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
          icon: <Stethoscope className="w-3.5 h-3.5" />,
          accentText: 'text-teal-950',
        };
      case 'hospitality':
        return {
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <UtensilsCrossed className="w-3.5 h-3.5" />,
          accentText: 'text-amber-950',
        };
      case 'linen':
        return {
          badgeBg: 'bg-sky-50 text-sky-800 border-sky-200',
          icon: <BedDouble className="w-3.5 h-3.5" />,
          accentText: 'text-sky-950',
        };
      default:
        return {
          badgeBg: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: <Layers className="w-3.5 h-3.5" />,
          accentText: 'text-slate-900',
        };
    }
  };

  const counts = useMemo(() => {
    return {
      all: catalog.length,
      school: catalog.filter((i) => i.category === 'school').length,
      staff: catalog.filter((i) => i.category === 'staff').length,
      corporate: catalog.filter((i) => i.category === 'corporate').length,
      healthcare: catalog.filter((i) => i.category === 'healthcare').length,
      hospitality: catalog.filter((i) => i.category === 'hospitality').length,
      linen: catalog.filter((i) => i.category === 'linen').length,
    };
  }, [catalog]);

  const renderProductCard = (item: UniformItem) => {
    const theme = getCategoryTheme(item.category);
    const selectedColor = activeCardColor[item.id] || item.colorOptions[0]?.name;
    const isInQuote = quoteUniformIds.includes(item.id);

    return (
      <div
        key={item.id}
        id={`product-card-${item.id}`}
        className="group bg-white rounded-[2rem] border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
      >
        {/* Card Image Stage */}
        <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
          />

          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

          {/* Top badging */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-xs bg-white/95 ${theme.badgeBg}`}>
              {theme.icon}
              <span className="capitalize">{item.category}</span>
            </span>

            {item.badge && (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/90 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                {item.badge}
              </span>
            )}
          </div>

          {/* Bottom image details: Subcategory & Gender */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span className="font-semibold drop-shadow-sm">{item.subcategory}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 text-[10px] font-semibold backdrop-blur-xs">
              Fit: {item.gender}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            {/* Name */}
            <h3 
              onClick={() => onSelectProduct(item)}
              className="text-base font-bold text-slate-900 group-hover:text-indigo-900 transition-colors cursor-pointer line-clamp-1 font-heading"
            >
              {item.name}
            </h3>

            {/* Brief description */}
            <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            {/* Fabric and GSM specifications block */}
            <div className="mt-3.5 grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px]">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Fabric Blend</span>
                <span className="font-bold text-slate-800 line-clamp-1">{item.fabricComposition}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Weight &amp; Weave</span>
                <span className="font-bold text-slate-800">{item.gsm} GSM • {item.weave.split(' ')[0]}</span>
              </div>
            </div>

            {/* Color Options Swatches */}
            <div className="mt-3.5">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="text-slate-500 font-medium">Fabric Shades:</span>
                <span className="text-slate-700 font-bold">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {item.colorOptions.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      title={c.name}
                      onClick={() => setActiveCardColor((prev) => ({ ...prev, [item.id]: c.name }))}
                      className={`w-5 h-5 rounded-full border transition-all ${
                        isSelected
                          ? 'ring-2 ring-indigo-600 scale-110 border-white'
                          : 'border-slate-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                  Wholesale Rate
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  {item.priceRangeEstimate}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                  Min. Order
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {item.moq} pcs
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id={`btn-view-${item.id}`}
                onClick={() => onSelectProduct(item)}
                className="flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors active:scale-98"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate">View Specs</span>
              </button>

              <button
                type="button"
                id={`btn-quote-${item.id}`}
                onClick={() => onAddToQuote(item, selectedColor)}
                className={`flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all active:scale-98 ${
                  isInQuote
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-900 hover:bg-indigo-800 text-white shadow-xs'
                }`}
              >
                {isInQuote ? (
                  <>
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                    <span className="truncate">Add to Quote</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="uniform-catalog" className="py-10 sm:py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Complete Institutional Uniform Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-heading">
              School, Corporate &amp; Healthcare Uniforms
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Supplying schools and institutions with durable stitching, fast colors, and comfortable cloth made for everyday Indian conditions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              Showing <strong className="text-indigo-950 font-bold">{filteredItems.length}</strong> items
            </span>
          </div>
        </div>

        {/* Top Controls: Primary Division Tabs - Bento Pill Style */}
        <div className="bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-[2rem] border border-slate-200 shadow-xs mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-1.5">
            <button
              type="button"
              id="cat-tab-school"
              onClick={() => {
                onSelectCategory('school');
                setSelectedSubcategory('all');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'school'
                  ? 'bg-indigo-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-indigo-50/70'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0" />
              <span className="truncate">School <span className="hidden xs:inline">Uniforms</span></span>
              <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] ${
                activeCategory === 'school' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {counts.school}
              </span>
            </button>

            <button
              type="button"
              id="cat-tab-all"
              onClick={() => {
                onSelectCategory('all');
                setSelectedSubcategory('all');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>All Attire</span>
              <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] ${
                activeCategory === 'all' ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {counts.all}
              </span>
            </button>

            <button
              type="button"
              id="cat-tab-corporate"
              onClick={() => {
                onSelectCategory('corporate');
                setSelectedSubcategory('all');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'corporate'
                  ? 'bg-indigo-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-blue-50/50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
              <span className="truncate">Corporate <span className="hidden xs:inline">Pilot</span></span>
              <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] ${
                activeCategory === 'corporate' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {counts.corporate}
              </span>
            </button>

            <button
              type="button"
              id="cat-tab-healthcare"
              onClick={() => {
                onSelectCategory('healthcare');
                setSelectedSubcategory('all');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'healthcare'
                  ? 'bg-teal-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-teal-50/50'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-300 shrink-0" />
              <span className="truncate">Healthcare <span className="hidden xs:inline">Pilot</span></span>
              <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] ${
                activeCategory === 'healthcare' ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {counts.healthcare}
              </span>
            </button>
          </div>
        </div>

        {/* Secondary Filter Bar: Search, Gender, and Subcategories */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-[2rem] border border-slate-200 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                id="catalog-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search styles (e.g., blazer, shirt, scrubs, pleat skirt)..."
                className="w-full pl-11 pr-4 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Gender / Fit Selector */}
            <div className="flex items-center gap-2 max-w-full overflow-x-auto pb-1 lg:pb-0 scrollbar-none shrink-0">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-indigo-600" />
                Fit:
              </span>
              <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 shrink-0">
                {(['All', 'Unisex', 'Men', 'Women', 'Junior'] as const).map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setSelectedGender(gender)}
                    className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all shrink-0 ${
                      selectedGender === gender
                        ? 'bg-white text-indigo-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Subcategory Pills */}
          {availableSubcategories.length > 0 && (
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 shrink-0 uppercase tracking-wider">
                Type:
              </span>
              <button
                type="button"
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3.5 py-1 rounded-full text-xs font-medium shrink-0 transition-colors ${
                  selectedSubcategory === 'all'
                    ? 'bg-indigo-100 text-indigo-950 font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Types
              </button>
              {availableSubcategories.map((subcat) => (
                <button
                  key={subcat}
                  type="button"
                  onClick={() => setSelectedSubcategory(subcat)}
                  className={`px-3.5 py-1 rounded-full text-xs font-medium shrink-0 transition-colors ${
                    selectedSubcategory === subcat
                      ? 'bg-indigo-100 text-indigo-950 font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {subcat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-xs">
            <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching uniform styles found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try adjusting your search criteria or resetting the category and fit filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedGender('All');
                setSelectedSubcategory('all');
                onSelectCategory('school');
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-900 rounded-full hover:bg-indigo-800 transition-colors"
            >
              Reset to School Uniforms
            </button>
          </div>
        ) : activeCategory === 'all' && searchQuery.trim() === '' && selectedSubcategory === 'all' && selectedGender === 'All' ? (
          <div className="space-y-12">
            {/* 1. School Uniforms (Active Core Specialty) - ON TOP */}
            {schoolItems.length > 0 && (
              <div id="school-uniforms-section">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-900 text-white flex items-center justify-center shadow-xs">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                          School Uniform Collections
                        </h3>
                        <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">
                          Active Core Specialty • 450+ Schools Supplied
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        High abrasion resistance, colorfast in hard water, reinforced double-needle seams for active children.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200 shrink-0">
                    {schoolItems.length} Core School Styles
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {schoolItems.map((item) => renderProductCard(item))}
                </div>
              </div>
            )}

            {/* 2. Upcoming Expansion Lines (Corporate & Healthcare) - BELOW SCHOOL UNIFORMS */}
            {upcomingItems.length > 0 && (
              <div id="upcoming-expansion-section" className="pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                          Upcoming Expansion Lines
                        </h3>
                        <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-950 border border-amber-300">
                          Pilot Inquiries &amp; Custom Bulk Orders Open
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Corporate office staff apparel, hotel uniforms, hospital scrubs &amp; doctor aprons. Taking institutional sample requests.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-950 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 shrink-0">
                    {upcomingItems.length} Pilot Styles
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingItems.map((item) => renderProductCard(item))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Section Banner if single category */}
            {activeCategory === 'school' && (
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-indigo-900 text-white flex items-center justify-center shadow-xs">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                      School Uniforms (Active Core Specialty)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Supplying 450+ schools across India with high durability student uniform sets.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  {filteredItems.length} Products
                </span>
              </div>
            )}

            {activeCategory === 'corporate' && (
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-sky-900 text-white flex items-center justify-center shadow-xs">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                        Corporate Attire
                      </h3>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                        Upcoming Expansion
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Executive shirts, trousers &amp; waistcoats. Taking bulk trial orders as we expand into office attire.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-sky-950 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  {filteredItems.length} Products
                </span>
              </div>
            )}

            {activeCategory === 'healthcare' && (
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-teal-900 text-white flex items-center justify-center shadow-xs">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                        Healthcare Uniforms
                      </h3>
                      <span className="text-[10px] font-bold text-teal-900 bg-teal-100 px-2.5 py-0.5 rounded-full uppercase">
                        Upcoming Expansion
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Hospital scrubs, nurse tunics &amp; doctor white aprons. Open for hospital pilot supply.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-teal-950 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  {filteredItems.length} Products
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => renderProductCard(item))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
