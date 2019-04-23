import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {createAppContainer, createMaterialTopTabNavigator, createStackNavigator, StackNavigator} from 'react-navigation'

import {bottomBarNav} from '../navigations/AuthNavigation'

// screens
import Home from '../screens/Home'
import Orders from '../screens/Orders'
import Profile from '../screens/Profile'
import ReserveTable from '../screens/ReserveTable'
import ScanQR from '../screens/ScanQR'
import Menus from '../screens/Menus'
import Payment from '../screens/Payment'
import TopUpSaldo from '../screens/TopUpSaldo'
import OrdersQRCode from "../screens/OrdersQRCode";

const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  ScanQR: {
    screen: ScanQR,
    navigationOptions: {
      header: null
    }
  },
  Menus: {
    screen: Menus
  },
  ReserveTable: {
    screen: ReserveTable,
    navigationOptions: {
      headerLeft: null
    }
  },
  Payment: {
    screen: Payment
  }
})

const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: Profile
  },
  TopUpSaldo: {
    screen: TopUpSaldo
  }
})

const OrdersNavigator = createStackNavigator({
  Orders: {
    screen: Orders,
    navigationOptions: {
      title: 'History'
    }
  },
  OrdersPaymentDetail: {
    screen: Payment,
  },
  OrdersQRCode: {
    screen: OrdersQRCode
  }
});

const RootNavigation = createMaterialTopTabNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (<Icon name="ios-home" color={tintColor} size={24}/>
      )
    }
  },
  Orders: {
    screen: OrdersNavigator,
    navigationOptions: {
      tabBarLabel: 'Orders',
      tabBarIcon: ({tintColor}) => (<Icon name="ios-restaurant" color={tintColor} size={24}/>
      )
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => (<Icon name="ios-person" color={tintColor} size={24}/>)
    }
  }
}, {
  initialRouteName: 'Home',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#f64747',
    inactiveTintColor: 'grey',
    indicatorStyle: {
      backgroundColor: '#fff'
    },
    style: {
      backgroundColor: '#fff',
      height: 60
    },
    showIcon: true
  }
})

const NavigationRoot = createStackNavigator({
  CustomerAuthLogin: {
    screen: bottomBarNav
  },
  Customer: {
    screen: RootNavigation
  }
},{
  initialRouteName: 'Customer',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

export default createAppContainer(NavigationRoot)
