import React from 'react';

import { 
  Container,
  ImageIndexes,
  ImageIndex,
  CarWrapper,
  CarImage
} from './styles';

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: Props) {
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
          source={{ uri: imagesUrl[0] }}
          resizeMode='contain'
        />
      </CarWrapper>
    </Container>
  )
}