import { useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Container } from './styles';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button'
import { Loading } from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>(['Galera da Rocket', 'Amigos']);

  const { navigate } = useNavigation()

  function handNewGroup() {
    navigate('new');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await groupsGetAll();
      
      setGroups(data);

    } catch (error) {
      console.error(error);
      Alert.alert('Turmas', 'Não foi possível carregar as turmas');
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigate('players', { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  );

  return (
    <Container >
      <Header />

      <Highlight 
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      {
        isLoading ? <Loading /> : 
          <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard 
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty 
              message='Que tal cadastrar uma nova turma'
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      }
      

      <Button 
        title='Criar nova turma'
        onPress={handNewGroup}
      />
    </Container>
  );
}