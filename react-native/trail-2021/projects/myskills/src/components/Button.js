import React from 'react';
import {  
  Text,
  TouchableOpacity,
  StyleSheet 
} from 'react-native';

function Button({ onPress }) {
  return (
    <TouchableOpacity 
        style={styles.button}
        activeOpacity={.7}  
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
  )
}

export { Button }

const styles = StyleSheet.create({
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
  }
});