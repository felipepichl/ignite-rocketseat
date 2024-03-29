import React from 'react';
import {  
  Text,
  TouchableOpacity,
  StyleSheet, 
  TouchableOpacityProps
} from 'react-native';

interface SkillCardProps extends TouchableOpacityProps {
  skill: string;
}

function SkillCard({ skill, ...rest }: SkillCardProps) {
  return (
    <TouchableOpacity 
      style={styles.buttonSkill}
      {...rest}
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
