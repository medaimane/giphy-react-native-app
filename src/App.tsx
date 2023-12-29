import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './screens/Home/HomeScreen';
import {NavigationRoutes} from './services/view/NavigationRoutes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DetailsScreen} from './screens/Details/DetailsScreen';

export function App() {
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={NavigationRoutes.Home}>
          <Stack.Screen
            name={NavigationRoutes.Home}
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={NavigationRoutes.Details}
            component={DetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
