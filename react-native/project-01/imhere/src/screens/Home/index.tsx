import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList 
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

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant 
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}  
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>No one here, add people!</Text>
        )}
      />
      
      {/* {
        participants.map((participant) => (          
          <Participant 
            key={participant}
            name={participant}
            onRemove={() => handleParticipantRemove(participant)}  
          />
        ))
      } */}

    </View>
  )
}

export { Home }