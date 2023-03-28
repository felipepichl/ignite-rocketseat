import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform,
  TouchableOpacity 
} from 'react-native';

function Home() {
  const [newSkills, setNewSkills] = useState('');
  const [mySkills, setMySkills] = useState([]);

  function handleAddNewSkill() {
    setMySkills(prevState => [...prevState, newSkills]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Felipe</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor='#555'
        onChangeText={setNewSkills}  
      />

      <TouchableOpacity 
        style={styles.button}
        activeOpacity={.7}  
        onPress={handleAddNewSkill }
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      <Text 
        style={[styles.title, { marginVertical: 50 }]}
      >
        My Skills
      </Text>
      
      {
        mySkills.map(skill => (

        <TouchableOpacity 
          style={styles.buttonSkill}
          key={skill}
        >
          <Text style={styles.textSkill}>
            {skill}
          </Text>
        </TouchableOpacity>
        ))
      }

    </View>
  )
}

export { Home }

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#121015',
    paddingHorizontal: 20,
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding:  Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  button: {
    backgroundColor: '#a370f7',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  }, 
  buttonSkill: {
    backgroundColor: '#1f1e25',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center'
  },
  textSkill: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  }
})
