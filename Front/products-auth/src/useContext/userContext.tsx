import { createContext, useState } from 'react';
import { User } from '../types/user';
import axios from 'axios';
import { useNavigate } from 'react-router';

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  signUp: (user: User) => void;
  signIn: (user: User) => void;
};

type UserContextProviderType = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const signUp = async (user: User) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/register',
        user
      );
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error('Error signing up');
    }
  };

  const signIn = async (user: User) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/login',
        user
      );
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error('Error signing in');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, signUp, signIn }}>
      {children}
    </UserContext.Provider>
  );
};
