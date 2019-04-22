import {createMaterialTopTabNavigator} from "react-navigation";

import ChefMenuList from '../screens/ChefMenuList'
import ChefMenuAccepted from '../screens/ChefMenuAccepted'
import ChefMenuDone from '../screens/ChefMenuDone'

const ChefNavigator = createMaterialTopTabNavigator({
  ChefList: {
    screen: ChefMenuList,
    navigationOptions: {
      title: 'Todo'
    }
  },
  ChefAccepted: {
    screen: ChefMenuAccepted,
    navigationOptions: {
      title: 'Ongoing'
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
});

export default ChefNavigator
