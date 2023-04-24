import React, { 
  createContext, 
  ReactNode, 
  useContext 
} from 'react';

import * as AuthSession from 'expo-auth-session';


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
  signInWithGoogle(): Promise<void>
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }:AuthProviderProps) {
  const user = {
    id: 'hash123',
    name: 'Felipe',
    email: 'felipe@email.com'
  }

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = '335105956012-3ih8dtve7km367ih4go3tge7nf41c25l.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@dirname/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });
      console.log(response);

    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }