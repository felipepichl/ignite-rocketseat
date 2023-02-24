import { useState } from 'react';
import { HStack, VStack } from 'native-base';

import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';

function Home() {
  const [groupSelected, setGroupSelected] = useState('Costa');

  return (
    <VStack
      flex={1}
    >
      <HomeHeader />

      <HStack>
        <Group 
          name='Costa' 
          isActive
          onPress={() => setGroupSelected('Costas')}
        />
        <Group 
          name='Ombro' 
          isActive
          onPress={() => setGroupSelected('Ombro')}
        />
      </HStack>
    </VStack>
  );
}

export { Home }