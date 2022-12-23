import { Text, View, TextInput } from 'react-native'

import {styles} from './styles'

function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Event name
      </Text>
      <Text style={styles.eventDate}>
        Friday, november 24th 2022
      </Text>

      <TextInput 
        style={styles.input}
        placeholder="Invited name"
        placeholderTextColor="#6b6b6b"
      />
    </View>
  )
}

export { Home }