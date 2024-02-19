/* eslint-disable react/jsx-no-comment-textnodes */
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function Header() {

  const { signOut } = useContext(AuthContext)

  return (
    <Heading height={'5rem'}>
      <Box
        maxWidth='1700px'
        padding='1rem 2rem'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        paddingTop='1rem'
      >
        <Box marginRight={1}>
          <Link href='/dashboard' >
            <div style={{ cursor: 'pointer' }}>
              <Image src='/acainokilo.png' alt='' width={190} height={60} />
            </div>
          </Link>
        </Box>
        <Box
          display='flex'
          alignItems='center'
        >
          <Text
            color='#fff'
            fontSize={20}
            marginLeft='2px'
            fontFamily={'sans-serif'}
            _hover={{ color: 'yellow', transform: 'scale(1.2)', transition: 'transform 0.8s' }}
          >
            <Link href='/category' >
              Categoria
            </Link>
          </Text>

          <Text
            color='#fff'
            marginLeft='1rem'
            fontSize={20}
            fontFamily={'sans-serif'}
            _hover={{ color: 'yellow', transform: 'scale(1.2)', transition: 'transform 0.8s' }}
          >
            <Link href='/product'>
              Cardápio
            </Link>
          </Text>

          <Button
            onClick={signOut}
            marginLeft='1rem'
            backgroundColor='transparent'
            _hover={{ transform: 'scale(1.2)', }}
          >
            <FiLogOut color='#fff' size={24} />
          </Button>
        </Box>
      </Box>
    </Heading>
  );
}