import React, { Component } from 'react'
import ReduxThunk from 'redux-thunk'
import SplashScreen from 'react-native-splash-screen'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import Reducers from './src/reducers'
import Router from './src/Router';

class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    )
  }
}

export default App
