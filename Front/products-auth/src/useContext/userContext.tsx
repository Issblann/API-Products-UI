import { createContext, useState } from 'react';
import { User } from '../types/user';
import axios from 'axios';

export type UserContextType = {
  user: User | null;
  setUser: any;
  signUp: (user: User) => void;
};

type UserContextProviderType = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<User | null>(null);

  const signUp = async (user: User) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/register',
        user
      );
      const data = await response.data;

      setUser(data);
    } catch (error) {
      throw new Error('Error signing up');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, signUp }}>
      {children}
    </UserContext.Provider>
  );
};
