import { Container } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

export function Players() {
  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title='Nova Turma'
        subtitle='Adicione a galera e separe os times'
      />

    </Container>
  );
}