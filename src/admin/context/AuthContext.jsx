import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
const ALERT_API_URL = 'http://localhost:4000/api/login-alert';

function getDeviceSummary() {
  if (typeof navigator === 'undefined') return 'Appareil inconnu';
  const ua = navigator.userAgent;
  const platform = navigator.platform || 'Système inconnu';
  let browser = 'Navigateur inconnu';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome\//i.test(ua)) browser = 'Chrome';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari';
  return `${browser} sur ${platform}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('mm_admin_user')) || null;
  });

  const login = (email, adminCode) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = adminCode.trim();

    // Vérification stricte des identifiants Super Admin
    if (cleanEmail === 'cortexoperation10@gmail.com' && cleanCode === 'm&m2026ouissal') {
      const device = getDeviceSummary();
      const loginTime = new Date().toISOString();

      const adminData = {
        email: 'cortexoperation10@gmail.com',
        role: 'SUPER_ADMIN',
        name: 'Ouissal Elharna',
        poste: 'Chief Information Officer (CIO)',
        avatar: '/images/avatar-admin.jpg',
        lastLoginAt: loginTime,
        lastDevice: device,
      };

      setUser(adminData);
      localStorage.setItem('mm_admin_user', JSON.stringify(adminData));

      // Envoi sécurisé de l'alerte vers le backend local (sans bloquer la connexion)
      fetch(ALERT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: adminData.email,
          device,
          loginTime,
        }),
      }).catch((err) => {
        console.warn('Alerte email non envoyée (vérifier le serveur local):', err);
      });

      return { success: true };
    } else {
      return { success: false, message: 'Email ou Code Admin incorrect !' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mm_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);