import OneSignal from 'react-native-onesignal';

import { StatusBar, Platform } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';


import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';

const onSignalAppId = Platform.OS === 'ios' 
  ? 'not-founded' 
  : '7011924b-6f60-4fb9-bb15-1397b62400a1'; 

OneSignal.setAppId(onSignalAppId);

OneSignal.setEmail('felipe@email.com');

OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log(response);
});

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}