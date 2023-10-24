import { TouchableOpacity } from 'react-native'
import { Power } from 'phosphor-react-native'

import theme from '../../theme'

import { Container, Greeting, Message, Name, Picture } from './styles'

export function Header() {
  return (
    <Container>
      <Picture 
        source={{ uri: 'https://github.com/felipepichl.png' }}
        placeholder='L184i9kCbIof00yjZay~qj[ayj@'
      />
      <Greeting>
        <Message>Olá</Message>

        <Name>Felipe</Name>
      </Greeting>

      <TouchableOpacity>
        <Power 
          size={32}
          color={theme.COLORS.GRAY_700}
        />
      </TouchableOpacity>
    </Container>
  )
}