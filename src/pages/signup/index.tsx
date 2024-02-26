import Head from "next/head"
import Image from 'next/image'
import { Box } from "@chakra-ui/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from '../../styles/home.module.scss'
import acainokilo from '../../assets/acainokilo.png'
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";

export default function SignUp() {
  const{ SignUp } = useContext(AuthContext)

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [loading,setLoading] = useState(false)

  async function handleSignUp(event:FormEvent) {
    if(name === '' || email === '' || password === ''){
      alert('Preencha todos os campos')
      return;
    }

    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    await SignUp(data)

    setLoading(false);

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
          <title>Faça seu cadastro agora</title>
        </Head>
        <div className={styles.containerCenter}>
        <Image src={acainokilo} alt="Logo Sujeito Pizzaria" priority={true} />

          <div className={styles.login}>
            <h1>Criando sua conta</h1>

            <form onSubmit={handleSignUp}>

              <Input
                placeholder='Digite seu nome'
                type="text"
                value={name}
                onChange={(e)=> setName(e.target.value)}
              />

              <Input
                placeholder='Digite seu email'
                type="text"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />

              <Input
                placeholder='Digite sua senha'
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />

              <Button
                type='submit'
                loading={loading}
              >
                Cadastrar
              </Button>
            </form>
            <Link href={'/'} legacyBehavior>
            <a className={styles.text}>Já possui uma conta? Faça o login!</a>
            </Link>
          </div>
        </div>
        <Footer/>
      </Box>
    </>
  );
}
