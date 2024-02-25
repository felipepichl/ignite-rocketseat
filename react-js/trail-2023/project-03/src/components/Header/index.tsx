import logoImg from '../../assets/logo.svg'
import { Container, Content, NewTransactionButton } from './styles'

export function Header() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="" />

        <NewTransactionButton>Nova transação</NewTransactionButton>
      </Content>
    </Container>
  )
}
