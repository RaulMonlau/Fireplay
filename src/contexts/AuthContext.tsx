// src/contexts/AuthContext.tsx (Actualización)
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // Guardar estado en cookie para el middleware
      if (currentUser) {
        Cookies.set('fireplayAuth', 'true', { expires: 7 });
      } else {
        Cookies.remove('fireplayAuth');
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      setUser(result.user);
      Cookies.set('fireplayAuth', 'true', { expires: 7 });
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Error en el registro');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      Cookies.set('fireplayAuth', 'true', { expires: 7 });
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Error en el inicio de sesión');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      Cookies.remove('fireplayAuth');
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Error al cerrar sesión');
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};