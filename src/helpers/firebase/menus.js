import {dbMenus} from './index'

export const findById = async (menuId) => {
  try {
    let menu = await dbMenus.doc(menuId).get();
    return {id: menu.id, ...menu.data()};
  } catch (e) {
    throw new Error(e.message)
  }
};
