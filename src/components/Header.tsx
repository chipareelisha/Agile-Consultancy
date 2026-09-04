import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../App';
import { CONTACT_DETAILS } from '../data';
import Icon from './Icon';

export default function Header() {
  const { activePage, setActivePage, cart, setIsCartOpen, theme, toggleTheme } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "products", label: "Services & Products" },
    { id: "testimonials", label: "Testimonials" },
    { id: "about", label: "About & Contact" }
  ];

  const navigateTo = (pageId: string) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#070e1b]/95 backdrop-blur-md shadow-xs border-b border-gray-100 dark:border-[#192842] transition-colors duration-300">
      {/* Top Banner with Direct Contacts - Textured Luxury Navy/Black */}
      <div className="bg-textured-navy border-b border-accent/25 text-gray-200 text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5">
              <Icon name="Phone" className="text-accent" size={12} />
              <span className="font-light text-gray-300">WhatsApp:</span>
              <a
                href={`https://wa.me/${CONTACT_DETAILS.phone1Raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-light font-medium transition-colors text-white"
              >
                {CONTACT_DETAILS.phone1}
              </a>
              <span className="text-accent/40">|</span>
              <a
                href={`https://wa.me/${CONTACT_DETAILS.phone2Raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-light font-medium transition-colors text-white"
              >
                {CONTACT_DETAILS.phone2}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-3 tracking-wider text-[10px] sm:text-[11px] font-semibold uppercase text-accent-light/90">
            <span>Professional</span>
            <span className="text-accent">•</span>
            <span>Accurate</span>
            <span className="text-accent">•</span>
            <span>Dedicated</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
        {/* Logo and Brand */}
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-3 text-left focus:outline-hidden group cursor-pointer"
          id="nav-logo"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#0a1931] flex items-center justify-center shadow-md shadow-accent/10 overflow-hidden border border-accent/40 group-hover:border-accent transition-all">
            <div className="absolute inset-0 bg-radial from-accent/20 to-transparent" />
            <span className="font-display font-black text-lg sm:text-xl text-gold-metallic tracking-wider z-10">
              A
            </span>
          </div>
          <div>
            <span className="block font-display font-bold text-base sm:text-lg text-primary dark:text-white tracking-tight leading-snug">
              Agile <span className="text-gold-metallic font-extrabold">Consultancy</span>
            </span>
            <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-accent-dark dark:text-accent-light/80 leading-none">
              Corporate Services
            </span>
          </div>
        </button>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`relative py-2 text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                activePage === item.id 
                  ? "text-accent font-bold" 
                  : "text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent"
              }`}
            >
              {item.label}
              {activePage === item.id && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 gold-gradient rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 dark:border-[#223554] bg-gray-50 dark:bg-[#0c182b] flex items-center justify-center text-gray-700 dark:text-accent hover:border-accent/60 hover:text-accent transition-all focus:outline-hidden cursor-pointer shadow-xs"
            aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? (
              <Icon name="Sun" size={18} className="text-accent animate-spin-slow" />
            ) : (
              <Icon name="Moon" size={18} className="text-[#0a1931]" />
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 dark:border-[#223554] bg-gray-50 dark:bg-[#0c182b] flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-accent hover:border-accent/60 transition-all focus:outline-hidden cursor-pointer shadow-xs"
            aria-label="Open cart"
            id="cart-trigger"
          >
            <Icon name="ShoppingBag" size={18} />
            {cartItemsCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 gold-gradient text-[#070d18] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#070e1b] shadow-sm"
              >
                {cartItemsCount}
              </motion.span>
            )}
          </button>

          {/* Prompt CTA Button with Metallic Gold Sheen */}
          <button
            onClick={() => navigateTo("products")}
            className="hidden lg:flex items-center gap-2 gold-gloss-btn text-xs py-2.5 px-4 rounded-md tracking-wider uppercase cursor-pointer"
          >
            <Icon name="Sparkles" size={13} className="text-[#070d18]" />
            <span>Get Registered</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-gray-200 dark:border-[#223554] bg-gray-50 dark:bg-[#0c182b] flex items-center justify-center text-primary dark:text-white focus:outline-hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="md:hidden border-t border-gray-100 dark:border-[#1a2b45] bg-white dark:bg-[#081224] shadow-xl overflow-hidden"
        >
          <div className="p-4 flex flex-col gap-3">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full text-left py-3 px-4 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                  activePage === item.id
                    ? "bg-accent/15 text-primary dark:text-accent font-bold border-l-4 border-accent pl-3"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f1d33]"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Theme Switcher Row */}
            <div className="pt-2 border-t border-gray-100 dark:border-[#1a2b45] flex items-center justify-between px-2 py-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Display Theme:
              </span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-[#2a3e60] text-xs font-semibold text-primary dark:text-accent bg-gray-50 dark:bg-[#0c182b] cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Icon name="Sun" size={14} className="text-accent" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Icon name="Moon" size={14} className="text-[#0a1931]" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo("products")}
                className="w-full flex items-center justify-center gap-2 gold-gloss-btn py-3 rounded-lg text-xs tracking-wider uppercase cursor-pointer"
              >
                <Icon name="Sparkles" size={14} className="text-[#070d18]" />
                <span>Configure & Buy Services</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
