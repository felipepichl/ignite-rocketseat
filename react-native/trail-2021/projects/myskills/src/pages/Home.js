import React from 'react';
import { View, Text } from 'react-native';

function Home() {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',  
    }}>
      <Text>React</Text>
      <Text>Ignite</Text>
    </View>
  )
}

export { Home }
