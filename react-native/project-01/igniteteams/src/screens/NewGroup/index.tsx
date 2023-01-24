import { Container, Content, Icon } from './styles'

import { Header } from '@components/Header';

export function NewGroup() {
  return (
    <Container >
      <Header showBackButton/>

      <Content>
        <Icon />
      </Content>
    </Container>
  );
}