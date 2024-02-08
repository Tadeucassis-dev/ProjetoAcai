import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles/global.scss'
import { AuthProvider } from '@/contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {

  return (

    <AuthProvider>
      <ChakraProvider>
        <Component{...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp;