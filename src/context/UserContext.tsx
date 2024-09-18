import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { parseCookies } from 'nookies';
import { User } from '@/interfaces/User';

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (!token) {
        throw new Error('Token não encontrado nos cookies');
    }

    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do usuário');
        }

        const data = await response.json();
        setUser({ ...data, token});
        
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    setUser(null);
    console.log('User logged out');
    // Adicione a lógica de logout aqui
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};