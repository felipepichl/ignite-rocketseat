import React from 'react';
import {  
  Text,
  TouchableOpacity,
  StyleSheet, 
  TouchableOpacityProps
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
};

function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
        style={styles.button}
        activeOpacity={.7}  
        {...rest}
      >
        <Text style={styles.buttonText}>{title}</Text>
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