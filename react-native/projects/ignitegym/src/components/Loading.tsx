import { Spinner, Center } from 'native-base';

function Loading() {
  return (
    <Center flex={1}>
      <Spinner />
    </Center>
  );
}

export { Loading }