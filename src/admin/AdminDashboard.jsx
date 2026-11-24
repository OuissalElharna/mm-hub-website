import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, FileText, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const [messagesCount, setMessagesCount] = useState(0);
  const [adhésionsCount, setAdhesionsCount] = useState(0);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('mm_hub_messages') || '[]');
    const savedAdhesions = JSON.parse(localStorage.getItem('mm_hub_adhesions') || '[]');
    setMessagesCount(savedMessages.length);
    setAdhesionsCount(savedAdhesions.length);
  }, []);

  const stats = [
    { title: 'Membres du Bureau', count: 6, icon: Users, color: 'from-blue-600 to-indigo-700', label: 'Équipe Exécutive' },
    { title: 'Événements Clés', count: 4, icon: Calendar, color: 'from-amber-500 to-orange-600', label: 'Programme 2026' },
    { title: 'Demandes d’Adhésion', count: adhésionsCount, icon: FileText, color: 'from-cyan-500 to-blue-600', label: 'Candidatures reçues' },
    { title: 'Messages Contact', count: messagesCount, icon: MessageSquare, color: 'from-emerald-500 to-teal-700', label: 'Formulaires reçus' },
  ];

  const teamMembers = [
    { name: 'Ouissal Elharna', role: 'Chief Information Officer', filiere: 'Data Engineering' },
    { name: 'Khalil Soulmani', role: 'Chief Executive Officer', filiere: 'Management & Marketing' },
    { name: 'Anass Lamaangad', role: 'Chief Marketing Officer', filiere: 'Marketing Digital' },
    { name: 'Jad Benaroud', role: 'Chief Technical Officer', filiere: 'Génie Informatique' }
  ];

  return (
    <div className="space-y-8 font-inter">
      {/* Banner de bienvenue avec image de fond ESTK */}
      <div 
        className="relative rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center border border-white/10"
        style={{ backgroundImage: `url('/images/estk-campus.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-slate-900/80 backdrop-blur-[2px]" />
        
        <div className="relative p-8 md:p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-energeticOrange/20 border border-energeticOrange/30 text-energeticOrange font-bold text-xs rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-energeticOrange animate-ping" />
              <span>École Supérieure de Technologie d'El Kelâa des Sraghna</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black font-montserrat tracking-tight leading-tight">
              Tableau de Bord — M&M-HUB
            </h2>
            <p className="text-xs md:text-sm text-steelSlate leading-relaxed">
              Bienvenue sur la plateforme centrale de gestion. Contrôlez le contenu, les membres et les communications en temps réel.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 min-w-[220px]">
            <p className="text-[10px] font-bold text-steelSlate uppercase tracking-wider">Statut du Portail</p>
            <p className="text-sm font-black text-emerald-400 flex items-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Opérationnel
            </p>
            <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-slate-300">
              Super Admin: <span className="font-bold text-white">cortexoperation10@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cartes d'échantillon des statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-lg shadow-indigo-500/10`}>
                  <Icon size={22} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-black font-montserrat text-navy">{item.count}</h3>
                <p className="text-xs font-bold text-slate-500 pt-1">{item.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Vue Équipe & Raccourcis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold font-montserrat text-navy">Membres du Bureau Exécutif</h3>
              <p className="text-xs text-slate-400">Équipe dirigeante enregistrée sur la plateforme</p>
            </div>
            <span className="text-xs text-royal font-bold bg-royal/10 px-3 py-1 rounded-full">Actifs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/80">
                <div className="w-12 h-12 rounded-xl bg-royal text-white flex items-center justify-center font-bold font-montserrat text-sm shadow-sm">
                  {member.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-navy truncate font-montserrat">{member.name}</h4>
                  <p className="text-[11px] font-semibold text-energeticOrange truncate">{member.role}</p>
                  <p className="text-[10px] text-slate-400 truncate">{member.filiere}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-montserrat text-softCyan">Accès Rapide Admin</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consultez les messages reçus de la part des visiteurs et validez les nouvelles adhésions en un clic.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <a 
              href="/admin/messages" 
              className="w-full py-3 bg-energeticOrange hover:bg-energeticOrange/90 text-white font-bold rounded-xl text-xs text-center flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <span>Gérer les messages</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}