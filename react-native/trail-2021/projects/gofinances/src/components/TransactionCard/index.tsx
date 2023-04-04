import React from 'react';

import { 
  Container, 
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styles';

export function TransactionCard() {
  return (
    <Container>
      <Title>Desenvolimento de site</Title>

      <Amount>R$ 12.000,00</Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign"/>
          <CategoryName>Vendas</CategoryName>
        </Category>
        <Date>04/04/23</Date>
      </Footer>
    </Container>
  )
}