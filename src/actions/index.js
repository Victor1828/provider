import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import RNFirebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native'

const configurationOptions = {
  debug: true,
  promptOnMissingPlayServices: true
}

const firebase = RNFirebase.initializeApp(configurationOptions)

import {
  EMAIL_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  PASSWORD_CHANGED
} from './types'

export const emailChanged = (email) => {
  return {
    type: EMAIL_CHANGED,
    payload: email
  }
}

export const passwordChanged = (password) => {
  return {
    type: PASSWORD_CHANGED,
    payload: password
  }
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })
    firebase.messaging().getToken()
      .then(device_token => {
        axios.post('http://192.168.15.12:3000/api/v2/authentications', {email, password, device_token})
          .then(user => {
            loginUserSuccess(dispatch, user, device_token)
            AsyncStorage.multiSet([['id_token', device_token], ['user', JSON.stringify(user)]])
          })
          .catch(() => loginUserFail(dispatch))
      })
      .catch(err => console.log(err))
  }
}

export const getItem = () => {
  return (dispatch) => {
    AsyncStorage.multiGet(['id_token', 'user'], (err, data) => {
      if (err) {
        Actions.auth()
        return
      } else if (data[0][1] == null) {
        Actions.auth()
        return
      }
      loginUserSuccess(dispatch, JSON.parse(data[1][1]).data, data[0][1])
    })
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user, device_token) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: {user, device_token}
  })
  Actions.main()
}
