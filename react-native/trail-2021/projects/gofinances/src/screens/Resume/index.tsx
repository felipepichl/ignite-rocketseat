import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  Container,
  Header,
  Title
} from './styles';

import { HistoryCard } from '../../components/HistoryCard';

export function Resume() {

  async function loadData() {
    try {
      const dataKey = '@gofinance:transactions';
      
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormatted: string[] = response ? JSON.parse(response) : [];

     

    } catch (error) {
      console.error(error);
      Alert.alert('Não foi possível listar ')
    }
    
  }

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCard 
        title='Compras'
        amount='R$ 150,50'
        color='red'
      />
    </Container>
  )
}