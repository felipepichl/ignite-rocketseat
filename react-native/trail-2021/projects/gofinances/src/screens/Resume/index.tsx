import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  Container,
  Header,
  Title, 
  Content
} from './styles';

import { categories } from '../../utils/categories';

import { HistoryCard } from '../../components/HistoryCard';
import { TransactionCardProps as TransactionData } from '../../components/TransactionCard/'

interface CategoryData {
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    try {
      const dataKey = '@gofinance:transactions';
      
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormatted = response ? JSON.parse(response) : [];

      const expensives: TransactionData[]  = responseFormatted.filter(
        (expensive: TransactionData) => expensive.type === 'negative'
      );

      const totalByCategory: CategoryData[] = [];

      categories.forEach(category => {
        let categorySum = 0;

        expensives.forEach(expensive => {
          if (expensive.category === category.key) {
            categorySum += Number(expensive.amount)
          }
        })

        if (categorySum > 0) {
          const total = categorySum.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })

          totalByCategory.push({
            name: category.name,
            total,
            color: category.color
          })
        }

      }) 

      setTotalByCategories(totalByCategory);
      
     

    } catch (error) {
      console.error(error);
      Alert.alert('Não foi possível listar ')
    }
    
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {
          totalByCategories.map(category => (
            <HistoryCard 
              key={category.name}
              title={category.name}
              amount={category.total}
              color={category.color}
            />
          ))
        }
      </Content>

    </Container>
  )
}