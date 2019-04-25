import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {createAppContainer, createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation'
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

import AuthNavigation from '../navigations/AuthNavigation';
import ChefNavigator from "./ChefNavigator";
import WaitersNavigator from "./WaitersNavigation";

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
});

const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile'
    }
  },
  TopUpSaldo: {
    screen: TopUpSaldo,
    navigationOptions: {
      title: 'Topup Balance'
    }
  }
});

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
  lazy: true,
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
});

const NavigationRoot = createStackNavigator({
  AuthLogin: {
    screen: AuthNavigation
  },
  Customer: {
    screen: RootNavigation
  },
  Chef: {
    screen: ChefNavigator
  },
  Waiters: {
    screen: WaitersNavigator
  }
}, {
  initialRouteName: 'AuthLogin',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

export default createAppContainer(NavigationRoot)
