import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native'

import {styles} from './styles'

import { Participant } from '../../components/Participant'

function Home() {
  const participants = [
    'Felipe', 
    'Fernando', 
    'Saulo', 
    'Rodrigo',
    'David',
    'Adriano',
    'Camila',
    'Helena',
    'João',
    'Vitor'
  ];

  function handleParticipantAdd() {
    
  }

  function handleParticipantRemove(name: string) {
    
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

    <ScrollView showsVerticalScrollIndicator={false}>    
      {
        participants.map((participant) => (          
          <Participant 
            key={participant}
            name={participant}
            onRemove={() => handleParticipantRemove(participant)}  
          />
        ))
      }
    </ScrollView>

    </View>
  )
}

export { Home }