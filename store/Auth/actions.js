import * as types from './actionTypes'
import localStorage from '../../helpers/localStorage'
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
    dispatch(sessionLoading());
    Axios({
      url: 'http://d5ead56c.ngrok.io/users/login',
      method: 'post',
      data: {
        email,
        password
      }
    })
      .then(async ({data}) => {
        console.log(data.role, 'ini role');
        try {
          localStorage.setItem('userId', data.uid || '');
          localStorage.setItem('role', data.role);
        } catch (e) {
          console.log(e.message)
        }

        dispatch(sessionSuccess(data))
      })
      .catch(err => {
        dispatch(sessionError(err.message))
      })
  }
}

export function register(email, password, name, role) {
  return (dispatch) => {
    dispatch(sessionLoading());
    Axios({
      url: 'http://d5ead56c.ngrok.io/users/register',
      method: 'post',
      data: {
        email,
        password,
        name,
        role
      }
    })
      .then(({data}) => {
        dispatch(sessionSuccess(data))
      })
      .catch(err => {
        dispatch(sessionError(err.message))
      })
  }

}

export function logout() {
  return (dispatch) => {
    dispatch(sessionLoading());

    Axios({
      url: 'd5ead56c.ngrok.io/users/logout'
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
