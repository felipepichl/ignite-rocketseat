import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransaction() {
    const dataKey = '@gofinance:transactions';

    try {
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      const formattedTransactions: DataListProps[] = transactions
        .map((item: DataListProps) => {
          const amount = Number(item.amount)
            .toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL'
            });
          
          const date = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          }).format(new Date(item.date));


          return {
            id: item.id,
            name: item.name,
            amount,
            type: item.type,
            category: item.category,
            date,
          }
      });

      setData(formattedTransactions);

    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    loadTransaction();
  }, [])

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
