import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/interfaces/User';
import { useRouter } from 'next/router';

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  setToken: (token: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  let tokenLogin = "";

  const fetchUser = async (token: string) => {
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

  useEffect(() => {
    const token = tokenLogin;
    if (!token) {
        return ;
    }

    fetchUser(token);
  }, []);

  const logout = () => {
    setUser(null);
    console.log('User logged out');
    router.push("/login");
  };

  const setToken = async (token: string) => {
    tokenLogin=token;
    await fetchUser(tokenLogin);
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, setToken }}>
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