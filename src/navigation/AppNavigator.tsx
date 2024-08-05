// src/navigation/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigator from './HomeStackNavigator';
import MyCabScreen from '../screens/MyCabScreen';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="My Cab" component={MyCabScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
