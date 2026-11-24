import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';

const isAdminEnabled = import.meta.env.VITE_ENABLE_ADMIN === 'true';

export default function Navbar({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#AADCEA]/90 backdrop-blur-md border-b border-royal/20 py-3 shadow-xl'
          : 'bg-[#AADCEA] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo avec Image + Texte */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/images/logo.png" 
            alt="M&M-HUB Logo" 
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="font-montserrat font-black text-2xl tracking-wider text-white group-hover:text-softCyan transition-colors">
            M&amp;M-HUB
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse font-medium text-sm text-navy">
          <Link to="/" className="hover:text-softCyan transition-colors">{t.nav.home}</Link>
          <Link to="/about" className="hover:text-softCyan transition-colors">{t.nav.about}</Link>
          <Link to="/events" className="hover:text-softCyan transition-colors">{t.nav.events}</Link>
          <Link to="/community" className="hover:text-softCyan transition-colors">{t.nav.contact}</Link>
        </nav>

        {/* Language & Action */}
        <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-navy/40 text-navy text-xs font-bold hover:bg-navy/10 transition-all"
          >
            <Globe size={14} />
            {lang === 'fr' ? 'العربية' : 'Français'}
          </button>

          {isAdminEnabled && (
            <Link
              to="/admin"
              className="bg-[#E85200] hover:bg-[#E85200]/85 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-[#E85200]/30"
            >
              {t.nav.admin}
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-navy/95 backdrop-blur-lg border-b border-royal/20 px-6 py-6 space-y-4"
        >
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-white font-medium">{t.nav.home}</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-steelSlate">{t.nav.about}</Link>
          <a href="#missions" onClick={() => setMobileMenuOpen(false)} className="block text-steelSlate">{t.nav.missions}</a>
          <Link to="/events" onClick={() => setMobileMenuOpen(false)} className="block text-steelSlate">{t.nav.events}</Link>
          <Link to="/community" onClick={() => setMobileMenuOpen(false)} className="block text-steelSlate">{t.nav.contact}</Link>
          
          <div className="pt-4 border-t border-royal/20 flex justify-between items-center">
            <button
              onClick={() => { setLang(lang === 'fr' ? 'ar' : 'fr'); setMobileMenuOpen(false); }}
              className="text-softCyan text-xs font-bold flex items-center gap-2"
            >
              <Globe size={16} />
              {lang === 'fr' ? 'العربية' : 'Français'}
            </button>

            {isAdminEnabled && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#E85200] hover:bg-[#E85200]/85 text-white px-4 py-2 rounded-lg text-xs font-bold"
              >
                {t.nav.admin}
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}