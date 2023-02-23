import { Heading, HStack, Text, VStack } from 'native-base'

function HomeHeader() {
  return (
    <HStack>
      <VStack>
        <Text>Ola</Text>

        <Heading>
          Felipe
        </Heading>
      </VStack>
    </HStack>
  );
}

export { HomeHeader }