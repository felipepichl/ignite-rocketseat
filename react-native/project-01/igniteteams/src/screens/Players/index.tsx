import { useState } from 'react'
import { FlatList } from 'react-native'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title='Nova Turma'
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input 
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />

        <ButtonIcon
          icon='add' 
          type='SECONDARY'
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(team)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>

      </HeaderList>


    </Container>
  );
}