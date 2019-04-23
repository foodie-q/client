import {createAppContainer, createStackNavigator} from "react-navigation";

import WaitersHome from "../screens/Waiters/WaitersHome";
import WaitersBooking from "../screens/Waiters/WaitersBooking";
import WaitersDetailCustomer from "../screens/Waiters/WaitersDetailCustomer";

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

export default createAppContainer(WaitersNavigator)
