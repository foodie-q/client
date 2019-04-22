import React from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'
import ChefNavigator from "./ChefNavigator";

const RootNavigation = createStackNavigator({
  Chef: {
    screen: ChefNavigator,
    navigationOptions: {
      tabBarLabel: 'Chef',
    }
  },
}, {
  initialRouteName: 'Chef',
});

export default createAppContainer(RootNavigation)
