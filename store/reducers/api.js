import { FETCH_MENUS, ORDER_FOOD, GET_BALANCE, CREATE_ORDER, FIND_USER, SCAN_QR, CREATE_BALANCE, GET_BALANCE_HISTORY, CHANGE_NOTES } from '../actions/types'

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
        user: payload,
        saldo: payload.saldo
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
    case CHANGE_NOTES:
      return {
        ...state,
        menus: payload
      }
    default:
      return state
  }
}
