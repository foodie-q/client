import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator,createBottomTabNavigator } from 'react-navigation'

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
}

const tabBarOptions = {
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
}

const bottomBarNav = createBottomTabNavigator(routeConfigs, tabBarOptions)


export default createAppContainer(bottomBarNav)