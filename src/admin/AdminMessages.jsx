import React, { useState, useEffect } from 'react';
import { Mail, Phone, CheckCircle, XCircle, Trash2, Send, UserCheck, MessageSquare } from 'lucide-react';

export default function AdminMessages() {
  const [activeTab, setActiveTab] = useState('adhésions');
  const [adhesions, setAdhesions] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedAdhesions = JSON.parse(localStorage.getItem('mm_hub_adhesions') || '[]');
    const savedMessages = JSON.parse(localStorage.getItem('mm_hub_messages') || '[]');
    
    // Données réelles ou de démonstration si vide
    if (savedAdhesions.length === 0) {
      const initialAdhesions = [
        { id: 1, fullName: 'Yassine Meziane', email: 'yassine@estk.ma', phone: '0612345678', filiere: 'Génie Informatique & Data', level: '1ère année', motivation: 'Souhaite gérer la plateforme digitale et la base de données.', status: 'En attente' },
        { id: 2, fullName: 'Hiba Mokadader', email: 'hiba@estk.ma', phone: '0687654321', filiere: 'Management & Marketing', level: '2ème année', motivation: 'S\'occuper de l\'organisation opérationnelle des événements.', status: 'Accepté' }
      ];
      setAdhesions(initialAdhesions);
      localStorage.setItem('mm_hub_adhesions', JSON.stringify(initialAdhesions));
    } else {
      setAdhesions(savedAdhesions);
    }

    if (savedMessages.length === 0) {
      const initialMessages = [
        { id: 1, name: 'Anass Lamaangad', email: 'anass@estk.ma', message: 'Bonjour, quand aura lieu le prochain atelier de Marketing Digital ?', date: '2026-06-10', read: false }
      ];
      setMessages(initialMessages);
      localStorage.setItem('mm_hub_messages', JSON.stringify(initialMessages));
    } else {
      setMessages(savedMessages);
    }
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = adhesions.map(item => item.id === id ? { ...item, status: newStatus } : item);
    setAdhesions(updated);
    localStorage.setItem('mm_hub_adhesions', JSON.stringify(updated));
  };

  const handleDeleteMessage = (id) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('mm_hub_messages', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 font-inter">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-energeticOrange/10 text-energeticOrange font-bold text-xs rounded-full mb-2">
            <MessageSquare size={14} />
            <span>Gestion des formulaires</span>
          </div>
          <h2 className="text-2xl font-black font-montserrat text-navy">Demandes d’Adhésion & Messages Contact</h2>
          <p className="text-xs text-slate-500">Traitez en direct les soumissions issues des formulaires du site web.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('adhésions')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'adhésions' ? 'bg-energeticOrange text-white shadow-lg' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Adhésions ({adhesions.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'messages' ? 'bg-energeticOrange text-white shadow-lg' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Messages Contact ({messages.length})
          </button>
        </div>
      </div>

      {activeTab === 'adhésions' ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden divide-y divide-slate-100">
          {adhesions.map((item) => (
            <div key={item.id} className="p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 hover:bg-slate-50/50 transition-all">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Accepté' ? 'bg-emerald-100 text-emerald-700' :
                    item.status === 'Refusé' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-xs font-bold text-royal">{item.filiere} ({item.level})</span>
                </div>
                <h4 className="text-base font-bold text-navy font-montserrat">{item.fullName}</h4>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">« {item.motivation} »</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Mail size={12} /> {item.email}</span>
                  <span className="flex items-center gap-1"><Phone size={12} /> {item.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end pt-2 lg:pt-0">
                <a
                  href={`mailto:${item.email}?subject=Candidature M%26M-HUB&body=Bonjour ${encodeURIComponent(item.fullName)},`}
                  className="px-4 py-2 bg-royal/10 text-royal hover:bg-royal hover:text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
                >
                  <Send size={14} /> Répondre par E-mail
                </a>
                <button
                  onClick={() => handleStatusChange(item.id, 'Accepté')}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-1 transition-all"
                >
                  <CheckCircle size={14} /> Accepter
                </button>
                <button
                  onClick={() => handleStatusChange(item.id, 'Refusé')}
                  className="px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold rounded-xl text-xs flex items-center gap-1 transition-all"
                >
                  <XCircle size={14} /> Refuser
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden divide-y divide-slate-100">
          {messages.map((msg) => (
            <div key={msg.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/50 transition-all">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-navy font-montserrat">{msg.name}</span>
                  <span className="text-xs text-slate-400">({msg.email})</span>
                </div>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{msg.message}</p>
                <p className="text-[10px] text-slate-400">{msg.date}</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${msg.email}?subject=Réponse M%26M-HUB&body=Bonjour ${encodeURIComponent(msg.name)},`}
                  className="px-4 py-2 bg-royal/10 text-royal hover:bg-royal hover:text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
                >
                  <Send size={14} /> Répondre
                </a>
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}