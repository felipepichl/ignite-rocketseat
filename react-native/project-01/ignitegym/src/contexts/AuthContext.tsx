import { createContext, ReactNode, useState, useEffect } from 'react';

import { storageUserSave, storageUserGet } from '@storage/storageUser';

import { api } from '@services/api';
import { UserDTO } from '@dtos/UserDTO';

type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>; 
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });
      
      if(data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }

    } catch (error) {
      throw error;
    } 
  }

  async function loadUserData() {
    try {
      
      const userLogged = await storageUserGet();
  
      if (userLogged) {
        setUser(userLogged);
      }

    } catch (error) {
      throw error;
      
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      isLoadingUserStorageData
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextDataProps, AuthContextProvider };