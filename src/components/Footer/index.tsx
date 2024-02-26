import { Box } from "@chakra-ui/react";

export function Footer() {
  return (
<Box
display={'flex'}
alignItems={'center'}
justifyContent={'center'}
backgroundColor={'#FFD700'}
height={'40px'}
position="fixed" 
bottom="0"
width="100%"
>
  Todos os direitos reservados - CNPJ 000.000.0000-00
</Box>
)
}

export default Footer;