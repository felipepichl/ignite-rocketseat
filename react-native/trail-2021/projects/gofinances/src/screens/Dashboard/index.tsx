import React from 'react';

import { 
  Container, 
  Header,
  UserWrapper, 
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon, 
  HighlightCards 
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo  source={{ uri: 'https://github.com/felipepichl.png' }}/>
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Felipe</UserName>
            </User>
          </UserInfo>
          <Icon name="power"/>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />

      </HighlightCards>
    </Container>
  )
}
