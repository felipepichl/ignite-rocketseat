import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform,
  FlatList
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string,
  name: string
}

function Home() {
  const [newSkills, setNewSkills] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreetings] = useState('');


  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkills
    }

    setMySkills(prevState => [...prevState, data]);
    setNewSkills('');
  }

  function handleRemoveSkill(id: string) {
    setMySkills(prevState => prevState.filter(
      skill => skill.id !== id
    ))
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreetings('Good morning')
    } else if (currentHour >= 12 && currentHour <= 18) {
      setGreetings('Good afternoon')
    } else {
      setGreetings('Good night')
    }

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Felipe</Text>

      <Text style={styles.greetings}>
        {greeting}
      </Text>
      
      <TextInput 
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor='#555'
        onChangeText={setNewSkills}
        value={newSkills}  
      />

      <Button 
        title='Add'  
        onPress={handleAddNewSkill}
      />

      <Text 
        style={[styles.title, { marginVertical: 50 }]}
      >
        My Skills
      </Text>
      
      <FlatList 
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SkillCard skill={item.name} onPress={
              () => handleRemoveSkill(item.id)
            }
          />
        )}
      />

    </View>
  )
}

export { Home }

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
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
  greetings: {
    color: '#fff'
  }
});
