import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Edit3, Save, Globe, CheckCircle2, Layers } from 'lucide-react';

export default function AdminCms() {
  const [activeTab, setActiveTab] = useState('home');

  // CMS state for website sections
  const [homeContent, setHomeContent] = useState({
    title: 'M&M-HUB — Where Strategy Meets Creativity',
    subtitle: 'Un espace étudiant dédié au management, au marketing, à la créativité et à la mise en pratique des connaissances.',
    badge: 'EST El Kelaa des Sraghna'
  });

  const [aboutContent, setAboutContent] = useState({
    vision: 'Devenir le pôle d’excellence incontournable en management et marketing digital à l’ESTK.',
    mission: 'Former la nouvelle génération de leaders à travers des projets concrets et une vision collaborative.'
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-softCyan/20 text-navy font-bold text-xs rounded-full">
            <FileText size={14} />
            <span>CMS & Gestion du Contenu</span>
          </div>
          <h2 className="text-2xl font-black font-montserrat text-navy">Modification des Pages Publiques</h2>
          <p className="text-xs text-slate-500">Mettez à jour les textes et les informations affichées sur le site web en temps réel.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold border border-emerald-200 animate-bounce">
            <CheckCircle2 size={16} />
            <span>Modifications enregistrées !</span>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'home' ? 'bg-energeticOrange text-white shadow-lg' : 'bg-white text-navy border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Globe size={16} />
          <span>Page d’Accueil (Home)</span>
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'about' ? 'bg-energeticOrange text-white shadow-lg' : 'bg-white text-navy border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Layers size={16} />
          <span>À propos (About Us)</span>
        </button>
      </div>

      {/* Content Form */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        {activeTab === 'home' ? (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Edit3 size={18} className="text-royal" />
              <h3 className="font-montserrat font-bold text-navy text-base">Édition de la Page d’Accueil</h3>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Badge Supérieur</label>
              <input
                type="text"
                value={homeContent.badge}
                onChange={(e) => setHomeContent({ ...homeContent, badge: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Titre Principal (H1)</label>
              <input
                type="text"
                value={homeContent.title}
                onChange={(e) => setHomeContent({ ...homeContent, title: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Sous-titre / Description</label>
              <textarea
                rows="3"
                value={homeContent.subtitle}
                onChange={(e) => setHomeContent({ ...homeContent, subtitle: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-energeticOrange hover:bg-energeticOrange/90 text-white font-bold rounded-xl text-xs shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Save size={16} />
              <span>Publier les modifications</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Edit3 size={18} className="text-royal" />
              <h3 className="font-montserrat font-bold text-navy text-base">Édition de la Section "À propos"</h3>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Vision du Club</label>
              <textarea
                rows="3"
                value={aboutContent.vision}
                onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Mission du Club</label>
              <textarea
                rows="3"
                value={aboutContent.mission}
                onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-energeticOrange hover:bg-energeticOrange/90 text-white font-bold rounded-xl text-xs shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Save size={16} />
              <span>Publier les modifications</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}