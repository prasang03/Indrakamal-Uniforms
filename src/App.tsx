/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UNIFORM_CATALOG } from './data/uniformCatalog';
import { UniformCategory, UniformItem, BulkQuoteItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { FabricQualitySection } from './components/FabricQualitySection';
import { InstitutionalShowcase } from './components/InstitutionalShowcase';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BulkQuoteCalculator } from './components/BulkQuoteCalculator';
import { SwatchKitModal } from './components/SwatchKitModal';
import { Footer } from './components/Footer';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<UniformCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<UniformItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSwatchModalOpen, setIsSwatchModalOpen] = useState(false);

  // Initial demo items in RFQ basket to let procurement officers immediately explore the calculator
  const [quoteItems, setQuoteItems] = useState<BulkQuoteItem[]>([
    {
      uniformId: 'sch-01',
      uniformName: 'Heritage Crested Institutional School Blazer',
      category: 'School',
      quantity: 150,
      selectedColor: 'Royal Navy Blue',
      selectedFabricGrade: '70/30 Poly-Wool Serge',
      includeEmbroidery: true,
    },
    {
      uniformId: 'med-01',
      uniformName: 'MedFlex Pro 4-Way Stretch Antimicrobial Scrub Set',
      category: 'Healthcare',
      quantity: 200,
      selectedColor: 'Deep Surgical Teal',
      selectedFabricGrade: 'Silver-Ion Micro-Ripstop',
      includeEmbroidery: true,
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToQuote = (product: UniformItem, selectedColor: string) => {
    const existingIndex = quoteItems.findIndex((i) => i.uniformId === product.id);
    if (existingIndex >= 0) {
      // Increase quantity
      setQuoteItems((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 50 } : item
        )
      );
      showToast(`Updated ${product.name} quantity in RFQ basket (+50 units)`);
    } else {
      // Add new
      const newItem: BulkQuoteItem = {
        uniformId: product.id,
        uniformName: product.name,
        category: product.category,
        quantity: product.moq,
        selectedColor: selectedColor || product.colorOptions[0]?.name || 'Standard',
        selectedFabricGrade: product.fabricComposition,
        includeEmbroidery: true,
      };
      setQuoteItems((prev) => [...prev, newItem]);
      showToast(`Added ${product.name} to RFQ basket`);
    }
  };

  const handleUpdateQuantity = (uniformId: string, delta: number) => {
    setQuoteItems((prev) =>
      prev.map((item) => {
        if (item.uniformId === uniformId) {
          const newQty = Math.max(10, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleSetQuantity = (uniformId: string, quantity: number) => {
    setQuoteItems((prev) =>
      prev.map((item) => (item.uniformId === uniformId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (uniformId: string) => {
    setQuoteItems((prev) => prev.filter((i) => i.uniformId !== uniformId));
  };

  const handleAddItemById = (uniformId: string) => {
    const found = UNIFORM_CATALOG.find((i) => i.id === uniformId);
    if (found) {
      handleAddToQuote(found, found.colorOptions[0]?.name || '');
    }
  };

  const quoteUniformIds = quoteItems.map((i) => i.uniformId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans selection:bg-indigo-200 selection:text-indigo-900">
      
      {/* Primary Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenSwatchModal={() => setIsSwatchModalOpen(true)}
        quoteItemCount={quoteItems.length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectCategory={setActiveCategory}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onOpenSwatchModal={() => setIsSwatchModalOpen(true)}
        />

        {/* Main Attire Catalog Section */}
        <CatalogSection
          catalog={UNIFORM_CATALOG}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onSelectProduct={setSelectedProduct}
          onAddToQuote={handleAddToQuote}
          quoteUniformIds={quoteUniformIds}
        />

        {/* Manufacturing & Fabric Lab Standards */}
        <FabricQualitySection
          onOpenSwatchModal={() => setIsSwatchModalOpen(true)}
        />

        {/* Institutional Client Testimonials & Track Record */}
        <InstitutionalShowcase />
      </main>

      {/* Institutional Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const elem = document.getElementById('uniform-catalog');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenSwatchModal={() => setIsSwatchModalOpen(true)}
      />

      {/* Product Detail & Sizing Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={handleAddToQuote}
        isInQuote={selectedProduct ? quoteUniformIds.includes(selectedProduct.id) : false}
      />

      {/* Institutional Bulk Quote Calculator Modal */}
      {isQuoteModalOpen && (
        <BulkQuoteCalculator
          quoteItems={quoteItems}
          allProducts={UNIFORM_CATALOG}
          onUpdateQuantity={handleUpdateQuantity}
          onSetQuantity={handleSetQuantity}
          onRemoveItem={handleRemoveItem}
          onAddItem={handleAddItemById}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      )}

      {/* Complimentary Fabric Swatch Binder Modal */}
      <SwatchKitModal
        isOpen={isSwatchModalOpen}
        onClose={() => setIsSwatchModalOpen(false)}
      />

      {/* Floating Bottom Quick RFQ Bar (visible on mobile / tablet when items are present) */}
      {quoteItems.length > 0 && !isQuoteModalOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 animate-in slide-in-from-bottom-4 duration-300">
          <button
            type="button"
            onClick={() => setIsQuoteModalOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-full shadow-2xl border border-indigo-800/80 hover:scale-102 transition-all active:scale-98 group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-indigo-300" />
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 bg-amber-400 text-slate-950 text-[10px] font-extrabold rounded-full">
                {quoteItems.length}
              </span>
            </div>
            <div className="text-left pr-1">
              <div className="text-xs font-bold leading-tight">View Bulk RFQ</div>
              <div className="text-[10px] text-indigo-200">
                {quoteItems.reduce((acc, c) => acc + c.quantity, 0)} Units in Basket
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-300 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-top-4 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
