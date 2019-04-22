import {dbUsers} from './index'

export const findById = async (userId) => {
  try {
    let user = await dbUsers.doc(userId).get();
    return {id: user.id, ...user.data()};
  } catch (e) {
    throw new Error(e.message)
  }
};
