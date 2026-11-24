import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, ArrowRight, Sparkles, Rocket } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { initialEventsData } from '../data/eventsData';
import { translations } from '../i18n/translations';
import { supabase } from '../supabaseClient';

const LIKED_STORAGE_KEY = 'mmhub_liked_events_v1';

export default function EventsPage({ lang, setLang }) {
  const t = translations[lang] || translations.fr;
  const [data, setData] = useState(initialEventsData);

  useEffect(() => {
    let likedIds = [];
    try {
      likedIds = JSON.parse(localStorage.getItem(LIKED_STORAGE_KEY) || '[]');
    } catch {
      likedIds = [];
    }

    const basePast = initialEventsData.past.map((item) => ({
      ...item,
      likedByUser: likedIds.includes(String(item.id))
    }));

    setData((prev) => ({ ...prev, past: basePast }));

    const loadLikesFromDb = async () => {
      try {
        const { data: rows, error } = await supabase
          .from('event_likes')
          .select('event_id, likes_count');

        if (!error && rows && rows.length > 0) {
          const likesMap = {};
          rows.forEach((r) => {
            likesMap[String(r.event_id)] = Number(r.likes_count || 0);
          });

          setData((prev) => ({
            ...prev,
            past: prev.past.map((item) =>
              likesMap[String(item.id)] !== undefined
                ? { ...item, likes: likesMap[String(item.id)] }
                : item
            )
          }));
        }
      } catch (err) {
        console.error('Error fetching likes:', err);
      }
    };

    loadLikesFromDb();
  }, []);

  const handleLike = async (e, articleId) => {
    e.preventDefault();
    e.stopPropagation();

    const target = data.past.find((item) => item.id === articleId);
    if (!target) return;

    const isLiked = Boolean(target.likedByUser);
    const nextLikes = isLiked ? Math.max(0, (target.likes || 0) - 1) : (target.likes || 0) + 1;

    setData((prev) => ({
      ...prev,
      past: prev.past.map((item) =>
        item.id === articleId
          ? { ...item, likedByUser: !isLiked, likes: nextLikes }
          : item
      )
    }));

    try {
      const likedIds = JSON.parse(localStorage.getItem(LIKED_STORAGE_KEY) || '[]');
      const idStr = String(articleId);
      const nextLikedIds = isLiked
        ? likedIds.filter((x) => x !== idStr)
        : Array.from(new Set([...likedIds, idStr]));
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(nextLikedIds));
    } catch {
      // ignore storage errors
    }

    const { error } = await supabase
      .from('event_likes')
      .upsert({ event_id: String(articleId), likes_count: nextLikes }, { onConflict: 'event_id' });

    if (error) {
      console.error('Error saving like:', error);
    }
  };

  return (
    <div dir={t.dir} className={`min-h-screen bg-navy text-white ${t.font}`}>
      <Navbar lang={lang} setLang={setLang} t={t} />

      <main className="pt-20">

        {/* EN-TÊTE ÉDITORIAL */}
        <section className="py-16 px-6 text-center bg-navy border-b border-royal/20">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-softCyan/10 border border-softCyan/30 text-softCyan text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} className="text-energeticOrange" />
              <span>M&M-HUB / NOS ACTIVITÉS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-montserrat leading-tight text-white">
              {lang === 'fr'
                ? 'Des idées qui prennent vie. Des expériences qui nous font grandir.'
                : 'أفكار تتجسد على أرض الواقع. تجارب تصنع تميزنا.'}
            </h1>

            <p className="text-steelSlate text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {lang === 'fr'
                ? 'Découvrez les événements que nous préparons, revivez les moments qui nous ont réunis et explorez les projets qui façonnent l’avenir de M&M-HUB.'
                : 'استكشف الفعاليات القادمة، استرجع الأوقات المميزة التي جمعتنا، واكتشف المشاريع التي تشكل مستقبل النادي.'}
            </p>
          </div>
        </section>

        {/* SECTION 1 — Tendances & Actualités */}
        <section className="py-20 px-6 bg-slate-50 text-navy">
          <div className="max-w-7xl mx-auto space-y-12">

            <div className="text-center md:text-start max-w-2xl mx-auto md:mx-0 space-y-2">
              <span className="px-3 py-1 bg-royal/10 text-royal font-bold text-xs rounded-full uppercase tracking-wider">
                {lang === 'fr' ? 'Agenda & Inscriptions' : 'الأجندة والتسجيل'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-montserrat text-navy">
                {lang === 'fr' ? 'Tendances & Actualités' : 'المستجدات والأخبار'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-start">
              {data.upcoming.map((ev) => (
                <motion.div
                  key={ev.id}
                  whileHover={{ y: -6 }}
                  className="w-full bg-gradient-to-br from-navy via-slate-900 to-royal text-white rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between space-y-8"
                >
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-energeticOrange/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-softCyan/20 rounded-full blur-2xl"></div>

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 bg-energeticOrange text-white font-bold text-[10px] rounded-full uppercase tracking-widest shadow">
                      {ev.category[lang] || ev.category.fr}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-black font-montserrat text-white leading-tight">
                      {ev.title[lang] || ev.title.fr}
                    </h3>

                    <div className="space-y-3 pt-2 text-xs font-semibold text-steelSlate">
                      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                        <Calendar size={18} className="text-energeticOrange" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">{lang === 'fr' ? 'Date' : 'التاريخ'}</p>
                          <p className="text-white font-bold">{ev.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                        <Clock size={18} className="text-softCyan" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">{lang === 'fr' ? 'Heure' : 'التوقيت'}</p>
                          <p className="text-white font-bold">{ev.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                        <MapPin size={18} className="text-energeticOrange" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">{lang === 'fr' ? 'Lieu' : 'المكان'}</p>
                          <p className="text-white font-bold">{ev.location?.[lang] || ev.location?.fr || 'EST Kelaa des Sraghna'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 2 — Événements réalisés */}
        <section className="py-24 px-6 bg-navy text-white">
          <div className="max-w-7xl mx-auto space-y-16">

            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-4 py-1.5 rounded-full bg-softCyan/20 text-softCyan text-xs font-bold uppercase tracking-wider">
                M&M-HUB Magazine
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-montserrat text-white">
                {lang === 'fr' ? 'Événements réalisés' : 'الفعاليات المنجزة'}
              </h2>
              <p className="text-steelSlate text-xs sm:text-sm">
                {lang === 'fr' ? 'Nos moments, nos histoires et nos réalisations passées.' : 'لحظاتنا، قصصنا وإنجازاتنا السابقة.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.past.map((art) => (
                <motion.div
                  key={art.id}
                  whileHover={{ y: -8 }}
                  className="bg-white text-navy border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={art.image}
                        alt={art.title[lang] || art.title.fr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'; }}
                      />
                      <span className="absolute top-3 right-3 px-3 py-1 bg-navy/80 text-white font-bold text-[10px] rounded-full backdrop-blur-sm">
                        {art.category[lang] || art.category.fr}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <span className="text-[11px] font-bold text-royal">{art.date}</span>
                      <h3 className="text-lg font-bold font-montserrat text-navy group-hover:text-royal transition-colors leading-snug">
                        {art.title[lang] || art.title.fr}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {art.summary[lang] || art.summary.fr}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                    <button
                      type="button"
                      onClick={(e) => handleLike(e, art.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        art.likedByUser ? 'text-energeticOrange' : 'hover:text-energeticOrange'
                      }`}
                    >
                      <Heart size={16} className={art.likedByUser ? 'fill-energeticOrange' : ''} />
                      <span>{art.likes}</span>
                    </button>

                    <Link
                      to={`/events/${art.id}`}
                      className="flex items-center gap-1.5 text-royal hover:text-navy transition-colors"
                    >
                      <span>{lang === 'fr' ? 'Lire l’article' : 'قراءة المقال'}</span>
                      <ArrowRight size={14} className="rtl:rotate-180" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 3 — Nos projets futurs */}
        <section className="py-24 px-6 bg-sky-50 text-navy border-t border-sky-100">
          <div className="max-w-7xl mx-auto space-y-16">

            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal/10 text-royal text-xs font-bold uppercase tracking-wider">
                <Rocket size={14} className="text-energeticOrange" />
                <span>Horizon 2026 - 2027</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-montserrat text-navy">
                {lang === 'fr' ? 'Nos projets futurs & Goals' : 'مشاريعنا المستقبلية وأهدافنا'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
                {lang === 'fr'
                  ? 'Les grands axes stratégiques d’expansion et de développement du club.'
                  : 'المحاور الاستراتيجية الكبرى لتوسع وتطوير النادي.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projects.map((proj) => (
                <motion.div
                  key={proj.id}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-sky-100 rounded-3xl p-6 space-y-5 shadow-lg flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title[lang] || proj.title.fr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'; }}
                      />
                      <span className={`absolute top-3 left-3 px-3 py-1 font-bold text-[10px] rounded-full shadow ${proj.statusColor}`}>
                        {proj.status[lang] || proj.status.fr}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-montserrat text-navy group-hover:text-royal transition-colors">
                      {proj.title[lang] || proj.title.fr}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.desc[lang] || proj.desc.fr}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

      </main>

      <Footer t={t} />
    </div>
  );
}