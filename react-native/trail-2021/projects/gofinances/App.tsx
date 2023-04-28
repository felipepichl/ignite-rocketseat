import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { Routes } from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';

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


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { userStorageLoading } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      { fontsLoaded || userStorageLoading
        ? 
          <GestureHandlerRootView
            style={{ flex: 1 }}
          >
            <StatusBar 
              barStyle="light-content" 
              translucent 
              backgroundColor="transparent"
            />
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </GestureHandlerRootView>
        : 
          <ActivityIndicator /> 
      }
    </ThemeProvider>
  )
}

