import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import LogoSvg from '@assets/logo.svg'; 
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { AuthNavigationRoutesProps } from '@routes/auth.routes';

type FormDataProps = {
  email: string;
  password: string;
}

function SignIn() {
  const { navigate } = useNavigation<AuthNavigationRoutesProps>();

  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormDataProps>();

  function handleNewAccount() {
    navigate('signUp')
  }

  function handleSignIn({ email, password }: FormDataProps) {
    
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
            Acesse sua conta
          </Heading>

          <Controller 
            control={control}
            name='email'
            rules={{ required: 'Informe o email' }}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}  
              />
            )}
          />

          <Controller 
            control={control}
            name='password'
            rules={{ required: 'Informe o password' }}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}  
              />
            )}
          />

          <Button 
            title='Acessar'
            onPress={handleSubmit(handleSignIn)}
          />
        </Center>

        <Center mt={24}>
          <Text
            color='gray.100'
            fontSize='sm'
            mb={3}
            fontFamily='body'
          >
            Ainda não tem acesso
          </Text>

          <Button 
            title='Criar Conta'
            variant='outline'
            onPress={handleNewAccount}
          />
        </Center>

      </VStack>
    </ScrollView>
  );
}

export { SignIn }