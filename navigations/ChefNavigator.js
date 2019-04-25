import React from 'react'

import {createAppContainer, createMaterialTopTabNavigator} from "react-navigation";

import ChefMenuList from '../screens/Chef/ChefMenuList'
import ChefMenuDone from '../screens/Chef/ChefMenuDone'

import {Constants} from 'expo'

const ChefNavigator = createMaterialTopTabNavigator({
  ChefList: {
    screen: ChefMenuList,
    navigationOptions: {
      title: 'Todo'
    }
  },
  ChefDone: {
    screen: ChefMenuDone,
    navigationOptions: {
      title: 'Done'
    }
  },
}, {
  initialRouteName: 'ChefList',
  swipeEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#f64747',
    inactiveTintColor: 'grey',
    indicatorStyle: {
      backgroundColor: '#fff'
    },
    style: {
      backgroundColor: '#fff',
      marginTop: Constants.statusBarHeight,
    }
  }
});

export default ChefNavigator
