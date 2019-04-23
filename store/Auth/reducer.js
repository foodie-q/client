import * as types from './actionTypes'

const initialState = {
  restoring: false,
  loading: false,
  user: null,
  error: null
}

export default session = (state = initialState, action) => {
  switch (action.type) {
    case types.SESSION_RESTORING:
      return {
        ...state,
        restoring: true
      }
    case types.SESSION_LOADING:
      return {
        ...state,
        restoring: false,
        loading: true,
        error: null
      }
    case types.SESSION_SUCCESS:
      return {
        ...state,
        restoring: false,
        loading: true,
        error: null,
        user: action.user
      }
    case types.SESSION_ERROR:
      return {
        ...state,
        restoring: false,
        loading: false,
        error: action.error
      }
    case types.SESSION_LOGOUT:
      return initialState
    default:
      return state
  }
}
