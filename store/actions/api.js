import axios from 'axios'
import { FETCH_MENUS, ORDER_FOOD, GET_SALDO, CREATE_ORDER, ERROR } from '../actions/types'

export const fetchMenus = () => async (dispatch) => {
  let payload = []
  let { data } = await axios
    .get('http://172.16.1.253:3000/menus')

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
  let { data } = await axios.get('http://172.16.1.253:3000/users/saldo/LgGX3gRskZcbvVrPjFGms9IWXIO2')

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
    let { data } = await axios.post('http://172.16.1.253:3000/users/order', { payload: objCreate })
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