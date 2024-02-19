import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { VStack, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Painel - Açai no kilo</title>
      </Head>

      <Header />

      <VStack marginTop={300} color={'#fff'} fontWeight={'bold'} fontSize={40}>
        <Text>dashbord</Text>
      </VStack>

    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})