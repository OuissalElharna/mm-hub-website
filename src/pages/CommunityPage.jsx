import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, UserPlus, Mail, MessageSquarePlus, Sparkles, CheckCircle2, Heart, Palette, Smile, Pin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { translations } from '../i18n/translations';
import IntegratedMembersSection from '../components/IntegratedMembersSection';
import { integratedMembers } from '../data/integratedMembers';
import { supabase } from '../supabaseClient';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mppdokkq';

const DEFAULT_CARDS = [
  { id: 'default-1', author: 'KHALIL SOULMANI', role: 'CEO', message: 'La réussite est le fruit de la collaboration et de la vision commune.', bg: '#1E3A8A', textColor: '#FFFFFF', font: 'font-montserrat', sticker: '🚀', isPinned: true },
  { id: 'default-2', author: 'ANASS LAMAANGAD', role: 'CMO', message: 'Ensemble, nous construisons une image forte et percutante pour M&M-HUB.', bg: '#FF5722', textColor: '#FFFFFF', font: 'font-tajawal', sticker: '💡', isPinned: false },
  { id: 'default-3', author: 'OUISSAL ELHARNA', role: 'CIO', message: "Coder l'avenir et structurer nos idées pour marquer notre passage à ESTK.", bg: '#0F172A', textColor: '#FFFFFF', font: 'font-montserrat', sticker: '💻', isPinned: false }
];

