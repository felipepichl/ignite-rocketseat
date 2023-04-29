import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
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
  lastTransaction: string;
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

  const { signOut, user } = useAuth();

  const theme = useTheme();

  function getLastTransactionDate(
    collection:DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
    Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())
    ));
    
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
                month: 'long'
              })
            }`
  }

  async function loadTransaction() {
    try {
      const dataKey = `@gofinance:transactions_user:${user.id}`;
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

      const lastTransactionEntries = getLastTransactionDate(
        transactions, 'positive'
      );
      const lastTransactionExpensive = getLastTransactionDate(
        transactions, 'negative'
      );
      const totalInterval = `01 à ${lastTransactionEntries}`



      const total = entriesTotal - expensiveTotal;

      setHighlightCard({
        entries: {
          amount: entriesTotal.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: `Última entrada dia ${lastTransactionEntries}`
        },
        expensive: {
          amount: expensiveTotal.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: `Última saída dia ${lastTransactionExpensive}`
        },
        total: {
          amount: total.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: totalInterval
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
                <Photo  source={{ uri: user.photo }}/>
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power"/>
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard 
              type='up'
              title='Entradas'
              amount={highlightCard?.entries?.amount}
              lastTransaction={highlightCard.entries.lastTransaction}
            />
            <HighlightCard 
              type='down'
              title='Saídas'
              amount={highlightCard?.expensive?.amount}
              lastTransaction={highlightCard.expensive.lastTransaction}
            />
            <HighlightCard
              type='total' 
              title='Total'
              amount={highlightCard?.total?.amount}
              lastTransaction={highlightCard.total.lastTransaction}
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
