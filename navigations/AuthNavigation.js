import React from 'react'
import {createAppContainer, createBottomTabNavigator} from 'react-navigation'
// screens
import LoginRoute from '../screens/Login'
import RegisterRoute from '../screens/Register'

const routeConfigs = {
  Login: {
    screen: LoginRoute,
  },
  Register: {
    screen: RegisterRoute,
  },
};

const tabBarOptions = {
  initialRouteName: 'Login',
  tabBarOptions: {
    activeTintColor: '#f64747',
    inactiveTintColor: 'grey',
    showIcon: true,
    scrollEnabled: false,
    indicatorStyle: {
      backgroundColor: '#fff'
    },
    style: {
      backgroundColor: '#fff',
      height: 60
    },
  },
  tabBarPosition: 'bottom'
};

const AuthNavigation = createBottomTabNavigator(routeConfigs, tabBarOptions);


export default AuthNavigation
