import React, {  useState, useCallback } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { 
  Container,
  LoadContainer,
  Header,
  Title, 
  Content,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  ChartContainer
} from './styles';

import { categories } from '../../utils/categories';

import { HistoryCard } from '../../components/HistoryCard';
import { TransactionCardProps as TransactionData } from '../../components/TransactionCard/'

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false); 
  const [selectDate, setSelectDate] = useState(new Date()); 
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const { user } = useAuth();
  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') { 
    if (action === 'next') {
      setSelectDate(addMonths(selectDate, 1));
    } else {
      setSelectDate(subMonths(selectDate, 1));
    }
  }

  async function loadData() {
    try {
      setIsLoading(true);
      const dataKey = `@gofinance:transactions_user:${user.id}`;
      
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormatted = response ? JSON.parse(response) : [];

      const expensives: TransactionData[]  = responseFormatted.filter(
        (expensive: TransactionData) => 
          expensive.type === 'negative' &&
          new Date(expensive.date).getMonth() === selectDate.getMonth() &&
          new Date(expensive.date).getFullYear() === selectDate.getFullYear()
      );

      const expensiveTotal = expensives
        .reduce((accumulator: number, expensive: TransactionData) => {
          return accumulator + Number(expensive.amount)
        }, 0)

      const totalByCategory: CategoryData[] = [];

      categories.forEach(category => {
        let categorySum = 0;

        expensives.forEach(expensive => {
          if (expensive.category === category.key) {
            categorySum += Number(expensive.amount)
          }
        })

        if (categorySum > 0) {
          const totalFormatted = categorySum.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })

          const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`;

          totalByCategory.push({
            key: category.key,
            name: category.name,
            total: categorySum,
            totalFormatted,
            color: category.color,
            percent
          })
        }

      }) 

      setTotalByCategories(totalByCategory);
      setIsLoading(false);
      
    } catch (error) {
      console.error(error);
      Alert.alert('Não foi possível listar ')
    }
    
  }

  useFocusEffect(useCallback(() => {
    loadData();
  },[selectDate]));

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {
        isLoading ? 
        <LoadContainer>
          <ActivityIndicator 
            color={theme.colors.primary} 
            size="large"  
          /> 
        </LoadContainer> :
      
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        > 
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')} >
              <MonthSelectIcon name="chevron-left"/>
            </MonthSelectButton>
            
            <Month>
              {
                format(selectDate, 'MMMM, yyyy', { locale: ptBR })
              }
            </Month>
            
            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right"/>
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie 
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: { 
                  fontSize: RFValue(18), 
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                }
              }}
              labelRadius={50}
              x="percent"
              y="total"
            />
          </ChartContainer>
          {
            totalByCategories.map(category => (
              <HistoryCard 
                key={category.key}
                title={category.name}
                amount={category.totalFormatted}
                color={category.color}
              />
            ))
          }
        </Content>        
      }
    </Container>
  )
}