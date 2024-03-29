import React from 'react';

import { BackButton } from '../../../components/BackButton';
import { ImageSlider } from '../../../components/ImageSlider';
import { Accessory } from '../../../components/Accessory';

import speedSvg from '../../../assets/speed.svg';
import accelerationSvg from '../../../assets/acceleration.svg';
import forceSvg from '../../../assets/force.svg';
import gasolineSvg from '../../../assets/gasoline.svg';
import exchangeSvg from '../../../assets/exchange.svg';
import peopleSvg from '../../../assets/people.svg';


import { 
  Container, 
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price, 
  About,
  Accessories
} from './styles';

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}/>
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>AUDI</Brand>
            <Name>R5 S Coupé</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name='380Km/h' icon={speedSvg}/>
          <Accessory name='3.2s' icon={accelerationSvg}/>
          <Accessory name='800 HP' icon={forceSvg}/>
          <Accessory name='Gasolina' icon={gasolineSvg}/>
          <Accessory name='Auto' icon={exchangeSvg}/>
          <Accessory name='2 Pessoas' icon={peopleSvg}/>
        </Accessories>

        <About>
          A nice car, everything you need to get more girls
        </About>
      </Content>
    </Container>
  );
}