import { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Alert 
} from 'react-native'

import {styles} from './styles'

import { Participant } from '../../components/Participant'

function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
    if(participants.includes(participantName)) {
      return Alert.alert('Participant exists', 'Participant already exists!')
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
    
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remove',`Do you want to remove ${name}?`, [
      {
        text: 'Yes',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'No',
        style: 'cancel'
      }
    ]);
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
          // onChangeText={(text) => setParticipantName(text)}
          onChangeText={setParticipantName}
          value={participantName}
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