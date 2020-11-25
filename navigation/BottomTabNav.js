import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MainStackNav from './MainStackNav';
import FavStackNav from './FavStackNav';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#CD9B44',
        inactiveTintColor: '#606060',
        showLabel: false,
      }}>
      <Tab.Screen
        name="Main"
        component={MainStackNav}
        options={{
          tabBarIcon: ({color}) => (
            <Fontisto name="film" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavStackNav}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="heart" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
