import { useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

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
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarInactiveTintColor: colors.green[500],
      tabBarActiveTintColor: colors.gray[500]
    }}>
      <Screen 
        name="home" 
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize}/>
          )
        }}
      />
      <Screen 
        name='history' 
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize}/>
          )
        }}
      />
      <Screen 
        name='profile' 
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize}/>
          )
        }}
      />
      <Screen 
        name='exercise' 
        component={Exercise}
      />
    </Navigator>
  );
}

export { AppRoutes, AppNavigationRoutesProps }