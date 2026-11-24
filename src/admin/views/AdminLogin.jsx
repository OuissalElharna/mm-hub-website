import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

const ALERT_API_URL = 'http://localhost:4000/api/login-alert';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = login(email, adminCode);

      if (!res.success) {
        setError(res.message);
        return;
      }

      // Envoi sécurisé de l'alerte via le backend local (sans bloquer la connexion si le serveur d'alerte est arrêté)
      try {
        await fetch(ALERT_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: res.user?.email || email.trim().toLowerCase(),
            device: res.device || 'Appareil inconnu',
            loginTime: res.loginTime || new Date().toISOString(),
          }),
        });
      } catch (alertErr) {
        console.warn('Alerte email non envoyée (vérifier le serveur local):', alertErr);
      }

      navigate('/admin/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6 text-white font-montserrat">
      <div className="bg-white text-navy p-8 sm:p-12 rounded-3xl max-w-md w-full shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-energeticOrange/10 text-energeticOrange rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-black">Espace Administration</h1>
          <p className="text-xs text-slate-500">Accès restreint au Bureau Exécutif M&M-HUB</p>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-600 rounded-xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Adresse E-mail Admin</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3.5 text-slate-400" />
              <input
                type="email"
                required
                placeholder="cortexoperation10@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Code Admin Sécurisé</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3.5 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-energeticOrange hover:bg-energeticOrange/90 disabled:opacity-60 text-white font-bold rounded-xl text-xs shadow-lg transition-transform hover:scale-[1.01]"
          >
            {isSubmitting ? 'Connexion en cours...' : 'Se connecter au Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}