import {
  CREATE_BALANCE,
  CREATE_ORDER,
  FETCH_MENUS,
  FIND_USER,
  GET_BALANCE,
  GET_BALANCE_HISTORY,
  ORDER_FOOD,
  SCAN_QR,
  SCAN_QR_LOADING
} from '../actions/types'

const initialState = {
  user: '',
  menus: [],
  saldo: 0,
  balanceHistory: [],
  loadingBalanceHistory: true,
  validQR: false,
  isLoading: true,
  loadingCreate: true,
  loadingBalance: true
}

export default (state = initialState, {type, payload}) => {
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
    case GET_BALANCE:
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
        isLoading: false,
        validQR: payload
      }
    case SCAN_QR_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case CREATE_BALANCE:
      return {
        ...state,
        saldo: payload,
        loadingBalance: false
      }
    case GET_BALANCE_HISTORY:
      return {
        ...state,
        balanceHistory: payload,
        loadingBalanceHistory: false
      }
    default:
      return state
  }
}
