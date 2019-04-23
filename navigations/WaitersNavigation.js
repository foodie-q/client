import {createAppContainer, createStackNavigator} from "react-navigation";

import WaitersHome from "../screens/Waiters/WaitersHome";
import WaitersBooking from "../screens/Waiters/WaitersBooking";
import WaitersDetailCustomer from "../screens/Waiters/WaitersDetailCustomer";
import {bottomBarNav} from "./AuthNavigation";

const WaitersNavigator = createStackNavigator({
  WaitersHome: {
    screen: WaitersHome
  },
  WaitersBooking: {
    screen: WaitersBooking
  },
  WaitersDetailCustomer: {
    screen: WaitersDetailCustomer
  }
}, {
  initialRouteName: 'WaitersHome',
});

const NavigationRoot = createStackNavigator({
  WaitersAuthLogin: {
    screen: bottomBarNav
  },
  Waiters: {
    screen: WaitersNavigator
  }
},{
  initialRouteName: 'Waiters',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

export default createAppContainer(NavigationRoot)