export default function CommunityPage({ lang, setLang }) {
  const t = translations[lang] || translations.fr;

  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [loadingCards, setLoadingCards] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newBg, setNewBg] = useState('#1E3A8A');
  const [newTextColor, setNewTextColor] = useState('#FFFFFF');
  const [newFont, setNewFont] = useState('font-montserrat');
  const [newSticker, setNewSticker] = useState('✨');
  const [submittingCard, setSubmittingCard] = useState(false);

  const fontsList = [
    { label: 'Montserrat (Modern)', value: 'font-montserrat' },
    { label: 'Tajawal (عربي أنيق)', value: 'font-tajawal' },
    { label: 'Cairo (عربي عريض)', value: 'font-cairo' },
    { label: 'Amiri (عربي تقليدي)', value: 'font-amiri' },
    { label: 'Reem Kufi (كوفي عصري)', value: 'font-reem' },
    { label: 'Inter (Clean Sans)', value: 'font-sans' },
    { label: 'Playfair (Luxury Serif)', value: 'font-serif' },
    { label: 'Pacifico (Cursive Fun)', value: 'font-pacifico' },
    { label: 'Dancing Script', value: 'font-dancing' },
    { label: 'Caveat (Handwritten)', value: 'font-caveat' },
    { label: 'Cinzel (Royal Roman)', value: 'font-cinzel' },
    { label: 'Oswald (Bold Condensed)', value: 'font-oswald' },
    { label: 'Poppins (Geometric)', value: 'font-poppins' },
    { label: 'Raleway (Elegant)', value: 'font-raleway' },
    { label: 'Quicksand (Round)', value: 'font-quicksand' },
    { label: 'Lora (Literary Serif)', value: 'font-lora' },
    { label: 'Merriweather', value: 'font-merriweather' },
    { label: 'Ubuntu (Tech)', value: 'font-ubuntu' },
    { label: 'Rubik (Friendly)', value: 'font-rubik' },
    { label: 'Courier New (Mono)', value: 'font-mono' }
  ];

  const stickersList = ['✨', '🚀', '💡', '🔥', '💻', '⭐', '🎨', '🌟', '🎯', '👑', '🍀', '💬', '🌸', '💖', '🎓', '🏆', '💎', '🦄', '⚡'];

  const [memberForm, setMemberForm] = useState({ fullName: '', email: '', phone: '', filiere: '', level: '', motivation: '' });
  const [memberSubmitted, setMemberSubmitted] = useState(false);
  const [memberSending, setMemberSending] = useState(false);
  const [memberError, setMemberError] = useState('');

  const [contactForm, setContactForm] = useState({ name: '', email: '', filiere: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data, error } = await supabase
          .from('wall_cards')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const formatted = data.map((row) => ({
            id: row.id,
            author: row.author,
            role: row.role || (lang === 'fr' ? 'Membre M&M-HUB' : 'عضو النادي'),
            message: row.message,
            bg: row.bg || '#1E3A8A',
            textColor: row.text_color || '#FFFFFF',
            font: row.font || 'font-montserrat',
            sticker: row.sticker || '✨',
            isPinned: Boolean(row.is_pinned),
            isDb: true
          }));
          setCards(formatted);
        }
      } catch (err) {
        console.error('Error loading wall cards:', err);
      } finally {
        setLoadingCards(false);
      }
    };

    fetchCards();
  }, [lang]);

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    setMemberSending(true);
    setMemberError('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Nouvelle Demande d'Adhésion M&M-HUB — ${memberForm.fullName}`,
          type_formulaire: "Formulaire d'Adhésion",
          nom_complet: memberForm.fullName,
          email: memberForm.email,
          telephone: memberForm.phone,
          filiere: memberForm.filiere,
          niveau: memberForm.level,
          motivations: memberForm.motivation
        })
      });

      if (response.ok) {
        setMemberSubmitted(true);
        setMemberForm({ fullName: '', email: '', phone: '', filiere: '', level: '', motivation: '' });
      } else {
        setMemberError(lang === 'fr' ? "Erreur lors de l'envoi. Réessayez." : 'حدث خطأ أثناء الإرسال، حاول مرة أخرى.');
      }
    } catch {
      setMemberError(lang === 'fr' ? 'Problème de connexion réseau.' : 'مشكلة في الاتصال بالإنترنت.');
    } finally {
      setMemberSending(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSending(true);
    setContactError('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Nouveau Message Contact M&M-HUB — ${contactForm.name}`,
          type_formulaire: 'Formulaire Contact',
          nom_complet: contactForm.name,
          email: contactForm.email,
          filiere: contactForm.filiere,
          message: contactForm.message
        })
      });

      if (response.ok) {
        setContactSubmitted(true);
        setContactForm({ name: '', email: '', filiere: '', message: '' });
      } else {
        setContactError(lang === 'fr' ? "Erreur lors de l'envoi. Réessayez." : 'حدث خطأ أثناء الإرسال، حاول مرة أخرى.');
      }
    } catch {
      setContactError(lang === 'fr' ? 'Problème de connexion réseau.' : 'مشكلة في الاتصال بالإنترنت.');
    } finally {
      setContactSending(false);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !newAuthor.trim() || submittingCard) return;

    setSubmittingCard(true);
    const payload = {
      author: newAuthor.trim(),
      role: newRole.trim() || (lang === 'fr' ? 'Membre M&M-HUB' : 'عضو النادي'),
      message: newMessage.trim(),
      bg: newBg,
      text_color: newTextColor,
      font: newFont,
      sticker: newSticker,
      is_pinned: false
    };

    try {
      const { data, error } = await supabase
        .from('wall_cards')
        .insert([payload])
        .select()
        .single();

      if (!error && data) {
        const created = {
          id: data.id,
          author: data.author,
          role: data.role,
          message: data.message,
          bg: data.bg,
          textColor: data.text_color,
          font: data.font,
          sticker: data.sticker,
          isPinned: Boolean(data.is_pinned),
          isDb: true
        };
        setCards((prev) => [created, ...prev]);
      } else {
        setCards((prev) => [{ id: Date.now(), ...payload, textColor: payload.text_color, isPinned: false }, ...prev]);
      }

      setNewAuthor('');
      setNewRole('');
      setNewMessage('');
      setShowModal(false);
    } catch (err) {
      console.error('Error adding card:', err);
    } finally {
      setSubmittingCard(false);
    }
  };

  const togglePin = async (card) => {
    const nextPin = !card.isPinned;
    setCards((prev) => prev.map((c) => (c.id === card.id ? { ...c, isPinned: nextPin } : c)));

    if (card.isDb) {
      const { error } = await supabase
        .from('wall_cards')
        .update({ is_pinned: nextPin })
        .eq('id', card.id);

      if (error) {
        console.error('Error updating pin:', error);
      }
    }
  };

  const sortedCards = [...cards].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div dir={t.dir} className={`min-h-screen bg-navy text-white ${t.font}`}>
      <Navbar lang={lang} setLang={setLang} t={t} />

      <main className="pt-20">

        {/* HEADER */}
        <section className="py-16 px-6 text-center bg-navy border-b border-royal/20">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-softCyan/10 border border-softCyan/30 text-softCyan text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} className="text-energeticOrange" />
              <span>M&M-HUB / Communauté & Famille</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-montserrat leading-tight text-white">
              {lang === 'fr' ? 'Notre Communauté, Notre Force' : 'مجتمعنا، قوتنا وروح تضامننا'}
            </h1>
            <p className="text-steelSlate text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {lang === 'fr'
                ? 'Un espace humain et chaleureux qui célèbre l’engagement, le partage et l’esprit d’équipe.'
                : 'فضاء إنساني دافئ يحتفي بالالتزام، التشاركية، وروح الفريق لكل فرد في العائلة.'}
            </p>
          </div>
        </section>

        {/* SECTION 1 — Reconnaissance & Gratitude */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-royal/20 via-navy to-slate-900 border border-royal/30 p-8 sm:p-14 rounded-3xl shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-energeticOrange/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-softCyan/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-energeticOrange/20 text-energeticOrange font-bold text-xs uppercase tracking-wider mx-auto">
                <Heart size={14} className="fill-energeticOrange" />
                <span>{lang === 'fr' ? 'Reconnaissance & Gratitude' : 'تقدير وعرفان'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black font-montserrat text-white leading-snug">
                {lang === 'fr' ? 'À tous ceux qui font battre le cœur de M&M-HUB' : 'لكل من يجعل نبض الحياة يسري في عائلة M&M-HUB'}
              </h2>

              <p className="text-steelSlate text-sm sm:text-base leading-relaxed pt-2">
                {lang === 'fr'
                  ? 'Derrière chaque projet et chaque succès, il y a des efforts inlassables et une passion commune. Merci à tous les membres et collaborateurs qui s’investissent avec cœur pour hisser haut les couleurs de notre club à l’ESTK.'
                  : 'وراء كل مشروع وكل نجاح، جهود مضنية وشغف مشترك. نتقدم بخالص الشكر لكل الأعضاء والشركاء الذين يبذلون قصارى جهدهم لرفع راية نادينا في المدرسة العليا للتكنولوجيا.'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2 — Words That Inspire */}
        <section className="bg-royal/10 border-y border-royal/20 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-energeticOrange/20 text-energeticOrange font-bold text-xs rounded-full">
              <Quote size={14} />
              <span>{lang === 'fr' ? 'Pensée inspirante' : 'حكمة ومقولة ملهمة'}</span>
            </div>
            <blockquote className="text-xl sm:text-2xl font-bold font-montserrat text-white leading-relaxed">
              {lang === 'fr' ? '« Se réunir est un début, rester ensemble est un progrès, travailler ensemble est la réussite. »' : '« تعاونوا على البر والتقوى ولا تعاونوا على الإثم والعدوان »'}
            </blockquote>
          </div>
        </section>

        {/* SECTION 3 — Formulaire d’Adhésion */}
        <section className="bg-slate-50 text-navy py-20 px-6 border-b border-slate-200">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-royal/10 text-royal font-bold text-xs rounded-full">
                <UserPlus size={14} />
                <span>{lang === 'fr' ? 'Rejoignez-nous' : 'انضم إلينا'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-montserrat text-navy">
                {lang === 'fr' ? 'Formulaire d’Adhésion' : 'استمارة الانخراط في النادي'}
              </h2>
            </div>

            {memberSubmitted ? (
              <div className="text-center py-12 space-y-4 bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
                <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold font-montserrat">
                  {lang === 'fr' ? 'Candidature envoyée avec succès !' : 'تم إرسال طلب انخراطك بنجاح!'}
                </h3>
                <button
                  type="button"
                  onClick={() => setMemberSubmitted(false)}
                  className="px-5 py-2 bg-royal text-white rounded-xl text-xs font-bold"
                >
                  {lang === 'fr' ? 'Envoyer une autre demande' : 'إرسال طلب آخر'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleMemberSubmit} className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-200 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{lang === 'fr' ? 'Nom et Prénom' : 'الاسم الكامل'}</label>
                    <input type="text" required placeholder="Ex: Yassine Meziane" value={memberForm.fullName} onChange={(e) => setMemberForm({ ...memberForm, fullName: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{lang === 'fr' ? 'Adresse E-mail' : 'البريد الإلكتروني'}</label>
                    <input type="email" required placeholder="student@estk.ma" value={memberForm.email} onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{lang === 'fr' ? 'Téléphone' : 'الهاتف'}</label>
                    <input type="tel" placeholder="06XXXXXXXX" value={memberForm.phone} onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{lang === 'fr' ? 'Filière' : 'الشعبة'}</label>
                    <input type="text" required placeholder="Data Engineering / G.E" value={memberForm.filiere} onChange={(e) => setMemberForm({ ...memberForm, filiere: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{lang === 'fr' ? 'Niveau' : 'المستوى'}</label>
                    <input type="text" required placeholder="1ère année / 2ème année" value={memberForm.level} onChange={(e) => setMemberForm({ ...memberForm, level: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{lang === 'fr' ? 'Motivations & Compétences' : 'دوافعك ومهاراتك للانضمام'}</label>
                  <textarea rows="3" required placeholder="Pourquoi souhaitez-vous rejoindre M&M-HUB ?" value={memberForm.motivation} onChange={(e) => setMemberForm({ ...memberForm, motivation: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal" />
                </div>
                {memberError && <p className="text-xs font-bold text-red-600">{memberError}</p>}
                <button type="submit" disabled={memberSending} className="w-full py-3.5 bg-energeticOrange hover:bg-energeticOrange/90 disabled:opacity-60 text-white font-bold rounded-xl text-xs shadow-lg transition-all">
                  {memberSending
                    ? (lang === 'fr' ? 'Envoi en cours...' : 'جاري الإرسال...')
                    : (lang === 'fr' ? 'Envoyer ma candidature' : 'إرسال طلب الانخراط')}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* SECTION 4 — Contact Us */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <div className="bg-royal/10 border border-royal/20 p-8 sm:p-12 rounded-3xl space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-softCyan/20 text-softCyan font-bold text-xs rounded-full">
                <Mail size={14} />
                <span>{lang === 'fr' ? 'Contactez-nous' : 'اتصل بنا'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-montserrat text-white">{lang === 'fr' ? 'Restons en contact' : 'ابق على تواصل معنا'}</h2>
            </div>
            {contactSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <p className="text-xs text-softCyan font-bold">
                  {lang === 'fr' ? 'Message envoyé avec succès !' : 'تم إرسال رسالتك بنجاح!'}
                </p>
                <button
                  type="button"
                  onClick={() => setContactSubmitted(false)}
                  className="px-4 py-2 bg-royal text-white rounded-xl text-xs font-bold"
                >
                  {lang === 'fr' ? 'Envoyer un autre message' : 'إرسال رسالة أخرى'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" required placeholder={lang === 'fr' ? 'Nom complet' : 'الاسم الكامل'} value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full p-3 bg-navy/80 border border-royal/30 rounded-xl text-xs text-white" />
                  <input type="email" required placeholder={lang === 'fr' ? 'E-mail' : 'البريد الإلكتروني'} value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full p-3 bg-navy/80 border border-royal/30 rounded-xl text-xs text-white" />
                </div>
                <textarea rows="3" required placeholder={lang === 'fr' ? 'Message...' : 'رسالتك...'} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} className="w-full p-3 bg-navy/80 border border-royal/30 rounded-xl text-xs text-white" />
                {contactError && <p className="text-xs font-bold text-red-400">{contactError}</p>}
                <button type="submit" disabled={contactSending} className="px-6 py-3 bg-royal hover:bg-royal/90 disabled:opacity-60 text-white font-bold rounded-xl text-xs">
                  {contactSending
                    ? (lang === 'fr' ? 'Envoi en cours...' : 'جاري الإرسال...')
                    : (lang === 'fr' ? 'Envoyer' : 'إرسال')}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* SECTION 5 — Digital Wall */}
        <section className="bg-white text-navy py-20 px-6 border-t border-slate-200">
          <div className="max-w-7xl mx-auto space-y-12">

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-200 pb-6">
              <div className="space-y-1 text-center sm:text-start">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-energeticOrange/10 text-energeticOrange font-bold text-xs rounded-full">
                  <MessageSquarePlus size={14} />
                  <span>Digital Wall Studio</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black font-montserrat text-navy">
                  {lang === 'fr' ? 'Laissez votre empreinte' : 'اترك بصمتك ورسالتك الإبداعية'}
                </h2>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-energeticOrange hover:bg-energeticOrange/90 text-white font-bold rounded-2xl text-xs shadow-xl flex items-center gap-2 transition-all"
              >
                <Sparkles size={16} />
                <span>{lang === 'fr' ? 'Créer ma carte (Studio Canva)' : 'فتح استوديو التصميم'}</span>
              </button>
            </div>

            {loadingCards ? (
              <p className="text-center text-xs font-bold text-slate-500 py-8">
                {lang === 'fr' ? 'Chargement des cartes...' : 'جاري تحميل البطاقات...'}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sortedCards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ y: -6, scale: 1.02 }}
                    style={{ backgroundColor: card.bg, color: card.textColor }}
                    className={`${card.font} p-8 rounded-3xl shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden border ${card.isPinned ? 'ring-4 ring-amber-400' : 'border-black/10'}`}
                  >
                    <div className="flex justify-between items-center absolute top-4 left-4 right-4">
                      <span className="text-2xl bg-white/20 p-2 rounded-2xl backdrop-blur-md">
                        {card.sticker}
                      </span>
                      <button
                        type="button"
                        onClick={() => togglePin(card)}
                        title={card.isPinned ? 'Détacher la carte' : 'Épingler en haut'}
                        className={`p-2 rounded-xl backdrop-blur-md transition-transform hover:scale-110 ${card.isPinned ? 'bg-amber-400 text-navy' : 'bg-white/20 text-white'}`}
                      >
                        <Pin size={16} className={card.isPinned ? 'fill-navy rotate-45' : 'rotate-45'} />
                      </button>
                    </div>

                    <p className="text-sm sm:text-base font-medium leading-relaxed italic pt-12">
                      « {card.message} »
                    </p>

                    <div className="flex justify-between items-end border-t border-white/20 pt-4">
                      <div>
                        <p className="font-bold text-xs">{card.author}</p>
                        <p className="text-[10px] opacity-80">{card.role}</p>
                      </div>
                      {card.isPinned && (
                        <span className="text-[10px] font-bold bg-amber-400 text-navy px-2 py-0.5 rounded-full">
                          {lang === 'fr' ? 'Épinglé' : 'مثبت'}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-navy/80 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white text-navy p-8 rounded-3xl max-w-xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-200"
                >
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-xl font-bold font-montserrat text-navy flex items-center gap-2">
                      <Palette size={20} className="text-energeticOrange" />
                      <span>{lang === 'fr' ? 'Studio de Création (20+ Polices)' : 'استوديو التصميم المتقدم'}</span>
                    </h3>
                    <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-navy font-bold text-lg">✕</button>
                  </div>

                  <form onSubmit={handleAddCard} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">{lang === 'fr' ? 'Nom / Auteur' : 'الاسم أو اللقب'}</label>
                        <input type="text" required placeholder="Ex: Ayoub" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">{lang === 'fr' ? 'Rôle / Filière' : 'الدور أو الشعبة'}</label>
                        <input type="text" placeholder="Ex: Data Engineering" value={newRole} onChange={(e) => setNewRole(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600">{lang === 'fr' ? 'Votre Message' : 'الرسالة أو النص'}</label>
                      <textarea rows="3" required placeholder="Écrivez votre pensée..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600">{lang === 'fr' ? 'Style de Police' : 'اختر نوع الخط'}</label>
                      <select
                        value={newFont}
                        onChange={(e) => setNewFont(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy font-bold focus:outline-none focus:border-energeticOrange"
                      >
                        {fontsList.map((f) => (
                          <option key={f.value} value={f.value}>
                            {f.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                        <Smile size={14} />
                        <span>{lang === 'fr' ? 'Choisir un Sticker' : 'اختر ستيكر'}</span>
                      </label>
                      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                        {stickersList.map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setNewSticker(st)}
                            className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border-2 transition-transform hover:scale-110 ${newSticker === st ? 'border-energeticOrange bg-energeticOrange/20' : 'border-slate-200 bg-white'}`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">{lang === 'fr' ? 'Couleur de fond' : 'لون خلفية البطاقة'}</label>
                        <div className="flex items-center gap-3">
                          <input type="color" value={newBg} onChange={(e) => setNewBg(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer border-0" />
                          <span className="text-xs font-mono text-slate-500">{newBg}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">{lang === 'fr' ? 'Couleur du texte' : 'لون الكتابة'}</label>
                        <div className="flex items-center gap-3">
                          <input type="color" value={newTextColor} onChange={(e) => setNewTextColor(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer border-0" />
                          <span className="text-xs font-mono text-slate-500">{newTextColor}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingCard}
                      className="w-full py-3.5 bg-energeticOrange hover:bg-energeticOrange/90 disabled:opacity-60 text-white font-bold rounded-xl text-xs shadow-lg"
                    >
                      {submittingCard
                        ? (lang === 'fr' ? 'Publication...' : 'جاري النشر...')
                        : (lang === 'fr' ? 'Publier sur le mur' : 'نشر البطاقة على الحائط')}
                    </button>
                  </form>
                </motion.div>
              </div>
            )}

          </div>
        </section>

      </main>
      <IntegratedMembersSection members={integratedMembers} lang={lang} />
      <Footer t={t} />
    </div>
  );
}