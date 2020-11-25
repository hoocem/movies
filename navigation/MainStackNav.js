import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import MovieDetails from '../screens/MovieDetails';

const Stack = createStackNavigator();

const MainStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNav;
