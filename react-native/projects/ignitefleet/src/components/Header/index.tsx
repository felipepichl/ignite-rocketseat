import { Container, Greeting, Message, Name } from './styles'

export function Header() {
  return (
    <Container>
      <Greeting>
        <Message>Olá</Message>

        <Name>Felipe</Name>
      </Greeting>
    </Container>
  )
}