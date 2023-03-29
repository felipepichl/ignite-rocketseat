import React from 'react';
import {  
  Text,
  TouchableOpacity,
  StyleSheet 
} from 'react-native';

function SkillCard({ skill }) {
  return (
    <TouchableOpacity 
      style={styles.buttonSkill}
      key={skill}
    >
      <Text style={styles.textSkill}>
        {skill}
      </Text>
    </TouchableOpacity>
  )
}

export { SkillCard }

const styles = StyleSheet.create({ 
  buttonSkill: {
    backgroundColor: '#1f1e25',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10,
  },
  textSkill: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  }
});
