import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const ALLOWED_EMAIL = 'cortexoperation10@gmail.com';
const ALLOWED_PASSWORD = 'bigbig2007';

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
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('mmhub_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail === ALLOWED_EMAIL && cleanPassword === ALLOWED_PASSWORD) {
      const device = getDeviceSummary();
      const loginTime = new Date().toISOString();

      const user = {
        id: 'usr-1',
        name: 'Ouissal Executive',
        email: ALLOWED_EMAIL,
        role: 'SUPER_ADMIN',
        title: 'Présidente / Super Admin',
        lastLoginAt: loginTime,
        lastDevice: device,
      };

      setCurrentUser(user);
      localStorage.setItem('mmhub_admin_user', JSON.stringify(user));

      const logs = JSON.parse(localStorage.getItem('mmhub_login_logs') || '[]');
      logs.unshift({
        id: Date.now(),
        email: ALLOWED_EMAIL,
        device,
        date: new Date().toLocaleString('fr-FR'),
      });
      localStorage.setItem('mmhub_login_logs', JSON.stringify(logs.slice(0, 20)));

      return { success: true, user, device, loginTime };
    }

    return { success: false, message: 'Email ou Code Admin incorrect !' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mmhub_admin_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);