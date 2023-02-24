import { VStack } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';

function History() {
  return (
    <VStack
      flex={1}
    >
      <ScreenHeader title="Histórico de Exercícios"/>
    </VStack>
  );
}

export { History }