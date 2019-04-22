import axios from 'axios'
import { FETCH_MENUS, ORDER_FOOD, GET_SALDO, CREATE_ORDER, FIND_USER, ERROR, SCAN_QR } from '../actions/types'

const baseURL = axios.create({
  baseURL: 'http://192.168.43.145:3000'
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

export const getSaldo = (userId) => async (dispatch) => {
  let saldo = 0
  let { data } = await baseURL.get(`/users/saldo/${userId}`)

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