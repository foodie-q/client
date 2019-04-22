import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from './reducers/api'
import Auth from './Auth/reducer'

const rootReducer = combineReducers({ api,Auth })

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default store