import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

import { useTheme } from 'styled-components';

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
  LogoutButton, 
  LoadContainer 
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps,
  expensive: HighlightProps,
  total: HighlightProps,
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightCard, setHighlightCard] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  async function loadTransaction() {
    try {
      const dataKey = '@gofinance:transactions';
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      let entriesTotal = 0;
      let expensiveTotal = 0;

      
      const formattedTransactions: DataListProps[] = transactions
      .map((item: DataListProps) => {
        
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

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
      
      setTransactions(formattedTransactions);

      const total = entriesTotal - expensiveTotal;

      setHighlightCard({
        entries: {
          amount: entriesTotal.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })
        },
        expensive: {
          amount: expensiveTotal.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })
        },
        total: {
          amount: total.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })
        }
      });

      setIsLoading(false);

    } catch (error) {
     console.log(error);
      Alert.alert('Não foi possível listar');
    }
  }

  useEffect(() => {
    loadTransaction();

    // const dataKey = '@gofinance:transactions';
    // AsyncStorage.removeItem(dataKey);
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransaction()
  },[]));

  return (
    <Container>
      { 
        isLoading ? 
        <LoadContainer>
          <ActivityIndicator 
            color={theme.colors.primary} 
            size="large"  
          /> 
        </LoadContainer> :
        <>
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
              amount={highlightCard?.entries?.amount}
              lastTransaction='Última entrada dia 13 de Abril'
            />
            <HighlightCard 
              type='down'
              title='Saídas'
              amount={highlightCard?.expensive?.amount}
              lastTransaction='Última entrada dia 15 de Abril'
            />
            <HighlightCard
              type='total' 
              title='Total'
              amount={highlightCard?.total?.amount}
              lastTransaction='Última entrada dia 15 de Abril'
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList 
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TransactionCard data={item} />
              )}
            />

          </Transactions>
        </>
      }
    </Container>
  )
}
