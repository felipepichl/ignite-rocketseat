import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

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

      <Button />

      <Text 
        style={[styles.title, { marginVertical: 50 }]}
      >
        My Skills
      </Text>
      
      {
        mySkills.map(skill => (
          <SkillCard />
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
  }
});
