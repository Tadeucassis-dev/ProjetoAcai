import { createContext, ReactNode, useState } from "react";


type AuthContextData = {
  user: UserProps;
  isAuthenticated: Boolean;
  SignIn: (credentials: SignInProps)=> Promise<void>;
  }

  type UserProps= {
    id: string;
    name: string;
    email: string;
  }

  type SignInProps = {
    email: string;
    password: string;
  }

  type AuthProviderProps = {
    children: ReactNode
  }


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}:AuthProviderProps){
  const[user, setUser] = useState<UserProps>({ id: '', name: '', email: '' })
  const isAuthenticated = !!user;

  async function SignIn(){
    alert('CLICOU NO LOGIN')
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, SignIn }}>
      {children}
    </AuthContext.Provider>
  )
}