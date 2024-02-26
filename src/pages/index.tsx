import Head from "next/head"
import Image from 'next/image'
import { Box } from "@chakra-ui/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from '../styles/home.module.scss'
import acainokilo from '../assets/acainokilo.png'
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { canSSRGuest } from "@/utils/canSSRGuest";
import Footer from "@/components/Footer";

export default function Home() {
  const { SignIn } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (email === '' || password === '') {
      alert("preencha os dados")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await SignIn(data);

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
          <title>Açai no kilo - Faça seu login</title>
        </Head>
        <div className={styles.containerCenter}>
          <Image src={acainokilo} alt="Logo Sujeito Pizzaria" priority={true} />

          <div className={styles.login}>
            <form onSubmit={handleLogin}>

              <Input
                placeholder='Digite seu email'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder='Digite sua senha'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type='submit'
                loading={loading}
              >
                Acessar
              </Button>

            </form>
            <Link href='/signup' legacyBehavior>
              <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
            </Link>
          </div>
        </div>
        <Footer/>
      </Box>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})