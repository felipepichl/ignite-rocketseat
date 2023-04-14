import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

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
          <GestureHandlerRootView
            style={{ flex: 1 }}
          >
            <NavigationContainer>
              <AppRoutes />
            </NavigationContainer>  
          </GestureHandlerRootView>
        : 
          <ActivityIndicator /> 
      }
    </ThemeProvider>
  )
}

