import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const SAMPLE_USERS = [
  { email: 'demo@riyasewana.com', password: 'demo123', name: 'Demo User', phone: '0771234567', city: 'Colombo' },
  { email: 'test@riyasewana.com', password: 'test123', name: 'Test User', phone: '0769876543', city: 'Kandy' },
];

function loadUser() {
  try {
    const stored = localStorage.getItem('riya_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveUser(user) {
  localStorage.setItem('riya_user', JSON.stringify(user));
}

function clearUser() {
  localStorage.removeItem('riya_user');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  const login = useCallback((email, password) => {
    const match = SAMPLE_USERS.find(u => u.email === email && u.password === password);
    if (!match) return false;
    const { password: _pw, ...userData } = match;
    setUser(userData);
    saveUser(userData);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearUser();
  }, []);

  const register = useCallback((data) => {
    const userData = { name: data.name || 'New User', email: data.email, phone: data.phone || '', city: data.city || '' };
    setUser(userData);
    saveUser(userData);
    return true;
  }, []);

  const updateProfile = useCallback((data) => {
    setUser(prev => {
      const updated = { ...prev, ...data };
      saveUser(updated);
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export { SAMPLE_USERS };
