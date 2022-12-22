import { Text, View } from 'react-native'

import {styles} from './styles'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Event name
      </Text>
      <Text style={styles.eventDate}>
        Friday, november 24th 2022
      </Text>
    </View>
  )
}