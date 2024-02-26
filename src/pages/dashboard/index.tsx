import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { Text, HStack, Box } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Painel - Açai no kilo</title>
      </Head>

      <Header />

      <HStack marginTop='180px' height={300} color={'#fff'} fontSize={40} ml={'150px'} >

        <Text
          fontSize={20}
          mr={20}
          w={600}
        >
         Descubra a nossa incrível variedade de sorvetes artesanais, sanduíches frescos e o nosso irresistível açaí, preparados com os melhores ingredientes e cuidadosamente selecionados para oferecer uma experiência verdadeiramente deliciosa. Visite-nos hoje mesmo e mergulhe em uma jornada de sabores gelados que vão encantar o seu paladar e refrescar o seu dia!
        </Text>
        <div>
          <Image src='/acai3.png' alt='' width={500} height={300} />
        </div>
      </HStack>
      <Footer />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})