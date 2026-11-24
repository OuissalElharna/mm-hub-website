import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Globe, Target, Award, Sparkles, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { teamMembers, clubValues } from '../data/teamData';
import { translations } from '../i18n/translations';

export default function AboutUsPage({ lang, setLang }) {
  const t = translations[lang] || translations.fr;
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div dir={t.dir} className={`min-h-screen bg-navy text-white ${t.font}`}>
      <Navbar lang={lang} setLang={setLang} t={t} />

      <main className="pt-24">

       {/* SECTION 1 — NOTRE HISTOIRE (Fond Bleu Ciel #C1EBF3) */}
<section className="py-24 px-6 bg-[#C1EBF3] text-[#050B3A] relative overflow-hidden">
  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#050B3A_1px,transparent_1px)] [background-size:16px_16px]" />

  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
    
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="lg:col-span-7 space-y-6"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050B3A]/10 text-[#050B3A] text-xs font-bold uppercase tracking-wider">
        <Sparkles size={14} />
        <span>M&M-HUB / L'HISTOIRE</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-black font-montserrat leading-tight text-[#050B3A]">
        {lang === 'fr' ? 'Là où la stratégie rencontre l’ambition.' : 'حيث تلتقي الاستراتيجية بالطموح.'}
      </h1>

      <div className="space-y-4 text-[#050B3A]/90 text-base sm:text-lg leading-relaxed font-inter">
        <p>
          {lang === 'fr'
            ? 'M&M-HUB est bien plus qu’un simple club académique. Né au sein de l’École Supérieure de Technologie de Kelaa des Sraghna (Université Cadi Ayyad), notre club s’est imposé comme un espace d’excellence, d’innovation et de mise en pratique des sciences du management et du marketing.'
            : 'إم أند إم هاب هو أكثر من مجرد نادٍ أكاديمي. تأسس في المدرسة العليا للتكنولوجيا بقلعة السراغنة (جامعة القاضي عياض)، ليصبح فضاءً للتميز والابتكار وتطبيق علوم التسيير والتسويق.'}
        </p>
        <p>
          {lang === 'fr'
            ? 'Notre parcours est guidé par une volonté constante de combler le fossé entre la théorie universitaire et la réalité entrepreneuriale, en offrant aux étudiants des opportunités uniques de se surpasser.'
            : 'مسارنا موجه بإرادة مستمرة لردم الفجوة بين النظرية الأكاديمية والواقع المقاولاتي، من خلال منح الطلبة فرصاً فريدة لتطوير قدراتهم.'}
        </p>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="lg:col-span-5"
    >
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#050B3A]/10 group">
        <img 
          src="/images/estk-campus.jpg" 
          alt="EST Kelaa des Sraghna" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B3A]/90 via-[#050B3A]/30 to-transparent flex items-end p-6">
          <div className="space-y-1">
            <p className="font-montserrat font-bold text-sm text-[#C1EBF3]">EST — Kelaa des Sraghna</p>
            <p className="text-xs text-white/80">Université Cadi Ayyad • 2026/2027</p>
          </div>
        </div>
      </div>
    </motion.div>

  </div>
</section>

{/* SECTION 2 — NOTRE MISSION : Fond Navy & Cartes Lumineuses */}
<section className="py-28 px-6 bg-[#050B3A] text-white relative overflow-hidden">
  {/* Effets de lumière en arrière-plan */}
  <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#1883C7]/15 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C1EBF3]/10 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-7xl mx-auto space-y-16 relative z-10">
    
    {/* En-tête de la section */}
    <div className="max-w-3xl mx-auto text-center space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1883C7]/20 border border-[#1883C7]/40 text-[#C1EBF3] text-xs font-bold uppercase tracking-wider shadow-lg"
      >
        <Target size={16} className="text-[#C1EBF3]" />
        <span>{lang === 'fr' ? 'Mission Officielle' : 'المهمة الرسمية'}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-5xl font-black font-montserrat text-white tracking-wide"
      >
        {lang === 'fr' ? 'Notre mission' : 'مهمتنا'}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-base sm:text-lg text-[#C1EBF3] font-semibold font-montserrat"
      >
        {lang === 'fr' 
          ? '« Transformer les idées en actions, et le potentiel en impact. »' 
          : '« تحويل الأفكار إلى أفعال، والموهبة إلى أثر ملموس. »'}
      </motion.p>
    </div>

    {/* Grande Carte Texte Officiel (Fond Blanc Pur & Contraste Élevé) */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="max-w-4xl mx-auto p-8 sm:p-12 bg-white text-[#050B3A] border-2 border-[#C1EBF3] rounded-3xl shadow-2xl shadow-[#1883C7]/20 text-base sm:text-lg leading-relaxed text-left rtl:text-right space-y-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-3 h-full bg-[#1883C7] rtl:left-auto rtl:right-0" />
      
      <p className="font-semibold text-lg sm:text-xl text-[#050B3A]">
        {lang === 'fr'
          ? "Notre mission principale chez M&M-HUB est de combler le fossé entre la théorie académique et l'exécution dans le monde réel. Nous formons la prochaine génération de leaders à travers des initiatives pratiques en marketing, en stratégie d'entreprise et en gestion de projets innovants."
          : "تتمثل مهمتنا الرئيسية في M&M-HUB في ردم الفجوة بين النظرية الأكاديمية والتنفيذ في العالم الحقيقي. نحن نقوم بتكوين الجيل القادم من القادة من خلال مبادرات عملية في التسويق، استراتيجية الشركات، وإدارة المشاريع المبتكرة."}
      </p>
      
      <p className="text-[#050B3A]/80 text-sm sm:text-base border-t border-[#050B3A]/10 pt-4 font-medium">
        {lang === 'fr'
          ? "En encourageant la créativité, la rigueur professionnelle et le travail d'équipe au sein de l'École Supérieure de Technologie de Kelaa des Sraghna, nous offrons à nos membres un écosystème propice pour transformer leurs idées audacieuses en réalisations concrètes et impactantes."
          : "من خلال تشجيع الإبداع، الدقة المهنية، والعمل الجماعي داخل المدرسة العليا للتكنولوجيا بقلعة السراغنة، نوفر لأعضائنا بيئة ملائمة لتحويل أفكارهم الجريئة إلى إنجازات ملموسة ذات أثر واقعي."}
      </p>
    </motion.div>

    {/* Parcours visuel : 4 Cartes (Fond Bleu Ciel / Blanc) */}
    <div className="pt-6">
      <div className="text-center mb-12">
        <h3 className="text-2xl sm:text-3xl font-black font-montserrat text-white">
          {lang === 'fr' ? "Notre Parcours : De l'idée à l'impact" : "مسارنا: من الفكرة إلى الأثر"}
        </h3>
        <div className="w-20 h-1.5 bg-[#1883C7] mx-auto mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Étape 01 : Idée */}
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          className="p-6 bg-gradient-to-b from-[#C1EBF3] to-white text-[#050B3A] rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-[#1883C7]/30 transition-all group flex flex-col justify-between border border-white/50 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#1883C7]" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#1883C7] text-white flex items-center justify-center font-black shadow-md">
                <Sparkles size={22} />
              </div>
              <span className="text-3xl font-black font-montserrat text-[#1883C7]/30">01</span>
            </div>
            <h4 className="text-xl font-bold font-montserrat text-[#050B3A]">
              {lang === 'fr' ? 'Idée' : 'فكرة'}
            </h4>
            <p className="text-xs sm:text-sm text-[#050B3A]/80 leading-relaxed font-medium">
              {lang === 'fr' 
                ? "Stimuler l'esprit créatif et détecter les opportunités stratégiques au cœur de l'école." 
                : "تحفيز الروح الإبداعية واكتشاف الفرص الاستراتيجية في قلب المدرسة."}
            </p>
          </div>
        </motion.div>

        {/* Étape 02 : Stratégie */}
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          className="p-6 bg-gradient-to-b from-[#C1EBF3] to-white text-[#050B3A] rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-[#1883C7]/30 transition-all group flex flex-col justify-between border border-white/50 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#1883C7]" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#1883C7] text-white flex items-center justify-center font-black shadow-md">
                <Target size={22} />
              </div>
              <span className="text-3xl font-black font-montserrat text-[#1883C7]/30">02</span>
            </div>
            <h4 className="text-xl font-bold font-montserrat text-[#050B3A]">
              {lang === 'fr' ? 'Stratégie' : 'استراتيجية'}
            </h4>
            <p className="text-xs sm:text-sm text-[#050B3A]/80 leading-relaxed font-medium">
              {lang === 'fr' 
                ? "Structurer les plans d'action avec rigueur marketing et vision managériale." 
                : "هيكلة خطط العمل بدقة تسويقية ورؤية إدارية واضحة."}
            </p>
          </div>
        </motion.div>

        {/* Étape 03 : Action */}
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          className="p-6 bg-gradient-to-b from-[#C1EBF3] to-white text-[#050B3A] rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-[#1883C7]/30 transition-all group flex flex-col justify-between border border-white/50 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#1883C7]" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#1883C7] text-white flex items-center justify-center font-black shadow-md">
                <Award size={22} />
              </div>
              <span className="text-3xl font-black font-montserrat text-[#1883C7]/30">03</span>
            </div>
            <h4 className="text-xl font-bold font-montserrat text-[#050B3A]">
              {lang === 'fr' ? 'Action' : 'تنفيذ'}
            </h4>
            <p className="text-xs sm:text-sm text-[#050B3A]/80 leading-relaxed font-medium">
              {lang === 'fr' 
                ? "Mener à bien les projets à travers des ateliers pratiques et des initiatives de terrain." 
                : "إنجاز المشاريع بكفاءة من خلال ورشات عمل عملية ومبادرات ميدانية."}
            </p>
          </div>
        </motion.div>

        {/* Étape 04 : Impact */}
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          className="p-6 bg-gradient-to-b from-[#C1EBF3] to-white text-[#050B3A] rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-[#1883C7]/30 transition-all group flex flex-col justify-between border border-white/50 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#1883C7]" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#1883C7] text-white flex items-center justify-center font-black shadow-md">
                <Sparkles size={22} />
              </div>
              <span className="text-3xl font-black font-montserrat text-[#1883C7]/30">04</span>
            </div>
            <h4 className="text-xl font-bold font-montserrat text-[#050B3A]">
              {lang === 'fr' ? 'Impact' : 'أثر'}
            </h4>
            <p className="text-xs sm:text-sm text-[#050B3A]/80 leading-relaxed font-medium">
              {lang === 'fr' 
                ? "Laisser une empreinte durable sur la communauté étudiante et professionnelle." 
                : "ترك بصمة مستدامة ومؤثرة داخل المجتمع الطلابي والمهني."}
            </p>
          </div>
        </motion.div>

      </div>
    </div>

  </div>
</section>
        {/* SECTION 3 — LES MEMBRES DU BUREAU */}
        <section className="py-28 px-6 bg-slate-50 text-navy border-t border-slate-200">
          <div className="max-w-7xl mx-auto space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="px-4 py-1.5 rounded-full bg-royal/10 text-royal text-xs font-bold uppercase tracking-wider">
                {lang === 'fr' ? 'Bureau Exécutif 2026/2027' : 'المكتب التنفيذي'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-montserrat text-navy">
                {lang === 'fr' ? 'Notre équipe' : 'فريقنا'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                {lang === 'fr'
                  ? 'Cliquez sur une carte pour voir les détails complets !'
                  : 'انقر على أي بطاقة لعرض التفاصيل الكاملة!'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.slice(0, 4).map((member) => (
                <MemberCard key={member.id} member={member} lang={lang} onSelect={setSelectedMember} />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {teamMembers.slice(4, 7).map((member) => (
                <MemberCard key={member.id} member={member} lang={lang} onSelect={setSelectedMember} />
              ))}
            </div>

          </div>
        </section>


{/* SECTION — NOS VALEURS (Design Lumineux & Moderne) */}
<section className="py-28 px-6 bg-[#050B3A] text-white relative overflow-hidden">
  {/* Effets de lueur en arrière-plan */}
  <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#1883C7]/15 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#C1EBF3]/10 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-7xl mx-auto space-y-16 relative z-10">
    
    <div className="text-center max-w-2xl mx-auto space-y-4">
      <motion.span 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block px-4 py-1.5 bg-[#1883C7]/20 border border-[#1883C7]/40 text-[#C1EBF3] text-xs font-bold rounded-full uppercase tracking-widest shadow-lg"
      >
       Valeurs Clés de M&M-HUB
      </motion.span>
      
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-5xl font-black font-montserrat text-white tracking-wide"
      >
        {lang === 'fr' ? 'Nos valeurs' : 'قيمنا'}
      </motion.h2>
      
      <div className="w-20 h-1.5 bg-[#E85200] mx-auto rounded-full" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {clubValues.map((val, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="relative p-8 bg-gradient-to-b from-[#C1EBF3] to-white text-[#050B3A] rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-[#1883C7]/30 transition-all group overflow-hidden border border-white/50 flex flex-col justify-between"
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#1883C7] group-hover:bg-[#E85200] transition-colors duration-300" />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[#1883C7] text-white flex items-center justify-center shadow-lg shadow-[#1883C7]/40 group-hover:bg-[#E85200] group-hover:scale-110 transition-all duration-300">
                <Award size={26} />
              </div>
              <span className="text-4xl font-black font-montserrat text-[#1883C7]/20 select-none">
                0{idx + 1}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold font-montserrat text-[#050B3A] group-hover:text-[#1883C7] transition-colors">
                {val.title[lang] || val.title.fr}
              </h3>
              <p className="text-xs sm:text-sm text-[#050B3A]/80 leading-relaxed font-medium font-inter">
                {val.desc[lang] || val.desc.fr}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

  </div>
</section>

      </main>

      {/* POPUP / MODAL DIAL TSWIRA KBIRA W KTBA KAMLA */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 text-navy overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-energeticOrange hover:text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-lg border-2 border-royal/20">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                <div className="space-y-1">
                  <span className="px-3 py-1 bg-energeticOrange text-white font-bold text-xs rounded-full shadow">
                    Bureau 2026/2027
                  </span>
                  <h3 className="text-2xl font-black font-montserrat text-navy pt-2">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm font-bold text-energeticOrange">
                    {typeof selectedMember.role === 'object' ? (selectedMember.role[lang] || selectedMember.role.fr) : selectedMember.role}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed text-left w-full">
                  <p className="font-semibold text-royal mb-1">{lang === 'fr' ? 'Mission & Rôle :' : 'المهمة والدور :'}</p>
                  <p>{typeof selectedMember.mission === 'object' ? (selectedMember.mission[lang] || selectedMember.mission.fr) : selectedMember.mission}</p>
                </div>

                <div className="pt-2 flex items-center justify-center gap-4 text-slate-600">
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-royal hover:text-white text-xs font-semibold transition-colors"
                  >
                    <Mail size={16} /> Email
                  </a>
                  <a
                    href={`tel:${selectedMember.phone}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-royal hover:text-white text-xs font-semibold transition-colors"
                  >
                    <Phone size={16} /> Phone
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer t={t} />
    </div>
  );
}

// Composant Carte Membre du Bureau b'onClick
function MemberCard({ member, lang, onSelect }) {
  const roleTitle = typeof member.role === 'object' ? (member.role[lang] || member.role.fr) : member.role;
  const missionText = typeof member.mission === 'object' ? (member.mission[lang] || member.mission.fr) : member.mission;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={() => onSelect(member)}
      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6 group cursor-pointer"
    >
      <div className="space-y-4">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'flex';
              }
            }}
          />
          <div className="absolute inset-0 hidden items-center justify-center bg-royal/10 text-royal font-bold text-3xl font-montserrat">
            {member.name.charAt(0)}
          </div>
        </div>

        <div className="space-y-1 text-center">
          <h3 className="text-lg font-bold font-montserrat text-navy group-hover:text-royal transition-colors">
            {member.name}
          </h3>
          <p className="text-xs font-bold text-energeticOrange">
            {roleTitle}
          </p>
          <p className="text-[11px] text-slate-600 line-clamp-3 pt-2 leading-relaxed">
            {missionText}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 text-center text-xs text-royal font-semibold group-hover:underline">
        {lang === 'fr' ? 'Voir le profil complet →' : '← عرض الملف الشخصي الكامل'}
      </div>
    </motion.div>
  );
}