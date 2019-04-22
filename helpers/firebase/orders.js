import {dbOrders} from './index'

import menus from './menus'
import users from './users'

export const getOrderList = async () => {
  try {
    const orders = await dbOrders.where("status", "==", 0).get();
    return Promise.all(
      orders.docs.map(async (doc) => {
        let order = {id: doc.id, ...doc.data()};
        order['menu'] = await menus.findById(order.menuId.id);
        order['user'] = await users.findById(order.userId.id);

        delete order['menuId'];
        delete order['userId'];

        return order;
      })
    );
  } catch (e) {
    throw new Error(e.message)
  }
};
