import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from "next/router";
import { api } from "@/services/apiClient";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: Boolean;
  SignIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  SignUp: (credentials: SignUpProps) => Promise<void>;
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

type SignUpProps = {
  name: string;
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
    Router.push('')
  } catch {
    console.log('erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({ id: '', name: '', email: '' })
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
      api.get('/me').then(response => {
        const { id, name, email } = response.data;

        setUser({
          id,
          name,
          email
        })
      })
        .catch(() => {
          signOut();
        })
    }
  }, [])

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

  async function SignUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        name,
        email,
        password
      })

      console.log('Cadastrado com sucesso!')
      Router.push('/')

    } catch (err) {
      console.log('erro ao cadastrar', err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, SignIn, signOut, SignUp }}>
      {children}
    </AuthContext.Provider>
  )
}