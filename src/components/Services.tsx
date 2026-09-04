import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../App';
import { SERVICES } from '../data';
import { Service } from '../types';
import Icon from './Icon';

export default function Services() {
  const { addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  const categories = ["All", "Registration", "Compliance", "Licensing"];

  const filteredServices = SERVICES.filter(service => 
    selectedCategory === "All" ? true : service.category === selectedCategory
  );

  const handleAddCombo = () => {
    // Add PLC ($120), TIN ($45), Tax Clearance ($75), and Vendor Number ($85) as a bundle (total $325)
    const comboIds = ["private-limited-company", "tin-registration", "clearance-tax", "vendor-number"];
    SERVICES.forEach(service => {
      if (comboIds.includes(service.id)) {
        addToCart(service, 1);
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-mono text-[10px] tracking-widest text-accent font-bold uppercase block">
          Service Catalog
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4.5xl text-primary dark:text-white tracking-tight">
          Configure Your Business Filings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
          Choose from our transparent, flat-rate statutory compliance services. Add multiple packages to establish full readiness for tenders and commercial operations in Zimbabwe.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border cursor-pointer shadow-xs ${
              selectedCategory === category
                ? "bg-primary dark:bg-accent text-white dark:text-[#070d18] border-primary dark:border-accent font-bold"
                : "bg-white dark:bg-[#0a1526] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-[#1d2d47] hover:border-accent/60 hover:text-accent"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={service.id}
              className="bg-white dark:bg-textured-card rounded-xl border border-gray-100 dark:border-[#1d2e4a] hover:border-accent/50 dark:hover:border-accent/70 hover:shadow-xl hover:shadow-accent/5 transition-all p-6 flex flex-col justify-between group text-left"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-11 h-11 rounded-lg bg-primary/5 dark:bg-accent/15 group-hover:bg-accent/20 flex items-center justify-center text-primary dark:text-gold-bright group-hover:text-accent transition-colors">
                    <Icon name={service.icon} size={20} />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider font-semibold uppercase bg-gray-50 dark:bg-[#070e1b] border border-gray-100 dark:border-[#1a283e] text-gray-500 dark:text-gray-400 px-2.5 py-0.5 rounded-full">
                    {service.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-primary dark:text-white group-hover:text-accent dark:group-hover:text-gold-bright transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed font-light line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* View requirements quicklink */}
                <button
                  onClick={() => setActiveModalService(service)}
                  className="text-[11px] font-semibold text-accent hover:text-accent-dark dark:text-gold-bright dark:hover:text-accent-light flex items-center gap-1 cursor-pointer pt-1"
                >
                  <Icon name="FileText" size={12} />
                  <span>View Required Documents</span>
                </button>
              </div>

              <div className="pt-5 mt-5 border-t border-gray-100 dark:border-[#18273e] flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-gray-400">Total Filing Fee</span>
                  <span className="text-base font-black text-primary dark:text-gold-bright">${service.price}</span>
                  <span className="block text-[9px] text-gray-400 italic">State fees included</span>
                </div>
                <button
                  onClick={() => addToCart(service, 1)}
                  className="bg-primary dark:bg-[#0e1b30] hover:bg-[#142a4d] dark:hover:bg-accent dark:hover:text-[#070d18] text-white dark:text-gray-200 border border-transparent dark:border-accent/35 py-2 px-4 rounded-md text-xs font-semibold tracking-wider uppercase transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Icon name="Plus" size={12} className="text-accent" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Featured Combo Package Section - Textured Dark Executive Navy with Metallic Gold Sheen */}
      <div className="bg-textured-navy rounded-2xl p-6 sm:p-8 border border-accent/35 text-white max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mt-12 text-left relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(229,184,59,0.12),transparent_50%)]" />
        <div className="relative z-10 space-y-2.5 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 gold-badge rounded-full text-[9px] font-bold uppercase tracking-wider">
            <Icon name="Sparkles" size={10} className="text-gold-bright animate-pulse" />
            <span>Recommended Combo Deal</span>
          </div>
          <h2 className="font-display font-bold text-lg sm:text-xl tracking-tight text-white leading-none">
            Full Incorporation & Setup Combo
          </h2>
          <p className="text-[11.5px] text-gray-200 leading-relaxed font-normal">
            Get your company fully operational for tenders. Includes: Private Limited Company (PLC), TIN Tax ID, Tax Clearance (ITF263), and official Vendor Number.
          </p>
        </div>
        <div className="relative z-10 shrink-0 text-center md:text-right space-y-2.5 w-full md:w-auto">
          <div>
            <span className="block text-[10px] text-gray-300">Total Package Price</span>
            <span className="text-3xl font-black text-gold-metallic">$325</span>
            <span className="block text-[9px] text-gray-300 italic">Save time & money</span>
          </div>
          <button
            onClick={handleAddCombo}
            className="w-full gold-gloss-btn py-2.5 px-5 rounded-lg text-xs tracking-wider uppercase cursor-pointer"
          >
            Add Full Combo ($325)
          </button>
        </div>
      </div>

      {/* Detailed Requirements Modal */}
      <AnimatePresence>
        {activeModalService && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalService(null)}
              className="fixed inset-0 bg-primary/60 backdrop-blur-xs transition-opacity"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white dark:bg-[#0a1526] rounded-2xl max-w-md w-full shadow-2xl p-6 text-left border border-gray-100 dark:border-[#1d2f4d] z-50 transition-colors"
            >
              <div className="flex justify-between items-start border-b border-gray-100 dark:border-[#18273f] pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-primary/5 dark:bg-accent/15 flex items-center justify-center text-primary dark:text-gold-bright">
                    <Icon name={activeModalService.icon} size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary dark:text-white font-display leading-tight">
                      Filing Requirements
                    </h3>
                    <p className="text-[10px] text-gray-400 leading-none mt-0.5">
                      {activeModalService.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModalService(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#12223b] transition-colors cursor-pointer"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed font-light">
                  To initiate processing with the government registry, you will need to supply the following documents and details to our team on WhatsApp:
                </p>

                <div className="bg-gray-50/80 dark:bg-[#060c18] border border-gray-100 dark:border-[#192842] rounded-lg p-3.5 space-y-2.5">
                  {activeModalService.requirements.map((req, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon name="Check" size={10} />
                      </div>
                      <span className="text-[11.5px] text-gray-700 dark:text-gray-200 leading-normal font-light">
                        {req}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 text-xs pt-1">
                  <button
                    onClick={() => {
                      addToCart(activeModalService, 1);
                      setActiveModalService(null);
                    }}
                    className="flex-1 gold-gloss-btn py-2.5 rounded-lg uppercase tracking-wider text-[11px] cursor-pointer"
                  >
                    Add Service to Cart
                  </button>
                  <button
                    onClick={() => setActiveModalService(null)}
                    className="flex-1 bg-gray-100 dark:bg-[#14233a] hover:bg-gray-200 dark:hover:bg-[#1a2d4b] text-gray-700 dark:text-gray-200 font-bold py-2.5 rounded-lg uppercase tracking-wider text-[11px] cursor-pointer transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
