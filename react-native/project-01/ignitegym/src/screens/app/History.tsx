import { useState } from 'react';
import { Heading, VStack, SectionList, Text } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';

function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ['Puxada Frontal', 'Remada Unilateral']
    },
    {
      title: '27.08.22',
      data: ['Puxada Frontal']
    }
  ]);

  return (
    <VStack
      flex={1}
    >
      <ScreenHeader title="Histórico de Exercícios"/>

      <SectionList 
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
            mt={10}
            mb={3}
          >
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          [].length === 0 && {flex: 1, justifyContent: 'center'}
        }
        ListEmptyComponent={() => (
          <Text
            color="gray.100"
            textAlign='center'
          >
            Não há exercícios registrado ainda. {'\n'}
            Vamos treinar.
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />

    </VStack>
  );
}

export { History }