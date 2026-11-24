import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ObjectiveSection from '../components/ObjectiveSection';
import MissionsSection from '../components/MissionsSection';
import VideoSection from '../components/VideoSection';
import Footer from '../components/Footer';
import { translations } from '../i18n/translations';

export default function HomePage({ lang, setLang }) {
  const t = translations[lang] || translations.fr;

  return (
    <div dir={t.dir} className={`min-h-screen bg-navy text-white ${t.font} selection:bg-energeticOrange selection:text-white`}>
      <Navbar lang={lang} setLang={setLang} t={t} />
      
      <main>
        <HeroSection t={t} />
        <ObjectiveSection t={t} />
        <MissionsSection t={t} />
        <VideoSection t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
}