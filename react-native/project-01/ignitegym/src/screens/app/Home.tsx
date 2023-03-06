import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Heading, HStack, VStack, Text, useToast } from 'native-base';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';
import { ExerciseCard } from '@components/ExerciseCard';

import { AppNavigationRoutesProps } from '@routes/app.routes'

function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState([
    'Puxada Frontal', 
    'Remada Curvada', 
    'Remada Unilateral', 
    'Levantamento Terra', 
  ]);
  const [groupSelected, setGroupSelected] = useState('Costas');

  const toast = useToast();
  const navigation = useNavigation<AppNavigationRoutesProps>()

  function handleOpenExercisesDetails() {
    navigation.navigate('exercise');
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');

      setGroups(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError 
        ? error.message 
        : 'Não foi possível carregar os grupos musculares.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  useEffect(() => {
    fetchGroups();
  }, [])

  return (
    <VStack
      flex={1}
    >
      <HomeHeader />
      
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group 
            name={item} 
            isActive={
              groupSelected.toLocaleUpperCase() === 
              item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>


        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard 
              onPress={handleOpenExercisesDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      
      </VStack>
    </VStack>
  );
}

export { Home }