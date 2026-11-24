import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Sparkles, UserCheck } from 'lucide-react';

// Remplace ces exemples par la vraie liste des membres intégrés dès qu'elle est prête
const DEFAULT_INTEGRATED_MEMBERS = [
  { id: '1', name: 'À compléter', role: 'Membre Intégré', cohort: '2026' },
];

export default function IntegratedMembersSection({
  members = DEFAULT_INTEGRATED_MEMBERS,
  lang = 'fr',
}) {
  const isAr = lang === 'ar';
  const [query, setQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  const roles = useMemo(() => {
    const unique = Array.from(
      new Set(members.map((m) => m.role).filter(Boolean))
    );
    return ['ALL', ...unique];
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesRole =
        selectedRole === 'ALL' || member.role === selectedRole;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        member.name?.toLowerCase().includes(q) ||
        member.role?.toLowerCase().includes(q) ||
        String(member.cohort || '').toLowerCase().includes(q);
      return matchesRole && matchesQuery;
    });
  }, [members, query, selectedRole]);

  const getInitials = (name = '') =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'MM';

  const copy = isAr
    ? {
        badge: 'مجتمع M&M-HUB',
        title: 'الأعضاء المنضمون حديثاً',
        subtitle:
          'قائمة الأعضاء الجدد الذين التحقوا بعائلة M&M-HUB وبدأوا رحلتهم معنا.',
        searchPlaceholder: 'ابحث بالاسم أو القطب...',
        allFilter: 'الكل',
        countLabel: 'عضو منضم',
        integratedBadge: 'عضو منضم',
        empty: 'لا توجد نتائج مطابقة للبحث حالياً.',
      }
    : {
        badge: 'COMMUNAUTÉ M&M-HUB',
        title: 'Membres Intégrés',
        subtitle:
          'Les nouveaux membres qui ont rejoint l’aventure M&M-HUB et font vivre notre communauté au quotidien.',
        searchPlaceholder: 'Rechercher par nom ou pôle...',
        allFilter: 'Tous',
        countLabel: 'membres intégrés',
        integratedBadge: 'Intégré',
        empty: 'Aucun membre ne correspond à cette recherche.',
      };

  return (
    <section
      id="integrated-members"
      dir={isAr ? 'rtl' : 'ltr'}
      className="py-20 px-6 bg-navy text-white font-inter relative overflow-hidden"
    >
      {/* Lueur décorative discrète */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-energeticOrange/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-sky-200">
              <Sparkles size={14} className="text-energeticOrange" />
              <span>{copy.badge}</span>
            </div>

            <h2 className="font-montserrat font-black text-3xl sm:text-5xl text-white tracking-tight">
              {copy.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {copy.subtitle}
            </p>
          </div>

          {/* Compteur */}
          <div className="inline-flex items-center gap-3 self-start md:self-auto px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="w-10 h-10 rounded-xl bg-energeticOrange/20 border border-energeticOrange/40 flex items-center justify-center text-energeticOrange">
              <Users size={20} />
            </div>
            <div>
              <div className="font-montserrat font-black text-xl text-white leading-none">
                {members.length}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                {copy.countLabel}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recherche & filtres */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${
                isAr ? 'right-4' : 'left-4'
              }`}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className={`w-full py-3 rounded-2xl bg-white/10 border border-white/15 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-300 transition-colors ${
                isAr ? 'pr-11 pl-4' : 'pl-11 pr-4'
              }`}
            />
          </div>

          {roles.length > 2 && (
            <div className="flex flex-wrap items-center gap-2">
              {roles.map((role) => {
                const active = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-sky-200 text-navy shadow'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {role === 'ALL' ? copy.allFilter : role}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Grille des membres */}
        {filteredMembers.length === 0 ? (
          <div className="py-12 px-6 rounded-3xl bg-white/5 border border-white/10 text-center text-sm text-slate-300">
            {copy.empty}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id || `${member.name}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-sky-200 text-navy font-montserrat font-black text-sm flex items-center justify-center shrink-0">
                    {getInitials(member.name)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-montserrat font-bold text-sm sm:text-base text-white truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-300 truncate">
                      {member.role || copy.integratedBadge}
                      {member.cohort ? ` • ${member.cohort}` : ''}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-energeticOrange/20 border border-energeticOrange/30 text-[11px] font-semibold text-orange-200 shrink-0">
                  <UserCheck size={12} />
                  <span>{copy.integratedBadge}</span>
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}