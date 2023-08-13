import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';
import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  isAdmin: string;
}

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>
  isLogging: boolean;
  user: User | null;
}

type AuthProviderProps = {
  children: ReactNode;
}

const USER_COLLECTION = '@gopizza:users';

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
          .then(async profile => {
            const { name, isAdmin } = profile.data() as User;

            if (profile.exists) {
              const userDate = {
                id: account.user.uid,
                name,
                isAdmin
              }

              await AsyncStorage.setItem(
                USER_COLLECTION, 
                JSON.stringify(userDate)
              );
              
              setUser(userDate);
            }
          })
          .catch(() => {
            Alert.alert(
              'Login', 
              'Não foi possível buscar os dados de perfil do usuário'
            )
          });
      })
      .catch(err => {
        const { code } = err;

        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          Alert.alert('Login', 'Email e/ou senha inválido');
        } else {
          Alert.alert('Login', 'Não foi possível realizar o login');
        }
      }).finally(() => setIsLogging(false));

  };

  async function loadUserStorageData() {
    setIsLogging(true);

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;

      setUser(userData);
    }

    setIsLogging(false);
  };

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);

    setUser(null);
  }

  async function forgotPassword(email:string) {
    if (!email) {
      return Alert.alert('Redefinir senha', 'Informe o e-mail');
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Redefinir senha', 
          'Um link de redefinição foi enviado para o seu email'
        )
      })
      .catch(() => {
        Alert.alert(
          'Redefinir senha', 
          'Não foi possível enviar o e-mail para redefinir sua senha'
        )
      })
  }

  useEffect(() => {
    loadUserStorageData()
  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      forgotPassword,
      isLogging,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth }