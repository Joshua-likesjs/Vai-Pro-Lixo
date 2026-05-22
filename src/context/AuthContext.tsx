import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { USERS_KEY, loadData, saveData } from '../data/storage';

export interface User {
  nome: string;
  email: string;
  senha: string;
  idade: string;
  tipoUso: 'empresa' | 'casa' | '';
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, senha: string) => boolean;
  register: (data: Omit<User, 'tipoUso'>) => boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, senha: string): boolean => {
    const users: User[] = loadData(USERS_KEY) ?? [];
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const register = (data: Omit<User, 'tipoUso'>): boolean => {
    const users: User[] = loadData(USERS_KEY) ?? [];
    const exists = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
    if (exists) return false;
    const newUser: User = { ...data, tipoUso: '' };
    const updated = [...users, newUser];
    saveData(USERS_KEY, updated);
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    const users: User[] = loadData(USERS_KEY) ?? [];
    const newUsers = users.map((u) =>
      u.email === user.email ? updated : u
    );
    saveData(USERS_KEY, newUsers);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
