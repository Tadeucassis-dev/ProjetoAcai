import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from 'nookies'
import Router from "next/router";
import { api } from "@/services/apiClient";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: Boolean;
  SignIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
}

type UserProps = {
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

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch {
    console.log('erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({ id: '', name: '', email: '' })
  const isAuthenticated = !!user;

  async function SignIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password

      })

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        path: "/"
      })

      setUser({
        id,
        name,
        email,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')

    } catch (err) {
      console.log("ERRO AO ACESSAR", err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, SignIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}