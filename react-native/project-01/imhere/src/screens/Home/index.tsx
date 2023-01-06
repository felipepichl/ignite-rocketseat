import { Text, View, TextInput, TouchableOpacity } from 'react-native'

import {styles} from './styles'

import { Participant } from '../../components/Participant'

function Home() {

  function handleParticipantAdd() {
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Event name
      </Text>
      <Text style={styles.eventDate}>
        Friday, november 24th 2022
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Invited name"
          placeholderTextColor="#6b6b6b"
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Participant/>
    </View>
  )
}

export { Home }