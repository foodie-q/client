import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from './reducers/api'

const rootReducer = combineReducers({ api })

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default store