import { useEffect, useState } from 'react';
import OneSignal, { 
  NotificationReceivedEvent, 
  OSNotification 
} from 'react-native-onesignal';

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
import { Notification } from './src/components/Notification';

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
  const [notification, setNotification] = useState<OSNotification>();

  tagUserEmailCreate('felipe@email.com');
  tagUserEmailDelete();
  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((
      notificationReceivedEvent: NotificationReceivedEvent
    ) => {
      const response = notificationReceivedEvent.getNotification();

      setNotification(response);
    })

    return () => unsubscribe;
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

      {
        notification?.title &&
        <Notification 
          title={notification.title} 
          onClose={() => setNotification(undefined)}
        />
      }
    </NativeBaseProvider>
  );
}