import {createAppContainer, createMaterialTopTabNavigator, createStackNavigator} from "react-navigation";

import ChefMenuList from '../screens/Chef/ChefMenuList'
import ChefMenuDone from '../screens/Chef/ChefMenuDone'

import {Constants} from 'expo'
import {bottomBarNav} from "./AuthNavigation";

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
    style:{
      backgroundColor: '#fff',
      marginTop: Constants.statusBarHeight,
    }
  }
});

const NavigationRoot = createStackNavigator({
  AuthLogin: {
    screen: bottomBarNav
  },
  Chef: {
    screen: ChefNavigator
  }
},{
  initialRouteName: 'Chef',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

export default createAppContainer(NavigationRoot)
