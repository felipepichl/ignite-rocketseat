import { UserDTO } from '@dtos/UserDTO';
import { createContext, ReactNode } from 'react';

type AuthContextDataProps = {
  user: UserDTO;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Felipe',
        email: 'felipe@email.com',
        avatar: 'felipe.png'
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextDataProps, AuthContextProvider };