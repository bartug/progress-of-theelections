import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './core/pages/splashScreen';
import EpisodeScreen from './core/pages/episodeScreen';
import WaitingScreen from './core/pages/WaitingScreen';
import {StatusBar} from 'react-native';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
            <StatusBar hidden />
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WaitingScreen" component={WaitingScreen} />
        <Stack.Screen name="EpisodeScreen" component={EpisodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
