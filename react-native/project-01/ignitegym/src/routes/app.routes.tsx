import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/app/Home';
import { History } from '@screens/app/History';
import { Profile } from '@screens/app/Profile';
import { Exercise } from '@screens/app/Exercise';

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: undefined;
}

type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

function AppRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={Home}/>
      <Screen name='history' component={History}/>
      <Screen name='profile' component={Profile}/>
      <Screen name='exercise' component={Exercise}/>
    </Navigator>
  );
}

export { AppRoutes, AppNavigationRoutesProps }