import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageSquare, Calendar, Tag, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { initialEventsData } from '../data/eventsData';
import { translations } from '../i18n/translations';
import { supabase } from '../supabaseClient';

const LIKED_STORAGE_KEY = 'mmhub_liked_events_v1';

export default function EventDetailPage({ lang = 'fr', setLang }) {
  const t = translations[lang] || translations.fr;
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [postingComment, setPostingComment] = useState(false);

  useEffect(() => {
    const found = initialEventsData?.past?.find((item) => String(item.id) === String(id)) || null;
    if (!found) {
      setArticle(null);
      return;
    }

    let likedIds = [];
    try {
      likedIds = JSON.parse(localStorage.getItem(LIKED_STORAGE_KEY) || '[]');
    } catch {
      likedIds = [];
    }

    setArticle({
      ...found,
      likedByUser: likedIds.includes(String(found.id))
    });
    setComments(Array.isArray(found.comments) ? found.comments : []);

    const syncFromSupabase = async () => {
      try {
        const { data: likeRow } = await supabase
          .from('event_likes')
          .select('likes_count')
          .eq('event_id', String(found.id))
          .maybeSingle();

        if (likeRow && likeRow.likes_count !== undefined) {
          setArticle((prev) => (prev ? { ...prev, likes: Number(likeRow.likes_count) } : prev));
        }

        const { data: commentRows, error: commentsError } = await supabase
          .from('event_comments')
          .select('*')
          .eq('event_id', String(found.id))
          .order('created_at', { ascending: false });

        if (!commentsError && commentRows && commentRows.length > 0) {
          const formatted = commentRows.map((c) => ({
            id: c.id,
            author: c.author,
            date: c.created_at ? String(c.created_at).split('T')[0] : new Date().toISOString().split('T')[0],
            text: c.comment
          }));
          setComments(formatted);
        }
      } catch (err) {
        console.error('Error syncing event details from Supabase:', err);
      }
    };

    syncFromSupabase();
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-navy text-white flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold font-montserrat text-softCyan">
            {lang === 'fr' ? 'Article non trouvé' : 'المقال غير موجود'}
          </h2>
          <Link to="/events" className="inline-block px-6 py-3 bg-energeticOrange text-white font-bold rounded-xl text-xs">
            {lang === 'fr' ? 'Retour aux activités' : 'العودة إلى الأنشطة'}
          </Link>
        </div>
      </div>
    );
  }

  const getLocalized = (val) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[lang] || val.fr || '';
  };

  const title = getLocalized(article.title);
  const category = getLocalized(article.category);
  const summary = getLocalized(article.summary);
  const intro = getLocalized(article.intro) || summary;

  const handleLike = async () => {
    const isLiked = Boolean(article.likedByUser);
    const nextLikes = isLiked ? Math.max(0, (article.likes || 0) - 1) : (article.likes || 0) + 1;

    setArticle((prev) => (prev ? { ...prev, likedByUser: !isLiked, likes: nextLikes } : prev));

    try {
      const likedIds = JSON.parse(localStorage.getItem(LIKED_STORAGE_KEY) || '[]');
      const idStr = String(article.id);
      const nextLikedIds = isLiked
        ? likedIds.filter((x) => x !== idStr)
        : Array.from(new Set([...likedIds, idStr]));
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(nextLikedIds));
    } catch {
      // ignore storage errors
    }

    const { error } = await supabase
      .from('event_likes')
      .upsert({ event_id: String(article.id), likes_count: nextLikes }, { onConflict: 'event_id' });

    if (error) {
      console.error('Error saving like:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || postingComment) return;

    setPostingComment(true);
    const authorValue = authorName.trim() || (lang === 'fr' ? 'Visiteur M&M-HUB' : 'زائر النادي');
    const cleanText = commentText.trim();

    try {
      const { data: inserted, error } = await supabase
        .from('event_comments')
        .insert([
          {
            event_id: String(article.id),
            author: authorValue,
            comment: cleanText
          }
        ])
        .select()
        .single();

      const newComment = {
        id: inserted?.id || 'c-' + Date.now(),
        author: inserted?.author || authorValue,
        date: inserted?.created_at
          ? String(inserted.created_at).split('T')[0]
          : new Date().toISOString().split('T')[0],
        text: inserted?.comment || cleanText
      };

      if (error) {
        console.error('Error saving comment:', error);
      }

      setComments((prev) => [newComment, ...prev]);
      setCommentText('');
    } finally {
      setPostingComment(false);
    }
  };

  return (
    <div dir={t.dir || 'ltr'} className={`min-h-screen bg-navy text-white ${t.font || ''}`}>
      <Navbar lang={lang} setLang={setLang} t={t} />

      <main className="max-w-4xl mx-auto px-6 py-28 space-y-10">

        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-softCyan hover:text-energeticOrange transition-colors text-xs font-bold"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          <span>{lang === 'fr' ? 'Retour aux activités' : 'العودة إلى قائمة الأنشطة'}</span>
        </Link>

        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 bg-energeticOrange text-white font-bold rounded-full flex items-center gap-1.5 shadow">
              <Tag size={12} />
              {category}
            </span>
            <span className="text-steelSlate flex items-center gap-1">
              <Calendar size={12} />
              {article.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-montserrat leading-tight text-white">
            {title}
          </h1>

          <div className="relative aspect-video rounded-3xl overflow-hidden border border-royal/30 shadow-2xl">
            <img src={article.image} alt={title} className="w-full h-full object-cover" />
          </div>
        </header>

        <article className="bg-white text-navy p-8 sm:p-12 rounded-3xl space-y-8 shadow-2xl leading-relaxed text-base sm:text-lg">

          {intro && (
            <div className="p-6 bg-slate-50 border-l-4 border-energeticOrange rounded-r-2xl text-slate-700 italic font-medium">
              <p>{intro}</p>
            </div>
          )}

          {article.sections && article.sections.length > 0 ? (
            article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-xl font-bold font-montserrat text-navy">
                  {getLocalized(sec.subtitle)}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {getLocalized(sec.text)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {summary}
            </p>
          )}

          {article.gallery && article.gallery.length > 0 && (
            <div className="space-y-4 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-royal">
                {lang === 'fr' ? 'Galerie de l’événement' : 'معرض الصور'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {article.gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-video">
                    <img
                      src={imgUrl}
                      alt="Galerie"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-8 border-t flex items-center justify-between">
            <button
              type="button"
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                article.likedByUser
                  ? 'bg-energeticOrange text-white shadow-lg'
                  : 'bg-slate-100 text-navy hover:bg-slate-200'
              }`}
            >
              <Heart size={18} className={article.likedByUser ? 'fill-white' : ''} />
              <span>{article.likes} {lang === 'fr' ? 'J’aime' : 'إعجاب'}</span>
            </button>

            <span className="text-xs text-slate-500 font-medium">
              M&M-HUB Magazine • EST-KS
            </span>
          </div>
        </article>

        <section className="bg-royal/10 border border-royal/20 p-8 rounded-3xl space-y-8">
          <div className="flex items-center gap-2 text-softCyan font-montserrat font-bold text-xl">
            <MessageSquare size={22} className="text-energeticOrange" />
            <h2>{lang === 'fr' ? 'Commentaires & Échanges' : 'التعليقات والمناقشات'}</h2>
          </div>

          <form onSubmit={handleAddComment} className="space-y-4">
            <input
              type="text"
              placeholder={lang === 'fr' ? 'Votre nom / Pseudo (Optionnel)' : 'الاسم / اللقب (اختياري)'}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full p-3 bg-navy/80 border border-royal/30 rounded-xl text-xs text-white placeholder-steelSlate/60 focus:outline-none focus:border-softCyan"
            />
            <textarea
              rows="3"
              required
              placeholder={lang === 'fr' ? 'Écrivez votre commentaire...' : 'اكتب تعليقك هنا...'}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-3 bg-navy/80 border border-royal/30 rounded-xl text-xs text-white placeholder-steelSlate/60 focus:outline-none focus:border-softCyan"
            />
            <button
              type="submit"
              disabled={postingComment}
              className="px-6 py-2.5 bg-energeticOrange hover:bg-energeticOrange/90 disabled:opacity-60 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow"
            >
              <Send size={14} />
              <span>
                {postingComment
                  ? (lang === 'fr' ? 'Publication...' : 'جاري النشر...')
                  : (lang === 'fr' ? 'Publier le commentaire' : 'نشر التعليق')}
              </span>
            </button>
          </form>

          <div className="space-y-4 pt-4 border-t border-royal/20">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="p-4 bg-navy/60 border border-royal/20 rounded-2xl space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-softCyan">{c.author}</span>
                    <span className="text-steelSlate/60 text-[10px]">{c.date}</span>
                  </div>
                  <p className="text-xs text-white/90 leading-normal">{c.text}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-steelSlate text-center py-4">
                {lang === 'fr' ? 'Aucun commentaire pour le moment.' : 'لا توجد تعليقات حتى الآن.'}
              </p>
            )}
          </div>
        </section>

      </main>

      <Footer t={t} />
    </div>
  );
}