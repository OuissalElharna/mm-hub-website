import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importation des pages publiques
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import CommunityPage from './pages/CommunityPage';

// Activation de l'admin uniquement en mode local (.env.local)
const isAdminEnabled = import.meta.env.VITE_ENABLE_ADMIN === 'true';

// Chargement dynamique de l'admin uniquement si activé localement
const AuthProvider = isAdminEnabled
  ? lazy(() => import('./admin/context/AuthContext').then((m) => ({ default: m.AuthProvider })))
  : ({ children }) => <>{children}</>;

const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminTasks = lazy(() => import('./admin/AdminTasks'));
const AdminCms = lazy(() => import('./admin/AdminCms'));
const AdminMessages = lazy(() => import('./admin/AdminMessages'));

export default function App() {
  const [lang, setLang] = useState('fr');

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-navy font-bold">Chargement...</div>}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Les pages publiques du site */}
            <Route path="/" element={<HomePage lang={lang} setLang={setLang} />} />
            <Route path="/about" element={<AboutUsPage lang={lang} setLang={setLang} />} />
            <Route path="/events" element={<EventsPage lang={lang} setLang={setLang} />} />
            <Route path="/events/:id" element={<EventDetailPage lang={lang} setLang={setLang} />} />
            <Route path="/community" element={<CommunityPage lang={lang} setLang={setLang} />} />

            {/* Routes Admin : accessibles UNIQUEMENT en local */}
            {isAdminEnabled ? (
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="tasks" element={<AdminTasks />} />
                <Route path="cms" element={<AdminCms />} />
                <Route path="messages" element={<AdminMessages />} />
              </Route>
            ) : (
              <Route path="/admin/*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </Router>
      </AuthProvider>
    </Suspense>
  );
}