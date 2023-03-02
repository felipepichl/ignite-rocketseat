import { UserDTO } from '@dtos/UserDTO';
import { createContext } from 'react';

type AuthContextDataProps = {
  user: UserDTO;
}

const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export { AuthContext };