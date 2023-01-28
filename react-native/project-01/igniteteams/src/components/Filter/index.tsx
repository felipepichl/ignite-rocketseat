import { TouchableOpacityProps } from 'react-native'

import { Container, Title, FilterStyleProps } from './styles';

type Props =  TouchableOpacityProps & FilterStyleProps & {
  title: String;
}

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Container 
      {...rest}
      isActive
    >
      <Title>
        {title}
      </Title>
    </Container>
  );
}