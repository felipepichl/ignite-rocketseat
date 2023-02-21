import { Input as NativeBaseInput, IInputProps } from 'native-base';


function Input({...rest}: IInputProps) {
  return (
    <NativeBaseInput 
      bg='gray.700'
      h={14}
      px={4}
      borderWidth={8}
      fontSize='md'
      color="white"
      fontFamily='body'
      mb={4}
      placeholderTextColor='gray.300'
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500'
      }}
      {...rest}
    />
  );
}

export { Input }