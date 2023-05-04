import React from 'react';

import { 
  Container,
  ImageIndexes,
  ImageIndex,
  CarWrapper,
  CarImage
} from './styles';

export function ImageSlider() {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true}/>
        <ImageIndex active={false}/>
        <ImageIndex active={false}/>
        <ImageIndex active={false}/>
      </ImageIndexes>

      <CarWrapper>
        <CarImage 
          source={{ uri: '' }}
          resizeMode='contain'
        />
      </CarWrapper>
    </Container>
  )
}