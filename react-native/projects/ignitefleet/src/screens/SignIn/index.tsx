import { useEffect, useState } from 'react'
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { Realm, useApp } from '@realm/react'

import { Container, Title, Slogan } from './styles'

import backgroundImg from '../../assets/background.png'

import { Button } from '../../components/Button'

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

WebBrowser.maybeCompleteAuthSession()

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const app = useApp()

  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: IOS_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email']
  })

  function handleGoogleSignIn() {
    setIsAuthenticating(true)

    googleSignIn().then((response) => {
      if (response.type !== 'success') {
        setIsAuthenticating(false)
      }
    })
  }

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken) {

        const { idToken } = response.authentication

        const credentials = Realm.Credentials.jwt(idToken)

        app.logIn(credentials).catch((err) => {
          console.log(err)
          Alert.alert('Entar', 'Não foi possível conectar-se a sua conta Google.')
          setIsAuthenticating(false)
        })
        
        fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`)
          .then(response => response.json())
          .then(console.log)

          
      } else {
        Alert.alert('Entar', 'Não foi possível conectar-se a sua conta Google.')
        setIsAuthenticating(false)
      }
    }
  }, [response])

  return (
    <Container source={backgroundImg}>
      <Title>
        Ignite Fleet
      </Title>
      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button 
        title='Entrar com o Google'
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
      />
    </Container>
  )
}