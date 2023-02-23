import { VStack } from 'native-base';

import { HomeHeader } from '@components/HomeHeader';

function Home() {
  return (
    <VStack
      flex={1}
    >
      <HomeHeader />
    </VStack>
  );
}

export { Home }