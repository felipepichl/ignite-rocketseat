import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { addMonths, subMonths, format } from 'date-fns';

import { 
  Container,
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
  const [selectDate, setSelectDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

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
      const dataKey = '@gofinance:transactions';
      
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormatted = response ? JSON.parse(response) : [];

      const expensives: TransactionData[]  = responseFormatted.filter(
        (expensive: TransactionData) => expensive.type === 'negative'
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
              format(selectDate, 'yyyy')
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

    </Container>
  )
}