import Head from "next/head"
import Image from 'next/image'
import { Box } from "@chakra-ui/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from '../styles/home.module.scss'
import acainokilo from '../assets/acainokilo.png'
import Link from "next/link";
import { FormEvent, useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { sign } from "crypto";

export default function Home() {
  const {SignIn} = useContext (AuthContext) 

  async function handleLogin(event:FormEvent){
    event.preventDefault()

    let data = {
      email: 'teste@teste.com',
      password: '123123'
    }

   await SignIn(data);
  }

  return (

    <>
      <Box
        minHeight={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        backgroundColor={'#8B008B'}
      >
        <Head>
          <title>Açai no kilo - Faça seu login</title>
        </Head>
        <div className={styles.containerCenter}>
          <Image src={acainokilo} alt="Logo Sujeito Pizzaria" />

          <div className={styles.login}>
            <form onSubmit={handleLogin}>

              <Input
                placeholder='Digite seu email'
                type="text"
              />

              <Input
                placeholder='Digite sua senha'
                type="password"
              />

              <Button
                type='submit'
                loading={false}
              >
                Acessar
              </Button>
              
            </form>
            <Link href='/signup' legacyBehavior>
              <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
            </Link>
          </div>
        </div>
      </Box>
    </>
  );
}
