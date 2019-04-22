import {createMaterialTopTabNavigator} from "react-navigation";

import ChefMenuList from '../screens/Chef/ChefMenuList'
import ChefMenuDone from '../screens/Chef/ChefMenuDone'

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
});

export default ChefNavigator
