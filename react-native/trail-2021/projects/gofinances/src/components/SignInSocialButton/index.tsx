import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'

import { Container, ImageContainer, Title } from './styled';

interface Props extends RectButtonProps{
  icon: React.FC<SvgProps>;
  title: string;
}


export function SignInSocialButton({ icon: Icon, title, ...rest}: Props) {
  return (
    <Container {...rest}>
      <ImageContainer>
        <Icon />
      </ImageContainer>

      <Title>{title}</Title>
    </Container>
  )
}