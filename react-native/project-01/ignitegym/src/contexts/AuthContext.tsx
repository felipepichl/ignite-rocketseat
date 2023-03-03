import { UserDTO } from '@dtos/UserDTO';
import { createContext, ReactNode, useState } from 'react';

type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void; 
}

type AuthContextProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    id: '1',
    name: 'Felipe',
    email: 'felipe@email.com',
    avatar: 'felipe.png'
  });

  function signIn(email: string, password: string) {
    setUser({
      id: '',
      name: '',
      email, 
      avatar: ''
    })
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextDataProps, AuthContextProvider };