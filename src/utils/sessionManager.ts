import { User, Session } from '../types';

const SESSION_KEY = 'texnoai_session';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

export const createSession = (user: User): Session => {
  const session: Session = {
    user,
    expiresAt: Date.now() + SESSION_DURATION
  };
  
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

export const getSession = (): Session | null => {
  try {
    const sessionData = sessionStorage.getItem(SESSION_KEY);
    if (!sessionData) return null;
    
    const session: Session = JSON.parse(sessionData);
    
    if (Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Session error:', error);
    clearSession();
    return null;
  }
};

export const clearSession = (): void => {
  sessionStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};

export const getCurrentUser = (): User | null => {
  const session = getSession();
  return session ? session.user : null;
};

export const hasRole = (requiredRole: 'admin' | 'editor'): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (requiredRole === 'admin') {
    return user.role === 'admin';
  }
  
  return user.role === 'admin' || user.role === 'editor';
};
