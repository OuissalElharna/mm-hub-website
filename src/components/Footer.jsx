import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ t }) {
  return (
    <footer className="bg-[#AADCEA] border-t border-royal/20 pt-16 pb-8 text-navy px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-royal/10">
        
        <div className="space-y-4 md:col-span-1">
          <span className="font-montserrat font-black text-2xl text-navy tracking-wider">
            M&amp;M-HUB
          </span>
          <p className="text-xs text-navy leading-relaxed">{t.footer.desc}</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-montserrat font-bold text-sm text-navy">{t.footer.navTitle}</h4>
          <ul className="space-y-2 text-xs text-navy">
            <li><Link to="/" className="hover:text-[#E85200] transition-colors">{t.nav.home}</Link></li>
            <li><Link to="/about" className="hover:text-[#E85200] transition-colors">{t.nav.about}</Link></li>
            <li><a href="#missions" className="hover:text-[#E85200] transition-colors">{t.nav.missions}</a></li>
            <li><Link to="/events" className="hover:text-[#E85200] transition-colors">{t.nav.events}</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-montserrat font-bold text-sm text-navy">{t.footer.followTitle}</h4>
          <ul className="space-y-2 text-xs text-navy">
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#E85200] transition-colors">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#E85200] transition-colors">LinkedIn</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-montserrat font-bold text-sm text-navy">{t.footer.contactTitle}</h4>
          <p className="text-xs text-navy leading-relaxed">{t.footer.address}</p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 text-center text-xs text-navy/70">
        <p>{t.footer.copy}</p>
      </div>
    </footer>
  );
}