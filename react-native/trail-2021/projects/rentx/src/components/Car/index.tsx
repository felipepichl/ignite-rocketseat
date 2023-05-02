import React from 'react';

import GasolineSvg from '../../assets/gasoline.svg';

import { 
  Container, 
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage
} from './styles';

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  },
}

interface Props {
  data: CarData;
}

export function Car() {
  return (
    <Container>
      <Details>
        <Brand>AUDI</Brand>
        <Name>RS 5 Coupé</Name>

        <About>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 120,00</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: 'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png' }}/>

    </Container>
  )
}