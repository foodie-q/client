import { FETCH_MENUS, ORDER_FOOD, GET_SALDO, CREATE_ORDER, FIND_USER, SCAN_QR } from '../actions/types'

const initialState = {
  user: '',
  menus: [],
  saldo: 0,
  validQR: false,
  isLoading: true,
  loadingCreate: true
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
    default:
      return state
  }
}
