import { FETCH_MENUS, ORDER_FOOD, GET_SALDO, CREATE_ORDER, FIND_USER, SCAN_QR, CREATE_BALANCE } from '../actions/types'

const initialState = {
  user: '',
  menus: [],
  saldo: 0,
  validQR: false,
  isLoading: true,
  loadingCreate: true,
  loadingBalance: true
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FIND_USER:
      return {
        ...state,
        user: payload
      }
    case FETCH_MENUS:
      return {
        ...state,
        menus: payload,
        isLoading: false
      }
    case ORDER_FOOD:
      return {
        ...state,
        menus: payload
      }
    case GET_SALDO:
      return {
        ...state,
        saldo: payload
      }
    case CREATE_ORDER:
      return {
        ...state,
        loadingCreate: false
      }
    case SCAN_QR:
      return {
        ...state,
        validQR: payload
      }
    case CREATE_BALANCE:
      return {
        ...state,
        saldo: payload,
        loadingBalance: false
      }
    default:
      return state
  }
}
