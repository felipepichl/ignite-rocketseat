import { VStack } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';

function Profile() {
  return (
    <VStack
      flex={1}
    >
      <ScreenHeader title='Perfil'/>
    </VStack>
  );
}

export { Profile }