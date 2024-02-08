import Head from "next/head"
import Image from 'next/image'
import { Box } from "@chakra-ui/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from '../../styles/home.module.scss'
import acainokilo from '../../assets/acainokilo.png'
import Link from "next/link";

export default function SignUp() {
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
          <Image src={acainokilo} alt="Logo Sujeito Pizzaria" />

          <div className={styles.login}>
            <h1>Criando sua conta</h1>
            <form>

              <Input
                placeholder='Digite seu nome'
                type="text"
              />

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
                Cadastrar
              </Button>
            </form>
            <Link href={'/'} legacyBehavior>
            <a className={styles.text}>Já possui uma conta? Faça o login!</a>
            </Link>
          </div>
        </div>
      </Box>
    </>
  );
}
