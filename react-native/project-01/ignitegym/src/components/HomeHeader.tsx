import { Heading, HStack, Text, VStack } from 'native-base'

function HomeHeader() {
  return (
    <HStack
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
      alignItems="center"
    >
      <VStack>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading>
          Felipe
        </Heading>
      </VStack>
    </HStack>
  );
}

export { HomeHeader }