import { useEffect } from 'react';
import OneSignal from 'react-native-onesignal';

import { StatusBar, Platform } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { 
  useFonts, 
  Roboto_400Regular, 
  Roboto_700Bold 
} from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { 
  tagUserEmailCreate, 
  tagUserEmailDelete,
  tagUserInfoCreate 
} from './src/notifications/notificationsTags';

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

  tagUserEmailCreate('felipe@email.com');
  tagUserEmailDelete();
  tagUserInfoCreate();

  useEffect(() => {
    const unsubscrible = OneSignal.setNotificationOpenedHandler((response) => {
      
      const { actionId } = response.action as any;

      switch (actionId) {
        case '1':
          return console.log('Ver todas')
          
        case '2':
          return console.log('Ver pedido')
          
        default:
          return console.log('Nenhum botão clicado')
      }
    });

    return () => unsubscrible;
  }, []);
  
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