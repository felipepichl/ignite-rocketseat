import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import LogoSvg from '@assets/logo.svg'; 
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

function SignUp() {
  const [name, setName] = useState('');

  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  function handleSignUp() {
    
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}  
    >
      <VStack 
        flex={1} 
        px={10}
        pb={16}
      >
        <Image 
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt='Pessoas treinando'
          resizeMode='contain'
          position='absolute'
        />

        <Center 
          my={24}
        >
          <LogoSvg />

          <Text color='gray.100' fontSize='sm'>
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading 
            color='gray.100'
            fontSize='xl'
            mb={6}
            fontFamily='heading'
          >
            Crie sua conta
          </Heading>

          <Input 
            placeholder='Nome'
            onChangeText={setName}  
          />
          <Input 
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'  
          />
          <Input 
            placeholder='Senha'
            secureTextEntry
          />
          <Input 
            placeholder='Confirme a senha'
            secureTextEntry
          />

          <Button 
            title='Criar e acessar'
            onPress={handleSignUp}
          />
        </Center>

        <Button 
          title='Voltar para o login'
          variant='outline'
          mt={24}
          onPress={handleGoBack}
        />        

      </VStack>
    </ScrollView>
  );
}

export { SignUp }