import { Header } from "@/components/Header";
import Head from "next/head";
import { VStack, Text, Input, FormControl, Button } from '@chakra-ui/react';
import { useState, FormEvent } from 'react';
import { setupAPIClient } from "@/services/api";
import { toast } from 'react-toastify'
import Footer from "@/components/Footer";

export function Category() {
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === '') {
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post('/category', {
      name
    })

    toast.success('Categoria cadastrada com sucesso!')
    setName('');
  }

  return (
    <>
      <Head>
        <title>Nova Categoria - Açai no Kilo</title>
      </Head>
      <div>
        <Header />

        <VStack
          maxWidth={720}
          margin='12rem auto'
          padding='0 2rem'
          display='flex'
          justifyContent='space-between'
          flexDirection='column'

        >
          <Text
            marginLeft={6}
            color='#fff'
            fontSize={26}
          >
            Cadastrar Categoria
          </Text>

          <form onSubmit={handleRegister} className="form">
            <FormControl
              display='flex'
              flexDirection='column'
              margin='1rem'
            >
              <Input
                type="text"
                max-height='40x'
                placeholder="Digite o nome da categoria"
                backgroundColor='#ba55d37a'
                borderRadius='0.3rem'
                color='#fff'
                marginBottom='1rem'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Button
                type="submit"
                height={'40px'}
                border={0}
                backgroundColor={'gray.200'}
              >
                Cadastrar
              </Button>
            </FormControl>
          </form>
        </VStack>
      </div>
      <Footer />
    </>
  )
}

export default Category;