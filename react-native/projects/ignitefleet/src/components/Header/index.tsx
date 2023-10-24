import { TouchableOpacity } from 'react-native'
import { Power } from 'phosphor-react-native'
import { useUser } from '@realm/react'

import theme from '../../theme'

import { Container, Greeting, Message, Name, Picture } from './styles'

export function Header() {
  const user = useUser();

  return (
    <Container>
      <Picture 
        source={{ uri: user?.profile.pictureUrl }}
        placeholder='L184i9kCbIof00yjZay~qj[ayj@'
      />
      <Greeting>
        <Message>Olá</Message>

        <Name>{user?.profile.name}</Name>
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