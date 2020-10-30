import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';



interface User {
  id: string;
  nome: string;
  login: string;
  senha: string;
}

interface AuthState {
  // token: string;
  user: User;
}

interface SignInCredentials {
  login:string,
  senha:string,
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;}



const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {    
    //const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@Unisales:user');

    if (user) {    
        return {user: JSON.parse(user) };
    }
    //console.log(data);
    return {} as AuthState;
  });

  const signOut = useCallback(() => {   
    localStorage.removeItem('@Unisales:user');
    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ login, senha }) => {
    const response = await api.post('autenticacao', {
      login,
      senha,
    });

    const { usuario } = response.data;
    // console.log(usuario);  
   
    localStorage.setItem('@Unisales:user', JSON.stringify(usuario));
    setData(usuario);
   
    // console.log(data);
    // console.log(localStorage);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Unisales:user', JSON.stringify(user));

      setData({       
        user,
      });
     
    },
    [setData, data.user],
    
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user,signIn,signOut,updateUser}}
    >
      {children}      
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
