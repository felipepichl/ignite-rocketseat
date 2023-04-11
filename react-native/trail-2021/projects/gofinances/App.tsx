import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { AppRoutes } from './src/routes/app.routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  return (
    <ThemeProvider theme={theme}>
      { fontsLoaded 
        ? 
          <NavigationContainer>
            <AppRoutes />
          </NavigationContainer>  
        : 
          <ActivityIndicator /> 
      }
    </ThemeProvider>
  )
}

