import React from 'react';
import { View, Image, Platform } from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import { createStackNavigator } from "react-navigation-stack";
import MessagesLink from '../components/MessagesLink';
import NavIcon from '../components/NavIcon';
import { stackStyle } from './config';

const stackFactory = (initialRoute, customConfig) => 
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { 
        ...customConfig, 
        headerStyle: { 
          ...stackStyle  
        }
      }
    }
  });

const TabNavigation = createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home, {
      headerRight: <MessagesLink />,
      headerTitle: (
        <NavIcon 
          name={'logo-instagram'}
          size={36}
        />
      )
    }),
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <NavIcon 
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        />
      )
    }
  },
  Search: {
    screen: stackFactory(Search, {
      title: 'Search'
    }),
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <NavIcon
          focused={focused}
          size={28} 
          name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
        />
      )
    }
  },
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({navigation}) => navigation.navigate('PhotoNavigation'),
      tabBarIcon: (
        <NavIcon 
          name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
        />
      )
    }
  },
  Notifications: {
    screen: stackFactory(Notifications, {
      title: 'Notifications'
    }),
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <NavIcon
          focused={focused} 
          name={
            Platform.OS === 'ios' 
            ? focused 
            ? 'ios-heart'
            : 'ios-heart-empty' 
            : focused ? 'md-heart' 
            : 'md-heart-empty'
          }
        />
      )
    }
  },
  Profile: {
    screen: stackFactory(Profile, {
      title: 'Profile'
    }),
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <NavIcon 
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
        />
      )
    }
  }
}, {
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: '#FAFAFA'
    }
  }
});

export default TabNavigation