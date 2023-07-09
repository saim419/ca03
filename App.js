import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/components/HomePage';
import CameraApp from './src/components/CameraApp';
import Dictionary from './src/components/Dictionary';
import AboutPage from './src/components/AboutPage';
import SavedPhotos from './src/components/SavedPhotos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{ title: 'Home' }} />
        <Stack.Screen name="CameraApp" component={CameraApp} options={{ title: 'Camera App' }} />
        <Stack.Screen name="Dictionary" component={Dictionary} options={{ title: 'Memo' }} />
        <Stack.Screen name="AboutPage" component={AboutPage} options={{ title: 'About' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

