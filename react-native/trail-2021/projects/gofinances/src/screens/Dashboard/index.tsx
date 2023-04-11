import React from 'react';

import { 
  Container, 
  Header,
  UserWrapper, 
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon, 
  HighlightCards,
  Transactions, 
  Title,
  TransactionList,
  LogoutButton 
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '04/04/2023'
    },
    {
      id: '2',
      type: 'negative',
      title: 'Hamburgueria Pizzy',
      amount: 'R$ 59,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '04/04/2023'
    },
    {
      id: '3',
      type: 'negative',
      title: 'Aluguel do apartamento',
      amount: 'R$ 1.200,00',
      category: {
        name: 'Casa',
        icon: 'shopping-bag'
      },
      date: '04/04/2023'
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo  source={{ uri: 'https://github.com/felipepichl.png' }}/>
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Felipe</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power"/>
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard 
          type='up'
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de Abril'
        />
        <HighlightCard 
          type='down'
          title='Saídas'
          amount='R$ 1.400,00'
          lastTransaction='Última entrada dia 15 de Abril'
        />
        <HighlightCard
          type='total' 
          title='Total'
          amount='R$ 16.000,00'
          lastTransaction='Última entrada dia 15 de Abril'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList 
          data={data}
           keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TransactionCard data={item} />
          )}
        />

      </Transactions>
    </Container>
  )
}
