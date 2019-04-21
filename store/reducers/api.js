import { FETCH_FOODS, ORDER_FOOD } from '../actions/types'

const initialState = {
  foods: [],
  isLoading: true
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_FOODS:
      return {
        ...state,
        foods: payload,
        isLoading: false
      }
    case ORDER_FOOD:
      return {
        ...state,
        foods: payload
      }
    default:
      return state
  }
}
