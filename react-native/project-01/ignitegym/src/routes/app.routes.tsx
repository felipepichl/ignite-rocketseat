import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/app/Home';
import { History } from '@screens/app/History';
import { Profile } from '@screens/app/Profile';
import { Exercise } from '@screens/app/Exercise';

type AppRoutesProps = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

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

export { AppRoutes }