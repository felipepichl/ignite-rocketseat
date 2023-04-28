import React, { 
  createContext, 
  ReactNode, 
  useContext, 
  useEffect, 
  useState
} from 'react';
import { CLIENT_ID, REDIRECT_URI } from 'react-native-dotenv';


import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: ReactNode; 
}

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string
}

interface IAuthContextData {
  user: IUser;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }:AuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@gofinances:user';

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AuthorizationResponse;
      
      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLogged = {
          id: String(userInfo.id),
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        }

        setUser(userLogged);
        await AsyncStorage.setItem(
          userStorageKey, JSON.stringify(userLogged)
        );
      }

    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as IUser);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageDate() {
      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if(userStorage) {
        const userLogged = JSON.parse(userStorage) as IUser;
        setUser(userLogged);
      }
      setUserStorageLoading(false);
    }

    loadUserStorageDate();
  }, []);

  return (
    <AuthContext.Provider value={{
      user, 
      signInWithGoogle,
      signOut,
      userStorageLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }