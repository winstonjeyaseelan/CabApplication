// src/navigation/HomeStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CabsListScreen from '../screens/CabsListScreen';
import CabDetailScreen from '../screens/CabDetailScreen';

const Stack = createStackNavigator();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CabsList" component={CabsListScreen} />
      <Stack.Screen name="CabDetail" component={CabDetailScreen} />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
