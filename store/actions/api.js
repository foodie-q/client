import axios from 'axios'
import { FETCH_MENUS, ORDER_FOOD, GET_SALDO, CREATE_ORDER, ERROR } from '../actions/types'

export const fetchMenus = () => async (dispatch) => {
  let payload = []
  let { data } = await axios
<<<<<<< HEAD
    .get('http://localhost:3000/menus')
=======
    .get('http://10.0.2.2:3000/menus')
>>>>>>> change localhost to android's localhost

  if (data) {
    payload = data.map(menu => ({ ...menu, order: 0 }))
  }
  dispatch({
    type: FETCH_MENUS,
    payload
  })
}

export const orderFood = (list, id, options) => (dispatch) => {
  let payload = []
  list.forEach(l => {
    if (l.id === id) {
      if (options === 'add') {
        l.order += 1
      } else {
        l.order -= 1
        if (l.order < 0) {
          l.order = 0
        }
      }
    }
    payload.push(l)
  })

  dispatch({
    type: ORDER_FOOD,
    payload
  })
}

export const getSaldo = () => async (dispatch) => {
  let saldo = 0
<<<<<<< HEAD
  let { data } = await axios.get('http://localhost:3000/users/saldo/LgGX3gRskZcbvVrPjFGms9IWXIO2')
=======
  let { data } = await axios.get('http://10.0.2.2:3000/users/saldo/LgGX3gRskZcbvVrPjFGms9IWXIO2')
>>>>>>> change localhost to android's localhost

  if (data) {
    saldo = data
  }

  dispatch({
    type: GET_SALDO,
    payload: saldo
  })
}

export const createOrder = (objCreate) => async (dispatch) => {
  try {
<<<<<<< HEAD
    let { data } = await axios.post('http://localhost:3000/users/order', { payload: objCreate })
=======
    let { data } = await axios.post('http://10.0.2.2:3000/users/order', { payload: objCreate })
>>>>>>> change localhost to android's localhost
    dispatch({
      type: CREATE_ORDER,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message
    })
  }
}