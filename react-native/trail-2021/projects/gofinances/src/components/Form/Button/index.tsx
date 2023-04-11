import React from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface ButtonProps extends RectButton {
  title: string;
}

export function Button({title, ...rest}:ButtonProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}