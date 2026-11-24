import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { LayoutDashboard, CheckSquare, FileText, MessageSquare, LogOut, ShieldAlert } from 'lucide-react';

export default function AdminLayout() {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  // إيلا ماكانش الأدمن مسجل الدخول، كايخرج ليه نموذج التسجيل
  if (!user) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-4 font-inter">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const res = login(email, password);
            if (!res.success) setError(res.message);
          }}
          className="bg-white text-navy p-8 rounded-3xl w-full max-w-md space-y-4 shadow-2xl"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold font-montserrat">Dashboard M&M-HUB</h2>
            <p className="text-xs text-slate-500">Accès restreint au Bureau Exécutif</p>
          </div>
          {error && <p className="text-xs text-energeticOrange font-bold text-center">{error}</p>}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Email Admin</label>
            <input
              type="email"
              placeholder="cortexoperation10@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Code Admin</label>
            <input
              type="password"
              placeholder="••••••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy focus:outline-none focus:border-royal"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-energeticOrange text-white font-bold rounded-xl text-xs shadow-lg hover:bg-energeticOrange/90 transition-all">
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  const menuItems = [
    { path: '/admin', label: 'Vue générale', icon: LayoutDashboard },
    { path: '/admin/tasks', label: 'Gestion des Tâches', icon: CheckSquare },
    { path: '/admin/cms', label: 'CMS & Pages', icon: FileText },
    { path: '/admin/messages', label: 'Messages & Adhésions', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex font-inter text-navy">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white p-6 flex flex-col justify-between hidden md:flex shadow-2xl">
        <div className="space-y-8">
          <div>
            <h2 className="font-montserrat font-black text-xl text-softCyan tracking-wider">M&M.HUB Admin</h2>
            <p className="text-[10px] text-steelSlate pt-1">Super Admin Dashboard</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive ? 'bg-energeticOrange text-white shadow-lg' : 'text-steelSlate hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 bg-energeticOrange text-white rounded-full flex items-center justify-center font-bold text-xs">
              {user.name ? user.name.charAt(0) : 'O'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate text-white">{user.name || 'Ouissal Elharna'}</p>
              <p className="text-[10px] text-steelSlate truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl text-xs font-bold transition-all"
          >
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
          <h1 className="text-base font-bold font-montserrat text-navy">Tableau de Bord Administratif</h1>
          <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-600 font-bold rounded-full">
            ● Connecté (Super Admin)
          </span>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}