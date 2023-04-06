import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Icon, Title } from './styles';

interface Props extends TouchableOpacityProps{
  title: string;
  type: 'up' | 'down';
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

export function TransactionTypeButton({ title, type, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon name={icon[type]} type={type}/>
      <Title>{title}</Title>
    </Container>
  );
}