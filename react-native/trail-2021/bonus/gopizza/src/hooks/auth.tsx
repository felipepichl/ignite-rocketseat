import React, {
  createContext,
  useContext,
  useState,
  ReactNode
} from 'react';
import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type User = {
  id: string;
  name: string;
  isAdmin: string;
}

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  isLogging: boolean;
  user: User | null;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData); 

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogging, setIsLogging] = useState(false);

  async function signIn(email:string, password: string) {
    if (!email || !password) {
      Alert.alert('Login', 'Informe o email ou a senha');
    }

    setIsLogging(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(account => {
        firestore()
          .collection('users')
          .doc(account.user.uid)
          .get()
          .then(profile => {
            const { name, isAdmin } = profile.data() as User;

            if (profile.exists) {
              const userDate = {
                id: account.user.uid,
                name,
                isAdmin
              }

              setUser(userDate);
            }
          })
          .catch(() => {
            Alert.alert(
              'Login', 
              'Não foi possível buscar os dados de perfil do usuário'
            )
          })



      })
      .catch(err => {
        const { code } = err;

        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          Alert.alert('Login', 'Email e/ou senha inválido');
        } else {
          Alert.alert('Login', 'Não foi possível realizar o login');
        }
      }).finally(() => setIsLogging(false));

  }

  return (
    <AuthContext.Provider value={{
      signIn,
      isLogging
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