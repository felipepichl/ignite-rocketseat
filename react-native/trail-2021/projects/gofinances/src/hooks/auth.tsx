import React, { 
  createContext, 
  ReactNode, 
  useContext 
} from 'react';

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
  user: IUser
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }:AuthProviderProps) {
  const user = {
    id: 'hash123',
    name: 'Felipe',
    email: 'felipe@email.com'
  }

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }