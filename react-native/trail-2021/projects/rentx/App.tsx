import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo'

import theme from './src/styles/theme';

import { Home } from './src/screens/app/Home';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  return (
    <ThemeProvider theme={theme}>
      {
        fontsLoaded 
        ? <Home/>
        : <ActivityIndicator />
      }
    </ThemeProvider>
  );
}
