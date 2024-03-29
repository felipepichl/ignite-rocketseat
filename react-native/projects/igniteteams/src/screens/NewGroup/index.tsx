import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import { Container, Content, Icon } from './styles'

import { AppError } from '@utils/AppError';
import { groupCreate } from '@storage/group/groupCreate';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

export function NewGroup() {
  const [group, setGroup] = useState('');
  
  const navigation = useNavigation();

  async function handleNew() {
    try {
      if(group.trim().length === 0) {
        return Alert.alert('New Group', 'Name should have be informed');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });    

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Group', error.message);
      } else {
        Alert.alert('New Group', 'Error to create a new Group');
        console.error(error);
      }
    }
  }
  
  return (
    <Container >
      <Header showBackButton/>

      <Content>
        <Icon />
        <Highlight 
          title='Nova Turma'
          subtitle='crie a turma para adicionar as pessoas'
        />

        <Input 
          placeholder='Nome da turma'
          onChangeText={setGroup}
        />

        <Button 
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  );
}

