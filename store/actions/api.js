import axios from 'axios'
import { FETCH_MENUS, ORDER_FOOD, GET_BALANCE, CREATE_ORDER, FIND_USER, ERROR, SCAN_QR, CREATE_BALANCE, GET_BALANCE_HISTORY } from '../actions/types'

const baseURL = axios.create({
  baseURL: 'http://d5ead56c.ngrok.io'
})

export const fetchMenus = () => async (dispatch) => {
  let payload = []
  let { data } = await baseURL
    .get('/menus')

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

export const getBalance = (userId) => async (dispatch) => {
  console.log(userId, 'ini userId');
  let saldo = 0
  try {
    let { data } = await baseURL.get(`/users/saldo/${userId}`)
    console.log(data, 'ini getBalance');

    if (data) {
      saldo = data
    }

    dispatch({
      type: GET_BALANCE,
      payload: saldo
    })
  }catch (e) {
    console.log(e.message)
  }

}

export const createOrder = (objCreate) => async (dispatch) => {
  try {
    let { data } = await baseURL.post('/users/order', { payload: objCreate })
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

export const findUser = (userId) => async (dispatch) => {
  try {
    let { data } = await baseURL.get(`/users/${userId}`)
    dispatch({
      type: FIND_USER,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message
    })
  }
}

export const scanQR = (object) => async (dispatch) => {
  try {
    let valid = false
    let { data } = await baseURL.post('/qr', { ...object })
    if (+data.valid) {
      valid = true
    }
    dispatch({
      type: SCAN_QR,
      payload: valid
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message
    })
  }
}

export const createBalance = (objCreate) => async (dispatch) => {
  try {
    let { data } = await baseURL.post('/users/saldo', { payload: objCreate })
    dispatch({
      type: CREATE_BALANCE,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message
    })
  }
}

export const getBalanceHistory = (userId) => async (dispatch) => {
  try {
    let { data } = await baseURL.get(`/users/allbalance/${userId}`)

    dispatch({
      type: GET_BALANCE_HISTORY,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message
    })
  }
}
