import { Heading, HStack, Text, VStack } from 'native-base'

import { UserPhoto } from './UserPhoto'

function HomeHeader() {
  return (
    <HStack
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
      alignItems="center"
    >
      <UserPhoto 
        source={{ uri: 'https://github.com/felipepichl.png' }}
        alt="Imagem do Usuário"
        size={16}
        mr={4}
      />

      <VStack>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md">
          Felipe
        </Heading>
      </VStack>
    </HStack>
  );
}

export { HomeHeader }