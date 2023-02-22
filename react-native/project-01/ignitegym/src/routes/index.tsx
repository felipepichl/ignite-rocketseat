import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'

function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}

export { Routes }