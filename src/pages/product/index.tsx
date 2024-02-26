import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';

export default function Product() {
  return (
    <>
      <Head>
        <title>Painel - Açai no kilo</title>
      </Head>
      <Header />

      <Box
      display={'flex'}
      alignItems={'center'}
      color={"#fff"}
      marginTop={'200px'}
      justifyContent={'center'}
      fontSize={40}
      >
        Página Menu
      </Box>

      <Footer />
    </>
  )
}

