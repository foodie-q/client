import * as types from './actionTypes'

import Axios from 'axios'

// export function restoreSession() {
//   return (dispatch) => {
//     dispatch(sessionRestoring())

//     const unsubscribe = firebaseService.auth()
//       .onAuthStateChanged(user => {
//         if(user) {
//           dispatch(sessionSuccess(user))
//           unsubscribe() // unsubscribe() ==> destroy session auth
//         } else {
//           dispatch(sessionLogout())
//           unsubscribe()
//         }
//       })
//   }
// }

export function login(email, password) {
  return (dispatch) => {
    dispatch(sessionLoading())

    Axios({
      url: 'http://localhost:3000/users/login',
      method: 'post',
      data: {
        email,
        password
      }
    })
    .then(({data}) => {
        console.log(data)
        dispatch(sessionSuccess(data))
    })
    .catch(err => {
          dispatch(sessionError(err.message))
        })
  }
}

export function register(email, password, name, role) {
  return (dispatch) => {
    dispatch(sessionLoading())
    Axios({
      url: 'http://localhost:3000/users/register',
      method: 'post',
      data: {
        email,
        password,
        name,
        role
      }
    })
    .then(({data}) => {
      console.log("asd",data)
        dispatch(sessionSuccess(data))
    })
    .catch(err => {
          dispatch(sessionError(err.message))
        })
  }
  
}

export function logout() {
  return (dispatch) => {
    dispatch(sessionLoading())

    Axios({
      url: 'localhost:3000/users/logout'
    })
    .then(() => {
      dispatch(sessionLogout())
    })
    .catch(err => {
      dispatch(sessionError(err.message))
    })
  }
}

function sessionRestoring() {
  return {
    type: types.SESSION_RESTORING
  }
}

function sessionLoading() {
  return {
    type: types.SESSION_LOADING
  }
}

function sessionSuccess(user) {
  return {
    type: types.SESSION_SUCCESS,
    user
  }
}

function sessionError(error) {
  return {
    type: types.SESSION_ERROR,
    error
  }
}

function sessionLogout() {
  return {
    type: types.SESSION_LOGOUT
  }
}