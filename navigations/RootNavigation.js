import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'

// screens
import Home from '../screens/Home'
import Orders from '../screens/Orders'
import Profile from '../screens/Profile'
import ReserveTable from '../screens/ReserveTable'
import ScanQR from '../screens/ScanQR'
import Menus from '../screens/Menus'
import Payment from '../screens/Payment'
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
    screen: Payment,
    navigationOptions: {
      headerRight: (
        <TouchableOpacity style={{ backgroundColor: 'orange', padding: 10, marginRight: 20, borderRadius: 20 }}>
          <Text style={{ color: '#fff' }}>Rp 120,000,000</Text>
        </TouchableOpacity>
      ),
      headerLeft: null
    }
  }
})

const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: Profile
  }
})

const OrdersNavigator = createStackNavigator({
  Orders: {
    screen: Orders
  },
  OrdersQRCode:{
    screen: OrdersQRCode
  }
});

const RootNavigation = createMaterialTopTabNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (<Icon name="ios-home" color={tintColor} size={24} />
      )
    }
  },
  Orders: {
    screen: OrdersNavigator,
    navigationOptions: {
      tabBarLabel: 'Orders',
      tabBarIcon: ({ tintColor }) => (<Icon name="ios-restaurant" color={tintColor} size={24} />
      )
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (<Icon name="ios-person" color={tintColor} size={24} />)
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

export default createAppContainer(RootNavigation)
