import {AsyncStorage} from 'react-native'

export default class localStorage {
  static async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value + '')
    } catch (e) {
      console.log(e)
    }
  }

  static async getItem(key) {
    try {
      return await AsyncStorage.getItem(key)
    } catch (e) {
      console.log(e)
    }
  }

  static async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.log(e)
    }
  }

  static async clear() {
    try {
      await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
    } catch (e) {
      console.log(e)
    }
  }
}
