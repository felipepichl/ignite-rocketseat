import { createContext, ReactNode, useState, useEffect } from 'react';

import { 
  storageUserSave, 
  storageUserGet,
  storageUserRemove,
} from '@storage/storageUser';

import { api } from '@services/api';
import { UserDTO } from '@dtos/UserDTO';

type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>; 
  signOut: () => Promise<void>; 
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
      
      if(data.user && data.token) {
        setUser(data.user);
        storageUserSave(data.user);
      }

    } catch (error) {
      throw error;
    } 
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);

      await storageUserRemove();

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
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
      signOut,
      isLoadingUserStorageData
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextDataProps, AuthContextProvider };