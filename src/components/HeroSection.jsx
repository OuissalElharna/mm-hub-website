import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection({ lang = 'fr' }) {
  const isAr = lang === 'ar';

  const content = {
    fr: {
      badge: 'M&M-HUB — Where Strategy Meets Creativity',
      titleLine1: 'Transformez vos',
      titleLine2: 'idées en projets',
      titleLine3: 'concrets.',
      description:
        "M&M-HUB est un club académique de l'École Supérieure de Technologie de Kelaa des Sraghna, spécialisé en management et marketing. Notre objectif est de rapprocher les connaissances théoriques de la pratique à travers des ateliers, des projets et des expériences enrichissantes.",
      primaryCta: 'Découvrir notre club',
      secondaryCta: 'Explorer nos activités',
      scrollHint: 'Faites défiler pour explorer',
    },
    ar: {
      badge: 'M&M-HUB — حيث تلتقي الاستراتيجية بالإبداع',
      titleLine1: 'حوّل أفكارك',
      titleLine2: 'إلى مشاريع',
      titleLine3: 'ملموسة.',
      description:
        'نادي أكاديمي بالمدرسة العليا للتكنولوجيا بقلعة السراغنة متخصص في التدبير والتسويق، يهدف إلى الربط بين الجانب النظري والتطبيقي عبر الورشات والمشاريع العملية.',
      primaryCta: 'اكتشف النادي',
      secondaryCta: 'استكشف أنشطتنا',
      scrollHint: 'مرر للأسفل للاستكشاف',
    },
  };

  const t = content[isAr ? 'ar' : 'fr'];

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-navy text-white font-inter text-center"
    >
      {/* Photo en arrière-plan */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />

      {/* Overlay dégradé pour une bonne lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/75 to-navy/95" />

      {/* Contenu centré */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-20 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl flex flex-col items-center space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-sky-200">
            <Sparkles size={14} className="text-energeticOrange shrink-0" />
            <span>{t.badge}</span>
          </div>

          {/* Titre principal */}
          <h1 className="font-montserrat font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.06] tracking-tight text-white">
            {t.titleLine1}
            <br />
            {t.titleLine2}
            <br />
            <span className="text-sky-300">{t.titleLine3}</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-200/90 leading-relaxed max-w-2xl mx-auto">
            {t.description}
          </p>

          {/* Boutons centrés */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-200 hover:bg-white text-navy font-bold text-sm transition-all shadow-lg"
            >
              <span>{t.primaryCta}</span>
              <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
            </a>

            <a
              href="#activities"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-navy/70 hover:bg-white/10 text-white border border-white/25 font-bold text-sm backdrop-blur-md transition-all"
            >
              <span>{t.secondaryCta}</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Indicateur de défilement en bas */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-xs text-slate-300/80">
        <span>{t.scrollHint}</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}