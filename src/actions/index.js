import axios from 'axios'
import { Actions } from 'react-native-router-flux'

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
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
    axios.post('http://192.168.15.12:3000/api/v2/authentications', {email, password, device_token: 'ejg0LAgHV-4:APA91bFJgWiDGVonKUFvV9FFViZDmLluO-7vnb54WwViCxIn2FAlelYphVwjwJgOyPTanVtWIUDUy2Rhtu6eYeTU2ZcevFRmpH1-aXbv-HMdzzODZJ8g0_uCGjeIN91Tp2HotF06a2_K'})
      .then(res => Actions.main())
      .catch(err => console.log(err))
  }
}

// const loginUserFail = (dispatch) => {
//   dispatch({ type: LOGIN_USER_FAIL });
// };

// const loginUserSuccess = (dispatch, user) => {
//   dispatch({
//     type: LOGIN_USER_SUCCESS,
//     payload: user
//   });

//   Actions.main();
// };
