import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Plus, Trash2, Calendar, User, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function AdminTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Mise à jour de la liste des membres', assignee: 'Yassine Meziane', priority: 'High', status: 'In Progress', deadline: '2026-06-15' },
    { id: 2, title: 'Préparation du rapport d’activités', assignee: 'Ouissal Elharna', priority: 'Medium', status: 'To Do', deadline: '2026-06-20' },
    { id: 3, title: 'Design des affiches pour les Portes Ouvertes', assignee: 'Anass Lamaangad', priority: 'High', status: 'Completed', deadline: '2026-06-01' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newDeadline, setNewDeadline] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      assignee: newAssignee.trim() || 'Équipe M&M-HUB',
      priority: newPriority,
      status: 'To Do',
      deadline: newDeadline || '2026-06-30'
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
    setNewAssignee('');
    setNewDeadline('');
    setShowModal(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-royal/10 text-royal font-bold text-xs rounded-full">
            <CheckSquare size={14} />
            <span>Gestion des Tâches</span>
          </div>
          <h2 className="text-2xl font-black font-montserrat text-navy">To-Do List & Suivi des Responsabilités</h2>
          <p className="text-xs text-slate-500">Organisez, assignez et suivez l’avancement des projets du club.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-energeticOrange hover:bg-energeticOrange/90 text-white font-bold rounded-2xl text-xs shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Plus size={16} />
          <span>Nouvelle Tâche</span>
        </button>
      </div>

      {/* Tasks Table / Grid */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-montserrat font-bold text-navy text-base">Liste des Tâches Actuelles</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {tasks.map((task) => (
            <div key={task.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    task.priority === 'High' ? 'bg-red-100 text-red-600' :
                    task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar size={12} /> {task.deadline}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-navy font-montserrat">{task.title}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <User size={12} className="text-royal" /> Assigné à : <span className="font-semibold text-navy">{task.assignee}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border-0 shadow-sm ${
                    task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                    task.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <option value="To Do">À faire</option>
                  <option value="In Progress">En cours</option>
                  <option value="Completed">Terminé</option>
                </select>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Task */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-navy/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white text-navy p-8 rounded-3xl max-w-lg w-full space-y-6 shadow-2xl"
          >
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold font-montserrat text-navy">Créer une Nouvelle Tâche</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-navy font-bold">✕</button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Titre de la tâche</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Valider le planning des événements..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Assigné à</label>
                  <input
                    type="text"
                    placeholder="Nom du membre"
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Priorité</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy"
                  >
                    <option value="Low">Faible</option>
                    <option value="Medium">Moyenne</option>
                    <option value="High">Haute</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Date limite (Deadline)</label>
                <input
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-energeticOrange hover:bg-energeticOrange/90 text-white font-bold rounded-xl text-xs shadow-lg"
              >
                Enregistrer la tâche
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}