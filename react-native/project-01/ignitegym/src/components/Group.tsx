import { Text, Pressable, IPressableProps } from 'native-base'

type Props = IPressableProps & {
  name: string;
  isActive: boolean
}

function Group({ name, isActive, ...rest }: Props) {
 return (
  <Pressable
    mr={3}
    w={24}
    h={10}
    bg='gray.600'
    rounded='md'
    justifyContent='center'
    alignItems='center'
    overflow='hidden'
    isPressed={isActive}
    _pressed={{
      backgroundColor: 'green.500',
      borderWidth: 1
    }}
    {...rest}
  >
    <Text
      color={isActive ? 'green.500' : 'gray.200'}
      textTransform='uppercase'
      fontSize='xs'
      fontWeight='bold'
    >
      {name}
    </Text>
  </Pressable>
 ); 
}

export { Group }