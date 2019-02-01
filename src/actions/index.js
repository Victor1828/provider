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
} from './types';

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
            saveItem('id_token', device_token)
          })
          .catch(() => loginUserFail(dispatch))
      })
      .catch(err => console.log(err))
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user, device_token) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: {user, device_token}
  });
  console.log(user)
  Actions.main();
};

const saveItem = async(item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }
}

export const getItem = () => {
  return (dispatch) => {
    AsyncStorage.getItem('id_token')
    .then(token => {
      if (token == null) {
        Actions.auth()
      } else {
        Actions.main()
      }
    })
    .catch(err => console.log(err))
  }
}